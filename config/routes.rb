Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]

  resources :users, only: [:new, :create]

  namespace :api, defaults: {format: :json} do
    get 'lended_amount/:id', to: "events#lended_amount_current_user"
    get 'owed_amount/:id', to: "event_splits#owed_amount_current_user"
    get 'lended_amount_user/:id', to: "events#lended_amount"
    get 'owed_amount_user/:id', to: "events#owed_amount"

    resources :user_data, only: [:index]
    resources :transactions, only: [:index, :create]
    resources :events, only: [:index, :create]
    resources :event_splits, only: [:index, :create, :show]
  end


  root "static_pages#root"
end
