



var grid = 41.6;
var deal ='';
var canvas = '';


canvas1 = new fabric.Canvas("canvas1",{
  preserveObjectStacking: true
});

canvas2 = new fabric.Canvas("canvas2",{
  preserveObjectStacking: true
});

canvas3 = new fabric.Canvas("canvas3",{
  preserveObjectStacking: true
});

canvas4 = new fabric.Canvas("canvas4",{
  preserveObjectStacking: true
});

canvas1.counter = 0;
canvas2.counter = 0;
canvas3.counter = 0;
canvas4.counter = 0;
var newleft = 0;
canvas1.selection = true;
canvas2.selection = true;
canvas3.selection = true;
canvas4.selection = true;

var state = [];
var mods = 0;

var CanvasBackgrnd = function() {
  this.canvas1.background = '';
  this.canvas2.background = '';
  this.canvas3.background = '';
  this.canvas4.background = '';
};

var selectedObject;
canvas1.on('object:selected', function(event) {
  selectedObject = event.target;
});
canvas2.on('object:selected', function(event) {
  selectedObject = event.target;
});
canvas3.on('object:selected', function(event) {
  selectedObject = event.target;
});
canvas4.on('object:selected', function(event) {
  selectedObject = event.target;
});

function object_selected(canvas){
  canvas.on('object:selected', function(o){
    var activeObj = o.target;
    //console.log(activeObj.isType('text'));
    console.log(activeObj);
    // if(activeObj.get('type') == 'group') {
    if (activeObj.isType('textbox')) {
      activeObj.enterEditing();
    }

    if(activeObj.isType('textbox')){
      //activeObject.get('')
      //console.log(activeObj.get('fontSize'));
      console.log("object_selected(canvas):isType = textbox");
      jQuery('#FontSizeNumber').val(activeObj.get('fontSize'));
      jQuery('#FontStyleNumber').val(activeObj.get('fontFamily'));
      if (activeObj.get('fontWeight') == 'bold') {
        jQuery('.tool-bar .btn-bold').css('background-color', '#b4e97a');
      }else{
        jQuery('.tool-bar .btn-bold').css('background-color', 'rgb(255, 255, 255)');
      }

      if (activeObj.get('fontStyle') == 'italic') {
        jQuery('.tool-bar .btn-italic').css('background-color', '#b4e97a');
      }else{
        jQuery('.tool-bar .btn-italic').css('background-color', 'rgb(255, 255, 255)');
      }

      if (activeObj.get('textDecoration') == 'underline') {
        jQuery('.tool-bar .btn-underline').css('background-color', '#b4e97a');
      }else{
        jQuery('.tool-bar .btn-underline').css('background-color', 'rgb(255, 255, 255)');
      }

      if(activeObj.get('strokeWidth') > 0) {
        jQuery('.tool-bar .btn-stroke').css('background-color', '#b4e97a');
      }else{
        jQuery('.tool-bar .btn-stroke').css('background-color', 'rgb(255, 255, 255)');
      }
    }else{
      jQuery('.selectTypecase').css('background-color', 'rgb(255, 255, 255)');
    }

    activeObj.set({'borderColor':'#f3eded','cornerColor':'#000000',"transparentCorners": false,'cornerStrokeColor':'#000000'});
    canvas.renderAll();
    runCode = 0;
    // }
  });
}

function initial_json_set(){
  jQuery("#toolbox a.btn-blue-prv").before("<div id='loading' style='text-align:center;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' />Loading...</div>");
  jQuery("#toolbox .blue-round-btns a").addClass('round-btns-disabled');

  var nid = jQuery("#node_id").val();
  var pid = jQuery("#product_id").val();
  var cid = jQuery("#cid").val();
  var section = jQuery("#section").val();
  // alert(section);
  // alert(cid);
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
        console.log("initial_json_set():success");
        jQuery("#toolbox #loading").remove();
        jQuery("#toolbox .blue-round-btns a").removeClass('round-btns-disabled');

        //console.log('hello');
        //alert(result);

        if(result != ''){
          var myobj = jQuery.parseJSON(result);
          console.log(myobj.inlay_card_json_1);
          console.log(myobj.inlay_card_json_2);
          console.log(myobj.inlay_card_json_3);
          console.log(myobj.inlay_card_json_4);
          if (myobj.cid) {
            console.log(myobj.cid);
            jQuery('#cid').val(myobj.cid);
          }
          set_json(myobj.inlay_card_json_1,canvas1,1);
          set_json(myobj.inlay_card_json_2,canvas2,2);
          set_json(myobj.inlay_card_json_3,canvas3,3);
          set_json(myobj.inlay_card_json_4,canvas4,4);
        };

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

function set_json(data,canvas,count){

  var json = data;
  var getDATA;
  var setdata = getDATA+""+count;

  var setdata = canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function(o, object) {
    fabric.log(o, object);
  });

  var activeObj = canvas.getActiveObject();
  console.log(activeObj);
  //activeObj.set({fontSize: 15});

}


var copiedObject,
  copiedObjects = new Array();
function copy(){
  if(deal =='getCanvas2'){
    canvas = canvas2;
  }else if(deal =='getCanvas3'){
    canvas = canvas3;
  }else if(deal =='getCanvas4'){
    canvas = canvas4;
  }else{
    canvas = canvas1;
  }
  copiedObjects = new Array();
  if(canvas.getActiveGroup()){
    //console.log(canvas.getActiveGroup().getObjects());
    canvas.getActiveGroup().getObjects().forEach(function(o){
      var object = fabric.util.object.clone(o);
      copiedObjects.push(object);
    });
  } else if(canvas.getActiveObject()){
    var object = fabric.util.object.clone(canvas.getActiveObject());
    copiedObject = object;
    copiedObjects = new Array();
  }
}

function cut(){
  if(deal =='getCanvas2'){
    canvas = canvas2;
  }else if(deal =='getCanvas3'){
    canvas = canvas3;
  }else if(deal =='getCanvas4'){
    canvas = canvas4;
  }else{
    canvas = canvas1;
  }
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
  if(deal =='getCanvas2'){
    canvas = canvas2;
  }else if(deal =='getCanvas3'){
    canvas = canvas3;
  }else if(deal =='getCanvas4'){
    canvas = canvas4;
  }else{
    canvas = canvas1;
  }
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
  if(deal =='getCanvas2'){
    canvas = canvas2;
  }else if(deal =='getCanvas3'){
    canvas = canvas3;
  }else if(deal =='getCanvas4'){
    canvas = canvas4;
  }else{
    canvas = canvas1;
  }
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


function setBackgroundImage(){
  if(deal =='getCanvas2'){
    canvas = canvas2;
  }else if(deal =='getCanvas3'){
    canvas = canvas3;
  }else if(deal =='getCanvas4'){
    canvas = canvas4;
  }else{
    canvas = canvas1;
  }
  var width = 504 * 1.5;
  var height = 661 * 1.5;
  canvas.setBackgroundImage("https://i.imgur.com/lVWXGS8.png", function(e) {
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

canvas1.on(
  'object:modified', function () {
    updateModifications(true);
  },
  'object:added', function () {
    updateModifications(true);
  });

canvas2.on(
  'object:modified', function () {
    updateModifications(true);
  },
  'object:added', function () {
    updateModifications(true);
  });

canvas3.on(
  'object:modified', function () {
    updateModifications(true);
  },
  'object:added', function () {
    updateModifications(true);
  });

canvas4.on(
  'object:modified', function () {
    updateModifications(true);
  },
  'object:added', function () {
    updateModifications(true);
  });

function updateModifications(savehistory) {
  if(deal =='getCanvas2'){
    canvas = canvas2;
  }else if(deal =='getCanvas3'){
    canvas = canvas3;
  }else if(deal =='getCanvas4'){
    canvas = canvas4;
  }else{
    canvas = canvas1;
  }
  if (savehistory === true) {
    myjson = JSON.stringify(canvas);
    state.push(myjson);

  }
}

undo = function undo() {
  if(deal =='getCanvas2'){
    canvas = canvas2;
  }else if(deal =='getCanvas3'){
    canvas = canvas3;
  }else if(deal =='getCanvas4'){
    canvas = canvas4;
  }else{
    canvas = canvas1;
  }
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

  if (action != 'save' ) {
    jQuery("#toolbox a.btn-blue-prv").before("<div id='loading' style='text-align:center;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' />Loading...</div>");
    jQuery("#toolbox .blue-round-btns a").addClass('round-btns-disabled');
  }

  if(deal =='getCanvas2'){
    canvas = canvas2;
  }else if(deal =='getCanvas3'){
    canvas = canvas3;
  }else if(deal =='getCanvas4'){
    canvas = canvas4;
  }else{
    canvas = canvas1;
  }

  console.log(JSON.stringify(canvas1));
  console.log(JSON.stringify(canvas2));
  console.log(JSON.stringify(canvas3));
  console.log(JSON.stringify(canvas4));

  //console.log(canvas1.toSVG());
  //console.log(canvas2.toSVG());
  //console.log(canvas3.toSVG());
  //console.log(canvas4.toSVG());

  ///////user save card json////
  var nid = jQuery("#node_id").val();
  var pid = jQuery("#product_id").val();
  var cid = jQuery("#cid").val();
  var uid = jQuery("#user_id").val();
  var canvas_type = jQuery("#product_canvas_type").val();
  //alert(canvas_type);


  jQuery.ajax({
    type: "POST",
    url: "/usersavedata",
    data: {
      'nid': nid,
      'pid': pid,
      'inlay_card_json_1' : JSON.stringify(canvas1.toJSON(["staticBorderColor","maxWidth"])),
      'inlay_card_json_2' : JSON.stringify(canvas2.toJSON(["staticBorderColor","maxWidth"])),
      'inlay_card_json_3' : JSON.stringify(canvas3.toJSON(["staticBorderColor","maxWidth"])),
      'inlay_card_json_4' : JSON.stringify(canvas4.toJSON(["staticBorderColor","maxWidth"])),
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
        jQuery('#saved-alert').html('');
        jQuery('#saved-alert').html('<div class="alert alert-success alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">?</a> You card design has been successfully saved. Your card access this anytime from Saved Card Design in My Account <a href="/user/'+uid+'/saved_card">Click Here</a></div>');
      }
      if(action == 'shownext' || action == 'showpre'){
        //alert(result);
        //alert("inlay section");
        jQuery('#toolbox').fadeOut("slow",function(){
          //jQuery("#toolbox").empty().append("<div id='loading' style='text-align:center;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' /></div>");
          jQuery('#toolbox').fadeIn('slow');
        });
        //jQuery("#toolbox").empty().append("<div id='loading' style='text-align:center;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' /></div>");
        if (action != 'shownext' && section != 'delivery') {
          jQuery( ".round-btn" ).hide();
        }
        setTimeout(
          function()
          {
            jQuery( "#toolbox" ).html(result);
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
  /////////////END/////////////
}


function saveCanvasImage(){
  if(deal =='getCanvas2'){
    canvas = canvas2;
  }else if(deal =='getCanvas3'){
    canvas = canvas3;
  }else if(deal =='getCanvas4'){
    canvas = canvas4;
  }else{
    canvas = canvas1;
  }
  window.open(canvas.toDataURL('png'));
}

function clearCanvas(){
  if(deal =='getCanvas2'){
    canvas = canvas2;
  }else if(deal =='getCanvas3'){
    canvas = canvas3;
  }else if(deal =='getCanvas4'){
    canvas = canvas4;
  }else{
    canvas = canvas1;
  }
  canvas.clear();
}



function addEmojis(ele){

  if(deal =='getCanvas2'){
    canvas = canvas2;
  }else if(deal =='getCanvas3'){
    canvas = canvas3;
  }else if(deal =='getCanvas4'){
    canvas = canvas4;
  }else{
    canvas = canvas1;
  }

  jQuery(ele).parents('li a').after("<span id='loading' style='text-align:center;' ><img src='/sites/all/themes/simplysay/images/toolboxload.gif' alt='Loading' /></span>");
  jQuery(ele).parents('li a').css( "display", "none" )

  var element = jQuery(ele).parents('li a');

  var emojisrc =jQuery(ele).attr('src');

  jQuery.ajax({
    type: "POST",
    url: "/emojishow",
    data: {
      'src':emojisrc,

    },
    success: function(result) {
      //alert(result);
      //console.log(result);
      element.css( "display", "block" );
      jQuery('#emoji #loading').remove();

      fabric.Image.fromURL(result, function(img) {
        //  var rFilter = new fabric.Image.filters.Resize({
        //   resizeType: 'sliceHack'
        // });
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
    },
    error: function(result) {
      alert('error');
      //alert(result);
    }
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

  for (var i = 12; i < 71; i++) {
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
  if(deal =='getCanvas2'){
    canvas = canvas2;
  }else if(deal =='getCanvas3'){
    canvas = canvas3;
  }else if(deal =='getCanvas4'){
    canvas = canvas4;
  }else{
    canvas = canvas1;
  }
  var removeVal = canvas.getActiveObject();
  if(removeVal != null && typeof(removeVal) != 'undefined'){
    removeVal.remove();
  }
}

function alignText(align){
  if(deal =='getCanvas2'){
    canvas = canvas2;
  }else if(deal =='getCanvas3'){
    canvas = canvas3;
  }else if(deal =='getCanvas4'){
    canvas = canvas4;
  }else{
    canvas = canvas1;
  }
  // var rect = new fabric.Rect({
  //     width: 100,
  //     height: 100,
  //     // fill: '#ffcc12',
  //     opacity: 1
  // });
  var text = canvas.getActiveObject();

  if (align === 'left') {
    text.set({
      textAlign: 'left',
      //originX: 'left',
      //left: rect.left
    });
  }else if(align === 'right'){
    text.set({
      textAlign: 'right',
      //originX: 'right',
      //left: rect.left + rect.width
    });
  }else if(align === 'center'){
    text.set({
      textAlign: 'center',
      //originX: 'center',
      //left: rect.left + rect.width
    });
  }else{
    text.set({
      textAlign: 'justify',
      //originX: 'justify',
      //left: rect.left + rect.width
    });
  }
  canvas.setActiveObject(text);
}
// function getDective(){
//   var getVal = canvas.getDeActiveObject();
//   console.log(getVal);
//   // if(removeVal != null && typeof(removeVal) != 'undefined'){
//   //   removeVal.remove();
//   // }
// }

function removeGrid(){
  if(deal =='getCanvas2'){
    canvas = canvas2;
    grid_personal = 43.5;
  }else if(deal =='getCanvas3'){
    canvas = canvas3;
    grid_personal = 43.5;
    // grid = 42.5;
  }else if(deal =='getCanvas4'){
    canvas = canvas4;
    grid_personal = 43.5;

  }else{
    canvas = canvas1;
    grid_personal = grid;
  }
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
    for (var i = 0; i < 16; i++) {
      canvas.add(new fabric.Line([ i * grid, 0, i * grid, height], { stroke: '#ccc', selectable: false }));
      canvas.add(new fabric.Line([ 0, i * grid_personal, width, i * grid_personal], { stroke: '#ccc', selectable: false }))
    }
    jQuery('.grid').css('background-color','#b4e97a');
    // options.target.set({
    //   left: Math.round(options.target.left / grid) * grid,
    //   top: Math.round(options.target.top / grid) * grid
    // }).setCoords();
  }
  canvas.renderAll();
}

//tool google font load function.
function webfontload(){

  window.WebFont && WebFont.load({
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

function checkGrid(){

  // if(deal =='getCanvas2'){
  //      canvas = canvas2;
  //    }else if(deal =='getCanvas3'){
  //      canvas = canvas3;
  //    }else if(deal =='getCanvas4'){
  //      canvas = canvas4;
  //    }else{
  //      canvas = canvas1;
  //    }
  var objects1 = canvas1.getObjects('line');
  var objects2 = canvas2.getObjects('line');
  var objects3 = canvas3.getObjects('line');
  var objects4 = canvas4.getObjects('line');

  for (let i in objects1) {
    canvas1.remove(objects1[i]);
  }
  for (let i in objects2) {
    canvas2.remove(objects2[i]);
  }
  for (let i in objects3) {
    canvas3.remove(objects3[i]);
  }
  for (let i in objects4) {
    canvas4.remove(objects4[i]);
  }

  jQuery('.grid').css('background-color','#f4f4f4');

}
fabric.util.object.extend(fabric.Textbox.prototype,{
  left:20,
  fontFamily: 'Open Sans',
  fontSize: 22,
  tabbable:true,
  // hasControls:false,
  lockMovementX:true,
  lockMovementY:true,
  lockRotation:true,
  textAlign: 'center'
});

function textcanvas(){

  var text1 = new fabric.Textbox('',{staticBorderColor: "#ccc",top:15, width:460, maxWidth:460, maxHeight: 635}),
      text2 = new fabric.Textbox("",{staticBorderColor: "#ccc",top:15, width:460, maxWidth:460, maxHeight: 145}),
      text3 = new fabric.Textbox("",{staticBorderColor: "#ccc",top:22, width:460, maxWidth:460, maxHeight: 231}),
      text4 = new fabric.Textbox("",{staticBorderColor: "#ccc",top:15, width:460, maxWidth:460, maxHeight: 145});


  // text1.on("selected",text1.enterEditing());
  //activeObj.enterEditing();)


  canvas1.add(text1).setTabbable(true)///*.setActiveObject(text1)*/.setTabIndex(5);``
  canvas2.add(text2).setTabbable(true)///*.setActiveObject(text2)*/.setTabIndex(6);
  canvas3.add(text3).setTabbable(true)///*.setActiveObject(text3)*/.setTabIndex(7);
  canvas4.add(text4).setTabbable(true)///*.setActiveObject(text4)*/.setTabIndex(8);
 }

function textcanvas_landscape(){
  var text1 = new fabric.Textbox("",{staticBorderColor: "#ccc",width:621, left:20, top:20, maxWidth: 621, maxHeight: 462});
  var text2 = new fabric.Textbox("",{staticBorderColor: "#ccc",width:621, left:20, top:20, maxWidth: 621, maxHeight: 116});
  var text3 = new fabric.Textbox("",{staticBorderColor: "#ccc",width:621, left:20, top:20, maxWidth: 621, maxHeight: 145});
  var text4 = new fabric.Textbox("",{staticBorderColor: "#ccc",width:621, left:20, top:20, maxWidth: 621, maxHeight: 116});

  canvas1.add(text1).setTabbable(true);//*.setActiveObject(text1)*/.setTabIndex(1);
  canvas2.add(text2).setTabbable(true);//*.setActiveObject(text2)*/.setTabIndex(2);
  canvas3.add(text3).setTabbable(true);//*.setActiveObject(text3)*/.setTabIndex(3);
  canvas4.add(text4).setTabbable(true);//*.setActiveObject(text4)*/.setTabIndex(4);
}

document.getElementById("canvas_div").onmousedown = function(event) {
  if(deal =='getCanvas2'){
    canvas = canvas2;
  }else if(deal =='getCanvas3'){
    canvas = canvas3;
  }else if(deal =='getCanvas4'){
    canvas = canvas4;
  }else{
    canvas = canvas1;
  }
  var getVal = canvas.getActiveObject();
  // console.log(getVal);
  if (event.which == 3 && getVal !='') {
    jQuery('#right-menu').show();
    jQuery('#right-menu').css({'left':event.offsetX + 'px', 'top':event.offsetY+'px'})
    // document.getElementById('right-menu').style.display = 'block';
    // console.log(getVal);
    document.getElementById('canvas_div').addEventListener("contextmenu", function(e){e.preventDefault();}, false);
  }


  return false;
}


function limit_canvas_area(canvas){

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
}




jQuery(document).ready(function(){

  if(deal =='getCanvas2'){
    canvas = canvas2;
  }else if(deal =='getCanvas3'){
    canvas = canvas3;
  }else if(deal =='getCanvas4'){
    canvas = canvas4;
  }else{
    canvas = canvas1;
  }

  console.log("document.ready");
  console.log(deal);

  limit_canvas_area(canvas1);
  limit_canvas_area(canvas2);
  limit_canvas_area(canvas3);
  limit_canvas_area(canvas4);

  object_selected(canvas1);
  object_selected(canvas2);
  object_selected(canvas3);
  object_selected(canvas4);

  canvas.on('selection:cleared', function() {
    jQuery('.selectTypecase').css('background-color', 'rgb(255, 255, 255)');
  });

  var canvas_type_text = jQuery('#product_canvas_type').val();

  console.log(canvas_type_text);
  if (canvas_type_text == 'landscape') {
    textcanvas_landscape();
  }else{
    textcanvas();
  }

  webfontload();
  //emojis();
  fontmainSize();
  initial_json_set();
  console.log(canvas1.getActiveObject());
  console.log(canvas2.getActiveObject());
  console.log(canvas3.getActiveObject());
  //setBackgroundImage();
  jQuery('#right-menu').hide();
  // document.getElementById('right-menu').style.display ='none';

  // jQuery('#cpInline2').colorpicker({color:'#31859b', defaultPalette:'web'});
  // var demo1 = jQuery('#col');
  //        demo1.colorpickerplus();
  //        // console.log(demo1);
  //        demo1.on('changeColor', function(e,color){
  //      if(color==null)
  //      jQuery(this).val('transparent').css('background-color', '#fff');//tranparent
  //      else
  //          jQuery(this).val(color).css('background-color', color);
  //        });

  // jQuery(canvas).rightclick(function () {

  // });

  jQuery('body').unbind('keydown');
  jQuery('body').keydown(function(e){
    if(deal =='getCanvas2'){
      canvas = canvas2;
    }else if(deal =='getCanvas3'){
      canvas = canvas3;
    }else if(deal =='getCanvas4'){
      canvas = canvas4;
    }else{
      canvas = canvas1;
    }

    if(e.keyCode == 46 || e.keyCode == 127) {
      var getdel = canvas.getActiveObject();

      console.log(getdel);

      if(getdel != null && typeof(getdel) != 'undefined'){
        if (getdel.type == 'textbox' && (canvas==canvas2 || canvas==canvas3 ||canvas==canvas4)) {

        }else{
          removeActive();
        }

      }
    }
  });

  jQuery('#addtext').change(function () {
    if(deal =='getCanvas1'){
      canvas = canvas1;
      var addtext = jQuery(this).val();
      console.log("jQuery(#addtext).change");
      console.log(addtext);
      //var default_font = jQuery( "#FontStyleNumber" ).val();

      // var text = new fabric.IText(""+addtext+"",{
      //                   fontFamily: 'Open Sans',
      //                   fontSize: 22,
      //                   fontWeight: 'bold',
      //                   //shadow: 'rgba(0,0,0,0.2) 0 0 5px',
      //                   class: 'mytext',
      //                   stroke: '#000',
      //                   strokeWidth:0.5,
      //                   // left: Math.floor(Math.random()*350+1),
      //                   // top:  Math.floor(Math.random()*250+1)
      //                 });

      var text = new fabric.Textbox(""+addtext+"",{
        fontFamily: 'Open Sans',
        fontSize: 22,
        class: 'mytext',
        width:476,
        left:12,
        top:12,
        fixedWidth: 476,
        maxWidth: 476,
        maxHeight: 300,
        //lockMovementX:true,
        //lockMovementY:true,
      });
      canvas.add(text).setActiveObject(text);
      updateModifications(true);
      canvas.counter++;
      newleft += 100;
    }
  });

  textArea = document.getElementById('addtext');

  canvas.observe('object:selected', function (e) {
    console.log(1);
    oldStateObject = jQuery.extend(true, {}, e.target);
    oldStateObject.width = oldStateObject.currentWidth;
    oldStateObject.height = oldStateObject.currentHeight;

    var activeObject = e.target;
    if (activeObject.type == 'text') {
      textArea.value = activeObject.text;
    }
  });


  jQuery("#addtextt").keyup(function (e) {
    console.log("jQuery(#addtext).keyup");
    if(deal =='getCanvas2'){
      canvas = canvas2;
    }else if(deal =='getCanvas3'){
      canvas = canvas3;
    }else if(deal =='getCanvas4'){
      canvas = canvas4;
    }else{
      canvas = canvas1;
    }


    //formatted1 = wrapCanvasText(textArea.value, canvas, 500, 175);
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type == 'text') {
      activeObject.text = formatted1;
      canvas.renderAll();
    } else {
      var textSample = new fabric.Textbox(formatted1, {
        left: 12,
        top: 12,
        fontSize: 22,
        fontFamily: 'Open Sans',
        backgroundColor: 'transparent',
        width:477,
        fixedWidth: 477,
        maxWidth:477,
        maxHeight:100,
        scaleX: 0.9,
        scaleY: 0.9,
        hasControls:false,
        stroke: '#000',
        strokeWidth:0.5,
      });
      canvas.add(textSample);
      canvas.setActiveObject(textSample, e);
      canvas.renderAll();
    }
  });

  /****multipoe line text*****/

  jQuery('#FontStyleNumber').change(function () {
    if(deal =='getCanvas2'){
      canvas = canvas2;
    }else if(deal =='getCanvas3'){
      canvas = canvas3;
    }else if(deal =='getCanvas4'){
      canvas = canvas4;
    }else{
      canvas = canvas1;
    }
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
    if(deal =='getCanvas2'){
      canvas = canvas2;
    }else if(deal =='getCanvas3'){
      canvas = canvas3;
    }else if(deal =='getCanvas4'){
      canvas = canvas4;
    }else{
      canvas = canvas1;
    }
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
    if(deal =='getCanvas2'){
      canvas = canvas2;
    }else if(deal =='getCanvas3'){
      canvas = canvas3;
    }else if(deal =='getCanvas4'){
      canvas = canvas4;
    }else{
      canvas = canvas1;
    }
    var color = jQuery(this).css( "background-color" );
    jQuery('#backColorCode').html(rgb2hex(color));
    canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
    canvas.renderAll();
    updateModifications(true);
    canvas.counter++;
    newleft += 100;
  });

  jQuery('.ColorFont').click(function () {
    if(deal =='getCanvas2'){
      canvas = canvas2;
    }else if(deal =='getCanvas3'){
      canvas = canvas3;
    }else if(deal =='getCanvas4'){
      canvas = canvas4;
    }else{
      canvas = canvas1;
    }
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

  // jQuery('.selectTypecase').click(function () {
  //   if(deal =='getCanvas2'){
  //    canvas = canvas2;
  //  }else if(deal =='getCanvas3'){
  //    canvas = canvas3;
  //  }else if(deal =='getCanvas4'){
  //    canvas = canvas4;
  //  }else{
  //    canvas = canvas1;
  //  }
  //   var selectTypecase = canvas.getActiveObject();
  //   jQuery('.selectTypecase').css('background-color', 'rgb(255, 255, 255)');
  //     if(typeof(selectTypecase) !="undefined"){
  //          var dataTab =jQuery(this).css('background-color');
  //          if(dataTab == "rgb(255, 255, 255)" && runCode == 0){
  //            runCode =1;
  //              selectTypecase.set({fontWeight: jQuery(this).val()});
  //            jQuery(this).css('background-color', '#b4e97a');
  //          }else{
  //            runCode =0;
  //            selectTypecase.set({fontWeight: "normal"});
  //            jQuery(this).css('background-color', 'rgb(255, 255, 255)');
  //          }
  //          canvas.renderAll();
  //          updateModifications(true);
  //          canvas.counter++;
  //          newleft += 100;
  //      }
  //  });

  jQuery('.selectTypecase').click(function () {

    if(deal =='getCanvas2'){
      canvas = canvas2;
    }else if(deal =='getCanvas3'){
      canvas = canvas3;
    }else if(deal =='getCanvas4'){
      canvas = canvas4;
    }else{
      canvas = canvas1;
    }
    //var selectTypecase = canvas.getActiveObject();
    var thisval = jQuery(this).val();
    var selectTypecase = canvas.getActiveObject();
    console.log(selectTypecase);
    if(selectTypecase == null){
      jQuery('.selectTypecase').css('background-color', 'rgb(255, 255, 255)');
    }
    //jQuery('.selectTypecase').css('background-color', 'rgb(255, 255, 255)');
    if(typeof(selectTypecase) !="undefined"  || typeof(selectTypecase) != null){

      if(thisval == 'bold'){

        if(selectTypecase.get('fontWeight') == 'bold') {
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
        if (selectTypecase.get('textDecoration') == 'underline') {
          jQuery(this).css('background-color', 'rgb(255, 255, 255)');
          selectTypecase.set({textDecoration: "normal"});
        }else{
          jQuery(this).css('background-color', '#b4e97a');
          selectTypecase.set({textDecoration: thisval});
        }
      }

      if(thisval == 'textstroke'){
        if (selectTypecase.get('strokeWidth') > 0 ) {
          jQuery(this).css('background-color', 'rgb(255, 255, 255)');
          selectTypecase.set({
            stroke: '#00FFFFFF',
            strokeWidth:0,
          });
        }else{
          jQuery(this).css('background-color', '#b4e97a');
          selectTypecase.set({
            stroke: '#000',
            strokeWidth:0.5,
          });
        }
      }
      canvas.renderAll();
      updateModifications(true);
      canvas.counter++;
      newleft += 100;
    }else{
      jQuery('.selectTypecase').css('background-color', 'rgb(255, 255, 255)');
    }
  });

  jQuery('.previewIMG').on('click','.IMGView', function () {
    if(deal =='getCanvas2'){
      canvas = canvas2;
    }else if(deal =='getCanvas3'){
      canvas = canvas3;
    }else if(deal =='getCanvas4'){
      canvas = canvas4;
    }else{
      canvas = canvas1;
    }
    var imageget = jQuery(this).attr('src');
    var width = 150;
    var height = 50;
    fabric.Image.fromURL(imageget, function(img) {
      img.scale(0.5).set({
        top: 20,
        width : width,
        height : height,
      });

      canvas.add(img).setActiveObject(img);
      updateModifications(true);
      canvas.counter++;
      newleft += 100;
    });
  });


  jQuery('#mytext').change(function () {
    if(deal =='getCanvas2'){
      canvas = canvas2;
    }else if(deal =='getCanvas3'){
      canvas = canvas3;
    }else if(deal =='getCanvas4'){
      canvas = canvas4;
    }else{
      canvas = canvas1;
    }
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
    var width = 150;
    var height = 50;
    // return false;
    if(countImg <= 10){
      reader.onload = function(f) {
        var data = f.target.result;
        //file.name
        var react = fabric.Image.fromURL(data, function(img) {
          img.scale(0.5).set({
            // left: 200,
            top: 20,
            width : 150,
            height : 50,
            // angle: -15
            id :'IMG'+countImg,
          });
          canvas.add(img).setActiveObject(img);
          appendHTML =" <li class='prevClose'><span class='fa fa-close closeIMG'></span><img class='IMGView' id='IMG"+countImg+"' src="+data+"></li>";
          jQuery('.previewIMG').append(appendHTML);
          updateModifications(true);
          canvas.counter++;
          newleft += 100;
          jQuery('.closeIMG').click(function () {
            var valBox = jQuery(this).next();
            var valBoxClass = jQuery(this).next().attr('id');
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
  });


});
