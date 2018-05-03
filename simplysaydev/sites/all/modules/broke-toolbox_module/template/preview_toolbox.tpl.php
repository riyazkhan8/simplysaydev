<div class="container">

    <div class="previewContainer">
        <div class="book <?=$orientation?>" >
            <p class="preview-text">Click to Preview</p>
            <div class="pages " id="preview-book">
                <div class="page"></div>
                <div class="page"></div>
                <div class="page"></div>
                <div class="page"></div>
            </div>
        </div>

        <div>
            <div class="svg-container" id="svg-container-1" style="display: none"></div>
            <div class="svg-container"  id="svg-container-2" style="display: none"></div>
        </div>
    </div>

    <div class="col-sm-12">
        <div class="blue-round-btns">
            <a class="btn-blue-prv" onclick="$('#preview-container').hide();$('#inlay-container').show();">Prev</a>
            <a class="btn-blue-nxt" onclick="previewTool.saveSVG(); $('#preview-container').hide(); showDelivery()">Next</a>
        </div>
    </div>
</div>





