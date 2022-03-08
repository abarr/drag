import Stage from './stage.js';

function haveIntersection(r1, r2) {
    return !(
        r2.x > r1.x + r1.width ||
        r2.x + r2.width < r1.x ||
        r2.y > r1.y + r1.height ||
        r2.y + r2.height < r1.y
    );
}

export default {
    stage: {},
    bounds: {},
    layer: {},
    targets: [],
    connections: [],
    connector: {
        id: "tool",
        from_drag_point: {
            id: "dp_from",
            x: 100,
            y: 300,
            radius: 10,
            fill: "red",
            target: null
        },
        to_drag_point: {
            id: "dp_to",
            x: 400,
            y: 400,
            radius: 10,
            fill: "red",
            target: null
        }
    },
    mounted() {
        this.setup_stage('diagram2', this.el)

        window.addEventListener("resize", (e) => { this.pushEvent("page-resize", {}) });

        this.handleEvent("page-resize", () => {
            this.update_stage(document.querySelector("#diagram3"))
            layer.children.forEach(item => {
                if (item.x() + group_width > this.stage.width()) { item.x(this.stage.width() - group_width - 1) }
                if (item.y() + group_height > this.stage.height()) { item.y(this.stage.height() - group_height - 1)}
            });  
        });

        this.handleEvent("load_diagram3", ({ items }) => {
            this.targets = items
            this.render_targets()
        });

        this.render_connector()
        this.add_drag_event_to_layer()
    },
    add_drag_event_to_layer() {
        layer = this.layer
        connector = this.connector
        
        this.layer.on('dragmove', function (e) {
            var target = e.target;
            var targetRect = e.target.getClientRect();
            layer.children.forEach(function (child) {
                if (child === target) { return; }
                if (child.id() === 'dp_from') { return; }
                if (child.id() === 'dp_to') { return; }
                
                if (haveIntersection(child.getClientRect(), targetRect)) {
                    switch (target.id()) {
                        case 'dp_from':
                            child.fill('red')
                            connector.from_drag_point.target = child
                            break;
                        case 'dp_to':
                            child.fill('red')
                            connector.to_drag_point.target = child
                            break;
                        default:
                          // code block
                      }
                } else {
                    switch (target.id()) {
                        case 'dp_from':
                            connector.from_drag_point.target = null
                            break;
                        case 'dp_to':
                            connector.to_drag_point.target.fill('black')
                            connector.to_drag_point.target = null
                            break;
                        default:
                          // code block
                      }
                }
            });
            console.log(connector.from_drag_point.target)
        });
    },
    updateObjects() {
        var from_drag_point = this.layer.findOne('#' + this.connector.from_drag_point.id);    
        from_drag_point.x(this.connector.from_drag_point.x);
        from_drag_point.y(this.connector.from_drag_point.y);

        var to_drag_point = this.layer.findOne('#' + this.connector.to_drag_point.id);    
        to_drag_point.x(this.connector.to_drag_point.x);
        to_drag_point.y(this.connector.to_drag_point.y);

        var line = this.layer.findOne('#drag_points_connector');
        const points = this.getConnectorPoints(
            from_drag_point.position(),
            to_drag_point.position()
        );
        line.points(points);
    },
    render_connector() {
        var from_dp = new Konva.Circle({
            id: this.connector.from_drag_point.id,
            fill: this.connector.from_drag_point.fill,
            x: this.connector.from_drag_point.x,
            y: this.connector.from_drag_point.y,
            radius: this.connector.from_drag_point.radius,
            draggable: true
        });

        this.layer.add(from_dp);
        
        var to_dp = new Konva.Circle({
            id: this.connector.to_drag_point.id,
            fill: this.connector.to_drag_point.fill,
            x: this.connector.to_drag_point.x,
            y: this.connector.to_drag_point.y,
            radius: this.connector.to_drag_point.radius,
            draggable: true
        });
        to_dp.on('dragmove', () => {
            // mutate the state
            this.connector.to_drag_point.x = to_dp.x();
            this.connector.to_drag_point.y = to_dp.y();
  
            // update nodes from the new state
            this.updateObjects();
          });

        this.layer.add(to_dp);
        
        var line = new Konva.Line({
            id: "drag_points_connector",
            points: this.getConnectorPoints(
                this.connector.from_drag_point,
                this.connector.to_drag_point),
            stroke: 'red',
            tension: 0
        });
        this.layer.add(line);

        from_dp.on('dragmove', () => {
            // mutate the state
            this.connector.from_drag_point.x = from_dp.x();
            this.connector.from_drag_point.y = from_dp.y();
            // update nodes from the new state
            this.updateObjects();
          });
    },
    getConnectorPoints(from, to) {
        return [
            from.x,
            from.y,
            (from.x + to.x) / 2,
            from.y,
            (from.x + to.x) / 2,
            to.y,
            to.x,
            to.y
        ];
    },
    render_targets() {
        this.targets.forEach((target) => {
            var node = new Konva.Rect({
                id: target.id,
                width: target.size,
                height: target.size,
                x: target.x,
                y: target.y,
                fill: target.fill,
                shadowBlur: 2,
                cornerRadius: 10,
                draggable: true
            })

            this.layer.add(node);
    
            node.on('dragmove', () => {
              // mutate the state
              target.x = node.x();
              target.y = node.y();
    
              // update nodes from the new state
              this.updateObjects();
            });
          });
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
    },
    
}
