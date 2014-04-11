require 'open-uri'
desc "scrape kanji meanings"
task :scrapekanji => :environment do
  characters = Surname.pluck(:name).join("").split("").uniq
  Character.destroy_all
  characters.each do |character|
    page = Nokogiri::HTML(open("http://jisho.org/kanji/details/#{URI.escape(character)}"))
    meaning = page.css(".english_meanings p").children.first.text[0..-2]
    kun_reading =
    Character.create!(:name => character, :meaning => meaning)
    puts "Scraped: #{character}, Meaning: #{meaning} "
  end

  # patches
  Character.find_by(:name => "伊").update(:meaning => "that one")
  Character.find_by(:name => "丸").update(:meaning => "ship")
  Character.find_by(:name => "西").update(:meaning => "west")
  Character.find_by(:name => "子").update(:meaning => "child")
  Character.find_by(:name => "阿").update(:meaning => "corner")
  Character.find_by(:name => "鈴").update(:meaning => "small bell")
  Character.find_by(:name => "吉").update(:meaning => "joy")
  Character.find_by(:name => "斉").update(:meaning => "equal")
end
