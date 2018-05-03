<?php

/**
 * @file
 * Syncs from QuickBooks to Drupal, loading QuickBooks rates.
 */

/**
 * Returns a confirm dialog form.
 */
function ji_uc_taxes_confirm_sync_from_quickbooks($form, &$form_state) {
  $form = array();
  return confirm_form($form, t('Sync taxes from QuickBooks to Drupal?'), 'admin/store/settings/taxes', t("Pulls all tax rates from QuickBooks. If an existing rate is already in Drupal it will be updated. If QuickBooks disabled a tax rate that also existed here, it too will be disabled. Disabled QuickBooks tax rates won't be added."), t('Yes sync'), t('Cancel'));
}

/**
 * Submit handler.
 */
function ji_uc_taxes_confirm_sync_from_quickbooks_submit($form, &$form_state) {
  ji_uc_taxes_sync_quickbooks_drupal();
  $form_state['redirect'] = 'admin/store/settings/taxes';
}

/**
 * Calls QuickBooks and saves its taxes to the uc_taxes module.
 *
 * Note: We have to order the QBO tax rate by least QBO tax rate id
 * to highest in order to correctly know, historically, which rates
 * are older to newer.  When you update a QBO tax rate, QBO disables
 * (inactive) the previous rate, copies it and activates it with
 * new rate data.  In order for us to catch this and do the
 * same here yet keep any existing conditions or rules
 * that were attached to a Drupal uc_taxes, we maintain a log
 * of changes, see comments below.
 */
function ji_uc_taxes_sync_quickbooks_drupal() {
  $quickbooks_service = new JIQuickBooksService();
  $account_array['taxes'] = $quickbooks_service->getAllTaxes();

  // Stop further execution if errors occur.
  $return_error = $quickbooks_service->checkErrors();
  if (!empty($return_error['code'])) {
    return;
  }

  // Sort QBO results by least value to highest.  This is required
  // or else our logic below will not know which QBO tax rate
  // was updated.
  ksort($account_array['taxes']);

  $updated_records = array();
  $uc_tax_id = NULL;

  $counter_new = 0;
  $counter_updated = 0;
  foreach ($account_array['taxes'] as $tax_array) {
    $qbo_tax_id = $tax_array->Id;
    $qbo_tax_name = $tax_array->Name;
    $qbo_tax_active = $tax_array->Active === 'true' ? 1 : 0;
    // Compares records to see if they're related.
    $qbo_tax_updated = strtotime($tax_array->MetaData->LastUpdatedTime);

    $sum = 0.00;
    foreach ($tax_array->TaxRates as $rates) {
      $sum += $rates->RateValue;
    }
    // Ubercart module converts it this way.
    $sum_converted = $sum / 100;

    $query = db_select('uc_taxes', 't');
    $query->fields('t');
    $query->condition('quickbooks_tax_id', $qbo_tax_id, '=');
    $query->range(0, 1);

    $record = $query->execute()->fetchAssoc();

    // Record exists, update table row.
    if ($record) {
      $saved_record = uc_taxes_rate_load($record['id']);

      // We only want to count a record as being updated if it's
      // displayed since QBO will send over records that are
      // inactivate as well.
      if ($qbo_tax_active && $saved_record->quickbooks_tax_active) {
        $counter_updated++;
      }

      // Record is being disabled. Before it is, let's save it's data
      // to transfer to it's cloned copy.
      if ($qbo_tax_active == FALSE) {
        $updated_records[$qbo_tax_updated] = clone $saved_record;

        // Prevent disabled rates from showing up in an order.
        $saved_record->taxed_product_types = array();
        $saved_record->taxed_line_items = array();
      }

      $saved_record->name = $qbo_tax_name;
      $saved_record->rate = $sum_converted;
      $saved_record->quickbooks_tax_active = $qbo_tax_active;

      uc_taxes_rate_save($saved_record, FALSE);

      $uc_tax_id = $saved_record->id;
    }
    // Insert new row.
    else {
      // Though record doesn't exist, it was possibly a clone from
      // QBO, where they deactive one and activated a new one
      // and incremented its id.
      if (isset($updated_records[$qbo_tax_updated])) {
        $ctax_previous = clone $updated_records[$qbo_tax_updated];

        // Remove id property will force it to create a new tax rate.
        $ctax_previous->id = '';
        $ctax_previous->name = $qbo_tax_name;
        $ctax_previous->rate = $sum_converted;

        $ctax_previous->quickbooks_tax_id = $qbo_tax_id;
        $ctax_previous->quickbooks_tax_active = $qbo_tax_active;
        $ctax_previous->quickbooks_tax_updated = $qbo_tax_updated;

        $new_rate = uc_taxes_rate_save($ctax_previous, FALSE);
        $uc_tax_id = $new_rate->id;

        // Copy rules_config from previous rule into new one.
        $rule_config = rules_config_load('uc_taxes_' . $updated_records[$qbo_tax_updated]->id);
        if ($rule_config) {
          $rule_config->name = 'uc_taxes_' . $new_rate->id;
          $rule_config->label = $new_rate->name;
          // Adds a new RulesAnd.
          $rule_config->id = 0;
          $rule_config->save();
        }
      }
      else {
        $ctax_rate = new stdClass();
        $ctax_rate->id = '';
        $ctax_rate->name = $qbo_tax_name;
        $ctax_rate->rate = $sum_converted;
        $ctax_rate->shippable = TRUE;
        $ctax_rate->taxed_product_types = array();
        $ctax_rate->taxed_line_items = array();
        $ctax_rate->weight = 0;
        $ctax_rate->display_include = 1;
        $ctax_rate->inclusion_text = '';

        $ctax_rate->quickbooks_tax_id = $qbo_tax_id;
        $ctax_rate->quickbooks_tax_active = $qbo_tax_active;
        $ctax_rate->quickbooks_tax_updated = $qbo_tax_updated;

        $new_rate = uc_taxes_rate_save($ctax_rate, FALSE);
        $uc_tax_id = $new_rate->id;

        // Let's define a new RulesAnd condition.
        $rule_config = new RulesAnd(array(
          'order' => array(
            'type' => 'uc_order',
            'label' => 'Order',
          ),
        ));
        if ($rule_config) {
          $rule_config->name = 'uc_taxes_' . $new_rate->id;
          $rule_config->label = $new_rate->name;
          // Adds a new RulesAnd.
          $rule_config->id = 0;
          $rule_config->save();
        }

        // We don't want to count inactive records.
        if ($qbo_tax_active) {
          $counter_new++;
        }
      }
    }

    if (isset($uc_tax_id)) {
      // We delete uc_tax_id since we're about to insert
      // new data later on.
      db_delete('ji_uc_taxes_agencies')->condition('uc_tax_id', $uc_tax_id)->execute();

      // Now load each TaxRate and TaxAgency information.
      foreach ($tax_array->TaxRates as $tax_rate) {
        $agency = new stdClass();

        // 'id' from uc_taxes table.
        $agency->uc_tax_id = $uc_tax_id;
        $agency->component_name = $tax_rate->Name;
        $agency->agency_name = $tax_rate->AgencyName;
        // 'agency_id' is from the dropdown created from QuickBooks.
        $agency->agency_id = $tax_rate->AgencyRef;
        $agency->agency_rate = $tax_rate->RateValue;

        ji_uc_taxes_agency_save($agency);
      }
    }
  }

  if ($counter_new + $counter_updated == 0) {
    drupal_set_message(t("Tax rates are up to date."));
  }
  else {
    drupal_set_message(t("@t tax record(s) processed: @cn new and @cu updated.", array(
      '@t' => $counter_new + $counter_updated,
      '@cn' => $counter_new,
      '@cu' => $counter_updated,
    )));
  }
}
