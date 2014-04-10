Rails.application.routes.draw do
  root 'visualizations#directed_graph_small'

  #json requests
  get 'surnames/histogram' => "surnames#histogram", :as => "surnames_histogram"
  get 'surnames/directed_graph_small' => "surnames#directed_graph_small", :as => "surnames_directed_graph"
  get 'surnames/directed_graph_large' => "surnames#directed_graph_large", :as => "surnames_directed_graph_large"

  #chart pages
  get 'histogram' => 'visualizations#histogram', :as => "histogram"
  get 'directed_graph_small' => 'visualizations#directed_graph_small', :as => "directed_graph_small"
  get 'directed_graph_large' => 'visualizations#directed_graph_large', :as => "directed_graph_large"
  get 'miserables' => 'visualizations#miserables'

  resources :surnames


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
