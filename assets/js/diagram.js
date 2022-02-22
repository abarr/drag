import Konva from './konva.min.js';

export default {
    stage: false,
    bounds: {h: 0, w: 0},
    mounted() {
        this.stage = new Konva.Stage({ container: 'diagram' });
        var container = this.el;
        this.update_stage(container)
        var layer = new Konva.Layer();

        window.addEventListener("resize", (e) => { this.pushEvent("page-resize", {}) });
        
        this.handleEvent("page-resize", () => {
            this.update_stage(document.querySelector("#diagram"))
            layer.children.forEach(item => {
                console.log(item.x() + " - " + this.stage.width())
                if (item.x() + item.width() > this.stage.width()) { item.x(this.stage.width() - item.width()) }
                if (item.y() + item.height() > this.stage.height()) { item.y(this.stage.height() - item.height())}
            });  
        });
        
        this.handleEvent("load_diagram", ({ items }) => {
            for (let i = 0; i < items.length; i++) {
                Konva.Image.fromURL('/images/' + items[i].type + '.svg', (image) => {
                    image.x(items[i].x)
                    image.y(items[i].y)
                    image.draggable(true)
                    this.bounds = { h: this.stage.height(), w: this.stage.width() }
                    image.on('dragmove', () => {
                        const pos = image.getAbsolutePosition()
                        if (pos.x < 0) { image.x(0) }
                        if (pos.y < 0) { image.y(0) }
                        if (pos.x > this.bounds.w - image.width()) {image.x(this.bounds.w - image.width()) }
                        if (pos.y > this.bounds.h - image.height()) { image.y(this.bounds.h - image.height()) }
                    })
                    layer.add(image);
                });
            }
        })
        
        this.stage.add(layer);
        layer.draw();
    },
    update_stage(element) {
        var containerWidth = element.clientWidth;
        console.log(containerWidth)
        var containerHeight = element.clientHeight;
        var scale = containerWidth / containerWidth;
        this.stage.width(containerWidth * scale);
        this.stage.height(containerHeight * scale);
        this.stage.scale({ x: scale, y: scale });
        this.bounds.h = this.stage.height()
        this.bounds.w = this.stage.width()
    }
}

