<?php

/**
 * @file
 * Rules integration for line items.
 *
 * @addtogroup rules
 */

/**
 * Implements hook_rules_action_info().
 */
function ji_commerce_taxes_rules_action_info() {
  $actions = array();

  $actions['ji_commerce_taxes_calculate_by_type'] = array(
    'label' => t('Calculate taxes for a line item'),
    'parameter' => array(
      'commerce_line_item' => array(
        'type' => 'commerce_line_item',
        'label' => t('Line item'),
      ),
    ),
    'group' => t('JI Commerce Taxes'),
  );

  return $actions;
}

/**
 * Rules action: Will apply only user selected tax.
 */
function ji_commerce_taxes_calculate_by_type($line_item) {
  if (isset($line_item->data['ji_commerce_taxes_tax_name'])) {
    $tax_rate = commerce_tax_rate_load($line_item->data['ji_commerce_taxes_tax_name']);
    if ($tax_rate) {
      $component_name = $tax_rate['rules_component'];

      // Load and invoke the tax rules components.
      if (!empty($component_name)) {
        rules_invoke_component($component_name, $line_item);
      }
    }
  }
}
