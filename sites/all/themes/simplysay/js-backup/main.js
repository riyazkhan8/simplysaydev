jQuery(document).ready(function(jQuery){
	//open/close lateral filter
	jQuery('.cd-filter-trigger').on('click', function(){
		triggerFilter(true);
	});
	jQuery('.cd-filter .cd-close').on('click', function(){
		triggerFilter(false);
	});

	function triggerFilter(jQuerybool) {
		var elementsToTrigger = jQuery([jQuery('.cd-filter-trigger'), jQuery('.cd-filter'), jQuery('.cd-tab-filter'), jQuery('.cd-gallery')]);
		elementsToTrigger.each(function(){
			jQuery(this).toggleClass('filter-is-visible', jQuerybool);
		});
	}

	//mobile version - detect click event on filters tab
	var filter_tab_placeholder = jQuery('.cd-tab-filter .placeholder a'),
		filter_tab_placeholder_default_value = 'Select',
		filter_tab_placeholder_text = filter_tab_placeholder.text();
	
	jQuery('.cd-tab-filter li').on('click', function(event){
		//detect which tab filter item was selected
		var selected_filter = jQuery(event.target).data('type');
			
		//check if user has clicked the placeholder item
		if( jQuery(event.target).is(filter_tab_placeholder) ) {
			(filter_tab_placeholder_default_value == filter_tab_placeholder.text()) ? filter_tab_placeholder.text(filter_tab_placeholder_text) : filter_tab_placeholder.text(filter_tab_placeholder_default_value) ;
			jQuery('.cd-tab-filter').toggleClass('is-open');

		//check if user has clicked a filter already selected 
		} else if( filter_tab_placeholder.data('type') == selected_filter ) {
			filter_tab_placeholder.text(jQuery(event.target).text());
			jQuery('.cd-tab-filter').removeClass('is-open');	

		} else {
			//close the dropdown and change placeholder text/data-type value
			jQuery('.cd-tab-filter').removeClass('is-open');
			filter_tab_placeholder.text(jQuery(event.target).text()).data('type', selected_filter);
			filter_tab_placeholder_text = jQuery(event.target).text();
			
			//add class selected to the selected filter item
			jQuery('.cd-tab-filter .selected').removeClass('selected');
			jQuery(event.target).addClass('selected');
		}
	});
	
	//close filter dropdown inside lateral .cd-filter 
	jQuery('.cd-filter-block h4').on('click', function(){
		jQuery(this).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
	})

	//fix lateral filter and gallery on scrolling
	jQuery(window).on('scroll', function(){
		(!window.requestAnimationFrame) ? fixGallery() : window.requestAnimationFrame(fixGallery);
	});

	function fixGallery() {
		var offsetTop = jQuery('.cd-main-content').offset().top,
			scrollTop = jQuery(window).scrollTop();
		( scrollTop >= offsetTop ) ? jQuery('.cd-main-content').addClass('is-fixed') : jQuery('.cd-main-content').removeClass('is-fixed');
	}

	/************************************
		MitItUp filter settings
		More details: 
		https://mixitup.kunkalabs.com/
		or:
		http://codepen.io/patrickkunka/
	*************************************/

	buttonFilter.init();
	jQuery('.cd-gallery ul').mixItUp({
	    controls: {
	    	enable: false
	    },
	    callbacks: {
	    	onMixStart: function(){
	    		jQuery('.cd-fail-message').fadeOut(200);
	    	},
	      	onMixFail: function(){
	      		jQuery('.cd-fail-message').fadeIn(200);
	    	}
	    }
	});

	//search filtering
	//credits http://codepen.io/edprats/pen/pzAdg
	var inputText;
	var jQuerymatching = jQuery();

	var delay = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
		    timer = setTimeout(callback, ms);
		};
	})();

	jQuery(".cd-filter-content input[type='search']").keyup(function(){
	  	// Delay function invoked to make sure user stopped typing
	  	delay(function(){
	    	inputText = jQuery(".cd-filter-content input[type='search']").val().toLowerCase();
	   		// Check to see if input field is empty
	    	if ((inputText.length) > 0) {            
	      		jQuery('.mix').each(function() {
		        	var jQuerythis = jQuery(this);
		        
		        	// add item to be filtered out if input text matches items inside the title   
		        	if(jQuerythis.attr('class').toLowerCase().match(inputText)) {
		          		jQuerymatching = jQuerymatching.add(this);
		        	} else {
		          		// removes any previously matched item
		          		jQuerymatching = jQuerymatching.not(this);
		        	}
	      		});
	      		jQuery('.cd-gallery ul').mixItUp('filter', jQuerymatching);
	    	} else {
	      		// resets the filter to show all item if input is empty
	      		jQuery('.cd-gallery ul').mixItUp('filter', 'all');
	    	}
	  	}, 200 );
	});
});

/*****************************************************
	MixItUp - Define a single object literal 
	to contain all filter custom functionality
*****************************************************/
var buttonFilter = {
  	// Declare any variables we will need as properties of the object
  	jQueryfilters: null,
  	groups: [],
  	outputArray: [],
  	outputString: '',
  
  	// The "init" method will run on document ready and cache any jQuery objects we will need.
  	init: function(){
    	var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.
    
    	self.jQueryfilters = jQuery('.cd-main-content');
    	self.jQuerycontainer = jQuery('.cd-gallery ul');
    
	    self.jQueryfilters.find('.cd-filters').each(function(){
	      	var jQuerythis = jQuery(this);
	      
		    self.groups.push({
		        jQueryinputs: jQuerythis.find('.filter'),
		        active: '',
		        tracker: false
		    });
	    });
	    
	    self.bindHandlers();
  	},
  
  	// The "bindHandlers" method will listen for whenever a button is clicked. 
  	bindHandlers: function(){
    	var self = this;

    	self.jQueryfilters.on('click', 'a', function(e){
	      	self.parseFilters();
    	});
	    self.jQueryfilters.on('change', function(){
	      self.parseFilters();           
	    });
  	},
  
  	parseFilters: function(){
	    var self = this;
	 
	    // loop through each filter group and grap the active filter from each one.
	    for(var i = 0, group; group = self.groups[i]; i++){
	    	group.active = [];
	    	group.jQueryinputs.each(function(){
	    		var jQuerythis = jQuery(this);
	    		if(jQuerythis.is('input[type="radio"]') || jQuerythis.is('input[type="checkbox"]')) {
	    			if(jQuerythis.is(':checked') ) {
	    				group.active.push(jQuerythis.attr('data-filter'));
	    			}
	    		} else if(jQuerythis.is('select')){
	    			group.active.push(jQuerythis.val());
	    		} else if( jQuerythis.find('.selected').length > 0 ) {
	    			group.active.push(jQuerythis.attr('data-filter'));
	    		}
	    	});
	    }
	    self.concatenate();
  	},
  
  	concatenate: function(){
    	var self = this;
    
    	self.outputString = ''; // Reset output string
    
	    for(var i = 0, group; group = self.groups[i]; i++){
	      	self.outputString += group.active;
	    }
    
	    // If the output string is empty, show all rather than none:    
	    !self.outputString.length && (self.outputString = 'all'); 
	
    	// Send the output string to MixItUp via the 'filter' method:    
		if(self.jQuerycontainer.mixItUp('isLoaded')){
	    	self.jQuerycontainer.mixItUp('filter', self.outputString);
		}
  	}
};
