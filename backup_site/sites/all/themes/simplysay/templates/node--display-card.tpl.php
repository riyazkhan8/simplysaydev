<?php
/**
 * @file
 * Default theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct URL of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type; for example, "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type; for example, story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode; for example, "full", "teaser".
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined; for example, $node->body becomes $body. When needing to
 * access a field's raw values, developers/themers are strongly encouraged to
 * use these variables. Otherwise they will have to explicitly specify the
 * desired field language; for example, $node->body['en'], thus overriding any
 * language negotiation rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 *
 * @ingroup templates
 */
global $base_path;
global $user;
// if (isset($_SESSION['card_json'])) {
//   print $_SESSION['card_json']['nid'] ;
// }else{
//   echo "no";
// }f

//print "<pre>"; print_r($content['field_cid']);exit;
?>

<div id="saved-alert">

</div>

<article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
    <?php if ((!$page && !empty($title)) || !empty($title_prefix) || !empty($title_suffix) || $display_submitted): ?>
        <header>
            <?php print render($title_prefix); ?>
            <?php if (!$page && !empty($title)): ?>
                <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
            <?php endif; ?>
            <?php print render($title_suffix); ?>
            <?php if ($display_submitted): ?>
                <span class="submitted">
      <?php print $user_picture; ?>
      <?php print $submitted; ?>
    </span>
            <?php endif; ?>
        </header>
    <?php endif; ?>
    <?php
    // Hide comments, tags, and links now so that we can render them later.
    hide($content['comments']);
    hide($content['links']);
    hide($content['field_tags']);
    ?>

    <div id="toolbox">

        <?php

        /*******render canvas type landscape and Portrait*******/
        global $user;
        $product_id = $node->field_product_refer["und"][0]['product_id'];
        $product = commerce_product_load($product_id);
        $canvas_type = $product->field_card_type['und'][0]['tid'];
        $card_orientation = $product->field_card_orientation['und'][0]['tid'];
        $section = '';

        if ($user->uid == 0) {
            if (isset($_SESSION['outlay_card_json_data'])) {
                unset($_SESSION['outlay_card_json_data']);
                unset($_SESSION['inlay_card_json_data']);
                unset($_SESSION['delivery_type_data']);
            }
        }
        if (isset($_SESSION['delivery_type_data'])) {
            $section = $_SESSION['delivery_type_data']['section'];
            $section_address = $_SESSION['delivery_type_data']['section_address'];
            $cid = $_SESSION['delivery_type_data']['cid'];
        } elseif (isset($_SESSION['inlay_card_json_data'])) {
            $section = $_SESSION['inlay_card_json_data']['section'];
        } elseif (isset($_SESSION['outlay_card_json_data'])) {
            $section = $_SESSION['outlay_card_json_data']['section'];
        }

        if ($canvas_type == 2) {
            $product_canvas_type = 'landscape';
        } elseif ($card_orientation == 16) {
            $product_canvas_type = 'landscape';
        } else {
            $product_canvas_type = 'portrait';
        }


        if (($section == 'delivery') || ($section_address == 'delivery') ){
            print theme('delivery_selection_page', array('cid' => $cid));
        } else {
            print theme('outlay', array('nid' => $node->nid, 'orientation' => $product_canvas_type));
        }
        if (isset($_SESSION['delivery_type_data'])) {
                $_SESSION['delivery_type_data']['section_address'] = '';
                $section_address = '';
            }
        ?>
    </div>
</div>

    <div id="cart_create_image"></div>
    <div class="container round-btn delivery_bottombtn" style="display:none;">
        <div class="blue-round-btns">
            <div class="delivery_add2cart_button"
                 style="display:none;"><?php print render($content['field_product_refer']); ?></div>
        </div>
    </div>

    <div id="social_login">
        <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">×</span></button>
                    <div class="social-media-modal">
                        <h3>Select Your Social Media</h3>

                        <div class="fb-login-button" data-max-rows="1" data-size="large" data-show-faces="false"
                             data-auto-logout-link="false" data-use-continue-as="false"
                             login_text='UPLOAD FROM FACEBOOK' scope="public_profile,email,user_photos"
                             onlogin="checkLoginState();"></div>

                        <button type="button" class="insta-media media-btns" onclick="login()">
                            <i class="fa fa-instagram"></i> UPLOAD FROM INSTAGRAM
                        </button>

                        <div id="social_image_picker">
                            <ul id='social_images'></ul>

                            <button id="image_add" onclick="social_image_add()" data-dismiss="modal"> ADD</button>
                            <button id="fb_logout" onclick="fbLogoutUser()">Logout</button>

                            <button id="insta_image_add" onclick="social_image_add()" data-dismiss="modal"> ADD</button>
                            <button id="insta_logout" onclick="instagramLogoutUser()">Logout</button>
                            <button id="nextimage" onclick="next();">next image</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <input type="hidden" id="node_id" value="<?php print $node->nid; ?>"/>
    <input type="hidden" id="product_id" value="<?php print $node->field_product_refer["und"][0]['product_id']; ?>"/>
    <input type="hidden" id="product_canvas_type" value="<?php print $product_canvas_type; ?>"/>
    <input type="hidden" id="user_id" value="<?php print $user->uid; ?>"/>
    <?php if (isset($_GET['cid']) && !empty($_GET['cid'])): ?>
        <?php

        $query = db_select('line_item_simplysay_card', 'li')
            ->fields('li')
            ->condition('li.cid', $_GET['cid'])
            ->execute();
        $record = $query->fetchAll();

        $count = count($record);


        if ($count > 0) {

            $query1 = db_select('user_saved_card', 'uc')
                ->fields('uc')
                ->condition('uc.cid', $_GET['cid'])
                ->execute();
            $record1 = $query1->fetchAll();
            $count1 = count($record1);
            //print $count;
            if ($count1 > 0) {

                $new_cid = time();

                $node_id = $record1[0]->node_id;
                $cid = $new_cid;
                $pid = $record1[0]->pid;
                $uid = $record1[0]->uid;
                $outlay_card_json = $record1[0]->outlay_card_jason;
                $inlay_card_json_1 = $record1[0]->inlay_card_json_1;
                $inlay_card_json_2 = $record1[0]->inlay_card_json_2;
                $inlay_card_json_3 = $record1[0]->inlay_card_json_3;
                $inlay_card_json_4 = $record1[0]->inlay_card_json_4;
                $delivery_type = $record1[0]->return_delivery_type_status;
                $address_pid = $record1[0]->address_pid;
                $created = $record1[0]->created;

                $result = db_insert('user_saved_card')
                    ->fields(array(
                        'node_id' => $node_id,
                        'pid' => $pid,
                        'uid' => $uid,
                        'cid' => $cid,
                        'outlay_card_jason' => $outlay_card_json,
                        'inlay_card_json_1' => $inlay_card_json_1,
                        'inlay_card_json_2' => $inlay_card_json_2,
                        'inlay_card_json_3' => $inlay_card_json_3,
                        'inlay_card_json_4' => $inlay_card_json_4,
                        'return_delivery_type_status' => $delivery_type,
                        'address_pid' => $address_pid,
                        'created' => date("Y-m-d H:i:s", time()),
                    ))
                    ->execute();

            }

        } else {
            $new_cid = $_GET['cid'];
        }

        ?>

        <input type="hidden" id="cid" value="<?php print $new_cid; ?>"/>

    <?php elseif (isset($_GET['item_id']) && !empty($_GET['item_id'])): ?>

        <?php

        if (isset($_SESSION['outlay_card_json_data'])) {
            unset($_SESSION['outlay_card_json_data']);
            unset($_SESSION['inlay_card_json_data']);
            unset($_SESSION['delivery_type_data']);
        }

        $udpate_cid = '';
        $query = db_select('line_item_simplysay_card', 'li')
            ->fields('li')
            ->condition('li.line_item_id', $_GET['item_id'])
            ->execute();
        $record = $query->fetchAll();


        $count = count($record);

        //print "<pre>"; print_r($record[0]->cid);exit;

        if ($count > 0) {

            $query1 = db_select('user_saved_card', 'uc')
                ->fields('uc')
                ->condition('uc.cid', $record[0]->cid)
                ->execute();
            $record1 = $query1->fetchAll();
            $count1 = count($record1);
            //print $count;
            if ($count1 > 0) {

                $udpate_cid = $record[0]->cid;

            }

        } else {

            $udpate_cid = time();

        }

        ?>

        <input type="hidden" id="card_load" value="cart"/>
        <input type="hidden" id="cid" value="<?php print $udpate_cid; ?>"/>
        <input type="hidden" id="item_id" value="<?php print $_GET['item_id']; ?>"/>
    <?php else: ?>
        <input type="hidden" id="cid" value="<?php print time(); ?>"/>
    <input type="hidden" id="cidd" value="<?php if (isset($_SESSION['cid']) && !empty($_SESSION['cid'])){ print $_SESSION['cid']; }  ?>"/>
        <input type="hidden" id="card_type" value="<?=$canvas_type?>"/>
    <?php endif; ?>

    <?php //print render($content);
        if (isset($_SESSION['cid'])) {
        unset($_SESSION['cid']);
        }
    ?>
    <?php
    // Only display the wrapper div if there are tags or links.
    $field_tags = render($content['field_tags']);
    $links = render($content['links']);
    if ($field_tags || $links):
        ?>
        <footer>
            <?php print $field_tags; ?>
            <?php print $links; ?>
        </footer>
    <?php endif; ?>
    <?php print render($content['comments']); ?>
</article>
