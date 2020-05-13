import { Group, Vector3, Box3, Box3Helper } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
// https://poly.google.com/view/frvTEfwm9Yg
import MODEL from "./Headphones.gltf";

class Headphones extends Group {
  constructor(parent) {
    // Call parent Group() constructor
    super();

    const loader = new GLTFLoader();

    this.name = "headphones";

    var phones = this;

    loader.load(MODEL, (gltf) => {
      gltf.scene.position.set(0, 0, 0);
      gltf.scene.scale.multiplyScalar(0.1);

      this.add(gltf.scene);
      phones.boundingBox = new Box3().setFromObject(gltf.scene);

      phones.parent.addToUpdateList(phones);
    });

    window.addEventListener("keydown", this.handleKeypressEvents.bind(phones));
  }

  checkTubeCollisions() {
    if (this.boundingBox) {
      var maxX = this.boundingBox.max.x;
      var maxY = this.boundingBox.max.y;
      var minX = this.boundingBox.min.x;
      var minY = this.boundingBox.min.y;
      var diff;

      if (this.position.y > 3.0) {
        this.position.y = 3.0;
      }
      if (this.position.y < -1.4) {
        this.position.y = -1.4;
      }
      if (this.position.y < -1.0 || this.position.y > 1.0) {
        if (this.position.x > 1.0) {
          this.position.x = 1.0;
        }
        if (this.position.x < -1.0) {
          this.position.x = -1.0;
        }
      } else {
        if (this.position.x > 2.0) {
          this.position.x = 2.0;
        }
        if (this.position.x < -2.0) {
          this.position.x = -2.0;
        }
      }
    }
  }

  // Handle keypress events
  handleKeypressEvents(event) {
    if (event.target.tagName === "INPUT") {
      return;
    }

    // The vectors to which each key code in this handler maps. (Change these if you like)
    const keyMap = {
      ArrowUp: new Vector3(0, 1, 0),
      ArrowDown: new Vector3(0, -1, 0),
      ArrowLeft: new Vector3(1, 0, 0),
      ArrowRight: new Vector3(-1, 0, 0),
      w: new Vector3(0, 1, 0),
      a: new Vector3(1, 0, 0),
      s: new Vector3(0, -1, 0),
      d: new Vector3(-1, 0, 0),
    };

    const scale = 0.5; // the magnitude of the movement produced by this keypress

    // Check which key was pressed. If it wasn't a triggering key, do nothing.
    if (!keyMap.hasOwnProperty(event.key)) {
      return;
    } else {
      let offset = keyMap[event.key];
      this.position.add(offset.multiplyScalar(scale));
      this.checkTubeCollisions();
      //console.log(this.position);
    }
  }

  update(timeStamp) {
    this.boundingBox = new Box3().setFromObject(this);
  }
}

export default Headphones;
