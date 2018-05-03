<?php

/**
 * @file
 * Template to display a view as a table.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $header: An array of header labels keyed by field id.
 * - $caption: The caption for this table. May be empty.
 * - $header_classes: An array of header classes keyed by field id.
 * - $fields: An array of CSS IDs to use for each field id.
 * - $classes: A class or classes to apply to the table, based on settings.
 * - $row_classes: An array of classes to apply to each row, indexed by row
 *   number. This matches the index in $rows.
 * - $rows: An array of row items. Each row is an array of content.
 *   $rows are keyed by row number, fields within rows are keyed by field ID.
 * - $field_classes: An array of classes to apply to each field, indexed by
 *   field id, then row number. This matches the index in $rows.
 * @ingroup views_templates
 */
?>

<div class="order-history">
                            <div class="userprofile_right order_tab">
                                <h4>Order History</h4>
                                <div class="tab-content">
                                    <div class="tab-pane fade in active" id="confirm">
                                    <?php foreach ($rows as $row_count => $row): ?>
                                    <?php
                                             $order = commerce_order_load($row['order_number']);
                                             $time = date("j F Y",$order->created);
                                             //if ($row['order_number'] == 30) {
                                                   //print "<pre>";print_r($order->commerce_line_items['und']);
                                            $line_items = $order->commerce_line_items['und'];
                                            $item_id = $line_items[0]['line_item_id'];
                                            $line_item_count = count($line_items);
                                           // print $line_item_count;
                                            $deck_image ='';
                                 $query = db_select('line_item_simplysay_card', 'li')
                                                  ->fields('li')
                                                  ->condition('li.line_item_id',$item_id)
                                                    ->execute();
                                $record = $query->fetchAll();
      
                                $count = count($record);   
                                $theme_path = drupal_get_path('theme',$GLOBALS['theme']);
                                    //print "<pre>"; print_r($record);exit;
                                 $deck_image_src = '/'.$theme_path."/images/card_deck.jpeg";
 
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


                                // $path = $base_url.''.$base_path.''.$filepath.'/card_cart_images'.$imagename[1];

                                    //print "<pre>"; print_r($card_image);
                                  $card_image = file_create_url($imageuri);;

                                  if ($line_item_count>1) {

                                    $deck_image = 'deck';
                                  }
                                   
                                }else{

                            $card_image = '/'.$theme_path."/images/user-cards.png";

                                }
                                

                                }
                                else
                                {
                                    $card_image = '/'.$theme_path."/images/user-cards.png";
                                }    


                                            //exit;
                                             //}
                                          
                                            //$line_item = commerce_line_item_load(24);
                                           // print "<pre>";print_r($line_item->commerce_product['und'][0]['product_id']);

                                    ?>
                                        <div class="view_dtlbox">
                                            <div class="detail_boximg <?php echo $deck_image; ?>">
                                                <img class="img-responsive" src="<?php print $card_image; ?>">
                                                <?php if(!empty($deck_image)):?>
                                                <div>
                                                  <img src="<?php print $deck_image_src; ?>">
                                                </div>
                                              <?php endif;?>
                                            </div>

                                            <div class="detail_boxcont">
                                                <!-- <h5>Untitled Card</h5> -->

                                                <ul>
                                                    <li>Order ID: <span><?php print $row['order_number']; ?></span></li>
                                                    <li>Recipient Name: <span> Photo Card</span></li>
                                                    <li>Order Date: <span><?php print $time; ?></span></li>
                                                    <li>Status: <span><?php print $row['status']; ?></span></li>
                                                </ul>
                                            </div>
                                            <div class="view_dtlbtn">
                                                <a class="btn_dtlbtn" href="orders/<?php print $row['order_number']; ?>">View Detail</a>
                                            <?php $order_id = $row['order_number'];?>
                                                <!-- <a class="btn_dtlbtn" onclick="reorder_button(<?php echo $order_id;?>);" href="javascript:void(0)">Re-order</a> -->
                                            </div>
                                        </div>
                                    <?php endforeach;  ?>
                                    </div>
                                </div>

                            </div>
                        </div>