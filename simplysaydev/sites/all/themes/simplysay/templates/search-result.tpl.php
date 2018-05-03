<?php
$path = '';

if (isset($result['node']->nid) && $result['node']->type == 'display_card') {


	$node = node_load($result['node']->nid);
	//print "<pre>"; print_r($node->field_product_refer['und'][0]['product_id']); 

	$product_id = $node->field_product_refer['und'][0]['product_id'];

	$product = commerce_product_load($product_id);

	$uri = $product->field_card_image['und'][0]['uri'];

	//print "<pre>"; print_r($product->field_card_image['und'][0]['uri']);

	$path = file_create_url($uri);


	//print render();
	//exit;
}

?>
<div class="col-sm-4">
	<div class="card-result">
		
	<!-- <h2><a href="<?php print $url; ?>"><?php print $title?></a></h2> -->

	 <?php if (!empty($path)): ?>
	    	<div class="card-image">
				<img src="<?php print $path ?>">
			</div>
	  <?php endif; ?>

	</div>
	<div class="search-buy" >
		<a href="<?php print $url; ?>">BUY</a>
	</div>
</div>