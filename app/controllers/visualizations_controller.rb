class VisualizationsController < ApplicationController
  def histogram 
  end

  def directed_graph
    @nodes = Surname.nodes.count
    @edges = Surname.all.count
    @components = Surname.components.count
    @surname = Surname.new
  end

  def miserables
    @@data = File.read("db/miserables.json")
    render :json => @@data
  end
end
