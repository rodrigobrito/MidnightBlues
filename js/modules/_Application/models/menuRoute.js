/*global define */

define([
	'backbone'
], function (Backbone) {
	'use strict';

	return Backbone.Model.extend({

		defaults: {
			title: 'Page title',
            active: false,
            name: '404'
		}

	});
});

