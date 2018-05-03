<?php

/**
 * @file
 * Administrative form for QuickBooks settings.
 */
require_once ji_quickbooks_get_path('qbosdk3260') . '/config.php';
require_once ji_quickbooks_get_path('qbosdk3260') . '/Core/ServiceContext.php';
require_once ji_quickbooks_get_path('qbosdk3260') . '/DataService/DataService.php';
require_once ji_quickbooks_get_path('qbosdk3260') . '/PlatformService/PlatformService.php';
require_once ji_quickbooks_get_path('qbosdk3260') . '/Utility/Configuration/ConfigurationManager.php';
require_once ji_quickbooks_get_path('qbosdk3260') . '/Core/OperationControlList.php';

/**
 * JIQuickbooksService - provides access to QBO.
 */
class JIQuickBooksService {

  /**
   * Service stype.
   *
   * @var string
   */
  public $serviceType;

  /**
   * Realm Id.
   *
   * @var string
   */
  public $realmId;

  /**
   * Request Validator.
   *
   * @var OAuthRequestValidator
   */
  public $requestValidator;

  /**
   * Service Context.
   *
   * @var ServiceContext
   */
  public $serviceContext;

  /**
   * Data Service.
   *
   * @var DataService
   */
  public $dataService;
  public static $faultValidation = 0;
  public static $faultSevere = 1;
  public static $faultUncaught = 2;

  /**
   * Saves error message if QBO settings cannot be parsed.
   *
   * @var string
   */
  public $settingErrorMessage;

  /**
   * Setup QuickBooks using the config page.
   *
   * @param bool $email_error
   *   TRUE sends email if error occurs.
   */
  public function __construct($email_error = TRUE) {
    $this->getConnection($email_error);
  }

  /**
   * Creates one connection to QuickBooks Online.
   */
  private function getConnection($email_error) {

    // Specify QBO or QBD.
    $this->serviceType = IntuitServicesType::QBO;

    if (empty(variable_get('ji_quickbooks_settings_realm_id')) ||
        empty(variable_get('ji_quickbooks_settings_access_token')) ||
        empty(variable_get('ji_quickbooks_settings_access_token_secret')) ||
        empty(variable_get('ji_quickbooks_settings_consumer_key')) ||
        empty(variable_get('ji_quickbooks_settings_consumer_secret'))) {
      $this->settingErrorMessage = t("JI QuickBooks can't connect to QBO. Please attempt to reconnect.");
      watchdog('JI QuickBooks', $this->settingErrorMessage, NULL, WATCHDOG_CRITICAL);
      if ($email_error) {
        $this->sendErrorNoticeEmail($this->settingErrorMessage);
      }
      return;
    }

    // Get App Config.
    $this->realmId = variable_get('ji_quickbooks_settings_realm_id');

    // Prep Service Context.
    $this->requestValidator = new OAuthRequestValidator(
        variable_get('ji_quickbooks_settings_access_token'), variable_get('ji_quickbooks_settings_access_token_secret'), variable_get('ji_quickbooks_settings_consumer_key'), variable_get('ji_quickbooks_settings_consumer_secret')
    );

    $this->serviceContext = new ServiceContext($this->realmId, $this->serviceType, $this->requestValidator);

    if (!$this->serviceContext) {
      $this->settingErrorMessage = t("Problem while initializing ServiceContext.");
      watchdog('JI QuickBooks', $this->settingErrorMessage, NULL, WATCHDOG_CRITICAL);
      if ($email_error) {
        $this->sendErrorNoticeEmail($this->settingErrorMessage);
      }
      return;
    }

    $this->serviceContext->minorVersion = 3;

    // Prep Data Services.
    $this->dataService = new DataService($this->serviceContext);

    if (!$this->dataService) {
      $this->settingErrorMessage = t("Problem while initializing DataService.");
      watchdog('JI QuickBooks', $this->settingErrorMessage, NULL, WATCHDOG_CRITICAL);
      if ($email_error) {
        $this->sendErrorNoticeEmail($this->settingErrorMessage);
      }
      return;
    }
  }

  /**
   * Disconnect QBO keys from session.
   */
  public function oauthDisconnect() {
    $platformService = new PlatformService($this->serviceContext);

    $respxml = $platformService->Disconnect();

    if ($respxml->ErrorCode == '0') {
      $this->settingErrorMessage = t("Disconnect successful.");
      $severity = WATCHDOG_INFO;
    }
    else {
      $this->settingErrorMessage = t("Error! Disconnect failed.");
      $severity = WATCHDOG_CRITICAL;

      if ($respxml->ErrorCode == '270') {
        $this->settingErrorMessage = t("OAuth tokens rejected. Did someone else use your tokens?");
        $severity = WATCHDOG_CRITICAL;
      }
    }
    watchdog('JI QuickBooks', $this->settingErrorMessage, NULL, $severity);
    drupal_set_message($this->settingErrorMessage);
  }

  /**
   * Attempt to reconnect to QuickBooks.
   *
   * Returns an error code in ErrorCode or, returns ErrorCode 0
   * with OAuthToken and OAuthTokenSecret if reconnect was successful.
   */
  public function oauthRenew() {
    $platformService = new PlatformService($this->serviceContext);
    return $platformService->Reconnect();
  }

  /**
   * Adds or updates customer information.
   *
   * $customer_data array that maps to IPPCustomer.
   * Mapping is useful to help prevent creating multiple
   * functions when form submission or object submission is used.
   */
  public function processCustomer($customer_data = array()) {
    $o_customer = new IPPCustomer();

    // Not new, retrieve QBO Id and token so Add()
    // updates rather than inserts.
    if (!empty($customer_data['Id'])) {
      // Quickbooks requires we retrieve a SyncToken
      // first, if we're going to update.
      $customer_response = $this->getCustomerById($customer_data['Id']);

      $o_customer->Id = $customer_data['Id'];
      $o_customer->SyncToken = $customer_response->SyncToken;
    }

    $o_customer->sparse = TRUE;
    $o_customer->Title = $customer_data['Title'];
    $o_customer->GivenName = $customer_data['GivenName'];
    $o_customer->MiddleName = $customer_data['MiddleName'];
    $o_customer->FamilyName = $customer_data['FamilyName'];
    // Was missing. Needed?
    // $oCustomer->Suffix = $customer_data['Suffix']; save.
    $o_customer->FullyQualifiedName = $o_customer->Title . ' ' . $o_customer->GivenName . ' ' . $o_customer->MiddleName . ' ' . $o_customer->FamilyName;

    $o_customer->CompanyName = $customer_data['CompanyName'];
    $o_customer->DisplayName = $customer_data['DisplayName'];
    $o_customer->PrintOnCheckName = $o_customer->FullyQualifiedName;

    $o_customer->Notes = $customer_data['Notes'];

    $o_primary_phone = new IPPTelephoneNumber();
    $o_primary_phone->FreeFormNumber = $customer_data['PrimaryPhone'];
    $o_customer->PrimaryPhone = $o_primary_phone;

    if (!empty($customer_data['Fax'])) {
      $o_fax = new IPPTelephoneNumber();
      $o_fax->FreeFormNumber = $customer_data['Fax'];
      $o_customer->Fax = $o_fax;
    }

    if (!empty($customer_data['Mobile'])) {
      $o_mobile = new IPPTelephoneNumber();
      $o_mobile->FreeFormNumber = $customer_data['Mobile'];
      $o_customer->Mobile = $o_mobile;
    }

    if (!empty($customer_data['Email'])) {
      $o_primary_email_addr = new IPPEmailAddress();
      $o_primary_email_addr->Address = $customer_data['Email'];
      $o_customer->PrimaryEmailAddr = $o_primary_email_addr;
    }
    if (!empty($customer_data['Website'])) {
      $o_web_addr = new IPPWebSiteAddress();
      $o_web_addr->URI = $customer_data['Website'];
      $o_customer->WebAddr = $o_web_addr;
    }

    $o_bill_address = new IPPPhysicalAddress();
    $o_bill_address->Line1 = $customer_data['BillAddressStreet1'];
    $o_bill_address->Line2 = $customer_data['BillAddressStreet2'];
    $o_bill_address->City = $customer_data['BillAddressCity'];
    $o_bill_address->CountrySubDivisionCode = $customer_data['BillAddressCountrySubDivisionCode'];
    $o_bill_address->PostalCode = $customer_data['BillAddressPostalCode'];
    $o_bill_address->Country = $customer_data['BillAddressCountry'];
    // $oBillAddress->Lat = $request->BillAddr->Lat; save.
    // $oBillAddress->Long = $request->BillAddr->Long; save.
    $o_customer->BillAddr = $o_bill_address;

    $o_ship_address = new IPPPhysicalAddress();
    $o_ship_address->Line1 = $customer_data['ShipAddressStreet1'];
    $o_ship_address->Line2 = $customer_data['ShipAddressStreet2'];
    $o_ship_address->City = $customer_data['ShipAddressCity'];
    $o_ship_address->CountrySubDivisionCode = $customer_data['ShipAddressCountrySubDivisionCode'];
    $o_ship_address->PostalCode = $customer_data['ShipAddressPostalCode'];
    $o_ship_address->Country = $customer_data['ShipAddressCountry'];
    // $oShipAddress->Lat = $request->ShipAddr->Lat; save.
    // $oShipAddress->Long = $request->ShipAddr->Long; save.
    $o_customer->ShipAddr = $o_ship_address;

    $response = array();
    // This may insert or update.
    $response['response'] = $this->dataService->Add($o_customer);
    $response['error'] = $this->checkErrors();
    return $response;
  }

  /**
   * Adds/Updates an invoice.
   */
  public function processInvoice($invoice_data = array()) {
    $o_invoice = new IPPInvoice();

    // CustomerId.
    $o_invoice->CustomerRef = $invoice_data['CustomerRef'];
    $o_customer_memo_ref = new IPPMemoRef();
    $o_invoice->CustomerMemo = $o_customer_memo_ref;
    $o_invoice->TxnDate = $invoice_data['TxnDate'];
    $o_invoice->SalesTermRef = $invoice_data['SalesTermRef'];
    $o_invoice->BillEmail = $invoice_data['BillEmail'];
    $o_invoice->Line = $invoice_data['Line'];
    $o_invoice->TxnTaxDetail = $invoice_data['TxnTaxDetail'];
    $o_invoice->AllowOnlineCreditCardPayment = 0;
    $o_invoice->AllowOnlineACHPayment = 1;
    $o_invoice->AllowIPNPayment = 1;
    $o_invoice->AllowOnlinePayment = 1;

    // Optional billing and shipping address
    if (isset($invoice_data['BillAddr'])) {
      $o_invoice->BillAddr = $invoice_data['BillAddr'];
    }
    if (isset($invoice_data['ShipAddr'])) {
      $o_invoice->ShipAddr = $invoice_data['ShipAddr'];
    }

    $invoice['response'] = $this->dataService->Add($o_invoice);
    $invoice['error'] = $this->checkErrors();

    // Flags QuickBooks to send email contaning an invoice.
    if ($invoice_data['EmailInvoice']) {
      $this->dataService->SendEmail($invoice);
      $invoice['error'] = $this->checkErrors();
    }

    return $invoice;
  }

  /**
   * Process payment.
   */
  public function processPayment($payment_data = array()) {
    $o_payment = new IPPPayment();
    $o_payment->CustomerRef = $payment_data['customer_ref'];
    // Checking.
    $o_payment->DepositToAccountRef = variable_get('ji_quickbooks_payment_account');
    // Check.
    $o_payment->PaymentMethodRef = variable_get('ji_quickbooks_payment_method');
    // Shall we use another ref number?
    $o_payment->PaymentRefNum = 'Web order: ' . $payment_data['payment_ref_num'];
    $o_payment->TotalAmt = $payment_data['total_amt'];
    // TODO: determine the usage of this field.
    $o_payment->UnappliedAmt = '0';
    $o_payment->ProcessPayment = 'FALSE';
    $o_payment->TxnDate = date('Y-M-d', $payment_data['txn_date']);
    $o_payment->CurrencyRef = $payment_data['currency_ref'];

    $o_line = new IPPLine();
    $o_line->Amount = $payment_data['amount'];

    $o_linked_txn = new IPPLinkedTxn();
    // Invoice ID.
    $o_linked_txn->TxnId = $payment_data['txn_id'];
    // TODO: what is this field used for?
    $o_linked_txn->TxnType = 'Invoice';
    $o_line->LinkedTxn = $o_linked_txn;

    $o_payment->Line = $o_line;

    $payment['response'] = $this->dataService->Add($o_payment);
    $payment['error'] = $this->checkErrors();

    return $payment;
  }

  /**
   * Queries QuickBooks for TaxCode name.
   */
  public function checkTaxName($name) {
    $name_checked = check_plain($name);
    return $this->dataService->Query("SELECT * FROM TaxCode where Name in ('$name_checked')");
  }

  /**
   * Queries QuickBooks for TaxRate name.
   */
  public function checkTaxRateName($name) {
    $name_checked = check_plain($name);
    return $this->dataService->Query("SELECT * FROM TaxRate where Name in ('$name_checked')");
  }

  /**
   * Queries QuickBooks for TaxAgency name.
   *
   * Either way we should receive a TaxAgency name.
   */
  public function checkAgencyAddAgencyName($name) {
    $name_checked = check_plain($name);
    $query_response = $this->dataService->Query("SELECT * FROM TaxAgency where Name = '$name_checked'");

    // New name, let's add it.
    if (!$query_response) {
      $o_tax_agency = new IPPTaxAgency();
      $o_tax_agency->DisplayName = $name;
      $add_response = $this->dataService->Add($o_tax_agency);
      return $add_response;
    }

    return $query_response;
  }

  /**
   * Returns any errors returned by the QBO API.
   *
   * Used during form submission/validation. Will stop a
   * form from successfully adding or updating data in
   * Drupal if QuickBooks returns an error, if needed. Displays
   * error message as well.
   */
  public function checkErrors() {
    $return_value = array(
      'message' => NULL,
      'code' => NULL,
    );
    $error = $this->dataService->getLastError();
    if (!is_null($error)) {
      $response_xml_obj = new SimpleXMLElement($error->getResponseBody());
      foreach ($response_xml_obj->Fault->children() as $fault) {
        $fault_array = get_object_vars($fault);
        $type = isset($fault_array['@attributes']['type']) ? $fault_array['@attributes']['type'] : '';
        $code = $fault_array['@attributes']['code'];
        $element = $fault_array['@attributes']['element'];
        $message = $fault_array['Message'];
        $detail = $fault_array['Detail'];
      }

      // Severe errors do not stop form execution, validation ones do.
      // If the error is "severe" then a configuration error must have
      // occurred and an admin must address it (email is sent).
      switch ($code) {
        case 100:
          $message = "QuickBooks said: Error 100. Please verify your RealmID within configuration page - is it pointing to the correct company?";

          if (user_access('access quickbooks')) {
            drupal_set_message($message, 'error', FALSE);
          }

          $this->sendErrorNoticeEmail($message);

          $return_value = array(
            'message' => $message,
            'code' => self::$faultSevere,
          );
          break;

        case 3100:
        case 3200:
          $message = "QuickBooks said: Error $code ApplicationAuthenticationFailed. Please verify your configuration's tokens and keys, they may have expired or were entered incorrectly.";

          if (user_access('access quickbooks')) {
            drupal_set_message($message, 'error', FALSE);
          }

          $this->sendErrorNoticeEmail($message);

          $return_value = array(
            'message' => $message,
            'code' => self::$faultSevere,
          );
          break;

        default:
          // Generally, a ValidationFault is an error in customer input.
          if ($type === 'ValidationFault') {
            // Ubercart forms work off form_set_error.
            if (module_exists('ubercart')) {
              form_set_error('', $element . ': ' . $detail);
            }

            // Commerce forms use their own special validation.
            if (module_exists('commerce')) {
              drupal_set_message($message, 'error', FALSE);
            }

            $return_value = array(
              'message' => $message,
              'code' => self::$faultValidation,
            );
          }
          else {
            $return_value = array(
              'message' => $message,
              'code' => self::$faultUncaught,
            );
          }
          break;
      }
      watchdog('ji_quickbooks', t($message), NULL, WATCHDOG_CRITICAL);
    }
    return $return_value;
  }

  /**
   * Send admin an email.
   */
  public function sendErrorNoticeEmail($message) {
    if ($message === '') {
      return;
    }

    $params = array(
      'subject' => t('[JI QuickBooks] - Severe Error Encountered'),
      'body' => check_markup(
          $message, 'plain_text'
      ),
    );

    $site_email = variable_get('site_mail', '');

    drupal_mail('ji_quickbooks', 'error', $site_email, language_default(), $params);
  }

  /**
   * Query QBO to GetAllCustomers.
   */
  public function getAllCustomers() {
    return $this->dataService->FindAll('Customer');
  }

  /**
   * Query QBO to GetCustomerById.
   */
  public function getCustomerById($id) {
    return $this->dataService->FindById(new IPPCustomer(array('Id' => $id), TRUE));
  }

  /**
   * Query QBO to GetInvoiceById.
   */
  public function getInvoiceById($id) {
    return $this->dataService->FindById(new IPPInvoice(array('Id' => $id), TRUE));
  }

  /**
   * Query QBO to GetPaymentById.
   */
  public function getPaymentById($id) {
    return $this->dataService->FindById(new IPPPayment(array('Id' => $id), TRUE));
  }

  /**
   * Query QBO to GetCustomerById.
   */
  public function getTaxAgencies() {
    return $this->dataService->Query("SELECT * FROM TaxAgency");
  }

  /**
   * Query QBO to getTaxCodeById.
   */
  public function getTaxCodeById($id = NULL) {
    return $this->dataService->Query("SELECT * FROM TaxCode where Active in (true)");
  }

  /**
   * Query QBO to getTaxRateById.
   */
  public function getTaxRateById($id = NULL) {
    return $this->dataService->FindById(new IPPTaxRate(array('Id' => $id), TRUE));
  }

  /**
   * Returns all available taxes from QuickBooks.
   */
  public function getAllTaxes() {

    $tax_code = $this->dataService->Query("SELECT * FROM TaxCode where Active in (true,false)");
    $tax_rate = $this->dataService->Query("SELECT * FROM TaxRate where Active in (true,false)");
    $tax_agency = $this->dataService->Query("SELECT * FROM TaxAgency");

    $result = array();

    if (!$tax_code) {
      return;
    }

    foreach ($tax_code as $value_tax_code) {
      $o_tax_response = new IPPTaxCode();
      $o_tax_response->Id = $value_tax_code->Id;
      $o_tax_response->Name = $value_tax_code->Name;
      $o_tax_response->Active = $value_tax_code->Active;
      // Used to compare if two tax records are similar.
      $o_tax_response->MetaData = $value_tax_code->MetaData;

      $tax_rates = array();
      $count_tax_rate = 0;

      if (!is_array($value_tax_code->SalesTaxRateList->TaxRateDetail)) {
        $value_tax_code->SalesTaxRateList->TaxRateDetail = array($value_tax_code->SalesTaxRateList->TaxRateDetail);
      }

      foreach ($tax_rate as $value_tax_rate) {
        foreach ($value_tax_code->SalesTaxRateList->TaxRateDetail as $value_tax_rate_detail) {
          if ($value_tax_rate_detail->TaxRateRef == $value_tax_rate->Id) {
            $o_rate_response = new stdClass();
            $o_rate_response->TaxRateRef = $value_tax_rate->Id;
            $o_rate_response->Name = $value_tax_rate->Name;
            $o_rate_response->RateValue = $value_tax_rate->RateValue;
            $o_rate_response->AgencyRef = $value_tax_rate->AgencyRef;

            foreach ($tax_agency as $agency) {
              if ($agency->Id == $value_tax_rate->AgencyRef) {
                $o_rate_response->AgencyName = $agency->DisplayName;
              }
            }

            $tax_rates[$count_tax_rate] = $o_rate_response;
            $count_tax_rate++;
          }
        }
      }

      $o_tax_response->TaxRates = $tax_rates;

      $result[$o_tax_response->Id] = $o_tax_response;
    }

    return $result;
  }

  /**
   * Query QBO to getAllTaxCodes.
   */
  public function getAllTaxCodes() {
    return $this->dataService->Query("SELECT * FROM TaxCode where Active in (true,false)");
  }

  /**
   * Query QBO to getAllTaxRates.
   */
  public function getAllTaxRates() {
    return $this->dataService->Query("SELECT * FROM TaxRate where Active in (true,false)");
  }

  /**
   * Query QBO to getAllTaxAgency.
   */
  public function getAllTaxAgency() {
    return $this->dataService->Query("SELECT * FROM TaxAgency");
  }

  /**
   * Query QBO to GetAllProducts or Items.
   */
  public function getAllProducts() {
    return $this->dataService->Query('SELECT * FROM Item');
  }

  /**
   * Query QBO to GetAllTerms.
   */
  public function getAllTerms() {
    return $this->dataService->Query('SELECT * FROM Term WHERE Active=TRUE ORDERBY Id');
  }

  /**
   * Query QBO to GetAllAccounts.
   */
  public function getAllAcounts() {
    return $this->dataService->Query("SELECT * FROM Account");
  }

  /**
   * Query QBO to getAcountsByType.
   */
  public function getAcountsByType($types = array()) {
    $filter = '';
    foreach ($types as $key => $type) {
      $types[$key] = "'" . $type . "'";
    }

    if (!empty($types)) {
      $filter = " WHERE AccountType in(" . implode(', ', $types) . ")";
    }

    return $this->dataService->Query("SELECT * FROM Account" . $filter);
  }

  /**
   * Query QBO to GetAllPaymentMethods.
   */
  public function getAllPaymentMethods() {
    return $this->dataService->Query("SELECT * FROM PaymentMethod");
  }

  /**
   * Returns company information.
   *
   * Returns an array where $response[0] is the object with the
   * company data.
   */
  public function getCompanyData() {
    return $this->dataService->Query('SELECT * FROM CompanyInfo');
  }

  /**
   * The voidInvoice() method.
   *
   * @param int id invoice id.
   * @return array $response['response'] and $response['error'] from QBO.
   */
  public function voidInvoice($id) {
    $ippinvoice = $this->getInvoiceById($id);
    $response['response'] = $this->dataService->Void($ippinvoice);
    $response['error'] = $this->checkErrors();
    
    return $response;
  }
  
  /**
   * The voidPayment() method.
   *
   * @param int id payment id.
   * @return array $response['response'] and $response['error'] from QBO.
   */
  public function voidPayment($id) {
    $ipppayment = $this->getPaymentById($id);
    $response['response'] = $this->dataService->VoidPayment($ipppayment);
    $response['error'] = $this->checkErrors();
    
    return $response;
  }

}
