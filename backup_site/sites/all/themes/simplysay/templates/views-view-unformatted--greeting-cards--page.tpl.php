<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<?php foreach ($rows as $id => $row): ?>
<?php $finalArray = explode('</div>', $row);
$dirtyString = $finalArray[0];
$cleanString = filter_var($dirtyString, FILTER_SANITIZE_STRING);
$check_status = trim($cleanString); 
if($check_status == 'Active'){?>
  <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
    <?php print $row; ?>
  </div>
  <?php } ?>
<?php endforeach; ?>