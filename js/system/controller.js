/*global define */

define([
    'app',
    'system/views/Docs'
], function(app, Docs) {

    'use strict';

    return {


        showDocs: function() {
            app.mainRegion.show(new Docs());
        },

        /**
         * Exemplo de uma view carregada sob demanda com require
         */
        notFound: function (route) {

            console.log(route);
            console.error('Rota não encontrada');

            require(['system/views/NotFound'], function(NotFound) {
                app.mainRegion.show(new NotFound({
                    model: new Backbone.Model({
                        'route': route
                    })
                }));
            });
        },

    };
});
