/**
 * @file editor tools configuration
 * @author Denis Ponomarev
 * @copyright simplysay.sg
 */
(function (exports) {

  /**
   * CARD Types defined in Taxonomy Drupal Section
   */
  var CARD_TYPES = exports.CARD_TYPES = {
    SAMPLE: 1,
    BLANK: 2,
    PHOTO: 4,
    STANDART: 5
  };


  var CARD_ORIENTATION = {
    landscape: {
      width: 661,
      height: 500,
      barcodeX: 586,
      barcodeY: 430,
      inlayLeft: {
        objects: [
          {type: "textbox", left: 30, top: 30, width: 600, maxHeight: 442}
        ]
      },
      inlayRight: {
        objects: [
          {type: "textbox", left: 30, top: 30, width: 600, maxHeight: 116},
          {type: "textbox", left: 30, top: 173, width: 600, maxHeight: 145},
          {type: "textbox", left: 30, top: 345, width: 600, maxHeight: 116}
        ]
      }
    },
    portrait: {
      width: 500,
      height: 661,
      barcodeX: 425,
      barcodeY: 585,
      inlayLeft: {
        objects: [
          {type: "textbox", left: 30, top: 30, width: 440, maxHeight: 610},
        ]
      },
      inlayRight: {
        objects: [
          {type: "textbox", left: 30, top: 30, width: 440, maxHeight: 145},
          {type: "textbox", left: 30, top: 215, width: 440, maxHeight: 231},
          {type: "textbox", left: 30, top: 490, width: 440, maxHeight: 145}
        ]
      }

    }
  };

  var SLIDE_TEMPLATE;

  exports.simplysay_usersavedata = function (data) {
    return $.post("/usersavedata", data)
      .fail(function (result) {
        console.error("usersavedata", result);
        // alert('error');
        return {};
      })
      .then(function (result) {
        if (!result) {
          alert("Data not saved");
        }
      })
  };
  /**
   * all interactiobs with server
   */
  exports.simplysay_usergetdata = function (config) {

    if (config.nid !== null && config.pid !== null && config.nid !== "undefined" && config.pid !== "undefined") {
      return $.post("/usergetdata", {
        nid: config.nid,
        pid: config.pid,
        cid: config.cid
      })
        .fail(function (result) {
          console.error("usergetdata", result);
          // alert('error');
          return {};
        })
        .then(function (result) {
          result = jQuery.parseJSON(result);
          for (var i in result.slides) {
            if (result.slides[i]) {
              result.slides[i] = jQuery.parseJSON(result.slides[i])
            }
          }
          return result;
        })
    } else {
      return new Promise(function (rs) {
        rs({})
      });
    }
  };

  /**
   * Load Idea
   * @param pid
   * @param callback
   */
  exports.simplysay_loadTempalate = function (pid, callback) {
    $.post("/sampleshow", {pid: pid})
      .fail(function (result) {
        console.error("sampleshow", result);
        alert('error');
        return {};
      })
      .then(function (result) {
        callback(jQuery.parseJSON(result));
      })
  };


  exports.toggleFirstCanvas = function () {
    var el = $('#inlay-canvas .canvas-container:first');
    el.animate({height: el.height() ? 0 : el.children()[0].height});
  };

  exports.createSimplySayEditor = function (config) {

    fabric.config = {
      uid: config.uid,
      nid: config.nid,
      pid: config.pid,
      cid: config.cid,
      cardType: config.cardType,
      orientation: config.orientation,
      deliveryType: config.delivery_type,
    };

    config.template = CARD_ORIENTATION[config.orientation];
    config.actions = {
      Editor: {
        toggleGrid: {
          className: "clip-icon clip_box_icon5",
          title: 'Grid'
        },
        clearObjects: {
          title: 'Clear All',
          className: "clip-icon clear_All",
          action: function () {
            this.canvas.saveState(["backgroundImage", "backgroundColor"]);
            this.canvas.set({
              backgroundImage: null,
              backgroundColor: '#FFFFFF',
            });

            let _old_objects = this.canvas._clearObjects();
            this.canvas.fire('canvas:cleared', {objects: _old_objects});
            this.canvas.renderAll();
          }
        },
        undo: {
          className: 'clip-icon undo'
        },
        redo: {
          className: 'clip-icon redo'
        },
        save: {
          className: 'clip-icon save'
        }
      },
      Canvas: {
        addText: {
          className: "clip-icon text"
        },
        backgroundColor: {
          className: "clip-icon bg_colour"
        },
        social: {
          className: 'clip-icon facebook',
          title: "Upload Photo (Social Network)",
          action: function () {
            $(".bs-example-modal-sm").modal("show");
          }
        },
        uploadImage: {
          className: "clip-icon camera",
          key: 'U',
          title: 'Upload Photo'
        },
        uploadBackgroundImage: {
          className: 'clip-icon bg_image',
          title: 'Set Background Image',
          action: function () {
            this.uploadImage({data: "background"})
          }
        }
      },
      Object: {
        fill: {
          className: 'clip-icon bg_colour'
        },
        remove: {
          className: 'clip-icon delete'
        },
        bringForward: {
          title: 'Bring forward',
          className: 'clip-icon move_front'
        },
        sendBackwards: {
          className: 'clip-icon move_back'
        },
        bringToFront: {
          className: 'clip-icon send_to_front'
        },
        sendToBack: {
          className: 'clip-icon send_to_back'
        },
      },
      Textbox: {
        textFontSizeMenu: {
          className: 'fa fa-text-height',
          menu: ['textFontSize']
        }
      },
      Photo: {
        filters: {
          previewWidth: 30,
          previewHeight: 30,
        }
      }
    };
    config.webfonts = {
      /**
       * this fonts will be included in toolbar FontFamily list
       */
      native: [
        "Arial",
        "Arial Black",
        "Comic Sans MS",
        "Lucida Console",
        "Tahoma",
        "Times New Roman"
      ],
      /**
       * this section required to wait for custom fonts to be loaded before canvas will be created.
       * to avoid FontFamilies related Bugs in initial rendering and SVG export
       */
      custom: [
        "Papyrus"
      ],
      google: [
        'Encode Sans Condensed',
        'Kaushan Script',
        'Oswald',
        'Open Sans',
        'Oxygen',
        'Poppins',
        'PT Sans',
        'Patrick Hand SC',
        'Raleway',
        'Roboto',
        'Tangerine',
        'Ubuntu'
      ]
    };

    window.inlayTool = createInlayTool(config);
    window.outlayTool = createOutlayTool(config);

    simplysay_usergetdata(config).then(function (data) {

      window.previewTool = createPreview(data.slides[0], data.orderToken, config.template);

      outlayTool.setSlide(data.slides[1]);

      inlayTool.setSlides([
        fabric.util.object.extend(config.template.inlayLeft, data.slides[2]),
        fabric.util.object.extend(config.template.inlayRight, data.slides[3])
      ]);
      if(config.orientation === "landscape"){
        $('#inlay-canvas .canvas-container:first').height(0);
      }
    });
  }


})(window);
