/**
 * @file:
 * Handles QBO Commerce checkout validations client side.
 */

(function($) {
alert('tsts');
  Drupal.behaviors.ji_commerce_validations = {
    attach: function(context, settings) {

      var funcValidateElement = function(elementId, element, ruleCheck, functionCallback = false, highlight = false) {
        var inputId = element.context.id;
        var retVal = false;
        if (inputId.includes(elementId)) {
          if (ruleCheck) {
            if(highlight) {element.removeClass("valid").addClass("invalid");}
            if(functionCallback) {
              var selStart = element.context.selectionStart;
              var selEnd = element.context.selectionEnd;
              // Executes function callback to process textfield corrections.
              functionCallback();
             // To update cursor position to recently added character in textBox
             element.context.setSelectionRange(selStart, selEnd);
            }
            if(functionCallback && highlight) {window.setTimeout(function(){element.removeClass("invalid").addClass("valid");}, 500);}
            retVal = true;
          } else {
            if(highlight) {element.removeClass("invalid").addClass("valid");}
          }
          console.log(elementId + ' is Validated');
        }
        return retVal;
      };

      $('input', context).keyup(function(event) {
        var inputElement = $(this);
        var inputText = $(this).val();
        var inputKeyPressed = event.key;
        var inputTextLength = inputText.length;

        // The following validations occur on frontend checkout
        if($('#commerce-checkout-form-checkout').length > 0) {
          funcValidateElement("mail", inputElement, (inputTextLength > 100), function() {
            inputElement.val(inputText.substring(0, 100));
          }, true);
          funcValidateElement("mail", inputElement, (!inputText.includes('.') || !inputText.includes('@')), false, true);
          funcValidateElement("name", inputElement, inputTextLength > 90 || inputText.includes(':'), function() {
              inputElement.val(inputElement.val().replace(/:/g, ''));
              inputElement.val(inputElement.val().substring(0, 90));
          }, true);
          funcValidateElement("thoroughfare", inputElement, inputTextLength > 500, function() {
            inputElement.val(inputText.substring(0, 500));
          }, true);
          funcValidateElement("premise", inputElement, inputTextLength > 500, function() {
            inputElement.val(inputText.substring(0, 500));
          }, true);
            funcValidateElement("locality", inputElement, inputTextLength > 255, function() {
              inputElement.val(inputText.substring(0, 255));
            }, true);
          funcValidateElement("postal-code", inputElement, inputTextLength > 30, function() {
            inputElement.val(inputText.substring(0, 30));
          }, true);
        }

        // The following validations occur on backend customer cration
        if($('#commerce-admin-order-advanced-search-customers-form').length > 0) {
          funcValidateElement("edit-email", inputElement, (inputTextLength > 100), function() {
            inputElement.val(inputText.substring(0, 100));
          }, true);
            funcValidateElement("edit-email", inputElement, ((!inputText.includes('.') || !inputText.includes('@')) && inputTextLength > 0), false, true);
        }
        // The following validations occur on backend order creation
        if($('#commerce-order-ui-order-form').length > 0) {
          funcValidateElement("name-line", inputElement, inputTextLength > 90 || inputText.includes(':'), function() {
                inputElement.val(inputElement.val().replace(/:/g, ''));
                inputElement.val(inputElement.val().substring(0, 90));
            }, true);
            funcValidateElement("thoroughfare", inputElement, inputTextLength > 500, function() {
              inputElement.val(inputText.substring(0, 500));
            }, true);
            funcValidateElement("premise", inputElement, inputTextLength > 500, function() {
              inputElement.val(inputText.substring(0, 500));
            }, true);
            funcValidateElement("locality", inputElement, inputTextLength > 255, function() {
              inputElement.val(inputText.substring(0, 255));
            }, true);
            funcValidateElement("postal-code", inputElement, inputTextLength > 30, function() {
              inputElement.val(inputText.substring(0, 30));
            }, true);
        }

      });

      // Simulates the keyUp event once loaded (in order to highlight valid elements).
      $('input', context).keyup();
    }
  };

})(jQuery);
