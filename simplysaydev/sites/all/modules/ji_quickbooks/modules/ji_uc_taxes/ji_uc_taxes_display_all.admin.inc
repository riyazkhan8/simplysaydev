<?php

/**
 * @file
 * Taxes administration menu items.
 */

/**
 * Changes how taxes are displayed.
 *
 * See ji_uc_taxes.module hook_menu_alter().
 *
 * This overrides uc_taxes modules table since we had to add
 * additional code that alerts user if a rate is sync'd with
 * QuickBooks or not.
 */
function ji_uc_taxes_admin_settings() {
  $header = array(
    t('Name'),
    t('QBO entry'),
    t('Rate'),
    t('Taxed products'),
    t('Taxed product types'),
    t('Taxed line items'),
    t('Weight'),
    array(
      'data' => t('Operations'),
      'colspan' => 5,
    ),
  );

  $rows = array();
  foreach (uc_taxes_rate_load() as $rate_id => $rate) {

    // Don't display inactive tax entries. Similar to how
    // QuickBooks does it.
    // Yes, we could copy and modify uc_taxes_rate_load()
    // so it wouldn't return inactive rows, but hey...
    if (isset($rate->quickbooks_tax_active)) {
      if ($rate->quickbooks_tax_active == FALSE) {
        continue;
      }
    }

    $rows[] = array(
      check_plain($rate->name),
      !is_null($rate->quickbooks_tax_id) ? 'Yes' : '',
      $rate->rate * 100 . '%',
      $rate->shippable ? t('Shippable products') : t('Any product'),
      implode(', ', $rate->taxed_product_types),
      implode(', ', $rate->taxed_line_items),
      $rate->weight,
      l(t('edit'), 'admin/store/settings/taxes/' . $rate_id . '/edit'),
      l(t('conditions'), 'admin/store/settings/taxes/manage/uc_taxes_' . $rate_id),
      // Don't allow user to delete a QuickBooks tax rate.
      is_null($rate->quickbooks_tax_id) ? l(t('delete'), 'admin/store/settings/taxes/' . $rate_id . '/delete') : '',
    );
  }

  $build['taxes'] = array(
    '#theme' => 'table',
    '#header' => $header,
    '#rows' => $rows,
    '#empty' => t('No rates available.'),
  );

  return $build;
}
