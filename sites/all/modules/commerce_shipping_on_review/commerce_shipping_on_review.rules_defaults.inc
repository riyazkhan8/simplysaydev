<?php
/**
 * @file
 *   Default Rules configurations for the "Commerce Shipping on Review" page.
 *
 * @author Guy Paddock (guy@redbottledesign.com)
 */

/**
 * Implements hook_default_rules_configuration().
 */
function commerce_shipping_on_review_default_rules_configuration() {
  $rules = array();

  $rules['commerce_shipping_on_review_apply_default_service'] = entity_import('rules_config', '{ "commerce_shipping_on_review_apply_default_service" : {
      "LABEL" : "Apply default shipping service",
      "PLUGIN" : "reaction rule",
      "OWNER" : "rules",
      "TAGS" : [ "commerce_shipping_on_review" ],
      "REQUIRES" : [ "commerce_shipping", "commerce_shipping_on_review" ],
      "ON" : { "commerce_shipping_on_review_defaulting_shipping" : [] },
      "DO" : [
        { "commerce_shipping_delete_shipping_line_items" : { "commerce_order" : [ "commerce_order" ] } },
        { "commerce_shipping_on_review_load_shipping_services" : { "PROVIDE" : { "shipping_services" : { "shipping_services" : "List of shipping services (machine names)" } } } },
        { "commerce_shipping_rate_apply" : {
            "commerce_order" : [ "commerce_order" ],
            "shipping_service_name" : [ "shipping-services:0" ]
          }
        }
      ]
    }
  }');

  $rules['commerce_shipping_on_review_apply_selected_service'] = entity_import('rules_config', '{ "commerce_shipping_on_review_apply_selected_service" : {
      "LABEL" : "Apply selected shipping service",
      "PLUGIN" : "reaction rule",
      "OWNER" : "rules",
      "TAGS" : [ "commerce_shipping_on_review" ],
      "REQUIRES" : [ "commerce_shipping", "commerce_shipping_on_review" ],
      "ON" : { "commerce_shipping_on_review_selecting_shipping" : [] },
      "DO" : [
        { "commerce_shipping_delete_shipping_line_items" : { "commerce_order" : [ "commerce_order" ] } },
        { "commerce_shipping_rate_apply" : {
            "commerce_order" : [ "commerce_order" ],
            "shipping_service_name" : [ "shipping-service-name" ]
          }
        }
      ]
    }
  }');

  return $rules;
}
