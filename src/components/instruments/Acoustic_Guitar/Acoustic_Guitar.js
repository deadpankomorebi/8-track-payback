import { Group, Box3 , Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './Acoustic_Guitar.gltf';

class AcousticGuitar extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'acousticGuitar';

        var guitar = this;

        loader.load(MODEL, (gltf) => {

        	gltf.scene.position.z = 50;
            gltf.scene.rotation.y = Math.PI / 2;
        	gltf.scene.scale.multiplyScalar(.1);

            this.add(gltf.scene);
            guitar.boundingBox = new Box3().setFromObject(gltf.scene);
            guitar.moving = false;
            console.log("tar");

            // Add self to parent's update list
        guitar.parent.addToUpdateList(guitar);
        });

        this.minX = -3.0;
        this.maxX = 3.0;
        this.minY = -1.9;
        this.maxY = 2.8
    }

    moveForward(callback) {

    	const approach = new TWEEN.Tween(this.position)	
    		.to({ z: this.position.z - 60}, 4000);

      approach.onComplete( () => {
        this.position.z = 50;
        //this.visible = false;
        console.log("approach");
        console.log(this);
        var center = this.boundingBox.getCenter(new Vector3);
        var size = this.boundingBox.getSize(new Vector3);
        console.log(center);
        console.log(size);
        callback();

    });

    		approach.start();

            
}

update(timeStamp) {
	TWEEN.update();
    this.boundingBox = new Box3().setFromObject(this);
}


}



export default AcousticGuitar;
