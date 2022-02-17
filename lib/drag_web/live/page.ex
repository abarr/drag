defmodule DragWeb.Page do
  use Phoenix.LiveView
  alias DragWeb.Components.Plant
  alias DragWeb.Router.Helpers, as: Routes

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, svgs: load_svg(), diagram: [])}
  end

  @impl true
  def handle_event("copy_item", e, socket) do
    e |> IO.inspect(label: "11")
    {:noreply, socket}
  end

  defp load_svg() do
    Application.app_dir(:drag, "priv/static/images/*.svg")
    |> Path.wildcard()
    |> Enum.map(fn path ->
      %{
          id: Path.basename(path, ".svg"),
          path: "/images/#{Path.basename(path)}",
        }
      end)
  end
end
