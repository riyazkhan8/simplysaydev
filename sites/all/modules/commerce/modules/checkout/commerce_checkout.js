(function($) {

/**
 * Disable the continue buttons in the checkout process once they are clicked
 * and provide a notification to the user.
 */
Drupal.behaviors.commerceCheckout = {
  attach: function (context, settings) {
    // When the buttons to move from page to page in the checkout process are
    // clicked we disable them so they are not accidentally clicked twice.
    $('input.checkout-continue:not(.checkout-processed)', context).addClass('checkout-processed').click(function() {
      var $this = $(this);
      $this.clone().insertAfter(this).attr('disabled', true).next().removeClass('element-invisible');
      $this.hide();
    });
  }
}

// $('#edit-commerce-payment-payment-method input[type=radio]').change(function() {       
//     alert('tesss');
// });
// alert('check');
// jQuery("#edit-commerce-payment-payment-method").after('<span id="loading" style="text-align:center;" ><img src="/sites/all/themes/simplysay/images/toolboxload.gif" alt="Loading" />loading...</span>');
// $( 'input[name="commerce_payment[payment_method]"]:radio' ).on('change', function(e) {
//      console.log(e.type);
//      return false;
// });
// $("input[name='commerce_payment[payment_method]']").click(function(){
    
// });

})(jQuery);
