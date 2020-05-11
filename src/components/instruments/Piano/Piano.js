import { Group, Box3 , Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './Piano.gltf';

class Piano extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'piano';

        var pno = this;

        loader.load(MODEL, (gltf) => {

        	gltf.scene.position.z = 50;
            gltf.scene.rotation.y = Math.PI / 2;
        	gltf.scene.scale.multiplyScalar(.15);

            this.add(gltf.scene);
            pno.boundingBox = new Box3().setFromObject(gltf.scene);
            console.log("pano");

            // Add self to parent's update list
        pno.parent.addToUpdateList(pno);

        });

    }

    moveForward() {
    	const approach = new TWEEN.Tween(this.position)	
    		.to({ z: this.position.z - 60}, 4000);

approach.onComplete( () => {
        this.position.z = 50;
    });

    		approach.start(); 
            
}

update(timeStamp) {
	TWEEN.update();
    this.boundingBox = new Box3().setFromObject(this);
}


}



export default Piano;
