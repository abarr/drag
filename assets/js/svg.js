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
        event.preventDefault()
        if (event.target.parentNode.classList.contains('draggable')) {
            this.selectedElement = event.target.parentNode
            this.offset = getMousePosition(event, this.selectedElement);
            console.log(this.offset)
            this.offset.x -= parseFloat(this.selectedElement.getAttributeNS(null, "x"));
            this.offset.y -= parseFloat(this.selectedElement.getAttributeNS(null, "y"));
          }
    },
    drag(event) {
        event.preventDefault()
        if (this.selectedElement) {
            var coord = getMousePosition(event, this.selectedElement);
            this.selectedElement.setAttributeNS(null, "x", coord.x - this.offset.x);
            this.selectedElement.setAttributeNS(null, "y", coord.y - this.offset.y);
        }
    },
    endDrag(event) { 
        event.preventDefault()
        this.selectedElement =
         false
    }
    
}

function getMousePosition(event, selectedElement) {
    var CTM = selectedElement.parentNode.getScreenCTM()
    return {
      x: (event.clientX - CTM.e) / CTM.a,
      y: (event.clientY - CTM.f) / CTM.d
    }
  }