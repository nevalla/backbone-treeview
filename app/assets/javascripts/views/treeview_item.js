BackboneTreeView.Views.TreeViewItem = Support.CompositeView.extend({
    tagName: "li",
    last: false,
    template: JST['treeview/item'],

    initialize: function(options) {

        this.collection = new BackboneTreeView.Collections.MenuItems
        this.collection.on("reset", this.renderItems, this);
        this.collection.url = '/menu_items/?parent_id=' + this.model.get('id') ;

        _.bindAll(this, "render");
    },

    events: {

        "click ins": "toggleSubmenu",
        "click a": "markAsSelected"

    },

    markAsSelected: function(e) {
        $('.jstree-clicked').removeClass('jstree-clicked');
        $(e.target).toggleClass('jstree-clicked');
    },

    toggleSubmenu: function (e) {
        e.preventDefault();
        $('.jstree-clicked').removeClass('jstree-clicked');
        var submenu = this.$('ul.submenu_'+this.model.get('id'));
        if(!submenu.is(':visible')) {
            this.collection.fetch();
        }
        submenu.slideUp();


        $(e.target.next).toggleClass('jstree-clicked');
        this.$el.toggleClass('jstree-closed');
        this.$el.toggleClass('jstree-open');


        return false;
    },




    renderItems: function() {
        var self = this;
        var lastIndex = this.collection.length -1
        self.$('ul.submenu_'+self.model.get('id')).empty();
        self.$('ul.submenu_'+self.model.get('id')).hide();
        this.collection.each(function(item, index) {

            var row = new BackboneTreeView.Views.TreeViewItem({ model: item });
            if(index == lastIndex) {
                row.last = true;
            }
            self.renderChild(row);
            self.$('ul.submenu_'+self.model.get('id')).append(row.el);
        });
        self.$('ul.submenu_'+self.model.get('id')).slideDown();

    },

    render: function () {
        this.$el.attr("id", "menuitem_" + this.model.id);


        this.$el.html(this.template({model: this.model}));
        if(this.last==true) {
            this.$el.addClass('jstree-last');
        }
        if(this.model.get('leaf') == "1") {

            this.$el.addClass('jstree-leaf');
            this.$('a').addClass('leaf');
        }
        else {
            this.$el.addClass('jstree-closed');
            this.$('a').addClass('node');
        }
        this.$('a').attr('href','#menu_items/'+this.model.id);
        return this;
    }
});