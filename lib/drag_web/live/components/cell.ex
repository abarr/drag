defmodule DragWeb.Components.Cell do
  use Phoenix.LiveComponent

  def render(assigns) do
    ~H"""
    <div class="">
      <%= if is_nil(@cell) do %>
        <div id={"#{@row}_#{@col}"} class="h-44 w-44 bg-gray-50 mx-6 mt-6">
          <div class="rounded-lg align-middle " >
          </div>
        </div>
      <% else %>
      <div id={"#{@row}_#{@col}"} class="h-44 w-44 mx-6 mt-6">

        <div class="flex items-center h-full draggable m-3 rounded-lg hover:border p-4">
          <img class="object-none object-center mx-auto" src={"/images/#{@cell.path}.svg"} >
        </div>

      </div>
      <% end %>
    </div>
    """
  end

end
