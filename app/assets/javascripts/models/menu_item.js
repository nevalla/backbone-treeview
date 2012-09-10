BackboneTreeView.Models.MenuItem = Backbone.Model.extend({


    initialize: function() {

    },

    urlRoot: '/menu_items',

    toJSON: function() {
        var json = _.clone(this.attributes);

        return json;
    }
});
