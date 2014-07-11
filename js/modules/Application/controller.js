/*global define */

define([
    'app',
    'modules/Application/views/HomeView'
], function(app, HomeView) {

    'use strict';

    return {

        index: function(pageName) {

            if (pageName == null) pageName = 'home';

            console.log('Router => Showing page: ' + pageName);

            var menuEntry = app.routesCollection.findWhere({
                name: pageName
            });

            app.vent.trigger('menu:activate', menuEntry);

            if (pageName == 'home') {

                app.mainRegion.show(new HomeView({
                    id: 'teste de paramentro'
                }));

            } else {

                var templatePath = 'modules/Application/templates/' + pageName;
                app.mainRegion.show(new PageView({
                    'templatePath': templatePath
                }));

            }
        },

        showAbout: function() {
            require(['modules/Application/views/aboutView'], function(AboutView) {
                app.mainRegion.show(new AboutView());
            });
        },

    };
});