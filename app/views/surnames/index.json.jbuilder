json.array!(@surnames) do |surname|
  json.extract! surname, :id, :name
  json.url surname_url(surname, format: :json)
end
