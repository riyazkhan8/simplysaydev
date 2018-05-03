<?php

/**
 * @file
 * Lists module's rules.
 */

/**
 * Implements hook_default_rules_configuration().
 */
function commerce_discount_userpoints_default_rules_configuration() {
  $rules = array();

  $rule = rules_reaction_rule();
  $rule->label = t("Creates userpoints transaction for applied discount");
  $rule->active = TRUE;
  $rule->event('commerce_checkout_complete')
    ->condition('commerce_discount_user_has_userpoints', array(
      'commerce_order:select' => 'commerce_order',
    ))
    ->action('commerce_discount_userpoints_create_userpoints_transaction');
  $rules['commerce_discount_userpoints_create_userpoints_transaction'] = $rule;

  $rule = rules_reaction_rule();
  $rule->label = t("Disables userpoints transaction for applied discount");
  $rule->active = TRUE;
  $rule->event('commerce_order_status_change')
          ->condition('data_is', array(
            'data:select' => 'commerce_order:status',
            'op' => '==',
            'value' => 'canceled',
          ))
          ->action('commerce_discount_userpoints_disable_userpoints_transaction');
  $rules['commerce_discount_userpoints_disable_order_transaction'] = $rule;

  return $rules;
}
