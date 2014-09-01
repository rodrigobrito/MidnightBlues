/*jslint browser: true, devel: true, nomen: true*/
/*global $, jQuery, define, app, _, require*/

define([
	'marionette',
	'tpl!system/templates/footer.html'
], function (Marionette, htmlTemplate) {
	'use strict';

	return Marionette.ItemView.extend({
		template: htmlTemplate
	});
});
