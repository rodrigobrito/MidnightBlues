/*global define */

define([
    'backbone',
    'marionette',
    'config/appConfig',
    'system/regions/mainRegion',
    'system/regions/notification',
    'system/regions/dialog',
    'system/collections/routesCollection',
    'system/views/MenuView',
    'bootstrap'
], function(Backbone, Marionette, config, MainRegion, NotifyRegion, DialogRegion, RoutesCollection, MenuView) {

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
        // notification: {
        //     selector: "#notification",
        //     regionType: NotifyRegion
        // },
        dialog: {
            selector: "#dialog",
            regionType: DialogRegion
        }
    });

    /**
     *  Adicionando uma transição mais suave
     *  para views carregadas na região principal.
     */
    app.mainRegion.on("before:show", function(view) {
        this.$el.hide();
    });

    app.mainRegion.on("show", function(view) {
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
    app.addInitializer(function() {

        var modulesLoaded = 0,
            modulesToLoad = this.config.registeredModules.length;

        _.each(this.config.registeredModules, function(moduleName) {

            var modulePath = 'modules/' + moduleName + '/' + moduleName;

            require([modulePath], function(module) {

                module.start();
                modulesLoaded++;

                // adicionando rotas registradas no menu
                if (module.hasOwnProperty('menuEntries') && module.menuEntries.length) {
                    app.routesCollection.add(module.menuEntries);
                }

                if (modulesLoaded === modulesToLoad) {
                    app.vent.trigger('modules:loaded');
                }
            });

        }, this);

    });


    /**
     * Aguardamos os módulos serem carregados e iniciamos o módulo especial System
     * e o menu com as rotas obtidas em app.routesCollection
     */
    app.vent.on("modules:loaded", function(options) {

        require(['system/System'], function(SystemModule) {

            SystemModule.start();

            console.log('App::todos os módulos carregados');

            // adicionando rotas registradas no menu
            if (SystemModule.hasOwnProperty('menuEntries') && SystemModule.menuEntries.length) {
                app.routesCollection.add(SystemModule.menuEntries);
            }

            Backbone.history.start();

        });

        var menu = new MenuView({
            collection: app.routesCollection
        });
        app.menu.show(menu);

    });


    // app.vent.on('menu:activate', function(activePageModel) {

    //     var currentMenuItem = menu.collection.findWhere({
    //         active: true
    //     });

    //     if (currentMenuItem) {
    //         currentMenuItem.set('active', false);
    //     }

    //     if (activePageModel) {
    //         activePageModel.set('active', true);
    //     }

    //     menu.render();
    // });

    /**
     *
     * app.commands.execute("app:notify", {
     *           type: 'warning'    // info|danger|success|warning
     *           title: 'Success!', // Optional
     *           description: 'We are going to remove Team state!'
     *       });
     */
    app.commands.setHandler("app:notify", function(jsonData) {
        require(['modules/Application/views/NotificationView'], function(NotifyView) {
            app.notification.show(new NotifyView({
                model: new Backbone.Model(jsonData)
            }));
        });
    });

    /**
     * dialog
     * app.commands.execute("app:dialog:simple", {
     *           icon: 'info-sign' ,
     *           title: 'Dialog title!',
     *           message: 'The important message for user!'
     *       });
     */
    app.commands.setHandler("app:dialog:simple", function(data) {
        require(['system/views/DialogView', 'system/models/Dialog', 'tpl!system/templates/simpleModal.html'],
            function(DialogView, DialogModel, ModalTpl) {
                app.dialog.show(new DialogView({
                    template: ModalTpl,
                    model: new DialogModel(data)
                }));
            });
    });

    /**
     * // confirm message
     * app.commands.execute("app:dialog:confirm", {
     *           icon: 'info-sign',
     *           title: 'Dialog title!',
     *           message: 'The important message for user!',
     *           'confirmYes': callbackForYes,
     *           'confirmNo': callbackForNo,
     *       });
     */
    app.commands.setHandler("app:dialog:confirm", function(data) {
        require(['system/views/DialogView', 'system/models/Dialog', 'tpl!system/templates/confirmModal.html'],
            function(DialogView, DialogModel, ModalTpl) {
                app.dialog.show(new DialogView({
                    template: ModalTpl,
                    model: new DialogModel(data),
                    events: {
                        'click .dismiss': 'dismiss',
                        'click .confirm_yes': data.confirmYes,
                        'click .confirm_no': data.confirmNo
                    }
                }));
            });
    });

    /**
     * dialog
     * app.commands.execute("app:show:modalView", {
     *           view: construtorDaView,
     *       });
     */
    app.commands.setHandler("app:show:modalView", function(InnerView, options) {
        require(['system/views/ModalView', 'system/models/Dialog', 'tpl!system/templates/modal.html'],

            function(ModalView, DialogModel, ModalTpl) {

                var modalOptions = options || {},

                    DefaultModel = Backbone.Model.extend({
                        defaults: {
                            showFooter: false,
                            title: false,
                            modalSize: 'lg', //  renderiza .modal-lg
                        }
                    }),

                    modal = new ModalView({
                        template: ModalTpl,
                        innerView: InnerView,
                        model: new DefaultModel(modalOptions)
                    });

                modal.render();

            });
    });

    window.app = app;
    return app;
});
