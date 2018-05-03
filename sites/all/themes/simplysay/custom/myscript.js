fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.padding = 1;

var canvas = new fabric.Canvas('canvas',{
     preserveObjectStacking: true
});

var grid = 41.8;
//var grid_landscape = 45;

canvas.backgroundColor = '#FFFFFF';
canvas.counter = 0;
var newleft = 0;
canvas.selection = true;

var state = [];
var mods = 0;
 
 var CanvasBackgrnd = function() {
   this.canvas.background = ''
};

var selectedObject;
   canvas.on('object:selected', function(event) {
   selectedObject = event.target;
});

  
  function addTextCanvas(){

    var default_font = jQuery( "#FontStyleNumber" ).val();

    //console.log(default_font);


var canvas_type_text = jQuery('#product_canvas_type').val();

    if (canvas_type_text == 'landscape') {
      var canvas_width = 621;
    }else{
       var canvas_width = 460;
    }


              var text = new fabric.Textbox('Enter your text here...',{ 
                        fontFamily: default_font,
                        fontSize: 22,
                        class: 'mytext',
                        width:canvas_width,
                        left: 20, 
                        top:  Math.floor(Math.random()*250+1),
                        stroke: '#fff',
                        strokeWidth:0.5,
                        fixedWidth: 460,
                        textAlign: 'left'
                      });

              canvas.add(text).setActiveObject(text);
              updateModifications(true);
              canvas.counter++;
              newleft += 100;

            jQuery('.btn-stroke').css('background-color', '#b4e97a');

         }
function iterate(pdf) {
//var data = false;
 // init parsing of first page
   getPage();

   //getPagesvg();

    // main entry point/function for loop
    function getPage() {
    	currentPage = 1;
        // when promise is returned do as usual
        pdf.getPage(currentPage).then(function(page) {
        	console.log(page);
            var scale = 5;
            var viewport = page.getViewport(scale);
            var canvast = document.getElementById('the-canvas');
            canvast.style.backgroundColor = 'rgba(158, 167, 184, 0.2)';
         
            ctx = canvast.getContext('2d');
             ctx.webkitImageSmoothingEnabled = false;
                ctx.mozImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
            ctx.globalAlpha = 0.5
   

            canvast.height = viewport.height * window.devicePixelRatio;
            canvast.width = viewport.width * window.devicePixelRatio;
            
            var renderContext = {
                canvasContext: ctx,
                background: 'rgba(0,0,0,0)',
                viewport: viewport
            };

            // now, tap into the returned promise from render:
            var task = page.render(renderContext);

               task.then(function(){
               	//console.log(canvast.toSVG());
                console.log(canvast.toDataURL('image/png'));
                
                var pdf_image = canvast.toDataURL('image/png');
                //var pdf_image = canvast.toSVG();



              		 		var test = '<img src="'+pdf_image+'" name="">';
        		 		jQuery('.adminpreviewIMG').html(test);

                			var width = 500;
                            var height = 661;

                   var card_w = width*2;
                  		var card_h = height*2;
                      var type = jQuery("#canvastype").val();

                		var react = fabric.Image.fromURL(pdf_image, function(img) {

                              img.scale(0.5).set({
                                  // left: 200,
                                  top: 0,
                                  width : card_w,
                                  height : card_h,
                                  
                                });
                              
                              if (type == 4) {
                                    canvas.controlsAboveOverlay = true;
                                    canvas.setOverlayImage(img,canvas.renderAll.bind(canvas));
                              }else{
                                    canvas.setBackgroundImage(img,canvas.renderAll.bind(canvas));

                              }

                            }) 
               });
        });
    }

     // main entry point/function for loop
    function getPagesvg() {
    	currentPage = 1;
        // when promise is returned do as usual
        pdf.getPage(currentPage).then(function(page) {
        	
        	console.log(page);
            
            var scale = 1.5;
            var viewport = page.getViewport(scale);
           
			// Get div#the-svg
			var container = document.getElementById('the-svg');
   

            // Set dimensions
  			container.style.width = viewport.width + 'px';
  			container.style.height = viewport.height + 'px';
  			container.style.backgroundColor = 'red';
            
           
            // SVG rendering by PDF.js
			 page.getOperatorList()
			    .then(function (opList) {
			      var svgGfx = new PDFJS.SVGGraphics(page.commonObjs, page.objs);
			      console.log(svgGfx.getSVG(opList, viewport));
			      return svgGfx.getSVG(opList, viewport);
			    })
			    .then(function (svg) {
			      container.appendChild(svg);

			       // fabric.loadSVGFromURL(svg, function (objects, options) { 
                                    
          //                     var shape = fabric.util.groupSVGElements(objects, options);
          //                                   shape.set({
          //                                       //left: 150,
          //                                       //top:200,
          //                                       //height: 700,
          //                                       //width: 700,
          //                                       scaleY: canvas.height / shape.height,
          //                                       scaleX: canvas.width / shape.width

          //                                   });
          //                                       //canvas.add(svg); 
          //                                       //canvas.renderAll();
                                 
          //                       canvas.controlsAboveOverlay = true;    
          //                       canvas.setOverlayImage(shape,canvas.renderAll.bind(canvas),function(o, object) {
        
          //                           //jQuery("#toolbox .outlay_can_board #loading").remove();
        
          //                       });
                                
          //                       });


			      //console.log(svg);
			    });

        });
    }



}

function iterate_landscape(pdf) {
//var data = false;
 // init parsing of first page
   getPage();

    // main entry point/function for loop
    function getPage() {
    	currentPage = 1;
        // when promise is returned do as usual
        pdf.getPage(currentPage).then(function(page) {
        	console.log(page);
            var scale = 5;
            var viewport = page.getViewport(scale);
            var canvast = document.getElementById('the-canvas');
            ctx = canvast.getContext('2d');
            ctx.webkitImageSmoothingEnabled = false;
            ctx.mozImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled = false;
            ctx.globalAlpha = 0.5

            canvast.height = viewport.height;
            canvast.width = viewport.width;
           

            var renderContext = {
                canvasContext: ctx,
                background: 'rgba(0,0,0,0)',
                viewport: viewport
            };

            // now, tap into the returned promise from render:
            var task = page.render(renderContext);
               task.then(function(){
                console.log(canvast.toDataURL('image/png'));
                var pdf_image = canvast.toDataURL('image/png');

              		 		var test = '<img src="'+pdf_image+'" name="">';
        		 		jQuery('.adminpreviewIMG').html(test);


                   var card_w =661 * 2;
                  		var card_h = 500 * 2;
                      var type = jQuery("#canvastype").val();

                		var react = fabric.Image.fromURL(pdf_image, function(img) {

                              img.scale(0.5).set({
                                  // left: 200,
                                  top: 0,
                                  width : card_w,
                                  height : card_h,
                                  
                                });
                              if (type == 4) {
                                    canvas.controlsAboveOverlay = true;
                                    canvas.setOverlayImage(img,canvas.renderAll.bind(canvas));
                              }else{
                                    canvas.setBackgroundImage(img,canvas.renderAll.bind(canvas));

                              }

                            }) 
               });
        });
    }


}



  function debugTextData(text) {
    var blob = new Blob([text], {
      type: 'application/json'
    });
    objectURL = URL.createObjectURL(blob);
	console.log(objectURL );
  }


function initial_json_set(){

jQuery("#toolbox #canvas_div").after("<span id='loading' style='text-align:center;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' />loading...</span>");
jQuery("#toolbox .blue-round-btns a").addClass('round-btns-disabled');
  var nid = jQuery("#node_id").val();
    var pid = jQuery("#product_id").val();
    var cid = jQuery("#cid").val();
    var section = jQuery("#section").val();
       // alert(section);
        //alert(cid);
            if (nid != null && pid != null && nid != "undefined" && pid != "undefined") {
            
              jQuery.ajax({
                  type: "POST",
                  url: "/canvassave",
                  data: { 
                      'nid': nid, 
                      'pid': pid,
                      'cid': cid,
                      'action':"insert",
                      'section': section,
       
                    },
                  success: function(result) {
                      jQuery("#toolbox .blue-round-btns a").removeClass('round-btns-disabled');
                       debugTextData(result); 
                       //return false;
                if(result != ''){

                    

                        var myobj = jQuery.parseJSON(result);
                        console.log(myobj.cid);
                         
                        if(myobj.cid){
                          console.log(myobj.json_data);
                          jQuery('#cid').val(myobj.cid);

                          set_json(myobj.json_data);
                          jQuery("#toolbox .outlay_can_board #loading").remove();
                        }else{ 
      
                          set_json(result);
                          jQuery("#toolbox .outlay_can_board #loading").remove();
                        }
                        
                      
                     }
                     else{
                      jQuery("#toolbox .outlay_can_board #loading").remove();
                       // here is product default json... 
                     }
                                    
                  },
                  error: function(result) {
                      alert('error');
                      //alert(result);
                  }
              }); 

            }
}



function set_json(data){

      var json = data;

    var getDATA =canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function(o, object) {
        
        fabric.log(o, object);
        
        });
     canvas.controlsAboveOverlay = true;
    canvas.selection = false;

}

function set_json_sample(data){


      var json = canvas.toJSON();
      data = JSON.parse(data);
      //console.log(json);
      //console.log(data);

       if(data.hasOwnProperty('objects') && typeof data.objects[0] !== 'undefined')
        data.objects.forEach(function(o) {
          //console.log(o);
          json.objects.push(o);
        });
        

      canvas.clear();
      //console.log(json);
    var getDATA =canvas.loadFromJSON(JSON.stringify(json) , canvas.renderAll.bind(canvas), function(o, object) {
        
        fabric.log(o, object);
        
        });
     canvas.controlsAboveOverlay = true;
  
    canvas.selection = false;

}

function changeBackground(){
      var color = document.getElementById("favcolor").value;
      jQuery('#backColorCode').html(color);
      canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
      updateModifications(true);
              canvas.counter++;
              newleft += 100;
}


function changeFontColor(){
       var color = document.getElementById("fontcolor").value;
       console.log(color);
       var Font = canvas.getActiveObject();
       if(typeof(Font) !="undefined"){
        jQuery('#FontcolorCode').html(color);
         Font.set({fill:color});
         var resp = canvas.renderAll();
          console.log(resp);
         updateModifications(true);
              canvas.counter++;
              newleft += 100;
       }
}

// new changes

var copiedObject,
copiedObjects = new Array();
function copy(){
    copiedObjects = new Array();
    if(canvas.getActiveGroup()){
        //console.log(canvas.getActiveGroup().getObjects());
        canvas.getActiveGroup().getObjects().forEach(function(o){
            var object = fabric.util.object.clone(o);
            copiedObjects.push(object);
        });             
    }
    else if(canvas.getActiveObject()){
        var object = fabric.util.object.clone(canvas.getActiveObject());
        copiedObject = object;
        copiedObjects = new Array();
        
    }
}

function cut(){
    copiedObjects = new Array();
    if(canvas.getActiveGroup()){
        var deleteGroup = canvas.getActiveGroup(); 
        //console.log(canvas.getActiveGroup().getObjects());
        canvas.getActiveGroup().getObjects().forEach(function(o){
            var object = fabric.util.object.clone(o);
            copiedObjects.push(object);
            deleteGroup.remove();
        });             
    }
    else if(canvas.getActiveObject()){
        var deleteobj = canvas.getActiveObject();
        var object = fabric.util.object.clone(canvas.getActiveObject());
        copiedObject = object;
        copiedObjects = new Array();
        deleteobj.remove();
        
    }
}

function paste(){
    if(copiedObjects.length > 0){
        for(var i in copiedObjects){
          copiedObjects[i]=fabric.util.object.clone(copiedObjects[i]);
      
            copiedObjects[i].set("top", copiedObjects[i].top+100);
            copiedObjects[i].set("left", copiedObjects[i].left+100);
            
            canvas.add(copiedObjects[i]);
            canvas.item(canvas.size() - 1).hasControls = true;
        }                
    }
    else if(copiedObject){
      copiedObject= fabric.util.object.clone(copiedObject);
    copiedObject.set("top", 150);
      copiedObject.set("left", 150);
        canvas.add(copiedObject);
        canvas.item(canvas.size() - 1).hasControls = true;
    }
    canvas.renderAll();  
}

function Position(status){
  var myObject = selectedObject;
  if(myObject !=''){
    if(status == 1){
      canvas.sendBackwards(myObject);
    }else if(status == 2){
      canvas.sendToBack(myObject);
    }else if(status == 3){
      canvas.bringForward(myObject);
    }else if(status == 4){
      canvas.bringToFront(myObject);
    }else if(status == 5){
      canvas.bringToFront(myObject);
    }else if(status == 6){
      copy();
    }else if(status == 7){
      cut();
    }else if(status == 8){
      paste();
    }else if(status == 9){
      removeActive();
    }
  }
  canvas.renderAll();
  jQuery('#right-menu').hide();
}

function setBackgroundImage(imagepath){


   var width = 504 * 1.5;
   var height = 661 * 1.5;


  canvas.setBackgroundImage(imagepath, function(e) {
    var rect = new fabric.Rect({
      width: width,
      height: height,
      fill: 'rgb(255,0,0)'
    });
    // zoom(1);
    canvas.add(rect);
    rect.center();
  });
  // Set our new zoom to 0.8, when i center rec2, the center should be the same!!!
}

function zoom(scale) {
    canvas.setZoom(scale);
  
  // Scale image
  canvas.backgroundImage.setWidth(canvas.backgroundImage.getOriginalSize().width * canvas.getZoom());
  canvas.backgroundImage.setHeight(canvas.backgroundImage.getOriginalSize().height * canvas.getZoom());
  
  // Scale canvas
    canvas.setWidth(canvas.backgroundImage.getOriginalSize().width * canvas.getZoom());
    canvas.setHeight(canvas.backgroundImage.getOriginalSize().height * canvas.getZoom());
    canvas.renderAll();
}

// end


canvas.on(
    'object:modified', function () {
    updateModifications(true);
},
    'object:added', function () {
    updateModifications(true);
});

function updateModifications(savehistory) {
    if (savehistory === true) {
        myjson = JSON.stringify(canvas);
        state.push(myjson);
    }
}

undo = function undo() {
    if (mods < state.length) {
        canvas.clear().renderAll();
        canvas.loadFromJSON(state[state.length - 1 - mods - 1]);
        canvas.renderAll();
        //console.log("geladen " + (state.length-1-mods-1));
        //console.log("state " + state.length);
        mods += 1;
        //console.log("mods " + mods);
    }
}




function saveCanvasJson(action, section){
   //console.log(JSON.stringify(canvas));
    
///////////////////////////User card save code/////////////////////
   if (section == "admin" && action == 'admin_save') {
    jQuery(".page-admin-commerce .green-round-btns a").after("<span id='loading' style='text-align:center;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' />Loading...</span>");
    jQuery(".page-admin-commerce .green-round-btns a").addClass('round-btns-disabled');

      var type = jQuery("#canvastype").val();
      var categories = jQuery("#canvascategories").val();
      var card_age = jQuery("#card_age").val();
      var cardname = jQuery("#defaultcardname").val();
      var productsku = jQuery("#productsku").val();
      var productprice = jQuery("#productprice").val();
      var card_orientation = jQuery('#canvas_orientation').val();
      var p_upload = jQuery('input[name=card_p_upload]:checked','#card-p-upload-main').val();

        var gender = [];
        jQuery('#card-gender-main .checkbox input:checked').each(function(i){
          gender[i] = jQuery(this).val();
        });

         var recipient = [];
        jQuery('#card-recipient-main .checkbox input:checked').each(function(i){
          recipient[i] = jQuery(this).val();
        });

         var style = [];
        jQuery('#card-style-main .checkbox input:checked').each(function(i){
          style[i] = jQuery(this).val();
        });


        //console.log(style);

        if (gender.length !== 0) {
            
            var card_gender = gender;
        
        }else{

          var card_gender = 0;

        }
        if (recipient.length !== 0) {
            
            var card_recipient = recipient;
        
        }else{

          var card_recipient = 0;

        }
         if (style.length !== 0) {
            
            var card_style = style;
        
        }else{

          var card_style = 0;

        }
      
      if (jQuery('#featured_card').is(":checked"))
          {
            var featured_card = jQuery("#featured_card ").val();
          }else{
            var featured_card = 0;  
          }
      
    
      var imagename = jQuery(".adminpreviewIMG img").attr('name');
      if (type == 4 || type == 5 ) {

        var cardimage = jQuery(".adminpreviewIMG img").attr('src');

      }else{

        var cardimage = canvas.toDataURL('png');
      }


      var image_sample_name = jQuery(".adminpreview_sampleimg img").attr('name');
       if (type == 4 || type == 5 ) {

        var card_sample_image = jQuery(".adminpreview_sampleimg img").attr('src');

      }else{

        var card_sample_image = '';
      }
      
      console.log('Card Json');
      console.log(JSON.stringify(canvas));
      //console.log(cardimage);
      console.log(card_sample_image);
      console.log(type);
      //return false;
      
      if (productsku == "") 
    {
      jQuery("#productsku").addClass('error');
      alert("Pleate Enter Product SKU");
      jQuery(".page-admin-commerce .green-round-btns a").removeClass('round-btns-disabled');
      jQuery('.page-admin-commerce .green-round-btns #loading').remove();
      }
    else
      {   
        jQuery("#productsku").removeClass('error');
          jQuery.ajax({
              type: "POST",
              url: "/canvassave",
              data: { 
                  'type': type,
                  'categories':categories,
                  'card_age':card_age,
                  'p_upload':p_upload,
                  'cardname':cardname,
                  'productsku':productsku,
                  'productprice': productprice,
                  'cardimage': cardimage,
                  'card_sample_image': card_sample_image,
                  'card_gender':card_gender,
                  'card_recipient':card_recipient,
                  'card_style':card_style,
                  'featured_card':featured_card,
                  'card_orientation':card_orientation,
                  'imagename': imagename,
                  'image_sample_name':image_sample_name,                  
                  'json_data':JSON.stringify(canvas),
                  'action':action,
                },
              success: function(result) {
                 
                    //alert(result);
                    jQuery(".page-admin-commerce .green-round-btns a").removeClass('round-btns-disabled');
                    jQuery('.page-admin-commerce .green-round-btns #loading').remove();
                    if (result == 2) {
                      alert("Product SKU is already taken.");
                    }else{
                      jQuery('#saved-alert').html('');
                  jQuery('#saved-alert').html('<div class="alert alert-success alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a> Product Created Successfully.</div>');
                    }
                  
                  
              },
              error: function(result) {
                  alert('error');
                  //alert(result);
              }
          });
        }

   }else{

if (action != 'save' ) {

jQuery("#toolbox a.btn-blue-nxt").after("<span id='loading' style='text-align:center;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' />Loading...</span>");
jQuery("#toolbox .blue-round-btns a").addClass('round-btns-disabled');

}

  var nid = jQuery("#node_id").val();
  var pid = jQuery("#product_id").val();
  var cid = jQuery("#cid").val();
  var uid = jQuery("#user_id").val();
  var canvas_type = jQuery("#product_canvas_type").val();
  var json_data_main = JSON.stringify(canvas.toJSON());
  console.log('svg start');
  //console.log(canvas.toSVG());
    
        jQuery.ajax({
            type: "POST",
            url: "/usersavedata",
            data: { 
                'nid': nid, 
                'pid': pid,
          //'json_data' : JSON.stringify(canvas),
          'json_data' : json_data_main,
          'section' : section,
          'action' : action,
          'cid'    : cid,
          'canvas_type': canvas_type,
 
              },
            success: function(result) {
                //alert(result);
               if (result==false && action == 'save') {
                  alert("Data not saved");
                }
                if(result==true && action == 'save'){
                  //alert(result);
                  //alert("Data saved Successfully");
                 // jQuery('#card-alert').show();
                 jQuery('#saved-alert').html('');
                  jQuery('#saved-alert').html('<div class="alert alert-success alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a> Your card design has been successfully saved. You can access this anytime from Saved Card Design in My Account <a href="/user/'+uid+'/saved_card">Click Here</a></div>');
                // jQuery('#card-alert .close').click(function(){
                //  jQuery('#card-alert').hide();
                // }); 
                }
                if(action == 'shownext' || action == 'showpre'){
                  //alert(result);
                  //alert("inlay section");
                   jQuery('#toolbox').fadeOut("slow",function(){
                          //jQuery("#toolbox").empty().append("<div id='loading' style='text-align:center;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' /></div>");
                          jQuery('#toolbox').fadeIn('slow');
                      });
                  if (action != 'shownext' && section != 'delivery') {
                        jQuery( ".round-btn" ).hide();                   
                        }
                  setTimeout(
                    function() 
                    {
                      
                      jQuery( "#toolbox" ).html(result);
                      //jQuery('#toolbox').fadeIn("slow");
                      if (action == 'shownext' && section == 'delivery') {
                        jQuery( ".round-btn" ).show();
                    
                        }
                    }, 500);

                }
                
            },
            error: function(result) {
                alert('error');
                //alert(result);
            }
        });


        //save card image to preview in user saved card
if (section == 'outlay' && (action == 'save' || action == 'shownext')) {

        var canvas_image = canvas.toDataURL('png');

                     jQuery.ajax({
                  type: "POST",
                  url: "/canvassave",
                  data: { 
                      'image_data':canvas_image,
                      'action': 'cart_image_save_outlay',
                      'cid':cid,
       
                    },
                  success: function(result) {
                      console.log('image saved for user');
                      console.log(result);
                     
                                    
                  },
                  error: function(result) {
                      alert('error');
                      //alert(result);
                  }
              }); 
          }           


    }
////////////////////////////End/////////////////////////////////////

}

function saveCanvasImage(){
   window.open(canvas.toDataURL('png'));
}

function clearCanvas(){
  canvas.clear();
}

function addEmojis(ele){
	jQuery(ele).parents('li a').after("<span id='loading' style='text-align:center;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' /></span>");
	jQuery(ele).parents('li a').css( "display", "none" )

	var element = jQuery(ele).parents('li a');
//jQuery("#toolbox #canvas_div").after("<span id='loading' style='text-align:center;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' /></span>");	

 var emojisrc =jQuery(ele).attr('src');

 jQuery.ajax({
              type: "POST",
              url: "/emojishow",
              data: { 
                  'src':emojisrc,
   
                },
            datatype: 'json',
              success: function(result) {
                  //alert(result);
                  //console.log(result);
                  element.css( "display", "block" );
                  jQuery('#emoji #loading').remove();
                  

          			set_image(result);

                                
              },
              error: function(result) {
                  alert('error');
                  //alert(result);
              }
          });

}


function set_image(result){

	    fabric.Image.fromURL(result, function(img) {
       //var rFilter = new fabric.Image.filters.Resize({
      //  resizeType: 'sliceHack'
      //});
     // img.resizeFilters.push(rFilter);
      //img.applyFilters(canvas.renderAll.bind(canvas));
        img.scale(0.1).set({
                top: 200,
                left:200,
                //height:100,
                //width:100,
              });
       //canvas.imageSmoothingEnabled = true;
        //canvas.imageSmoothingQuality = "high"
        canvas.add(img).setActiveObject(img);
        updateModifications(true);
              canvas.counter++;
              newleft += 100;
     });

}


function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}



function fontmainSize(){
  var fontmainSize= '';
  
  for (var i = 1; i < 201; i++) {
      if(i == 22){
        var selected ='selected';
      }else{
        var selected ='';
      }
        fontmainSize +='<option value="'+i+'" '+selected+'>'+i+'</option>';
  }
  jQuery("#FontSizeNumber").html(fontmainSize);
}



function removeActive(){
  var removeVal = canvas.getActiveObject();
  if(removeVal != null && typeof(removeVal) != 'undefined'){
    removeVal.remove();
  }
}

// function getDective(){
//   var getVal = canvas.getDeActiveObject();
//   console.log(getVal);
//   // if(removeVal != null && typeof(removeVal) != 'undefined'){
//   //   removeVal.remove();
//   // }
// }

function webfontload(){

   WebFont.load({
        google: {
          families: [
          'Open Sans', 
          'Poppins', 
          'Oswald', 
          'Encode Sans Condensed', 
          'Kaushan Script',
          'Oxygen',
          'PT Sans',
          'Patrick Hand SC',
          'Raleway',
          'Roboto',
          'Tangerine',
          'Ubuntu'
          ]
        }
      });

}



function removeGrid(){
  var objects = canvas.getObjects('line');
  if(objects !=''){
      for (let i in objects) {
          canvas.remove(objects[i]);
      }
      jQuery('.grid').css('background-color','#f4f4f4');
  }else{
    // var height = 652;
    var height = canvas.getHeight();
    var width = canvas.getWidth();
      for (var i = 0; i < 20; i++) {
        canvas.add(new fabric.Line([ i * grid, 0, i * grid, height], { stroke: '#ccc', selectable: false }));
        canvas.add(new fabric.Line([ 0, i * grid, width, i * grid], { stroke: '#ccc', selectable: false }))
      }
      jQuery('.grid').css('background-color','#b4e97a');
    // options.target.set({
    //   left: Math.round(options.target.left / grid) * grid,
    //   top: Math.round(options.target.top / grid) * grid
    // }).setCoords();
  }
    canvas.renderAll();
}

function checkGrid(){
  var objects = canvas.getObjects('line');
  if(objects !=''){
      for (let i in objects) {
          canvas.remove(objects[i]);
      }
      jQuery('.grid').css('background-color','#f4f4f4');
  }
}

document.getElementById("canvas_div").onmousedown = function(event) {
  var getVal = canvas.getActiveObject();
    if (event.which == 3 && getVal !='') {
      jQuery('#right-menu').show();
      jQuery('#right-menu').css({'left':event.offsetX + 'px', 'top':event.offsetY+'px'})
         // document.getElementById('right-menu').style.display = 'block';
        // console.log(getVal);
        document.getElementById('canvas_div').addEventListener("contextmenu", function(e){e.preventDefault();}, false);
    }
    // else if(event.which == 1) {
    // // else{
    //   jQuery('#right-menu').hide();
    // }
    
    return false;
}
document.getElementsByClassName("canvas-container")[0].onmousedown = function(event) {
  if(event.target!=document.getElementById('right-menu'))
  {
    jQuery('#right-menu').hide();
  }
}
var BASE64_MARKER = ';base64,';
function convertDataURIToBinary(dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for(var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}



jQuery(document).ready(function(){


// if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {

//       jQuery('.detect').remove();
//     jQuery('#FontcolorCode').remove();
//     jQuery('#backColorCode').remove();


// }else{

//   jQuery('.jscolor').remove();
 
// }

// canvas area boundry limit 

canvas.on('object:moving', function (e) {
        var obj = e.target;
         // if object is too big ignore
        if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
            return;
        }        
        obj.setCoords();        
        // top-left  corner
  
  
  //console.log(obj.top-obj.getBoundingRect().top);
  
        if(obj.getBoundingRect().top < 20 || obj.getBoundingRect().left < 20){
            obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top+20);
            obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left+20);
        }
        // bot-right corner
        if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height-20 || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width-20){
            obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top-20);
            obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left-20);
        }
});



canvas.on('selection:cleared', function() {
  jQuery('.selectTypecase').css('background-color', 'rgb(255, 255, 255)');
});

canvas.on('object:selected', function(o){
var activeObj = o.target;
 //console.log(activeObj.get('type'));
 //var objsInCanvas = canvas.getObjects();
 console.log(activeObj.get('fontWeight'));
// if(activeObj.get('type') == 'group') { fontWeight fontStyle

   if(activeObj.isType('text') || activeObj.isType('textbox')){
       //activeObject.get('')
      //console.log(activeObj.get('fontSize'));
      jQuery('#FontSizeNumber').val(activeObj.get('fontSize'));
      jQuery('#FontStyleNumber').val(activeObj.get('fontFamily'));
     
     if ( activeObj.get('fontWeight') == 'bold') {

      jQuery('.tool-bar .btn-bold').css('background-color', '#b4e97a');

     }else{
       jQuery('.tool-bar .btn-bold').css('background-color', 'rgb(255, 255, 255)');
     } 

     if ( activeObj.get('fontStyle') == 'italic') {

      jQuery('.tool-bar .btn-italic').css('background-color', '#b4e97a');

     }else{
       jQuery('.tool-bar .btn-italic').css('background-color', 'rgb(255, 255, 255)');
     } 

    if ( activeObj.get('textDecoration') == 'underline') {

      jQuery('.tool-bar .btn-underline').css('background-color', '#b4e97a');

     }else{
       jQuery('.tool-bar .btn-underline').css('background-color', 'rgb(255, 255, 255)');
     }

      if ( activeObj.get('strokeWidth') > 0) {

      jQuery('.tool-bar .btn-stroke').css('background-color', '#b4e97a');

     }else{
       jQuery('.tool-bar .btn-stroke').css('background-color', 'rgb(255, 255, 255)');
     }
    


    }else{
      jQuery('.selectTypecase').css('background-color', 'rgb(255, 255, 255)');
    }

     activeObj.set({'borderColor':'#f3eded','cornerColor':'#000000',"transparentCorners": false,'cornerStrokeColor':'#000000'});
     canvas.renderAll();
     //jQuery('.selectTypecase').css('background-color', 'rgb(255, 255, 255)');
    runCode = 0; 

 // }
});
  
  webfontload();
  //emojis();
  fontmainSize();
  initial_json_set();

 jQuery('#right-menu').hide();
 // document.getElementById('right-menu').style.display ='none';

 jQuery('body').unbind('keydown');
 jQuery('body').keydown(function(e){
  console.log(e.keyCode);
    if(e.keyCode == 46 || e.keyCode == 127) {
       var getdel = canvas.getActiveObject();
       if(getdel != null && typeof(getdel) != 'undefined'){
          removeActive();
       }
    }
});


 //////admin save photo card image////////////////

   jQuery("#cardimage").change(function (e) {

    //console.log(e.target.files);
        var file = e.target.files[0];
        var width = 500;
        var height = 661;
        var reader = new FileReader();
        
        reader.onload = function(f) {
                    
                    var data = f.target.result;
                   	//var img_data=[];
                  	//img_data.push(data);
                   	//console.log(data);
                   	console.log(file.type);
                   
      var type = jQuery("#canvastype").val();     

        if ( file.type == 'image/svg+xml') {
        	var test = '<img src="'+data+'" name="'+file.name+'">';
        	 jQuery('.adminpreviewIMG').html(test);
                  var card_w = width;
                  var card_h = height;

                  fabric.loadSVGFromURL(data, function (objects, options) { 

                    var shape = fabric.util.groupSVGElements(objects, options);
                                    shape.set({
                                        //left: 150,
                                        //top:200,
                                        //height: 700,
                                        //width: 700,
                                        scaleY: canvas.height / shape.height,
                                        scaleX: canvas.width / shape.width

                                    });

                                                //canvas.add(shape); 
                                                //canvas.renderAll(); 
                              if (type == 4) {
                                    canvas.controlsAboveOverlay = true;
                                    canvas.setOverlayImage(shape,canvas.renderAll.bind(canvas));
                              }else{
                                    canvas.setBackgroundImage(shape,canvas.renderAll.bind(canvas));

                              }

                    });



        }

        if( file.type == 'application/pdf'){

      
					
					var pdfAsArray = convertDataURIToBinary(data);

					//PDFJS.disableWorker = true;	
						    
					
					PDFJS.getDocument(pdfAsArray).then(iterate);   


					//console.log(pdf_image);
        
        				 

        }


        if (file.type == 'image/jpeg' || file.type == 'image/png')
        {
        		var test = '<img src="'+data+'" name="'+file.name+'">';
        		 jQuery('.adminpreviewIMG').html(test);
                var card_w = width*2;
                  var card_h = height*2;

                var react = fabric.Image.fromURL(data, function(img) {

                              img.scale(0.5).set({
                                  // left: 200,
                                  top: 0,
                                  width : card_w,
                                  height : card_h,
                                  
                                });
                              //console.log(type);
                                  if (type == 4) {
                                    canvas.controlsAboveOverlay = true;
                                    canvas.setOverlayImage(img,canvas.renderAll.bind(canvas));
                                  }else{
                                    canvas.setBackgroundImage(img,canvas.renderAll.bind(canvas));

                                  }


                            })             
        	}


                  }
        reader.readAsDataURL(file);

   });

     jQuery("#card_sample_image").change(function (e) {

    //console.log(e.target.files);
        var file = e.target.files[0];
        var width = 500;
        var height = 661;
        var reader = new FileReader();
        
        reader.onload = function(f) 
          {
                      
                      var data = f.target.result;
                      //var img_data=[];
                      //img_data.push(data);
                      //console.log(data);
                      console.log(file.type);
                     
            var type = jQuery("#canvastype").val();     



            if (file.type == 'image/jpeg' || file.type == 'image/png')
              {
                var test = '<img src="'+data+'" name="'+file.name+'">';
                 jQuery('.adminpreview_sampleimg').html(test);
                    var card_w = width*2;
                      var card_h = height*2;

                 
              }else{
                alert('Plz Upload PNG or jpeg image.');
              }


          }


        reader.readAsDataURL(file);

   });






  jQuery("#cardimage_landscape").change(function (e) {

    console.log(e.target.files);
        var file = e.target.files[0];
        var width = 661 * 2;
        var height = 500 * 2;

        var reader = new FileReader();
        
  //       reader.onload = function(f) {

  //                   var data = f.target.result;


  //                  var img_data=[];
  //                 img_data.push(data);
  //                  //console.log(img_data);
  //                  var test = '<img src="'+data+'" name="'+file.name+'">';
  //           jQuery('.adminpreviewIMG').html(test);

		// var react = fabric.Image.fromURL(data, function(img) {

  //           img.scale(0.5).set({
  //               // left: 200,
  //               top: 0,
  //               width : width,
  //               height : height,
                
  //             });

  //           canvas.setOverlayImage(img,canvas.renderAll.bind(canvas));

  //         })

  //                 }

                reader.onload = function(f) {
                    
                    var data = f.target.result;
                   	//var img_data=[];
                  	//img_data.push(data);
                   	//console.log(data);
                   	console.log(file.type);
                   var type = jQuery("#canvastype").val();  
           

        if ( file.type == 'image/svg+xml') {
        	var test = '<img src="'+data+'" name="'+file.name+'">';
        	 jQuery('.adminpreviewIMG').html(test);
                  var card_w = width;
                  var card_h = height;

                  fabric.loadSVGFromURL(data, function (objects, options) { 

                    var shape = fabric.util.groupSVGElements(objects, options);
                                    shape.set({
                                        //left: 150,
                                        //top:200,
                                        //height: 700,
                                        //width: 700,
                                        scaleY: canvas.height / shape.height,
                                        scaleX: canvas.width / shape.width

                                    });

                                                //canvas.add(shape); 
                                                //canvas.renderAll(); 
                        if (type == 4) {
                                    canvas.controlsAboveOverlay = true;
                                    canvas.setOverlayImage(shape,canvas.renderAll.bind(canvas));
                        }else{
                                    canvas.setBackgroundImage(shape,canvas.renderAll.bind(canvas));

                        }

                    });



        }

        if( file.type == 'application/pdf'){

        		
					var pdfAsArray = convertDataURIToBinary(data);

					
					PDFJS.getDocument(pdfAsArray).then(iterate_landscape);   


					//console.log(pdf_image);
        
        				 
        	


        }


        if (file.type == 'image/jpeg' || file.type == 'image/png')
        {
        		var test = '<img src="'+data+'" name="'+file.name+'">';
        		 jQuery('.adminpreviewIMG').html(test);
               

                var react = fabric.Image.fromURL(data, function(img) {

                              img.scale(0.5).set({
                                  // left: 200,
                                  top: 0,
                                  width : width,
                                  height : height,
                                  
                                });
                              if (type == 4) {
                                    canvas.controlsAboveOverlay = true;
                                    canvas.setOverlayImage(img,canvas.renderAll.bind(canvas));
                              }else{
                                    canvas.setBackgroundImage(img,canvas.renderAll.bind(canvas));

                              }
                             

                            })             
        	}


                  }


        
        reader.readAsDataURL(file);

   });


 jQuery("#card_sample_image_landscape").change(function (e) {

    //console.log(e.target.files);
        var file = e.target.files[0];
        var width = 661 * 2;
        var height = 500 * 2;

        var reader = new FileReader();
        
        reader.onload = function(f) 
          {
                      
                      var data = f.target.result;
                      //var img_data=[];
                      //img_data.push(data);
                      //console.log(data);
                      console.log(file.type);
                     
            var type = jQuery("#canvastype").val();     



            if (file.type == 'image/jpeg' || file.type == 'image/png')
              {
                var test = '<img src="'+data+'" name="'+file.name+'">';
                 jQuery('.adminpreview_sampleimg').html(test);
                    var card_w = width*2;
                      var card_h = height*2;

                 
              }else{
                alert('Plz Upload PNG or jpeg image.');
              }


          }


        reader.readAsDataURL(file);

   });




   // jQuery('#cpInline2').colorpicker({color:'#31859b', defaultPalette:'web'});
 var demo1 = jQuery('#col');
        demo1.colorpickerplus();
        // console.log(demo1);
        demo1.on('changeColor', function(e,color){
      if(color==null)
      jQuery(this).val('transparent').css('background-color', '#fff');//tranparent
      else
          jQuery(this).val(color).css('background-color', color);
        });

   

   // jQuery(canvas).rightclick(function () {

   // });


   jQuery('#FontStyleNumber').change(function () {
       var FontStyle =canvas.getActiveObject();
       if(typeof(FontStyle) !="undefined"){
          FontStyle.set({fontFamily: jQuery(this).val()});
          canvas.renderAll();
          updateModifications(true);
          canvas.counter++;
          newleft += 100;
       }
    });
 
  
  jQuery('#FontSizeNumber').change(function () {
       var FontSize =canvas.getActiveObject();
       if(typeof(FontSize) !="undefined"){
          FontSize.set({fontSize: jQuery(this).val()});
          canvas.renderAll();
          updateModifications(true);
          canvas.counter++;
          newleft += 100;
      }
    });

   jQuery('.backColor').click(function () {
          var color = jQuery(this).css( "background-color" );
          jQuery('#backColorCode').html(rgb2hex(color));
          canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
           canvas.renderAll();
          updateModifications(true);
          canvas.counter++;
          newleft += 100;
   });


  jQuery('.ColorFont').click(function () {
         var color = jQuery(this).css( "background-color" );
         var Font = canvas.getActiveObject();
       if(typeof(Font) !="undefined"){
          jQuery('#FontcolorCode').html(rgb2hex(color));
          Font.set({fill:color});
          canvas.renderAll();
          updateModifications(true);
          canvas.counter++;
          newleft += 100;
       }
   });


   runCode =0;


 jQuery('.selectTypecase').click(function () {
    var thisval = jQuery(this).val();
    var selectTypecase = canvas.getActiveObject();

   // var test = canvas.getActiveObject().get('id');
   console.log(selectTypecase);

         if(selectTypecase == null){
           jQuery('.selectTypecase').css('background-color', 'rgb(255, 255, 255)');
        
         }


     //jQuery('.selectTypecase').css('background-color', 'rgb(255, 255, 255)');
       
       if(typeof(selectTypecase) !="undefined"  || typeof(selectTypecase) != null){

        if(thisval == 'bold'){

              if ( selectTypecase.get('fontWeight') == 'bold') {

               jQuery(this).css('background-color', 'rgb(255, 255, 255)');
                  selectTypecase.set({fontWeight: "normal"});
             

              }else{

                  jQuery(this).css('background-color', '#b4e97a');
               selectTypecase.set({fontWeight: thisval});
                
              } 
          }

          if(thisval == 'italic'){
              if ( selectTypecase.get('fontStyle') == 'italic') {

               jQuery(this).css('background-color', 'rgb(255, 255, 255)');
                 
                 selectTypecase.set({fontStyle: "normal"});
             

              }else{

                   jQuery(this).css('background-color', '#b4e97a');
               selectTypecase.set({fontStyle: thisval});
                
              } 
          }

           if(thisval == 'underline'){
              if ( selectTypecase.get('textDecoration') == 'underline') {

               jQuery(this).css('background-color', 'rgb(255, 255, 255)');
                 
                 selectTypecase.set({textDecoration: "normal"});
             

              }else{

                   jQuery(this).css('background-color', '#b4e97a');
               selectTypecase.set({textDecoration: thisval});
                
              } 
          }

          if(thisval == 'textstroke'){
              
              if ( selectTypecase.get('strokeWidth') > 0 ) {

               jQuery(this).css('background-color', 'rgb(255, 255, 255)');
                 
                 selectTypecase.set({

                    stroke: '#00FFFFFF',
                    strokeWidth:0,

                  });
             

              }else{

                   jQuery(this).css('background-color', '#b4e97a');
                    
                    selectTypecase.set({

                  stroke: '#fff',
                  strokeWidth:0.5,

                });
                
              } 
          }


            canvas.renderAll();
            updateModifications(true);
            canvas.counter++;
            newleft += 100;
        }else
        {
          jQuery('.selectTypecase').css('background-color', 'rgb(255, 255, 255)');
        
        }
    });

 



    jQuery('.previewIMG').on('click','.IMGView', function () {

          var imageget = jQuery(this).attr('src');
          var width = 504 * 1.5;
          var height = 661 * 1.5;
          var fileAngle = jQuery('#imageAngle').val();
          if(fileAngle == 1){
            var left = 500;
            var top =100;
            var angle = 90;
          }else{
            var left = '';
            var top =200;
            var angle = '';
          }
          fabric.Image.fromURL(imageget, function(img) {
              img.scale(0.5).set({
                left: left,
                top: top,
                angle: angle,
                width : width,
                height : height,

              });

              canvas.add(img).setActiveObject(img);
              updateModifications(true);
                  canvas.counter++;
                  newleft += 100;
          });
     });

    jQuery('#imageAngle').click(function () {
    // jQuery('.previewIMG').on('click','.IMGView', function () {
          var fileAngle = jQuery(this).val();
          // var imageget = jQuery(this).attr('src');
          var object = canvas.getActiveObject(); 
          var imageget = object._originalElement.currentSrc;
          if(imageget !=''){
            var width = 504 * 1.5;
            var height = 661 * 1.5;
            if(fileAngle == 1){
              var left = 500;
              var top =100;
              var angle = 90;
            }else{
              var left = '';
              var top =200;
              var angle = '';
            }
            fabric.Image.fromURL(imageget, function(img) {
                img.scale(0.5).set({
                  left: left,
                  top: top,
                  angle: angle,
                  width : width,
                  height : height,

                });

                canvas.remove(object);
                canvas.add(img).setActiveObject(img);
                updateModifications(true);
                    canvas.counter++;
                    newleft += 100;
            });
          }
     });

  jQuery('#mytext').change(function () {
   
        canvas.getActiveObject().set({text: jQuery(this).val()});
        canvas.renderAll();
        updateModifications(true);
        canvas.counter++;
        newleft += 100;
    });

countImg = 0;

    jQuery(".myImage").change(function (e) {
        countImg ++;        

        var file = e.target.files[0];
        var reader = new FileReader();
        var width = 504 * 1.5;
        var height = 661 * 1.5;
        var fileAngle = jQuery('#imageAngle').val();
        if(fileAngle == 1){
          var left = 500;
          var top =100;
          var angle = 90;
        }else{
          var left = '';
          var top =200;
          var angle = '';
        }
        //aws_upload();
        // return false;
        if(countImg <= 10){
        reader.onload = function(f) {
            var data = f.target.result;
          //file.name
              var react = fabric.Image.fromURL(data, function(img) {
              //alert(countImg);
              aws_upload(data,'localfile',countImg);
              
              img.scale(0.5).set({
                // left: 200,
                top: 200,
                width : width,
                height : height,
                // angle: -15
                angle: angle,
                id :'IMG'+countImg,
              });
              //console.log(data);
              
              
              
                canvas.add(img).setActiveObject(img);
                
                appendHTML =" <li class='prevClose'><span class='fa fa-close closeIMG'></span><img class='IMGView' id='IMG"+countImg+"' src="+data+"></li>";
                jQuery('.previewIMG').append(appendHTML);
                updateModifications(true);
                  canvas.counter++;
                        newleft += 100;
                    
                    jQuery('.closeIMG').click(function () {
                         var valBox = jQuery(this).next();
                         var valBoxClass = jQuery(this).next().attr('id');
                         var key = jQuery(this).next().attr('key');
                         aws_delete(key);
                         
                         countImg--;
                         var removeVal = canvas._objects;
                        for (var i = 0; i < removeVal.length; i++) {
                               var idVal= removeVal[i];
                                if(idVal.id == valBoxClass){
                                    canvas.remove(idVal);
                                    canvas.renderAll();
                                    // jQuery(this).parent().html('<i class="fa fa-image"></i>');
                                    valBox.remove();
                                    jQuery(this).parent().remove();
                                    
                                }
                        }
                    
                 });

             });
            
        };

        reader.readAsDataURL(file);

        }else{
          alert('You can not upload more then 10 Images!');
        }
     })

}); 


/********Add address form function ************/

function add_address(){
        jQuery.ajax({
            type: "POST",
            url: "/canvassave",
            data: { 

          'address_data' : 'hello',
          'section' : 'addressbook',
          'action' : 'add_address',
 
              },
            success: function(result) {
                //alert(result);

                    jQuery( "#toolbox" ).html(result);
               
                
            },
            error: function(result) {
                alert('error');
                //alert(result);
            }
        });



}


/********Add address form function end ************/



