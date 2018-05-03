
                                <div class="select-bg-color-section clearfix">
                                    <form>
                                        <div class="form-group">
                                            <label for="productsku">Product SKU:</label>
                                            <input type="text" class="form-control" name="productsku" id="productsku">
                                        </div>
                                        <div class="form-group">
                                            <label for="defaultcardname">Card Name:</label>
                                            <input type="text" class="form-control" name="defautcardname"
                                                   id="defaultcardname" required>
                                        </div>
                                        <div class="form-group" style="display:none">
                                            <label for="canvas_orientation">Select Card Orientation:</label>
                                            <select class="form-control" name="canvas_orientation"
                                                    id="canvas_orientation">
                                                <option value="15">Portrait</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="canvastype">Select Canvas Type:</label>
                                            <select class="form-control" name="canvastype" id="canvastype">
                                                <?php $cardtype = taxonomy_get_tree(2);
                                                foreach ($cardtype as $type) {
                                                    echo "<option value='" . $type->tid . "'>" . $type->name . "</option>";
                                                }
                                                ?>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="canvascategories">Select Canvas Categories:</label>
                                            <select class="form-control" name="canvascategories" id="canvascategories">
                                                <?php $cardtype = taxonomy_get_tree(3);
                                                foreach ($cardtype as $type) {
                                                    echo "<option value='" . $type->tid . "'>" . $type->name . "</option>";
                                                }
                                                ?>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="featured_card"><input type="checkbox" name="featured_card" id="featured_card" value="1" required>Featured Card</label>

                                        </div>

                                        <div class="form-group" id="card-gender-main">
                                            <label for="card-gender">Card Gender:</label>
                                            <?php $card_gender = taxonomy_get_tree(7);
                                            foreach ($card_gender as $gender) {
                                                echo '<div class="checkbox">
                                                      <label><input type="checkbox" name="card-gender[]" value="' . $gender->tid . '">' . $gender->name . '</label>
                                                    </div>';
                                            }
                                            ?>
                                        </div>

                                        <div class="form-group">
                                            <label for="card-age">Card Age:</label>
                                            <select class="form-control" name="card-age" id="card_age">
                                                <?php $card_age = taxonomy_get_tree(10);
                                                foreach ($card_age as $age) {
                                                    echo "<option value='" . $age->tid . "'>" . $age->name . "</option>";
                                                }
                                                ?>
                                            </select>
                                        </div>

                                        <div class="form-group" id="card-recipient-main">
                                            <label for="card-recipient">Card Recipient:</label>
                                            <?php $card_recipient = taxonomy_get_tree(6);
                                            foreach ($card_recipient as $recipient) {
                                                echo '<div class="checkbox">
                                                      <label><input type="checkbox" name="card-recipient[]" value="' . $recipient->tid . '">' . $recipient->name . '</label>
                                                    </div>';
                                            }
                                            ?>
                                        </div>

                                        <div class="form-group" id="card-style-main">
                                            <label for="card-style">Card Style :</label>
                                            <?php $card_style = taxonomy_get_tree(8);
                                            foreach ($card_style as $style) {
                                                echo '<div class="checkbox">
                                                      <label><input type="checkbox" name="card-style[]" value="' . $style->tid . '">' . $style->name . '</label>
                                                    </div>';
                                            }
                                            ?>
                                        </div>

                                        <div class="form-group" id="card-p-upload-main">
                                            <label for="card-p-upload">Card Photo Upload:</label>
                                            <?php $card_p_upload = taxonomy_get_tree(9);
                                            foreach ($card_p_upload as $p_upload) {
                                                echo '<div class="radio">
                                                      <label><input type="radio" name="card_p_upload" value="' . $p_upload->tid . '">' . $p_upload->name . '</label>
                                                    </div>';
                                            }
                                            ?>
                                        </div>

                                        <div class="form-group">
                                            <label for="productprice">Price:</label>
                                            <input type="number" class="form-control" name="productprice"
                                                   id="productprice" required>
                                        </div>
                                        <div class="form-group" id="cardimagegroup" style="display:none">
                                            <label for="productprice">Photo/Standard Canvas Image:</label>
                                            <input type="file" class="form-control" name="cardimage" id="cardimage">
                                            <div class="adminpreviewIMG"></div>

                                            <label for="productprice">Card Sample Image:</label>
                                            <input type="file" class="form-control" name="cardimage"
                                                   id="card_sample_image">
                                            <div class="adminpreview_sampleimg"></div>
                                        </div>
                                    </form>
                                </div>



                                <div class="green-round-btns clearfix">
                                    <ul>
                                        <li><a href="javascript:void(0)" id="saveCanvasJson"
                                               onclick="saveCanvasJson('admin_save','admin');">Save</a></li>
                                    </ul>
                                </div>



<script src="<?php echo $base_path; ?><?php print drupal_get_path('theme', $GLOBALS['theme']); ?>/js/pdf.js"></script>
<script src="<?php echo $base_path; ?><?php print drupal_get_path('theme', $GLOBALS['theme']); ?>/js/social.js"></script>
<script src="<?php echo $base_path; ?><?php print drupal_get_path('theme', $GLOBALS['theme']); ?>/js/custom/myscript.js"></script>

