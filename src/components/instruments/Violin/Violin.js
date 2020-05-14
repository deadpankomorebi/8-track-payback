import { Group, Box3, Vector3, Box3Helper } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import MODEL from "./Violin.gltf";

class Violin extends Group {
  constructor() {
    // Call parent Group() constructor
    super();

    const loader = new GLTFLoader();

    this.name = "violin";

    var vln = this;

    // load violin gltf model
    loader.load(MODEL, (gltf) => {

      // set initial position, orientation, and size
      gltf.scene.position.z = 50;
      gltf.scene.rotation.set(-Math.PI / 2, Math.PI, 0);
      gltf.scene.scale.multiplyScalar(0.000002);

      // add violin
      this.add(gltf.scene);

      // associate bounding box and set moving state
      vln.boundingBox = new Box3().setFromObject(gltf.scene);
      vln.moving = false;

      // Add self to parent's update list
      vln.parent.addToUpdateList(vln);
    });

    // set minimum and maximum boundaries
    this.minX = 0;
    this.maxX = 1.5;
    this.minY = -1.0;
    this.maxY = 3.5;
  }

  // bring violin forward from end of tube using Tween
  moveForward(callback) {
    var currentZ = this.position.z;

    // create Tween to bring violin to a position past the camera
    const approach = new TWEEN.Tween(this.position).to(
      { z: this.position.z - 60 },
      4000
    );

    // after Tween is completed, return to initial z position as invisible
    approach.onComplete(() => {
      this.visible = false;
      this.position.z = currentZ;

      callback();
    });

    approach.start();
  }

  // update Tween and bounding box position
  update(timeStamp) {
    TWEEN.update();
    this.boundingBox = new Box3().setFromObject(this);
  }
}

export default Violin;
