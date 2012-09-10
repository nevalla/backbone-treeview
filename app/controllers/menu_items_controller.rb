class MenuItemsController < ApplicationController

  before_filter :setup_models

  respond_to :json


  def index

    parent_id = params[:parent_id]
    @menu_items = @models.select{|item| item.parent_id == parent_id }

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @menu_items }
    end
  end


  def setup_models
    @models = []
    @menu = Hash.from_xml(File.open("countries.xml"))
    #puts @menu["menu"][item]
    @menu["menu"]["item"].each do |country|
      item = MenuItem.new
      item.name = country["name"]
      item.id = country["id"]
      item.parent_id = country["parent_id"]
      item.leaf = country["leaf"]
      @models.push(item)

    end

  end
end