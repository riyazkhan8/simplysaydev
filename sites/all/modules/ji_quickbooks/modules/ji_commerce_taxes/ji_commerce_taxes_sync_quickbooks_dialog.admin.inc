<?php

/**
 * @file
 * Syncs from QuickBooks to Drupal, loading QuickBooks rates.
 */

define('QBOTAXDEF', 'qbo_tax_rate_');

/**
 * Returns a confirm dialog form.
 */
function ji_commerce_taxes_confirm_sync_from_quickbooks($form, &$form_state) {
  $form = array();
  return confirm_form($form, t('Sync taxes from QuickBooks to Drupal?'), 'admin/commerce/config/taxes/', t("Pulls all tax rates from QuickBooks. If an existing rate is already in Drupal it will be updated. If QuickBooks disabled a tax rate that also existed here, it too will be disabled. Disabled QuickBooks tax rates won't be added."), t('Yes sync'), t('Cancel'));
}

/**
 * Submit handler.
 */
function ji_commerce_taxes_confirm_sync_from_quickbooks_submit($form, &$form_state) {
  ji_commerce_taxes_sync_quickbooks_drupal();
  $form_state['redirect'] = 'admin/commerce/config/taxes/';
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
function ji_commerce_taxes_sync_quickbooks_drupal() {
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
    // Commerce module converts it this way.
    $sum_converted = $sum / 100;

    $query = db_select('commerce_tax_rate', 't');
    $query->fields('t');
    $query->condition('quickbooks_tax_id', $qbo_tax_id, '=');
    $query->range(0, 1);

    $record = $query->execute()->fetchAssoc();

    // We need to identify the record for later use.
    $name = '';

    // Record exists, update table row.
    if ($record) {

      // We only want to count a record as being updated if it's
      // displayed since QBO will send over records that are
      // inactivate as well.
      if ($qbo_tax_active && $record['quickbooks_tax_active']) {
        $counter_updated++;
      }

      // Record is being disabled. Before it is, let's save it's data
      // to transfer to it's cloned copy.
      if ($qbo_tax_active == FALSE) {
        $updated_records[$qbo_tax_updated] = $record;
      }

      $record['title'] = $qbo_tax_name;
      $record['rate'] = $sum_converted;
      $record['quickbooks_tax_active'] = $qbo_tax_active;

      commerce_tax_ui_tax_rate_save($record);

      $name = $record['name'];
    }
    else {
      // Though record doesn't exist, it was possibly a clone from
      // QBO, where they deactive one and activated a new one
      // and incremented it's id.
      if (isset($updated_records[$qbo_tax_updated])) {
        $ctax_existing = $updated_records[$qbo_tax_updated];

        // Preserve so we can pull previous rule.
        $ctax_existing['quickbooks_tax_id'];

        $ctax_existing['is_new'] = TRUE;
        $ctax_existing['name'] = QBOTAXDEF . $qbo_tax_id;
        $ctax_existing['title'] = $qbo_tax_name;
        $ctax_existing['rate'] = $sum_converted;

        $ctax_existing['quickbooks_tax_id'] = $qbo_tax_id;
        $ctax_existing['quickbooks_tax_active'] = $qbo_tax_active;
        $ctax_existing['quickbooks_tax_updated'] = $qbo_tax_updated;
        commerce_tax_ui_tax_rate_save($ctax_existing);

        $prev_rules_config = rules_config_load('commerce_tax_rate_' . $updated_records[$qbo_tax_updated]['name']);
        $curr_rules_config = rules_config_load('commerce_tax_rate_' . $ctax_existing['name']);

        if ($prev_rules_config && $curr_rules_config) {
          foreach ($prev_rules_config->conditions() as $condition) {
            $curr_rules_config->condition($condition->getElementName(), $condition->settings);
          }
          // We remove the default actions in order to have only
          // the copied actions from the previous tax rate.
          foreach ($curr_rules_config->actions() as $curr_action) {
            $curr_action->delete();
          }
          foreach ($prev_rules_config->actions() as $action) {
            // If we are copying a tax rule we make sure to reference
            // to the new one. Additional (custom) actions are not changed.
            if (isset($action->settings['tax_rate_name'])) {
              if ($updated_records[$qbo_tax_updated]['name'] == $action->settings['tax_rate_name']) {
                $action->settings['tax_rate_name'] = $ctax_existing['name'];
              }
            }
            $curr_rules_config->action($action->getElementName(), $action->settings);
          }
          $curr_rules_config->save();
        }

        $name = $ctax_existing['name'];
      }
      else {

        $ctax_rate = array();
        $ctax_rate['is_new'] = TRUE;
        $ctax_rate['name'] = QBOTAXDEF . $qbo_tax_id;
        $ctax_rate['title'] = $qbo_tax_name;
        $ctax_rate['rate'] = $sum_converted;
        $ctax_rate['display_title'] = $ctax_rate['title'];
        $ctax_rate['description'] = '';
        $ctax_rate['type'] = 'sales_tax';
        $ctax_rate['default_rules_component'] = TRUE;
        $ctax_rate['module'] = 'commerce_tax_ui';

        $ctax_rate['quickbooks_tax_id'] = $qbo_tax_id;
        $ctax_rate['quickbooks_tax_active'] = $qbo_tax_active;
        $ctax_rate['quickbooks_tax_updated'] = $qbo_tax_updated;

        commerce_tax_ui_tax_rate_save($ctax_rate);

        $name = $ctax_rate['name'];
      }

      // We don't want to count inactive records.
      if ($qbo_tax_active) {
        $counter_new++;
      }
    }

    if (isset($name)) {
      // We delete $rate['name'] since we're about to insert
      // new data later on.
      db_delete('ji_commerce_taxes_agencies')->condition('name', $name)->execute();

      // Now load each TaxRate and TaxAgency information.
      foreach ($tax_array->TaxRates as $tax_rate) {
        $agency = new stdClass();

        // 'id' from uc_taxes table.
        $agency->name = $name;
        $agency->component_name = $tax_rate->Name;
        $agency->agency_name = $tax_rate->AgencyName;
        // 'agency_id' is from the dropdown created from QuickBooks.
        $agency->agency_id = $tax_rate->AgencyRef;
        $agency->agency_rate = $tax_rate->RateValue;

        ji_commerce_taxes_agency_save($agency);
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
