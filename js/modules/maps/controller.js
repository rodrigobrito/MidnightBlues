/*global define */

define([], function() {

    'use strict';

    return {
        /**
         * Exemplo de uma view carregada sob demanda com require
         */
        index: function() {
            require(['modules/maps/views/maps'], function(MapsView) {
                app.mainRegion.show(new MapsView({
                    displayItens: 18,
                    columnGrid: 2,
                }));
            });
        },

    };
});
