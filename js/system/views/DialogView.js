/*global define */

define([
	'marionette'
], function (Marionette) {
	'use strict';

	return Marionette.ItemView.extend({
		events: {
            'click .dismiss': 'dismiss'
        },

        dismiss: function(e) {
            e.preventDefault();
            this.trigger('dialog:close');
        },
        onRender: function () {

            this.$('.modal').modal('show');

            this.$('.modal').css('z-index', 1057);
            $('.modal-backdrop:last-child').css('z-index', 1056);
        }
	});
});
