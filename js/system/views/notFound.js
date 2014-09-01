/*jslint browser: true, devel: true, nomen: true*/
/*global $, jQuery, define, app, _, require*/

define([
	'marionette',
	'tpl!system/templates/notFound.html',
    'underscore'
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
