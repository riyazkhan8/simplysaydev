<?php

/**
 * @file
 * Taxes administration menu items.
 */

/**
 * Directly borrowed from uc_taxes.admin.inc.
 */
function ji_uc_taxes_delete_form($form, &$form_state, $rate_id) {
  // Bail if we got a bad rate ID.
  $rate = uc_taxes_rate_load($rate_id);
  if (!$rate) {
    drupal_set_message(t('That tax rate does not exist.'), 'error');
    drupal_goto('admin/store/settings/taxes');
  }

  // Oooo, user is trying to delete QuickBooks tax record.
  if (!is_null($rate->quickbooks_tax_id)) {
    drupal_set_message(t("You can't delete a QuickBooks record. Please modify within QuickBooks."), 'error');
    drupal_goto('admin/store/settings/taxes');
  }

  $form['rate_id'] = array(
    '#type' => 'value',
    '#value' => $rate_id,
  );
  $form['name'] = array(
    '#type' => 'value',
    '#value' => $rate->name,
  );

  return confirm_form($form, t('Are you sure you want to delete @name?', array('@name' => $rate->name)), 'admin/store/settings/taxes', t('This action cannot be undone. Any orders that have been charged this tax may lose tax if you proceed.<br />If you just want this tax to no longer be applied to orders, consider disabling its predicate instead.'), t('Delete'), t('Cancel'));
}

/**
 * Form submission handler for ji_uc_taxes_delete_form().
 */
function ji_uc_taxes_delete_form_submit($form, &$form_state) {
  // Delete the tax rate.
  uc_taxes_rate_delete($form_state['values']['rate_id']);

  // Display a message and redirect back to the overview.
  drupal_set_message(t('Tax rate %name deleted.', array('%name' => $form_state['values']['name'])));

  $form_state['redirect'] = 'admin/store/settings/taxes';
}
