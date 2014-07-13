/**
 *
 * Módulo (pacote) example
 *
 */

define([
    'app',
    'marionette',
    'modules/example/controller',
    //'modules/example/router',
], function(app, Marionette, Controller ) {

        /**
         * Definindo as Rotas para este módulo.
         * Os métodos precisam existir no controller do módulo
         */
        var moduleRoutes = {
            '': 'index',
            'example/docs': 'index',
            'example/instagram': 'showInstagram',
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
        * Definição do módulo example, adicionando initializer
        * e associando nosso Router para módulo
        *
        */
        Module = app.module("example", function(example) {

            /**
             * evitando que este módulo seja carregado automaticamente
             */
            this.startWithParent = false;

            /**
             *  Definição das rotas que devem aparecer
             *  no menu principal da applicação
             */
            this.menuEntries = [
                {title: 'Docs', route: 'example/docs'},
                {title: 'Instagram', route: 'example/instagram'},
            ];

            /**
             *  Initializer do módulo
             */
            this.addInitializer(function () {
                console.log('Module:example -> initialized');
                this.router = Router;
            });

        });

        return Module;
});
