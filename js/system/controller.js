/*jslint browser: true, devel: true, nomen: true*/
/*global $, jQuery, define, app, _, require, Backbone*/

define([
    'app',
    'system/views/docs'
], function (app, Docs) {

    'use strict';

    return {


        showDocs: function () {
            app.mainRegion.show(new Docs());
        },

        /**
         * Exemplo de uma view carregada sob demanda com require
         */
        notFound: function (route) {

            console.log(route);
            console.error('Rota não encontrada');

            require(['system/views/notFound'], function (NotFound) {
                app.mainRegion.show(new NotFound({
                    model: new Backbone.Model({
                        'route': route
                    })
                }));
            });
        }

    };
});
