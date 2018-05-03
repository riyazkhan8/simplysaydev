<?php global $base_path; ?>
<div class="main_container">
        <div class="preview_page">
            <div class="clearfix">
                <div class="delivery_main">
                    <div class="container">
                        <ul class="clearfix">
                            <li class="delivery_box active" id="type_0">
                                <i class="fa fa-check"></i>
                                <h4>Send it directly to their door</h4>
                                <p>Select this option for the card to be delivered directly to the recipients address in our <u>blue envelope</u>, ready for them to open.</p>
                                <p><img src="https://s3-stage.simplysay.sg/s3fs-public/site_images/skyblue_flat_env_no_text.png" style="width:113.5px;height:80px;box-shadow:0 9px 12px rgba(0,0,0,.3)"/></p>
                                <input type="hidden" name="delivery_type" value="0">
                            </li>
                            <li class="delivery_box" id="type_1">
                                <i class="fa fa-check"></i>
                                <h4>Include an extra envelope</h4>
                                <p>Select this option for an additional envelope. The card will be delivered in a <u>white envelope</u> with a blank <u>blue envelope</u> inside.</p>
                                <p><img src="https://s3-stage.simplysay.sg/s3fs-public/site_images/white_flat_env_no_text_2.png" style="width:113.5px;height:80px;box-shadow:0 9px 12px rgba(0,0,0,.3)"/> + <img src="https://s3-stage.simplysay.sg/s3fs-public/site_images/skyblue_flat_env_no_text.png" style="width:113.5px;height:80px;box-shadow:0 9px 12px rgba(0,0,0,.3)"/></p>
                                <input type="hidden" name="delivery_type" value="1">
                            </li>
                        </ul>
                    </div>
                </div>


                <div class="col-sm-12">
                    <div class="blue-round-btns">
                        <a class="btn-blue-prv" onclick="$('#delivery-container').hide();$('#preview-container').show();">Prev</a>

                        <?php global $user; if ($user->uid == 0): ?>
                            <a href="javascript:void(0)" onclick="user_redirect_session();" class="btn-blue-nxt" data-toggle="modal" data-target="#login-modal" >Next</a>
                        <?php else: ?>
                            <a href="javascript:void(0)" class="btn-blue-nxt" onclick="delivery_selection();">Next</a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script>



function delivery_selection(){

    jQuery.ajax({
        type: "POST",
        url: "/delivery_selection",
        data: {
            cid: fabric.config.cid
        },
        success: function (result) {
            jQuery("#toolbox").html(result);

            // setTimeout(function() {
                // jQuery('#addressbook-select-form').listnav({
                //         filterSelector: '.name-block',
                //         includeNums: false,
                //         // removeDisabled: true,
                //         allText: 'All',
                //         initLetter: 'all'
                //     });
            // }, 500);
        },
        error: function (result) {
            // alert('error');
        }
    });
}

function showDelivery(){
    $('#delivery-container').show();
    jQuery("html, body").animate({scrollTop: top}, "slow");


    if (fabric.config.deliveryType == 1) {

        jQuery(".preview_page .delivery_box").removeClass('active');
        jQuery('.preview_page #type_1').addClass('active');

    }
    if (fabric.config.deliveryType == 0) {

        jQuery(".preview_page .delivery_box").removeClass('active');
        jQuery('.preview_page #type_0').addClass('active');
    }
}

jQuery(".preview_page .delivery_box").click(function(){

  var nid = jQuery("#node_id").val();
  var pid = jQuery("#product_id").val();
  var cid = jQuery("#cid").val();
  var delivery_type = jQuery("input[name=delivery_type]",this).val();
  var box = jQuery(this);
  jQuery(".preview_page .delivery_box").removeClass('active');

  box.addClass('active');

        jQuery.ajax({
        type: "POST",
        url: "/usersavedata",
        data: {
            'nid': nid,
            'pid': pid,
            'cid': cid,
            'delivery_type':delivery_type
          },
        success: function(result) {
            // if (result != true) {
                    
            //         // box.removeClass('active');
            //         // jQuery('#type_0').addClass('active');
            //     }
            //     else
            //     {
            //        // fabric.config.deliveryType = delivery_type; 
            //     }
            if (result) {
                fabric.config.deliveryType = delivery_type;
            }
            else{
                // box.removeClass('active');
                // jQuery('#type_0').addClass('active');
            }
        },
        error: function(result) {
            // alert('error');
        }
    });


});



</script>