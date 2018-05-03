<?php
/**
 * @file
 * API documentation for commerce_reset.
 */

/**
 * Define commerce reset callbacks.
 *
 * This hook enables modules to register their own callbacks.
 *
 * @return array
 *   An array of items.
 *   The associative array has the following key-value pairs:
 *   - "description": Required. This description will show on
 *   the commerce_reset admin page at admin/commerce/reset/batch
 *
 *   - "callback": Required. The reset function to execute.
 *
 *   - "data_callback": Required. The function to execute
 *   that will return the data to iterate through.
 *
 *   - "count_callback": Required. The function to execute
 *   that will the return that data count.
 *
 *   - "primary_key": Required.
 *   The primary key for the the database table if relevant.
 */
function hook_commerce_reset_reset_items() {

  $items = array();

  $items[] = array(
    'description' => t('My Action Commerce Reset Action'),
    'callback' => 'my_custom_commerce_reset_action',
    'data_callback' => 'my_custom_commerce_reset_get_data',
    'count_callback' => 'my_custom_commerce_reset_data_count',
    'primary_key' => 'my_custom_commerce_primary_key',
  );

  return $items;
}

/**
 * My custom commerce reset action().
 */
function my_custom_commerce_reset_action($details, &$context) {
  // Do your custom actions here.
}

/**
 * The data to iterate through.
 */
function my_custom_commerce_reset_get_data() {
  return TRUE;
}

/**
 * Data count.
 */
function my_custom_commerce_reset_data_count() {
  return 1;
}
