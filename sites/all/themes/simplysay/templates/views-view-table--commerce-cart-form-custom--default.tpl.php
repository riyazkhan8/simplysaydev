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


  $edit_url= '';
  $card_address='';
?>


<table <?php if ($classes) { print 'class="'. $classes . '" '; } ?><?php print $attributes; ?>>
   <?php if (!empty($title) || !empty($caption)) : ?>
     <caption><?php print $caption . $title; ?></caption>
  <?php endif; ?>
  <?php if (!empty($header)) : ?>
    <thead>
      <tr>
        <?php foreach ($header as $field => $label): ?>
          <th <?php if ($header_classes[$field]) { print 'class="'. $header_classes[$field] . '" '; } ?> scope="col">
            <?php print $label; ?>
          </th>
        <?php endforeach; ?>
      </tr>
    </thead>
  <?php endif; ?>
  <tbody>
    <?php  foreach ($rows as $row_count => $row): ?>
      <tr <?php if ($row_classes[$row_count]) { print 'class="' . implode(' ', $row_classes[$row_count]) .'"';  } ?>>
        <?php  foreach ($row as $field => $content): 
//echo $field;exit;
        ?>
         
          <?php if ($field == 'line_item_id'): ?>

            <?php

                  $query = db_select('line_item_simplysay_card', 'li')
                                  ->fields('li')
                                  ->condition('li.line_item_id',$content)
                                ->execute();
                  $record = $query->fetchAll();
      
                  $count = count($record);    

                 // print "<pre>"; print_r($record);exit;
 
                    if ($count > 0) {

                      $cid = $record[0]->cid;
                      $query_card = db_select('user_saved_card', 'uc')
                                      ->fields('uc')
                                      ->condition('uc.cid', $cid)
                                    ->execute();
                              $record_card = $query_card->fetchAll();
                              $count_card = count($record_card);    

                                if ($count_card > 0) {

                                    //print "<pre>"; print_r($record_card[0]);exit;
                                    
                                    $card_address = show_address($record_card[0]->address_pid);
                                      
                                    $nodeurl = url('node/'. $record_card[0]->node_id);

                                    if ($record[0]->reorder_status == true) {
                                      $edit_url = '';
                                    }else{

                                      $edit_url = '<a href="'.$nodeurl.'?item_id='.$content.'" class="btn btn-info"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</a>';
                                    }

                                      
                                      //print "<pre>"; print_r($edit_url);exit;

                                }

                  
                    }else{

                      $card_address = "No Address Found";
                    }

            ?>
            <td <?php if ($field_classes[$field][$row_count]) { print 'class="'. $field_classes[$field][$row_count] . '" '; } ?><?php print drupal_attributes($field_attributes[$field][$row_count]); ?>>
            <?php print $card_address; ?>
          </td>
          <?php elseif ($field == 'field_card_image'): ?>
            <?php

                $query = db_select('line_item_simplysay_card', 'li')
                                  ->fields('li')
                                  ->condition('li.line_item_id',$row['line_item_id'])
                                ->execute();
                  $record = $query->fetchAll();
                  // echo "<pre>";
                  // print_r($record);exit;

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
                          
                                if ($count_card > 0) {

                                  $imageuri = $record_card[0]->uri;
                                  // $imagename = explode('cart_image_save_outlay', $imageuri);

                                global $base_path;
                                global $base_url;
                                // $filepath = variable_get('file_public_path', conf_path() . '/files');

                                    //print "<pre>"; print_r($record_card[0]->address_pid);


                                //$path = $base_url.''.$base_path.''.$filepath.'/cart_image_save_outlay'.$imagename[1];

                                $path = file_create_url($imageuri);

                                    //print "<pre>"; print_r($card_image);
                                  $card_image = "<img src='".$path."' id='cart_card_image' >";
                                    
                                      //$card_address = show_address($record_card[0]->address_pid);
                                }else{

                                    $card_image = $content;
                                }
                               

                  
                    }else{

                      $card_image = $content;
                    }

            ?>

            <td <?php if ($field_classes[$field][$row_count]) { print 'class="'. $field_classes[$field][$row_count] . '" '; } ?><?php print drupal_attributes($field_attributes[$field][$row_count]); ?>>
            <?php print $card_image; ?>
          </td>
          <?php elseif ($field == 'edit_delete'): ?>
            <td <?php if ($field_classes[$field][$row_count]) { print 'class="'. $field_classes[$field][$row_count] . '" '; } ?><?php print drupal_attributes($field_attributes[$field][$row_count]); ?>>
                <?php print $edit_url; ?>
                <?php print $content; ?> 
            </td>
          <?php else: ?>
          <td <?php if ($field_classes[$field][$row_count]) { print 'class="'. $field_classes[$field][$row_count] . '" '; } ?><?php print drupal_attributes($field_attributes[$field][$row_count]); ?>>
            <?php print $content; ?>
          </td>
          <?php endif; ?>
        <?php endforeach; ?>
      </tr>
    <?php endforeach; ?>
  </tbody>
</table>

