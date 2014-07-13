/*global define */

define([
    'marionette',
    'system/views/MenuItemView'
], function(Marionette, MenuItemView) {
    'use strict';

    return Marionette.CollectionView.extend({

        childView: MenuItemView,
        tagName: 'ul',
        className: 'nav nav-sidebar',

        /**
         * Callbacks
         * disparados ao adicionar um model na collection de rotas da aplicação
         * (app.routesCollection)
         */
        onBeforeAddChild: function(view) {
            //console.log('before add child');
        },

        onAddChild: function(view) {
           // console.log('after add child');
        }

    });

});
