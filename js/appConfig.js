/*global define */

define([],

    function () {

        'use strict';

        return {
            /**
             * Módulos registrados para a aplicação
             */
            registeredModules: [
                'dashboard',
                'instagram',
                'maps'
            ],

            /**
             * Configurações dos componentes de notificação
             */
            notify: {

                playSound: false,

                toastr: {
                    defaults: {
                        type: 'info'
                    }
                },

                gritter: {
                    defaults: {
                        title: 'Mensagem:',
                        text: 'o atributo: text está vazio',
                        // image: 'http://www.gravatar.com/avatar/56a44d257bd93d6cdb57f365a2fafc97.png',
                        sticky: false,
                        time: 8000,
                        class_name: 'gritter-info',
                        before_open: function () {},
                        after_open: function () {},
                        before_close: function () {},
                        after_close: function () {}
                    }
                }
            }

        };

    });
