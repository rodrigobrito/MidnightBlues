/*global define */

define([
    'app',
    'system/views/HomeView'
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
        showAbout: function() {
            require(['system/views/aboutView'], function(AboutView) {
                app.mainRegion.show(new AboutView());
            });
        },

    };
});