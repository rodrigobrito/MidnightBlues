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

            // mostrar modal
            this.$('.modal').modal('show');

            // fazer com que a mensagem sempre apareça no topo
            var best;
            var maxz;
            $('.modal').each(function(){
                var z = parseInt($(this).css('z-index'), 10);
                if (!best || maxz < z) {
                    best = this;
                    maxz = z;
                }
            });

            var newIndex = maxz + 12;
            this.$('.modal').css('z-index', newIndex + 2);
            $('.modal-backdrop:last-child').css('z-index', newIndex + 1);

        }
	});
});
