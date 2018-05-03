<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template in this directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see bootstrap_preprocess_page()
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see bootstrap_process_page()
 * @see template_process()
 * @see html.tpl.php
 *
 * @ingroup templates
 */
//print "<pre>";print_r($node->type);exit;
$tool_class = "container";
if (isset($node->type)) {

if ($node->type == 'display_card') {
  $tool_class = "container-fluid"; 
}

}
//exit;


global $user;
$total_points = userpoints_get_current_points($user->uid, $tid = NULL);
if ($total_points >= 800) {
  $class="have_point_btn gold";
}else{
  $class="have_point_btn blue";
}


 $query = db_select('simplysay_user_profile_picture', 'up')
            ->fields('up')
            ->condition('up.uid',$user->uid)
          ->execute();
      $record = $query->fetchAll();
      

      $count = count($record);


if ($count > 0) {

//print "<pre>"; print_r($record[0]->fid); exit;

  $file = file_load($record[0]->fid);
$uri = $file->uri; // URI path, e.g. public://image.jpg
$path = file_create_url($uri);
}else{

$theme_path = drupal_get_path('theme',$GLOBALS['theme']);
$path = $base_path.''.$theme_path.'/images/add-photo.png';

}

?>

<header class="header_sec" id="header">
        <div class="main_navigation">
            <div class="top-bar">
                <div class="container">
                    <ul>
                        <li><a href="/help">Customer Service</a></li>
                        <?php if (!empty($secondary_nav)): ?>
                          <li class="sencondary-menu" ><?php print render($secondary_nav); ?></li>
                        <?php else: ?>
                        <li><a href="/user">Login</a></li>
                        <li><a href="/user/register">Register</a></li>
                        <?php endif; ?>
                    </ul>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <nav class="navbar navbar-default">
                      <div class="navbar-header">
                        <?php if (!empty($primary_nav) || !empty($secondary_nav) || !empty($page['navigation'])): ?> 
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                          <span class="sr-only">Toggle navigation</span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                        </button>
                        <?php endif; ?>
                        <div class="logo">
                            <a class="navbar-brand"  href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" >
                                <img src="<?php print $logo; ?>" class="img-responsive"/>
                            </a>
                            <div class="logo_slogan"><img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/slogan.png" class="img-responsive"/></div>
                        </div>
                      </div> 
                      <?php if (!empty($primary_nav) || !empty($page['navigation'])): ?>                    
                      <div id="navbar" class="navbar-collapse collapse">
                          <ul class="nav navbar-nav navbar-right">
                             <?php if (!empty($primary_nav)): ?>
                      <?php print render($primary_nav); ?>
                    <?php endif; ?>
                    <?php if (!empty($page['navigation'])): ?>
                      <?php print render($page['navigation']); ?>
                    <?php endif; ?>
                            <li class="mycart">
                              <button type="button">
                              My Cart 
                                <span class="total-item"><?php print header_total_cart_quantity(); ?>
                                </span>
                                <i class="fa fa-shopping-basket" aria-hidden="true">
                                </i>
                              </button>
                              <div class="header-cart">
                                    <?php print views_embed_view('heaser_shopping_cart_block', 'default'); ?> 
                              </div>
                              <div class="<?php print $class; ?>">
                              <?php if (!$user->uid): ?>
                              <a  href="javascript:void(0)" onclick="points_redirect_session();" data-target="#login-modal" data-toggle="modal">
                                Login to see your points!
                              </a>  
                              <?php else: ?> 
                              <a href="/myuserpoints">
                                You have <span id="value_point"><?php echo $total_points; ?> reward </span> points
                              </a>
                              <?php endif; ?>
                                <i class="point_info_hove">
                                    <i class="fa fa-info-circle"></i>
                                    <span class="ppover_custom">Simply Say will reward you with 160 points on every order. Points can be redeemed when paying for your cards, select "Simply Pay" during the checkout payment.</span>
                                </i>
                                
                            </div>
                            </li>
                            <li class="main-search">
                               <?php 
                                    $search_form = drupal_get_form('search_block_form');
                                    print render($search_form);

                              ?>
                          </li>                        
                          </ul>
                      </div><!--/.nav-collapse -->
                      <?php endif; ?>
                  </nav>
                </div>
            </div>            
        </div>
    </header>
  
<div class="main-container <?php  print $tool_class; ?>">

  <header role="banner" id="page-header">
    <?php if (!empty($site_slogan)): ?>
      <p class="lead"><?php print $site_slogan; ?></p>
    <?php endif; ?>

    <!-- <?php print render($page['header']); ?> -->
  </header> <!-- /#page-header -->

  <div class="row">

    <?php if (!empty($page['sidebar_first'])): ?>
      <aside class="col-sm-3" role="complementary">
        
      </aside>  <!-- /#sidebar-first -->
    <?php endif; ?>
    <?php global $user; if ($user->uid): ?>
    <div class="col-sm-3">
                    <div class="profile_sidebar">
                                <div class="user_profile">
                                    <div class="user_img">
                                        <img src="<?php print $path; ?>" class="img-responsive" alt="prfl">
                                        <div class="upload_icon"><i class="fa fa-camera" aria-hidden="true"></i></div>
                                    </div>
                                    <div class="user_name"><?php print $user->name;?></div>
                                </div>
                                <div class="profile_upload">
                                  <form>
                                      <input type="file" name="profile_input" id="profile_input" />  
                                  </form> 
                                </div>
                                <ul>
                                <?php  global $user;


                                 $order_history_class = '';
                                $saved_card_class = '';
                                $address_book_class = '';
                                $account_edit_class = '';
                                $user_points_class = '';
                                $my_favourites_class = '';

                                if (!empty(arg(2))) {
                                    if (arg(2) == 'saved_card') {
                                    $saved_card_class = 'active';
                                  }elseif (arg(2) == 'orders') {
                                    $order_history_class = 'active';
                                  }elseif (arg(2) == 'addressbook') {
                                    $address_book_class = 'active';
                                  }elseif (arg(2) == 'edit') {
                                    $account_edit_class = 'active';
                                  }
                                }
                                if (arg(0) == 'myuserpoints') {
                                    $user_points_class = 'active';
                                  }
                                if (arg(0) == 'my-favourite-product') {
                                    $my_favourites_class = 'active';
                                  }
                                $order_history = '/user/'.$user->uid.'/orders';
                                $address_book = '/user/'.$user->uid.'/addressbook/shipping';
                                $saved_card = '/user/'.$user->uid.'/saved_card';
                                $account_edit = '/user/'.$user->uid.'/edit';
                                $user_points = '/myuserpoints';
                                $my_favourites = '/my-favourite-product';
                                //print $order_history;exit;


                                ?>
                                    <li class="<?php print $user_points_class; ?>"><a href="<?php print $user_points; ?>"><i class="fa fa-list-ol" aria-hidden="true"></i> Points</a></li>
                                    <li class="<?php print $my_favourites_class; ?>"><a href="<?php print $my_favourites; ?>"><i class="fa fa-heart" aria-hidden="true"></i> Likes</a></li>
                                    <li><a href="<?php print $saved_card; ?>"><i class="fa fa-file-image-o" aria-hidden="true"></i> Saved Designs</a></li>
                                    <li><a href="<?php print $order_history; ?>"><i class="fa fa-shopping-basket" aria-hidden="true"></i> Order History</a></li>
                                    <li><a href="<?php print $address_book; ?>"><i class="fa fa-address-card" aria-hidden="true"></i> Address Book</a></li>
                                    <li><a href="<?php print $account_edit; ?>"><i class="fa fa-cog" aria-hidden="true"></i> Settings</a></li>
                                    <li><a href="/user/logout"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a> </li>
                                </ul>
                    </div>
     </div>
     <?php endif; ?>
    <section class="col-sm-9"<?php //print $content_column_class; ?>>
      <?php if (!empty($page['highlighted'])): ?>
        <div class="highlighted jumbotron"><?php print render($page['highlighted']); ?></div>
      <?php endif; ?>
      <?php //if (!empty($breadcrumb)): print $breadcrumb; endif;?>
      <a id="main-content"></a>
      <?php print render($title_prefix); ?>
      <?php if (!empty($title)): ?>
        <h4 class="page-header"><?php print $title; ?></h4>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
      
      <!-- user login check code and msg. -->
      <?php print $messages; ?>
      <?php if (!empty($tabs)): ?>
        <?php print render($tabs); ?>
      <?php endif; ?>
      <?php if (!empty($page['help'])): ?>
        <?php print render($page['help']); ?>
      <?php endif; ?>
      <?php if (!empty($action_links)): ?>
        <ul class="action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
      <?php print render($page['content']); ?>
      <?php if (arg(0) == 'create_canvas'): ?>

        <div id="social_login">
            <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                                                        <div class="modal-dialog modal-sm" role="document">
                                                          <div class="modal-content">
                                                              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                                              <div class="social-media-modal">
                                                                  <h3>Select Your Social Media</h3>
                                                                  
                                                                  <div class="fb-login-button" data-max-rows="1" data-size="large"  data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false" login_text='UPLOAD FROM FACEBOOK' scope="public_profile,email,user_photos" onlogin="checkLoginState();"></div>
                                                                  <button type="button" class="insta-media media-btns">
                                                                  <i class="fa fa-instagram"></i> UPLOAD FROM INSTAGRAM </button>
                                                                  
                                                                  <div id="social_image_picker">
                                                                      <ul id='social_images'></ul> 

                                                                      <button id="image_add" onclick="social_image_add()" data-dismiss="modal" > ADD </button>
                                                                      <button id="fb_logout" onclick="fbLogoutUser()">Logout</button>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                        </div>
                                                      </div>
</div>
  
      <?php endif; ?>

    </section>

    <?php if (!empty($page['sidebar_second'])): ?>
      <aside class="col-sm-3" role="complementary">
        <?php print render($page['sidebar_second']); ?>
      </aside>  <!-- /#sidebar-second -->
    <?php endif; ?>

  </div>
</div>

<?php if (!empty($page['footer'])): ?>
  <footer class="footer <?php print $container_class; ?>">
    <?php print render($page['footer']); ?>
  </footer>
<?php endif; ?>
       <!--Footer bottom start-->
  <?php if (!empty($page['footer_bottom'])): ?>
    <div class="footer-bottom">   
      <div class="container">
        <?php print render($page['footer_bottom']); ?>
      </div>
    </div>  
  <?php endif; ?>
    <!--Footer bottom sec end-->
<div id="loader-wrapper">
        <div id="loader">
            <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/loader.gif" class="img-responsive">
            <br>
            <br>
            <h5> Simply Say is loading... </h5>
        </div>
 </div>