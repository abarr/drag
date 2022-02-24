import Konva from './konva.min.js';

export default (container) => {
    let stage = new Konva.Stage({ container: container });
    return (stage);
}
 