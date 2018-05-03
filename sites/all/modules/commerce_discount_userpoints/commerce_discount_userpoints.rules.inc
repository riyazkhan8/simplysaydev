<?php

/**
 * @file
 * commerce_discount_userpoints.rules.inc
 */

/**
 * Implements hook_rules_condition_info().
 */
function commerce_discount_userpoints_rules_condition_info() {
  $inline_conditions = inline_conditions_get_info();
  
  $conditions = array();

  $conditions['commerce_discount_user_has_userpoints'] = array(
    'label' => t('Order owner has userpoints'),
    'parameter' => array(
      'commerce_order' => array(
        'type' => 'commerce_order',
        'label' => t('Order'),
        'description' => t('The order.'),
        'wrapped' => TRUE,
      ),
    ),
    'module' => 'commerce_discount_userpoints',
    'group' => t('Commerce Order'),
    'callbacks' => array(
      'execute' => $inline_conditions['commerce_discount_user_has_userpoints']['callbacks']['build'],
    ),
  );

  return $conditions;
}

/**
 * Implements hook_rules_action_info().
 */
function commerce_discount_userpoints_rules_action_info() {
  $actions = array();

  $actions['commerce_discount_userpoints_create_userpoints_transaction'] = array(
    'label' => t('Creates userpoints transaction for discounted order'),
    'parameter' => array(
      'commerce_order' => array(
        'type' => 'commerce_order',
        'label' => t('Order', array(), array('context' => 'a drupal commerce order')),
        'skip save' => TRUE,
        'wrapped' => TRUE,
      ),
    ),
    'group' => t('Commerce Discount'),
    'callbacks' => array(
      'execute' => 'commerce_discount_userpoints_create_transaction',
    ),
  );
  $actions['commerce_discount_userpoints_disable_userpoints_transaction'] = array(
    'label' => t('Removes userpoints transaction for previously discounted order'),
    'parameter' => array(
      'commerce_order' => array(
        'type' => 'commerce_order',
        'label' => t('Order', array(), array('context' => 'a drupal commerce order')),
        'skip save' => TRUE,
        'wrapped' => TRUE,
      ),
    ),
    'group' => t('Commerce Discount'),
    'callbacks' => array(
      'execute' => 'commerce_discount_userpoints_disable_transaction',
    ),
  );

  return $actions;
}

/**
 * Build callback for userpoints_discount.
 *
 * @param EntityDrupalWrapper $wrapper
 *   Wrapped entity type given by the rule.
 *
 * @return bool
 *   True if condition is valid. false otherwise.
 */
function commerce_discount_user_has_userpoints_build(EntityDrupalWrapper $wrapper) {
  return commerce_discount_userpoints_order_owner_has_userpoints($wrapper);
}

/**
 * Rule action callback for commerce_discount_userpoints_create_transaction on order.
 *
 * @param EntityDrupalWrapper $order_wrapper
 *   Entity type given by the rule.
 */
function commerce_discount_userpoints_create_transaction(EntityDrupalWrapper $order_wrapper) {
  foreach ($order_wrapper->commerce_line_items as $line_item_wrapper) {
    if ($line_item_wrapper->getBundle() != 'commerce_discount') {
      continue;
    }

    $line_item = $line_item_wrapper->value();
    if (!isset($line_item->data['discount_name'])) {
      continue;
    }

    $discount_wrapper = entity_metadata_wrapper('commerce_discount', $line_item->data['discount_name']);
    if ($discount_wrapper->commerce_discount_offer->type->value() != 'userpoints') {
      continue;
    }

    $num_userpoints = ceil($line_item_wrapper->commerce_unit_price->amount->value() / 100);
    $userpoints_params = array(
      'points' => -$num_userpoints,
      'uid' => $order_wrapper->uid->value(),
      'operation' => 'commerce_discount_userpoints_credit',
      'display' => FALSE,
      'entity_id' => $order_wrapper->order_id->value(),
      'entity_type' => 'commerce_order',
    );
    $result = userpoints_userpointsapi($userpoints_params);
    if (isset($result['status']) && $result['status']) {
      $userpoints_transaction_id = $result['transaction']['txn_id'];

      $order = $order_wrapper->value();
      $order->data['userpoints_transaction_id'] = $userpoints_transaction_id;
    }
    break;
  }
}

/**
 * Rule action callback for commerce_discount_userpoints_remove_transaction on order.
 *
 * @param EntityDrupalWrapper $order_wrapper
 *   Entity type given by the rule.
 */
function commerce_discount_userpoints_disable_transaction(EntityDrupalWrapper $order_wrapper) {
  $order = $order_wrapper->value();
  if (!isset($order->data['userpoints_transaction_id']) || !$order->data['userpoints_transaction_id']) {
    return;
  }

  $userpoints_params = array(
    'txn_id' => $order->data['userpoints_transaction_id'],
    'status' => USERPOINTS_TXN_STATUS_DECLINED,
  );
  userpoints_userpointsapi($userpoints_params);

  unset($order->data['userpoints_transaction_id']);
}