<?php

/**
 * @file
 * Administrative form for QuickBooks settings.
 */

/**
 * Displays an overview of reports page.
 */
function ji_reports_ui_overview() {

  $record = db_select('ji_quickbooks_realm_index', 'r')
      ->condition('r.is_error', TRUE, '=')
      ->fields('r')
      ->execute()
      ->fetchAll();

  $header = array(
    t('Order ID'),
    t('Realm ID'),
    t('Process'),
    t('Message'),
    t('Transaction Date'),
  );

  $rows = array();

  foreach ($record as $item) {
    $rows[] = array(
      $item->oid,
      $item->realm_id,
      $item->process,
      $item->message,
      $item->updated,
    );
  }

  // If no items are defined...
  if (empty($rows)) {
    $rows[] = array(
      array(
        'data' => t('Looking good! No errors to report.'),
        'colspan' => 5,
      ),
    );
  }

  return theme('table', array('header' => $header, 'rows' => $rows));
}
