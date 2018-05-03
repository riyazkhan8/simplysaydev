<?php

/**
 * @file
 * Administrative callbacks and form builder functions for the Tax UI module.
 */

/**
 * Displays an overview of Tax UI defined tax rates.
 */
function ji_commerce_tax_ui_overview($type) {
  drupal_add_css(drupal_get_path('module', 'commerce_tax') . '/theme/commerce_tax.admin.css');

  // Load the items that will be represented in the overview table.
  if ($type == 'rates') {
    $items = commerce_tax_rates();
  }
  else {
    $items = commerce_tax_types();
  }

  $header = array(
    t('Name'),
    t('QBO entry'),
    t('Local tax'),
    t('Operations'),
  );

  $rows = array();

  // Loop through all of the items to include in the overview.
  foreach ($items as $name => $item) {
    // Don't display inactive tax entries. Similar to how
    // QuickBooks does it.
    // Yes, we could copy and modify commerce_tax_rates()
    // so it wouldn't return inactive rows, but hey...
    if (isset($item['quickbooks_tax_active'])) {
      if ($item['quickbooks_tax_active'] == FALSE) {
        continue;
      }
    }

    if ($item['admin_list']) {
      // Build the operation links for the current item.
      $links = menu_contextual_links('commerce-tax-' . $type, 'admin/commerce/config/taxes/' . $type, array(strtr($name, '_', '-')));
      if ($item['quickbooks_tax_id'] !== NULL) {
        unset($links['commerce-tax-rates-delete']);
      }
      // Add the item's row to the table's rows array.
      $rows[] = array(
        ($type == 'rates') ? theme('tax_rate_admin_overview', array('tax_rate' => $item)) : theme('tax_type_admin_overview', array('tax_type' => $item)),
        $item['quickbooks_tax_id'] !== NULL ? 'Yes' : '',
        (variable_get('ji_commerce_taxes_local_tax_rate') == $item['name']) ? 'Yes' : '',
        theme('links', array('links' => $links, 'attributes' => array('class' => 'links inline operations'))),
      );
    }
  }

  // If no items are defined...
  if (empty($rows)) {
    // Add a standard empty row with a link to add a new item.
    if ($type == 'rates') {
      $empty_text = t('There are no tax rates yet. <a href="@link">Add a tax rate</a>.', array('@link' => url('admin/commerce/config/taxes/rates/add')));
    }
    else {
      $empty_text = t('There are no tax types yet. <a href="@link">Add a tax type</a>.', array('@link' => url('admin/commerce/config/taxes/types/add')));
    }

    $rows[] = array(
      array(
        'data' => $empty_text,
        'colspan' => 2,
      ),
    );
  }

  return theme('table', array('header' => $header, 'rows' => $rows));
}
