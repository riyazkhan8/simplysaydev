<?php

/**
 * @file
 * Defines default tax components and rules.
 *
 * If we're going to use this Rule, we have to disable the Commerce
 * built tax Rules. Disable:
 * 1) commerce_tax_type_sales_tax
 * 2) commerce_tax_type_vat
 *
 * We do this since we have to hi-jack the
 * commerce_product_calculate_sell_price event and insert our own
 * Action. Our Action accepts a $line_item as did the
 * commerce_tax_type_sales_tax Rule except we use the data array to store
 * our $form_submit value, in this case 'tax' or the QBO tax name. See
 * ji_commerce_taxes.checkout.pane.inc, within the submit callback,
 * ji_commerce_taxes_pane_checkout_form_submit().
 */

/**
 * Implements hook_default_rules_configuration().
 */
function ji_commerce_taxes_default_rules_configuration() {
  $rules = array();

  $rule = rules_reaction_rule();

  $rule->label = t('Gets the user selected tax to apply to the order.');
  $rule->tags = array('JI Commerce Taxes');
  // Turn it off by default. Let the user enable it.
  $rule->active = FALSE;

  $rule
      ->event('commerce_product_calculate_sell_price')
      ->action('ji_commerce_taxes_calculate_by_type', array(
        'commerce_line_item:select' => 'commerce-line-item',
  ));

  // Machine name of the Rule.
  $rules['ji_commerce_taxes_on_review_page'] = $rule;

  return $rules;
}
