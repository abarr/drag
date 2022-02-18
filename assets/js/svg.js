export default {
    selectedElement: false,
    currentX: 0,
    currentY: 0,
    
    mounted() {    
        this.el.addEventListener("mousedown", this.startDrag, false)
        this.el.addEventListener("mousemove", this.drag, false)
        this.el.addEventListener("mouseup", this.endDrag, false)
        this.el.addEventListener("mouseleave", this.endDrag, false)
    },
    startDrag(event) {
        event.preventDefault()
        this.selectedElement = event.target
    },
    drag(event) {
        if (this.selectedElement) {
            event.preventDefault()
            var CTM = event.target.getScreenCTM();
            var coord = {
                x: (event.clientX - CTM.e) / CTM.a,
                y: (event.clientY - CTM.f) / CTM.d
              }
            this.selectedElement.setAttributeNS(null, "x", coord.x);
            this.selectedElement.setAttributeNS(null, "y", coord.y);
        }
    },
    endDrag(event) { 
        this.selectedElement = false
    }
}