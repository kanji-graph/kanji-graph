# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
names = ['佐藤', '鈴木', '高橋', '田中', '渡辺', '伊藤', '中村', '小林', '山本', '加藤', '山藤']

# names = ["佐藤", "鈴木", "高橋", "田中", "渡辺", "伊藤", "中村", "小林", "山本", "加藤", "吉田", "山田", "山口", "松本", "井上", "木村", "清水", "斉藤", "斎藤", "山崎", "中島", "阿部", "池田", "橋本", "石川", "山下", "小川", "石井", "長谷川", "後藤", "岡田", "近藤", "前田", "藤田", "遠藤", "青木", "坂本", "村上", "太田", "金子", "藤井", "福田", "西村", "三浦", "竹内", "中川", "岡本", "松田", "原田", "中野", "小野", "田村", "藤原", "中山", "石田", "小島", "和田", "森田", "内田", "柴田", "酒井", "高木", "横山", "安藤", "宮崎", "上田", "島田", "工藤", "大野", "宮本", "杉山", "今井", "丸山", "増田", "高田", "村田", "平野", "大塚", "菅原", "武田", "新井", "小山", "野口", "桜井", "千葉", "岩崎", "佐野", "谷口", "上野", "松井", "河野", "市川", "渡部", "野村", "菊地", "木下"] 
names = names.map { |name| {:name => name} }
#"佐々木", "林", "森","原",

Surname.destroy_all
Surname.create!(names)

