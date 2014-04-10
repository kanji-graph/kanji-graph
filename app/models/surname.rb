class Surname < ActiveRecord::Base
  validates :name, :presence => true
  validate :ensure_name_is_kanji_only
  def self.histogram_data
    names = self.pluck(:name)
    kanji = names.join("").split("")
    hash = kanji.group_by { |v| v }
    hash.map{|key, value| {:kanji => key, :value => value.count}}
  end

  def self.large_graph_data
    { nodes: self.nodes, 
      links: self.links }
  end

  def self.small_graph_data
    { nodes: self.small_graph_nodes, 
      links: self.small_graph_links }
  end

  def self.nodes
    self.pluck(:name).join("").split("").uniq.map { |name| {name: name} }
  end

  def self.links
    nodes = self.nodes.map {|hsh| hsh[:name] }
    self.pluck(:name).map { |name| { source: nodes.index(name[0]),
                                     target: nodes.index(name[1]) } }
  end

  def self.small_graph_nodes
    self.limit(10).pluck(:name).join("").split("").uniq.map { |name| {name: name} }
  end

  def self.small_graph_links
    nodes = self.small_graph_nodes.map {|hsh| hsh[:name] }
    self.limit(10).pluck(:name).map { |name| { source: nodes.index(name[0]),
                                     target: nodes.index(name[1]) } }
  end

  def self.edges
    self.links.collect{|hsh| [hsh[:source], hsh[:target]].sort}
  end

  def self.small_graph_edges
    self.small_graph_links.collect{|hsh| [hsh[:source], hsh[:target]].sort}
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
    components
  end

  def self.small_graph_components
    edges = self.small_graph_edges
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
    components
  end

  def ensure_name_is_kanji_only
    if self.name.chars.any? { |char| char.ord < 19968 || char.ord > 40879 || char.ord == 12293 }
      errors.add(:name, "must be in kanji.")
    end
  end
end
