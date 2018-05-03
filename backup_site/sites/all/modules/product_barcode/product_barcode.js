(function ($) {
    $(document).ready(function() {
        $('#view-order-status-btn-complete').click(function() {
            $('#ajax-error-message').hide();

            var order_id = $('#input_order_id').val();
            var product_id = $('#input_product_id').val();
            
            bootbox.confirm({
                message: "Are you sure you want to set completed this order?",
                size: 'small',
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'No',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    if (result) {
                        jQuery.ajax({
                            url: Drupal.settings.basePath + 'barcode/ajaxupdateorderstatus',
                            type: "POST",
                            data: { order_id: order_id, line_item_id: product_id },
                            dataType: "json",
                            success: function(data) {
                                if (data.status == "success") {
                                    $('#order-status-div').hide();
                                    $('#order-status-complete-msg').html(data.message).removeClass('isa_error').addClass('isa_success');
                                    // $('#ajax-status-complete-div').show().delay(6000).fadeOut();
                                    $('#ajax-status-complete-div').show();
                                } else {
                                    $('#ajax-error-message').html(data.message).removeClass('isa_success').addClass('isa_error').show();
                                }
                            }
                        });
                    }
                }
            });
        });

        $('#order-status-notes-save').click(function() {
            var order_id = $('#input_order_id').val();
            var product_id = $('#input_product_id').val();
            var notes = $('#order_status_notes_textarea').val();

            $('#notes-validation-error-div').hide();

            if (!notes) {
                /*bootbox.alert({
                    message: "This is the small alert!",
                    size: 'small'
                });*/
                $('#notes-validation-error-div').show().delay(6000).fadeOut();
                return;
            }

            jQuery.ajax({
                url: Drupal.settings.basePath + 'barcode/ajaxsaveorderstatusnotes',
                type: "POST",
                data: { order_id: order_id, line_item_id: product_id, notes: notes },
                dataType: "json",
                success: function(data) {
                    $('#myModal').modal('toggle');
                    $('#ajax-error-message').html(data.message).removeClass('isa_error').addClass('isa_success').show().delay(6000).fadeOut();

                    var op = "";
                    var slno = 1;
                    for(var i in data.notes) {
                        var record = data.notes[i];
                        op += '<tr>';
                        op += '<td style="text-align: right; padding-right: 20px;">' + slno + '</td>';
                        op += '<td>' + record.notes + '</td>';
                        op += '<td>' + record.created_at + '</td>';
                        op += '</tr>';

                        slno++;
                    }

                    if (data.notes.length == 0) {
                        op += '<tr>';
                        op += '<td colspan="3">No data found!</td>';
                        op += '</tr>';
                    }

                    $('#notes-table-tbody').html(op);
                },
                error: function(err) {
                    $('#ajax-error-message').html(err.message).removeClass('isa_success').addClass('isa_error').show().delay(6000).fadeOut();
                }
            });
        });

        $('#btn-pending-order-view-status').click(function() {
            $('#order_status_notes_textarea').val('');
        });

    });
})(jQuery);