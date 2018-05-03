
/**
 * create Inlay Card editor with Textboxes
 * @param config
 * @returns fabric.Application
 */
function createInlayTool(config) {
  return new fabric.Editor({
    id: "inlay-tool",
    loader:   "inlay-loader",
    pending: true,
    save: function(){
      simplysay_usersavedata({
        'nid': fabric.config.nid,
        'pid': fabric.config.pid,
        'cid': fabric.config.cid,
        'inlay_card_json_1': JSON.stringify(this.slides[0].toObject()),
        'inlay_card_json_2': JSON.stringify(this.slides[1].toObject())
      });
      if(fabric.config.uid){
        user_redirect_session();
      }
    },
    canvasContainer: "inlay-canvas",
    debug: true,
    previewMode: fabric.PREVIEW.ALL,
    webfonts: config.webfonts,
    toolbars: {
      application: {
        container: "inlay-application-menu",
      },
      objects: {
        container: "inlay-object-menu",
        colorpicker: {
          opacity: false,
          position: "bottom left"
        },
        position: {
          marginY: -5,
          marginX: 0
        }
      },
      tools: {
        Editor: [
          "save",
          "undo",
          // "records",
          "redo"
        ],
        Textbox:  [
          "textAlign",
          "textBold",
          "textItalic",
          "textUnderline",
          "fontFamily",
          "textFontSizeMenu",
          "fill"
        ],
      }
    },
    actions: config.actions,
    history: fabric.HISTORY_MODE.SHARED,
    prototypes: {
      Object: {
        includeDefaultValues: false,
      },
      Canvas: {
        backgroundColor: "#FFFFFF",
        selection: false,
        originalWidth: config.template.width,
        originalHeight: config.template.height,
        stateful: true,
        includeDefaultValues: false,
        storeProperties: ["objects"],
        tabbable: true,
        gridSize: 41.6
      },
      Textbox: {
        tabbable: true,
        easyEdit: true,
        fixedWidth: true,
        text: "",
        borderColor: "#3DAFF6",
        staticBorderColor: "#CCC",
        left: 20,
        fontFamily: "Open Sans",
        fontSize: 22,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        textAlign: 'center'
      }
    },
    slides: [
      config.template.inlayLeft,
      config.template.inlayRight
    ],
    activeSlide: 1
  });
}
