<?php
/**
 * @file
 * The primary PHP file for this theme.
 */

// function simplysay_theme($existing, $type, $theme, $path){
// 		return array(
// 			// The form ID.
// 			'user_profile_form' => array(
// 			// Forms always take the form argument.
// 			'arguments' => array('form' => NULL),
// 			'render element' => 'form',
// 			'template' => 'templates/user--profile--edit',
// 			),
// 	);
// }

drupal_add_js('https://checkout.stripe.com/checkout.js', array('type' => 'external'));         
//drupal_add_js(drupal_get_path('module', 'commerce_stripe') . '/commerce_stripe.js');


