/*jslint browser: true, devel: true, nomen: true*/
/*global $, jQuery, define, app, _, require, google */

define([
    'marionette',
    'tpl!modules/maps/templates/maps.html',
    'modules/maps/config',
    'async!http://maps.google.com/maps/api/js?sensor=false'
], function (Marionette, htmlTemplate, config) {

    'use strict';

    return Marionette.ItemView.extend({

        template: htmlTemplate,


        initialize: function (options) {

        },


        onRender: function () {
            if (this.options.hasOwnProperty('customHeight')) {
                this.$('.map-container').height(this.options.customHeight);
            }
            this.getPosition();
        },

        getPosition: function () {
            navigator.geolocation.getCurrentPosition(this.onPositionSuccess);
        },

        onPositionSuccess: function (position) {



            var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                mapOptions = {
                    zoom: 15,
                    center: myLatlng
                },

                map = new google.maps.Map(this.$('.map-canvas')[0], mapOptions),

                marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: 'Você está aqui!'
                });

        },

        onDestroy: function () {

            console.log('maps view ' + this.cid + ' destruída');
        }

    });

});
