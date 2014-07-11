/*global define */

define([
	'marionette',
	'tpl!modules/Application/templates/about.html',
    'underscore',
], function (Marionette, htmlTemplate, _) {
	'use strict';

	return Marionette.ItemView.extend({

        template: htmlTemplate,

        initialize: function (options) {

        },

        onRender: function () {

        }

	});

});
