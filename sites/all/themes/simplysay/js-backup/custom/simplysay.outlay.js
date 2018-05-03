/**
 * Create Outlay Card editor with images
 * @param config
 * @returns fabric.Editor
 */
function createOutlayTool(config ) {

  return new fabric.Editor({
    id: "outlay-tool",
    debug: true,
    mediaRoot: config.mediaRoot,
    loader:   "outlay-loader",
    pending: true,
    canvasContainer: "outlay-canvas",
    save: function () {
      simplysay_usersavedata({
        'nid': fabric.config.nid,
        'pid': fabric.config.pid,
        'cid': fabric.config.cid,
        'outlay_card_json': JSON.stringify(this.canvas.toObject()),
        'image_data': this.canvas.toDataURL()
      });
    },
    uploader: {
      multiple: true,
      validation: function (file, data) {
        if (this.galleries.photo.elements.length === 10) {
          return false;
        }
        return true;
      },
      callback: function (canvas, data, image, event) {
        aws_upload(event.target.result, 'localfile',this.galleries.photo.elements.length);

        switch (data) {
          case "background":
            canvas.setBackgroundImage(image);
            canvas.renderAll();
            break;
          default:
            this.fire("gui:photo")
            this.galleries.photo.add({
              preview: "image",
              type: "photo",
              image: image
            });
          //canvas.createImageObject(image);
        }
      }
    },
    eventListeners: {
      "gallery:removed": function (e) {
        aws_delete(e.index)
      }
    },
    // facebook: {
    //   // appId: '502413663476958'
    //   appId: '920058621510043'
    // },
    // instagram: {
    //   clientID: "623198827dc54f7c80b19f349e87dcc0",
    //     redirectURI: location.protocol + "//" + location.host + "/fieraGit/examples/instagram_redirect"
    // },
    webfonts: config.webfonts,
    toolbars: {
      application: {
        container: "application-menu"
      },
      canvas: {
        container: "slide-menu",
        colorpicker: {
          opacity: false,
          position: "bottom right"
        }
      },
      objects: {
        container: "object-menu",
        colorpicker: {
          opacity: false,
          position: "bottom left"
        },
        position: {
          marginY: -40,
          marginX: -10
        }
      },
      tools: {
        Editor: fabric.config.cardType === CARD_TYPES.STANDART ? ["save"] : [
          "save",
          "clearObjects",
          "undo",
          // "records",
          "redo",
          "toggleGrid"
        ],
        Canvas: function () {
          switch (fabric.config.cardType) {
            case CARD_TYPES.STANDART: return [];
            case CARD_TYPES.PHOTO:    return ["addText" ];
            case CARD_TYPES.BLANK:    return [ "addText","backgroundColor"]
          }
        }(),
        Object: [
          "moveUp",
          "moveDown",
          "moveLeft",
          "moveRight",
          "remove"
        ],
        Image: [
          "*",
          "order"
        ],
        Photo: [
          "*",
          "filters",
          "crop",
          "stretch",
          "rotateLeft",
          "rotateRight",
          "duplicate"
        ],
        Emoji: [
          "*",
          "rotateLeft",
          "rotateRight"
        ],
        Clipart: [
          "*",
          "rotateLeft",
          "rotateRight"
        ],
        Textbox: [
          "*",
          "textAlign",
          "textBold",
          "textItalic",
          "textUnderline",
          "fontFamily",
          "textFontSizeMenu",
          "fill",
          "order",
          "duplicate"
        ]
      }
    },
    history: fabric.HISTORY_MODE.SHARED,
    onResize: function(pSize,oSize){
      pSize.width = Math.max(200,Math.min(661, $(window).width() - 390));
      pSize.height = Math.max(200,Math.min(661, $(window).height() - 50));

      var _prop = fabric.util.getProportions(oSize,pSize);
      this.canvas.setZoom(_prop.scale);
      this.canvas.setDimensions(_prop);
    },
    prototypes: {
      Canvas: {
        inlineSVG: true,
        frontObjectsSelectionPriority: true,
        backgroundColor: "#FFFFFF",
        originalWidth: config.template.width,
        originalHeight: config.template.height,
        stateful: true,
        gridColor: "#cccccc",
        includeDefaultValues: false,
        controlsAboveOverlay: true,
        droppable: true,
        offsets: 5,
        deafultText: "Add some text here",
        defaultTextType: "textbox",
        gridSize: 41.6,
        grid: false,
        snapping: false,
        drawSnapping: true,
        defaultArea: "#__0",
        backgroundPosition: "fit",
        overlayPosition: "fit",
        stretchable: true
        // autoCenterAndZoomOutEnabled: true,
        // minZoomFactor: 0.9,
        // handModeEnabled: true,
        // interactiveMode: "mixed",
        // zoomToPointEnabled: true,
        // mouseWheelEnabled: true,
        // zoomCtrlKey: false
      },
      Object: {
        movementDelta: 1,
        includeDefaultValues: false,
        movementLimitMode: "content",
        movementLimits: "canvas"
      },
      Image:   {
        layer: "objects"
      },
      Photo:   {$super: "Image"},
      Emoji:   {$super: "Image"},
      Clipart: {$super: "Image"},
      Textbox: {
        layer: "overlay",
        tabbable: true,
        fixedWidth: true,
        width: 300,
        borderColor: "#3DAFF6",
        fontFamily: "Open Sans",
        fontSize: 22,
        textAlign: 'center'
      }
    },
    actions: config.actions,
    slide: {},
    galleries: {
      draggableArea: ".main_container",
      photo: (fabric.config.cardType === CARD_TYPES.PHOTO || fabric.config.cardType === CARD_TYPES.BLANK) && {
        container: "photos-gallery",
        elements: config.photosGallery,
        mapper: function (val) {
          return {
            preview: "image",
            type: "photo",
            src: config.photosPath + val
          }
        },
        options: {
          activateOptions: {
            width: 250
          },
          itemClass: "prevClose",
          removeButtonTemplate: '<span class="fa fa-close closeIMG">',
          removable: true
        }
      },
      backgrounds: fabric.config.cardType === CARD_TYPES.BLANK && {
        container: "backgrounds-gallery",
        elements: config.bgGallery,
        mapper: function (val) {
          return {
            preview: "image",
            role: "background",
            type: "image",
            src: config.bgPath + val,
            category: "clipart"
          }
        }
      },
      clipart: fabric.config.cardType === CARD_TYPES.BLANK && {
        container: "objects-gallery",
        elements: config.clipartGallery,
        mapper: function (val) {
          return {
            preview: "image",
            type: "clipart",
            src: config.clipartPath + val
          }
        },
        options: {
          activateOptions: {
            width: 250
          }
        }
      },
      emoji: fabric.config.cardType === CARD_TYPES.BLANK && {
        container: "emoji-gallery",
        elements: config.emojiGallery,
        mapper: function (val) {
          return {
            preview: "image",
            type: "emoji",
            src: config.emojiPath + val
          }
        },
        options: {
          activateOptions: {
            width: 250
          }
        }
      },
      ideas: fabric.config.cardType === CARD_TYPES.BLANK && {
        container: "ideas-gallery",
        elements: config.ideasGallery,
        mapper: function (val) {
          return {
            preview: "image",
            type: "template",
            pid: val.value,
            src: val.thumbnail
          }
        },
        options: {
          draggable: false,
          activate: function (val) {
            var _this = this;
            simplysay_loadTempalate(val.pid, function(templateData){
              _this.canvas.createObjects(templateData.objects);
            });
          }
        }
      }
    },
    callback: function () {
      var _actions = this.canvas.actions;
      this.photoToolbar = new fabric.Toolbar(this.canvas, "aside-photo-toolbar", [
        _actions.uploadImage,
        _actions.social
      ]);

      this.bgToolbar = new fabric.Toolbar(this.canvas, "aside-bg-toolbar", [
        _actions.uploadBackgroundImage
      ]);
    }
  });
}
