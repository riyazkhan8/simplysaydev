<?php
/**
 * @file template file for 'view_order_status' theme
 * 
 * Available variables are:
 *   $myvar1
 *   $myvar2 (array with the following keys -- 'option1', and 'option2')
 *   $myobj (object)
 */
	// echo "<pre>".print_r(count($myobj->notes),1)."<pre>";exit();
?>
<!-- <div>
	<div><?php // print $myvar1; ?></div>
	<div><?php // print $myvar2['option1']; ?></div>
	<div><?php // print $myobj->thisData; ?></div>
</div> -->

<div id="order-status-div">
	<div class="row">
		<div class="col-sm-3"></div>
		<div class="col-sm-3 col-xs-7">
			<b>Order ID:</b> <?php echo $myobj->order_id; ?>/<?php echo $myobj->product_id; ?>

			<br/>
			<br/>

			<dl>
				<dt>Name:</dt>
				<dd><?php echo $myobj->name_line; ?></dd>
			</dl>

			<dl>
				<dt>Delivery Address:</dt>
				<dd><?php echo $myobj->name_line; ?></dd>
				<dd><?php echo $myobj->address1; ?></dd>
				<dd><?php echo $myobj->address2; ?></dd>
				<dd><?php echo $myobj->locality; ?></dd>
				<dd><?php echo $myobj->administrative_area; ?></dd>
				<dd><?php echo $myobj->postal_code; ?>,&nbsp;<?php echo $myobj->country; ?></dd>
			</dl>

			<dl>
				<dt>Delivery Type:</dt>
				<dd><?php echo $myobj->delivery_type; ?></dd>
			</dl>

			<b>Quantity:&nbsp;</b><?php echo $myobj->quantity; ?>

			<br/>
			<br/>
			<!-- <br/>
			<br/> -->

		</div>
		<div class="col-sm-6 col-xs-5">
			<img src="<?php echo $myobj->product_image; ?>" alt="Product Image" style="width: 100px; height: 140px;">
		</div>
	</div>

	<input id="input_order_id" type="hidden" name="order_id" value="<?php echo $myobj->order_id;?>">
	<input id="input_product_id" type="hidden" name="line_item_id" value="<?php echo $myobj->product_id;?>">

	<div class="row">
		<div class="col-sm-offset-3 col-sm-6 col-xs-offset-1 col-xs-10" id="ajax-error-message" style="display: none;">
		     <!-- <i class="fa fa-check"></i> -->
	     	Replace this text with your own text.
     	</div>
	</div>

	<div class="row text-center">
		<div class="col-sm-3"></div>
		<div class="col-sm-4 col-sm-12">
			<input id="btn-pending-order-view-status" class="btn btn-info btn-flat" data-toggle="modal" data-target="#myModal" type="button" name="" value="Pending">
			&nbsp;&nbsp;&nbsp;&nbsp;
			<input id="view-order-status-btn-complete" class="btn btn-info btn-flat" type="button" name="" value="Complete">
		</div>
	</div>
</div>

<br/>

<?php if (count($myobj->notes) > 0) : ?>
	<table class="table table-bordered" width="60%">
		<colgroup>
			<col width="5%">
			<col width="65%">
			<col width="30%">
		</colgroup>
		<thead>
			<th style="text-align: right;">S.No.</th>
			<th>Notes</th>
			<th>Posted At</th>
		</thead>
		<tbody id="notes-table-tbody">
		<?php $sno = 1;
			foreach($myobj->notes as $note): ?>
			<tr>
				<td style="text-align: right; padding-right: 20px;"><?php echo $sno; ?></td>
				<td><?php echo $note->notes; ?></td>
				<td><?php echo $note->created_at; ?></td>
			</tr>
			<?php $sno++; ?>
		<?php endforeach; ?>
		</tbody>
	</table>
<?php endif; ?>

<div class="row" id="ajax-status-complete-div" style="display: none;">
	<div id="order-status-complete-msg" class="col-sm-offset-3 col-sm-6 col-xs-offset-1 col-xs-10 isa_success">Order status successfully updated!</div>
</div>

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Order Status Notes</h4>
      </div>
      <div class="modal-body">
		<form>
			<div class="form-group">
				<label for="order_status_notes_textarea">Notes:</label>
				<textarea class="form-control" rows="5" id="order_status_notes_textarea"></textarea>
				<div id="notes-validation-error-div" class="isa_error" style="display: none;">Please enter some notes.</div>
			</div> 		
		</form> 
      </div>
      <div class="modal-footer">
      	<button id="order-status-notes-save" type="button" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>