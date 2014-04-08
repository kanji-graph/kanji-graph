class Surname < ActiveRecord::Base
  def self.histogram_data
    names = self.pluck(:name)
    kanji = names.join("").split("")
    hash = kanji.group_by { |v| v }
    hash.map{|key, value| {:kanji => key, :value => value.count}}
  end
end
