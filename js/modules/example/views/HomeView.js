/*global define */

define([
    'marionette',
    'tpl!modules/example/templates/home.html',
    'underscore',
    'jquery',
   // '//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/highlight.min.js',

], function(Marionette, htmlTemplate, _, $) {

    'use strict';

    //var app = window.app;

    return Marionette.ItemView.extend({

        template: htmlTemplate,

        initialize: function() {
        },

        onRender: function() {

          this.$('pre code').each(function(i, block) {
        //    hljs.highlightBlock(block);
          });

        },

        onBeforeClose: function () {
            console.log('before close');
        },

        showDialog: function (e) {
            e.preventDefault();

            app.commands.execute("app:dialog:simple", {
                icon: 'info-sign',
                title: 'Dialog title!',
                message: 'The important message for user!'
            });
        },

        showConfirm: function (e) {
            e.preventDefault();
            app.commands.execute("app:dialog:confirm", {
                icon: 'info-sign',
                title: 'Título do diálogo',
                message: 'Mensagem Importante para o usuário!',
                confirmYes: function() {console.log('yes');},
                confirmNo: function() {console.log('no');},
            });
        },

        showModal: function (e) {

            e.preventDefault();

            var self = this,
                instaOptions = {
                    displayItens: 12,
                    refreshTime: 10,
                    cols: 2,
                    // disableProgressBar: true,
                    // disableAutoRefresh: true,
                };

            //carregar view instagram no modal
            require(['modules/example/views/instagram'], function(InstaView) {
                var view = new InstaView(instaOptions),
                    modalOptions = {
                        showFooter: false,
                        title: false,
                        modalSize: 'lg', //  renderiza .modal-lg
                    };
                app.commands.execute("app:show:modalView", view, modalOptions);
            });


        },

        events: {
            'click .showDialog': 'showDialog',
            'click .showConfirm': 'showConfirm',
            'click .showModal': 'showModal',
        }

    });

});
