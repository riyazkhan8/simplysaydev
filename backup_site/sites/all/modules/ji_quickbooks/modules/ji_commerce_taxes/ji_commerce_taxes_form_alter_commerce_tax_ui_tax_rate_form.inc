<?php

/**
 * @file
 * Administrative callbacks and form builder functions for the Tax UI module.
 */

/**
 * From ji_commerce_taxes.module.
 */
function ji_commerce_taxes_form_alter_commerce_tax_ui_tax_rate_form(&$form, &$form_state) {
  // Clear the cache on each page load.
  cache_clear_all(JI_QUICKBOOKS_TAX_AGENCIES, 'cache');
  $error = ji_quickbooks_tax_agencies_cache();
  if ($error === TRUE) {
    drupal_set_message(t('Additionally, adding QuickBooks taxes are disabled since a severe error occurred. Please address the errors to turn on this feature.'), 'error', FALSE);
    return;
  }

  $form['tax_rate']['rate']['#weight'] = 6;
  $form['tax_rate']['type']['#weight'] = 7;
  
  drupal_add_js(drupal_get_path('module', 'ji_commerce_taxes') . '/js/jquery.mask.js');
  drupal_add_js(drupal_get_path('module', 'ji_commerce_taxes') . '/js/decimal_formatter.js');

  $machine_name = NULL;
  if (arg(5)) {
    $machine_name = str_replace('-', '_', arg(5));
  }

  // If tax entry is a QBO entry, disable fields.
  $tax = commerce_tax_rate_load($machine_name);
  if (!is_null($tax['quickbooks_tax_id'])) {
    $form['alert'] = array(
      '#markup' => '<h2>' . t('NOTICE: This tax rate is synced between QuickBooks and Drupal hence you cannot change the name or rate - please do so in QuickBooks.') . '</h2>',
      '#weight' => -100,
    );

    // We disable since QuickBooks doesn't permit updates.
    $form['tax_rate']['title']['#disabled'] = TRUE;
    $form['tax_rate']['rate']['#disabled'] = TRUE;

    $form['quickbooks_tax_id'] = array(
      '#type' => 'hidden',
      '#value' => $tax['quickbooks_tax_id'],
    );

    $form['actions']['delete']['#disabled'] = TRUE;
  }

  // Used during validation callback.
  // $form_state['values']['quickbooks_tax_id'] = $tax['quickbooks_tax_id'];?
  $form['tax_rate']['agencies'] = array(
    '#type' => 'fieldset',
    '#title' => 'Tax Agency',
    '#prefix' => '<div id="replace-this">',
    '#suffix' => '</div>',
    '#tree' => TRUE,
    '#weight' => 4,
  );

  // Ajax wasn't triggered, build form as normal.
  $ajax_fired = array_key_exists('clicked_button', $form_state);
  if (!$ajax_fired) {
    $agencies = ji_commerce_taxes_agency_load($machine_name);
    if ($agencies) {
      $agencies = array_values($agencies);
      foreach ($agencies as $key => $value) {
        $default_value = array(
          'id' => $value->id,
          'name' => $value->name,
          'component_name' => $value->component_name,
          'agency_name' => $value->agency_name,
          'agency_id' => $value->agency_id,
          'agency_rate' => number_format($value->agency_rate, 2),
          'quickbooks_tax_id' => $tax['quickbooks_tax_id'],
        );
        ji_commerce_taxes_create_form($form, $key, $default_value);
      }
    }
    else {
      ji_commerce_taxes_create_form($form, 0);
    }
  }
  else {
    // Otherwise add the fields for each existing value.
    foreach ($form_state['values']['tax_rate']['agencies'] as $i => $value) {
      $default_value = array(
        'id' => $value['id'],
        'name' => $value['name'],
        'component_name' => $value['component_name'],
        'agency_name' => $value['agency_name'],
        'agency_id' => $value['agency_id'],
        'agency_rate' => $value['agency_rate'],
        'quickbooks_tax_id' => $tax['quickbooks_tax_id'],
      );
      ji_commerce_taxes_create_form($form, $i, $default_value);
    }

    // Add the additional fields for a new entry.
    $last = count($form_state['values']['tax_rate']['agencies']);
    ji_commerce_taxes_create_form($form, $last);
  }

  $form['tax_rate']['add_more'] = array(
    '#type' => 'button',
    '#value' => t('Add More'),
    '#ajax' => array(
      'callback' => 'ji_commerce_taxes_add_more_ajax_callback',
      'wrapper' => 'replace-this',
      'method' => 'replace',
    ),
    '#disabled' => !is_null($tax['quickbooks_tax_id']) ? TRUE : FALSE,
    '#weight' => 5,
  );

  $form['tax_rate']['rate']['#title'] = t('Rate total');
  $form['tax_rate']['rate']['#disabled'] = TRUE;
  $form['tax_rate']['rate']['#required'] = FALSE;
  $form['tax_rate']['rate']['#description'] = '';

  // Let the user know if this tax_rate is set as the local default.
  // Used in areas like the admin order check screens where
  // an order doesn't have a shipment charge - we assume local pick up.
  $form['tax_rate']['local_tax_rate'] = array(
    '#type' => 'radios',
    '#title' => t('Set as default local tax rate'),
    '#default_value' => (variable_get('ji_commerce_taxes_local_tax_rate', '') == $machine_name) ? 1 : 0,
    '#options' => array(
      0 => 'No',
      1 => 'Yes'
    ),
    '#description' => t('Used in areas such as admin order check out where tax is set on orders with no shipping .'),
    '#weight' => 6,
  );

  // Ensure checks with QuickBooks before we commit any changes.
  $form['#validate'][] = 'ji_commerce_taxes_agency_validate';
  // We had to make modifications the the original uc_taxes
  // submit callback.
  $form['#submit'][0] = 'ji_commerce_taxes_agency_submit';
}

/**
 * Ajax callback for the Add More button.
 */
function ji_commerce_taxes_add_more_ajax_callback($form, &$form_state) {
  return $form['tax_rate']['agencies'];
}

/**
 * Query database for all available records.
 */
function ji_commerce_taxes_agency_load($rate_machine_name = NULL) {
  $result = db_query("SELECT * FROM ji_commerce_taxes_agencies where name = :rid", array(':rid' => $rate_machine_name));

  $rates = array();
  foreach ($result as $rate) {
    $rates[$rate->id] = $rate;
  }

  return $rates;
}

/**
 * A helper function that creates necessary fields.
 */
function ji_commerce_taxes_create_form(&$form, $row, $default_values = array()) {
  $form['tax_rate']['agencies'][$row] = array(
    '#type' => 'fieldset',
  );

  // The ji_commerce_taxes_agencies table name or id.
  $form['tax_rate']['agencies'][$row]['id'] = array(
    '#type' => 'hidden',
    '#value' => isset($default_values['id']) ? $default_values['id'] : NULL,
  );

  $form['tax_rate']['agencies'][$row]['component_name'] = array(
    '#type' => 'textfield',
    '#title' => t('Component name'),
    '#default_value' => isset($default_values['component_name']) ? $default_values['component_name'] : '',
    '#disabled' => isset($default_values['quickbooks_tax_id']) ? TRUE : FALSE,
    '#description' => t('Must be unique to QuickBooks.'),
    '#required' => TRUE,
  );

  if (isset($default_values['quickbooks_tax_id'])) {
    $form['tax_rate']['agencies'][$row]['agency_name'] = array(
      '#type' => 'textfield',
      '#title' => t('Agency name'),
      '#required' => FALSE,
      '#default_value' => isset($default_values['agency_name']) ? $default_values['agency_name'] : '',
      '#disabled' => TRUE,
      '#rowid' => $row,
      '#required' => TRUE,
    );
  }
  else {
    $form['tax_rate']['agencies'][$row]['agency_name'] = array(
      '#type' => 'ji_autocomplete',
      '#title' => t('Agency name'),
      '#ji_autocomplete_path' => url('taxagency/autocomplete', array('absolute' => FALSE)),
      '#autocomplete_min_length' => 1,
      '#autocomplete_multiple_delimiter' => '|',
      '#required' => FALSE,
      '#default_value' => isset($default_values['agency_name']) ? $default_values['agency_name'] : '',
      '#rowid' => $row,
      '#description' => t('Select existing agency name or create a new one.'),
      '#required' => TRUE,
    );
  }

  $form['tax_rate']['agencies'][$row]['agency_id'] = array(
    '#type' => 'hidden',
    '#attributes' => array(
      'id' => array('agency-id-' . $row),
    ),
    '#default_value' => isset($default_values['agency_id']) ? $default_values['agency_id'] : '',
  );

  $form['tax_rate']['agencies'][$row]['agency_rate'] = array(
    '#type' => 'textfield',
    '#title' => t('Rate'),
    '#description' => t('The tax rate as a percent. Example: 6%'),
    '#default_value' => isset($default_values['agency_rate']) ? $default_values['agency_rate'] : '',
    '#disabled' => isset($default_values['quickbooks_tax_id']) ? TRUE : FALSE,
    '#required' => TRUE,
  );
}

/**
 * Callback for the autocomplete field.
 *
 * Notice: We used Drupal's caching feature to save multiple
 * costly calls to QuickBooks.
 */
function ji_commerce_taxes_agency_autocomplete($string = '') {
  $matches = array();
  $options = ji_quickbooks_tax_agencies_cache();

  // When user selects with mouse, tell code it's okay to
  // return everything available.
  if ($string !== '' && $string !== ' ') {
    foreach ($options as $key => $agency_name) {
      if (strpos(check_plain(strtolower($agency_name)), strtolower($string)) !== FALSE) {
        $matches[$key] = $agency_name;
      }
    }
  }
  else {
    foreach ($options as $key => $agency_name) {
      $matches[$key] = check_plain($agency_name);
    }
  }

  drupal_json_output($matches);
}

/**
 * Validation callback.
 */
function ji_commerce_taxes_agency_validate($form, &$form_state) {
  // Avoid execution when 'Add More' button is pressed.
  if ($form_state['triggering_element']['#value'] === 'Add More') {
    return;
  }

  // Only perform QuickBooks checks this record hasn't been
  // admitted to QuickBooks. We use the sync
  // functionality to update.
  if (!isset($form_state['values']['quickbooks_tax_id'])) {
    $quickbooks_service = new JIQuickBooksService();

    // Name exists, set error.
    $tax_name_exists = $quickbooks_service->checkTaxName($form_state['values']['tax_rate']['name']);
    if ($tax_name_exists) {
      form_set_error('name', t('A name like that already exists in QuickBooks, please choose a different name.'));
    }

    foreach ($form_state['values']['tax_rate']['agencies'] as $key => $value) {
      // Component name exists, set error.
      $component_name_exists = $quickbooks_service->checkTaxRateName($value['component_name']);
      if ($component_name_exists) {
        // Drupal can be strange at times...
        form_set_error("tax_rate][agencies][$key][component_name", t('The component name exists in QuickBooks, please choose a different name.'));
      }

      // QBO API specifies that an agency_id must be included. Let's
      // query QBO for one or add one if it doesn't exist.
      if (empty($value['agency_id'])) {
        $qbo_agency_response = $quickbooks_service->checkAgencyAddAgencyName($value['agency_name']);
        $form_state['values']['tax_rate']['agencies'][$key]['agency_id'] = $qbo_agency_response->Id;
      }
    }

    // As long as QuickBooks doesn't return any results.
    if ($tax_name_exists == FALSE && $component_name_exists == FALSE) {
      $otax_service = new IPPTaxService();
      $otax_service->TaxCode = $form_state['values']['tax_rate']['title'];

      $rate_details = array();
      foreach ($form_state['values']['tax_rate']['agencies'] as $key => $agency) {
        $otax_rate_details = new IPPTaxRateDetails();
        $otax_rate_details->TaxRateName = $agency['component_name'];
        $otax_rate_details->RateValue = str_replace('%', '', $agency['agency_rate']);
        // See line 'if (empty($value['agency_id']))' above for more
        // details.
        $otax_rate_details->TaxAgencyId = $agency['agency_id'];
        $otax_rate_details->TaxApplicableOn = "Sales";
        $rate_details[] = $otax_rate_details;
      }

      $otax_service->TaxRateDetails = $rate_details;

      $response = $quickbooks_service->dataService->Add($otax_service);
      $quickbooks_service->checkErrors();

      // Set the quickbooks_tax_id so its added to table
      // within the submit callback.
      $form_state['values']['quickbooks_tax_id'] = $response->TaxCodeId;
    }
  }
}

/**
 * Submit callback. Copied and modified from uc_taxes.module.
 */
function ji_commerce_taxes_agency_submit($form, &$form_state) {
  // Avoid execution when 'Add More' button is pressed.
  if ($form_state['triggering_element']['#value'] === 'Add More') {
    return;
  }

  $tax_rate = $form_state['tax_rate'];
  $updated = !empty($tax_rate['name']);

  foreach ($form_state['values']['tax_rate'] as $key => $value) {
    $tax_rate[$key] = $value;
  }

  // Default the display title to the title if empty.
  if (empty($tax_rate['display_title'])) {
    $tax_rate['display_title'] = $tax_rate['title'];
  }

  // Write the tax rate to the database.
  $tax_rate['is_new'] = !$updated;

  $tax_rate['quickbooks_tax_id'] = $form_state['values']['quickbooks_tax_id'];
  $tax_rate['quickbooks_tax_active'] = TRUE;

  commerce_tax_ui_tax_rate_save($tax_rate);
  $rate_saved = commerce_tax_rate_load($tax_rate['name']);

  $rate_total = 0.00;
  foreach ($form_state['values']['tax_rate']['agencies'] as $value) {
    $agency = new stdClass();

    // If 'id' doesn't exist, it's a new record.
    $agency->id = $value['id'];
    $agency->name = $tax_rate['name'];
    $agency->component_name = $value['component_name'];
    $agency->agency_name = $value['agency_name'];
    // 'agency_id' is from the dropdown created from QuickBooks.
    $agency->agency_id = $value['agency_id'];
    $agency->agency_rate = $value['agency_rate'];

    ji_commerce_taxes_agency_save($agency);

    // Sum to display on original uc_taxes rate field.
    $rate_total += $agency->agency_rate;
  }

  // Determine the decimal rate value.
  $rate_saved['rate'] = floatval($rate_total) / 100;

  // Ugly - we're calling another save.
  commerce_tax_ui_tax_rate_save($rate_saved);
  
  if (!isset($form_state['tax_rate']['is_new'])) {
    drupal_set_message(t('Tax rate %title saved.', array('%title' => $tax_rate['title'])));
  }
  else {
    drupal_set_message(t('Tax rate %title created.', array('%title' => $form_state['tax_rate']['title'])));
  }

  // Set if this tax rate is used for local pick type orders.
  // There can only be one! - User can select a different tax rate which will
  // make that one the default.
  if ($form_state['values']['tax_rate']['local_tax_rate'] == 1) {
    variable_set('ji_commerce_taxes_local_tax_rate', str_replace('-', '_', arg(5)));
  }
  else {
    variable_set('ji_commerce_taxes_local_tax_rate', '');
  }

  $form_state['redirect'] = 'admin/commerce/config/taxes';
}

/**
 * Inserts/updates ji_commerce_taxes_agencies schema.
 */
function ji_commerce_taxes_agency_save($agency) {
  // Insert, otherwise update record.
  if (empty($agency->id)) {
    drupal_write_record('ji_commerce_taxes_agencies', $agency);
  }
  else {
    drupal_write_record('ji_commerce_taxes_agencies', $agency, array('id'));
  }
}
