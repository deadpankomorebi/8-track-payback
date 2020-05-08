import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
// https://poly.google.com/view/frvTEfwm9Yg
import MODEL from './Headphones.gltf';

class Headphones extends Group {
	constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'headphones';

        loader.load(MODEL, (gltf) => {
        	gltf.scene.position.set(0, 1, 0);
        	gltf.scene.scale.multiplyScalar(.1);
        	this.add(gltf.scene);
        }); 
    }
}


export default Headphones;
