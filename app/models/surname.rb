class Surname < ActiveRecord::Base
  validates :name, :presence => true
  validate :ensure_name_is_kanji_only

  def self.histogram_data
    names = self.pluck(:name)
    kanji = names.join("").split("")
    hash = kanji.group_by { |v| v }
    hash.map{|key, value| {:kanji => key, :value => value.count}}.sort_by { |hsh| hsh[:value] }.reverse
  end

  def self.large_graph_data
    { nodes: self.nodes,
      links: self.links }
  end

  def self.small_graph_data
    { nodes: self.nodes(10),
      links: self.small_graph_links }
  end

  def self.nodes(count=nil)
    kanji_array = self.limit(count).pluck(:name).join("").split("").uniq
    kanji_array.each_with_index.map do |name, index|
      { name: name,
        id: index,
        meaning: Character.find_by(:name => name).meaning }
    end
  end

  def self.links
    nodes = self.nodes.map {|hsh| hsh[:name] }
    self.pluck(:name).map { |name| { source: nodes.index(name[0]),
                                     target: nodes.index(name[1]) } }
  end

  def self.match_node_names(name)
    self.small_graph_nodes.select { |hsh| hsh[:name] == name}[0][:id]
  end

  def self.small_graph_links
    # nodes = self.small_graph_nodes.map {|hsh| hsh[:name] }
    # self.limit(10).pluck(:name).map { |name| { source: nodes.index(name[0]),
    #                                 target: nodes.index(name[1]) } }
    self.small_graph_names.map do |name|
      {
        source: self.match_node_names(name[0]),
        target: self.match_node_names(name[1])
      }
    end
  end

  def self.edges
    self.links.collect{|hsh| [hsh[:source], hsh[:target]].sort}
  end

  def self.small_graph_edges
    self.small_graph_links.collect{|hsh| [hsh[:source], hsh[:target]].sort}
  end

  def self.components(edge_type='edges')
    edges = send(edge_type)
    components = []
    while edges.any?
      component = edges.shift
      while edges.select { |edge| (edge & component).present? }.any?
        component << edges.select { |edge| (edge & component).present? }
        edges.delete_if { |edge| (edge & component).present? }
        component = component.flatten.uniq
      end
      components << component
    end
    components
  end

  private

  def self.small_graph_names
    self.limit(10).pluck(:name)
  end

  def ensure_name_is_kanji_only
    if self.name.chars.any? { |char| char.ord < 19968 || char.ord > 40879 || char.ord == 12293 }
      errors.add(:name, "must be in kanji.")
    end
  end

end
