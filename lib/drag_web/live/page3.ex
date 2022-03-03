defmodule DragWeb.Page3 do
  use Phoenix.LiveView

  @plant [
    %{
        id: "one",
        x: 100,
        y: 100,
        size: 50,
        fill: "black"
      },
      %{
        id: "two",
        x: 400,
        y: 100,
        size: 50,
        fill: "black"
      }
  ]

  @impl true
  def mount(_params, _session, socket) do
    socket = assign(socket, items: @plant)
    {:ok, socket}
  end

  @impl true
  def handle_params(_, _, socket) do
    {:noreply, push_event(socket, "load_diagram3", %{items: socket.assigns.items})}
  end

  @impl true
  def handle_event("page-resize", _, socket) do
    {:noreply, push_event(socket, "page-resize", %{})}
  end

end
