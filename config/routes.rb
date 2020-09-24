Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'images#index'

  resources :images, only: %i[create destroy new index show]
  resources :feedbacks, only: [:new]

  namespace :api do
    resource :feedbacks, only: [:create]
    resources :comments, only: [:create, :index]
  end
end
