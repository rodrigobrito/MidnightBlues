/*jslint browser: true, devel: true, nomen: true*/
/*global $, jQuery, define, app, _, require*/

define([
	'app',
    'modules/dashboard/views/dashboardHomeView'

], function (app, DashboardHome) {

	'use strict';

	return {

        index: function () {

            app.mainRegion.show(new DashboardHome());
            console.log('index');

        },

        create: function () {
            console.log('método create');
        },

        edit: function (id) {
            console.log('método edit -> ' + id);
        }

	};
});
