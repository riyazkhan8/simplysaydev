





createPreview = function(slide, token, SLIDE_TEMPLATE){


  function _createFrontPageCanvas(slide,token,SLIDE_TEMPLATE){
    var _front = slide || {objects: []};
    _front.objects.push({
      type: "barcode",
      text: token,
      left: SLIDE_TEMPLATE.barcodeX,
      top: SLIDE_TEMPLATE.barcodeY,
      scaleX: 0.5,
      scaleY: 0.5
    });
    _front.application = outlayTool;

    return new fabric.StaticCanvas(_front);
  }

  function _createDoubleExportSVG (lSlide,rSlide,options){
    var _h = lSlide.height;
    var _w = lSlide.width;

//old
    var svgWidth = 642;
    var svgHeight = 889;
    var scaleX = 615 / 661, scaleY =  430 / 500;

    //new
    if(false) {
      var _desiredWidth = 8.9 * 96;
      var _desiredHeight = 12.3 * 96;
      var scaleX = _desiredWidth / (661 + 28), scaleY = _desiredHeight / (500 * 2 + 28);
      var svgWidth = _desiredWidth;//(661 + 28) * scaleX; //642 ..//8.9   * 90
      var svgHeight = _desiredHeight;// 500 * 2 +28  * scaleY; //889   // 12.3 * 90
    }

    var canvas = lSlide;
    var markup = [];
    // canvas._setSVGPreamble(markup, {});
    canvas._setSVGHeader(markup, {
      width: svgWidth ,
      height: svgHeight ,
      viewBox : {x: 0, y: 0, width: svgWidth , height: svgHeight}});


    markup.push(
      _makeLines(0,0,0),
      _makeLines(svgWidth,0,90),
      _makeLines(svgWidth,svgHeight,180),
      _makeLines(0,svgHeight,270));

    var _clipPath = '<defs><clipPath id="slide"><rect x="0" y="0" width="' + _w + '" height="' + _h  + '" /></clipPath></defs>';
    markup.push(_clipPath);

    if(options.orientation === "portrait"){
      markup.push('<g transform="scale(' + scaleX + ' ' + scaleY + ') rotate(-90) translate(-1017 14)">');//1014
      markup = markup.concat(lSlide.getSVGBody({left: 0, top:0,clipPath: "slide"}));
      markup = markup.concat(rSlide.getSVGBody({left:500, top:0,clipPath: "slide"}));
      markup.push('</g>');
    }
    if(options.orientation === "landscape"){
      if(options.page === "outlay"){
        markup = markup.concat(lSlide.getSVGBody({angle: -180 , left: -629, top: -444,scaleX: scaleX, scaleY: scaleY, clipPath: "slide"}));
        // markup.push('<g transform-origin="center" transform="rotate(-180) translate(0 430)">');
      }else{
        markup = markup.concat(lSlide.getSVGBody({left: 14, top:14,scaleX: scaleX, scaleY: scaleY, clipPath: "slide"}));
      }
      // if(options.page === "outlay") {
      //   markup.push('</g>');
      // }
      markup = markup.concat(rSlide.getSVGBody({left:14, top:444,scaleX: scaleX, scaleY: scaleY, clipPath: "slide"}));
    }



    markup.push('</svg>');
    markup = markup.join('');

    return markup;
  }

  function _pageTurner(id){
    var pagesContainer = $(document.getElementById(id));
    var pages = pagesContainer.children();
    var grabs = false; // Gonna work on this, one day
    pagesContainer.addClass("closed-front");

    pages.each(function(i) {
      var page = $(this);
      if (i % 2 === 0) {
        page.css('z-index', (pages.length - i));
      }
    });

    pages.click(function _setPage() {
      var page = $(this);
      var page_num = pages.index(page) + 1;

      if(page_num == 2){
        pagesContainer.addClass("closed-front");
        pagesContainer.removeClass("closed-rear");
      }else if( page_num == pages.length - 1){
        pagesContainer.removeClass("closed-front");
        pagesContainer.addClass("closed-rear");
      }else{
        pagesContainer.removeClass("closed-front");
        pagesContainer.removeClass("closed-rear");
      }
      //
      // if(pages.length - page_num < 2){
      //   return;
      // }
      if (page_num % 2 === 0) {
        page.removeClass('flipped');
        page.prev().removeClass('flipped');
      } else {
        page.addClass('flipped');
        page.next().addClass('flipped');
      }
    });

    if (grabs) {
      $('.page').on('mousedown', function(e) {
        var page = $(this);
        var page_num = pages.index(page) + 1;
        var page_w = page.outerWidth();
        var page_l = page.offset().left;
        var grabbed = '';
        var mouseX = e.pageX;
        if (page_num % 2 === 0) {
          grabbed = 'verso';
          var other_page = page.prev();
          var centerX = (page_l + page_w);
        } else {
          grabbed = 'recto';
          var other_page = page.next();
          var centerX = page_l;
        }

        var leaf = page.add(other_page);

        var from_spine = mouseX - centerX;

        if (grabbed === 'recto') {
          var deg = (90 * -(1 - (from_spine/page_w)));
          page.css('transform', 'rotateY(' + deg + 'deg)');

        } else {
          var deg = (90 * (1 + (from_spine/page_w)));
          page.css('transform', 'rotateY(' + deg + 'deg)');
        }

        leaf.addClass('grabbing');

        $(window).on('mousemove', function(e) {
          mouseX = e.pageX;
          if (grabbed === 'recto') {
            centerX = page_l;
            from_spine = mouseX - centerX;
            var deg = (90 * -(1 - (from_spine/page_w)));
            page.css('transform', 'rotateY(' + deg + 'deg)');
            other_page.css('transform', 'rotateY(' + (180 + deg) + 'deg)');
          } else {
            centerX = (page_l + page_w);
            from_spine = mouseX - centerX;
            var deg = (90 * (1 + (from_spine/page_w)));
            page.css('transform', 'rotateY(' + deg + 'deg)');
            other_page.css('transform', 'rotateY(' + (deg - 180) + 'deg)');
          }

          console.log(deg, (180 + deg) );
        });


        $(window).on('mouseup', function(e) {
          leaf
            .removeClass('grabbing')
            .css('transform', '');

          $(window).off('mousemove');
        });
      });
    }

    pagesContainer.addClass('bound');
  }

  function _makeLines(x,y,angle){
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + angle + ')">' +
      ' <line x1="26" y1="0" x2="26" y2="14" style="stroke: #000;"></line>' +
      '<line x1="0" y1="26" x2="14" y2="26" style="stroke: #000;"></line>' +
      '</g>';
  }


  var frontPage = _createFrontPageCanvas(slide, token ,SLIDE_TEMPLATE);

  return {
    savePDF: function(){
      //
      // function resetDefaultStyles(doc) {
      //   doc.fillColor('black')
      //     .fillOpacity(1)
      //     .strokeColor('black')
      //     .strokeOpacity(1)
      //     .lineWidth(1)
      //     .undash()
      //     .fontSize(12)
      //     .font('Helvetica');
      // }
      //
      let doc = new PDFDocument({compress: false, size : [ 8.9 * 72, 12.3 * 72]}); // It's easier to find bugs with uncompressed files
      doc.font('fonts/Papyrus.ttf', 'Papyrus');
      doc.font('fonts/OpenSans-Regular.ttf', 'Open San');

      SVGtoPDF(doc, document.getElementById('svg-container-1').firstChild, 0, 0);
      doc.addPage();
      SVGtoPDF(doc, document.getElementById('svg-container-2').firstChild, 0, 0);

      let stream = doc.pipe(blobStream());
      stream.on('finish', function() {
        let blob = stream.toBlob('application/pdf');
        // if (navigator.msSaveOrOpenBlob) {
        //   navigator.msSaveOrOpenBlob(blob, 'File.pdf');
        // } else {
        //   document.getElementById('pdf-file').setAttribute('src', URL.createObjectURL(blob));
        // }
        var _url = URL.createObjectURL(blob);
        var win = window.open(_url, '_blank');
        win.focus();
      });
      doc.end();
      // doc.save('two-by-four.pdf')

    },
    createBook: function(){
      var pages = $("#preview-book .page");
      $(pages[0]).empty().append(outlayTool.canvas.toSVG());
      $(pages[1]).empty().append(inlayTool.slides[0].toSVG());
      $(pages[2]).empty().append(inlayTool.slides[1].toSVG());
      $(pages[3]).empty().append(frontPage.toSVG());
      _pageTurner("preview-book");
    },
    saveSVG: function(preview){
      var p1 = frontPage, p2 = outlayTool.canvas, p3 = inlayTool.slides[0], p4 = inlayTool.slides[1];
      var full_card_svg = _createDoubleExportSVG(p1,p2,{ orientation: fabric.config.orientation,page: "outlay"});
      var full_card_svg_inlay = _createDoubleExportSVG(p3,p4,{orientation: fabric.config.orientation,page: "inlay"});
      if(preview){
        $("#svg-container-1").empty().append(full_card_svg);
        $("#svg-container-2").empty().append(full_card_svg_inlay);
      }

      simplysay_usersavedata({
        'nid': fabric.config.nid,
        'pid': fabric.config.pid,
        'cid': fabric.config.cid,
        'full_card_svg': full_card_svg,
        'full_card_svg_inlay': full_card_svg_inlay
      });
    }
  }
};

