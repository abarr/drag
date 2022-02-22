defmodule DragWeb.Page do
  use Phoenix.LiveView

  @plant [
    %{type: :autoclave, x: 75, y: 75},
    %{type: :ball_mill, x: 250, y: 75}
  ]

  @impl true
  def mount(_params, _session, socket) do
    socket = assign(socket, items: @plant)
    {:ok, socket}
  end

  @impl true
  def handle_params(_, _, socket) do
    {:noreply, push_event(socket, "load_diagram", %{items: socket.assigns.items})}
  end

  @impl true
  def handle_event("page-resize", _, socket) do
    {:noreply, push_event(socket, "page-resize", %{})}
  end

end
