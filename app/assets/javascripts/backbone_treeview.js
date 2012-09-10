window.BackboneTreeView = {
    Models: {},
    Collections: {},
    Views: {},

    menu: null,

    initialize: function() {


    },

    initializeMenu: function() {
        this.menu = new BackboneTreeView.Views.TreeView();
        this.menu.render();

    }


};
$(document).ready(function() {

    BackboneTreeView.initializeMenu();
});

