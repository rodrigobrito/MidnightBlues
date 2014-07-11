

define([
    'app',
    'marionette',
    'modules/dashboard/controller',
    'modules/dashboard/router'
], function(app, Marionette, Controller, Router) {

    console.log('Module: Dashboard => Loading...');

    var Module = app.module("Dashboard", function(Dashboard) {

        this.startWithParent = false;

        this.menuEntries = [
            {title: 'Dashboard', route: 'dashboard'},

        ];

        this.addInitializer(function(){

            console.log('Module: Dashboard => initialized');

            this.router = new Router({ controller: Controller });

        });

    });


    return Module;
});