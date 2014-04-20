class VisualizationsController < ApplicationController

  def histogram
  end

  def add_and_remove
  end

  def about
  end

  def welcome
  end

  def add_and_remove_small
    @surnames = Surname.all.limit(10)
    @nodes = Surname.nodes(10)
    @edges = Surname.small_graph_links
    @components = Surname.components('small_graph_components').count
  end

  def add_and_remove_large
    @surnames = Surname.all
  end

  def directed_graph_small
    @nodes = Surname.nodes(10).count
    @edges = Surname.small_graph_links.count
    @components = Surname.components('small_graph_components').count
    # Why do you need to build a new surname and load all surnames here?
    @surname = Surname.new
    @surnames = Surname.all
  end

  def directed_graph_large
    @nodes = Surname.nodes.count
    @edges = Surname.all.count
    @components = Surname.components.count
    # Why do you need to build a new surname and load all surnames here?
    @surname = Surname.new
    @surnames = Surname.all
  end


  def miserables
    # Why is the class variable necessary here?
    @@data = File.read("db/miserables.json")
    render :json => @@data
  end
end
