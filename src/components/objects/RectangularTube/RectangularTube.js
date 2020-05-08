import { Group, TubeGeometry, LineCurve3, Vector3, MeshNormalMaterial, Mesh, DoubleSide } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class RectangularTube extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        this.name = 'rectangular tube';

        var v1 = new Vector3(0, 0, 0);
        var v2 = new Vector3(0, 0, 50);
        var path = new LineCurve3 (v1, v2);
        var geometry = new TubeGeometry(
                            path,              // Curve
                            5,              // tubular segments
                            5,              // radius
                            4,             // radial segments
                            false           // closed
                            );
        var material = new MeshNormalMaterial( {color:0xffff00});
        material.side = DoubleSide;
        var tube = new Mesh(geometry, material);
        tube.position.set(0, 1, 0);
        tube.rotation.set(0, 0, Math.PI * .25);
        this.add(tube);
    }
}

export default RectangularTube;
