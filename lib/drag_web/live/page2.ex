defmodule DragWeb.Page2 do
  use Phoenix.LiveView

  @plant [
    %{
        name: "autoclave",
        x: 100,
        y: 100,
        size: 50,
        fill: "black"
      },
      %{
        name: "bulion",
        x: 200,
        y: 100,
        size: 50,
        fill: "black"
      }
    # %{name: "ballmill", x: 250, y: 75, path: "/images/ball_mill.svg"}
  ]

  @impl true
  def mount(_params, _session, socket) do
    socket = assign(socket, items: @plant)
    {:ok, socket}
  end

  @impl true
  def handle_params(_, _, socket) do
    {:noreply, push_event(socket, "load_diagram2", %{items: socket.assigns.items})}
  end

  @impl true
  def handle_event("page-resize", _, socket) do
    {:noreply, push_event(socket, "page-resize", %{})}
  end

end
