<?php
/**
 * @file
 *   Callback functions for checkout panes in the "Commerce Shipping on Review"
 *   module.
 * 
 * @author Guy Paddock (guy@redbottledesign.com)
 */

//==============================================================================
// Shipping Options Pane Callbacks
//==============================================================================
/**
 * Checkout step pane callback for the shipping options pane.
 *
 * <p>We use this as an opportunity to ensure that the order has an appropriate
 * shipping option selected before we render the shipping options choice.</p>
 */
function commerce_shipping_on_review_commerce_shipping_pane_checkout_form(
                array $form, array &$form_state, array $checkout_pane, $order) {
  module_load_include(
    'inc', 'commerce_shipping', 'includes/commerce_shipping.checkout_pane');

  _commerce_shipping_ensure_shipping_option_is_selected($order);

  return commerce_shipping_pane_checkout_form(
    $form, $form_state, $checkout_pane, $order);
}

/**
 * Review step pane callback for the shipping options pane.
 *
 * <p>This is simply a passthrough for the Commerce Shipping module's
 * implementation.</p>
 */
function commerce_shipping_on_review_commerce_shipping_pane_review(
                array $form, array &$form_state, array $checkout_pane, $order) {
  module_load_include(
    'inc', 'commerce_shipping', 'includes/commerce_shipping.checkout_pane');

  return commerce_shipping_pane_review(
    $form, $form_state, $checkout_pane, $order);
}

/**
 * Settings form callback for the shipping options pane.
 *
 * <p>This is simply a passthrough for the Commerce Shipping module's
 * implementation.</p>
 */
function commerce_shipping_on_review_commerce_shipping_pane_settings_form(
                                                         array $checkout_pane) {
  module_load_include(
    'inc', 'commerce_shipping', 'includes/commerce_shipping.checkout_pane');

  return commerce_shipping_pane_settings_form($checkout_pane);
}

//==============================================================================
// Cart Contents Pane Callbacks
//==============================================================================
/**
 * Checkout step pane callback for the cart contents pane.
 *
 * <p>This is simply a passthrough for the Commerce Cart module's
 * implementation.</p>
 */
function commerce_shipping_on_review_cart_contents_pane_checkout_form(
                array $form, array &$form_state, array $checkout_pane, $order) {
  module_load_include(
    'inc', 'commerce_cart', 'includes/commerce_cart.checkout_pane');

  return commerce_cart_contents_pane_checkout_form(
    $form, $form_state, $checkout_pane, $order);
}

/**
 * Review step pane callback for the cart contents pane.
 *
 * <p>We use this as an opportunity to invoke rules for selecting a shipping
 * option, to allow Rules to set which option should be applied to the order
 * before we render its contents during order review.</p>
 *
 * <p>The cart contents pane also gets wrapped in an AJAX wrapper div so that we
 * can replace it when we calculate shipping.</p>
 */
function commerce_shipping_on_review_cart_contents_pane_review(
                array $form, array &$form_state, array $checkout_pane, $order) {
  module_load_include(
    'inc', 'commerce_cart', 'includes/commerce_cart.checkout_pane');

  _commerce_shipping_invoke_selection_rule_for_review_form($form_state);

  $pane_review_content =
    commerce_cart_contents_pane_review(
      $form, $form_state, $checkout_pane, $order);

  $wrapped_content =
    '<div id="commerce-cart-contents-ajax-wrapper">' .
    $pane_review_content .
    '</div>';

  return $wrapped_content;
}

/**
 * Settings form callback for the cart contents pane.
 *
 * <p>This is simply a passthrough for the Commerce Cart module's
 * implementation.</p>
 */
function commerce_shipping_on_review_cart_contents_pane_settings_form(
                                                         array $checkout_pane) {
  module_load_include(
    'inc', 'commerce_cart', 'includes/commerce_cart.checkout_pane');

  return commerce_cart_contents_pane_settings_form($checkout_pane);
}
