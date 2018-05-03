<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */
?>
<?php 

	$product =  commerce_product_load($output);

    if (isset($product->field_card_sample_image['und'][0]['uri']) && !empty($product->field_card_sample_image['und'][0]['uri'])) {
        $image_url = file_create_url($product->field_card_sample_image['und'][0]['uri']);
    }
    else
    {
        $image_url = file_create_url($product->field_card_image['und'][0]['uri']);
    }

 print "<img src='".$image_url."' class='img-responsive' >";

//print $output; 


?>