
jQuery(document).ready(function($){
/****amdin crete cnasvas js****/

jQuery("#canvastype").change(function(){


var type = jQuery(this).val();

jQuery("#canvascategories").siblings().show();
jQuery("#canvascategories").show();
jQuery("#productprice").siblings().show();
jQuery("#productprice").show();



 if (type == 14) {

  jQuery("#canvascategories").hide();
  jQuery("#canvascategories").siblings().hide();
  jQuery("#productprice").hide();
  jQuery("#productprice").siblings().hide();

 }

 if (type == 4 || type == 5) {

    jQuery("#cardimagegroup").show();

 }else{

  jQuery("#cardimagegroup").hide();

 }

});



  jQuery('.page-cart .delete-line-item').click(function() {
      
      if (confirm('Are you sure?')) {

      }else{
        return false;
      }
      
  });


// Search
jQuery('.main-search .search-wrap input').on('click', function(){
  //alert('hiii');


    if(jQuery('.main-search').parent().hasClass('expand')){

    }else{
        jQuery('.main-search').parent().addClass('expand');

    }


    jQuery('.main-search .search-wrap span.icon').on('click', function(){

        jQuery('.main-search').parent().removeClass('expand');

  }); 



}); 


function webfontload(){

   WebFont.load({
        google: {
          families: [
          'Open Sans', 
          'Poppins', 
          'Oswald', 
          'Encode Sans Condensed', 
          'Kaushan Script',
          'Oxygen',
          'PT Sans',
          'Patrick Hand SC',
          'Raleway',
          'Roboto',
          'Tangerine',
          'Ubuntu'
          ]
        }
      });

}
webfontload();
jQuery('.main-search .input-group-btn .btn-primary span').remove();
jQuery('.main-search .input-group-btn').append('<span aria-hidden="true" class="icon glyphicon glyphicon-search"></span>');




 //TO find retina display

    var retina = window.devicePixelRatio && window.devicePixelRatio >= 2;

    if (retina == true) {

       jQuery("#header .logo .navbar-brand img").attr("src","/sites/all/themes/simplysay/logo_retina.png");
       jQuery('.region-footer .footer-logo a img').attr("src","/sites/all/themes/simplysay/logo_retina.png");

    }


  //////user Profile image upload////////////////
  jQuery('.user_img .upload_icon').click(function(){

  	jQuery('#profile_input').trigger('click'); 

  });

  jQuery('.page-user-addressbook .pagination li:first-child a').text('Billing Addresses'); 	
  jQuery('.page-user-addressbook .pagination li:last-child a').text('Delivery Addresses');

   jQuery("#profile_input").change(function (e) {

    console.log(e.target.files);
        var file = e.target.files[0];
     

        var reader = new FileReader();
        reader.onload = function(f) {
                    
                    var img_data = f.target.result;

                    //console.log(img_data);

                    if (img_data != '' ) {

                    	 jQuery.ajax({
			            type: "POST",
			            url: "/profile_upload",
			            data: { 
			                'img_data':img_data, 
			              },
			            success: function(result) {
			                
			                // alert(result);
			                // alert(img_data);
			            if (result == true) {

			               jQuery('.profile_sidebar .user_img img').attr("src",img_data);

			            }else{

			            	alert('Unable to upload picture.');
			            }
			               
			                
			            },
			            error: function(result) {
			                alert('error');

			            }
			        });

                    }

                   

                    

                  }
        reader.readAsDataURL(file);

   });


//**** pdf to jpg test**//
 jQuery("#file-2").change(function (e) {

    console.log(e.target.files);
        var file = e.target.files[0];
     

        var reader = new FileReader();
        reader.onload = function(f) {
                    
                    var pdf_data = f.target.result;

                    console.log(pdf_data);
                    

                    if (pdf_data != '' ) {

                    	 jQuery.ajax({
			            type: "POST",
			            url: "/profile_upload",
			            data: { 
			                'pdf_data':pdf_data, 
			              },
			            success: function(result) {
			                
			                 alert(result);
			                // alert(img_data);
			            if (result == true) {

			          //      	var width = 504 * 1.5;
        					// var height = 661 * 1.5;

             //         		var react = fabric.Image.fromURL(img_data, function(img) {
						       //               	 img.scale(0.5).set({
											  //               // left: 200,
											  //               top: 200,
											  //               width : width,
											  //               height : height,
											  //             });

			          //            			canvas.add(img).setActiveObject(img);	


             //         					});
			            }
			               
			                
			            },
			            error: function(result) {
			                alert('error');

			            }
			        });

                    }

                   

                    

                  }
        reader.readAsDataURL(file);

   });

/****Heade shopping cart js*******/

jQuery('#header .mycart button').click(function(){

  jQuery('#header .header-cart').toggle();

});

 $('#header .mycart button').click(function(e) { //button click class name is myDiv
  e.stopPropagation();
 })

jQuery(document).click(function() {
    
    jQuery('#header .header-cart').hide();

});



/** Drupal Loing popup js**/
  jQuery('.login_cnt #signup_link').click(function(){
    jQuery('#register-appear').show();
    jQuery('#login-appear').hide();

  });
   jQuery('.top-bar .ragister-nav').click(function(){
    jQuery('#login-appear').hide();
     jQuery('#register-appear').show();
     
  });
   jQuery('.top-bar .login-nav').click(function(){
    jQuery('#register-appear').hide();
    jQuery('#login-appear').show();

  });
  //  jQuery('off cantlike').click(function(){
  //   jQuery('#login-appear').show();

  // });


  jQuery('.login_cnt #login_link').click(function(){

    jQuery('#register-appear').hide();
    jQuery('#login-appear').show();

  });

  jQuery('#user-register-form .password-field').attr('placeholder','Password');
  jQuery('#user-register-form .password-confirm').attr('placeholder','Confirm Password');
  
  jQuery(document).ajaxComplete(function(){
    jQuery('#user-register-form .password-field').attr('placeholder','Password');
  jQuery('#user-register-form .password-confirm').attr('placeholder','Confirm Password');

  });

  //************Saved Cards Delte scripts**********//



jQuery('.saved-card .saved_cross').click(function(){

var card_url = jQuery(this).prev().attr('href');
var cid = card_url.split("=");
var card = jQuery(this).parents('li');

    
        jQuery.ajax({
            type: "POST",
            url: "/saved_card/delete",
            data: { 
                'cid': cid[1], 
              },
            success: function(result) {
                
                //alert(result);
                if (result == true) {

                  card.remove();

                }
                
            },
            error: function(result) {
                alert('error');
                //alert(result);
            }
        });

});  
});


/**ready End*/

/******function to detect safari browser******/

function IsSafari() {

  var is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
  return is_safari;

}


/********* User redirect Session Button*************/


function user_redirect_session(){

    var login_page_url      = window.location.href;     // Returns full URL


    jQuery.ajax({
              type: "POST",
              url: "/redirect/session/1",
              data: {

                  'login_page_url':login_page_url,

              },
              success: function(result) {
                              
                /*jQuery('#addressbook-select-form').listnav({
                      filterSelector: '.name-block',
                      includeNums: false,
                      // removeDisabled: true,
                      allText: 'All',
                      initLetter: 'all'
                });*/
                  
              },
              error: function(result) {
                  // alert('error');
                  //alert(result);
              }
          });

}

/****Redirect to myuserpoints on login */

function points_redirect_session(){

  //var pathname = window.location.pathname; // Returns path only
  var login_page_url      = window.location.href;     // Returns full URL

  jQuery.ajax({
            type: "POST",
            url: "/redirect/session/2",
            data: {

                'login_page_url':login_page_url,

            },
            success: function(result) {             
                
            },
            error: function(result) {
                alert('error');
                //alert(result);
            }
        });

}


function add_to_card_simplysay(){



var card_load = jQuery("#card_load").val();


if (card_load == 'cart') {

  jQuery('#insert-cart').text('Update Cart');
  var item_id = jQuery('#item_id').val();

}else{

  var item_id = '';
      card_load = '';

}


  jQuery('#insert-cart').click(function(){
  jQuery("#toolbox a.btn-blue-prv").before("<div id='loading' style='text-align:center;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' />Loading...</div>");   
  jQuery("#toolbox .blue-round-btns #insert-cart").addClass('round-btns-disabled');
  jQuery("#toolbox .blue-round-btns a").addClass('round-btns-disabled');

  var nid = jQuery("#node_id").val();
  var pid = jQuery("#product_id").val();
  var cid = jQuery("#cid").val();

 //alert(card_load);
   // alert(nid);
    jQuery.ajax({
            type: "POST",
            url: "/usersavedata",
            data: { 
                'nid': nid, 
                'pid': pid,
          'section' : 'addressbook',
          'action' : 'insert_cart',
          'cid'    : cid,
          'card_load':card_load,
          'item_id': item_id,
 
              },
            success: function(result) {
                
             
                //alert(result); 
                console.log(result);
                //jQuery('#cart_create_image').html(result);
                jQuery("#toolbox .blue-round-btns #insert-cart").removeClass('round-btns-disabled');
                      jQuery("#toolbox .blue-round-btns a").removeClass('round-btns-disabled');

                      if (card_load == 'cart') {
                        window.location.href="/cart"; 
                      }else{
                        jQuery(".commerce-add-to-cart #edit-submit").click();
                      }
                
              
                
            },
            error: function(result) {
                alert('error');
                //alert(result);
            }
        });

 });

//jQuery('.commerce-add-to-cart #edit-submit').click(function(){



}


function default_address(){

  var address_pid = jQuery('input[name="selectaddress"]:checked').val();

if (address_pid != null) {
var nid = jQuery("#node_id").val();
  var pid = jQuery("#product_id").val();
  var cid = jQuery("#cid").val();

    
        jQuery.ajax({
            type: "POST",
            url: "/usersavedata",
            data: { 
                'nid': nid, 
                'pid': pid,
          'address_pid' : address_pid,
          'section' : 'addressbook',
          'action' : 'shownext',
          'cid'    : cid,
 
              },
            success: function(result) {
                
              if (result == true) { 
                //alert('address updated'); 
              }
               
                
            },
            error: function(result) {
                alert('error');
                //alert(result);
            }
        });

        }

}


function update_addressbook(){

  

jQuery('#addressbook-select-form input[name="selectaddress"]').click(function(){

var address_pid = jQuery('input[name="selectaddress"]:checked').val();
// alert(address_pid);
var nid = jQuery("#node_id").val();
  var pid = jQuery("#product_id").val();
  var cid = jQuery("#cid").val();

    
        jQuery.ajax({
            type: "POST",
            url: "/usersavedata",
            data: { 
                'nid': nid, 
                'pid': pid,
          'address_pid' : address_pid,
          'section' : 'addressbook',
          'action' : 'shownext',
          'cid'    : cid,
 
              },
            success: function(result) {
                
              if (result == true) { 
                //alert('address updated'); 
              }
               
                
            },
            error: function(result) {
                alert('error');
                //alert(result);
            }
        });

});  

}

/**** addd addresss function callback**/

function refresh_address_form(){

  
  
jQuery("#edit-commerce-customer-address-und-0-country").change(function(){

 var country = jQuery(this).val();


  jQuery.ajax({
            type: "POST",
            url: "/canvassave",
            data: { 

          "country" : country,
          "section" : "addressbook",
          "action" : "refresh_form",
 
              },
            success: function(result) {
                //alert(result);

                    jQuery( "#toolbox" ).html(result);
               
                
            },
            error: function(result) {
                alert("error");
                //alert(result);
            }
        });

});

}

/******save address function callback***/

function save_ajax_address(){



jQuery('#commerce-addressbook-customer-profile-form #edit-actions #edit-submit').click(function(){



   var country = jQuery("#edit-commerce-customer-address-und-0-country").val();
      var name_line = jQuery("#edit-commerce-customer-address-und-0-name-line").val();
      var address_1 = jQuery("#edit-commerce-customer-address-und-0-thoroughfare").val();
      var address_2 = jQuery("#edit-commerce-customer-address-und-0-premise").val();
      var city = jQuery("#edit-commerce-customer-address-und-0-locality").val();
      var state = jQuery("#edit-commerce-customer-address-und-0-administrative-area").val();
      var pin_code = jQuery("#edit-commerce-customer-address-und-0-postal-code").val();


      if (country == '') {
          jQuery("#toolbox-module-form div.form-item-country").addClass("has-error");
          jQuery("#toolbox-module-form .form-item-country input").addClass("error");
      }else{
          jQuery("#toolbox-module-form div.form-item-country").removeClass("has-error");
          jQuery("#toolbox-module-form .form-item-country input").removeClass("error");
      }

      if (name_line == '') {
          jQuery("#toolbox-module-form div.form-item-name-line").addClass("has-error");
          jQuery("#toolbox-module-form .form-item-name-line input").addClass("error");
      }else{
          jQuery("#toolbox-module-form div.form-item-name-line").removeClass("has-error");
          jQuery("#toolbox-module-form .form-item-name-line input").removeClass("error");
      }

      if (address_1 == '') {
          jQuery("#toolbox-module-form div.form-item-addres1").addClass("has-error");
          jQuery("#toolbox-module-form .form-item-addres1 input").addClass("error");
      }else{
          jQuery("#toolbox-module-form div.form-item-addres1").removeClass("has-error");
          jQuery("#toolbox-module-form .form-item-addres1 input").removeClass("error");
      }
     
      if (city == '') {
          jQuery("#toolbox-module-form div.form-item-city").addClass("has-error");
          jQuery("#toolbox-module-form .form-item-city input").addClass("error");
      }else{
          jQuery("#toolbox-module-form div.form-item-city").removeClass("has-error");
          jQuery("#toolbox-module-form .form-item-city input").removeClass("error");
      }
      if (state == '') {
          jQuery("#toolbox-module-form div.form-item-state").addClass("has-error");
          jQuery("#toolbox-module-form .form-item-state input").addClass("error");
      }else{
          jQuery("#toolbox-module-form div.form-item-state").removeClass("has-error");
          jQuery("#toolbox-module-form .form-item-state input").removeClass("error");
      }
      if (pin_code == '') {
          jQuery("#toolbox-module-form div.form-item-pin-code").addClass("has-error");
          jQuery("#toolbox-module-form .form-item-pin-code input").addClass("error");
      }else{
          jQuery("#toolbox-module-form div.form-item-pin-code").removeClass("has-error");
          jQuery("#toolbox-module-form .form-item-pin-code input").removeClass("error");
      }

if (country != '' && name_line != '' && address_1 != '' && city != '' && state != '' && pin_code != '' ) {



  jQuery.ajax({
            type: "POST",
            url: "/canvassave",
            data: { 

          'country' : country,
          'name_line' : name_line,
          'address_1' : address_1,
          'address_2' : address_2,
          'city' : city,
          'state' : state,
          'pin_code':pin_code,
          'section' : 'address_form',
          'action' : 'save_address',
 
              },
            success: function(result) {
                //alert(result);

                    jQuery( "#toolbox" ).html(result);

jQuery('#addressbook-select-form').listnav({
      filterSelector: '.name-block',
      includeNums: false,
      // removeDisabled: true,
      allText: 'All',
      initLetter: 'all'
  });               
                
            },
            error: function(result) {
                alert('error');
                //alert(result);
            }
        });
}


return false;

});


}

/*******Back To address Select Button**/

function back_select_address(){

jQuery('#back-address').click(function(){

     jQuery.ajax({
            type: "POST",
            url: "/canvassave",
            data: { 

          'section' : 'addressbook',
          'action' : 'back_address',
 
              },
            success: function(result) {
                //alert(result);

                    jQuery( "#toolbox" ).html(result);
               
jQuery('#addressbook-select-form').listnav({
      filterSelector: '.name-block',
      includeNums: false,
      // removeDisabled: true,
      allText: 'All',
      initLetter: 'all'
  });                
            },
            error: function(result) {
                alert('error');
                //alert(result);
            }
        });



});


}


/*******Reorder Button Login**********/

function reorder_button(order_id){

    jQuery.ajax({

      type: "POST",
      url: "/reorder_card",
      data: { 
          'order_id': order_id,
 
      },

      success: function(result){
        //alert(result);
        if (result == true ) {


          
          window.location.href = "/cart";
      
        }else{
          alert("Some products weren\'t copied to the cart as they aren\'t currently available");
        }

      },

      error: function(result){

        alert('error');

      }


    });


}




function aws_upload(data,selectfrom,imgcount){

var aws_object;

if (selectfrom == 'localfile') {
var img_data=[], b=data;
img_data.push(b);


console.log(imgcount);

  var nid = jQuery("#node_id").val();
    var pid = jQuery("#product_id").val();
    var cid = jQuery("#cid").val();
    var section = jQuery("#section").val();


        //putobject on s3 server;       
          
          jQuery.ajax({
              type: "POST",
              url: "/aws_simplysay",
              data: { 
                  'action':'putobject',
                  'data'  : img_data,
                  'cid' : cid,
                  'pid'   : pid,
                  'nid' : nid,
                  'section': section,
                  'selectfrom':selectfrom
   
                },
              success: function(result) {
                   console.log(result);                 
                  var obj = jQuery.parseJSON(result);
                  jQuery.each(obj, function (id, val) {
              //console.log(j);
                  console.log(val.key);
                  var id = '.prevClose #IMG'+imgcount;
                  jQuery(id).attr("key",val.key);
                  jQuery(id).attr("src",val.imageurl);
           
              
                });
            
              },
              error: function(result) {
                  alert('error');
                  //alert(result);
              }
          }); 

}
if (selectfrom == 'social') {
img_data = data;

jQuery(".previewIMG").append("<div id='loading' style='text-align:center;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' /></div>");
jQuery(".previewIMG .prevClose").hide();
console.log(imgcount);

  var nid = jQuery("#node_id").val();
    var pid = jQuery("#product_id").val();
    var cid = jQuery("#cid").val();
    var section = jQuery("#section").val();


        //putobject on s3 server;       
          
          jQuery.ajax({
              type: "POST",
              url: "/aws_simplysay",
              data: { 
                  'action':'putobject',
                  'data'  : img_data,
                  'cid' : cid,
                  'pid'   : pid,
                  'nid' : nid,
                  'section': section,
                  'selectfrom':selectfrom
   
                },
              success: function(result) {
                   console.log(result);                 
                  var obj = jQuery.parseJSON(result);
                  jQuery.each(obj, function (id, val) {
              //console.log(j);
                  console.log(val.key);
                  
                  
                      jQuery( "#loading" ).remove();
                      jQuery(".previewIMG .prevClose").show();
                      
                      appendHTML =" <li class='prevClose'><span class='fa fa-close closeIMG closeIMG_social'></span><img class='IMGView' id='"+val.key+"' key='"+val.key+"' src="+val.imageurl+"></li>";
                jQuery('.previewIMG').append(appendHTML);

                    jQuery('#social_image_picker #social_images li img').removeClass("selected");


                    jQuery('.closeIMG_social').click(function () {
                        
                         var key = jQuery(this).next().attr('key');
                         
                          jQuery(this).parent().remove();
                         //alert(key)
                         aws_delete(key);
                      });
                  // var id = '.prevClose #IMG'+imgcount;
                  // jQuery(id).attr("key",val.key);
                  // jQuery(id).attr("src",val.imageurl);
           
              
                });
            
              },
              error: function(result) {
                  alert('error');
                  //alert(result);
              }
          }); 

}




}

function aws_delete(key){


        // Deleteobject on s3 server;        
          
          jQuery.ajax({
              type: "POST",
              url: "/aws_simplysay",
              data: { 
                  'action':'deleteobject',
                  'data'   : key
   
                },
              success: function(result) {
                  //alert('removed');
                                
              },
              error: function(result) {
                  alert('error');
                  //alert(result);
              }
          }); 


}
