defmodule DragWeb.Page do
  use Phoenix.LiveView
  alias DragWeb.Router.Helpers, as: Routes

  def mount(_params, _session, socket) do
    {:ok, assign(socket, svgs: load_svg())}
  end

  defp load_svg() do
    Application.app_dir(:drag, "priv/static/images/*.svg")
    |> Path.wildcard()
    |> Enum.map(fn path -> "/images/#{Path.basename(path)}" end)
  end
end
