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
end
