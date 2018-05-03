<?php
global $base_path;
global $user;

define("CANVAS_SAMPLE", 1);
define("CANVAS_BLANK", 2);
define("CANVAS_BLANK_PORTRAIT", 3);
define("CANVAS_PHOTO", 4);
define("CANVAS_STANDART", 5);

if (!empty($nid)) {
    $tid='';
    $node = node_load($nid);
    $product =  commerce_product_load($node->field_product_refer['und'][0]['product_id']);
    $tid = $product->field_card_type['und'][0]['tid'];
    //todo
    //@ponomarevtlt: I dont understand why we need landscape nand portrait types here. we have product_canvas_type. easier to have only one
    if( $tid == CANVAS_BLANK_PORTRAIT ){
        $tid = CANVAS_BLANK;
    }

}
?>


<div class="main_container" id="outlay-container">

    <div class="editorContainer">

        <div class="documentContainer">
            <div class="toolbarContainer">
                <div id="application-menu" class="toolbar-menu"></div>
                <div id="slide-menu" class="toolbar-menu"></div>
                <div id="object-menu" class="toolbar-menu toolbar-menu-simple"></div>
            </div>
            <div class="pageContainer <?=$orientation?>">

      <? if($orientation == "portrait"): ?>
      <canvas width="500" height="661" style="max-width: 100%;max-height: 100%;" id="outlay-canvas"></canvas>
      <? else:?>
      <canvas width="661" height="500" style="max-width: 100%;max-height: 100%;" id="outlay-canvas"></canvas>
      <? endif;?>
      
                <span id="outlay-loader" class="canvas-loader"><img class="loader-spinner" src="https://s3-dev.simplysay.sg/s3fs-public/site_images/toolboxload.gif"><span class="loader-message">loading</span></span>
            </div>
        </div>

        <? if($tid != CANVAS_STANDART): ?>
            <aside class="objectPanel" >
                <ul class="nav-tabs" role="tablist" data-tabgroup="second-tab-group">
                    <li class="active" role="presentation">
                        <a href="#photos-tool" aria-controls="photos-tool" role="tab" data-toggle="tab">Photos</a>
                    </li>
                    <? if($tid != CANVAS_PHOTO): ?>
                        <li role="presentation">
                            <a href="#emoji-tool" aria-controls="emoji-tool" role="tab" data-toggle="tab">Emojis</a>
                        </li>
                        <li role="presentation">
                            <a href="#backgrounds-tool" aria-controls="backgrounds-tool" role="tab" data-toggle="tab">Scenes</a>
                        </li>
                        <li role="presentation">
                            <a href="#clipart-tool" aria-controls="clipart-tool" role="tab" data-toggle="tab">Art</a>
                        </li>
                        <li role="presentation">
                            <a href="#ideas-tool" aria-controls="ideas-tool" role="tab" data-toggle="tab">Ideas</a>
                        </li>
                    <? endif;?>
                </ul>
                <!-- Tab panes -->
                 <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="photos-tool">
                        <p>Add photos from your device or from social networks.</p>
                        <p>Photos will be displayed in the gallery below. You can drag these across to your canvas and position, resize or crop them to make the perfect card.</p>
                        <div class="image-gallery-wrapper"  id="photos-gallery-wrapper">
                            <div id="aside-photo-toolbar" class="toolbar-menu"></div>
                            <ul class="image-gallery" id="photos-gallery"></ul>
                        </div>
                    </div>
                    <? if($tid != CANVAS_PHOTO): ?>
                        <div role="tabpanel" class="tab-pane" id="emoji-tool">
                            <p>Add Emoji's for fun.</p>
                            <div class="image-gallery-wrapper" id="emoji-gallery-wrapper">
                                <ul class="image-gallery" id="emoji-gallery"></ul>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="backgrounds-tool">
                            <p>Set a scenic background using the samples below or upload your own image.</p>
                            <div class="image-gallery-wrapper" id="backgrounds-gallery-wrapper">
                                <div id="aside-bg-toolbar" class="toolbar-menu"></div>
                                <ul class="image-gallery" id="backgrounds-gallery"></ul>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="clipart-tool">
                            <p>Add interesting and quirky art objects from our collection.</p>
                            <div class="image-gallery-wrapper" id="objects-gallery-wrapper">
                                <ul class="image-gallery" id="objects-gallery"></ul>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="ideas-tool">
                            <p>Get creative by looking at ideas generated from other users.</p>
                            <p>From time to time, we review our customers card's and pick the best ones to display here.</p>
                            <div class="image-gallery-wrapper" id="ideas-gallery-wrapper">
                                <ul class="image-gallery" id="ideas-gallery"></ul>
                            </div>
                        </div>
                    <? endif; ?>
                </div>
            </aside>
        <? endif;?>
    </div>

    <div class="col-sm-12">
        <div class="blue-round-btns">
            <a class="btn-blue-nxt" onclick="outlayTool.save();$('#inlay-container').show();$('#outlay-container').hide(); inlayTool.slides[1].activateNextObject();">Next</a>
        </div>
    </div>
</div>

<div style="display:none" class="main_container" id="inlay-container">
    <?php include 'inlay_toolbox.tpl.php';?>
</div>

<div style="display:none" class="main_container" id="preview-container">
    <?php include 'preview_toolbox.tpl.php';?>
</div>

<div style="display:none" class="main_container" id="delivery-container">
    <?php include 'delivery_toolbox.tpl.php';?>
</div>







<script src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/js/social.js"></script>

<script>
    jQuery( document ).ready(function() {

        createSimplySayEditor({
            nid: <?= $node->nid ?>,
            pid: <?= $node->field_product_refer["und"][0]['product_id'] ?>,
            uid: <?= $user->uid ?>,
            orientation: $("#product_canvas_type").val(),
            cardType: <?=$tid?>,
            cid: parseInt($("#cid").val()), //cID todo. CID could be undefined
            emojiPath: "<?=file_create_url('https://s3-dev.simplysay.sg/s3fs-public/emoji-images').'/Emoji_('?>",
            emojiGallery: [
                <? for ($i=1; $i < 421; $i++) { ?>
                "<?=$i?>).png",
                <? } ?>
            ],
            photosPath: "",
            photosGallery: [],
            ideasPath: "<?= file_create_url('public://card_images')?>",
            ideasGallery: [
                <?
                if ($tid == 2 || $tid == 3) {
                    $sample_card_url = load_all_sample_card_url(15);
                    foreach ($sample_card_url as $value) {
                        echo '{thubmnail:"' . $value['filename'] . '", value: "' . $value['pid'] . '"';
                    }
                }
                ?>
            ],
            bgPath: "https://s3-dev.simplysay.sg/s3fs-public/clipart/backgrounds/",
            bgGallery: [
                "Background-1.png",
                "Background-10.png",
                "Background-11.png",
                "Background-12.png",
                "Background-13.png",
                "Background-14.png",
                "Background-15.png",
                "Background-16.png",
                "Background-17.png",
                "Background-18.png",
                "Background-19.png",
                "Background-2.png",
                "Background-20.png",
                "Background-21.png",
                "Background-22.png",
                "Background-23.png",
                "Background-24.png",
                "Background-3.png",
                "Background-4.png",
                "Background-5.png",
                "Background-6.png",
                "Background-7.png",
                "Background-8.png",
                "Background-9.png"
            ],
            clipartPath: "https://s3-dev.simplysay.sg/s3fs-public/clipart/objects/",
            clipartGallery: [
                "Balloon-1.png",
                "Balloon-2.png",
                "Balloon-4.png",
                "Balloon-5.png",
                "Balloon-6.png",
                "Balloon-7.png",
                "Balloon-8.png",
                "Balloon-9.png",
                "Face-1.png",
                "Face-10.png",
                "Face-11.png",
                "Face-12.png",
                "Face-2.png",
                "Face-3.png",
                "Face-4.png",
                "Face-5.png",
                "Face-6.png",
                "Face-7.png",
                "Face-8.png",
                "Face-9.png",
                "Firework-1.png",
                "Firework-2.png",
                "Firework-3.png",
                "Firework-4.png",
                "Fireworks-6.png",
                "Fireworks-7.png",
                "Fireworks-8.png",
                "Frame-1.png",
                "Frame-10.png",
                "Frame-11.png",
                "Frame-12.png",
                "Frame-13.png",
                "Frame-14.png",
                "Frame-15.png",
                "Frame-16.png",
                "Frame-17.png",
                "Frame-18.png",
                "Frame-19.png",
                "Frame-2.png",
                "Frame-20.png",
                "Frame-21.png",
                "Frame-22.png",
                "Frame-3.png",
                "Frame-4.png",
                "Frame-5.png",
                "Frame-6.png",
                "Frame-7.png",
                "Frame-8.png",
                "Frame-9.png",
                "Happy-Birthday-1.png",
                "Happy-Birthday-2.png",
                "Happy-Birthday-3.png",
                "Happy-Birthday-4.png",
                "Happy-Birthday-5.png",
                "Happy-Birthday-6.png",
                "Happy-Birthday-7.png",
                "Ice-Cream-1.png",
                "Ice-Cream-2.png",
                "Ice-Cream-3.png",
                "Ice-Cream-4.png",
                "Ice-Cream-5.png",
                "Misc-1.png",
                "Misc-10.png",
                "Misc-11.png",
                "Misc-12.png",
                "Misc-13.png",
                "Misc-14.png",
                "Misc-15.png",
                "Misc-16.png",
                "Misc-17.png",
                "Misc-18.png",
                "Misc-19.png",
                "Misc-2.png",
                "Misc-20.png",
                "Misc-21.png",
                "Misc-22.png",
                "Misc-3.png",
                "Misc-4.png",
                "Misc-5.png",
                "Misc-6.png",
                "Misc-7.png",
                "Misc-8.png",
                "Misc-9.png",
                "Polaroid-1.png",
                "Polaroid-2.png",
                "Polaroid-3.png",
                "Polaroid-4.png",
                "Polaroid-5.png",
                "Polaroid-6.png",
                "Polaroid-7.png",
                "Rainbow-1.png",
                "Rainbow-2.png",
                "Rainbow-3.png",
                "Rainbow-4.png",
                "Streamer-1.png",
                "Streamer-2.png",
                "Streamer-3.png",
                "Streamer-4.png",
                "Streamer-5.png",
                "Streamer-6.png",
                "Streamer-7.png"
            ]
        });

        jQuery("html, body").animate({ scrollTop: jQuery("#toolbox").offset().top }, "slow");

    });
</script>