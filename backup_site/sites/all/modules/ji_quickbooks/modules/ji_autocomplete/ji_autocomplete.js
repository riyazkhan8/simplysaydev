
/**
 * @file:
 * Converts textfield to a autocomplete deluxe widget.
 */

(function ($) {
  'use strict';
  Drupal.ji_autocomplete = Drupal.ji_autocomplete || {};

  Drupal.behaviors.ji_autocomplete = {
    attach: function (context) {
      var autocomplete_settings = Drupal.settings.ji_autocomplete;

      $('input.ji-autocomplete-form').once(function () {
        new Drupal.ji_autocomplete.SingleWidget(autocomplete_settings[$(this).attr('id')]);
      });
    }
  };

  Drupal.ji_autocomplete.empty = {label: '- ' + Drupal.t('None') + ' -', value: ''};

  Drupal.ji_autocomplete.escapeRegex = function (value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/gi, '\\$&');
  };

  Drupal.ji_autocomplete.filter = function (array, term) {
    var matcher = new RegExp(Drupal.ji_autocomplete.escapeRegex(term), 'i');
    return $.grep(array, function (value) {
      return matcher.test(value.label || value.value || value);
    });
  };

  Drupal.ji_autocomplete.Widget = function () {
  };

  Drupal.ji_autocomplete.Widget.prototype.uri = null;

  Drupal.ji_autocomplete.Widget.prototype.acceptTerm = function (term) {
    return true;
  };

  Drupal.ji_autocomplete.Widget.prototype.init = function (settings) {
    if (navigator.appVersion.indexOf('MSIE 6.') !== -1) {
      return;
    }

    this.id = settings.input_id;
    this.jqObject = $('#' + this.id);

    this.uri = settings.uri;
    this.multiple = settings.multiple;
    this.required = settings.required;
    this.limit = settings.limit;
    this.synonyms = typeof settings.use_synonyms == 'undefined' ? false : settings.use_synonyms;
    this.not_found_message = typeof settings.use_synonyms == 'undefined' ? '"@term" not found. Add?' : settings.not_found_message;

    this.wrapper = '""';

    if (typeof settings.delimiter == 'undefined') {
      this.delimiter = true;
    }
    else {
      this.delimiter = settings.delimiter.charCodeAt(0);
    }

    this.items = {};

    var self = this;
    var parent = this.jqObject.parent();
    var parents_parent = this.jqObject.parent().parent();

    parents_parent.append(this.jqObject);
    parent.remove();
    parent = parents_parent;

    var generateValues = function (data, term) {
      var result = [];
      for (var terms in data) {
        if (self.acceptTerm(terms)) {
          result.push({
            label: data[terms],
            value: terms
          });
        }
      }
      if ($.isEmptyObject(result)) {
        result.push({
          label: Drupal.t(self.not_found_message, {'@term': term}),
          value: term,
          newTerm: true
        });
      }
      return result;
    };

    var cache = {};
    var lastXhr = null;

    this.source = function (request, response) {
      var term = request.term;
      if (term in cache) {
        response(generateValues(cache[term], term));
        return;
      }

      // Some server collapse two slashes if the term is empty, so insert at
      // least a whitespace. This whitespace will later on be trimmed in the
      // autocomplete callback.
      if (!term) {
        term = ' ';
      }
      request.synonyms = self.synonyms;
      var url = settings.uri + '/' + term + '/' + self.limit;
      lastXhr = $.getJSON(url, request, function (data, status, xhr) {
        cache[term] = data;
        if (xhr === lastXhr) {
          response(generateValues(data, term));
        }
      });
    };

    this.jqObject.autocomplete({
      source: this.source,
      minLength: settings.min_length
    });

    var jqObject = this.jqObject;

    var autocompleteDataKey = typeof (this.jqObject.data('autocomplete')) === 'object' ? 'item.autocomplete' : 'ui-autocomplete';

    var throbber = $('<div class="ji-autocomplete-throbber ji-autocomplete-closed">&nbsp;</div>').insertAfter(jqObject);

    this.jqObject.bind('autocompletesearch', function (event, ui) {
      throbber.removeClass('autocomplete-closed');
      throbber.addClass('autocomplete-open');
    });

    this.jqObject.bind('autocompleteopen', function (event, ui) {
      throbber.addClass('ji-autocomplete-closed');
      throbber.removeClass('ji-autocomplete-open');
    });

    // Monkey patch the _renderItem function jquery so we can highlight the
    // text, that we already entered.
    $.ui.autocomplete.prototype._renderItem = function (ul, item) {
      // Adds to a "global" variable so we can double check list.
      Drupal.ji_autocomplete.SingleWidget.prototype.items[item.value] = item.label;

      var t = item.label;
      if (this.term !== '') {
        var escapedValue = Drupal.ji_autocomplete.escapeRegex(this.term);
        var re = new RegExp('()*""' + escapedValue + '""|' + escapedValue + '()*', 'gi');
        t = item.label.replace(re, '<span class="ji-autocomplete-highlight-char">$&</span>');
      }

      return $('<li></li>')
          .data(autocompleteDataKey, item)
          .append('<a>' + t + '</a>')
          .appendTo(ul);
    };
  };

  Drupal.ji_autocomplete.Widget.prototype.generateValues = function (data) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
      result.push(data[i]);
    }
    return result;
  };

  Drupal.ji_autocomplete.SingleWidget = function (settings) {
    this.init(settings);
    this.setup();
    this.jqObject.addClass('ji-autocomplete-form-single');
  };

  Drupal.ji_autocomplete.SingleWidget.prototype = new Drupal.ji_autocomplete.Widget();

  Drupal.ji_autocomplete.SingleWidget.prototype.items = {};

  Drupal.ji_autocomplete.SingleWidget.Item = function (widget, item) {
    if (item.newTerm === true) {
      item.label = item.value;
    }
    var input = $('#' + widget.id);
    var rowid = input.attr('rowid');
    $(input).val(item.label);
    // Prevents agency_id form field from containing text when a new
    // entry is added. We want it empty so JI QuickBooks can request
    // QBO create a new one.
    if (item.newTerm !== true) {
      $('#agency-id-' + rowid).val(item.value);
    }
    else {
      $('#agency-id-' + rowid).val('');
    }
  };

  Drupal.ji_autocomplete.SingleWidget.prototype.setup = function () {
    var jqObject = this.jqObject;
    var parent = jqObject.parent();

    var self = this;

    // Adds a value to the list.
    this.addValue = function (ui_item) {
      Drupal.ji_autocomplete.SingleWidget.Item(self, ui_item);
    };

    parent.mousedown(function () {
      if (parent.hasClass('ji-autocomplete-single-open')) {
        jqObject.autocomplete('close');
      }
      else {
        jqObject.autocomplete('search', '');
      }
    });

    jqObject.bind('autocompleteselect', function (event, ui) {
      self.addValue(ui.item);
      // Return false to prevent setting the last term as value for the jqObject.
      return false;
    });

    jqObject.bind('autocompletechange', function (event, ui) {
      // User didn't click on the list but typed a new agency name.
      if (ui.item === null) {
        var items = Drupal.ji_autocomplete.SingleWidget.prototype.items;

        var input = $('#' + event.currentTarget.id);
        var rowid = input.attr('rowid');

        // By default, clear value. It'll be set correctly below.
        $('#agency-id-' + rowid).val('');

        $.each(items, function (key, value) {
          // lower case so we can simply do a quick match.
          if (input.val().toLowerCase() === value.toLowerCase()) {
            // Since name exists, update it with existing case.
            input.val(value);

            // Update agency-id input field
            $('#agency-id-' + rowid).val(key);
          }
        });
      }
    });
  };
})(jQuery);
