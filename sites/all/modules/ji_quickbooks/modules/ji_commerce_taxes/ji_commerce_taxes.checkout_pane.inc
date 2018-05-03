<?php

/**
 * @file
 * Callback functions for the tax checkout pane.
 *
 * We had to create our own tax pane since we have to enable a way for
 * customers to select which district or tax rate to apply to the order.
 *
 * For new installs, this is disabled.
 */

/**
 * Checkout pane callback.
 *
 * Checkout pane callback: builds a tax select form where
 * the user has to choose their tax district.
 */
function ji_commerce_taxes_pane_checkout_form($pane_form, &$form_state, $checkout_pane, $order) {
  $options_default = array(0 => 'Select a county');

  foreach (commerce_tax_rates() as $key => $tax_rate) {
    $options[$key] = $tax_rate['display_title'] . ' - ' . ($tax_rate['rate'] * 100) . '%';
  }

  // Alphabetical order.
  asort($options);
  // 'Select a county' goes on top.
  $taxes = $options_default;
  $taxes += $options;

  $pane_form['tax'] = array(
      '#type' => 'select',
      '#title' => t('Tax rate'),
      '#options' => $taxes,
      // We get $order object since that's where it's saved in the
      // validation callback.
      '#default_value' => isset($order->data['user_selected_tax']) ? $order->data['user_selected_tax'] : '0',
      '#description' => t("Select your tax county."),
      '#required' => TRUE,
    );

  return $pane_form;
}

/**
 * Checkout pane callback: validate the tax field.
 */
function ji_commerce_taxes_pane_checkout_form_validate($form, &$form_state, $checkout_pane, $order) {
  if ($form_state['values']['ji_commerce_taxes']['tax'] === '0') {
    form_set_error('ji_commerce_taxes][tax', t('Please select your county.'));
    return FALSE;
  }
  else {
    // We can't save this to a $form_state so we insert into
    // the $order object.
    $order->data['user_selected_tax'] = $form_state['values']['ji_commerce_taxes']['tax'];
    return TRUE;
  }
}

/**
 * Checkout pane callback: submit the taxes checkout pane.
 */
function ji_commerce_taxes_pane_checkout_form_submit($form, &$form_state, $checkout_pane, $order) {
  // This shouldn't be this way but Rules makes things difficult.
  // I would rather get the $form_state value and send it as a parameter.
  $tax_name = $form_state['values']['ji_commerce_taxes']['tax'];

  $order_wrapper = entity_metadata_wrapper('commerce_order', $order);
  foreach ($order_wrapper->commerce_line_items as $line_item_wrapper) {
    $line_item = clone($line_item_wrapper->value());
    $line_item->data['ji_commerce_taxes_tax_name'] = $tax_name;

    commerce_line_item_save($line_item);

    rules_invoke_all('ji_commerce_taxes_on_review_page', $line_item);
  }
}

/**
 * Checkout pane callback.
 *
 * Show the selected tax on the review pane.
 */
function ji_commerce_taxes_pane_review($form, $form_state, $checkout_pane, $order) {
  // Be one with the void.
}
