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
<table <?php if ($classes) { print 'class="'. $classes . '" '; } ?><?php print $attributes; ?>>
   <?php if (!empty($title) || !empty($caption)) : ?>
     <caption><?php print $caption . $title; ?></caption>
  <?php endif; ?>
  <?php if (!empty($header)) : ?>
    <thead>
      <tr>
        <?php foreach ($header as $field => $label): ?>
        <?php if ($field == 'php_2'): ?>
        <?php
        global $user;
        if (in_array('administrator', array_values($user->roles))) { ?>
          <th <?php if ($header_classes[$field]) { print 'class="'. $header_classes[$field] . '" '; } ?> scope="col">
            <?php print $label; ?>
          </th>
          <?php } ?>
          <?php else: ?>
          <th <?php if ($header_classes[$field]) { print 'class="'. $header_classes[$field] . '" '; } ?> scope="col">
            <?php print $label; ?>
          </th>
          <?php endif; ?>
        <?php endforeach; ?>
      </tr>
    </thead>
  <?php endif; ?>
  <tbody>
    <?php $count_url = 0; 
    foreach ($rows as $row_count => $row): ?>
      <tr <?php if ($row_classes[$row_count]) { print 'class="' . implode(' ', $row_classes[$row_count]) .'"';  } ?>>
        <?php 
        foreach ($row as $field => $content): ?>
        
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
            <?php //print $card_address; ?>
          </td>
          <?php elseif ($field == 'php_2'): ?>
        <?php
        global $user;
// if (in_array('administrator', array_values($user->roles)) &&  in_array('moderator', array_values($user->roles))) {
$query = db_select('user_card_pdf_responce_data', 'cp')
                                  ->fields('cp')
                                  ->condition('cp.line_item_id',$row['line_item_id'])
                                ->execute();
                  $record = $query->fetchAll();
      
                  $count = count($record);    
 
                    if ($count > 0) {

                     $pdf = '<a href="'.$record[0]->pds_s3_link.'">PDF</a>';
                  
                    }else{

                      $pdf = "No PDF Found";
                    }
                    if (in_array('administrator', array_values($user->roles))) { ?>
                    <td <?php if ($field_classes[$field][$row_count]) { print 'class="'. $field_classes[$field][$row_count] . '" '; } ?><?php print drupal_attributes($field_attributes[$field][$row_count]); ?>>
                    <?php print $pdf; ?>
                  </td> <?php } else {} ?>
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
                   // print "<pre>"; print_r($record);exit;
 
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
           <?php elseif ($field == 'php_3'): ?>
           <?php 
           $record ='';
  $card_orientation='portrait';

  $query1 = db_select('line_item_simplysay_card', 'li')
                ->fields('li')
                ->condition('li.line_item_id',$row['line_item_id'])
              ->execute();
          $record1 = $query1->fetchAll();
          foreach ($record1 as $value1) {
            $record1 = $value1;
          }
          
          //print "<pre>"; print_r($record1->cid);

          //exit;
          $count1 = count($record1);  
          $cid = $record1->cid;

            if ($count1 > 0) {



                  $query = db_select('user_saved_card', 'uc')
                        ->fields('uc')
                        ->condition('uc.cid',$record1->cid)
                      ->execute();
              $record = $query->fetchAll();
              $count = count($record);

              //print "<pre>"; print_r($record);

              //exit;

              if ($count > 0) {
                
                foreach ($record as $value) {
                  $record = $value;
                }
                
                $pid = $value->pid;
                $product = commerce_product_load($pid);
                $card_mode = $product->field_card_orientation['und'][0]['tid'];
                //print $card_mode;exit;

                if ($card_mode == 16) {
                  $card_orientation = 'landscape';
                  $target_pop = 1;
                }else{
                  $card_orientation = 'portrait';
                  $target_pop = 2;
                }
                //$nid = $value->node_id;
              }



            }
           ?>
           <?php
global $base_path;
if($card_orientation == 'landscape')
{
?>
<div id="preview-modal1" class="modal fade preview_card_detail" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
  <div class="modal-dialog" role="document">
        <div class="modal-content">
            <button type="button" class="close" data-dismiss="modal" style="z-index: 1;" aria-label="Close"><span aria-hidden="true">×</span></button>
<div class="main_container landscape">
        <div class="info-msg-landscape">
              <span>Please scroll down to preview your card.</span>
        </div>
        <div class="preview_page">
                <div class="clearfix">
                    <!-- <div class="col-sm-12">
                        <div class="tool-title text-center"><h2>Your Card Preview</h2></div>
                    </div> -->
                    <div class="column">
                        <div class="canvas-board">
                            <div class="canvas_duumy_image" style="display:none;" >
                                <canvas id="canvas" width="661" height="500"  class="getCanvas5" ></canvas>
                            </div>
                            <div class="canvas_duumy_image">
                                <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/preview.png" id="canvas" width="661" height="500" class="getCanvas5" >           
                            </div>
                            <div class="canvas_duumy_image_back" style="display:none;">
                                <canvas id="canvas_back" width="661" height="500"  class="getCanvas_back" ></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="canvas-board">
                            <div class="canvas-content">
                                <div class="content-area content-area-lg" style="display:none;" >
                                    <!-- <textarea placeholder=""></textarea> -->
                                    <canvas id="canvas1" width="661" height="500" class="getCanvas6" ></canvas>
                                </div>
                                <div class="content-area content-area-lg">
                                  <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/preview.png" id="canvas1"  width="661" height="500" class="getCanvas6" >      
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="canvas-board">
                            <div class="canvas-content">
                                <div class="content-area content-area-sm" style="display:none;" >
                                    <!-- <textarea placeholder=""></textarea> -->
                                    <canvas id="canvas2" width="661" height="150" class="getCanvas7" placeholder="Click Here To Select This Area"></canvas>
                                </div>
                                <div class="content-area content-area-md" style="display:none;" >
                                    <!-- <textarea placeholder=""></textarea> -->
                                    <canvas id="canvas3" width="661" height="175" class="getCanvas3" placeholder="Click Here To Select This Area"></canvas>
                                </div>
                                <div class="content-area content-area-sm" style="display:none;" >
                                    <!-- <textarea placeholder=""></textarea> -->
                                    <canvas id="canvas4" width="661" height="150" class="getCanvas9" placeholder="Click Here To Select This Area"></canvas>
                                </div>
                                <div class="content-area content-area-sm" >
                                    
                                    <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/preview.png" id="canvas2" width="661" height="150" class="getCanvas7" ></img>
                                </div>
                                 <div class="content-area content-area-md">
                                    
                                    <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/preview.png" id="canvas3" width="661" height="175" class="getCanvas8" ></img>
                                </div>
                                 <div class="content-area content-area-sm">
                                    
                                    <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/preview.png" id="canvas4" width="661" height="150" class="getCanvas9" ></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 svg_canvas">
                        <div class="canvas-board" style="display:none;">
                            <div class="canvas-content">
                                    <!-- <textarea placeholder=""></textarea> -->
                                    <canvas id="svg_canvas"  width="642" height="889" class="svg_canvas_1" ></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 svg_canvas">
                        <div class="canvas-board" style="display:none;">
                            <div class="canvas-content">
                                    <!-- <textarea placeholder=""></textarea> -->
                                    <canvas id="svg_canvas_inlay"  width="642" height="889" class="svg_canvas_1" ></canvas>
                            </div>
                        </div>
                    </div>
                </div>
        </div> 
        
    </div>
  </div>
</div>
</div>

<script >

 var canvas = new fabric.Canvas('canvas',{
      preserveObjectStacking: true
 });

 var canvas_back = new fabric.Canvas('canvas_back',{
      preserveObjectStacking: true
 });

  canvas1 = new fabric.Canvas("canvas1",{
      preserveObjectStacking: true,
 });
 
 canvas2 = new fabric.Canvas("canvas2",{
      preserveObjectStacking: true,
 });
 
 canvas3 = new fabric.Canvas("canvas3",{
      preserveObjectStacking: true,
 });

 canvas4 = new fabric.Canvas("canvas4",{
      preserveObjectStacking: true,
 });

 svg_canvas = new fabric.Canvas("svg_canvas",{
      preserveObjectStacking: true,
 });
svg_canvas_inlay = new fabric.Canvas("svg_canvas_inlay",{
      preserveObjectStacking: true,
 });
 

function set_json(data,canvas,count){

      var json = data;
      var getDATA;
      var setdata = getDATA+""+count;

    var setdata =canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function(o, object) {
        
        fabric.log(o, object);
        
        });

}

function set_barcode(result,canvas,count){

    var getDATA;
        var setdata = getDATA+""+count;

      fabric.Image.fromURL(result, function(img) {
       //var rFilter = new fabric.Image.filters.Resize({
      //  resizeType: 'sliceHack'
      //});
     // img.resizeFilters.push(rFilter);
      //img.applyFilters(canvas.renderAll.bind(canvas));
        img.scale(0.5).set({
                top: 425,
                left:585,
                //height:100,
                //width:100,
              });
       //canvas.imageSmoothingEnabled = true;
        //canvas.imageSmoothingQuality = "high"
        canvas.add(img).setActiveObject(img);
     
     });

}



function fixSVGText(str) {
  // parse our string as a DOM object and get the SVGElement
  var svg = new DOMParser().parseFromString(str, "image/svg+xml").documentElement;

  // get all <tspan> elements
  var tspans = svg.querySelectorAll('tspan');
  for (var i = 0; i < tspans.length; i++) {
    var ts = tspans[i],
      parent = ts.parentNode,
      gParent = parent.parentNode;
    var j = 0;

    // create a new SVGTextElement to replace our tspan
    var replace = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    var tsAttr = ts.attributes;
    // set the 'x', 'y' and 'fill' attributes to our new element
    for (j = 0; j < tsAttr.length; j++) {
      replace.setAttributeNS(null, tsAttr[j].name, tsAttr[j].value);
    }

    // append the contentText
    var childNodes = ts.childNodes;
    for (j = 0; j < childNodes.length; j++) {
      replace.appendChild(ts.childNodes[j]);
    }

    var tAttr = parent.attributes;
    // set the original text attributes to our new one
    for (j = 0; j < tAttr.length; j++) {
      replace.setAttributeNS(null, tAttr[j].name, tAttr[j].value);
    }
    // append our new text to the grand-parent
    gParent.appendChild(replace);

    // if this is the last tspan
    if (ts === parent.lastElementChild)
    // remove the old, now empty, SVGTextElement
      gParent.removeChild(parent)
  }
  // return a string version of our cleaned svg
  return new XMLSerializer().serializeToString(svg);
}


function landscape(count_url) {
jQuery(".preview_page .column .canvas-board").append("<span id='loading' style='text-align:center;color: #ccc;position: absolute;left: 50%;margin-top: -30%;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' />loading...</span>");
jQuery("a.btn-blue-prv").before("<div id='loading' style='text-align:center;color: #ccc;position: absolute;left: 50%;margin-top: -30%; ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' />Loading...</div>");

 var item_id = jQuery("#item_id"+count_url).val();
              if (item_id != null && item_id != "undefined") {           
              var xhr = jQuery.ajax({
                  type: "POST",
                  url: "/canvassave",
                  data: { 
                      'item_id': item_id, 
                      'section': 'order_detail',
       
                    },
                  success: function(result) {
                      
                       //alert(result);
                        var myobj = jQuery.parseJSON(result);
                        //console.log(myobj.outlay_card_json);
                        //console.log(myobj.outlay_card_back_json);
                        //console.log(myobj.barcode_data);
                        //console.log(myobj.inlay_card_json_1);
                        //console.log(myobj.inlay_card_json_2);
                        //console.log(myobj.inlay_card_json_3);
                        //console.log(myobj.inlay_card_json_4);

                       set_json(myobj.outlay_card_json,canvas,'');
                       set_json(myobj.outlay_card_back_json,canvas_back,'');
                       set_barcode(myobj.barcode_data,canvas_back,'');
                       set_json(myobj.inlay_card_json_1,canvas1,1);
                       set_json(myobj.inlay_card_json_2,canvas2,2);
                       set_json(myobj.inlay_card_json_3,canvas3,3);
                       set_json(myobj.inlay_card_json_4,canvas4,4);

                       var color_bar = myobj.color_bar;
                       var gray_color_bar = myobj.gray_color_bar;

                       // Function to set preview

                       var thumbImage;
                        setTimeout(
                    function() 
                    {
                       thumbImage = canvas.toDataURL('png');
                       //window.open(canvas.toDataURL('png'));
                        jQuery('.getCanvas5').attr('src', thumbImage);
                        jQuery(".landscape .preview_page .column:nth-child(1) #loading").remove();

                        thumbImage1 = canvas1.toDataURL('png');
                       //window.open(canvas1.toDataURL('png'));
                        jQuery('.getCanvas6').attr('src', thumbImage1);
                        jQuery(".landscape .preview_page .column:nth-child(2) #loading").remove();

                        thumbImage2 = canvas2.toDataURL('png');
                       //window.open(canvas1.toDataURL('png'));
                        jQuery('.getCanvas7').attr('src', thumbImage2);
                        thumbImage3 = canvas3.toDataURL('png');
                       //window.open(canvas1.toDataURL('png'));
                        jQuery('.getCanvas8').attr('src', thumbImage3);
                        thumbImage4 = canvas4.toDataURL('png');
                       //window.open(canvas1.toDataURL('png'));
                        jQuery('.getCanvas9').attr('src', thumbImage4);
                        jQuery(".landscape .preview_page .column:nth-child(3) #loading").remove();


                         var outlay_card_svg = canvas.toSVG();
                       //console.log(outlay_card_svg);
                       //console.log('-------------------------------------');
                       
                            var getDATA1 = fabric.loadSVGFromString(fixSVGText(outlay_card_svg), function (objects, options) { 
                                    
                            var shape = fabric.util.groupSVGElements(objects, options);
                                        shape.set({
                                                left:628,
                                                top:445,
                                                scaleY: 0.860,
                                                scaleX: 0.926,
                                                angle: 180,
                                                
                                            });
                                                svg_canvas.add(shape);
                                                shape.bringForward(); 
                                                svg_canvas.renderAll(); 

                                });

                       //var outlay_card_back_svg = myobj.outlay_card_back_json;
                       var outlay_card_back_svg = canvas_back.toSVG();

                  var getDATA1 = fabric.loadSVGFromString(fixSVGText(outlay_card_back_svg), function (objects, options) { 
                                    
                             var shape = fabric.util.groupSVGElements(objects, options);
                                            shape.set({
                                                left:14,
                                                top:445,
                                                scaleY: 0.860,
                                                scaleX: 0.926,
                                                angle: 0,
                                                
                                            });
                                                svg_canvas.add(shape);
                                                shape.bringToFront(); 
                                                svg_canvas.renderAll(); 

                                });


                                var line1 = new fabric.Line([
                                              23, 0,
                                              23, 14
                                            ],{ 
                                              stroke: '#000', 
                                            })

                                           var line12 = new fabric.Line([
                                              0, 23,
                                              14, 23
                                            ],{ 
                                              stroke: '#000', 
                                            })

                                           var line2 = new fabric.Line([
                                          svg_canvas.width-23, 0,
                                          svg_canvas.width-23, 14
                                        ],{ 
                                          stroke: '#000', 
                                        })
                                       
                                        var line22 = new fabric.Line([
                                          svg_canvas.width-14, 23,
                                          svg_canvas.width-0, 23
                                        ],{ 
                                          stroke: '#000', 
                                        })
                                          var line3 = new fabric.Line([
                                              0, svg_canvas.height - 23,
                                              14, svg_canvas.height - 23
                                            ],{ 
                                              stroke: '#000', 
                                            });
                                            var line32 = new fabric.Line([
                                              23, svg_canvas.height- 14,
                                              23, svg_canvas.height-0
                                            ],{ 
                                              stroke: '#000', 
                                            });

                                            var line4 = new fabric.Line([
                                              svg_canvas.width-23, svg_canvas.height- 14,
                                              svg_canvas.width-23, svg_canvas.height-0
                                            ],{ 
                                              stroke: '#000', 
                                            });

                                             var line42 = new fabric.Line([
                                              svg_canvas.width-14, svg_canvas.height - 23,
                                              svg_canvas.width-0, svg_canvas.height - 23
                                            ],{ 
                                              stroke: '#000', 
                                            });

                              

                                            var group = new fabric.Group([
                                              line1,
                                              line12,
                                              line2,
                                              line22,
                                              line3,
                                              line32,
                                              line4,
                                              line42,
                                            ]);
                                            group.selectable = false;
                                            group.evented = false;

                                            svg_canvas.add(group);
                                            group.sendToBack();
                                            //group.sendToBack();


                       var inlay_card_svg_1 = canvas1.toSVG();
                       //console.log(inlay_card_svg_1);

                         var getDATA1 = fabric.loadSVGFromString(fixSVGText(inlay_card_svg_1), function (objects, options) { 
                                    
                              var shape = fabric.util.groupSVGElements(objects, options);
                                            shape.set({
                                                left:15,
                                                top:14,
                                                scaleY: 0.860,
                                                scaleX: 0.926,
                                                angle: 0,

                                            });
                                                svg_canvas_inlay.add(shape);
                                                shape.sendToBack(); 
                                                svg_canvas_inlay.renderAll(); 

                                });

                        var inlay_card_svg_2 = canvas2.toSVG();
                       //console.log(inlay_card_svg_2);

                        var getDATA1 = fabric.loadSVGFromString(fixSVGText(inlay_card_svg_2), function (objects, options) { 
                                    
                              var shape = fabric.util.groupSVGElements(objects, options);
                                            shape.set({
                                                left: 15,
                                                top:444.5,
                                                scaleY: 0.860,
                                                scaleX: 0.926,
                                                angle: 0,
                                                

                                            });
                                                svg_canvas_inlay.add(shape);
                                                shape.sendToBack(); 
                                                svg_canvas_inlay.renderAll(); 
                                     });

                        var inlay_card_svg_3 = canvas3.toSVG();
                       //console.log(inlay_card_svg_3);

                       var getDATA1 = fabric.loadSVGFromString(fixSVGText(inlay_card_svg_3), function (objects, options) { 
                                    
                              var shape = fabric.util.groupSVGElements(objects, options);
                                             shape.set({
                                                left: 15,
                                                top:575.4,
                                                scaleY: 0.980,
                                                scaleX: 0.926,
                                                angle: 0,

                                            });
                                                svg_canvas_inlay.add(shape);
                                                shape.sendToBack(); 
                                                svg_canvas_inlay.renderAll(); 

                    });


                        var inlay_card_svg_4 = canvas4.toSVG();
                       //console.log(inlay_card_svg_4);

                       var getDATA1 = fabric.loadSVGFromString(fixSVGText(inlay_card_svg_4), function (objects, options) { 
                             var shape = fabric.util.groupSVGElements(objects, options);
                                                        
                                       shape.set({
                                                left: 15,
                                                top: 745.4,
                                                scaleY: 0.860,
                                                scaleX: 0.926,
                                                angle: 0,

                                            });
                                                    svg_canvas_inlay.add(shape);
                                                    shape.sendToBack(); 
                                                    svg_canvas_inlay.renderAll(); 

                                        });
                                        var line1 = new fabric.Line([
                                              23, 0,
                                              23, 14
                                            ],{ 
                                              stroke: '#000', 
                                            })

                                           var line12 = new fabric.Line([
                                              0, 23,
                                              14, 23
                                            ],{ 
                                              stroke: '#000', 
                                            })

                                           var line2 = new fabric.Line([
                                          svg_canvas.width-23, 0,
                                          svg_canvas.width-23, 14
                                        ],{ 
                                          stroke: '#000', 
                                        })
                                       
                                        var line22 = new fabric.Line([
                                          svg_canvas.width-14, 23,
                                          svg_canvas.width-0, 23
                                        ],{ 
                                          stroke: '#000', 
                                        })
                                          var line3 = new fabric.Line([
                                              0, svg_canvas.height - 23,
                                              14, svg_canvas.height - 23
                                            ],{ 
                                              stroke: '#000', 
                                            });
                                            var line32 = new fabric.Line([
                                              23, svg_canvas.height- 14,
                                              23, svg_canvas.height-0
                                            ],{ 
                                              stroke: '#000', 
                                            });

                                            var line4 = new fabric.Line([
                                              svg_canvas.width-23, svg_canvas.height- 14,
                                              svg_canvas.width-23, svg_canvas.height-0
                                            ],{ 
                                              stroke: '#000', 
                                            });

                                             var line42 = new fabric.Line([
                                              svg_canvas.width-14, svg_canvas.height - 23,
                                              svg_canvas.width-0, svg_canvas.height - 23
                                            ],{ 
                                              stroke: '#000', 
                                            });

                       

                                            var group = new fabric.Group([
                                              line1,
                                              line12,
                                              line2,
                                              line22,
                                              line3,
                                              line32,
                                              line4,
                                              line42,
                                            ]);
                                            group.selectable = false;
                                            group.evented = false;

                                            svg_canvas_inlay.add(group);
                                            group.sendToBack();



                          setTimeout(function(){
                        
                        var full_card_svg = svg_canvas.toSVG();
                        var full_card_svg_inlay = svg_canvas_inlay.toSVG();


                       }, 5000);


                    }, 2000); 
                       //set_json(result);
                       // here is product default json... 
                                    
                  },
                  error: function(result) {
                      alert('error');
                      //alert(result);
                  }
                }); 
              }
            }

</script>

<?php }else{ ?>
<div id="preview-modal2" class="modal fade preview_card_detail" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <button type="button" class="close" data-dismiss="modal" style="z-index: 1;" aria-label="Close"><span aria-hidden="true">×</span></button>
<div class="main_container" >
        <div class="preview_page">
                <div class="clearfix">
                    <!-- <div class="col-sm-12">
                        <div class="tool-title text-center"><h2>Your Card Preview</h2></div>
                    </div> -->
                    <div class="pre_full_bg col-sm-12">
                    <div class="column outlay">
                        <div class="canvas-board">
                            <div class="canvas_duumy_image" style="display:none;">
                                <canvas id="canvas" width="500" height="661"  class="getCanvas" ></canvas>
                            </div>
                            <div class="canvas_duumy_image">
                                <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/preview.png" id="canvas" width="400" height="621" class="getCanvas" >                          
                            </div>
                            <div class="canvas_duumy_image_back" style="display:none;">
                                <canvas id="canvas_back" width="500" height="661"  class="getCanvas_back" ></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="canvas-board cart_left_page">
                            <div class="canvas-content">
                                <div class="content-area content-area-lg" style="display:none;">
                                    <!-- <textarea placeholder=""></textarea> -->
                                    <canvas id="canvas1"  width="500" height="661" class="getCanvas1" ></canvas>
                                </div>
                                <div class="canvas_duumy_image">
                                  <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/preview.png" id="canvas1"  width="400" height="561" class="getCanvas1" >      
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column" id="outlay_last">
                        <div class="canvas-board cart_right_page">
                            <div class="canvas-content">
                                <div class="content-area content-area-sm" style="display:none;" >
                                    <!-- <textarea placeholder=""></textarea> -->
                                    <canvas id="canvas2" width="500" height="175" class="getCanvas2" placeholder="Click Here To Select This Area"></canvas>
                                </div>
                                <div class="content-area content-area-md" style="display:none;" >
                                    <!-- <textarea placeholder=""></textarea> -->
                                    <canvas id="canvas3" width="500" height="275" class="getCanvas3" placeholder="Click Here To Select This Area"></canvas>
                                </div>
                                <div class="content-area content-area-sm" style="display:none;" >
                                    <!-- <textarea placeholder=""></textarea> -->
                                    <canvas id="canvas4" width="500" height="175" class="getCanvas4" placeholder="Click Here To Select This Area"></canvas>
                                </div>
                                <div class="content-area content-area-sm" >
                                    
                                    <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/preview.png" id="canvas2" width="400" height="153" class="getCanvas2" ></img>
                                </div>
                                 <div class="content-area content-area-md">
                                    
                                    <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/preview.png" id="canvas3" width="400" height="255" class="getCanvas3" ></img>
                                </div>
                                 <div class="content-area content-area-sm">
                                    
                                    <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/preview.png" id="canvas4" width="400" height="153" class="getCanvas4" ></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8 svg_canvas">
                        <div class="canvas-board" style="display:none;">
                            <div class="canvas-content">
                                    <!-- <textarea placeholder=""></textarea> -->
                                    <canvas id="svg_canvas"  width="642" height="889" class="svg_canvas_1" ></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8 svg_canvas">
                        <div class="canvas-board" style="display:none;">
                            <div class="canvas-content">
                                    <!-- <textarea placeholder=""></textarea> -->
                                    <canvas id="svg_canvas_inlay"  width="642" height="889" class="svg_canvas_1" ></canvas>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
        </div> 
    </div>
  </div>
</div>
</div>
<script >
var shape1, shape2, shape3, shape4, group;
    
//  jQuery("html, body").animate({ scrollTop: jQuery("#toolbox").offset().top }, "slow");
//    
//jQuery("#toolbox .blue-round-btns a").addClass('round-btns-disabled');
    
 var canvas = new fabric.Canvas('canvas',{
      preserveObjectStacking: true
 });

 var canvas_back = new fabric.Canvas('canvas_back',{
      preserveObjectStacking: true
 });


//alert(jQuery("#canvas1").length);
  canvas1 = new fabric.Canvas("canvas1",{
      preserveObjectStacking: true,
 });
 
 canvas2 = new fabric.Canvas("canvas2",{
      preserveObjectStacking: true,
 });
 
 canvas3 = new fabric.Canvas("canvas3",{
      preserveObjectStacking: true,
 });

 canvas4 = new fabric.Canvas("canvas4",{
      preserveObjectStacking: true,
 });

svg_canvas = new fabric.Canvas("svg_canvas",{
      preserveObjectStacking: true,
 });
svg_canvas_inlay = new fabric.Canvas("svg_canvas_inlay",{
      preserveObjectStacking: true,
 });
 

function set_json(data,canvas,count){

      var json = data;
      var getDATA;
      var setdata = getDATA+""+count;

    var setdata =canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function(o, object) {
        
        fabric.log(o, object);
        
        
        });

}

function set_barcode(result,canvas,count){

    var getDATA;
        var setdata = getDATA+""+count;

      fabric.Image.fromURL(result, function(img) {
       //var rFilter = new fabric.Image.filters.Resize({
      //  resizeType: 'sliceHack'
      //});
     // img.resizeFilters.push(rFilter);
      //img.applyFilters(canvas.renderAll.bind(canvas));
        img.scale(0.5).set({
                top: 585,
                left:425,
                //height:100,
                //width:100,
              });
       //canvas.imageSmoothingEnabled = true;
        //canvas.imageSmoothingQuality = "high"
        canvas.add(img).setActiveObject(img);
     
     });

}

function fixSVGText(str) {
  // parse our string as a DOM object and get the SVGElement
  var svg = new DOMParser().parseFromString(str, "image/svg+xml").documentElement;

  // get all <tspan> elements
  var tspans = svg.querySelectorAll('tspan');
  for (var i = 0; i < tspans.length; i++) {
    var ts = tspans[i],
      parent = ts.parentNode,
      gParent = parent.parentNode;
    var j = 0;

    // create a new SVGTextElement to replace our tspan
    var replace = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    var tsAttr = ts.attributes;
    // set the 'x', 'y' and 'fill' attributes to our new element
    for (j = 0; j < tsAttr.length; j++) {
      replace.setAttributeNS(null, tsAttr[j].name, tsAttr[j].value);
    }

    // append the contentText
    var childNodes = ts.childNodes;
    for (j = 0; j < childNodes.length; j++) {
      replace.appendChild(ts.childNodes[j]);
    }

    var tAttr = parent.attributes;
    // set the original text attributes to our new one
    for (j = 0; j < tAttr.length; j++) {
      replace.setAttributeNS(null, tAttr[j].name, tAttr[j].value);
    }
    // append our new text to the grand-parent
    gParent.appendChild(replace);

    // if this is the last tspan
    if (ts === parent.lastElementChild)
    // remove the old, now empty, SVGTextElement
      gParent.removeChild(parent)
  }
  // return a string version of our cleaned svg
  return new XMLSerializer().serializeToString(svg);
}


 function portrait(count_url) {
     
jQuery(".preview_page .column .canvas-board").append("<span id='loading' style='text-align:center;color: #ccc;position: absolute;top: 50%;left: 100px;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' />loading...</span>");
jQuery("a.btn-blue-prv").before("<div id='loading' style='text-align:center;color: #ccc;position: absolute;top: 50%;left: 100px;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' />Loading...</div>");
     
     
   var item_id = jQuery("#item_id"+count_url).val();
              if (item_id != null && item_id != "undefined") {
            
              var xhr = jQuery.ajax({
                  type: "POST",
                  url: "/canvassave",
                  data: { 
                      'item_id': item_id, 
                      'section': 'order_detail',
       
                    },
                  data_type:'json',
                  success: function(result) {
                      
                       //alert(result);
                       //console.log(result);
                       //return false;
                       var myobj = jQuery.parseJSON(result);
                       //console.log(myobj.outlay_card_json);
                       //console.log(myobj.inlay_card_json_1);
                       //console.log(myobj.inlay_card_json_2);
                       //console.log(myobj.inlay_card_json_3);
                       //console.log(myobj.inlay_card_json_4);
                       //console.log(myobj.outlay_card_back_json);
                       console.log(myobj.barcode_data);
                       //console.log('Hello');
                       

                        set_json(myobj.outlay_card_json,canvas,'');
                        set_json(myobj.outlay_card_back_json,canvas_back,'');
                        set_barcode(myobj.barcode_data,canvas_back,'');
                        set_json(myobj.inlay_card_json_1,canvas1,1);
                        set_json(myobj.inlay_card_json_2,canvas2,2);
                        set_json(myobj.inlay_card_json_3,canvas3,3);
                        set_json(myobj.inlay_card_json_4,canvas4,4);



                       
                        var thumbImage;
                        setTimeout(
                    function() 
                    {
                       thumbImage = canvas.toDataURL('png');
                       //window.open(canvas.toDataURL('png'));
                        jQuery('.getCanvas').attr('src', thumbImage);
                        jQuery(".preview_page .column:nth-child(1) #loading").remove();


                        thumbImage1 = canvas1.toDataURL('png');
                       //window.open(canvas1.toDataURL('png'));
                        jQuery('.getCanvas1').attr('src', thumbImage1);
                        jQuery(".preview_page .column:nth-child(2) #loading").remove();


                        thumbImage2 = canvas2.toDataURL('png');
                       //window.open(canvas1.toDataURL('png'));
                        jQuery('.getCanvas2').attr('src', thumbImage2);
                        thumbImage3 = canvas3.toDataURL('png');
                       //window.open(canvas1.toDataURL('png'));
                        jQuery('.getCanvas3').attr('src', thumbImage3);
                        thumbImage4 = canvas4.toDataURL('png');
                       //window.open(canvas1.toDataURL('png'));
                        jQuery('.getCanvas4').attr('src', thumbImage4);
                        jQuery(".preview_page .column:nth-child(3) #loading").remove();


      //svg dat of canvas

                         var outlay_card_svg = canvas.toSVG();
                       //console.log(outlay_card_svg);
                       //console.log('-------------------------------------');
                      // var serializer = new XMLSerializer();
                     // var svgStr = serializer.serializeToString(outlay_card_svg);
                            var getDATA1 = fabric.loadSVGFromString(fixSVGText(outlay_card_svg), function (objects, options) { 
                                    
                            var shape = fabric.util.groupSVGElements(objects, options);
                                        shape.set({
                                                left:14,
                                                top:444.5,
                                                scaleY: 0.926,
                                                scaleX: 0.860,
                                                angle: 270,
                                                
                                            });
                                                svg_canvas.add(shape);
                                                shape.bringForward();
                                                svg_canvas.renderAll(); 

                                });

                       var outlay_card_back_svg = canvas_back.toSVG();;


                  var getDATA1 = fabric.loadSVGFromString(fixSVGText(outlay_card_back_svg), function (objects, options) { 
                                    
                             var shape = fabric.util.groupSVGElements(objects, options);
                                            shape.set({
                                                left:14,
                                                top:875,
                                                scaleY: 0.926,
                                                scaleX: 0.860,
                                                angle: 270,
                                                
                                            });
                                                svg_canvas.add(shape);
                                                shape.bringToFront();
                                                svg_canvas.renderAll(); 

                                });
                                  
                                   var line1 = new fabric.Line([
                                              23, 0,
                                              23, 14
                                            ],{ 
                                              stroke: '#000', 
                                            })

                                           var line12 = new fabric.Line([
                                              0, 23,
                                              14, 23
                                            ],{ 
                                              stroke: '#000', 
                                            })

                                           var line2 = new fabric.Line([
                                          svg_canvas.width-23, 0,
                                          svg_canvas.width-23, 14
                                        ],{ 
                                          stroke: '#000', 
                                        })
                                       
                                        var line22 = new fabric.Line([
                                          svg_canvas.width-14, 23,
                                          svg_canvas.width-0, 23
                                        ],{ 
                                          stroke: '#000', 
                                        })
                                          var line3 = new fabric.Line([
                                              0, svg_canvas.height - 23,
                                              14, svg_canvas.height - 23
                                            ],{ 
                                              stroke: '#000', 
                                            });
                                            var line32 = new fabric.Line([
                                              23, svg_canvas.height- 14,
                                              23, svg_canvas.height-0
                                            ],{ 
                                              stroke: '#000', 
                                            });

                                            var line4 = new fabric.Line([
                                              svg_canvas.width-23, svg_canvas.height- 14,
                                              svg_canvas.width-23, svg_canvas.height-0
                                            ],{ 
                                              stroke: '#000', 
                                            });

                                             var line42 = new fabric.Line([
                                              svg_canvas.width-14, svg_canvas.height - 23,
                                              svg_canvas.width-0, svg_canvas.height - 23
                                            ],{ 
                                              stroke: '#000', 
                                            });

                                  
                                            var group = new fabric.Group([
                                              line1,
                                              line12,
                                              line2,
                                              line22,
                                              line3,
                                              line32,
                                              line4,
                                              line42,
                                            ]);
                                            group.selectable = false;
                                            group.evented = false;

                                            svg_canvas.add(group);
                                            group.sendToBack();



                       var inlay_card_svg_1 = canvas1.toSVG();
                       //console.log(inlay_card_svg_1);

                         var getDATA1 = fabric.loadSVGFromString(fixSVGText(inlay_card_svg_1), function (objects, options) { 
                                    
                              var shape = fabric.util.groupSVGElements(objects, options);
                                            shape.set({
                                                left:628,
                                                top:15,
                                                scaleY: 0.926,
                                                scaleX: 0.860,
                                                angle: 90,

                                            });
                                                svg_canvas_inlay.add(shape);
                                                shape.sendToBack(); 
                                                svg_canvas_inlay.renderAll(); 

                                });

                        var inlay_card_svg_2 = canvas2.toSVG();
                       //console.log(inlay_card_svg_2);

                        var getDATA1 = fabric.loadSVGFromString(fixSVGText(inlay_card_svg_2), function (objects, options) { 
                                    
                              var shape = fabric.util.groupSVGElements(objects, options);
                                            shape.set({
                                                left: 627,
                                                top:444.5,
                                                scaleY: 0.945,
                                                scaleX: 0.856,
                                                angle: 90
                                                

                                            });
                                                svg_canvas_inlay.add(shape);
                                                shape.sendToBack(); 
                                                svg_canvas_inlay.renderAll(); 
                                     });

                        var inlay_card_svg_3 = canvas3.toSVG();
                       //console.log(inlay_card_svg_3);

                       var getDATA1 = fabric.loadSVGFromString(fixSVGText(inlay_card_svg_3), function (objects, options) { 
                                    
                              var shape = fabric.util.groupSVGElements(objects, options);
                                             shape.set({
                                                left: 455,
                                                top:444.5,
                                                scaleY: 0.975,
                                                scaleX: 0.856,
                                                angle: 90
                                                //scaleY: 1.10,
                                                //scaleX: 1.10,

                                            });
                                                svg_canvas_inlay.add(shape);
                                                shape.sendToBack(); 
                                                svg_canvas_inlay.renderAll(); 

                    });


                        var inlay_card_svg_4 = canvas4.toSVG();
                       //console.log(inlay_card_svg_4);

                       var getDATA1 = fabric.loadSVGFromString(fixSVGText(inlay_card_svg_4), function (objects, options) { 
                             var shape = fabric.util.groupSVGElements(objects, options);
                                                        
                                       shape.set({
                                                left: 182,
                                                top:444.5,
                                                scaleY: 0.945,
                                                scaleX: 0.856,
                                                angle: 90
                                                //scaleY: 1.10,
                                                //scaleX: 1.10,

                                            });
                                                    svg_canvas_inlay.add(shape);
                                                    shape.sendToBack(); 
                                                    svg_canvas_inlay.renderAll(); 

                                        });

                                        var line1 = new fabric.Line([
                                              23, 0,
                                              23, 14
                                            ],{ 
                                              stroke: '#000', 
                                            })

                                           var line12 = new fabric.Line([
                                              0, 23,
                                              14, 23
                                            ],{ 
                                              stroke: '#000', 
                                            })

                                           var line2 = new fabric.Line([
                                          svg_canvas.width-23, 0,
                                          svg_canvas.width-23, 14
                                        ],{ 
                                          stroke: '#000', 
                                        })
                                       
                                        var line22 = new fabric.Line([
                                          svg_canvas.width-14, 23,
                                          svg_canvas.width-0, 23
                                        ],{ 
                                          stroke: '#000', 
                                        })
                                          var line3 = new fabric.Line([
                                              0, svg_canvas.height - 23,
                                              14, svg_canvas.height - 23
                                            ],{ 
                                              stroke: '#000', 
                                            });
                                            var line32 = new fabric.Line([
                                              23, svg_canvas.height- 14,
                                              23, svg_canvas.height-0
                                            ],{ 
                                              stroke: '#000', 
                                            });

                                            var line4 = new fabric.Line([
                                              svg_canvas.width-23, svg_canvas.height- 14,
                                              svg_canvas.width-23, svg_canvas.height-0
                                            ],{ 
                                              stroke: '#000', 
                                            });

                                             var line42 = new fabric.Line([
                                              svg_canvas.width-14, svg_canvas.height - 23,
                                              svg_canvas.width-0, svg_canvas.height - 23
                                            ],{ 
                                              stroke: '#000', 
                                            });
                                    /****another blled line*****/

                                         var line5 = new fabric.Line([
                                           19, 0,
                                           19, 15
                                         ],{ 
                                           stroke: '#000', 
                                         })
                                          var line52 = new fabric.Line([
                                           0, 19,
                                           15, 19
                                         ],{ 
                                           stroke: '#000', 
                                         })

                                            var line6 = new fabric.Line([
                                              svg_canvas.width-19, 0,
                                              svg_canvas.width-19, 15
                                            ],{ 
                                              stroke: '#000', 
                                            })
                                           
                                            var line62 = new fabric.Line([
                                              svg_canvas.width-15, 19,
                                              svg_canvas.width, 19
                                            ],{ 
                                              stroke: '#000', 
                                            })

                                             var line7 = new fabric.Line([
                                              0, svg_canvas.height - 19,
                                              15, svg_canvas.height - 19
                                            ],{ 
                                              stroke: '#000', 
                                            });
                                            var line72 = new fabric.Line([
                                              19, svg_canvas.height- 15,
                                              19, svg_canvas.height
                                            ],{ 
                                              stroke: '#000', 
                                            });

                                             var line8 = new fabric.Line([
                                              svg_canvas.width-19, svg_canvas.height- 15,
                                              svg_canvas.width-19, svg_canvas.height
                                            ],{ 
                                              stroke: '#000', 
                                            });

                                             var line82 = new fabric.Line([
                                              svg_canvas.width-15, svg_canvas.height - 19,
                                              svg_canvas.width, svg_canvas.height - 19
                                            ],{ 
                                              stroke: '#000', 
                                            });

                                            var group = new fabric.Group([
                                              line1,
                                              line12,
                                              line2,
                                              line22,
                                              line3,
                                              line32,
                                              line4,
                                              line42,
                                              // line5,
                                              // line52,
                                              // line6,
                                              // line62,
                                              // line7,
                                              // line72,
                                              // line8,
                                              // line82
                                            ]);
                                            group.selectable = false;
                                            group.evented = false;

                                            svg_canvas_inlay.add(group);
                                            group.sendToBack();




                       setTimeout(function(){
                        
                        var full_card_svg = svg_canvas.toSVG();
                        var full_card_svg_inlay = svg_canvas_inlay.toSVG();

                       }, 5000);

                      
                      }, 2000);


          
                       
                       //set_json(result);
                       // here is product default json... 
                       
                                    
                  },
                  error: function(result) {
                      alert('error');
                      //alert(result);
                  }
              }); 

            }
          }

</script>
<style>
    /*#loading {
    color: #ccc;
    position: absolute;
    top: 50%;
    left: 100px;
}*/
</style>
<?php }?>
           <input type="hidden" id="item_id<?php echo $count_url; ?>" value="<?php echo $row['line_item_id']; ?>"> 
            <td <?php if ($field_classes[$field][$row_count]) { print 'class="'. $field_classes[$field][$row_count] . '" '; } ?><?php print drupal_attributes($field_attributes[$field][$row_count]); ?>>
            <a href="javascript:void(0)" onclick="<?php echo $card_orientation; ?>(<?php echo $count_url; ?>)" data-target="#preview-modal<?php echo $target_pop;?>" data-toggle="modal" class="preview_click"><i class="fa fa-eye" aria-hidden="true"></i> Preview</a>
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
    <?php $count_url++; endforeach; ?>
  </tbody>
</table>
<script>
    (function($){
      $(".preview_card_detail").on('hide.bs.modal', function (e) {
                thumbImage = "<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/preview.png";
                jQuery('.getCanvas').attr('src', thumbImage);
                jQuery('.getCanvas1').attr('src', thumbImage);
                jQuery('.getCanvas2').attr('src', thumbImage);
                jQuery('.getCanvas3').attr('src', thumbImage);
                jQuery('.getCanvas4').attr('src', thumbImage);
                jQuery('.getCanvas5').attr('src', thumbImage);
                jQuery('.getCanvas6').attr('src', thumbImage);
                jQuery('.getCanvas7').attr('src', thumbImage);
                jQuery('.getCanvas8').attr('src', thumbImage);
                jQuery('.getCanvas9').attr('src', thumbImage);
                jQuery(".preview_page .column:nth-child(1) #loading").remove();
                jQuery(".preview_page .column:nth-child(2) #loading").remove();
                jQuery(".preview_page .column:nth-child(3) #loading").remove();
              });
    }) (jQuery);
    </script>
