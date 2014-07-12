/*global define */

define([
    'marionette',
    'tpl!modules/example/templates/instagram.html',
    'underscore',
], function(Marionette, htmlTemplate, _) {
    'use strict';

    return Marionette.ItemView.extend({

        template: htmlTemplate,

        initialize: function(options) {

            $('.thumbnail img').load( function (){

            });

        },

        onRender: function() {

            var photo_block = this.$el.find('.panel-body');


            $.ajax({
                dataType: 'jsonp',
                cache: true,
                url: 'https://api.instagram.com/v1/media/popular?client_id=f719bfb233ce45008bbb28fcafcb1bd8',
                success: function(response) {
                    if (!response || !response.data)
                        return false;

                    photo_block.empty();

                    for (var i = 0; i < 12; i++) {

                        photo_block.append('<div class="col-xs-6 col-md-3"><a target="_blank" class="thumbnail" href="' +
                            response.data[i].link +
                            '" title=""><img src="' + response.data[i].images.low_resolution.url +
                            '" /></a></div>');
                    }


                }
            });


        },



    });

});