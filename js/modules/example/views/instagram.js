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
            this.$('.photo').off();
            this.listenTo(window.app.vent, 'instagram:fotosLoaded', this.refreshControl);
        },

        progress: function(percent, $element) {

            if(this.options.hasOwnProperty('disableProgressBar') && this.options.disableProgressBar === true ) {
                return false;
            }

            var progressBarWidth = percent * $element.width() / 100,
                $bar = $element.find('div');

            if (percent > 0) {
                $bar.show();
            }

            $bar.css({
                width: progressBarWidth
            });
        },

        refreshControl: function() {

            if(this.options.hasOwnProperty('disableAutoRefresh') && this.options.disableAutoRefresh === true ) {
                return false;
            }

            var self = this,
                refreshTime = this.options.refreshTime || 10,
                elapsed = 0,
                total = refreshTime * 1000,
                $element = this.$('#progressBar');

            this.refreshInterval = setInterval(function() {

                elapsed += 1000;

                var percent = (elapsed / total) * 100;

                self.progress(percent, $element);

                if (percent >= 100) {

                    clearInterval(self.refreshInterval);

                    setTimeout(function() {
                        $element.find('div').fadeOut('fast');
                    }, 1000);

                    setTimeout(function() {
                        elapsed = 0;
                        self.progress(elapsed, $element);

                        self.getPhotos();

                    }, 1200);

                }
            }, 1000);

        },


        lazyload: function() {

            var photos = this.$('.photo'),
                totalPhotos = photos.length,
                loadedCount = 0;

            photos.off().each(function() {

                var photo = $(this),
                    url = photo.data('src');

                photo.off().one('load', function() {
                    photo.fadeIn(function() {
                        loadedCount++;
                        console.log(loadedCount);
                        if (loadedCount == totalPhotos) {
                            window.app.vent.trigger('instagram:fotosLoaded');
                        }
                    });

                });

                photo.attr('src', url);

            });

        },

        getPhotos: function() {

            var self = this,
                photo_block = this.$('#images-box'),
                displayItens = this.options.displayItens || 18,
                cols = this.options.cols || 2,
                tpl = '<div class="col-md-<%= cols %>"><a target="_blank" class="thumbnail insta" href="<%= link %>"><img class="photo" data-src="<%= imageUrl %>"/></a></div>';

                $.ajax({
                    dataType: 'jsonp',
                    cache: true,
                    url: 'https://api.instagram.com/v1/media/popular?client_id=f719bfb233ce45008bbb28fcafcb1bd8&count=' + displayItens,
                    success: function(response) {

                        if (!response || !response.data)
                            return false;

                        photo_block.empty();

                        for (var i = 0; i < displayItens; i++) {

                            var templateData = {
                                'link': response.data[i].link,
                                'imageUrl': response.data[i].images.thumbnail.url,
                                'cols': cols,
                            };

                            photo_block.append(_.template(tpl, templateData));
                        }

                        self.lazyload();
                    }
                });
        },

        onRender: function() {
            this.getPhotos();
        },

        onDestroy: function() {
            clearInterval(this.refreshInterval);
            this.off();
            console.log('instagram view has been destroied');
        }

    });

});
