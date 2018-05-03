
/**
 * @file:
 * Converts textfield to a autocomplete deluxe widget.
 */

(function ($) {
  'use strict';
  Drupal.behaviors.ji_uc_taxes = {
    attach: function (context) {
      $("input[id*='agency-rate']").mask('000.00%', {reverse: true});
    }
  };
})(jQuery);
