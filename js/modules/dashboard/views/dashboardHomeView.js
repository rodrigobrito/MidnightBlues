/*global define */

define([
    'marionette',
    'underscore',
    'tpl!modules/dashboard/templates/dashboardHome.tpl',
], function(Marionette, _, DashboardHomeTemplate) {

    'use strict';

    return Marionette.ItemView.extend({

        template: DashboardHomeTemplate,
        nestedViews: {},
        events: {

        },

        onRender: function() {

            var self = this;
            //carregar view instagram
            require(['modules/instagram/views/instagram'], function(InstaView) {

                self.nestedViews.instaView = new InstaView({
                    el: '#insta-placeholder',
                    displayItens: 9,
                    refreshTime: 20,
                    columnGrid: 4,
                    displayTimeBar: true,
                    autoRefresh: true,
                });

                self.nestedViews.instaView.render();

            });
        },

        onDestroy: function() {
            _.each(this.nestedViews, function(view) {
                view.destroy();
            });
        }

    });
});
