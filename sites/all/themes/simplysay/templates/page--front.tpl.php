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
global $user;
$class='';
$total_points = userpoints_get_current_points($user->uid, $tid = NULL);

if ($total_points >= 800) {
  $class="have_point_btn gold";
}else{
  $class="have_point_btn blue";
}

//Heade upper menu
$register = menu_link_load(1014);
$login = menu_link_load(1015);
$customer = menu_link_load(1016);


// Front page Card button menu
$standardcard = menu_link_load(1156);
$photocard = menu_link_load(1157);


//print "<pre>"; print_r($Standardcard['href']); exit;

?>

    <header class="header_sec" id="header">
        <div class="main_navigation">
            <div class="top-bar">
                <div class="container">
                    <ul>
                        <li><a href="/help"><?php print $customer['title']; ?></a></li>
                        <?php if (!empty($secondary_nav)): ?>
                        <li class="sencondary-menu" ><?php print render($secondary_nav); ?></li>
                        <?php else: ?>
                        <li><a class="login-nav" href="javascript:void(0)" data-target="#login-modal" data-toggle="modal"><?php print $login['title']; ?></a></li>
                        <li><a class="ragister-nav" href="javascript:void(0)" data-target="#login-modal" data-toggle="modal"><?php print $register['title']; ?></a></li>
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
                                    <span class="ppover_custom">Simply Say will reward you with 160 points on every order. Points can be redeemed when paying for your cards, select "Simply Pay" during checkout.</span>
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
    <div class="main_container ">


    <!-- <div class="ftr_post_slider">
           <div class="banner_main">
               <div class="container">
                   <div class="banner_img_fade">
                        <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/slide.png" class="img-responsive">
                   </div>
               </div>
           </div>
        </div> -->
      <div class="ftr_post_slider">
            <div id="postfooter_slider" class="ftrpost_slider">
              	
                        <?php 
				$type = "slide_show"; 
				$nodes = node_load_multiple(array(), array('type' => $type)); 
				foreach($nodes as $slide_node):
			?>
			<?php 
				$uri = $slide_node->field_slide_image['und'][0]['uri']; 
				$slider_image_path = file_create_url($uri);
			?>

	              <div class="slick_item">
	                <a href="#"> <img src="<?php print $slider_image_path; ?>" class="img-responsive"> </a>
	              </div>

             <?php endforeach;?>

             <!--  <div class="slick_item">
                <a href="#"> <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/slide.png" class="img-responsive"> </a>
              </div>
              <div class="slick_item">
                <a href="#"> <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/slide.png" class="img-responsive"> </a>
              </div>
              <div class="slick_item">
                <a href="#"> <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/slide.png" class="img-responsive"> </a>
              </div>
              <div class="slick_item">
                <a href="#"> <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/slide.png" class="img-responsive"> </a>
              </div> -->
            </div>       
      </div>
      <div class="container">
          <header role="banner" id="page-header">
            <?php if (!empty($site_slogan)): ?>
              <p class="lead"><?php print $site_slogan; ?></p>
            <?php endif; ?>

            <?php print render($page['header']); ?>
          </header> <!-- /#page-header -->
          <div class="row">
                  <?php if (!empty($page['sidebar_first'])): ?>
                      <aside class="col-sm-3" role="complementary">
                        <?php print render($page['sidebar_first']); ?>
                      </aside>  <!-- /#sidebar-first -->
                  <?php endif; ?>

                  <section<?php print $content_column_class; ?>>
                      <?php if (!empty($page['highlighted'])): ?>
                        <div class="highlighted jumbotron"><?php print render($page['highlighted']); ?></div>
                      <?php endif; ?>
                      <?php //if (!empty($breadcrumb)): print $breadcrumb; endif;?>
                      <a id="main-content"></a>
                      <?php print render($title_prefix); ?>
                      <?php if (!empty($title)): ?>
                        <!-- <h1 class="page-header"><?php print $title; ?></h1> -->
                      <?php endif; ?>
                      <?php print render($title_suffix); ?>
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

<?php global $user; if ($user->uid == 0): ?>

                        <div class="blankcard-modal">
                                      <div id="login-modal" class="modal register-modal fade " tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                                        <div class="modal-dialog modal-sm" role="document">
                                          <div class="modal-content">
                                          <button type="button" class="close close-btn" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                            <div id='login-pop' class="blankcard-select clearfix text-center">
                                              <h3>Welcome, Login Here</h3>
                                            <div id="login-appear">
                                             <?php $form = drupal_get_form('user_login_block');
                                                print render($form);
                                              ?>
                                                <div class="form-group">
                                                  <p class="login_cnt"> Don’t have an account?  <a href="javascript:void(0)" id="signup_link">Signup Here</a></p>
                                              </div>

                                              </div>
                                              <div id="register-appear" >
                                                <?php $ragister_form = drupal_get_form('user_register_form'); print drupal_render($ragister_form); ?>
                                           <div class="form-group">
                                              <p class="login_cnt"> Have an account? <a href="javascript:void(0)" id="login_link">Login Here</a></p>
                                          </div>
                                              </div>

                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                        </div>


<?php endif; ?>


                  </section>
                    
                  <div class="home-card-button">
                        <div class="title text-center">
                            <h2>Create <span>A Greeting Card</span> For Your Family and Friends</h2>
                        </div>
                        <div class="greetingcard-section">
                            <div class="col-sm-4">
                                <div class="greetingcard-col text-center">
                                    <a href="<?php print $standardcard['href']; ?>">
                                    <div class="greetingcard">
                                        <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/bday-card.jpg"/>
                                    </div>
                                    <div class="greetingcard-link">
                                            Browse <span>Greeting Cards </span>(quick & simple)
                                    </div>
                                    </a>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="greetingcard-col text-center">
                                    <a href="<?php print $photocard['href']; ?>">
                                    <div class="greetingcard">
                                        <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/photo-card.jpg"/>
                                    </div>
                                    <div class="greetingcard-link">
                                            Browse <span> Photo Cards </span>(upload your own photos)
                                    </div>
                                    </a>

                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="greetingcard-col text-center">
                                    <a href="javascript:void(0)" data-toggle="modal" data-target=".blank-card-type" >
                                    <div class="greetingcard">
                                        <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/blank-canvas.jpg"/>
                                    </div>
                                    <div class="greetingcard-link">
                                            Start with a<span> Blank Canvas </span>(be creative...)
                                    </div>
                                    </a>
                                    <div class="blankcard-modal">
                                      <div class="modal fade blank-card-type" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                                        <div class="modal-dialog modal-sm" role="document">
                                          <div class="modal-content">
                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                            <div class="blankcard-select clearfix">
                                              <h3>Please Select Card Type</h3>
                                                <ul>
                                                    <li class="active"><a href="/content/blank-card-portrait">
                                                      <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/blank-portrait.png" class="img-responsive" alt=""/>
                                                      <h4>Blank Card - Portrait</h4>
                                                    </a></li>
                                                    <li><a href="/content/blank-card-landscape">
                                                      <img src="<?php echo $base_path;?><?php print drupal_get_path('theme',$GLOBALS['theme']);?>/images/blank-landscape.png" class="img-responsive" alt=""/>
                                                      <h4>Blank Card - Landscape</h4>
                                                    </a></li>
                                                </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                  </div>

                  <?php if (!empty($page['sidebar_second'])): ?>
                      <aside class="col-sm-3" role="complementary">
                        <?php print render($page['sidebar_second']); ?>
                      </aside>  <!-- /#sidebar-second -->
                  <?php endif; ?>
          </div>
      </div>
      <div class="featured-section">
              <div class="container">
                  <div class="row">
                        <div class="feature-cards">
                            <!-- <div class="title text-center">
                                <h2>Featured Card Categories</h2>
                            </div> -->
                          <?php //print views_embed_view('featured_card_categories', 'block'); ?>
                          <?php print views_embed_view('featured_card_categories', 'block_2'); ?>
                          <?php print views_embed_view('featured_card_categories', 'block_1'); ?>
                        </div>
                  </div>
            </div> 
      </div>
      <div class="memorable-section text-center">
                <div class="container">
                    <div class="row">
                        <div col-sm-12>
                            <div class="title">
                                <h2>Create Memorable Greeting Cards</h2>
                            </div>
                            <div class="col-sm-1"></div>
                            <div class="col-sm-10"><p>At Simply Say you can create you own personalised Greeting Cards. Using our card design tools you can add photos of family and friends directly from your favourite Social Networks.</p></div>
                            <div class="col-sm-1"></div>
                            <div><a href="/how-it-works"><button type="button">TELL ME HOW THIS WORKS...</button></a></div>
                        </div>
                    </div>
                </div>
      </div>   
    </div>
    <!--Main container sec end-->
    <!--Footer sec start-->

<?php if (!empty($page['footer'])): ?>
  <footer id="footer" class="footer_sec">
      <div class="container">
      
      <?php print render($page['footer']); ?>
      </div>
  </footer>
<?php endif; ?>
        <!--Footer sec end-->
 
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
            <h5> Loading... </h5>
        </div>
 </div>
