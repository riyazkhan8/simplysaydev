
<?php
global $base_path;
global $user;



if (!empty($nid)) {
    $tid='';
    $node = node_load($nid);
    $product =  commerce_product_load($node->field_product_refer['und'][0]['product_id']);
    $tid = $product->field_card_type['und'][0]['tid'];
}

?>

<div class="main_container">
        <div class="tool_1">
            <div class="container">
                <div class="row">
                    <!-- <div class="col-sm-12">
                        <div class="tool-title text-center"><h2>Design And Customise Your Own Card</h2></div>
                    </div> -->
                    <div class=" col-sm-8 gap-right">
                        <div class="canvas_left_space outlay_can_board" style="background-color:-moz-buttonhovertext">

                            <div class="canvas_container canvas-board" id="canvas_div">
                             <canvas id="canvas5" width="661" height="2000"></canvas>
                            </div>

                        </div>
                        <button title="Clear All" onclick="makeallImage()" id="svgcanvas" href="javascript:void(0)" class="clip_open_icon">save svg data</button>  
                    </div>                  
                </div>
            </div>
        </div> 
    </div>
<input type="hidden" id ="section" value="outlay" />

<!-- <script src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/js/custom/myscript.js"></script> -->

<script>
 var canvasnew = new fabric.Canvas('canvas5',{
      preserveObjectStacking: true
 });
 

function makeallImage(){
  var newdata =canvasnew.toSVG();
  console.log(newdata);
  return false;
    console.log('json length'+jsonNew.length);
  for (var v = 0; v < jsonNew.length; v++){
    convertImgToBase64(v, "jpg");
        console.log("ksana"+v);
  }
  
}


jQuery( document ).ready(function() {
 




 jQuery.ajax({
              type: "POST",
              url: "/get_fullcanvas_json_set",
              dataType: "json",
              // data: { 
              //     'pid':pid,
   
              //   },
              success: function(result) {

                  // console.log(result);
                  //var test = jQuery.parseJSON(result);
                  console.log(result.cid);
                   // return false;
                  var outlay_card_json = result.outlay_card_json;
                  var outlay_card_json_back = result.outlay_card_json_back;
                  var inlay_card_json_1 = result.inlay_card_json_1;
                  var inlay_card_json_2 = result.inlay_card_json_2;
                  var inlay_card_json_3 = result.inlay_card_json_3;
                  var inlay_card_json_4 = result.inlay_card_json_4;

                    // console.log(myobj.cid);
                     console.log(outlay_card_json);

                     var dataimage = btoa(outlay_card_json);

                    // console.log(outlay_card_json_back);
                    // console.log(inlay_card_json_1);
                    // console.log(inlay_card_json_2);
                    // console.log(inlay_card_json_3);
                    // console.log(inlay_card_json_4);


                    // jsonNew = [];
                    // jsonNew.push(JSON.parse(inlay_card_json_1));
                    // jsonNew.push(JSON.parse(inlay_card_json_2));
                    // jsonNew.push(JSON.parse(inlay_card_json_3));
                    // jsonNew.push(JSON.parse(inlay_card_json_4));

                    // var group = new fabric.Group(JSON.parse(outlay_card_json),JSON.parse(outlay_card_json_back),JSON.parse(inlay_card_json_1),JSON.parse(inlay_card_json_2),JSON.parse(inlay_card_json_3),JSON.parse(inlay_card_json_4));

                    // canvasnew.add(group);
                  var getDATA1 = fabric.loadSVGFromString(outlay_card_json, function (objects, options) { 
                                    
                              var shape = fabric.util.groupSVGElements(objects, options);
                                            shape.set({
                                                left:661,
                                                top:0,
                                                height: 661,
                                                width: 500,
                                                //scaleY: 1.10,
                                                //scaleX: 1.10,
                                                angle: 90,
                                                
                                            });
                                                canvasnew.add(shape); 
                                                canvasnew.renderAll(); 

                                });

                    // canvasnew.add(group);
                  var getDATA1 = fabric.loadSVGFromString(outlay_card_json_back, function (objects, options) { 
                                    
                              var shape = fabric.util.groupSVGElements(objects, options);
                                            shape.set({
                                                left:661,
                                                top:500,
                                                height: 661,
                                                width: 500,
                                                //scaleY: 1.10,
                                                //scaleX: 1.10,
                                                angle: 90,
                                                
                                            });
                                                canvasnew.add(shape); 
                                                canvasnew.renderAll(); 

                                });

                  var getDATA1 = fabric.loadSVGFromString(inlay_card_json_1, function (objects, options) { 
                                    
                              var shape = fabric.util.groupSVGElements(objects, options);
                                            shape.set({
                                                left: 661,
                                                top:1000,
                                                height: 661,
                                                width: 500,
                                                angle: 90,
                                                //scaleY: 1,
                                                //scaleX: 1,

                                            });
                                                canvasnew.add(shape); 
                                                canvasnew.renderAll(); 

                                });
                  var getDATA1 = fabric.loadSVGFromString(inlay_card_json_2, function (objects, options) { 
                                    
                              var shape = fabric.util.groupSVGElements(objects, options);
                                            shape.set({
                                                left: 661,
                                                top:1500,
                                                height: 175,
                                                width: 500,
                                                angle: 90
                                                //scaleY: 1.10,
                                                //scaleX: 1.10,

                                            });
                                                canvasnew.add(shape); 
                                                canvasnew.renderAll(); 

                    });
                  var getDATA1 = fabric.loadSVGFromString(inlay_card_json_3, function (objects, options) { 
                                    
                              var shape = fabric.util.groupSVGElements(objects, options);
                                             shape.set({
                                                left: 463,
                                                top:1500,
                                                height: 275,
                                                width: 500,
                                                angle: 90
                                                //scaleY: 1.10,
                                                //scaleX: 1.10,

                                            });
                                                canvasnew.add(shape); 
                                                canvasnew.renderAll(); 

                    });
                    var getDATA1 = fabric.loadSVGFromString(inlay_card_json_4, function (objects, options) { 
                             var shape = fabric.util.groupSVGElements(objects, options);
                                                        
                                       shape.set({
                                                left: 180,
                                                top:1500,
                                                height: 175,
                                                width: 500,
                                                angle: 90
                                                //scaleY: 1.10,
                                                //scaleX: 1.10,

                                            });
                                                    canvasnew.add(shape); 
                                                    canvasnew.renderAll(); 

                                        });

                  // var getDATA1 = canvasnew.loadFromJSON(JSON.parse(inlay_card_json_1), canvasnew.renderAll.bind(canvasnew), function(o, object) {
                  //       // fabric.log(o, object);
                  //   });
                  //   var getDATA1 = canvasnew.loadFromJSON(JSON.parse(inlay_card_json_2), canvasnew.renderAll.bind(canvasnew), function(o, object) {
                  //       // fabric.log(o, object);
                  //   });
                  //   var getDATA1 = canvasnew.loadFromJSON(JSON.parse(inlay_card_json_3), canvasnew.renderAll.bind(canvasnew), function(o, object) {
                  //       // fabric.log(o, object);
                  //   });
                  //   var getDATA1 = canvasnew.loadFromJSON(JSON.parse(inlay_card_json_4), canvasnew.renderAll.bind(canvasnew), function(o, object) {
                  //       // fabric.log(o, object);
                  //   });

                  
                                
              },
              error: function(result) {
                  alert('error');
                  //alert(result);
              }
          });



}); 

</script>