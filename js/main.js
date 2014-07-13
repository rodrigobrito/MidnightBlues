require.config({

	paths: {
		underscore: 'lib/underscore/underscore',
		backbone: 'lib/backbone/backbone',
		marionette: 'lib/backbone.marionette/lib/backbone.marionette',
		jquery: 'lib/jquery/dist/jquery.min',
		localStorage: 'lib/backbone.localStorage/backbone.localStorage',
		tpl: 'lib/requirejs-tpl/tpl',
		bootstrap: 'lib/bootstrap/dist/js/bootstrap.min'
	},

	shim: {
		underscore: {
			exports: '_'
		},

		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},

		marionette: {
			exports: 'Backbone.Marionette',
			deps: ['backbone']
		},

		bootstrap: {
			deps: ['jquery']
		}

	},
	waitSeconds: 60
});

require([
	'app',
	'jquery',
	'bootstrap'
], function(app) {

	'use strict';
	app.start();

});
