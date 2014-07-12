/*global define */

define([
	'marionette',
	'tpl!system/templates/footer.html',
], function (Marionette, htmlTemplate) {
	'use strict';

	return Marionette.ItemView.extend({
		template: htmlTemplate
	});
});
