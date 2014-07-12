/*global define */

define([
	'marionette',
    'tpl!modules/Application/templates/notification.html'
], function (Marionette, notificationTpl) {
	'use strict';

	return Marionette.ItemView.extend({
        template: notificationTpl,
		events: {
            'click .dismiss': function(e) {
                e.preventDefault();
                this.trigger('notification:close');
            }
        }
	});
});
