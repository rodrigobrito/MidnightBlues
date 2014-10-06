define(['marionette', 'underscore','toastr','gritter'], function (Marionette, _, toastr, gritter) {	
		
 	/* App navigation handler.      
      ****************************/
   function setupNavigationHandler(app) {
        app.utils.canNavigate = function () { return true; };

        var defaultLoadUrl = Backbone.History.prototype.loadUrl;
        Backbone.History.prototype.loadUrl = function () {
            if (app.utils.canNavigate()) {
                //Set canNavigate to default behavior.
                app.utils.canNavigate = function () {
                    return true;
                };
                return defaultLoadUrl.apply(this, arguments);
            } else {
                history.back();
                return true;
            }
        };
    }

    function setupNotifiers(app) {
	    app.utils.showToastr = function (userOptions) {

	        var defaults = app.config.notify.toastr.defaults,
	            options = defaults;

	        if (userOptions) {
	            options = $.extend(defaults, userOptions);
	        }

	        if (toastr.hasOwnProperty(options.type)) {
	            toastr[options.type](options.text);
	        } else {
	            toastr.info(options.text);
	        }
	    };

	    app.utils.showGritter = function (userOptions) {

	        var defaults = config.notify.gritter.defaults,
	            options = defaults;

	        if (userOptions) {
	            options = $.extend(defaults, userOptions);

	            if (userOptions.hasOwnProperty('type')) {
	                options.class_name = 'gritter-' + userOptions.type;
	            }
	        }

	        $.gritter.add(options);
	    };

	     /**
	     * [notify description]
	     * @param  {[type]} userOptions [description]
	     * @return {[type]}             [description]
	     */
	    app.utils.notify = function (userOptions) {

	        var method,
	            sound,
	            defaults = {
	                component: 'Toastr'
	            },
	            options = defaults;

	        if (userOptions) {
	            options = $.extend(defaults, userOptions);
	        }

	        method = (function () {
	            return 'show' +
	                    options.component.charAt(0).toUpperCase() +
	                    options.component.substr(1);
	        }());

	        app.utils[method](options);

	        if (app.config.notify.playSound || options.playSound) {

	            sound = $('#sound-' + options.type);

	            if (sound.length) {
	                sound[0].play();
	            }

	        }
	    };    
    }

    function setupBackboneHelpers(app) {
    	/*  Turning off div wrap for Backbone.Marionette.ItemView.
	     *  Example:
	     *  onRender: function () {
	     *       app.utils.turnOffDivWrap(this);
	     *  }
	     *********************************************************/
	    app.utils.turnOffDivWrap = function (view) {
	        // Get rid of that pesky wrapping-div.
	        // Assumes 1 child element present in template.
	        view.$el = view.$el.children();
	        // Unwrap the element to prevent infinitely 
	        // nesting elements during re-render.
	        view.$el.unwrap();
	        view.setElement(view.$el);
	    };
    }

	function set(app) {
		app.utils = app.utils || {};
		setupBackboneHelpers(app);
		setupNavigationHandler(app);
		setupNotifiers(app);
	}

	return {
		set : set
	}

});