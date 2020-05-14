/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from "three";
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { RectangularTubeScene } from "scenes";
import { CamListener } from "camListener";
import { StartMenu, LoseMenu, PauseMenu, WinMenu } from "menus";

// Initialize core ThreeJS components
const camera = new CamListener();
const scene = new RectangularTubeScene(camera.getAudioListener(), camera);
const renderer = new WebGLRenderer({ antialias: true });

// Set up camera
camera.position.set(0, 2, -12);
camera.lookAt(new Vector3(0, 0, 100));
let camDirection = new Vector3();
camera.getWorldDirection(camDirection);

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = "block"; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = "hidden"; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
/*const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();*/

// start state
startGame(scene);
var last;

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
  //controls.update();
  renderer.render(scene, camera);

  if (scene.state.gamePlay) {
    scene.update && scene.update(timeStamp);

    //camera.translateX(2);
    //camera.position.add(camDirection.clone().multiplyScalar(2));
    //debugger;
    if (scene.state.loseEnd) {
      //scene.dispose();
      if (!scene.state.loseMenuCreated) {
        const loseMenu = new LoseMenu(scene);
        scene.state.gamePlay = false;
      }
    }

    if (scene.state.winRestart) {
      if (!scene.state.winMenuCreated) {
        const winMenu = new WinMenu(scene);
      }
    }
  }
  window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener("resize", windowResizeHandler, false);

// ME - start game by creating and displaying start menu
function startGame(scene) {
  if (scene.state.startBegin) {
    const startMenu = new StartMenu(scene);
  }
}

// Pause Menu in progress
function takingCareOfKeypress(event) {
  if (event.target.tagName === "INPUT") {
    return;
  }

  const keyMap = {
    Escape: null,
  };

  // return if pause key is not pressed
  if (!keyMap.hasOwnProperty(event.key)) {
    return;
  } 

  // if pause key has been pressed, create pause menu
  else {
    if (event.key == "Escape") {
      // un-pause
      if (scene.state.pauseMenuCreated) {
        var pauseButton = this.document.getElementById("pauseButton");
        pauseButton.onclick();
        return;
      }

      // otherwise, create and display pause menu
      new PauseMenu(scene);
      scene.state.pauseMenuCreated = true;
    }
  }
}
window.addEventListener("keydown", takingCareOfKeypress);
