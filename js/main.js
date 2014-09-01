/*jslint browser: true, devel: true, nomen: true*/
/*global $, jQuery, define, app, _, require*/

require.config({

	paths: {
		underscore: 'lib/underscore/underscore',
		backbone: 'lib/backbone/backbone',
		marionette: 'lib/backbone.marionette/lib/backbone.marionette',
		jquery: 'lib/jquery/dist/jquery.min',
		localStorage: 'lib/backbone.localStorage/backbone.localStorage',
		tpl: 'lib/requirejs-tpl/tpl',
		bootstrap: 'lib/bootstrap/dist/js/bootstrap.min',
		toastr: 'lib/toastr/toastr.min',
		gritter: 'lib/jquery.gritter/js/jquery.gritter.min',
		async: 'lib/requirejs-plugins/src/async'
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
		},

		toastr: {
			deps: ['jquery']
		},

		gritter: {
			deps: ['jquery']
		}
	},

	waitSeconds: 60

});

require([
	'app',
	'jquery',
	'bootstrap'
], function (app) {

	'use strict';
	app.start();

});
