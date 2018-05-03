<?php
/**
 * @file
 * Contains helper functions for commerce reset.
 */

/**
 * Return orders.
 */
function commerce_reset_get_orders_ids($primary_key) {
  return commerce_reset_get_entity_data('commerce_order', $primary_key)
    ->fetchAllAssoc($primary_key);
}

/**
 * Return order count.
 */
function commerce_reset_order_count($primary_key) {
  return commerce_reset_get_data_count('commerce_order', $primary_key);
}

/**
 * Return payment transactions.
 */
function commerce_reset_get_transaction_ids($primary_key) {
  return commerce_reset_get_entity_data('commerce_payment_transaction', $primary_key)
    ->fetchAllAssoc($primary_key);
}

/**
 * Return payment transaction count.
 */
function commerce_reset_transaction_count($primary_key) {
  return commerce_reset_get_data_count('commerce_payment_transaction', $primary_key);
}

/**
 * Return customer profiles.
 */
function commerce_reset_get_customer_profiles_ids($primary_key) {
  return commerce_reset_get_entity_data('commerce_customer_profile', $primary_key)
    ->fetchAllAssoc($primary_key);
}

/**
 * Return customer profile count.
 */
function commerce_reset_customer_profiles_count($primary_key) {
  return commerce_reset_get_data_count('commerce_customer_profile', $primary_key);
}

/**
 * Return products.
 */
function commerce_reset_get_products_ids($primary_key) {
  return commerce_reset_get_entity_data('commerce_product', $primary_key)
    ->fetchAllAssoc($primary_key);
}

/**
 * Return product count.
 */
function commerce_reset_products_count($primary_key) {
  return commerce_reset_get_data_count('commerce_product', $primary_key);
}

/**
 * Database query helper function.
 *
 * @param string $table_name
 *   Database table name.
 * @param string $primary_key
 *   Primary key of the table.
 *
 * @return \DatabaseStatementInterface
 *   Database object.
 */
function commerce_reset_get_entity_data($table_name, $primary_key) {
  return db_select($table_name, $table_name)
    ->fields($table_name, array($primary_key))
    ->execute();
}

/**
 * Database record count function.
 *
 * @param string $table_name
 *   Database table name.
 * @param string $primary_key
 *   Primary key of the table.
 *
 * @return int
 *   Total count of the records.
 */
function commerce_reset_get_data_count($table_name, $primary_key) {
  $data = commerce_reset_get_entity_data($table_name, $primary_key);

  return $data->rowCount();
}

/**
 * Add the callback as the item key.
 *
 * @return array
 *   An array of batch.
 */
function commerce_reset_items_keyed() {
  $items = array();

  foreach (commerce_reset_reset_items() as $item) {
    if (is_array($item) AND array_key_exists('callback', $item)) {
      $items[$item['callback']] = $item;
    }
  }

  return $items;
}
