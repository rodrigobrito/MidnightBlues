define([
    'marionette',
    'underscore',
    'tpl!modules/dashboard/templates/dashboardHome.html',
    'modules/instagram/views/instagram',
    'modules/maps/views/maps'
], function (Marionette, _, DashboardHomeTemplate, InstaView, GMapsView) {

    'use strict';

    var instaView = new InstaView({                  
        displayItens: 9,
        refreshTime: 20,
        columnGrid: 4,
        displayTimeBar: false,
        autoRefresh: true
    });

    var gmapsView = new GMapsView({                    
        customHeight: 330
    });

    return Marionette.LayoutView.extend({

        template: DashboardHomeTemplate,            
        regions: {
             instagramPlaceHolder: "#insta-placeholder",
             gmapsPlaceHolder : "#map-placeholder"
        },
        onRender: function () {
            this.instagramPlaceHolder.show(instaView);
            this.gmapsPlaceHolder.show(gmapsView);
        }
    });
});
