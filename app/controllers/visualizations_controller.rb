class VisualizationsController < ApplicationController
  def histogram 
  end

  def directed_graph
    @nodes
    @edges
    @components
  end

  def miserables
    @@data = File.read("db/miserables.json")
    render :json => @@data
  end
end
