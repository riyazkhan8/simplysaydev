<?php
/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php 
global $user;
global $base_path;
global $base_url;
$userid = $user->uid;
if($userid >0 )
{
if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?><!-- 
<?php foreach ($rows as $id => $row): ?>
  <div<?php if ($classes_array[$id]): ?> class="<?php print $classes_array[$id]; ?>"<?php endif; ?>>
    <?php print $row; ?>
  </div>
<?php endforeach; ?> -->
<?php
if(isset($_POST['getheartresult']))
{
	$heart_value = $_POST['getheartresult'];
	$entity_id = $_POST['getentity_id'];
	if($heart_value == 100)
	{
		$query_check = db_select('votingapi_vote', 'vi')
                                  ->fields('vi')
                                  ->condition('vi.uid',$userid)
                                  ->condition('vi.entity_id',$entity_id)
                                  ->execute();
		$record_check = $query_check->fetchAll();
		$count_check = count($record_check);
		if($count_check > 0)
		{
			db_delete('votingapi_vote')
				  ->condition('entity_id', $entity_id)
				  ->condition('uid',$userid)
				  ->execute();
		}
	}
	exit;
}

if(isset($_POST['getresult']))
{
  $saved_begin = $_POST['getresult']; 
}
else
{
  $saved_begin = 0;
}
$query = db_select('votingapi_vote', 'vi')
                                  ->fields('vi')
                                  ->condition('vi.uid',$userid)
                                  ->orderBy('vi.entity_id','ASC')
                                  ->range($saved_begin, 6)
                                ->execute();
$record = $query->fetchAll();
// print_r($record);
if(isset($_POST['getresult'])){
	// print_r($record);
	// echo "<br>";
	$count_val = count($record);
	if($count_val > 0)
	{
		$k = $saved_begin;
		for($i=0;$i<$count_val;$i++)
		{?>
			<?php 
			$query_card_image_fetch = db_select('field_data_field_card_sample_image', 'fmid')
			->fields('fmid')
			->condition('fmid.entity_id', $record[$i]->entity_id)
			->execute();
			$record_card_fetch = $query_card_image_fetch->fetchAll();
			$count_card_fetch = count($record_card_fetch);
			if ($count_card_fetch > 0) 
			{
				$fidd = $record_card_fetch[0]->field_card_sample_image_fid;
				$final_query_card = db_select('file_managed', 'fm')
				->fields('fm')
				->condition('fm.fid', $fidd)
				->execute();
				$record_card_success = $final_query_card->fetchAll();
				$count_card_success = count($record_card_success);    
				if ($count_card_success > 0) 
				{
					$imageuri = $record_card_success[0]->uri;
					global $base_pathh;
					global $base_urll;
					$path = file_create_url($imageuri);
					$card_image = "<img class='img-responsive' src='".$path."' id='cart_card_image' width='336' height='480'>";
				}
			}
			$query_product_title = db_select('field_data_field_product_refer', 'ftl')
			->fields('ftl')
			->condition('ftl.field_product_refer_product_id', $record[$i]->entity_id)
			->execute();
			$record_title = $query_product_title->fetchAll();
			$count_card_title = count($record_title);
			if ($count_card_title > 0) 
			{
				$nid = $record_title[0]->entity_id;
				$query_url = db_select('url_alias', 'uls')
					->fields('uls')
					->condition('uls.source', 'node/'.$nid)
					->execute();
					$final_url = $query_url->fetchAll();
					$count_url = count($final_url);
					if ($count_url > 0)
					{
						$result_url = $final_url[0]->alias;
					} 
			}
	      ?>
	    <?php 
	    $result.="<div id='like_heart$k' class='views-row views-row-$k'>";
	    $result.= "<div class='views-field views-field-field-card-sample-image'>   
     <span class='field-content'>
     	<a href='$base_url/$result_url'>".$card_image."</a>
     </span>
       </div>
       <div class='views-field views-field-url'> <span class='field-content'><a href='$base_url/$result_url'> BUY</a></span></div>
	      <div class='views-field views-field-field-rating'>        
	      	<span class='field-content'>
	      <div class='fivestar-hearts'>
	<div class='fivestar-widget clearfix heartfill'>
		<div class='cancel'>
			<a href='javascript:void(0)' class='heart_fill_in' data-divid='$k' data-pid='".$record[$i]->entity_id."' data-vid='".$record[$i]->value."' title='Cancel rating'>Cancel rating</a>
		</div>
	</div></div></div></span></div>";
		$result.="</div>";
		$k++;
		}
	}
	echo $result;
	exit;
} 
?>
<div class="like-card" id="like-card-content">
	<?php
	$count = count($record);
	if($count > 0)
	{
		for($i=0;$i<$count;$i++)
		{?>
	<div id="like_heart<?php echo $i; ?>" class="views-row views-row-<?php echo $i; ?>">
	<?php 
			$query_card_image_fetch = db_select('field_data_field_card_sample_image', 'fmid')
			->fields('fmid')
			->condition('fmid.entity_id', $record[$i]->entity_id)
			->execute();
			$record_card_fetch = $query_card_image_fetch->fetchAll();
			$count_card_fetch = count($record_card_fetch);
			if ($count_card_fetch > 0) 
			{
				$fidd = $record_card_fetch[0]->field_card_sample_image_fid;
				$final_query_card = db_select('file_managed', 'fm')
				->fields('fm')
				->condition('fm.fid', $fidd)
				->execute();
				$record_card_success = $final_query_card->fetchAll();
				$count_card_success = count($record_card_success);    
				if ($count_card_success > 0) 
				{
					$imageuri = $record_card_success[0]->uri;
					global $base_pathh;
					global $base_urll;
					$path = file_create_url($imageuri);
					$card_image = "<img class='img-responsive' src='".$path."' id='cart_card_image' width='336' height='480'>";
				}
			}
			$query_product_title = db_select('field_data_field_product_refer', 'ftl')
			->fields('ftl')
			->condition('ftl.field_product_refer_product_id', $record[$i]->entity_id)
			->execute();
			$record_title = $query_product_title->fetchAll();
			$count_card_title = count($record_title);
			if ($count_card_title > 0) 
			{
				$nid = $record_title[0]->entity_id;
				$query_url = db_select('url_alias', 'uls')
					->fields('uls')
					->condition('uls.source', 'node/'.$nid)
					->execute();
					$final_url = $query_url->fetchAll();
					$count_url = count($final_url);
					if ($count_url > 0)
					{
						$result_url = $final_url[0]->alias;
					} 
			}
	      ?>
	    <?php 
	    print "<div class='views-field views-field-field-card-sample-image'>   
     <span class='field-content'>
     	<a href='$base_url/$result_url'>".$card_image."</a>
     </span>
       </div>";
	    ?>
	      <div class="views-field views-field-url"> <span class='field-content'><a href='<?php echo $base_url.'/'.$result_url; ?>'> BUY</a></span></div>
	      <div class="views-field views-field-field-rating">        
	      	<span class="field-content">
	      <div class="fivestar-hearts">
	<div class="fivestar-widget heartfill">
		<div class="cancel">
			<a href="javascript:void(0)" class="heart_fill_in" data-divid="<?php echo $i;?>" data-pid="<?php echo $record[$i]->entity_id; ?>" data-vid="<?php echo $record[$i]->value; ?>" title="Cancel rating">Cancel rating</a>
		</div>
	</div>
</div>
</span>
</div>
	      <!-- <button class="heart_fill_in" data-divid="<?php echo $i;?>" data-pid="<?php echo $record[$i]->entity_id; ?>" data-vid="<?php echo $record[$i]->value; ?>">on</button> -->
	  </div>
	<?php
		}
	}
	?>
<input type="hidden" name="like_page" id="like_page" value='6'>
</div>
</div>
<ul class="pager pager-load-more-like"><li class="pager-next">
  <input type="button" id="load_like_card" value="Load More Results">
</ul>
 <script type="text/javascript">
$(document).ready(function(){
 $("#load_like_card").click(function(){
  loadmorefavourite();
 });
});

function loadmorefavourite()
{
 var val = document.getElementById("like_page").value;
 $.ajax({
 type: 'post',
 data: {
  getresult:val
 },
 success: function (response) {
 $( "#like-card-content" ).append( response );
$('.heart_fill_in').click(function(){
// var val = document.getElementById("like_page").value;
var heart_val = $(this).attr('data-vid');
var entity_id = $(this).attr('data-pid');
var div_id = $(this).attr('data-divid');
 $.ajax({
 type: 'post',
 data: {
  getheartresult:heart_val,
  getentity_id:entity_id,
 },
 success: function (response) {
 	$('#like_heart'+div_id).addClass('hide');
 }
 });
});
  document.getElementById("like_page").value = Number(val)+6;
 }
 });
}

$('.heart_fill_in').click(function(){
var heart_val = $(this).attr('data-vid');
var entity_id = $(this).attr('data-pid');
var div_id = $(this).attr('data-divid');
 $.ajax({
 type: 'post',
 data: {
  getheartresult:heart_val,
  getentity_id:entity_id,
 },
 success: function (response) {
 	$('#like_heart'+div_id).addClass('hide');
 }
 });
});
</script>
<?php } ?>