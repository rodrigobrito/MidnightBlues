/*jslint browser: true, devel: true, nomen: true*/
/*global $, jQuery, define, app, _, require*/

define([], function () {

    'use strict';

    return {
        /**
         * Exemplo de uma view carregada sob demanda com require
         */
        index: function () {
            require(['modules/instagram/views/instagram'], function (InstagramView) {
                app.mainRegion.show(new InstagramView({
                    displayItens: 18,
                    columnGrid: 2
                }));
            });
        }

    };
});
