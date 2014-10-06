/*jslint browser: true, devel: true, nomen: true*/
/*global $, jQuery, define, app, _, require*/

define([
    'backbone',
    'marionette',
    'appConfig',
    'system/regions/mainRegion',
    'system/regions/dialog',
    'system/collections/routesCollection',
    'system/views/menuView',    
    'system/utils',
    'system/commands',
    'bootstrap'
], function (Backbone, Marionette, config, MainRegion, DialogRegion, RoutesCollection, MenuView, utils, commands) {

    'use strict';

    /**
     * Definição do objeto app Global
     */
    var app = new Marionette.Application();

    /**
     * Associando as configurações da applicação que foram definidas
     * em um arquivo separado
     */
    app.config = config;

    /**
     * Definindo as Regions da applicação
     *
     */
    app.addRegions({
        menu: '#main-nav',
        mainRegion: {
            selector: '#main',
            regionType: MainRegion
        },
        //footer: '#footer',
        dialog: {
            selector: "#dialog",
            regionType: DialogRegion
        }
    });

    utils.set(app);
    commands.set(app);

    /**
     *  Adicionando uma transição mais suave
     *  para views carregadas na região principal.
     */
    app.mainRegion.on("before:show", function (view) {
        this.$el.hide();
    });

    app.mainRegion.on("show", function (view) {
        this.$el.fadeIn('fast');
    });

    /**
     * Menu principal
     */
    app.routesCollection = new RoutesCollection();

    /**
     * Obtendo e Iniciando os módulos registrados.
     * Aqui são contados os módulos e após todos
     * serem carregados, iniciamos Backbone.history
     */
    app.addInitializer(function () {

        var modulesLoaded = 0,
            modulesToLoad = this.config.registeredModules.length;

       // var self = this;

        require(['system/init'], function (SystemModule) {

            SystemModule.start();

            // Se o módulo System registrar rotas para o menu, adicionamos à coleção de rotas
            if (SystemModule.hasOwnProperty('menuEntries') && SystemModule.menuEntries.length) {
                app.routesCollection.add(SystemModule.menuEntries);
            }

            // carregar os módulos
            _.each(this.config.registeredModules, function (moduleName) {

                var modulePath = 'modules/' + moduleName + '/init';

                require([modulePath], function (module) {
                    module.start();
                    modulesLoaded += 1;
                    // adicionando rotas do módulo registradas para menu
                    if (module.hasOwnProperty('menuEntries') && module.menuEntries.length) {
                        app.routesCollection.add(module.menuEntries);
                    }
                    if (modulesLoaded === modulesToLoad) {
                        app.vent.trigger('modules:loaded');
                    }
                });

            }, this);

        }.bind(this));
    });


    /**
     * Aguardamos os módulos serem carregados e iniciamos
     * o menu com as rotas obtidas em app.routesCollection
     */
    app.vent.on("modules:loaded", function (options) {

        Backbone.history.start();

        var menu = new MenuView({
            collection: app.routesCollection
        });

        app.menu.show(menu);

    });    

    window.app = app;
    return app;
});
