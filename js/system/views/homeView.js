/*jslint browser: true, devel: true, nomen: true*/
/*global $, jQuery, define, app, _, require*/

define([
    'marionette',
    'tpl!system/templates/home.html',
    'underscore'
], function (Marionette, htmlTemplate, _) {
    'use strict';

    return Marionette.ItemView.extend({

        template: htmlTemplate,

        initialize: function (options) {
            console.log('inicializando view Home');
            console.log(options);
        },

        onRender: function () {
            /**
             * Exemplo de Notificação
             */
            app.utils.notify({
                component: 'toastr',
                title: 'app.notify()',
                text: 'Método onRender da view system/views/HomeView',
                type: 'success'
            });
        },

        onBeforeClose: function () {
            console.log('before close');
        },

        openDocs: function (e) {

            e.preventDefault();

            var self = this;
            //carregar view instagram no modal
            require(['modules/example/views/HomeView'], function (HomeView) {
                var view = new HomeView(),
                    modalOptions = {
                        showFooter: false,
                        title: false,
                        modalSize: 'lg' //  renderiza .modal-lg
                    };
                app.commands.execute("app:show:modalView", view, modalOptions);
            });

        },

        events: {
            'click .openDocs': 'openDocs'
        }

    });

});
