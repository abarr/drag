import Konva from './konva.min.js';

export default {
    stage: false,

    mounted() {
        this.stage = new Konva.Stage({ container: 'diagram' });
        this.update_stage(this.el.clientWidth)
        var layer = new Konva.Layer();
        
        this.handleEvent("load_diagram", ({ items }) => {
            for (let i = 0; i < items.length; i++) {
                Konva.Image.fromURL('/images/' + items[i].type + '.svg', (image) => {
                    image.x(items[i].x)
                    image.y(items[i].y)
                    image.draggable(true)
                    var bounds = { h: this.stage.height(), w: this.stage.width() }
                    image.on('dragmove', () => {
                        const pos = image.getAbsolutePosition()
                        console.log(pos)
                        if (pos.x < 0) { image.x(0) }
                        if (pos.y < 0) { image.y(0) }
                        if (pos.x > bounds.w - image.width()) {image.x(bounds.w - image.width()) }
                        if (pos.y > bounds.h - image.height()) { image.y(bounds.h - image.height()) }
                    })
                    layer.add(image);
                });
            }
        })
       
        this.stage.add(layer);
        layer.draw();
    },
    update_stage(clientWidth) {
        var containerWidth = this.stage.attrs.container.clientWidth;
        var containerHeight = this.stage.attrs.container.clientHeight;
        var scale = containerWidth / containerWidth;
        this.stage.width(containerWidth * scale);
        this.stage.height(containerHeight * scale);
        this.stage.scale({ x: scale, y: scale });
    }
}

