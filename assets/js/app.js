// We import the CSS which is extracted to its own file by esbuild.
// Remove this line if you add a your own CSS build pipeline (e.g postcss).

// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html"
// Establish Phoenix Socket and LiveView configuration.
import {Socket} from "phoenix"
import {LiveSocket} from "phoenix_live_view"
import topbar from "../vendor/topbar"
import Svg from "./svg"

const Hooks = {
    Svg: Svg
}

Hooks.Draggable = {
    mounted() {
        this.el.addEventListener("dragstart", event => {
            const id = event.target.getAttribute("phx-value-id")
            const src = event.target.getAttribute("phx-value-src")
            event.dataTransfer.setData("text/list", [id, src])
        }, false)

        this.el.addEventListener("dragend", event => {
            event.target.style.opacity = ""
        }, false)

        this.el.addEventListener("drop", event => {
            event.preventDefault()
        }, false)
    }
}

Hooks.Diagram = {
    mounted() {
        this.el.addEventListener("dragover", event => {
            event.preventDefault()
        }, false)

        this.el.addEventListener("drop", event => {
            event.preventDefault()
            const data = event.dataTransfer.getData("text/list").split(",")
            this.pushEvent("copy_item", { data: data, target: event.target.getAttribute("id")})
        }, false)
    }
}


let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {
    params: { _csrf_token: csrfToken },
    hooks: Hooks
})

// Show progress bar on live navigation and form submits
topbar.config({barColors: {0: "#29d"}, shadowColor: "rgba(0, 0, 0, .3)"})
window.addEventListener("phx:page-loading-start", info => topbar.show())
window.addEventListener("phx:page-loading-stop", info => topbar.hide())

// connect if there are any LiveViews on the page
liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket

