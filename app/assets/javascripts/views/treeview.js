BackboneTreeView.Views.TreeView = Support.CompositeView.extend({
    el: "#treeview",

    template: JST['treeview/menu'],

    initialize: function() {
        this.collection = new BackboneTreeView.Collections.MenuItems
        this.collection.on("all", this.render, this);
        this.collection.fetch();

    },

    render: function () {

        this.renderTemplate();
        this.renderItems();
        return this;
    },

    renderTemplate: function() {
        var html = "";
        html += this.template();
        this.$el.html(html);
        this.$el.addClass('jstree jstree-1 jstree-default');

    },

    renderItems: function() {
        var self = this;
        var lastIndex = this.collection.length -1

        this.collection.each(function(menu_item, index) {

            var row = new BackboneTreeView.Views.TreeViewItem({ model: menu_item });
            if(index == lastIndex) {
                row.last = true;
            }
            self.renderChild(row);
            self.$('ul#menu').append(row.el);
        });

    },


    leave: function() {
        this.collection.unbind()
    }
});