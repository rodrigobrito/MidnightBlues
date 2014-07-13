/*global define */

define([
	'marionette'
], function (Marionette) {
	'use strict';

	return Marionette.ItemView.extend({



        events: {
            'click .dismiss': 'dismiss'
        },

        initialize: function (options) {

            var modalContainer = $('<div></div>').attr('id', options.innerView.cid).appendTo('#modal-area');

            this.setElement(modalContainer);

            // $('body').on('hidden.bs.modal', function (e) {
            //     console.log($(e.currentTarget));
            // });

        },

        dismiss: function(e) {
            e.preventDefault();
            this.onDestroy();
            app.vent.trigger('dialog:close', {idViewClosed: this.el});
        },

        onRender: function () {
            //console.log(this.options);
            this.$('.modal').modal('show');
            this.options.innerView.setElement(this.$('.innerView'));
            this.options.innerView.render();
        },

        onDestroy: function () {
            console.log('destroy');
            this.options.innerView.destroy();
            this.off();
        }

	});
});
