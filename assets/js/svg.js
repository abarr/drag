export default {
    selectedElement: false,
    offset: false,
    
    mounted() {    
        this.el.addEventListener("mousedown", this.startDrag, false)
        this.el.addEventListener("mousemove", this.drag, false)
        this.el.addEventListener("mouseup", this.endDrag, false)
        this.el.addEventListener("mouseleave", this.endDrag, false)
    },
    startDrag(event) {
        if (event.target.classList.contains('draggable')) {
            this.selectedElement = event.target
            this.offset = getMousePosition(event);
            this.offset.x -= parseFloat(this.selectedElement.getAttributeNS(null, "x"));
            this.offset.y -= parseFloat(this.selectedElement.getAttributeNS(null, "y"));
          }
    },
    drag(event) {
        if (this.selectedElement) {
            event.preventDefault()
            var coord = getMousePosition(event);
            this.selectedElement.setAttributeNS(null, "x", coord.x - this.offset.x);
            this.selectedElement.setAttributeNS(null, "y", coord.y - this.offset.y);
        }
    },
    endDrag(event) { 
        this.selectedElement = false
    }
    
}

function getMousePosition(event) {
    var CTM = event.target.getScreenCTM()
    return {
      x: (event.clientX - CTM.e) / CTM.a,
      y: (event.clientY - CTM.f) / CTM.d
    }
  }