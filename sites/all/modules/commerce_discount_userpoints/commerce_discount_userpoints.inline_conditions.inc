<?php

/**
 * @file
 * Provides Inline Conditions integration for the Commerce Discount Userpoints module.
 */

/**
 * Implements hook_inline_conditions_info().
 */
function commerce_discount_userpoints_inline_conditions_info() {
  $conditions = array();

  $conditions['commerce_discount_user_has_userpoints'] = array(
    'label' => t('User has userpoints'),
    'entity type' => 'commerce_order',
    'callbacks' => array(
      'configure' => 'commerce_discount_user_has_userpoints_configure',
      'build' => 'commerce_discount_user_has_userpoints_build',
    ),
  );

  return $conditions;
}

/**
 * Configuration callback for commerce_product_discount.
 *
 * @param array $settings
 *   Values for the form element.
 *
 * @return array
 *   Return a form element.
 */
function commerce_discount_user_has_userpoints_configure($settings) {
  $form = array();

  $form['dummy'] = array(
    '#type' => 'hidden',
    '#default_value' => 1,
  );
  
  return $form;
}