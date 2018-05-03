 setTimeout(function(){
       jQuery("html, body").animate({ scrollTop: top }, "slow");

       /**
        * refresh_address_form.  addresss function callback
        */
       jQuery("#edit-commerce-customer-address-und-0-country").change(function () {

           var country = jQuery(this).val();

           jQuery.ajax({
               type: "POST",
               url: "/addressbook_refresh_form",
               data: {
                   "country": country
               },
               success: function (result) {
                   jQuery("#toolbox").html(result);
               },
               error: function (result) {
                   alert("error");
                   //alert(result);
               }
           });

       });

       $("#commerce-addressbook-customer-profile-form").submit(function(e) {
           e.preventDefault();
       });

       /**
        * save address function callback
        */
       jQuery('#commerce-addressbook-customer-profile-form #edit-actions #edit-submit').click(function (e) {

           e.preventDefault();
           e.stopPropagation();

           var country = jQuery("#edit-commerce-customer-address-und-0-country").val();
           var name_line = jQuery("#edit-commerce-customer-address-und-0-name-line").val();
           var address_1 = jQuery("#edit-commerce-customer-address-und-0-thoroughfare").val();
           var address_2 = jQuery("#edit-commerce-customer-address-und-0-premise").val();
           var city = jQuery("#edit-commerce-customer-address-und-0-locality").val();
           var state = jQuery("#edit-commerce-customer-address-und-0-administrative-area").val();
           var pin_code = jQuery("#edit-commerce-customer-address-und-0-postal-code").val();


           if (!country) {
               jQuery("#toolbox-module-form div.form-item-country").addClass("has-error");
               jQuery("#toolbox-module-form .form-item-country input").addClass("error");
           } else {
               jQuery("#toolbox-module-form div.form-item-country").removeClass("has-error");
               jQuery("#toolbox-module-form .form-item-country input").removeClass("error");
           }
           if (!name_line) {
               jQuery("#toolbox-module-form div.form-item-name-line").addClass("has-error");
               jQuery("#toolbox-module-form .form-item-name-line input").addClass("error");
           } else {
               jQuery("#toolbox-module-form div.form-item-name-line").removeClass("has-error");
               jQuery("#toolbox-module-form .form-item-name-line input").removeClass("error");
           }
           if (!address_1) {
               jQuery("#toolbox-module-form div.form-item-addres1").addClass("has-error");
               jQuery("#toolbox-module-form .form-item-addres1 input").addClass("error");
           } else {
               jQuery("#toolbox-module-form div.form-item-addres1").removeClass("has-error");
               jQuery("#toolbox-module-form .form-item-addres1 input").removeClass("error");
           }
           if (!city) {
               jQuery("#toolbox-module-form div.form-item-city").addClass("has-error");
               jQuery("#toolbox-module-form .form-item-city input").addClass("error");
           } else {
               jQuery("#toolbox-module-form div.form-item-city").removeClass("has-error");
               jQuery("#toolbox-module-form .form-item-city input").removeClass("error");
           }
           if (!state) {
               jQuery("#toolbox-module-form div.form-item-state").addClass("has-error");
               jQuery("#toolbox-module-form .form-item-state input").addClass("error");
           } else {
               jQuery("#toolbox-module-form div.form-item-state").removeClass("has-error");
               jQuery("#toolbox-module-form .form-item-state input").removeClass("error");
           }
           if (!pin_code) {
               jQuery("#toolbox-module-form div.form-item-pin-code").addClass("has-error");
               jQuery("#toolbox-module-form .form-item-pin-code input").addClass("error");
           } else {
               jQuery("#toolbox-module-form div.form-item-pin-code").removeClass("has-error");
               jQuery("#toolbox-module-form .form-item-pin-code input").removeClass("error");
           }

           if (country && name_line && address_1 && city && state && pin_code) {

               jQuery.ajax({
                   type: "POST",
                   url: "/address_form_save_address",
                   data: {
                       'country': country,
                       'name_line': name_line,
                       'address_1': address_1,
                       'address_2': address_2,
                       'city': city,
                       'state': state,
                       'pin_code': pin_code
                   },
                   success: function (result) {
                       jQuery("#toolbox").html(result);
                   },
                   error: function (result) {
                       alert('error');
                   }
               });
           }
           return false;
       });


       /**
        * Back To address Select Button
        */
       jQuery('#back-address').click(function () {
           jQuery.ajax({
               type: "POST",
               url: "/delivery_selection",
               data: {
                   cid: fabric.config.cid
               },
               success: function (result) {
                   jQuery("#toolbox").html(result);
               },
               error: function () {
                   alert('error');
               }
           });
       });
   })