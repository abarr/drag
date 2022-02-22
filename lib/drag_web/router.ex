defmodule DragWeb.Router do
  use DragWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {DragWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", DragWeb do
    pipe_through :browser

    live "/", Page
  end

  # Other scopes may use custom stacks.
  # scope "/api", DragWeb do
  #   pipe_through :api
  # end
end
