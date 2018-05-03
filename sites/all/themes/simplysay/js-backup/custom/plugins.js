jQuery(document).ready(function($){

   // $('#cpInline2').colorpicker({color:'#31859b', defaultPalette:'web'});
 var demo1 = $('#demo1');
        demo1.colorpickerplus();
        console.log(demo1);
        demo1.on('changeColor', function(e,color){
      if(color==null)
      $(this).val('transparent').css('background-color', '#fff');//tranparent
      else
          $(this).val(color).css('background-color', color);
        });

   

   $('#FontStyleNumber').change(function () {
   
       canvas.getActiveObject().set({fontFamily: $(this).val()});
       canvas.renderAll();
    });
 
  
  $('#FontSizeNumber').change(function () {
   
       canvas.getActiveObject().set({fontSize: $(this).val()});
       canvas.renderAll();
    });

   $('#selectTypecase').change(function () {
   
       canvas.getActiveObject().set({fontWeight: $(this).val()});
       canvas.renderAll();
    });

     $('#mytext').change(function () {
   
       canvas.getActiveObject().set({text: $(this).val()});
       canvas.renderAll();
    });


     $("#myImage").change(function (e) {
        
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onload = function(f) {
            var data = f.target.result;

              var react = fabric.Image.fromURL(data, function(img) {
              img.scale(0.5).set({
                // left: 200,
                top: 200,
                // angle: -15
              });
                canvas.add(img);
             });
            
        };

        reader.readAsDataURL(file);

     })

}); 


