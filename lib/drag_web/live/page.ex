defmodule DragWeb.Page do
  use Phoenix.LiveView

  @plant [
    %{
        name: "autoclave",
        width: "76", height: "28",
        path: "M62.0071 2.08768C68.6174 2.04302 74 7.38934 74 13.9999C74 20.6104 68.6174 25.9567 62.0071 25.9121L37 25.7431V11.9999H43C43.5523 11.9999 44 11.5522 44 10.9999C44 10.4476 43.5523 9.99987 43 9.99987H37H35H30C29.4477 9.99987 29 10.4476 29 10.9999C29 11.5522 29.4477 11.9999 30 11.9999H35V25.7296L13.5065 25.5843C7.13909 25.5413 2 20.3674 2 13.9999C2 7.63234 7.13909 2.45841 13.5065 2.41539L21.5 2.36138V16.9999H16C15.4477 16.9999 15 17.4476 15 17.9999C15 18.5522 15.4477 18.9999 16 18.9999H29C29.5523 18.9999 30 18.5522 30 17.9999C30 17.4476 29.5523 16.9999 29 16.9999H23.5V2.34786L52 2.1553V16.9999H47C46.4477 16.9999 46 17.4476 46 17.9999C46 18.5522 46.4477 18.9999 47 18.9999H60C60.5523 18.9999 61 18.5522 61 17.9999C61 17.4476 60.5523 16.9999 60 16.9999H54V2.14178L62.0071 2.08768ZM0 13.9999C0 6.53304 6.0263 0.465884 13.493 0.415434L61.9935 0.0877268C69.7137 0.0355633 76 6.27949 76 13.9999C76 21.7202 69.7137 27.9642 61.9935 27.912L13.493 27.5843C6.0263 27.5339 0 21.4667 0 13.9999Z",
        fill: "white",
        stroke: "#333333"
      },
      %{
        name: "bulion",
        width: "64", height: "24",
        path: "M26.5803 0C25.8626 0 25.1999 0.384572 24.8438 1.00772L21.9867 6.00772C21.8032 6.32883 21.7197 6.66883 21.7202 7H16.5803C15.8626 7 15.1999 7.38457 14.8438 8.00772L11.9867 13.0077C11.8032 13.3288 11.7197 13.6688 11.7202 14H11.5H11H5.58031C4.8626 14 4.19991 14.3846 3.84383 15.0077L0.986684 20.0077C0.22479 21.341 1.18752 23 2.72317 23H11H11.5H19.7768C20.8151 23 21.5915 22.2416 21.75 21.3382C21.9085 22.2416 22.6849 23 23.7232 23H32H32.5H40.7768C41.8151 23 42.5915 22.2416 42.75 21.3382C42.9085 22.2416 43.6849 23 44.7232 23H53H53.5H61.7768C63.3125 23 64.2752 21.341 63.5133 20.0077L60.6562 15.0077C60.3001 14.3846 59.6374 14 58.9197 14H53.7798C53.7802 13.6688 53.6968 13.3288 53.5133 13.0077L50.6562 8.00772C50.3001 7.38457 49.6374 7 48.9197 7H43.5H43H42.7798C42.7803 6.66883 42.6968 6.32883 42.5133 6.00772L39.6562 1.00772C39.3001 0.384572 38.6374 0 37.9197 0H32.5H32H26.5803ZM42.75 20.6573C42.7887 20.4378 42.8661 20.2187 42.9867 20.0077L45.2768 16H43.5H43H40.2232L42.5133 20.0077C42.6339 20.2187 42.7112 20.4378 42.75 20.6573ZM37.9197 16H34.7232H32.5H32H30.7768H26.5803L23.7232 21H32H32.5H40.7768L37.9197 16ZM34.7232 14H37.9197H43H43.5H47.5803H51.7768L48.9197 9H43.5H43H40.7768H37.5803L34.7232 14ZM21.9867 20.0077C21.8661 20.2187 21.7887 20.4378 21.75 20.6573C21.7112 20.4378 21.6339 20.2187 21.5133 20.0077L19.2232 16H22H22.5H24.2768L21.9867 20.0077ZM30.7768 14H26.5803H22.5H22H16.9197H13.7232L16.5803 9H22H22.5H23.7232H27.9197L30.7768 14ZM16.9197 16H13.7232H11.5H11H5.58031L2.72317 21H11H11.5H19.7768L16.9197 16ZM53 16H51.7768H47.5803L44.7232 21H53H53.5H61.7768L58.9197 16H53.5H53ZM32.9867 13.0077C32.8661 13.2187 32.7887 13.4378 32.75 13.6573C32.7112 13.4378 32.6339 13.2187 32.5133 13.0077L30.2232 9H32H32.5H35.2768L32.9867 13.0077ZM40.7768 7H37.5803H32.5H32H27.9197H23.7232L26.5803 2H32H32.5H37.9197L40.7768 7Z",
        fill: "white",
        stroke: "#333333"
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
    {:noreply, push_event(socket, "load_diagram", %{items: socket.assigns.items})}
  end

  @impl true
  def handle_event("page-resize", _, socket) do
    {:noreply, push_event(socket, "page-resize", %{})}
  end

end
