/**
 *
 * Módulo (pacote) instagram
 *
 */

define([
    'app',
    'marionette',
    'modules/instagram/controller',
    //'modules/instagram/router',
], function(app, Marionette, Controller ) {

        /**
         * Definindo as Rotas para este módulo.
         * Os métodos precisam existir no controller do módulo
         */
        var moduleRoutes = {
            'instagram': 'index',
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
        * Definição do módulo instagram, adicionando initializer
        * e associando nosso Router para módulo
        *
        */
        Module = app.module("instagram", function(instagram) {

            /**
             * evitando que este módulo seja carregado automaticamente
             */
            this.startWithParent = false;

            /**
             *  Definição das rotas que devem aparecer
             *  no menu principal da applicação
             */
            this.menuEntries = [
                {title: 'Instagram', route: 'instagram'},
            ];

            /**
             *  Initializer do módulo
             */
            this.addInitializer(function () {
                console.log('Module:instagram -> initialized');
                this.router = Router;
            });

        });

        return Module;
});
