(function ($) {
  Drupal.behaviors.userpointsAdminFieldsetSummaries = {
    attach: function (context) {
      // Moderation status.
      $('fieldset#edit-status', context).drupalSetSummary(function (context) {
        if ($('#edit-userpoints-points-moderation-0').is(':checked')) {
          return Drupal.t('Approved by default.');
        }
        else {
          return Drupal.t('Moderated by default.');
        }
      });

      // Message.
      $('fieldset#edit-misc', context).drupalSetSummary(function (context) {
        if ($('#edit-userpoints-display-message-0').is(':checked')) {
          return Drupal.t('No message is displayed by default.');
        }
        else {
          return Drupal.t('Message is displayed by default.');
        }
      });

      // Listings.
      $('fieldset#edit-reports', context).drupalSetSummary(function (context) {
        var limit = $('select#edit-userpoints-report-limit :selected').val();
        var usercount = $('select#edit-userpoints-report-usercount :selected').val();

        return Drupal.t('%limit transactions, %usercount users per page.', {'%limit' : limit, '%usercount' : usercount});
      });

      // Listings.
      $('fieldset#edit-renaming', context).drupalSetSummary(function (context) {
        var branding = {
        '@ucpoints' : $('#edit-userpoints-trans-ucpoints').val(),
        '@lcpoints' : $('#edit-userpoints-trans-lcpoints').val(),
        '@ucpoint' : $('#edit-userpoints-trans-ucpoint').val(),
        '@lcpoint' : $('#edit-userpoints-trans-lcpoint').val()
        }

        return Drupal.t('@ucpoints, @lcpoints, @ucpoint, @lcpoint.', branding);
      });

      // Category.
      $('fieldset#edit-category', context).drupalSetSummary(function (context) {
        var category = $('select#edit-userpoints-category-default-tid :selected').text();
        var display_selection = $('div.form-item-userpoints-category-profile-display-tid input:checked').siblings('label');
        var display_categories;
        if (display_selection.length > 0) {
            display_categories = jQuery.trim(display_selection[0].firstChild.nodeValue);
            for (var i = 1; i < display_selection.length; i++) {
                if (i > 2) {
                    display_categories += ', ...';
                    break;
                }
                display_categories += ', ' + jQuery.trim(display_selection[i].firstChild.nodeValue);
            }
        }
        else {
            display_categories = Drupal.t('none');
        }

        return Drupal.t('Default: %category<br />Displayed: %display_categories', {'%category' : category, '%display_categories' : display_categories});
      });

      // Stamping.
      $('fieldset#edit-stamping', context).drupalSetSummary(function (context) {
        if ($('input#edit-userpoints-transaction-timestamp').is(':checked')) {
          return Drupal.t('Always use system time for transactions.');
        }
        else {
          return Drupal.t('Allow customization of transaction time.');
        }
      });

      // Expiration.
      $('fieldset#edit-points-expiration', context).drupalSetSummary(function (context) {

        var year = $('select#edit-userpoints-expireon-date-year :selected').val();
        var month = $('select#edit-userpoints-expireon-date-month :selected').val();
        var day = $('select#edit-userpoints-expireon-date-day :selected').val();
        var date = new Date(year, month, day);

        // If expiration time is in the future, use that.
        if (date.getTime() > new Date().getTime()) {
          return Drupal.t('Expiration at %date.', {'%date' : date.toLocaleDateString()});
        }
        else if ($('select#edit-userpoints-expireafter-date :selected').val() > 0) {
          return Drupal.t('Expiration in %date.', {'%date' : $('select#edit-userpoints-expireafter-date :selected').text()});
        }
        else {
          return Drupal.t('No expiration.');
        }
      });
    }
  };

  Drupal.behaviors.stripe = {
      attach: function (context, settings) {
       if (typeof settings.stripe == 'undefined') {
         return;
       }
      if (typeof settings.stripe.fetched == 'undefined') {
        settings.stripe.fetched = true;

        // Clear the token every time the payment form is loaded. We only need the token
        // one time, as it is submitted to Stripe after a card is validated. If this
        // form reloads it's due to an error; received tokens are stored in the checkout pane.
        $('#stripe_token').val("");

        var createToken = function (cardFieldMap, responseHandler) {
          Stripe.setPublishableKey(settings.stripe.publicKey);

          var cardValues = {
            number: $('[id^=' + cardFieldMap.number +']').val(),
            cvc: $('[id^=' + cardFieldMap.cvc +']').val(),
            exp_month: $('[id^=' + cardFieldMap.exp_month +']').val(),
            exp_year: $('[id^=' + cardFieldMap.exp_year +']').val(),
            name: $('[id^=' + cardFieldMap.name +']').val()
          };

          var optionalFieldMap = {
            address_line1: 'commerce-stripe-thoroughfare',
            address_line2: 'commerce-stripe-premise',
            address_city: 'commerce-stripe-locality',
            address_state: 'commerce-stripe-administrative-area',
            address_zip: 'commerce-stripe-postal-code',
            address_country: 'commerce-stripe-country'
          };
          for (var stripeName in optionalFieldMap) {
            if (optionalFieldMap.hasOwnProperty(stripeName)) {
              var formInputElement = $('.' + optionalFieldMap[stripeName], context);
              if (formInputElement.length) {
                cardValues[stripeName] = formInputElement.val();
              }
              else if (typeof Drupal.settings.commerce_stripe_address != 'undefined') {
                // Load the values from settings if the billing address isn't on
                // the same checkout pane as the address form.
                cardValues[stripeName] = Drupal.settings.commerce_stripe_address[stripeName];
              }
            }
          }

          Stripe.createToken(cardValues, responseHandler);
        };

        var makeResponseHandler = function (form$, errorDisplay$, onError, onSuccess) {
          return function (status, response) {
            if (response.error) {
              // Show the errors on the form.
              errorDisplay$.html($("<div id='commerce-stripe-validation-errors' class='messages error'></div>").html(response.error.message));

              onError && onError(form$);
            }
            else {
              // Token contains id, last4, and card type.
              var token = response['id'];
              // Insert the token into the form so it gets submitted to the server.
              $('#stripe_token').val(token);

              onSuccess && onSuccess(form$);

              // And submit.
              form$.get(0).submit(form$);
            }
          };
        };

        $('body').delegate('#edit-continue', 'click', function(event) {
          // Prevent the Stripe actions to be triggered if Stripe is not selected.
          alert("clicked");
          if ($("input[value*='commerce_stripe|']").is(':checked')) {
            alert('working');
            // Do not fetch the token if cardonfile is enabled and the customer has selected an existing card.
            if ($('.form-item-commerce-payment-payment-details-cardonfile').length) {
              // If select list enabled in card on file settings
              if ($("select[name='commerce_payment[payment_details][cardonfile]']").length
                  && $("select[name='commerce_payment[payment_details][cardonfile]'] option:selected").val() != 'new') {
                return;
              }

              // If radio buttons are enabled in card on file settings
              if ($("input[type='radio'][name='commerce_payment[payment_details][cardonfile]']").length
                  && $("input[type='radio'][name='commerce_payment[payment_details][cardonfile]']:checked").val() != 'new') {
                return;
              }
            }

            var form$ = $("#edit-continue").closest("form");
            var submitButtons$ = form$.find('.checkout-continue');

            // Prevent the form from submitting with the default action.
            if ($('#stripe_token').length && $('#stripe_token').val().length === 0) {
              event.preventDefault();
              submitButtons$.attr("disabled", "disabled");
            }
            else {
              return;
            }



            // Prevent duplicate submissions to stripe from multiple clicks
            if ($(this).hasClass('auth-processing')) {
              return false;
            }
            $(this).addClass('auth-processing');

            // Show progress animated gif (needed for submitting after first error).
            $('.checkout-processing').show();

            // Disable the submit button to prevent repeated clicks.
            submitButtons$.attr("disabled", "disabled");

            if (settings.stripe.integration_type == 'stripejs') {
              // Remove error reports from the last submission
              $('#commerce-stripe-validation-errors').remove();

              var cardFields = {
                number: 'edit-commerce-payment-payment-details-credit-card-number',
                cvc: 'edit-commerce-payment-payment-details-credit-card-code',
                exp_month: 'edit-commerce-payment-payment-details-credit-card-exp-month',
                exp_year: 'edit-commerce-payment-payment-details-credit-card-exp-year',
                name: 'edit-commerce-payment-payment-details-credit-card-owner'
              };

              var responseHandler = makeResponseHandler(
                  $("#edit-continue").closest("form"),
                  $('div.payment-errors'),
                  function (form$) {
                    // Enable the submit button to allow resubmission.
                    form$.find('.checkout-continue').removeAttr("disabled").removeClass("auth-processing");
                    submitButtons$.removeAttr('disabled').removeClass('auth-processing');
                    // Hide progress animated gif.
                    $('.checkout-processing').hide();
                  },
                  function (form$) {
                    var $btnTrigger = $('.form-submit.auth-processing').eq(0);
                    var trigger$ = $("<input type='hidden' />").attr('name', $btnTrigger.attr('name')).attr('value', $btnTrigger.attr('value'));
                    form$.append(trigger$);
                  }
              );

              createToken(cardFields, responseHandler);
            }
            else if (settings.stripe.integration_type == 'checkout') {
              var token_created = false;
              var handler = StripeCheckout.configure({
                key: settings.stripe.publicKey,
                token: function(token) {
                  token_created = true;
                  $('#stripe_token').val(token.id);

                  // Set a triggering element for the form.
                  var $btnTrigger = $('.form-submit.auth-processing').eq(0);
                  var trigger$ = $("<input type='hidden' />").attr('name', $btnTrigger.attr('name')).attr('value', $btnTrigger.attr('value'));
                  form$.append(trigger$);

                  // And submit.
                  form$.get(0).submit(form$);
                },
                closed: function() {
                  // Only re-enable the submit buttons if a token was not created.
                  if (token_created == false) {
                    submitButtons$.removeClass('auth-processing').removeAttr("disabled");
                    $('.checkout-processing').hide();
                  }
                }
              });

              // Set Checkout options.
              $options = Drupal.settings.stripe.checkout;
              handler.open($options);

              // Close Checkout on page navigation
              $(window).bind('popstate', function() {
                handler.close();
              });
            }

            // Prevent the form from submitting with the default action.
            return false;
          }
          else
          {
            alert('not working');
          }
        });

        $('.page-admin-commerce-orders-payment').delegate('#edit-submit', 'click', function(event) {
          // Prevent the Stripe actions to be triggered if hidden field hasn't been set
          var cs_terminal = $('input[name=commerce_stripe_terminal]').val();
          if ( cs_terminal > 0) {
            $(this).addClass('auth-processing');

            // Prevent the form from submitting with the default action.
            event.preventDefault();

            // Disable the submit button to prevent repeated clicks.
            $('.form-submit').attr("disabled", "disabled");

            var cardFields = {
              number: 'edit-payment-details-credit-card-number',
              cvc: 'edit-payment-details-credit-card-code',
              exp_month: 'edit-payment-details-credit-card-exp-month',
              exp_year: 'edit-payment-details-credit-card-exp-year',
              name: 'edit-payment-details-credit-card-owner'
            };

            var responseHandler = makeResponseHandler(
                $("#edit-submit").closest("form"),
                $('div.payment-errors'),
                function () {
                  $(this).removeClass('auth-processing');
                  // Enable the submit button to allow resubmission.
                  $('.form-submit').removeAttr("disabled");
                },
                function (form$) {
                  var $btnTrigger = $('.form-submit.auth-processing').eq(0);
                  var trigger$ = $("<input type='hidden' />").attr('name', $btnTrigger.attr('name')).attr('value', $btnTrigger.attr('value'));
                  form$.append(trigger$);
                }
            );

            createToken(cardFields, responseHandler);

            // Prevent the form from submitting with the default action.
            return false;
          }
        });

        // @todo: See if code duplication can be reduced here.
        $('#commerce-stripe-cardonfile-create-form').delegate('#edit-submit', 'click', function (event) {
          if (settings.stripe.integration_type === 'stripejs') {
            var cardFields = {
              number: 'edit-credit-card-number',
              cvc: 'edit-credit-card-code',
              exp_month: 'edit-credit-card-exp-month',
              exp_year: 'edit-credit-card-exp-year',
              name: 'edit-credit-card-owner'
            };

            var responseHandler = makeResponseHandler($('#commerce-stripe-cardonfile-create-form'), $('#card-errors'));

            createToken(cardFields, responseHandler);
          }
          if (settings.stripe.integration_type == 'checkout') {
            var submitButtons$ = $("#edit-submit");
            var form$ = submitButtons$.closest("form");

            // Prevent the form from submitting with the default action.
            if ($('#stripe_token').length && $('#stripe_token').val().length === 0) {
              event.preventDefault();
              submitButtons$.attr("disabled", "disabled");
            }
            else {
              return;
            }

            // Prevent duplicate submissions to stripe from multiple clicks
            if ($(this).hasClass('auth-processing')) {
              return false;
            }
            $(this).addClass('auth-processing');
            var token_created = false;
            var handler = StripeCheckout.configure({
              key: settings.stripe.publicKey,
              token: function (token) {
                token_created = true;
                $('#stripe_token').val(token.id);

                // Set a triggering element for the form.
                var $btnTrigger = $('.form-submit.auth-processing').eq(0);
                var trigger$ = $("<input type='hidden' />").attr('name', $btnTrigger.attr('name')).attr('value', $btnTrigger.attr('value'));
                form$.append(trigger$);

                // And submit.
                form$.get(0).submit(form$);
              },
              closed: function () {
                // Only re-enable the submit buttons if a token was not created.
                if (token_created == false) {
                  submitButtons$.removeClass('auth-processing').removeAttr("disabled");
                  $('.checkout-processing').hide();
                }
              }
            });

            // Set Checkout options.
            $options = Drupal.settings.stripe.checkout;
            handler.open($options);

            // Close Checkout on page navigation
            $(window).bind('popstate', function () {
              handler.close();
            });
          }

          // Prevent the form from submitting with the default action.
          return false;
        });
      }
    }
  }

})(jQuery);