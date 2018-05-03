<?php

function ji_quickbooks_save_oauth_settings() {
  // If all goes well, ji-quickbooks.joshideas.com will return the
  // what we need.
  if (filter_input(INPUT_POST, 'realm_id')) {
    variable_set('ji_quickbooks_settings_realm_id', filter_input(INPUT_POST, 'realm_id'));

    // We just authenticated, mark when this occured so we can
    // auto-renew after five months, starting now.
    variable_set('ji_quickbooks_cron_started_on', REQUEST_TIME);
  }

  if (filter_input(INPUT_POST, 'oauth_token')) {
    variable_set('ji_quickbooks_settings_access_token', filter_input(INPUT_POST, 'oauth_token'));
  }

  if (filter_input(INPUT_POST, 'oauth_token_secret')) {
    variable_set('ji_quickbooks_settings_access_token_secret', filter_input(INPUT_POST, 'oauth_token_secret'));
  }

  if (filter_input(INPUT_POST, 'consumer_key')) {
    variable_set('ji_quickbooks_settings_consumer_key', filter_input(INPUT_POST, 'consumer_key'));
  }

  if (filter_input(INPUT_POST, 'consumer_secret')) {
    variable_set('ji_quickbooks_settings_consumer_secret', filter_input(INPUT_POST, 'consumer_secret'));
  }
  
  drupal_goto('admin/config/services/ji_quickbooks');
  
  return array();
}
