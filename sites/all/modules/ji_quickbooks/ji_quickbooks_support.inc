<?php

/**
 * @file
 * Helper functions.
 */
/**
 * Name of the cached table.
 */
define('JI_QUICKBOOKS_TAX_AGENCIES', 'ji_quickbooks_tax_agencies');

/**
 * Caches QBO responses since ji_autocomplete makes multiple calls.
 *
 * Probably the coolest function on the planet! Prevents
 * multiple calls to QBO and instead caches results (db storage)
 * which improves performance.
 */
function ji_quickbooks_tax_agencies_cache() {
  $option_agencies = &drupal_static(__FUNCTION__);
  if (!isset($option_agencies)) {
    $cache = cache_get(JI_QUICKBOOKS_TAX_AGENCIES);
    if ($cache) {
      $option_agencies = $cache->data;
    }
    else {
      $quickbooks_service = new JIQuickBooksService();
      $response = $quickbooks_service->getTaxAgencies();
      $error = $quickbooks_service->checkErrors();
      if (!empty($error['code'])) {
        return TRUE;
      }

      $options = array();
      foreach ($response as $agency) {
        $options[$agency->Id] = $agency->DisplayName;
      }
      cache_set(JI_QUICKBOOKS_TAX_AGENCIES, $options, 'cache');

      return $options;
    }
  }
  return $option_agencies;
}

/**
 * Checks against so common errors and returns execution.
 *
 * @return bool
 *   FALSE if no errors true otherwise.
 */
function ji_quickbooks_check_common_errors() {
  // If OAuth isn't installed, don't allow our functions to run since it will
  // crash general functionality.
  $oauth = ji_quickbooks_support_check_oauth(TRUE);
  if (!$oauth) {
    return TRUE;
  }

  // If the user forgets to adjust the settings, inform them
  // if user is an admin and return.
  // Prevents the system from crashing execution.
  $settings_set = ji_quickbooks_support_settings_applied(TRUE);
  if (!$settings_set) {
    return TRUE;
  }

  return FALSE;
}

/**
 * Checks if all settings for JI QuickBooks are set.
 *
 * Returns boolean false if even one of the settings
 * haven't been applied.
 */
function ji_quickbooks_support_settings_applied($show_message = FALSE) {
  $settings_count = 0;
  variable_get('ji_quickbooks_payment_method') ? $settings_count++ : NULL;
  variable_get('ji_quickbooks_payment_account') ? $settings_count++ : NULL;
  variable_get('ji_quickbooks_term') ? $settings_count++ : NULL;
  variable_get('ji_quickbooks_default_product') ? $settings_count++ : NULL;
  if (empty($settings_count) || $settings_count < 4) {
    if (user_access('access quickbooks')) {
      if ($show_message) {
        drupal_set_message(t('JI QuickBooks is missing the one or more settings. Please make adjustments or save before you use it. Visit the <a href="@url">settings page</a>.', array('@url' => url('admin/config/services/ji_quickbooks'))), 'error', FALSE);
      }
    }

    $url = url('admin/config/services/ji_quickbooks');
    watchdog('JI QuickBooks', "JI QuickBooks is missing the one or more settings. Please make adjustments or save before you use it. Visit the <a href='$url'>settings page</a>.", NULL, WATCHDOG_CRITICAL);

    return FALSE;
  }

  return TRUE;
}

/**
 * Checks if OAuth is installed/enabled on server.
 *
 * $show_message boolean. Note: Will only show message if user has
 * permission "administer site configuration".
 */
function ji_quickbooks_support_check_oauth($show_message = FALSE) {
  $oauth = extension_loaded('oauth');
  if (!$oauth) {
    if (user_access('access quickbooks')) {
      if ($show_message) {
        $internal_link = t('JI QuickBooks needs OAuth installed on web server.  <a href="@link">See Status Report</a>.', array(
          '@link' => url('/admin/reports/status'),
        ));
        drupal_set_message($internal_link, 'error', FALSE);
      }
    }

    return FALSE;
  }

  return TRUE;
}

/**
 * Gets the path of a library.
 */
function ji_quickbooks_get_path($name, $base_path = FALSE) {
  $libraries = &drupal_static(__FUNCTION__);

  if (!isset($libraries)) {
    $libraries = ji_quickbooks_get_libraries();
  }

  $path = ($base_path ? base_path() : '');
  if (!isset($libraries[$name])) {
    return FALSE;
  }
  else {
    $path .= $libraries[$name];
  }

  return $path;
}

/**
 * Retrieve QBO realm id based on UID.
 *
 * If user has synced to a realm before, retrieve the QBO
 * customer ID. If not, returns an empty string.
 */
function ji_quickbooks_get_response_id($realm_id, $uid, $process = 'customer', $oid = NULL) {
  // Check if this customer has synced to QBO already.
  $realm_record = db_select('ji_quickbooks_realm_index', 'r');

  if (!is_null($oid)) {
    $realm_record->condition('r.oid', $oid, '=');
  }

  $realm_record->condition('r.realm_id', $realm_id, '=')
      ->condition('r.process', $process, '=')
      ->condition('r.uid', $uid, '=')
      ->condition('r.response_id', 0, '>')
      ->fields('r', array('response_id'))
      ->orderBy('updated', 'DESC')
      ->range(0, 1);

  $result = $realm_record->execute()->fetchAll();

  if (isset($result[0]->response_id)) {
    // Don't return zero since we need an empty string instead.
    if ($result[0]->response_id > 0) {
      return $result[0]->response_id;
    }
  }

  // Must return an empty string as required by QBO API.
  return '';
}

function ji_quickbooks_log_process($oid, $realm_id, $uid, $process, $response) {
  $checker = ji_quickbooks_error_checker($response);

  ji_quickbooks_log_realm_data($oid, $realm_id, $uid, $process, $checker);

  if ($checker['error']) {
    // Don't execute the next process.
    return FALSE;
  }
  else {
    return $checker['response_id'];
  }
}

/**
 * Check for errors.
 *
 * @param array $response Parsed from the QBO XML response.
 * @return array 'error' => TRUE|FALSE, 'message' => message|response_id
 */
function ji_quickbooks_error_checker($response) {
  if (!empty($response['error']['code'])) {
    $error_code_message = 'QBO error: ' . $response['error']['code'] . ' : ' . $response['error']['message'];

    // Returns the name of the fuction that called ji_quickbooks_qboid_save.
    //$calling_function_name = debug_backtrace()[1]['function'];
    //watchdog($calling_function_name, $error_code_message, WATCHDOG_CRITICAL);
    // We don't execute the next process.
    return array(
      'error' => TRUE,
      'message' => $error_code_message,
      'response_id' => '',
    );
  }
  else {
    // Passes the response id.
    // Depending on which process this response is from this could be
    // a customer id, invoice id, or a payment id.
    return array(
      'error' => FALSE,
      'message' => '',
      'response_id' => $response['response']->Id,
    );
  }
}

/**
 * Write/remove error messages.
 *
 * WARNING: This isn't called directly. Use ji_quickbooks_log_process()
 * instead.
 */
function ji_quickbooks_log_realm_data($oid, $realm_id, $uid, $process, $checker, $command = 'insert') {
  switch ($command) {
    case 'insert':
      $table = new stdClass();
      $table->oid = $oid;
      $table->realm_id = $realm_id;
      $table->process = $process;
      $table->message = $checker['message'];
      $table->is_error = $checker['error'];
      $table->response_id = $checker['response_id'];
      $table->updated = time();
      $table->uid = $uid;

      ji_quickbooks_write_record($table);
      break;

    case 'delete':
      db_delete('ji_quickbooks_realm_index')
          ->condition('oid', $oid)
          ->condition('realm_id', $realm_id)
          ->condition('process', $process)
          ->execute();
      break;
  }
}

/**
 * Write to the database.
 *
 * @param object $table_object The object that represents the table with
 * data you wish to insert/update.
 *
 * @param array $primary_key If array is provided, it will update. For
 * example, array('oid', 'process') it will ask the DB if those records
 * exist. If so, it updates that record. Array of strings.
 *
 * @param string $table_name Name of data you wish to access.
 */
function ji_quickbooks_write_record($table_object, $table_name = 'ji_quickbooks_realm_index') {

  $realm_record = db_select('ji_quickbooks_realm_index', 'r')
      ->condition('r.oid', $table_object->oid)
      ->condition('r.realm_id', $table_object->realm_id)
      ->condition('r.process', $table_object->process)
      ->fields('r', array('id'))
      ->range(0, 1)
      ->execute()
      ->fetchAll();

  // Insert, otherwise update record.
  if (!isset($realm_record[0]->id)) {
    // Empty id means it will insert.
    $table_object->id = '';
    drupal_write_record($table_name, $table_object);
  }
  else {
    // 'id' was found, update record.
    $table_object->id = $realm_record[0]->id;
    drupal_write_record($table_name, $table_object, array('id'));
  }
}

/**
 * Loads all libraries.
 */
function ji_quickbooks_get_libraries() {
  $searchdir = array();
  $profile = drupal_get_path('profile', drupal_get_profile());
  $config = conf_path();

  // Similar to 'modules' and 'themes' directories in the root directory,
  // certain distributions may want to place libraries into a 'libraries'
  // directory in Drupal's root directory.
  $searchdir[] = 'libraries';

  // Similar to 'modules' and 'themes' directories inside an installation
  // profile, installation profiles may want to place libraries into a
  // 'libraries' directory.
  $searchdir[] = "$profile/libraries";

  // Always search sites/all/libraries.
  $searchdir[] = 'sites/all/libraries';

  // Also search sites/<domain>/*.
  $searchdir[] = "$config/libraries";

  // Retrieve list of directories.
  $directories = array();
  $nomask = array('CVS');
  foreach ($searchdir as $dir) {
    if (is_dir($dir) && $handle = opendir($dir)) {
      while (FALSE !== ($file = readdir($handle))) {
        if (!in_array($file, $nomask) && $file[0] != '.') {
          if (is_dir("$dir/$file")) {
            $directories[$file] = "$dir/$file";
          }
        }
      }
      closedir($handle);
    }
  }

  return $directories;
}
