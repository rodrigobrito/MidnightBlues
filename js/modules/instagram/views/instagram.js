/*global define */

define([
    'marionette',
    'tpl!modules/instagram/templates/instagram.html',
    'modules/instagram/config',
    //'underscore',
], function(Marionette, htmlTemplate, config) {

    'use strict';

    return Marionette.ItemView.extend({

        template: htmlTemplate,


        initialize: function(options) {

            this.options = $.extend(config, options);

            this.$('.photo').off();

            this.listenTo(app.vent, 'instagram:fotosLoaded', function(ViewCid) {
                if (ViewCid === this.cid) {
                  this.autoRefresh();
                }
            });

        },


        progress: function(percent, $element) {

            if(!this.options.displayTimeBar) {
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


        autoRefresh: function() {

            if(!this.options.autoRefresh) {
                return false;
            }

            var self = this,
                refreshTime = this.options.refreshTime,
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

            var self = this,
                loadedCount = 0,
                photos = this.$('.photo'),
                totalPhotos = photos.length;


            photos.off().each(function() {

                var photo = $(this),
                    url = photo.data('src');

                photo.off().one('load', function() {
                    photo.fadeIn(function() {
                        loadedCount++;
                        console.log('Instagram::' + self.cid + '::Foto::' + loadedCount + ' carregada.');
                        if (loadedCount == totalPhotos) {
                            window.app.vent.trigger('instagram:fotosLoaded', self.cid);
                        }
                    });

                });

                photo.attr('src', url);

            });

        },


        getPhotos: function() {

            var self = this,
                photo_block = this.$('#images-box'),
                displayItens = this.options.displayItens,
                urlInstagram = this.options.urlInstagram + displayItens,
                cols = this.options.columnGrid,
                tpl = '<div class="col-md-<%= cols %>"><a target="_blank" class="thumbnail insta" href="<%= link %>"><img class="photo" data-src="<%= imageUrl %>"/></a></div>';

                $.ajax({
                    dataType: 'jsonp',
                    cache: true,
                    url: urlInstagram,
                    success: function(response) {

                        if (!response || !response.data)
                            return false;

                        try {

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


                        } catch (error) {

                            console.log(error);

                            app.notify({
                                component: 'toastr',
                                title: 'Erro de comunicação com o Instagram:',
                                text: 'O servidor retornou uma resposta inválida. Uma nova solicitação será feita em 5 segundos.',
                                type: 'error',
                                playSound: true
                            });

                           photo_block.html('<span/>').addClass('text-center').text('tentendo novamente...');

                            setTimeout(function () {
                                self.getPhotos();
                            }, 5 * 1000);
                        }


                    }
                });
        },


        onRender: function() {
            this.getPhotos();
        },


        onDestroy: function() {
            console.log('instagram view ' + this.cid + ' destruída');
            clearInterval(this.refreshInterval);
            this.off();
            this.stopListening();

        }

    });

});
