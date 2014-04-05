# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
names = ['佐藤', '鈴木', '高橋', '田中', '渡辺', '伊藤', '中村', '小林', '山本', '加藤', '山藤']
names = names.map { |name| {:name => name} }

Surname.destroy_all
Surname.create!(names)

