<?php

/**
 * @file
 * Keeping things organized.
 */

/**
 * Called from ji_uc_taxes.module - ji_uc_taxes_form_alter().
 *
 * @todo Need to fix http:// call to jquery.mask.js. Should be
 * smart enough to know if website is on https or http.
 */
function ji_uc_taxes_form_alter_uc_taxes_form(&$form, &$form_state, $form_id) {

  // Clear the cache on each page load.
  cache_clear_all(JI_QUICKBOOKS_TAX_AGENCIES, 'cache');
  $error = ji_quickbooks_tax_agencies_cache();
  if ($error === TRUE) {
    drupal_set_message(t('Additionally, adding QuickBooks taxes are disabled since a severe error occurred. Please address the errors to turn on this feature.'), 'error', FALSE);
    return;
  }

  $form['name']['#weight'] = -20;
  $form['name']['#description'] = t('Must be unique to QuickBooks. This name will appear to the customer when this tax is applied to an order.');

  $form['#attached']['js'] = array(
    drupal_add_js('//cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.10/jquery.mask.js', 'external'),
    drupal_get_path('module', 'ji_uc_taxes') . '/js/decimal_formatter.js',
  );

  // If tax entry is a QBO entry, disable fields.
  $rate_id = $form['id']['#value'];
  $orate = uc_taxes_rate_load($rate_id);
  if (!is_null($orate->quickbooks_tax_id)) {
    $form['alert'] = array(
      '#markup' => '<h2>' . t('NOTICE: This tax rate is synced between QuickBooks and Drupal hence you cannot change the name or rate - please do so in QuickBooks.') . '</h2>',
      '#weight' => -100,
    );

    // We disable since QuickBooks doesn't permit updates.
    $form['name']['#disabled'] = TRUE;
    $form['rate']['#disabled'] = TRUE;

    $form['quickbooks_tax_id'] = array(
      '#type' => 'hidden',
      '#value' => $orate->quickbooks_tax_id,
    );
  }

  // Used during validation callback.
  $form_state['values']['quickbooks_tax_id'] = $orate->quickbooks_tax_id;

  $form['agencies'] = array(
    '#type' => 'fieldset',
    '#title' => 'Tax Agency',
    '#prefix' => '<div id="replace-this">',
    '#suffix' => '</div>',
    '#tree' => TRUE,
    '#weight' => -7,
  );

  // Ajax wasn't triggered, build form as normal.
  $ajax_fired = array_key_exists('clicked_button', $form_state);
  if (!$ajax_fired) {
    $agencies = ji_uc_taxes_agency_load($form['id']['#value']);
    if ($agencies) {
      $agencies = array_values($agencies);
      foreach ($agencies as $key => $value) {
        $default_value = array(
          'id' => $value->id,
          'uc_tax_id' => $value->uc_tax_id,
          'component_name' => $value->component_name,
          'agency_name' => $value->agency_name,
          'agency_id' => $value->agency_id,
          'agency_rate' => number_format($value->agency_rate, 2),
          'quickbooks_tax_id' => $orate->quickbooks_tax_id,
        );
        ji_uc_taxes_create_form($form, $key, $default_value);
      }
    }
    else {
      ji_uc_taxes_create_form($form, 0);
    }
  }
  else {
    // Otherwise add the fields for each existing value.
    foreach ($form_state['values']['agencies'] as $i => $value) {
      $default_value = array(
        'id' => $value['id'],
        'uc_tax_id' => $value['uc_tax_id'],
        'component_name' => $value['component_name'],
        'agency_name' => $value['agency_name'],
        'agency_id' => $value['agency_id'],
        'agency_rate' => $value['agency_rate'],
        'quickbooks_tax_id' => $orate->quickbooks_tax_id,
      );
      ji_uc_taxes_create_form($form, $i, $default_value);
    }

    // Add the additional fields for a new entry.
    $last = count($form_state['values']['agencies']);
    ji_uc_taxes_create_form($form, $last);
  }

  $form['add_more'] = array(
    '#type' => 'button',
    '#value' => t('Add More'),
    '#ajax' => array(
      'callback' => 'ji_uc_taxes_add_more_ajax_callback',
      'wrapper' => 'replace-this',
      'method' => 'replace',
    ),
    '#disabled' => !is_null($orate->quickbooks_tax_id) ? TRUE : FALSE,
    '#weight' => -6,
  );

  $form['rate']['#weight'] = -6;
  $form['rate']['#title'] = t('Rate total');
  $form['rate']['#disabled'] = TRUE;
  $form['rate']['#required'] = FALSE;
  $form['rate']['#description'] = '';

  // Ensure checks with QuickBooks before we commit any changes.
  $form['#validate'][] = 'ji_uc_taxes_agency_validate';
  // We had to make modifications the the original uc_taxes
  // submit callback.
  $form['#submit'][0] = 'ji_uc_taxes_agency_submit';
}

/**
 * A helper function that creates necessary fields.
 */
function ji_uc_taxes_create_form(&$form, $row, $default_values = array()) {
  $form['agencies'][$row] = array(
    '#type' => 'fieldset',
  );

  // The ji_uc_taxes_agencies table id.
  $form['agencies'][$row]['id'] = array(
    '#type' => 'hidden',
    '#value' => isset($default_values['id']) ? $default_values['id'] : NULL,
  );

  $form['agencies'][$row]['component_name'] = array(
    '#type' => 'textfield',
    '#title' => t('Component name'),
    '#default_value' => isset($default_values['component_name']) ? $default_values['component_name'] : '',
    '#disabled' => isset($default_values['quickbooks_tax_id']) ? TRUE : FALSE,
    '#description' => t('Must be unique to QuickBooks.'),
    '#required' => TRUE,
  );

  if (isset($default_values['quickbooks_tax_id'])) {
    $form['agencies'][$row]['agency_name'] = array(
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
    $form['agencies'][$row]['agency_name'] = array(
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

  $form['agencies'][$row]['agency_id'] = array(
    '#type' => 'hidden',
    '#attributes' => array(
      'id' => array('agency-id-' . $row),
    ),
    '#default_value' => isset($default_values['agency_id']) ? $default_values['agency_id'] : '',
  );

  $form['agencies'][$row]['agency_rate'] = array(
    '#type' => 'textfield',
    '#title' => t('Rate'),
    '#description' => t('The tax rate as a percent. Example: 6%'),
    '#default_value' => isset($default_values['agency_rate']) ? $default_values['agency_rate'] : '',
    '#disabled' => isset($default_values['quickbooks_tax_id']) ? TRUE : FALSE,
    '#required' => TRUE,
  );
}

/**
 * Ajax callback for the Add More button.
 */
function ji_uc_taxes_add_more_ajax_callback($form, &$form_state) {
  return $form['agencies'];
}

/**
 * Query database for all available records.
 */
function ji_uc_taxes_agency_load($rate_id = NULL) {
  $result = db_query("SELECT * FROM ji_uc_taxes_agencies where uc_tax_id = :rid", array(':rid' => $rate_id));

  foreach ($result as $rate) {
    $rates[$rate->id] = $rate;
  }

  return $rates;
}

/**
 * Inserts/updates ji_uc_taxes_agencies schema.
 */
function ji_uc_taxes_agency_save($agency) {
  // Insert, otherwise update record.
  if (empty($agency->id)) {
    drupal_write_record('ji_uc_taxes_agencies', $agency);
  }
  else {
    drupal_write_record('ji_uc_taxes_agencies', $agency, array('id'));
  }
}

/**
 * Validation callback.
 */
function ji_uc_taxes_agency_validate($form, &$form_state) {
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
    $tax_name_exists = $quickbooks_service->checkTaxName($form_state['values']['name']);
    if ($tax_name_exists) {
      form_set_error('name', t('A name like that already exists in QuickBooks, please choose a different name.'));
    }

    foreach ($form_state['values']['agencies'] as $key => $value) {
      // Component name exists, set error.
      $component_name_exists = $quickbooks_service->checkTaxRateName($value['component_name']);
      if ($component_name_exists) {
        // Drupal can be strange at times...
        form_set_error("agencies][$key][component_name", t('The component name exists in QuickBooks, please choose a different name.'));
      }

      // QBO API specifies that an agency_id must be included. Let's
      // query QBO for one or add one if it doesn't exist.
      if (empty($value['agency_id'])) {
        $qbo_agency_response = $quickbooks_service->checkAgencyAddAgencyName($value['agency_name']);
        $form_state['values']['agencies'][$key]['agency_id'] = $qbo_agency_response->Id;
      }
    }

    // As long as QuickBooks doesn't return any results.
    if ($tax_name_exists == FALSE && $component_name_exists == FALSE) {
      $otax_service = new IPPTaxService();
      $otax_service->TaxCode = $form_state['values']['name'];

      $rate_details = array();
      foreach ($form_state['values']['agencies'] as $key => $agency) {
        $otax_rate_details = new IPPTaxRateDetails();
        $otax_rate_details->TaxRateName = $agency['component_name'];
        $otax_rate_details->RateValue = str_replace('%', '', $agency['agency_rate']);
        $otax_rate_details->TaxAgencyId = $agency['agency_id'];
        $otax_rate_details->TaxApplicableOn = "Sales";
        $rate_details[] = $otax_rate_details;
      }

      $otax_service->TaxRateDetails = $rate_details;

      $tax_name_exists = $quickbooks_service->dataService->Add($otax_service);
      $quickbooks_service->checkErrors();

      // Set the quickbooks_tax_id so its added to table
      // within the submit callback.
      $form_state['values']['quickbooks_tax_id'] = $tax_name_exists->TaxCodeId;
    }
  }
}

/**
 * Submit callback. Copied and modified from uc_taxes.module.
 */
function ji_uc_taxes_agency_submit($form, &$form_state) {
  // Avoid execution when 'Add More' button is pressed.
  if ($form_state['triggering_element']['#value'] === 'Add More') {
    return;
  }

  if (isset($form_state['values']['id'])) {
    $rate_existing = uc_taxes_rate_load($form_state['values']['id']);

    $rate_existing->name = $form_state['values']['name'];
    $rate_existing->taxed_product_types = array_filter($form_state['values']['taxed_product_types']);
    $rate_existing->taxed_line_items = array_filter($form_state['values']['taxed_line_items']);
    $rate_existing->weight = $form_state['values']['weight'];
    $rate_existing->shippable = $form_state['values']['shippable'];
    $rate_existing->display_include = $form_state['values']['display_include'];
    $rate_existing->inclusion_text = $form_state['values']['inclusion_text'];

    // We may have a case where existing uc_taxes record existed
    // but now is being synced with QuickBooks.
    if (!isset($rate_existing->quickbooks_tax_id)) {
      $rate_existing->quickbooks_tax_id = $form_state['values']['quickbooks_tax_id'];
      $rate_existing->quickbooks_tax_active = TRUE;
    }

    $rate_saved = uc_taxes_rate_save($rate_existing);
  }
  else {
    // Insert new record but it could be an existing one before
    // ji_uc_taxes was installed.
    $rate_new = (object) array(
      // In case record existed before ji_uc_taxes.
      'id' => $form_state['values']['id'],
      'name' => $form_state['values']['name'],
      'taxed_product_types' => array_filter($form_state['values']['taxed_product_types']),
      'taxed_line_items' => array_filter($form_state['values']['taxed_line_items']),
      'weight' => $form_state['values']['weight'],
      'shippable' => $form_state['values']['shippable'],
      'display_include' => $form_state['values']['display_include'],
      'inclusion_text' => $form_state['values']['inclusion_ text'],
      'quickbooks_tax_id' => $form_state['values']['quickbooks_tax_id'],
      'quickbooks_tax_active' => TRUE,
    );

    $rate_saved = uc_taxes_rate_save($rate_new);
  }

  $rate_total = 0.00;
  foreach ($form_state['values']['agencies'] as $value) {
    $agency = new stdClass();

    // If 'id' doesn't, it's a new record.
    $agency->id = $value['id'];
    // 'id' from uc_taxes table.
    $agency->uc_tax_id = $rate_saved->id;
    $agency->component_name = $value['component_name'];
    $agency->agency_name = $value['agency_name'];
    // 'agency_id' is from the dropdown created from QuickBooks.
    $agency->agency_id = $value['agency_id'];
    $agency->agency_rate = $value['agency_rate'];

    ji_uc_taxes_agency_save($agency);

    // Sum to display on original uc_taxes rate field.
    $rate_total += $agency->agency_rate;
  }

  // Determine the decimal rate value.
  $rate_saved->rate = floatval($rate_total) / 100;

  // Ugly - we're calling another save.
  uc_taxes_rate_save($rate_saved);

  // Update the name of the associated conditions.
  $conditions = rules_config_load('uc_taxes_' . $form_state['values']['id']);
  if ($conditions) {
    $conditions->label = $form_state['values']['name'];
    $conditions->save();
  }

  // Display a message and redirect back to the overview,
  // or the conditions page for new taxes.
  if ($form_state['values']['id']) {
    drupal_set_message(t('Tax rate %name saved.', array('%name' => $form_state['values']['name'])));
    $form_state['redirect'] = 'admin/store/settings/taxes';
  }
  else {
    drupal_set_message(t('Tax rate %name created.', array('%name' => $form_state['values']['name'])));
    $form_state['redirect'] = 'admin/store/settings/taxes/manage/uc_taxes_' . $rate_saved->id;
  }
}

/**
 * Callback for the autocomplete field.
 *
 * Notice: We used Drupal's caching feature to save multiple
 * costly calls to QuickBooks.
 */
function ji_uc_taxes_agency_autocomplete($string = '') {
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
