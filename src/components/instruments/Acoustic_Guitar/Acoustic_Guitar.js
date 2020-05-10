import { Group, Box3 , Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './Acoustic_Guitar.gltf';

class AcousticGuitar extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        const man = loader.manager;
        var esto = this;
         function done() {
            console.log("tar");
            var box = new Box3().setFromObject(esto);
            console.log(box);
            esto.userData.boundingBox = box;
        }

        man.onLoad = done; 


        this.name = 'acousticGuitar';

        loader.load(MODEL, (gltf) => {

        	gltf.scene.position.z = 50;
            gltf.scene.rotation.y = Math.PI / 2;
        	gltf.scene.scale.multiplyScalar(.1);

            this.add(gltf.scene);
        });
    }

    moveForward() {
    	const approach = new TWEEN.Tween(this.position)	
    		.to({ z: this.position.z - 60}, 4000);



    		approach.start();

            approach.onComplete( () => {
this.parent.remove(this);
});

            
}

update(timeStamp) {
	TWEEN.update();
}


}



export default AcousticGuitar;
