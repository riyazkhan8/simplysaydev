
<?php
global $base_path;
global $user;

// if (!empty(arg(1))) {
//     $tid='';
//     $node = node_load(arg(1));
//     $product =  commerce_product_load($node->field_product_refer['und'][0]['product_id']);
//     $tid = $product->field_card_type['und'][0]['tid'];
// }

?>
<div id="saved-alert">  
    
</div>
<div class="main_container landscape">
        <div class="tool_1">
            <div class="container">
                <div class="row">
                    <!-- <div class="col-sm-12">
                        <div class="tool-title text-center"><h2>Design And Customise Your Own Card</h2></div>
                    </div> -->
                    <div class="col-sm-8 gap-right">
                        <div class="canvas_left_space outlay_can_board">
                            <div class=" top_button_list">
                                <ul>
                                    <li><a class="clip_save_icon" href="javascript:void(0)"  id="saveCanvasJson" onclick="saveCanvasJson('admin_save','admin');" title="Save Product" ></a></li>
                                    <li>
                                        <a class="clip_open_icon" href="javascript:void(0)" id="clearCanvas"
                                         onclick="clearCanvas()" title="Clear All"></a>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <a class="clip_del_icon" href="javascript:void(0)" id="clearCanvas"
                                         onclick="removeActive()" title="Delete"></a>
                                    </li>
                                    <li>
                                        <a class="clip_undo_icon" href="javascript:void(0)" onclick="undo()" title="Undo"></a>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <a class="clip_copy_icon" href="javascript:void(0)" onclick="Position(6)" title="Copy"></a>
                                    </li>
                                    <li>
                                        <a class="clip_cut_icon" href="javascript:void(0)" onclick="Position(7)" title="Cut" ></a>
                                    </li>
                                    <li>
                                        <a class="clip_paste_icon" href="javascript:void(0)" onclick="Position(8)" title="Paste" ></a>
                                    </li>
                                </ul>
                                <ul>
                                     <li>
                                        <a class="clip_box_icon1" href="javascript:void(0)" onclick="Position(3)" title="Bring Forwards" ></a>
                                    </li>
                                    <li>
                                        <a class="clip_box_icon2" href="javascript:void(0)" onclick="Position(1)" title="Bring Backwards"></a>
                                    </li>
                                    <li>
                                        <a class="clip_box_icon3" href="javascript:void(0)" onclick="Position(4)"  title="Sent To Front"></a>
                                    </li>
                                    <li>
                                        <a class="clip_box_icon4" href="javascript:void(0)" onclick="Position(2)" title="Sent To Back" ></a>
                                    </li>
                                    <li>
                                        <a class="clip_box_icon5 grid" href="javascript:void(0)" onclick="removeGrid()" title="grid-off" ></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="canvas_container canvas-board" id="canvas_div">
                            <div id="right-menu">
                              <ul>
                               <li onclick="Position(1)">Move Backwards</li> 
                               <li onclick="Position(2)">Move Forwards</li> 
                               <li onclick="Position(3)">Bring to the Front</li> 
                               <li onclick="Position(4)">Bring to the Back</li> 
                               <!-- <li onclick="Position(5)">Add Frame</li>  -->
                               <li onclick="Position(6)">Copy</li> 
                               <li onclick="Position(7)">Cut</li> 
                               <li onclick="Position(8)">Paste</li> 
                               <li onclick="Position(9)">Delete</li> 
                              </ul>
                            </div>
                             <canvas id="canvas" width="661" height="500"></canvas>
                          </div>
                          </div> 
                                <div class="slider_bottom">
                                      <?php //if ($tid == 2 || $tid == 3) { ?>
                                              
                                      <div class="tool-title"><h3>Ideas ?</h3></div>
                                          <div class="sample-cards clearfix">
                                              <div id="horizontal_slider" class="">
                                              <?php

                                         $sample_card_url = load_all_sample_card_url(16);
                                         $uri = 'public://card_images';
                                          $filepath = file_create_url($uri);
                                          ?>

                                              <?php foreach ($sample_card_url as $value) { ?>

                                              <div>
                                                  <a href="javascript:void(0)">
                                                      <img src="<?php echo $filepath.''.$value['filename']; ?>" alt=""/>
                                                      <input type="hidden" id ="sample_id" value="<?php echo $value['pid']; ?>" />
                                                  </a>
                                              </div>

                                              <?php }?>
                                              </div>
                                      </div>

                                      <?php //} ?>
                                </div>
                    </div>
                    <div class="col-sm-4 gap-left">
                        <div class="tool-board mtop20">
                            <ul class="nav nav-tabs" role="tablist">
                                <li role="presentation" class="active">
                                    <a href="#colorText-tool" aria-controls="colorText-tool" role="tab" data-toggle="tab">
                                        Color & Text
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a href="#emoji-tool" aria-controls="emoji-tool" role="tab" data-toggle="tab">Emoji's</a>
                                </li>
                                <li role="presentation">
                                    <a href="#photos-tool" aria-controls="photos-tool" role="tab" data-toggle="tab">Photos</a>
                                </li>
                              </ul>

                              <!-- Tab panes -->
                              <div class="tab-content">
                                <div role="tabpanel" class="tab-pane active" id="colorText-tool">
                                    <div class="tool-title"><h3>Select Background Color</h3></div> 
                                    <div class="select-bg-color-section clearfix">
                                        <form>
                                        <div class="color-swatch">
                                        <span class="colorpic"></span>
                                        <!-- <input type="text" name="col" id="col" hidden="hidden"> -->
                                            <ul>
                                                <li class="color-wrap"><div style="background:#2b257d;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#103583;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#1f2b7d;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#014c90;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#00689b;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#0080a7;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#00964c;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#008e3e;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#009c3d;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#4ca531;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#cfcd00;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#e38e17;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#ed5222;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#f11a21;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#d3173a;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#b91c6b;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#a02494;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#5a267b;" class="backColor"></div></li>

                                                <li class="color-wrap"><div style="background:#2f2b8c;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#003e98;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#1e2f8b;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#0056a6;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#007fc2;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#0093b5;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#00ab54;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#009e41;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#00aa3d;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#5cb630;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#e8e500;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#f39f09;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#ff5a1b;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#ff1820;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#ee1a43;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#d21b77;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#ae2a97;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#642993;" class="backColor"></div></li>

                                                <li class="color-wrap"><div style="background:#3b2b96;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#0040a1;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#1f3299;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#007fc2;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#007fc2;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#00a2c3;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#00b65f;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#01ba3b;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#00aa3d;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#66c62e;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#f6ec00;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#ffab00;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#ff7a04;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#ff1521;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#ff124a;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#de1281;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#b83499;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#6e2994;" class="backColor"></div></li>

                                                <li class="color-wrap"><div style="background:#4e3d9d;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#0056ab;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#2a41a1;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#0177bf;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#0092cd;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#01afd2;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#00bd75;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#00b840;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#11c03d;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#86cc1b;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#f8ee01;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#ffab00;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#ff7c21;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#ff2d2e;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#ff1d65;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#ed1791;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#bb3f9f;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#823b9b;" class="backColor"></div></li>

                                                <li class="color-wrap"><div style="background:#000000;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#262626;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#1a1a1a;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#404040;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#4d4d4d;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#595959;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#666666;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#737373;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#808080;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#8c8c8c;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#999999;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#b3b3b3;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#bfbfbf;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#cccccc;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#d9d9d9;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#e6e6e6;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#f2f2f2;" class="backColor"></div></li>
                                                <li class="color-wrap"><div style="background:#ffffff;" class="backColor"></div></li>
                                            </ul>
                                        </div>
                                        <div class="custom-color-section">
                                            <div class="tool-title"><h3>Choose Custom Color</h3></div>
                                            <input type="color" name="favcolor" id="favcolor" value="#570e0e" onchange="changeBackground()">
                                            <span id="backColorCode">#f0000</span>
                                        </div>    
                                        </form>
                                    </div>
                                    <div class="tool-bar">
                                    <div class="tool-title"><h3>Select Text Color, Typeface and Font</h3></div>
                                                <a href="javascript:void(0)" class="btn rect-btn" id="addTextCanvas" onclick="addTextCanvas()">Add Textbox</a>
                                                <button type="button" value="bold" class="btn sqr-btn btn-bold selectTypecase">
                                                <i class="fa fa-bold"></i>
                                                </button>
                                                <button type="button" value="italic" class="btn sqr-btn btn-italic selectTypecase">
                                                <i class="fa fa-italic"></i>
                                                </button>
                                                <button type="button" value="underline" class="btn sqr-btn btn-underline selectTypecase">
                                                <i class="fa fa-underline"></i>
                                                </button>
                                                <button type="button" value="textstroke" class="btn sqr-btn selectTypecase btn-stroke">
                                                        <!-- <i class="fa fa-underline"></i> -->
                                                        Stroke
                                                </button>
                                                <br>
                                                <span class="ff-select">
                                                    <select name="FontStyleNumber" id="FontStyleNumber">
                                                    <option value="Open Sans">Open Sans</option>
                                                        <option value="PAPYRUS">PAPYRUS</option>
                                                        <option value="Poppins">Poppins</option>
                                                        <option value="Oswald">Oswald</option>
                                                        <option value="Encode Sans Condensed">Encode Sans Condensed</option>
                                                        <option value="Kaushan Script">Kaushan Script</option>
                                                        <option value="Oxygen">Oxygen</option>
                                                        <option value="PT Sans">PT Sans</option>
                                                        <option value="Patrick Hand SC">Patrick Hand SC</option>
                                                        <option value="Raleway">Raleway</option>
                                                        <option value="Roboto">Roboto</option>
                                                        <option value="Tangerine">Tangerine</option>
                                                        <option value="Ubuntu">Ubuntu</option>
                                                    </select>
                                                </span>
                                                <span class="ff-select fs-select">
                                                    <select name="FontSizeNumber" id="FontSizeNumber">
                                                        <option value="20">20</option>
                                                        <option value="22">22</option>
                                                        <option value="24">24</option>
                                                        <option value="26">26</option>
                                                        <option value="28">28</option>
                                                        <option value="30">30</option>
                                                        <option value="32">32</option>
                                                        <option value="34">34</option>
                                                        <option value="36">36</option>
                                                        <option value="38">38</option>
                                                        <option value="40">40</option>
                                                    </select>
                                                </span>

                                                <!-- <span class="ff-select fs-select">
                                                    <select name="imageAngle" id="imageAngle">
                                                        <option value="0">Vertical</option>
                                                        <option value="1">horizontal</option>
                                                    </select>
                                                </span> -->
                                            </div> 
                                    <div class="select-bg-color-section clearfix">
                                        <form>
                                            <div class="color-box clearfix">
                                                <div class="color-swatch">
                                                    <ul>
                                                <li class="color-wrap"><div style="background:#2b257d;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#103583;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#1f2b7d;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#014c90;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#00689b;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#0080a7;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#00964c;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#008e3e;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#009c3d;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#4ca531;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#cfcd00;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#e38e17;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#ed5222;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#f11a21;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#d3173a;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#b91c6b;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#a02494;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#5a267b;" class="ColorFont"></div></li>

                                                <li class="color-wrap"><div style="background:#2f2b8c;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#003e98;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#1e2f8b;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#0056a6;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#007fc2;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#0093b5;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#00ab54;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#009e41;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#00aa3d;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#5cb630;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#e8e500;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#f39f09;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#ff5a1b;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#ff1820;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#ee1a43;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#d21b77;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#ae2a97;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#642993;" class="ColorFont"></div></li>

                                                <li class="color-wrap"><div style="background:#3b2b96;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#0040a1;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#1f3299;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#007fc2;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#007fc2;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#00a2c3;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#00b65f;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#01ba3b;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#00aa3d;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#66c62e;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#f6ec00;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#ffab00;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#ff7a04;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#ff1521;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#ff124a;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#de1281;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#b83499;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#6e2994;" class="ColorFont"></div></li>

                                                <li class="color-wrap"><div style="background:#4e3d9d;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#0056ab;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#2a41a1;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#0177bf;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#0092cd;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#01afd2;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#00bd75;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#00b840;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#11c03d;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#86cc1b;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#f8ee01;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#ffab00;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#ff7c21;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#ff2d2e;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#ff1d65;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#ed1791;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#bb3f9f;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#823b9b;" class="ColorFont"></div></li>

                                                <li class="color-wrap"><div style="background:#000000;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#262626;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#1a1a1a;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#404040;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#4d4d4d;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#595959;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#666666;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#737373;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#808080;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#8c8c8c;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#999999;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#b3b3b3;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#bfbfbf;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#cccccc;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#d9d9d9;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#e6e6e6;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#f2f2f2;" class="ColorFont"></div></li>
                                                <li class="color-wrap"><div style="background:#ffffff;" class="ColorFont"></div></li>
                                              </ul>
                                            </div>
                                                <div class="custom-color-section">
                                                    <div class="tool-title"><h3>Choose Custom Text Color</h3></div>
                                                    <input type="color" name="favcolor" id="fontcolor" value="#fffff" onchange="changeFontColor()">
                                                    <span id="FontcolorCode" >#f0000</span>
                                                </div>
                                            </div> 
                                            <div class="form-group">
                                                <label for="productsku">Product SKU:</label>
                                                <input type="text" class="form-control" name="productsku" id="productsku">
                                            </div>
                                            <div class="form-group">
                                                <label for="defaultcardname">Card Name:</label>
                                                <input type="text" class="form-control" name="defautcardname" id="defaultcardname" required>
                                            </div>
                                            <div class="form-group" style="display:none">
                                                <label for="canvas_orientation">Select Card Orientation:</label>
                                                <select class="form-control" name="canvas_orientation" id="canvas_orientation">
                                                  <option value="16">Landscape</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="canvastype">Select Canvas Type:</label>
                                                <select class="form-control" name="canvastype" id="canvastype">
                                                  <?php $cardtype = taxonomy_get_tree(2);
                                                  foreach ($cardtype as $type) {
                                                   echo "<option value='".$type->tid."'>".$type->name."</option>";
                                                   }
                                                  ?>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="canvascategories">Select Canvas Categories:</label>
                                                <select class="form-control" name="canvascategories" id="canvascategories">
                                                  <?php $cardtype = taxonomy_get_tree(3);
                                                  foreach ($cardtype as $type) {
                                                   echo "<option value='".$type->tid."'>".$type->name."</option>";
                                                   }
                                                  ?> 
                                                </select>
                                            </div>

                                              <div class="form-group" id="card-gender-main">
                                                <label for="card-gender">Card Gender:</label>
                                                 <?php $card_gender = taxonomy_get_tree(7);
                                                  foreach ($card_gender as $gender) {
                                                   echo '<div class="checkbox">
                                                      <label><input type="checkbox" name="card-gender[]" value="'.$gender->tid.'">'.$gender->name.'</label>
                                                    </div>';
                                                   }
                                                  ?> 
                                            </div>

                                            <div class="form-group">
                                                <label for="card-age">Card Age:</label>
                                                <select class="form-control" name="card-age" id="card_age">
                                                  <?php $card_age = taxonomy_get_tree(10);
                                                  foreach ($card_age as $age) {
                                                   echo "<option value='".$age->tid."'>".$age->name."</option>";
                                                   }
                                                  ?> 
                                                </select>
                                            </div>

                                            <div class="form-group" id="card-recipient-main">
                                                <label for="card-recipient">Card Recipient:</label>
                                                 <?php $card_recipient = taxonomy_get_tree(6);
                                                  foreach ($card_recipient as $recipient) {
                                                   echo '<div class="checkbox">
                                                      <label><input type="checkbox" name="card-recipient[]" value="'.$recipient->tid.'">'.$recipient->name.'</label>
                                                    </div>';
                                                   }
                                                  ?> 
                                            </div>

                                             <div class="form-group" id="card-style-main">
                                                <label for="card-style">Card Style :</label>
                                                 <?php $card_style = taxonomy_get_tree(8);
                                                  foreach ($card_style as $style) {
                                                   echo '<div class="checkbox">
                                                      <label><input type="checkbox" name="card-style[]" value="'.$style->tid.'">'.$style->name.'</label>
                                                    </div>';
                                                   }
                                                  ?> 
                                            </div>

                                             <div class="form-group" id="card-p-upload-main">
                                                <label for="card-p-upload">Card Photo Upload:</label>
                                                 <?php $card_p_upload = taxonomy_get_tree(9);
                                                  foreach ($card_p_upload as $p_upload) {
                                                   echo '<div class="radio">
                                                      <label><input type="radio" name="card_p_upload" value="'.$p_upload->tid.'">'.$p_upload->name.'</label>
                                                    </div>';
                                                   }
                                                  ?> 
                                            </div>
                                            
                                            <div class="form-group">
                                                <label for="featured_card"><input type="checkbox"  name="featured_card" id="featured_card" value="1" required> Featured Card</label>
                                                
                                            </div>
                                            <div class="form-group">
                                                <label for="productprice">Price:</label>
                                                <input type="number" class="form-control" name="productprice" id="productprice" required>
                                            </div>
                                            <div class="form-group" id="cardimagegroup" style="display:none">
                                                <label for="productprice">Photo/Standard Canvas Image:</label>
                                                <input type="file" class="form-control" name="cardimage" id="cardimage_landscape" >
                                                <div class="adminpreviewIMG"></div>

                                                <label for="productprice">Card Sample Image:</label>
                                                <input type="file" class="form-control" name="cardimage" id="card_sample_image_landscape" >
                                                <div class="adminpreview_sampleimg"></div>

                                            </div> 
                                            <!-- <div class="round-btns text-right">
                                                <a href="javascript:void(0)"  id="saveCanvasJson" onclick="saveCanvasJson();">Save</a>
                                                <a href="javascript:void(0)" onclick="removeActive()">Undo</a>
                                                <a href="javascript:void(0)" id="clearCanvas" onclick="clearCanvas()">Clear All</a>
                                            </div> -->                                            

                                        </form>
                                    </div>
                                    <div class="green-round-btns clearfix">
                                          <ul>
                                            <li><a href="javascript:void(0)" id="saveCanvasJson" onclick="saveCanvasJson('admin_save','admin');" >Save</a></li>
                                          </ul>
                                   </div>
                                </div>
                                <div role="tabpanel" class="tab-pane" id="emoji-tool">
                                    <div class="tool-title"><h3>Select The Emoji’s To Add To The Card:</h3></div>
                                    <div id="customscroll">
                                    <div class="select-emoji-section clearfix">
                                        <ul id="emoji">
                                        <?php

                                            for ($i=1; $i < 12; $i++) { 

                                              $number = $i;                             
                                              $uri = 'public://emoji';
                                          $filepath = file_create_url($uri);
                                          $emoji_name =  $filepath."/smiley".$number.".png";


                                              echo '<li><a href="javascript:void(0)"><img onclick="addEmojis(this)" height="50" width="50" src="'.$emoji_name.'"></a></li>';
                                            }

                                            ?>
                                        </ul>
                                    </div>
                                    </div>
                                    <!-- <div class="yellow-btn"><button class="btn btn-warning">Add Emoji</button></div> -->
                                    <!-- <div class="round-btns text-right">
                                        <button type="button">Save</button>
                                        <button type="button">Undo</button>
                                        <button type="button">Clear All</button>
                                    </div> -->
                                </div>
                                <div role="tabpanel" class="tab-pane" id="photos-tool">
                                    <div class="tool-title"><h3>Choose Photo To Upload</h3></div>
                                    <div class="photo-upload-section text-center clearfix">
                                        <div class="select-device">
                                            <h3>My Device</h3>
                                            <input type="file" id="file-1" class="inputfile inputfile-1 myImage">
                                            <label for="file-1"> <span>Browse</span> </label>
                                        </div>
                                        <div class="select-social-media">
                                            <!-- <h3>Social Media</h3>
                                            <div class="yellow-btn">
                                                <button type="button" class="btn btn-warning" data-toggle="modal" 
                                                data-target=".bs-example-modal-sm">Select</button>
                                            </div> -->
                                            <!-- <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                                              <div class="modal-dialog modal-sm" role="document">
                                                <div class="modal-content">
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                                    <div class="social-media-modal">
                                                        <h3>Select Your Social Media</h3>
                                                        
                                                        <div class="fb-login-button" data-max-rows="1" data-size="large"  data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false" login_text='UPLOAD FROM FACEBOOK' scope="public_profile,email" onlogin="checkLoginState();"></div>
                                                        <button type="button" class="insta-media media-btns">
                                                        <i class="fa fa-instagram"></i> UPLOAD FROM INSTAGRAM </button>
                                                        
                                                        <div id="social_image_picker">
                                                            <ul id='social_images'></ul>  
                                                            <button id="image_add" onclick="social_image_add()" > ADD </button>
                                                        </div>
                                                    
                                                        <div>
                                                          <button id="fb_logout" onclick="fbLogoutUser()">Logout</button>
                                                        </div>
                                                    </div>
                                                </div>
                                              </div>
                                            </div> -->
                                        </div>
                                    </div>
                                    <hr/>
                                    <div class="tool-title">
                                        <h3>Preview Of Photo Selected</h3>
                                    </div>
                                    <div class="preview-photo-section clearfix">
                                        <ul class="previewIMG">
                                            <!-- <li class="prevClose" id="imagesUP1"><i class="fa fa-image"></i></li> 
                                            <li class="prevClose" id="imagesUP2"><i class="fa fa-image"></i></li>
                                            <li class="prevClose" id="imagesUP3"><i class="fa fa-image"></i></li>
                                            <li class="prevClose" id="imagesUP4"><i class="fa fa-image"></i></li> 
                                            <li class="prevClose" id="imagesUP5"><i class="fa fa-image"></i></li>
                                            <li class="prevClose" id="imagesUP6"><i class="fa fa-image"></i></li>
                                            <li class="prevClose" id="imagesUP7"><i class="fa fa-image"></i></li>
                                            <li class="prevClose" id="imagesUP8"><i class="fa fa-image"></i></li>
                                            <li class="prevClose" id="imagesUP9"><i class="fa fa-image"></i></li>
                                            <li class="prevClose" id="imagesUP10"><i class="fa fa-image"></i></li> -->
                                        </ul>
                                    </div>
                                    <!-- <div class="round-btns text-right mtop5">
                                        <button type="button">Save</button>
                                        <button type="button">Undo</button>
                                        <button type="button">Clear All</button>
                                    </div> -->
                                    <!-- <div class="select-device">
                                            <h3>Upload PDF</h3>
                                            <input type="file" id="file-2" class="inputfile2 inputfile-2 myImage2">
                                            <label for="file-2"> <span>Browse</span> </label>
                                        </div>
                                </div> -->
                              </div>                            
                        </div>
                    </div>   
                </div>
                <canvas style="display:none;" id="the-canvas"></canvas>
            </div>
        </div> 
    </div>
<input type="hidden" id ="section" value="outlay" />
<script src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/js/pdf.js"></script>
<script src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/js/social.js"></script>
<script src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/js/custom/myscript.js"></script>

<script>
         jQuery("#horizontal_slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        centerMode: false,
        // dots: false,
        // infinite: false,
        // slidesToShow: 5,
        // slidesToScroll: 1,
        // vertical: true,
        // verticalSwiping: true,
      });   


// var circle = new fabric.Circle({ radius: 10,stroke: '#000', fill: 'transparent', left: 100, top: 100 });

// canvas.add(circle);
       

        jQuery('.sample-cards .slick-slide a img').click(function(){

var pid = jQuery(this).next().val();

        jQuery.ajax({
              type: "POST",
              url: "/sampleshow",
              data: { 
                  'pid':pid,
   
                },
              success: function(result) {
                  //alert(result);
                  set_json(result)
                                
              },
              error: function(result) {
                  alert('error');
                  //alert(result);
              }
          });


  });      
    </script>