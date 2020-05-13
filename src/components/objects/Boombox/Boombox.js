import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
// https://poly.google.com/view/frvTEfwm9Yg
import MODEL from './Boombox.gltf';

class Boombox extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'boombox';

        loader.load(MODEL, (gltf) => {
            gltf.scene.position.set(0, -2.5, 0);
            gltf.scene.rotation.y = Math.PI;
            gltf.scene.scale.multiplyScalar(0.2);
            this.add(gltf.scene);
        });
    }
}

export default Boombox;
