(function($) {
	$(window).load(function(){
		setTimeout(function(){
			var card_type = "commerce_userpoints|commerce_payment_commerce_userpoints";
	    	 $.ajax({
		        data: {payment_method:card_type},
		        url: "/payment_detail_ajax",
		        type: 'POST',
		        success: function(msg) {
		        	// $('#payment-details').html(msg);
		        	$( "div.payment-details-ajax" ).after( "<div id='payment-details1'>" + msg + "</div>" );
		        }               
		    });
		},100);
		$(document).on("click", "div.payment-details-ajax > div", function (e) {
			var indexx = $(this).index();
			$("#edit-commerce-payment-body").removeClass("con0");
			$("#edit-commerce-payment-body").removeClass("con1");
			$(this).parents("#edit-commerce-payment-body").addClass("con" + indexx);
		});
		$(document).on("change", "input.payment-details-ajax", function (e) {
	    	var card_type = $(this).val();
	    	$("input.payment-details-ajax").prop('checked',false);
	    	$(this).prop('checked', "checked");
	    	 $.ajax({
		        data: {payment_method:card_type},
		        url: "/payment_detail_ajax",
		        type: 'POST',
		        success: function(msg) {
		        	$('#payment-details').html(msg);
		        }               
		    });
		});
	});
})(jQuery);
