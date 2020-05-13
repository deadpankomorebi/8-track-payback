import { Group, Box3 , Vector3, Box3Helper } from 'three';
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
            pno.moving = false;

            // Add self to parent's update list
            pno.parent.addToUpdateList(pno);

        });

        this.minX = -1.0;
        this.maxX = 1.0;
        this.minY = -1.5;
        this.maxY = 2.9;

    }

    moveForward(callback) {
        var currentZ = this.position.z;

        const approach = new TWEEN.Tween(this.position)
        .to({ z: this.position.z - 60}, 4000);

        approach.onComplete( () => {
            this.visible = false;
            this.position.z = currentZ;

            callback();
        });

        approach.start();

    }

    update(timeStamp) {
       TWEEN.update();
       this.boundingBox = new Box3().setFromObject(this);

   }


}



export default Piano;
