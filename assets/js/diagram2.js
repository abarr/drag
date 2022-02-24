import Stage from './stage.js';

export default {
    stage: {},
    bounds: {},
    layer: {},
    selected: null,
    mounted() {
        this.setup_stage('diagram2', this.el)

        window.addEventListener("resize", (e) => { this.pushEvent("page-resize", {}) });
        this.handleEvent("page-resize", () => {
            this.update_stage(document.querySelector("#diagram2"))
            layer.children.forEach(item => {
                if (item.x() + group_width > this.stage.width()) { item.x(this.stage.width() - group_width - 1) }
                if (item.y() + group_height > this.stage.height()) { item.y(this.stage.height() - group_height - 1)}
            });  
        });

        this.handleEvent("load_diagram2", ({ items }) => {
            for (let i = 0; i < items.length; i++) {
               
                let item =
                    new Konva.Rect({
                        id: items[i].name,
                        width: items[i].size,
                        height: items[i].size,
                        x: items[i].x,
                        y: items[i].y,
                        fill: items[i].fill,
                        shadowBlur: 2,
                        cornerRadius: 10,
                        draggable: true
                    })
                item.on('click', (e) => { this.handle_selected(item) })
                this.layer.add(item) 
            };
        });

    },
    handle_selected(item) { 
        if (this.selected === item) {
            item.fill('black')
            this.selected = null
        } else {
            if (this.selected !== null) {this.selected.fill('black')}
            this.selected = item
            item.fill('green')
          }
    },
    setup_stage(container, el) {
        this.stage = new Konva.Stage({ container: container });
        this.set_stage_size(this.el); 
        this.layer = new Konva.Layer();
        this.stage.add(this.layer)
    },
    set_stage_size(element) { 
        
        var containerWidth = element.clientWidth;
        var containerHeight = element.clientHeight;

        var scale = containerWidth / containerWidth;
        
        this.stage.width(containerWidth * scale);
        this.stage.height(containerHeight * scale);
        this.stage.scale({ x: scale, y: scale });
        
        this.bounds.h = this.stage.height()
        this.bounds.w = this.stage.width()
    }
}


function createConnectionPoints(source, destination) {
    return [source.x, source.y, destination.x, destination.y];
}
  
function hasIntersection(position, step) {
    return !(
        step.x > position.x ||
        step.x + SIZE < position.x ||
        step.y > position.y ||
        step.y + SIZE < position.y
    );
}

function detectConnection(position, id, steps) {
    const intersectingStep = Object.keys(steps).find((key) => {
      return key !== id && hasIntersection(position, steps[key]);
    });
    if (intersectingStep) {
      return intersectingStep;
    }
    return null;
}
