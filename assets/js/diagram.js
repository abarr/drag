import Konva from './konva.min.js';

export default {
    stage: false,
    bounds: { h: 0, w: 0 },
    anchors: [],
    mounted() {
        // Default size of each item
        var group_width = 100; 
        var group_height = 80;

        // Create the stage and modify size based on window size
        this.stage = new Konva.Stage({ container: 'diagram' });
        var container = this.el;
        this.update_stage(container)

        // Create a layer to hold all groups 
        var layer = new Konva.Layer();
        this.stage.add(layer)

        // Listens for page resize and adjusts Konva Stage
        window.addEventListener("resize", (e) => { this.pushEvent("page-resize", {}) });
        this.handleEvent("page-resize", () => {
            console.log("RESIZING WINDOW")
            this.update_stage(document.querySelector("#diagram"))
            layer.children.forEach(item => {
                if (item.x() + group_width > this.stage.width()) { item.x(this.stage.width() - group_width - 1) }
                if (item.y() + group_height > this.stage.height()) { item.y(this.stage.height() - group_height - 1)}
            });  
        });
        
        // On page load LV passes list of all existing items on Diagram
        this.handleEvent("load_diagram", ({ items }) => {
            for (let i = 0; i < items.length; i++) {
                
                // Create a group for each item
                let group = new Konva.Group({
                    x: 10 + 100 * i,
                    y: 10 + 100 * i,
                    id: items[i].name,
                    draggable: true
                });

                // Handle bounds of canvas
                this.bounds = { h: this.stage.height(), w: this.stage.width() }
                group.on('dragmove', () => {
                    if (group.x() < 0) { group.x(1) }
                    if (group.y() < 0) { group.y(1) }
                    if (group.x() > this.bounds.w - 100) {group.x(this.bounds.w - group_width - 1) }
                    if (group.y() > this.bounds.h - 80) { group.y(this.bounds.h - group_height - 1) }

                    layer.children.forEach(function (item) {
                        if (group === item) { return; }
                        let test = item.getClientRect()
                        let dragged = group.getClientRect()
  
                        if (haveIntersection(test, dragged)) {
                            if ((dragged.x < test.x + test.width) && dragged.x > test.x) {
                                group.x(test.x + test.width)
                            } else if ((dragged.x + dragged.width > test.x) && dragged.x < test.x) {
                                group.x(test.x - dragged.width)
                            } else if ((dragged.y + dragged.height > test.y) && dragged.y < test.y) {
                                group.y(test.y - dragged.height)
                            }else if ((dragged.y < test.y + test.height) && dragged.y > test.y) {
                                group.y(test.y + test.height)
                            }
                        }
                    });
                })

                // Add a rectangle as background
                let rect = new Konva.Rect({
                    width: group_width,
                    height: group_height,
                    fill: 'white',
                    shadowBlur: 2,
                    cornerRadius: 10,
                });

                // Draw item
                let path = new Konva.Path({
                    data: items[i].path,
                    fill: items[i].fill,
                    stroke: items[i].stroke,
                    width: items[i].width,
                    height: items[i].height,
                    scale: {
                      x: 1,
                      y: 1,
                    },
                });
                
                // Centre item on rectangle
                path.x((rect.x() + (rect.width() - path.width()) / 2))
                path.y((rect.y() + (rect.height() - path.height())/2))

                // Add rect and path to group
                group.add(rect);
                group.add(path);

                // Add to layer
                layer.add(group)
            }
        })
    },
    update_stage(element) { // Handles page resize
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


function haveIntersection(test, dragged) {
    return !(
      dragged.x > test.x + test.width ||
      dragged.x + dragged.width < test.x ||
      dragged.y > test.y + test.height ||
      dragged.y + dragged.height < test.y
    );
}
