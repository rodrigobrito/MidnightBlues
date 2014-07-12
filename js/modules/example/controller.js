/*global define */

define([
    'app',
    'modules/example/views/HomeView'
], function(app, HomeView) {

    'use strict';

    return {

        /**
         * Mostrando a view Home, declarada como
         * dependência deste controller
         */
        index: function(pageName) {
            app.mainRegion.show(new HomeView({
                id: 'teste de paramentro'
            }));
        },

        /**
         * Exemplo de uma view carregada sob demanda com require
         */
        showInstagram: function() {
            require(['modules/example/views/instagram'], function(InstagramView) {
                app.mainRegion.show(new InstagramView());
            });
        },

    };
});