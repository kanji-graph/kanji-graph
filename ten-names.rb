

names = ['佐藤', '鈴木', '高橋', '田中', '渡辺', '伊藤', '中村', '小林', '山本', '加藤', '山藤']

class DiadParser

  attr_accessor :kanji_array
  attr_accessor :kanji_graph
  attr_accessor :nodes

  def initialize(array_of_kanji)
    self.kanji_array = array_of_kanji
    self.nodes = self.kanji_array.join.split('').uniq
  end


  def parse
    result = {}
    self.kanji_array.map() do |name|
      first_char = name[0] 
      second_char = name[1]
      result[first_char] ? result[first_char] << second_char : result[first_char] = [second_char]
    end
    self.kanji_graph = result
  end

end


