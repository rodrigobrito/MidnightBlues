/*global define */

define([
	'backbone',
	'modules/Application/models/menuRoute'
], function (Backbone, MenuRoute) {
	'use strict';

	return Backbone.Collection.extend({
        initialize: function () {
            this.on('add', function(a){console.log(a)});
        },

		model: MenuRoute
	});
});
