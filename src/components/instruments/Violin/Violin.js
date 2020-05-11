import { Group, Box3 , Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './Violin.gltf';

class Violin extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();


        this.name = 'violin';

        var vln = this;

        loader.load(MODEL, (gltf) => {

        	gltf.scene.position.z = 50;
            gltf.scene.rotation.set(-Math.PI / 2, Math.PI, 0);
            gltf.scene.scale.multiplyScalar(.000001);
            this.add(gltf.scene);
            vln.boundingBox = new Box3().setFromObject(gltf.scene);
            vln.moving = false;
            console.log("vla");

            // Add self to parent's update list
        vln.parent.addToUpdateList(vln);
        });

        this.minX = -2.7;
        this.maxX = 3.7;
        this.minY = -2.2;
        this.maxY = 4.0;

    }

    moveForward(callback) {
        var currentZ = this.position.z;

    	const approach = new TWEEN.Tween(this.position)	
      .to({ z: this.position.z - 60}, 4000);

approach.onComplete( () => {
        this.visible = false;
        this.position.z = currentZ;
        console.log("Move Forward is complete");
        console.log(this);
        callback();
    });

      approach.start();


  }

  update(timeStamp) {
   TWEEN.update();
   this.boundingBox = new Box3().setFromObject(this);
}


}



export default Violin;
