<?php
global $user;
global $base_path;
global $base_url;
if(isset($_POST['getresult']))
{
  $saved_begin = $_POST['getresult']; 
}
else
{
  $saved_begin = 0;
}
    $query = db_select('user_saved_card', 'uc')
                                ->fields('uc')
                                ->condition('uc.uid', $user->uid)
                                 ->orderBy('created', 'DESC')//ORDER BY created
                                 ->range($saved_begin, 6)
                                ->execute();
                    $record = $query->fetchAll();

if(isset($_POST['getresult'])){


                                    foreach ($record as $key => $value) { 
                                        
                                        $node = node_load($value->node_id);
                                        $product =  commerce_product_load($value->pid);
                                        $nodeurl = url('node/'. $node->nid);
                                        $card_url = $nodeurl.'?cid='.$value->cid;
                                        $time = date("j F, Y, g:i a",strtotime($value->created));


                                          $query_2 = db_select('line_item_simplysay_card', 'li')
                                  ->fields('li')
                                  ->condition('li.cid',$value->cid)
                                ->execute();
                  $record_2 = $query_2->fetchAll();
      
                  $count = count($record_2);   
                  $theme_path = drupal_get_path('theme',$GLOBALS['theme']);
                   //print "<pre>"; print_r($record);exit;
 
                    if ($count > 0) {

                        //print "<pre>"; print_r($record_2[0]->fid);

                        $fid = $record_2[0]->fid;

                        $query_card = db_select('file_managed', 'fm')
                                      ->fields('fm')
                                      ->condition('fm.fid', $fid)
                                    ->execute();
                              $record_card = $query_card->fetchAll();
                              $count_card = count($record_card);



                          //print "<pre>"; print_r($record_card);exit;
                                if ($count_card > 0) {

                                  $imageuri = $record_card[0]->uri;
                                //   $imagename = explode('cart_image_save_outlay', $imageuri);

                                
                                // $filepath = variable_get('file_public_path', conf_path() . '/files');

                                //     //print "<pre>"; print_r($record_card[0]->address_pid);


                                // $path = $base_url.''.$base_path.''.$filepath.'/cart_image_save_outlay'.$imagename[1];

                                    //print "<pre>"; print_r($path);exit;
                                  $path = file_create_url($imageuri);
                                  $card_image = $path;
                                    
                                      //$card_address = show_address($record_card[0]->address_pid);
                                }else{
                              
                                $card_image = '/'.$theme_path."/images/user-cards.png";

                            }
    


                    }else{

                                    $filename = $value->cid.'_image_save.png';


                                  $query_card = db_select('file_managed', 'fm')
                                      ->fields('fm')
                                      ->condition('fm.filename', $filename)
                                    ->execute();
                              $record_card = $query_card->fetchAll();
                              $image_count = count($record_card);

                              //print $image_count; exit;    

                                    if ($image_count > 0 ) {

                                       $filepath = variable_get('file_public_path', conf_path() . '/files');

                                        $path = $base_url.''.$base_path.''.$filepath.'/cart_image_save_outlay/'.$filename;

                                        $card_image = $path;

                                      
                                    }
                                    else
                                    {

                                    $card_image = '/'.$theme_path."/images/user-cards.png";

                                    }

                              }
     
                                $result.='<li>
                                      <div class="card_img">
                                          <img class="img-responsive" alt="card" src='.$card_image.'>
                                      </div>
                                      <div class="card_name">'.$node->title;
                                $result.='</div>
                                      <div class="card_datime">'.$time;
                                $result.='</div>
                                      <a href="print $card_url;"><button class="btn_continue">Open</button></a>';
                                      
                                      
                                      $query = db_select('user_card_pdf_sqs_status','pss')
                                            ->fields('pss')
                                            ->condition('pss.cid',$value->cid)
                                            ->execute();
                                    $record =$query->fetchAll();
          
                                            $count = count($record);  
                                          
                                            if ($count==0) {

                                            
                                            $result.='<div class="saved_cross">x</div>';

                                             }
                                        $result.='</li>';
                                      } 
                                    
echo $result;
exit;
}

// foreach ($record as $key => $value) { 
    
//     $node = node_load($value->node_id);
//     $product =  commerce_product_load($value->pid);

//     $nodeurl = url('node/'. $node->nid);
//     $time = date("j F, Y, g:i a",strtotime($value->created));

//     //print $nodeurl;
//     //print "<pre>";print_r($value->cid);
//     // print "<pre>";print_r($time);
//     // print "<pre>";print_r($node);
//     // print "<pre>";print_r($product->title);

//     $query_2 = db_select('line_item_simplysay_card', 'li')
//                                   ->fields('li')
//                                   ->condition('li.cid',$value->cid)
//                                 ->execute();
//                   $record_2 = $query_2->fetchAll();
      
//                   $count = count($record_2);   
//                   $theme_path = drupal_get_path('theme',$GLOBALS['theme']);
//                    //print "<pre>"; print_r($record);exit;
 
//                     if ($count > 0) {

//                         //print "<pre>"; print_r($record_2[0]->fid);

//                         $fid = $record_2[0]->fid;

//                         $query_card = db_select('file_managed', 'fm')
//                                       ->fields('fm')
//                                       ->condition('fm.fid', $fid)
//                                     ->execute();
//                               $record_card = $query_card->fetchAll();
//                               $count_card = count($record_card);    
//                           //print "<pre>"; print_r($record_card);exit;
//                                 if ($count_card > 0) {

//                                   $imageuri = $record_card[0]->uri;
//                                   $imagename = explode('card_cart_images', $imageuri);

//                                 global $base_path;
//                                 global $base_url;
//                                 $filepath = variable_get('file_public_path', conf_path() . '/files');

//                                     //print "<pre>"; print_r($record_card[0]->address_pid);


//                                 $path = $base_url.''.$base_path.''.$filepath.'/card_cart_images'.$imagename[1];

//                                     //print "<pre>"; print_r($path);exit;
//                                   $card_image = $path;
                                    
//                                       //$card_address = show_address($record_card[0]->address_pid);
//                                 }else{

//                                 $card_image = '/'.$theme_path."/images/user-cards.png";

//                                 }


//                     }else{

//                                 $card_image = '/'.$theme_path."/images/user-cards.png";

//                     }
    


// }


     //exit;
?>

<div class="saved-card" id="saved-card-content">
                    <div class="userprofile_right">
                                
                                <div class="card_bar">
                                    <ul>

                                    <?php foreach ($record as $key => $value) { 
                                        
                                        $node = node_load($value->node_id);
                                        $product =  commerce_product_load($value->pid);
                                        $nodeurl = url('node/'. $node->nid);
                                        $card_url = $nodeurl.'?cid='.$value->cid;
                                        $time = date("j F, Y, g:i a",strtotime($value->created));


                                          $query_2 = db_select('line_item_simplysay_card', 'li')
                                  ->fields('li')
                                  ->condition('li.cid',$value->cid)
                                ->execute();
                  $record_2 = $query_2->fetchAll();
      
                  $count = count($record_2);   
                  $theme_path = drupal_get_path('theme',$GLOBALS['theme']);
                   //print "<pre>"; print_r($record);exit;
 
                    if ($count > 0) {

                        //print "<pre>"; print_r($record_2[0]->fid);

                        $fid = $record_2[0]->fid;

                        $query_card = db_select('file_managed', 'fm')
                                      ->fields('fm')
                                      ->condition('fm.fid', $fid)
                                    ->execute();
                              $record_card = $query_card->fetchAll();
                              $count_card = count($record_card);



                          //print "<pre>"; print_r($record_card);exit;
                                if ($count_card > 0) {

                                  $imageuri = $record_card[0]->uri;
                                //   $imagename = explode('cart_image_save_outlay', $imageuri);

                                
                                // $filepath = variable_get('file_public_path', conf_path() . '/files');

                                //     //print "<pre>"; print_r($record_card[0]->address_pid);


                                // $path = $base_url.''.$base_path.''.$filepath.'/cart_image_save_outlay'.$imagename[1];

                                    //print "<pre>"; print_r($path);exit;
                                  $path = file_create_url($imageuri);
                                  $card_image = $path;
                                    
                                      //$card_address = show_address($record_card[0]->address_pid);
                                }else{
                              
                                $card_image = '/'.$theme_path."/images/user-cards.png";

                            }
    


                    }else{

                                    $filename = $value->cid.'_image_save.png';


                                  $query_card = db_select('file_managed', 'fm')
                                      ->fields('fm')
                                      ->condition('fm.filename', $filename)
                                    ->execute();
                              $record_card = $query_card->fetchAll();
                              $image_count = count($record_card);

                              //print $image_count; exit;    

                                    if ($image_count > 0 ) {

                                       $filepath = variable_get('file_public_path', conf_path() . '/files');

                                        $path = $base_url.''.$base_path.''.$filepath.'/cart_image_save_outlay/'.$filename;

                                        $card_image = $path;

                                      
                                    }
                                    else
                                    {

                                    $card_image = '/'.$theme_path."/images/user-cards.png";

                                    }

                              }


                                        ?>
                                        <li>
                                            <div class="card_img">
                                                <img class="img-responsive" alt="card" src="<?php print $card_image; ?>">
                                            </div>
                                            <div class="card_name"><?php print $node->title; ?></div>
                                            <div class="card_datime"><?php print $time; ?></div>
                                            <a href="<?php print $card_url; ?>"><button class="btn_continue">Open</button></a>
                                            <?php 
                                            
                                            $query = db_select('user_card_pdf_sqs_status','pss')
                                                  ->fields('pss')
                                                  ->condition('pss.cid',$value->cid)
                                                  ->execute();
                                          $record =$query->fetchAll();
          
                                            $count = count($record);  
                                          
                                            if ($count==0) {

                                            ?>
                                            <div class="saved_cross">x</div>

                                            <?php }?>
                                        </li>
                                    <?php  } ?>
                                    </ul>
                                </div>

                    </div>
 </div>
 <input type="hidden" name="slide_page" id="slide_page" value='6'>
<ul class="pager pager-load-more"><li class="pager-next">
  <input type="button" id="load_saved_card" value="Load More Results">
</ul>
 <script type="text/javascript">
$(document).ready(function(){
 $("#load_saved_card").click(function(){
  loadmore();
 });
});

function loadmore()
{
 var val = document.getElementById("slide_page").value;
 $.ajax({
 type: 'post',
 data: {
  getresult:val
 },
 success: function (response) {
  console.log(response);
  // var content = document.getElementById("saved-card-content");
  // content.innerHTML = content.innerHTML+response;
$( "#saved-card-content ul" ).append( response );
  // We increase the value by 6 because we limit the results by 6
  document.getElementById("slide_page").value = Number(val)+6;
 }
 });
}
</script>
 