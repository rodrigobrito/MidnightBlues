

// define([

//     'marionette',
//     'modules/dashboard/controller',
//     'modules/dashboard/router'
// ], function(app, Marionette, Controller, Router) {

//     console.log('Module: Dashboard => Loading...');

//     var Module = app.module("Dashboard", function(Dashboard) {

//         this.startWithParent = false;

//         this.menuEntries = [
//             {title: 'Dashboard', route: 'dashboard'},

//         ];

//         this.addInitializer(function(){

//             console.log('Module: Dashboard => initialized');

//             this.router = new Router({ controller: Controller });

//         });

//     });


//     return Module;
// });


/**
 *
 * Módulo (pacote) dashboard
 *
 */

define([
    'marionette',
    'modules/dashboard/controller',
    'modules/dashboard/router'
], function(Marionette, Controller, Router ) {



        /*
        * Definição do módulo dashboard, adicionando initializer
        * e associando nosso Router para módulo
        *
        */
        Module = app.module("dashboard", function(dashboard) {

            /**
             * evitando que este módulo seja carregado automaticamente
             */
            this.startWithParent = false;

            /**
             *  Definição das rotas que devem aparecer
             *  no menu principal da applicação
             */
            this.menuEntries = [
                {title: 'Dashboard', route: 'dashboard'},
                // Demostrando rota não encontrada
                {title: 'Ex: notFound', route: 'notFound'},
            ];

            /**
             *  Initializer do módulo
             */
            this.addInitializer(function () {
                console.log('Module:dashboard -> initialized');
                this.router = new Router({
                    controller: Controller
                });
            });

        });

        return Module;
});
