/*global define */

define([
	'marionette',
	'tpl!system/templates/menuItem.html',
    'system/models/menuRoute',

], function (Marionette, htmlTemplate, MenuRoute) {
	'use strict';

	return Marionette.ItemView.extend({
		template: htmlTemplate,
        tagName: 'li',
        model: MenuRoute,

		ui: {
			link: 'a'
		},

		events: {
			'click a': 'activateMenu'
		},
        modelEvents: {
            "change:active": function() {
                this.render();
            }
        },

        activateMenu: function (e) {
            var app = window.app;
            app.vent.trigger('menu:activate', this.model);
		},

        onRender: function() {
            if(this.model.get('active')) this.$el.addClass('active');
        }

	});
});
