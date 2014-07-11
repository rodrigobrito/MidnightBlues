/*global define */

define([
    'marionette',
    'underscore',
    'tpl!modules/dashboard/templates/dashboardHome.tpl',
], function (Marionette, _, DashboardHomeTemplate ) {

    'use strict';

    return Marionette.ItemView.extend({

        template: DashboardHomeTemplate,

        events: {

        },

        onBeforeRender: function(){
            console.log('before render dashboard home');
        },

        onRender: function() {
            console.log('on render dashboard home');
        }

    });
});
