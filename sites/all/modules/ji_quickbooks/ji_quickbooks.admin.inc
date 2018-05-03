<?php

/**
 * @file
 * Administrative form for QuickBooks settings.
 */

/**
 * Builds the main settings page.
 */
function ji_quickbooks_admin_main_settings() {
  // If the module is not yet installed guide them to the right path.
  $ji_quickbooks = ji_quickbooks_get_path('qbosdk3260');
  if (empty($ji_quickbooks)) {
    $link_placeholder = l(t('here'), '/admin/help/ji_quickbooks');
    drupal_set_message(t("The QuickBooks SDK is missing. Please install that first. Click $link_placeholder for more information."), 'error', FALSE);

    $form['ji_quickbooks'] = array(
      '#type' => 'fieldset',
      '#title' => t('QuickBooks Settings'),
      '#description' => t("Please follow these steps in order to complete the installation:"),
      '#collapsible' => FALSE,
      '#tree' => TRUE,
    );
    $list_items = array(
      'Download SDK from ' . l(t('Josh Ideas'), 'https://joshideas.com/sdk/ji_quickbooks/qbosdk3260.zip')
      . ' and place in the libraries directory (/sites/all/libraries/).',
      'The installation of OAuth on your web server using the php.ini extension=oauth.so is required. '
      . "The module will alert you if it detects OAuth isn't installed on the web server.<br>",
    );

    $form['ji_quickbooks']['payment_method'] = array(
      '#prefix' => '<ul><li>',
      '#markup' => implode('</li><li>', $list_items),
      '#suffix' => '</li></ul>',
    );
    return $form;
  }

  // Won't load the screen if OAuth isn't detected.
  module_load_include('inc', 'ji_quickbooks', 'ji_quickbooks_support');
  if (!ji_quickbooks_support_check_oauth(TRUE)) {
    return;
  }

  $quickbooks_service = new JIQuickBooksService(FALSE);
  if (!empty($quickbooks_service->settingErrorMessage)) {
    // We don't display a message since we display
    // the QBO connect buttons below.
  }
  else {
    // We retrieve only the accounts of type 'Other Current Asset' and 'Bank'
    // as per documentation QBO does allow ony those 2 types for payment
    // see https://developer.intuit.com/docs/api/accounting/payment.
    $account_array['accounts'] = $quickbooks_service->getAcountsByType(array('Other Current Asset', 'Bank'));
    $account_array['payment_methods'] = $quickbooks_service->getAllPaymentMethods();
    $account_array['terms'] = $quickbooks_service->getAllTerms();
    $account_array['products'] = $quickbooks_service->getAllProducts();

    $error_data = $quickbooks_service->checkErrors();
    $accounts = array();
    $accounts[0] = 'Please select...';

    $pay_methods = array();
    $pay_methods[0] = 'Please select...';

    $term = array();
    $term[0] = 'Please select...';

    $products = array();
    $products[0] = 'Please select...';

    if (empty($error_data['code'])) {
      foreach ($account_array['accounts'] as $account) {
        $accounts[$account->Id] = $account->Name;
      }
      foreach ($account_array['payment_methods'] as $pay_method) {
        $pay_methods[$pay_method->Id] = $pay_method->Name;
      }
      foreach ($account_array['terms'] as $terms) {
        $term[$terms->Id] = $terms->Name;
      }
      foreach ($account_array['products'] as $product) {
        $products[$product->Id] = $product->Name;
      }
    }

    $form['ji_quickbooks'] = array(
      '#type' => 'fieldset',
      '#title' => t('QuickBooks Settings'),
      '#description' => t("When creating invoices and payments, QuickBooks requires we choose a default."),
      '#collapsible' => FALSE,
      '#tree' => TRUE,
    );

    global $base_url;
    $img_path = $base_url . '/' . drupal_get_path('module', 'ji_quickbooks') . '/img/';
    drupal_add_css(drupal_get_path('module', 'ji_quickbooks') . '/css/ji_quickbooks_admin.css');

    $form['ji_quickbooks']['invoice'] = array(
      '#type' => 'fieldset',
      '#title' => t('Invoice'),
      '#collapsible' => FALSE,
    );

    $form['ji_quickbooks']['invoice']['product'] = array(
      '#type' => 'select',
      '#title' => t('Product/Service'),
      '#options' => $products,
      '#default_value' => variable_get('ji_quickbooks_default_product', 0),
      '#required' => TRUE,
    );

    $product_services_img = $img_path . 'product_service.png';
    $form['ji_quickbooks']['invoice']['product_markup'] = array(
      '#markup' => "<img src='$product_services_img' width='335' height='209'><div class='description'>When creating invoice line items, what service or product will each be set as?</div>",
      '#prefix' => '<div class="ji-quickbooks-img product-markup">',
      '#suffix' => '</div>',
    );

    $form['ji_quickbooks']['invoice']['terms'] = array(
      '#type' => 'select',
      '#title' => t('Terms'),
      '#options' => $term,
      '#default_value' => variable_get('ji_quickbooks_term', 0),
      '#required' => TRUE,
    );

    $terms_img = $img_path . 'terms.png';
    $form['ji_quickbooks']['invoice']['terms_markup'] = array(
      '#markup' => "<img src='$terms_img' width='335' height='209'><div class='description'>When creating an invoice, choose which term should be the default.</div>",
      '#prefix' => '<div class="ji-quickbooks-img terms-markup">',
      '#suffix' => '</div>',
    );

    $form['ji_quickbooks']['payment'] = array(
      '#type' => 'fieldset',
      '#title' => t('Payment'),
      '#collapsible' => FALSE,
    );

    $form['ji_quickbooks']['payment']['payment_method'] = array(
      '#type' => 'select',
      '#title' => t('Payment method'),
      '#options' => $pay_methods,
      '#default_value' => variable_get('ji_quickbooks_payment_method', 0),
      '#required' => TRUE,
    );

    $payment_method_img = $img_path . 'payment_method.png';
    $form['ji_quickbooks']['payment']['payment_method_markup'] = array(
      '#markup' => "<img src='$payment_method_img' width='335' height='209'><div class='description'>When creating a payment, what method is used?</div>",
      '#prefix' => '<div class="ji-quickbooks-img payment-method-markup">',
      '#suffix' => '</div>',
    );

    $form['ji_quickbooks']['payment']['account_payment'] = array(
      '#type' => 'select',
      '#title' => t('Deposit to'),
      '#options' => $accounts,
      '#default_value' => variable_get('ji_quickbooks_payment_account', 0),
      '#required' => TRUE,
    );

    $account_payment_img = $img_path . 'deposit_to.png';
    $form['ji_quickbooks']['payment']['account_payment_markup'] = array(
      '#markup' => "<img src='$account_payment_img' width='335' height='209'><div class='description'>When creating a payment, what account are monies being deposited to?</div>",
      '#prefix' => '<div class="ji-quickbooks-img account-payment-markup">',
      '#suffix' => '</div>',
    );
  }

  $form['ji_quickbooks_config'] = array(
    '#type' => 'fieldset',
    '#title' => t('Connect to QuickBooks'),
    '#description' => t("Select from a free development or paid production account."),
    '#collapsible' => TRUE,
    '#collapsed' => !empty(variable_get('ji_quickbooks_settings_access_token', '')),
    '#tree' => TRUE,
  );

  $environments = array('dev' => 'Development', 'pro' => 'Production');
  $form['ji_quickbooks_config']['environment'] = array(
    '#type' => 'radios',
    '#title' => t('Account type'),
    '#default_value' => variable_get('ji_quickbooks_settings_environment', 'dev'),
    '#options' => $environments,
    '#required' => TRUE,
  );

  $connect_disabled = TRUE;
  // If realm_id is missing but consumer key and secret aren't, then
  // display 'Connect to QuickBooks' button.
  if (empty(variable_get('ji_quickbooks_settings_realm_id', '')) &&
      empty(variable_get('ji_quickbooks_settings_consumer_key', '')) &&
      empty(variable_get('ji_quickbooks_settings_consumer_secret', ''))) {
    $connect_disabled = FALSE;
  }

  // Display which company we're connected to.
  if($connect_disabled) {
    $response = $quickbooks_service->getCompanyData();

    $form['ji_quickbooks_config']['company_info'] = array(
      '#markup' => "You're connected to: <b>" . $response[0]->CompanyName . "</b>",
      '#prefix' => '<h3>',
      '#suffix' => '</h3>',
    );
  }

  $form['ji_quickbooks_config']['connect'] = array(
    '#type' => 'submit',
    '#value' => t('Connect to QuickBooks'),
    '#submit' => array('ji_quickbooks_connect_submit'),
    '#disabled' => $connect_disabled,
  );

  $disconnect_disabled = FALSE;
  // If realm_id consumer key and secret are not empty then display
  // 'Disconnect from QuickBooks' button.
  if (empty(variable_get('ji_quickbooks_settings_realm_id', '')) ||
      empty(variable_get('ji_quickbooks_settings_consumer_key', '')) ||
      empty(variable_get('ji_quickbooks_settings_consumer_secret', ''))) {
    $disconnect_disabled = TRUE;
  }

  drupal_add_js('https://appcenter.intuit.com/Content/IA/intuit.ipp.anywhere.js', array('type' => 'external'));
  // When the user disconnects from QuickBooks, this also logs them out.
  // This will enable them to enter a new account.
  // Adds a JQuery click() event listener to the disconnect button.
  drupal_add_js(drupal_get_path('module', 'ji_quickbooks') . '/js/openid_logout.js');

  $form['ji_quickbooks_config']['disconnect'] = array(
    '#type' => 'submit',
    '#value' => t('Disconnect from QuickBooks'),
    '#submit' => array('ji_quickbooks_disconnect_submit'),
    '#disabled' => $disconnect_disabled,
  );

  if (!empty(variable_get('ji_quickbooks_settings_realm_id', '')) &&
      !empty(variable_get('ji_quickbooks_settings_consumer_key', '')) &&
      !empty(variable_get('ji_quickbooks_settings_consumer_secret', ''))) {
    $form['ji_quickbooks_config']['manual_renewal'] = array(
      '#type' => 'submit',
      '#value' => t('Manually generate keys'),
      '#submit' => array('ji_quickbooks_renewal_submit'),
    );
    $form['ji_quickbooks_config']['manual_renewal_markup'] = array(
      '#markup' => t("JI QuickBooks uses hook_cron to automatically renew access keys after five months, per QuickBooks API rules. You shouldn't have a need to manually generate keys unless there was an error."),
      '#prefix' => '<div class="description">',
      '#suffix' => '</div>',
    );
  }

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save settings'),
  );

  return $form;
}

/**
 * Saves settings/parameters to variables.
 */
function ji_quickbooks_admin_main_settings_submit($form = array(), &$form_state = array()) {
  if (isset($form_state['values']['ji_quickbooks'])) {
    variable_set('ji_quickbooks_default_product', $form_state['values']['ji_quickbooks']['invoice']['product']);
    variable_set('ji_quickbooks_term', $form_state['values']['ji_quickbooks']['invoice']['terms']);

    variable_set('ji_quickbooks_payment_method', $form_state['values']['ji_quickbooks']['payment']['payment_method']);
    variable_set('ji_quickbooks_payment_account', $form_state['values']['ji_quickbooks']['payment']['account_payment']);
  }

  $settings = $form_state['input']['ji_quickbooks_config'];

  // The user switched between environments, disconnect.
  // Javascript is also enabled to call Intuit's Javascript disconnect
  // see logoff.js.
  if ($settings['environment'] !== variable_get('ji_quickbooks_settings_environment') && $settings['environment'] !== NULL) {
    drupal_set_message(t("Environment variables correctly saved."));
    ji_quickbooks_disconnect_submit();
  }

  variable_set('ji_quickbooks_settings_environment', $settings['environment']);

  drupal_set_message('JI QuickBook settings saved.', 'status', FALSE);
}

/**
 * Submit handler.
 *
 * Starts the OpenID communication process with QBO.
 */
function ji_quickbooks_connect_submit() {
  global $base_url;
  $options = array(
    'query' => array(
      'connectWithIntuitOpenId' => '',
      'return_url' => $base_url . url('saveoauthsettings'),
      'environment' => variable_get('ji_quickbooks_settings_environment', 'dev'),
  ));

  drupal_goto('https://ji-quickbooks.joshideas.com/ji_oauth_authorize', $options);
}

/**
 * Disconnect from QBO.
 *
 * See logoff.js - logging off their QuickBooks OpenID session
 * as well.
 */
function ji_quickbooks_disconnect_submit() {
  if (variable_get('ji_quickbooks_settings_access_token')) {
    $quickbooks_service = new JIQuickBooksService(FALSE);
    $quickbooks_service->oauthDisconnect();
  }

  // Clear access token.
  variable_del('ji_quickbooks_settings_access_token');
  variable_del('ji_quickbooks_settings_access_token_secret');
  variable_del('ji_quickbooks_settings_realm_id');

  variable_del('ji_quickbooks_settings_consumer_key');
  variable_del('ji_quickbooks_settings_consumer_secret');

  // Remove counter since user disconnected QuickBooks.
  // Added again if reconnect occurs.
  variable_del('ji_quickbooks_cron_started_on');
}

/**
 * Manually renew tokens.
 */
function ji_quickbooks_renewal_submit() {
  $quickbooks_service = new JIQuickBooksService(FALSE);
  $response = $quickbooks_service->oauthRenew();

  switch ($response->ErrorCode) {
    case '0':
      // Renewal worked, reset started_on variable so cron
      // will reattempt five months from now.
      variable_set('ji_quickbooks_cron_started_on', REQUEST_TIME);

      // Replace existing tokens with new ones.
      variable_set('ji_quickbooks_settings_access_token', $response->OAuthToken);
      variable_set('ji_quickbooks_settings_access_token_secret', $response->OAuthTokenSecret);

      drupal_set_message(t('Successfully regenerated access tokens.'), 'status', FALSE);
      break;
    case '212':
      $installed_on = variable_get('ji_quickbooks_cron_started_on');
      $five_months = $installed_on + (60 * 60 * 24 * 30 * 5);
      $dt = date('r', $five_months);

      drupal_set_message(t("Your QuickBooks tokens can only be generated after $dt"), 'warning', FALSE);
      break;
    default:
      drupal_set_message(t("Tokens are invalid. Someone might have signed in using your account on a different website."), 'error', FALSE);
      break;
  }
}
