Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]

  resources :users, only: [:new, :create]

  namespace :api, defaults: {format: :json} do
    get 'lended_amount/:id', to: "events#lended_amount_current_user"
    get 'owed_amount/:id', to: "event_splits#owed_amount_current_user"
    get 'lended_amount_user/:id', to: "events#lended_amount"
    get 'owed_amount_user/:id', to: "events#owed_amount"
    get 'guest_session', to: "sessions#new_guest_session"

    get 'event_splits/:from_id/:to_id', to: "event_splits#show_between"
    get 'transactions/:from_id/:to_id', to: "transactions#show_between"

    resource :session, only: [:create, :destroy]
    resources :user_data, only: [:index]
    resources :transactions, only: [:show, :index, :create]
    resources :events, only: [:show, :index, :create]
    resources :event_splits, only: [:index, :create, :show]
    resources :balances, only: [:index, :create, :show]
  end

  get 'guest_session', to: "sessions#new_guest_session"

  root "static_pages#root"
end
