

define([

    'marionette'
], function(  Marionette){

    // Marionette.Region.prototype.attachHtml = function(view) {

    //   this.$el.hide();
    //   this.$el.html(view.el);
    //   this.$el.fadeIn("fast");
    // }

    return  Marionette.Region.extend({



      open: function(view){
        this.$el.hide();
        this.$el.html(view.el);
        this.$el.fadeIn();
      }


    });

});

