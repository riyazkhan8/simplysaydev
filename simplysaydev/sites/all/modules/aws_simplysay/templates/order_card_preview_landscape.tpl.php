<?php
global $base_path;
?>
<div id="preview-modal" class="modal fade preview_card_detail" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>


                    <!-- <div class="col-sm-12">
                        <div class="tool-title text-center"><h2>Your Card Preview</h2></div>
                    </div> -->
                    <div class="pre_full_bg clearfix">
                    <div class="column outlay" style="display:none;">
                        <div class="">
                            <div class="canvas_duumy_image" >
                                <canvas id="canvas" width="661" height="500"  class="getCanvas" ></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="card_preview_outlay">
                            <div class="canvas_duumy_image">
                                <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/preview.png" id="canvas" width="661" height="500" class="getCanvas" >                          
                            </div>
                    </div>
                    <div class="column" style="display:none;">
                        <div class="canvas-board cart_left_page">
                            <div class="canvas-content">
                                <div class="content-area content-area-lg" >
                                    <!-- <textarea placeholder=""></textarea> -->
                                    <canvas id="canvas1"  width="661" height="500" class="getCanvas1" ></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card_preview_inlay">
                          <div class="canvas_duumy_image">
                              <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/preview.png" id="canvas1"  width="561" height="500" class="getCanvas1" >      
                               
                          </div>
                    </div>
                    <div class="column" style="display:none;">
                        <div class="canvas-board cart_right_page">
                            <div class="canvas-content">
                                <div class="content-area content-area-sm" style="display:none;" >
                                    <!-- <textarea placeholder=""></textarea> -->
                                    <canvas id="canvas2" width="661" height="150" class="getCanvas2" placeholder="Click Here To Select This Area"></canvas>
                                </div>
                                <div class="content-area content-area-md" style="display:none;" >
                                    <!-- <textarea placeholder=""></textarea> -->
                                    <canvas id="canvas3" width="661" height="175" class="getCanvas3" placeholder="Click Here To Select This Area"></canvas>
                                </div>
                                <div class="content-area content-area-sm" style="display:none;" >
                                    <!-- <textarea placeholder=""></textarea> -->
                                    <canvas id="canvas4" width="661" height="150" class="getCanvas4" placeholder="Click Here To Select This Area"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card_preview_inlay_right">
                            <div class="canvas-content">
                                <div class="content-area content-area-sm" >                                    
                                    <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/preview.png" id="canvas2" width="400" height="100" class="getCanvas2" >
                                </div>
                                 <div class="content-area content-area-md">                                    
                                    <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/preview.png" id="canvas3" width="400" height="100" class="getCanvas3" >
                                </div>
                                 <div class="content-area content-area-sm">                                    
                                    <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/preview.png" id="canvas4" width="400" height="100" class="getCanvas4" >
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


 

function set_json(data,canvas,count){

      var json = data;
      var getDATA;
      var setdata = getDATA+""+count;

    var setdata =canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function(o, object) {
        
        fabric.log(o, object);
        
        
        });

}
jQuery(document).ready(function(){


 jQuery('.page-user-orders-items .preview_click').hide();
 jQuery(".detail_boximg").append("<div id='loading' style='text-align:center;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' />Preview Loading...</div>");

 var item_id = jQuery("#item_id").val();
    //var pid = jQuery("#product_id").val();
   // var cid = jQuery("#cid").val();
        //alert(item_id);
        //return false;
        //alert('hii');

            if (item_id != null && item_id != "undefined") {
            
              jQuery.ajax({
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
                       var myobj = jQuery.parseJSON(result);
                       //console.log(myobj.outlay_card_json);
                       //console.log(myobj.inlay_card_json_1);
                       //console.log(myobj.inlay_card_json_2);
                       //console.log(myobj.inlay_card_json_3);
                       //console.log(myobj.inlay_card_json_4);
                       //console.log(myobj.outlay_card_back_json);
                       //console.log('Hello');
                       
                       if (myobj.outlay_card_json) {


                        

                       set_json(myobj.outlay_card_json,canvas,'');
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

                        thumbImage1 = canvas1.toDataURL('png');
                       //window.open(canvas1.toDataURL('png'));
                        jQuery('.getCanvas1').attr('src', thumbImage1);

                        thumbImage2 = canvas2.toDataURL('png');
                       //window.open(canvas1.toDataURL('png'));
                        jQuery('.getCanvas2').attr('src', thumbImage2);
                        thumbImage3 = canvas3.toDataURL('png');
                       //window.open(canvas1.toDataURL('png'));
                        jQuery('.getCanvas3').attr('src', thumbImage3);
                        thumbImage4 = canvas4.toDataURL('png');
                       //window.open(canvas1.toDataURL('png'));
                        jQuery('.getCanvas4').attr('src', thumbImage4);

                          jQuery('.preview_click').click(function(){

                              jQuery('.page-user-orders-items .card_preview').show();


                          });
                          jQuery('.page-user-orders-items #loading').remove();

                           jQuery('.page-user-orders-items .preview_click').show();

                          //jQuery('.pre_full_bg .custom_close').click(function(){

                            //jQuery('.page-user-orders-items .card_preview').hide();


                         // });


                                                
                        }, 500);


                       }else{
                        jQuery('.preview_click').addClass('preview_not_click');
                        jQuery('.preview_click').removeClass('preview_click');

                          jQuery('.preview_not_click').click(function(){

                             alert('Preview Not available.');


                          });

                        
                       }
                    
                       
                       //set_json(result);
                       // here is product default json... 
                       
                                    
                  },
                  error: function(result) {
                      alert('error');
                      //alert(result);
                  }
              }); 

            }
          }); 

</script>
