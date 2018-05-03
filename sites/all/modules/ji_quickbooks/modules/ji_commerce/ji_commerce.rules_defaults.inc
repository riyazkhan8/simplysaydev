<?php

/**
 * @file
 * Default rule configurations for Checkout.
 */

/**
 * Implements hook_default_rules_configuration().
 */
function ji_commerce_default_rules_configuration() {
  $rules = array();
  $rule1 = ji_commerce_add_rule('Get Order Information', 'commerce_checkout_complete', 'send_qbo_data', variable_get('ji_commerce_get_new_customer_info', TRUE));
  $rules['ji_commerce_append_qbo_customer_id_to_new_user'] = $rule1;
  return $rules;
}

/**
 * Helper function to add new rule.
 *
 * @param string $label
 *   The label of this new rule.
 * @param string $event_machine_name
 *   Machine name of the event.
 * @param string $action_machine_name
 *   Machine name of the action.
 * @param bool $active
 *   If the rule is active or not.
 * @param int $weight
 *   Weight of the rule, defaults to 9.
 *
 * @return Object
 *   The rule object.
 */
function ji_commerce_add_rule($label, $event_machine_name, $action_machine_name, $active = TRUE, $weight = 9) {
  $rule = rules_reaction_rule();
  $rule->label = $label;
  $rule->active = $active;

  $rule
    ->event($event_machine_name)
    ->action($action_machine_name);

  $rule->weight = $weight;

  return $rule;
}
