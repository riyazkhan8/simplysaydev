
<div class="editorContainer">
    <div class="documentContainer">
        <div class="toolbarContainer">
            <div id="inlay-object-menu" class="toolbar-menu toolbar-menu-simple"></div>
            <div id="inlay-application-menu" class="toolbar-menu"></div>
            <div id="inlay-slide-menu" class="toolbar-menu"></div>
        </div>
        <div id="inlay-canvas" class="pageContainer <?=$orientation?>">
            <span id="inlay-loader" class="canvas-loader"><img class="loader-spinner" src="http://stage.simplysay.sg/sites/all/themes/simplysay/images/toolboxload.gif"><span class="loader-message">loading</span></span>
        </div>
    </div>
</div>

<div class="col-sm-12">
    <div class="blue-round-btns">
        <a class="btn-blue-prv" onclick="inlayTool.save();$('#inlay-container').hide();$('#outlay-container').show();">Prev</a>
        <a class="btn-blue-nxt" onclick="inlayTool.save(); previewTool.createBook(); $('#inlay-container').hide();$('#preview-container').show();">Next</a>
    </div>
</div>
