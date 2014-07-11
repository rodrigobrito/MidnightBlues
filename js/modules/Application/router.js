
/**
 *  Como temos pouco código aqui, este router foi
 *  redefinido dentro do aquivo principal do módulo
 *  para economizar um request.
 *
 *  Mantendo aqui somente para consulta
 *
 */

define([
	'marionette'
], function (Marionette) {

	'use strict';

	return Marionette.AppRouter.extend({
		appRoutes: {
			'': 'index',
            'app': 'index',
            'app/home': 'index',
			'app/about': 'showAbout',
		}
	});

});
