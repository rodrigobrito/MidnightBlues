/*jslint browser: true, devel: true, nomen: true*/
/*global $, jQuery, define, app, _, require*/

define([
    'marionette',
    'underscore',
    'tpl!modules/dashboard/templates/dashboardHome.html'
], function (Marionette, _, DashboardHomeTemplate) {

    'use strict';

    return Marionette.ItemView.extend({

        template: DashboardHomeTemplate,
        nestedViews: {},
        events: {

        },

        onRender: function () {

            var self = this;
            //carregar view instagram
            require(['modules/instagram/views/instagram'], function (InstaView) {

                self.nestedViews.instaView = new InstaView({
                    el: '#insta-placeholder',
                    displayItens: 9,
                    refreshTime: 20,
                    columnGrid: 4,
                    displayTimeBar: false,
                    autoRefresh: true
                });

                self.nestedViews.instaView.render();

            });

            require(['modules/maps/views/maps'], function (GMapsView) {

                self.nestedViews.gmapsView = new GMapsView({
                    el: '#map-placeholder',
                    customHeight: 330
                });

                self.nestedViews.gmapsView.render();

            });

        },

        onDestroy: function () {
            _.each(this.nestedViews, function (view) {
                view.destroy();
            });
        }

    });
});
