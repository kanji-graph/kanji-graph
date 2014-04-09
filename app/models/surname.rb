class Surname < ActiveRecord::Base
  def self.histogram_data
    names = self.pluck(:name)
    kanji = names.join("").split("")
    hash = kanji.group_by { |v| v }
    hash.map{|key, value| {:kanji => key, :value => value.count}}
  end

  def self.directed_graph_data
    { nodes: self.nodes, 
      links: self.links }
  end

  def self.nodes
    self.pluck(:name).join("").split("").uniq.map { |name| {name: name} }
  end

  def self.links
    nodes = self.nodes.map {|hsh| hsh[:name] }
    self.pluck(:name).map { |name| { source: nodes.index(name[0]),
                                     target: nodes.index(name[1]) } }
  end

  def self.edges
    self.links.collect{|hsh| [hsh[:source], hsh[:target]].sort}
  end

  def self.components
    edges = self.edges
    components = []
    while edges.any? 
      component = edges.shift
      while edges.select { |edge| !(edge & component).empty? }.any?
        component << edges.select { |edge| !(edge & component).empty? }
        edges.delete_if { |edge| !(edge & component).empty? }
        component = component.flatten.uniq
      end
      components << component
    end
  end
end
