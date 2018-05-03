<?php
/**
 * @file
 *   Rules integration for the "Commerce Shipping on Review" page.
 *
 * @addtogroup rules
 *
 * @author Guy Paddock (guy@redbottledesign.com)
 *
 * @{
 */

/**
 * Implements hook_rules_event_info().
 */
function commerce_shipping_on_review_rules_event_info() {
  $events = array();

  // Re-use the Commerce Shipping options list
  module_load_include('inc', 'commerce_shipping', 'commerce_shipping.rules');

  $events['commerce_shipping_on_review_defaulting_shipping'] = array(
    'label' => t('Selecting the default shipping service'),
    'group' => t('Commerce Shipping'),
    'variables' => array(
      'commerce_order' => array(
        'label' => t('Order', array(), array('context' => 'a drupal commerce order')),
        'type' => 'commerce_order',
        'skip save' => FALSE,
      ),
    ),
    'access callback' => 'commerce_order_rules_access',
  );

  $events['commerce_shipping_on_review_selecting_shipping'] = array(
    'label' => t('After selecting a shipping service'),
    'group' => t('Commerce Shipping'),
    'variables' => array(
      'commerce_order' => array(
        'label' => t('Order', array(), array('context' => 'a drupal commerce order')),
        'type' => 'commerce_order',
        'skip save' => FALSE,
      ),
      'shipping_service_name' => array(
        'type' => 'text',
        'label' => t('Shipping service'),
        'options list' => 'commerce_shipping_service_options_list',
        'optional' => TRUE,
        'description' => t('If left empty, a default shipping service may be applied.'),
      ),
    ),
    'access callback' => 'commerce_order_rules_access',
  );

  return $events;
}

/**
 * Implements hook_rules_action_info().
 */
function commerce_shipping_on_review_rules_action_info() {
  $actions = array();

  $actions['commerce_shipping_on_review_load_shipping_services'] = array(
    'label' => t('Load the list of shipping services into a variable'),
    'group' => t('Commerce Shipping'),
    'provides' => array(
      'shipping_services' => array(
        'type'  => 'list<text>',
        'label' => t('List of shipping services (machine names)'),
      ),
    ),
  );

  return $actions;
}

/**
 * @}
 */
