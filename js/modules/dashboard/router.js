/*global define */

define([
	'marionette'
], function (Marionette) {

	'use strict';

    var ModuleRouter = Marionette.AppRouter.extend({

        appRoutes: {
            '': 'index',
            'dashboard': 'index',
            'dashboard/create': 'create',
            'dashboard/edit/:pageName': 'edit'
        }

    });

    return ModuleRouter;

});
