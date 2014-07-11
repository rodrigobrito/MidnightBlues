/*global define */

define([
	'marionette',
	'tpl!modules/Application/templates/page.html',
    'underscore',
], function (Marionette, templateHtml, _) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templateHtml,



        onBeforeRender: function(){

            if(this.model) {
                this.model.set('content', _.result(this.template, this.model.get('name')));
            }
        }



	});
});
