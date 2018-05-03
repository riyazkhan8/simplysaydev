(function ($) {
    Drupal.behaviors.openid_logout = {
        attach: function (context, settings) {
            $('#edit-ji-quickbooks-config-disconnect').click(function () {
                intuit.ipp.anywhere.logout(function () {});
            });
            $('#edit-ji-quickbooks-config-environment-dev').change(function () {
              disableConnectionButtons();
            });
            $('#edit-ji-quickbooks-config-environment-pro').change(function () {
              disableConnectionButtons();
            });

            function disableConnectionButtons() {
                intuit.ipp.anywhere.logout(function () {});
                
                $('#edit-ji-quickbooks-config-connect').addClass("form-button-disabled");
                $('#edit-ji-quickbooks-config-connect').attr("disabled", "disabled");

                $('#edit-ji-quickbooks-config-disconnect').addClass("form-button-disabled");
                $('#edit-ji-quickbooks-config-disconnect').attr("disabled", "disabled");

                $('#edit-ji-quickbooks-config-manual-renewal').addClass("form-button-disabled");
                $('#edit-ji-quickbooks-config-manual-renewal').attr("disabled", "disabled");
            }
        }
    };
}(jQuery));
