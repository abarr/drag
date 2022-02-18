defmodule DragWeb.Components.SVG do
  use Phoenix.LiveComponent

  def render(assigns) do
    ~H"""
    <rect x="4" y="5" width="40" height="40" fill="#007bff"/>
    """
  end

end
