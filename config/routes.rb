Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: {format: :json} do
    resources :transactions, only: [:index, :create]
    resources :events, only: [:index, :create]
    resources :event_splits, only: [:index, :create, :show]
  end

  root "static_pages#root"
end
