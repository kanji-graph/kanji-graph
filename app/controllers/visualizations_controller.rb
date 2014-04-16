class VisualizationsController < ApplicationController
  def histogram 
  end

  def add_and_remove
  end

  def about
  end

  def add_and_remove_small
    @surnames = Surname.all.limit(10)
  end

  def add_and_remove_large
    @surnames = Surname.all
  end

  def directed_graph_small
    @nodes = Surname.small_graph_nodes.count
    @edges = 10
    @components = Surname.small_graph_components.count
    @surname = Surname.new
    @surnames = Surname.all
  end

  def directed_graph_large
    @nodes = Surname.nodes.count
    @edges = Surname.all.count
    @components = Surname.components.count
    @surname = Surname.new
    @surnames = Surname.all
  end


  def miserables
    @@data = File.read("db/miserables.json")
    render :json => @@data
  end
end
