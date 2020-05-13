import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
// https://poly.google.com/view/frvTEfwm9Yg
import MODEL from "./Boombox.gltf";

class Boombox extends Group {
  constructor(parent) {
    // Call parent Group() constructor
    super();

    const loader = new GLTFLoader();

    this.name = "boombox";

    loader.load(MODEL, (gltf) => {
      gltf.scene.position.set(0, -2.5, -1);
      gltf.scene.rotation.y = Math.PI;
      gltf.scene.scale.multiplyScalar(0.2);
      this.add(gltf.scene);
    });

    this.state = {
      twirl: 0,
      count: 0,
    };
    parent.addToUpdateList(this);
  }

  jump() {
    console.log(this.position.y);
    const jumpUp = new TWEEN.Tween(this.position)
      .to({ y: this.position.y + 0.8 }, 300)
      .easing(TWEEN.Easing.Quadratic.Out);
    const fallDown = new TWEEN.Tween(this.position)
      .to({ y: 0 }, 300)
      .easing(TWEEN.Easing.Quadratic.In);

    // Fall down after jumping up
    jumpUp.onComplete(() => fallDown.start());
    jumpUp.start();
  }

  update() {
    if (this.state.count === 40) {
      this.state.count = 0;
      this.jump();
    }
    TWEEN.update();
    this.state.count++;
  }
}

export default Boombox;
