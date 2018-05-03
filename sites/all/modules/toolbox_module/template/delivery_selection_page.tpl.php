<?php
global $user;

$default_pid = _getDefaultShppingPID();

$profiles = commerce_customer_profile_load_multiple(array(), array('uid' => $user->uid, 'type' => 'shipping',));
$shipping_count = count($profiles);
?>


<div class="main_container">
    <div class="delivery_page_main">
        <div class="clearfix">
            <div class="container">
                <div class="delivery_main">
                    <div class="tool-title text-center">
                        <h2>Choose Delivery Address</h2>
                    </div>
                    <form id="addressbook-select-form">

                        <?
                        foreach ($profiles as $key => $value) {
                            if (!empty($value->commerce_customer_address['und'][0]['country'])) {
                                $query = db_select('apps_countries', 'ac')
                                    ->fields('ac')
                                    ->condition('ac.country_code', $value->commerce_customer_address['und'][0]['country'])
                                    ->execute();
                                $record = $query->fetchAll();

                                $record_count = count($record);

                                if ($record_count > 0) {
                                    $country_full_name = $record[0]->country_name;
                                } else {
                                    $country_full_name = $value->commerce_customer_address['und'][0]['country'];
                                }
                                if (!empty($country_full_name)) {
                                    $country = ", " . $country_full_name;
                                } else {
                                    $country = $country_full_name;
                                }
                            } else {
                                $country = '';
                            }

                            if (!empty($value->commerce_customer_address['und'][0]['administrative_area'])) {
                                $administrative_area = $value->commerce_customer_address['und'][0]['administrative_area'];
                            } else {
                                $administrative_area = '';
                            }
                            if (!empty($value->commerce_customer_address['und'][0]['locality'])) {
                                $locality = $value->commerce_customer_address['und'][0]['locality'] . ", ";
                            } else {
                                $locality = '';
                            }

                            $sub_administrative_area = $value->commerce_customer_address['und'][0]['sub_administrative_area'];
                            $dependent_locality = $value->commerce_customer_address['und'][0]['dependent_locality'];
                            $postal_code = $value->commerce_customer_address['und'][0]['postal_code'];
                            $organisation_name = $value->commerce_customer_address['und'][0]['organisation_name'];
                            $first_name = $value->commerce_customer_address['und'][0]['first_name'];
                            $addres1 = $value->commerce_customer_address['und'][0]['thoroughfare'];
                            $addres2 = $value->commerce_customer_address['und'][0]['premise'];
                            $last_name = $value->commerce_customer_address['und'][0]['last_name'];
                            $name_line = $value->commerce_customer_address['und'][0]['name_line'];
                            $data = $value->commerce_customer_address['und'][0]['data'];

                            if ($default_pid == $key) {
                                $checked = "checked";
                            } elseif ($shipping_count == 1) {
                                $checked = "checked";
                            } else {
                                $checked = '';
                            }
                            ?>

                            <div class="radio">
                                <label>
                                    <input type="radio" name="selectaddress" value="<?= $key ?>" <?= $checked ?> >
                                    <ul id='addressbook'>
                                        <li class="name-block"><?= $name_line ?></li>
                                        <li><?= $addres1 ?></li>
                                        <li><?= $addres2 ?></li>
                                        <!--<li><?= $locality ?> <?= $administrative_area ?></li>-->
                                        <li><?= $postal_code ?> <?= $country ?></li>
                                    </ul>
                                </label>
                            </div>

                        <? } ?>

                    </form>
                    <button id="add-address" onclick="addressbook_add_address();"><span class="icon glyphicon glyphicon-plus" aria-hidden="true"></span> Add Address</button>
                </div>
            </div>
        </div>
    </div>
</div>


<div id="">

</div>



<div class="container round-btn delivery_bottombtn" style="">
    <div class="blue-round-btns">

        <? if ($shipping_count > 0) { ?>
            <a href="javascript:void(0)" id="prev" class="btn-blue-prv" onclick="saveCanvasJson('showpre','addressbook')">Prev</a>
            <div class="delivery_add2cart_button">
                <button id="insert-cart"><span aria-hidden="true" class="icon glyphicon glyphicon-plus"></span> ADD TO CART</button>
            </div>
        <? } else { ?>
            <div class='delivery_head'><h3>You do not currently have any delivery addresses, please Add Address to proceed </h3></div>
        <? } ?>

    </div>
</div>
<script>
    $("html, body").animate({scrollTop: top}, "slow");

    var card_load = $("#card_load").val();
    if (card_load == 'cart') {
        $('#insert-cart').text('Update Cart');
        var item_id = $('#item_id').val();
    } else {
        var item_id = '';
        card_load = '';
    }

    $('#prev').click(function () {
        $.ajax({
            type: "POST",
            url: "/outlay",
            data: {
                'nid': nid,
                'pid': pid
            },
            success: function (result) {
                $("#toolbox").html(result);
            },
            error: function (result) {
                // alert('error');
            }
        });
    });

    $('#insert-cart').click(function () {
        $("#toolbox a.btn-blue-prv").before("<div id='loading' style='text-align:center;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' />Loading...</div>");
        $("#toolbox .blue-round-btns #insert-cart").addClass('round-btns-disabled');
        $("#toolbox .blue-round-btns a").addClass('round-btns-disabled');
        var address_pid = $('input[name="selectaddress"]:checked').val();
        var nid = $("#node_id").val();
        var pid = $("#product_id").val();
        var cid_check1 = $("#cid").val();
        var cid_check2 = $("#cidd").val();
        // alert('nid ='+nid+' address ='+address_pid+' pid ='+pid+' cid1 ='+cid_check1+' cid2 ='+cid_check2);
        if(cid_check2.length >0)
        {
            var cid = cid_check2;
        }
        else
        {
            var cid = cid_check1;
        }
        $.ajax({
            type: "POST",
            url: "/usersavedata",
            data: {
                'nid': nid,
                'pid': pid,
                'cid': cid,
                'address_pid': address_pid
            },
            success: function (result) {
                console.log("PID SAVED" ,result);
            $.ajax({
                type: "POST",
                url: "/addressbook_insert_card",
                data: {
                    'nid': nid,
                    'pid': pid,
                    'cid': cid,
                    'card_load': card_load,
                    'item_id': item_id
                },
                success: function (result) {
                    $("#toolbox .blue-round-btns #insert-cart").removeClass('round-btns-disabled');
                    $("#toolbox .blue-round-btns a").removeClass('round-btns-disabled');
                    if (card_load == 'cart') {
                        window.location.href = "/cart";
                    } else {
                        $(".commerce-add-to-cart #edit-submit").click();
                    }
                },
                error: function (result) {
                    // alert('error');
                }
                });
            },
            error: function (result) {
                // alert('error');
            }
        });
       

    });


    $('#addressbook-select-form input[name="selectaddress"]').click(function () {
        var address_pid = $('input[name="selectaddress"]:checked').val();
        var nid = $("#node_id").val();
        var pid = $("#product_id").val();
        var cid_check1 = $("#cid").val();
        var cid_check2 = $("#cidd").val();
        if(cid_check2.length >0)
        {
            var cid = cid_check2;
        }
        else
        {
            var cid = cid_check1;
        }

        $.ajax({
            type: "POST",
            url: "/usersavedata",
            data: {
                'nid': nid,
                'pid': pid,
                'cid': cid,
                'address_pid': address_pid
            },
            success: function (result) {
                console.log("PID SAVED" ,result);
            },
            error: function (result) {
                // alert('error');
            }
        });
    });

    function addressbook_add_address() {
        $.ajax({
            type: "POST",
            url: "/addressbook_add_address",
            success: function (result) {
                $("#toolbox").html(result);
            },
            error: function (result) {
                // alert("error");
            }
        });
    }

    $(document).ready(function () {
        var cid = '<?php echo $cid; ?>';
        if(cid.length >0)
        {
            $('#cidd').val(cid);
        }
        else
        {
            $('#cid').val(cid);
        }
        
        jQuery('#addressbook-select-form').listnav({
                        filterSelector: '.name-block',
                        includeNums: false,
                        // removeDisabled: true,
                        allText: 'All',
                        initLetter: 'all'
                    });
    });
</script>