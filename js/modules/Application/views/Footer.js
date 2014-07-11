/*global define */

define([
	'marionette',
	'tpl!modules/Application/templates/footer.html',
], function (Marionette, htmlTemplate) {
	'use strict';

	return Marionette.ItemView.extend({
		template: htmlTemplate
	});
});
