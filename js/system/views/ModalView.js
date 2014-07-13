/*global define */

define([
    'marionette'
], function(Marionette) {
    'use strict';

    return Marionette.ItemView.extend({

        initialize: function(options) {

            var modalContainer = $('<div></div>').attr('id', options.innerView.cid).appendTo('#modal-area');

            this.setElement(modalContainer);

        },

        dismiss: function(e) {
            e.preventDefault();
            this.onDestroy();
            app.vent.trigger('dialog:close', {
                idViewClosed: this.el
            });
        },

        onRender: function() {

            // obtendo o z-index mais alto existente no momento
            var highestZIndex = $('.modal-backdrop:last-child').css('z-index');

            // mostrando o modal
            this.$('.modal').modal('show');

            // Renderizar dentro do modal a View recebida como parametro
            this.options.innerView.setElement(this.$('.innerView'));
            this.options.innerView.render();

            // necessário para o scroll do corpo do modal
            this.$(".modal-body").css({
                "max-height": $(window).height() - 100
            });

            // corrigindo ajustando o z-index para ficar no topo
            if (highestZIndex) {
                this.$('.modal').css('z-index', highestZIndex + 2);
                $('.modal-backdrop:last-child').css('z-index', highestZIndex + 1);
            }
        },

        events: {
            'click .dismiss': 'dismiss'
        },

        onDestroy: function() {
            console.log('destroy');
            this.options.innerView.destroy();
            this.off();
        }

    });
});
