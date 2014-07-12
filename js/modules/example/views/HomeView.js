/*global define */

define([
    'marionette',
    'tpl!modules/example/templates/home.html',
    'underscore',
], function(Marionette, htmlTemplate, _) {
    'use strict';

    return Marionette.ItemView.extend({

        template: htmlTemplate,

        initialize: function(options) {
            console.log('inicializando view Home');
            console.log(options);
        },

        onRender: function() {
            console.log('callback onRender view Home');
        },

        onBeforeClose: function () {
            console.log('before close');
        }

    });

});