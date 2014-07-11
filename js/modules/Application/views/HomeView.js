/*global define */

define([
	'marionette',
	'tpl!modules/Application/templates/pages/home.html',
    'underscore',
], function (Marionette, htmlTemplate, _) {
	'use strict';

	return Marionette.ItemView.extend({

        template: htmlTemplate,

        initialize: function (options) {
            console.log(options);
        },

        onRender: function () {

        }



	});

});
