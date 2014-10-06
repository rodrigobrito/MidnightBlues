define(['marionette', 'underscore','toastr','gritter'], function (Marionette, _, toastr, gritter) {

  	function set(app) {
	  	/**
	     * dialog
	     * app.commands.execute("app:dialog:simple", {
	     *           icon: 'info-sign' ,
	     *           title: 'Dialog title!',
	     *           message: 'The important message for user!'
	     *       });
	     */
	    app.commands.setHandler("app:dialog:simple", function (data) {
	        require(['system/views/DialogView', 'system/models/Dialog', 'tpl!system/templates/simpleModal.html'],
	            function (DialogView, DialogModel, ModalTpl) {
	                app.dialog.show(new DialogView({
	                    template: ModalTpl,
	                    model: new DialogModel(data)
	                }));
	            });
	    });

	    /**
	     * // confirm message
	     * app.commands.execute("app:dialog:confirm", {
	     *           icon: 'info-sign',
	     *           title: 'Dialog title!',
	     *           message: 'The important message for user!',
	     *           'confirmYes': callbackForYes,
	     *           'confirmNo': callbackForNo,
	     *       });
	     */
	    app.commands.setHandler("app:dialog:confirm", function (data) {
	        require(['system/views/DialogView', 'system/models/Dialog', 'tpl!system/templates/confirmModal.html'],
	            function (DialogView, DialogModel, ModalTpl) {
	                app.dialog.show(new DialogView({
	                    template: ModalTpl,
	                    model: new DialogModel(data),
	                    events: {
	                        'click .dismiss': 'dismiss',
	                        'click .confirm_yes': data.confirmYes,
	                        'click .confirm_no': data.confirmNo
	                    }
	                }));
	            });
	    });

	    /**
	     * dialog
	     * app.commands.execute("app:show:modalView", {
	     *           view: construtorDaView,
	     *       });
	     */
	    app.commands.setHandler("app:show:modalView", function (InnerView, options) {
	        require(['system/views/ModalView', 'system/models/Dialog', 'tpl!system/templates/modal.html'],

	            function (ModalView, DialogModel, ModalTpl) {

	                var modalOptions = options || {},

	                    DefaultModel = Backbone.Model.extend({
	                        defaults: {
	                            showFooter: false,
	                            title: false,
	                            modalSize: 'lg' //  renderiza .modal-lg
	                        }
	                    }),

	                    modal = new ModalView({
	                        template: ModalTpl,
	                        innerView: InnerView,
	                        model: new DefaultModel(modalOptions)
	                    });

	                modal.render();

	            });
	    });
	}

	return {
		set : set
	}

});