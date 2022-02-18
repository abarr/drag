defmodule DragWeb.Page do
  use Phoenix.LiveView
  alias DragWeb.Components.Cell
  alias DragWeb.Router.Helpers, as: Routes

  @rows 6
  @cols 5

  @impl true
  def mount(_params, _session, socket) do
    diagram = diagram(@rows, @cols, %{})
    {:ok, assign(socket, svgs: load_svg(), diagram: diagram)}
  end

  @impl true
  def handle_event("copy_item", %{"target" => nil}, socket), do: {:noreply, socket}
  def handle_event("copy_item", %{"id" => id, "target" => target}, socket) do
    {row, col} = convert_target(target)
    diagram =
      socket.assigns.diagram
      |> Map.update({row, col}, nil, fn _ -> %{path: id} end)
    {:noreply, assign(socket, diagram: diagram)}
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

  defp diagram(rows, cols, diagram) do
    Enum.reduce(1..rows, diagram, fn row, diagram ->
      add_row(diagram, row, cols)
    end)
  end

  def add_row(diagram, row_num, cols) do
    Enum.reduce(1..cols, diagram, fn col, diagram ->
      Map.put(diagram, {row_num, col}, nil)
    end)
  end

  defp convert_target(key) when is_binary(key) do
    String.split(key, "_")
    |> Enum.reduce({}, fn s, key ->
      Tuple.append(key, String.to_integer(s))
    end)
  end
end
