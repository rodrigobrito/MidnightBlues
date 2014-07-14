/*global define */

define([], function() {

    'use strict';

    return {
        /**
         * Exemplo de uma view carregada sob demanda com require
         */
        index: function() {
            require(['modules/instagram/views/instagram'], function(InstagramView) {
                app.mainRegion.show(new InstagramView());
            });
        },

    };
});
