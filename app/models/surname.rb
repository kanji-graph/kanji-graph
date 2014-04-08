class Surname < ActiveRecord::Base
  def self.histogram_data
    names = self.pluck(:name)
    kanji = names.join("").split("")
    hash = kanji.group_by { |v| v }
    hash.inject({}) { |result, (k, v)| result[k] = v.length; result }
  end
end
