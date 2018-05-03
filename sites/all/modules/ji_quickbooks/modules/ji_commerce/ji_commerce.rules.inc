<?php

/**
 * @file
 * Adding custom actions.
 */

/**
 * Implements hook_rules_action_info().
 */
function ji_commerce_rules_action_info() {
  $defaults = array(
    'parameter' => array(
      'commerce_order' => array(
        'type' => 'commerce_order',
        'label' => t('Order in checkout'),
      ),
    ),
    'group' => t('Commerce Order'),
    'access callback' => 'rules_user_integration_access',
  );

  // Fired when checkout is complete. Sends customer, invoice, and payment
  // data to QBO.
  $actions['send_qbo_data'] = $defaults + array(
    'label' => t('Get User and Order Info and Send to QBO'),
    'base' => 'ji_commerce_get_user_order_info',
  );

  return $actions;
}

/**
 * Callback for rules action.
 *
 * We run QBO calls here because with Commerce
 * we can't do it within the hook_commerce_checkout_complete().
 */
function ji_commerce_get_user_order_info($order) {
  if (ji_quickbooks_check_common_errors()) {
    return;
  }

  // Don't crash execution if settings are missing.
  $quickbooks_service = new JIQuickBooksService();
  if (!empty($quickbooks_service->settingErrorMessage)) {
    return;
  }

  $account = user_load($order->uid);

  $qbo_customer_id = ji_commerce_checkout_complete_send_customer($quickbooks_service, $order, $account);

  if ($qbo_customer_id) {
    $qbo_invoice_id = ji_commerce_checkout_complete_send_invoice($quickbooks_service, $order, $qbo_customer_id);

    if ($qbo_invoice_id) {
      ji_commerce_checkout_complete_send_payment($quickbooks_service, $order, $qbo_customer_id, $qbo_invoice_id);
    }
  }
}
