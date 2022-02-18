defmodule DragWeb.Page2 do
  use Phoenix.LiveView
  alias DragWeb.Components.SVG
  alias DragWeb.Router.Helpers, as: Routes

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, svgs: load_svg(), diagram: %{})}
  end

  @impl true
  def handle_event("copy_item", %{"target" => nil}, socket), do: {:noreply, socket}
  def handle_event("copy_item", %{"data" => [id, "lib"], "target" => target}, socket) do
    key = convert_key_to_tuple(target)
    diagram =
      socket.assigns.diagram
      |> Map.update(key, nil, fn _ -> %{path: id} end)
    {:noreply, assign(socket, diagram: diagram)}
  end

  def handle_event("copy_item", %{"data" => [_id, src], "target" => target}, socket) do
    diagram = socket.assigns.diagram
    from = convert_key_to_tuple(src)
    to = convert_key_to_tuple(target)

    item = Map.get(diagram, from)
    diagram =
      diagram
      |> Map.update(from, nil, fn _ -> nil end)
      |> Map.put(to, item)

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

  defp convert_key_to_tuple(key) when is_binary(key) do
    String.split(key, "_")
    |> Enum.reduce({}, fn s, key ->
      Tuple.append(key, String.to_integer(s))
    end)
  end
end
