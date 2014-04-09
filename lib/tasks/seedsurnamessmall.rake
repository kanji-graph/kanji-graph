desc "Rake task to seed database with top 10 surnames"
task :seedsurnamessmall => :environment do
  names = ['佐藤', '鈴木', '高橋', '田中', '渡辺', '伊藤', '中村', '小林', '山本', '加藤'] 
   names = names.map { |name| {:name => name} }
  #"佐々木", "林", "森","原",

  Surname.destroy_all
  Surname.create!(names)
end
