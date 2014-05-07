Rails.application.routes.draw do
  root 'visualizations#welcome'

  #json requests
  get 'surnames/histogram' => "surnames#histogram", :as => "surnames_histogram"
  get 'surnames/directed_graph_small' => "surnames#directed_graph_small", 
    :as => "surnames_directed_graph"
  get 'surnames/directed_graph_large' => "surnames#directed_graph_large", 
    :as => "surnames_directed_graph_large"

  #chart pages
  get 'histogram' => 'visualizations#histogram', :as => "histogram"
  get 'directed_graph_small' => 'visualizations#directed_graph_small', 
    :as => "directed_graph_small"
  get 'directed_graph_large' => 'visualizations#directed_graph_large', 
    :as => "directed_graph_large"
  get 'add_and_remove' => 'visualizations#add_and_remove', 
    :as => "add_and_remove"
  get 'add_and_remove_small' => 'visualizations#add_and_remove_small', 
    :as => "add_and_remove_small"
  get 'add_and_remove_large' => 'visualizations#add_and_remove_large', 
    :as => "add_and_remove_large"
  get 'about' => 'visualizations#about', :as => "about"
  get 'welcome' => 'visualizations#welcome', :as => "welcome"

  resources :surnames

end
