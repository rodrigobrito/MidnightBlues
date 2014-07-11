/*global define */

define([
	'marionette',
    'modules/Application/views/MenuItemView'
], function (Marionette, MenuItemView) {
	'use strict';

	return Marionette.CollectionView.extend({
        childView: MenuItemView,
        tagName: 'ul',
        className: 'nav nav-sidebar'
	});

});
