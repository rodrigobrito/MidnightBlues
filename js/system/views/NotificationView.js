/*global define */

define([
	'marionette',
    'tpl!system/templates/notification.html'
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
