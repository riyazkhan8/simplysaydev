
<?php

$item_id = arg(4);


if (!empty($item_id) ) {

    global $user;
    $line_items = commerce_line_item_load($item_id);

    $order = commerce_order_load($line_items->order_id);
    $time = date("j F Y",$order->created);
    
    $pid = $line_items->commerce_product['und'][0]['product_id'];
    $product =  commerce_product_load($pid);
//print "<pre>";print_r($product);
  //print "<pre>";print_r($order);
  //exit;
    $title = $product->title;
    $status = $order->status;
    $type_name = taxonomy_term_load($product->field_card_type['und'][0]['tid']);
    $category_name = taxonomy_term_load($product->field_card_categories['und'][0]['tid']);

    $amount = $product->commerce_price['und'][0]['amount'];
    $currency_code = $product->commerce_price['und'][0]['currency_code'];    
    $price = commerce_currency_format($amount, $currency_code , $object = NULL, $convert = TRUE);
    $payment_method = substr($order->data['payment_method'], 0, 10);
    

    $profiles = array();
    $address = array();
    $delivery_type = '';


         $query = db_select('line_item_simplysay_card', 'li')
                                  ->fields('li')
                                  ->condition('li.line_item_id',$item_id)
                                ->execute();
                  $record = $query->fetchAll();
      
                  $count = count($record);   
                  $theme_path = drupal_get_path('theme',$GLOBALS['theme']);
                   //print "<pre>"; print_r($record);exit;
 
                    if ($count > 0) {

                      $fid = $record[0]->fid;



                      $query_card = db_select('file_managed', 'fm')
                                      ->fields('fm')
                                      ->condition('fm.fid', $fid)
                                    ->execute();
                              $record_card = $query_card->fetchAll();
                              $count_card = count($record_card);    
                          //print "<pre>"; print_r($record_card);exit;
                                if ($count_card > 0) {

                                  $imageuri = $record_card[0]->uri;
                                //   $imagename = explode('card_cart_images', $imageuri);

                                // global $base_path;
                                // global $base_url;
                                // $filepath = variable_get('file_public_path', conf_path() . '/files');

                                //     //print "<pre>"; print_r($record_card[0]->address_pid);


                                // $path = $base_url.''.$base_path.''.$filepath.'/card_cart_images'.$imagename[1];

                                    //print "<pre>"; print_r($card_image);
                                  $card_image = $path = file_create_url($imageuri);;
                                    
                                      //$card_address = show_address($record_card[0]->address_pid);
                                }else{

                                $card_image = '/'.$theme_path."/images/dtl_card.png";

                                }

                                 //print "<pre>"; print_r($record[0]);exit;
                            $cid = $record[0]->cid ;

                      $query_card = db_select('user_saved_card', 'uc')
                                      ->fields('uc')
                                      ->condition('uc.cid', $cid)
                                    ->execute();
                              $record_card = $query_card->fetchAll();
                              $count_card = count($record_card);

                              //print $count_card; exit;    

                                if ($count_card > 0) {

                                   // print "<pre>"; print_r($record_card[0]);exit;
                                    $delivery_address = $record_card[0]->address_pid;

                                    if ($record_card[0]->return_delivery_type_status == 1) {

                                        $delivery_type = 'RETURNED';

                                    }else{

                                        $delivery_type = 'DIRECT';
                                    }
                                    
                                }
                               

                  
                    }else{

                      $card_image = '/'.$theme_path."/images/dtl_card.png";
                    }





    if (isset($order->commerce_customer_billing['und'][0]['profile_id'])) {
          $profiles['billing_profile_id'] = $order->commerce_customer_billing['und'][0]['profile_id'];

        $billing_profile_id = $order->commerce_customer_billing['und'][0]['profile_id'];
    }else{

        $billing_profile_id ='';
    }

   
    if (isset($delivery_address) && !empty($delivery_address)) {
         $profiles['shipping_profile_id'] = $delivery_address;

        $shipping_profile_id = $delivery_address;

    }else{

        $shipping_profile_id = '';
    }
    
    


    foreach ($profiles as $key => $id) {

        if (!empty($id)) {
            

              $value = commerce_customer_profile_load($id);
        //print "<pre>"; print_r($value);

            $country = $value->commerce_customer_address['und'][0]['country'];
            $administrative_area = $value->commerce_customer_address['und'][0]['administrative_area'];
            $sub_administrative_area = $value->commerce_customer_address['und'][0]['sub_administrative_area'];
            $locality = $value->commerce_customer_address['und'][0]['locality'];
            $dependent_locality = $value->commerce_customer_address['und'][0]['dependent_locality'];
            $postal_code = $value->commerce_customer_address['und'][0]['postal_code'];
            $organisation_name = $value->commerce_customer_address['und'][0]['organisation_name'];
            $first_name = $value->commerce_customer_address['und'][0]['first_name'];
            $addres1 = $value->commerce_customer_address['und'][0]['thoroughfare'];
            $addres2 = $value->commerce_customer_address['und'][0]['premise'];
            $last_name = $value->commerce_customer_address['und'][0]['last_name'];
            $name_line = $value->commerce_customer_address['und'][0]['name_line'];
            $data = $value->commerce_customer_address['und'][0]['data'];


        $address[$id] = $name_line." ".$addres1." ".$addres2.", ".$locality.", ".$administrative_area.", ".$postal_code;    

        }

    }



    //print "<pre>"; print_r($address);exit;
//exit;
    // $query = db_select('user_saved_card', 'uc')
    //                             ->fields('uc')
    //                             ->condition('uc.uid', $user->uid)
    //                             ->condition('uc.cid', $cid)
    //                             ->execute();
    //                 $record = $query->fetchAll();





}

?>

<?php if (!empty($item_id) && is_numeric($item_id)): ?>

                    <div class="order-details">
                            <div class="userprofile_right conform_dtl">

                                <div class="view_dtlbox">
                                    <div class="detail_boxcont">
                                        <h4><?php print $title; ?><span><i class="fa fa-check" aria-hidden="true"></i><?php print $status; ?></span></h4>
                                        <h5>Order Details</h5>
                                        <ul>
                                            <li>Order ID: <span><?php print $order->order_number; ?></span></li>
                                            <li>Order Date: <span><?php print $time; ?></span></li>
                                        </ul>
                                        <h5>Other Details of Card</h5>
                                        <ul>
                                            <li>Card Type: <span><?php print $type_name->name; ?></span></li>
                                            <li>Card Category: <span><?php print $category_name->name; ?></span></li>
                                            <li>Pricing: <span><?php print $price; ?></span></li>
                                            <li>Payment Mode: <span><?php print $payment_method; ?></span></li>
                                        </ul>
                                        <h5>Delivery Details</h5>
                                        <ul class="delivery_detal">
                                            <li>Delivery Type: <span><?php print $delivery_type; ?></span></li>
                                            <li>Billing Address: <span><?php 
                                            
                                            if (isset($address[$billing_profile_id])) {
                                                 print $address[$billing_profile_id]; 
                                            }

                                            ?></span></li>
                                            <li>Delivery Address: <span><?php 

                                            if (isset($address[$shipping_profile_id])) {
                                                print $address[$shipping_profile_id];
                                            }
                                           
                                            ?></span></li>
                                            <li>Delivery Status: <span><?php print $status; ?></span></li>
                                        </ul>
                                    </div>

                                    <div class="detail_boximg">
                                        <img src="<?php echo $card_image; ?>" class="img-responsive">
                                        <a href="javascript:void(0)" data-target="#preview-modal" data-toggle="modal" class="preview_click"><i class="fa fa-eye" aria-hidden="true"></i> Preview</a>
                                    </div>
                                </div>

                            </div>
                    </div>
<?php else:?>

                        <div> Unable To Show Details </div>

<?php endif; ?>