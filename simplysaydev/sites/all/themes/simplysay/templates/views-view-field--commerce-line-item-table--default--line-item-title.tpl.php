<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */
?>
<?php 

//print "<pre>"; print_r($row->line_item_id); 
	global $base_path;
    global $base_url;
    $theme_path = drupal_get_path('theme',$GLOBALS['theme']);

	  $query = db_select('line_item_simplysay_card', 'li')
                                  ->fields('li')
                                  ->condition('li.line_item_id',$row->line_item_id)
                                ->execute();
                  $record = $query->fetchAll();
      
                  $count = count($record);   
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
                                  // $imagename = explode('cart_image_save_outlay', $imageuri);

                                
                             
                                $path = file_create_url($imageuri);

                                    //print "<pre>"; print_r($card_image);
                                  $card_image = $path;
                                    
                                      //$card_address = show_address($record_card[0]->address_pid);
                                }else{

                                     $card_image = '/'.$theme_path."/images/user-cards.png";
                                }
                               

                  
                    }else{

                       $card_image = '/'.$theme_path."/images/user-cards.png";
                    }


print "<img src='".$card_image."' id='cart_card_image' >".$output; ?>