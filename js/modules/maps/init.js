/**
 *
 * Módulo (pacote) maps
 *
 */

define([
    'app',
    'marionette',
    'modules/maps/controller',
    //'modules/maps/router',
], function(app, Marionette, Controller ) {

        /**
         * Definindo as Rotas para este módulo.
         * Os métodos precisam existir no controller do módulo
         */
        var moduleRoutes = {
            'maps': 'index',
        },

        /*
        * Definindo o Router deste Módulo.
        * Isso pode ser feito em um arquivo separado, caso achar necessário.
        */
        Router = new Marionette.AppRouter({
            //controller recebido via require
            controller: Controller,
            // rotas deste módulo
            appRoutes: moduleRoutes
        }),

        /*
        * Definição do módulo maps, adicionando initializer
        * e associando nosso Router para módulo
        *
        */
        Module = app.module("maps", function(maps) {

            /**
             * evitando que este módulo seja carregado automaticamente
             */
            this.startWithParent = false;

            /**
             *  Definição das rotas que devem aparecer
             *  no menu principal da applicação
             */
            this.menuEntries = [
                {title: 'maps', route: 'maps'},
            ];

            /**
             *  Initializer do módulo
             */
            this.addInitializer(function () {
                console.log('Module:maps -> initialized');
                this.router = Router;
            });

        });

        return Module;
});
