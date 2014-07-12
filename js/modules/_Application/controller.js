/*global define */

define([
    'app',
    'modules/Application/views/HomeView'
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
            require(['modules/Application/views/aboutView'], function(AboutView) {
                app.mainRegion.show(new AboutView());
            });
        },

    };
});