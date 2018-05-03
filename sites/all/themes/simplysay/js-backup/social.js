

  //////////////////////////////Facebook Login start///////////////////////////////////////////////

     function fbLogoutUser(){
    	FB.getLoginStatus(function(response) {
        if (response && response.status === 'connected') {
            FB.logout(function(response) {
              checkLoginState();
            });
        }
    }); 
  	}

	  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
      jQuery('#fb_logout').show();
      jQuery('#image_add').show();
      jQuery('.fb-login-button').hide();
      jQuery('.insta-media').hide();
      jQuery('#social_image_picker').addClass("fb-border");
      
      

    } else {
      // The person is not logged into your app or we are unable to tell.
      // document.getElementById('status').innerHTML = 'Please log ' +
      //   'into this app.';
        jQuery('#fb_logout').hide();
        jQuery('#image_add').hide();
        jQuery('#social_images').html("");
        jQuery('.fb-login-button').show();
      	jQuery('.insta-media').show();
        jQuery('#social_image_picker').removeClass("fb-border");
        
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '502413663476958',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.9' // use graph api version 2.8
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    
    console.log('Welcome!  Fetching your information.... ');
    
    FB.api('me?fields=id,name,picture,albums', function(response) {
         
      console.log(response);
      console.log(response.albums.data[0].id);
      var url;

        for(i = 0; i < response.albums.data.length; i++) { 

       FB.api(response.albums.data[i].id + "/photos", function(response2) {
        

           for(j = 0; j < response2.data.length; j++) { 

                FB.api(response2.data[j].id + "/picture",{name}, function(response3) {
                console.log(response3);
                
                url = '<li><img src="'+response3.data.url+'"></img></li>';
               jQuery('#social_images').append(url);

              });
            }
       });
       if (i == (response.albums.data.length - 1)) {
        setTimeout(function(){
          select_image();
          }, 2000);
       }
     }
     //var slelct_code = "<script> select_image(); </script>";
      
     //var slelct_code = '<script>jQuery(document).ready(function(){  jQuery("#social_image_picker #social_images li img").click(function(){ jQuery("#social_image_picker #social_images li img").removeClass("selected");jQuery(this).addClass("selected");});});</script>';
    // jQuery('#social_images').append(slelct_code);     
      // document.getElementById('status').innerHTML =
      //   'Thanks for logging in, ' + response.name + '!';
    });
  }

function social_image_add(){

  var str = jQuery('#social_image_picker #social_images img.selected');
   
   var values = [];
   //var data = [];
   
   var all_url = str.each(function(index){
     

        var url = jQuery(this).attr('src');
        
        if (url != '' || url != null) {
                values[index] = url;
            }
   
   });
   var imgcount = values.length;

   if (values != null && values.length <= 10 && imgcount>0) {
             
          aws_upload(values,'social');
          jQuery("#add_error").remove();
          console.log(values);

        }else{

        	jQuery('.previewIMG').append('<div id="add_error" style="color:red;">Images is not selected</div>')
        }

   //console.log(data);
}

function select_image(){

  //alert('selected');

  jQuery("#social_image_picker #social_images li img").click(function(){ 
    

   //alert("Selected"); 
    var class_name = jQuery(this).hasClass("selected");
    //alert(class_name);
    if (class_name == true) {
      jQuery(this).removeClass("selected");
    }
    if (class_name == false) {
    jQuery(this).addClass("selected");
    }

  });

}

//////////////////////////////Facebook Api END////////////////////////////////////////////////



//////////////////////////////Instagram Login start///////////////////////////////////////////////
	var accessToken = null; //the access token is required to make any endpoint calls, http://instagram.com/developer/endpoints/
	
		var authenticateInstagram = function(instagramClientId, instagramRedirectUri, callback) {

			//the pop-up window size, change if you want
			var popupWidth = 700,
				popupHeight = 500,
				popupLeft = (window.screen.width - popupWidth) / 2,
				popupTop = (window.screen.height - popupHeight) / 2;

			//the url needs to point to instagram_auth.php
			var popup = window.open('/sites/instagram_auth.php', '', 'width='+popupWidth+',height='+popupHeight+',left='+popupLeft+',top='+popupTop+'');

			popup.onload = function() {

				//open authorize url in pop-up
				if(window.location.hash.length == 0) {
					popup.open('https://instagram.com/oauth/authorize/?client_id='+instagramClientId+'&redirect_uri='+instagramRedirectUri+'&response_type=token&scope=public_content', '_self');
				}

				//an interval runs to get the access token from the pop-up
				var interval = setInterval(function() {
					try {
						//check if hash exists
						if(popup.location.hash.length) {
							//hash found, that includes the access token
							clearInterval(interval);
							accessToken = popup.location.hash.slice(14); //slice #access_token= from string
							popup.close();
							if(callback != undefined && typeof callback == 'function') callback();
						}
					}
					catch(evt) {
						//permission denied
					}

				}, 100);
			}

		};


	function login_callback() {
				
				var redirect_uri = location.protocol + "//" + location.host+"/instagram_redirect"; 
				 jQuery.ajax({
				        type: "POST",
				        url: redirect_uri,
				        data: { 
		        				'token': accessToken,
		 
		    					},
				        success: function(result) {
				            //alert(result);
				            jQuery('.fb-login-button').hide();
      						jQuery('.insta-media').hide();
				            jQuery("#social_images").html(result);
				            jQuery('#insta_logout').show();
				            jQuery('#nextimage').show();
				            jQuery('#insta_image_add').show();
				            select_image();

				             	            
				        },
				        error: function(result) {
				            alert('error');
				            //alert(result);
				        }
				    });	


				//alert("You are successfully logged in! Access Token: "+accessToken);

	}

 
	function login() {
		var redirect_uri = location.protocol + "//" + location.host+"/instagram_redirect"; 
 
		authenticateInstagram(
			'61f25304083a40da985f0271bdec8bb8', //instagram client ID
			redirect_uri, //instagram redirect URI
			login_callback //optional - a callback function
		);

			//return false;

	}

	function instagramLogoutUser(){

		jQuery('.fb-login-button').show();
      	jQuery('.insta-media').show();
      	jQuery("#social_images").html('');
      	jQuery('#insta_logout').hide();
      	jQuery('#nextimage').hide();
      	jQuery('#insta_image_add').hide();
      	

	}

	function next(){
                var access_token = jQuery('#access_token').val();
                var next_max_id = jQuery('#next_max_id').val();
                var redirect_uri = location.protocol + "//" + location.host+"/instagram_redirect";

                jQuery.ajax({
                        type: "POST",
                        url: redirect_uri,
                        data: { 
                                'next_max_id': next_max_id,
                                'token': access_token,
         
                                },
                        success: function(result) {
                            //alert(result);
                            jQuery("#social_images").html(result);
                            select_image();


                                            
                        },
                        error: function(result) {
                            alert('error');
                            //alert(result);
                        }
                    }); 
        }



jQuery(document).ready(function(){

	jQuery('#insta_logout').hide();
	jQuery('#nextimage').hide();
	jQuery('#insta_image_add').hide();
			


});
