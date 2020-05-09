/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectangularTubeScene } from 'scenes';

// YS - May 6 edit
import { CamListener } from 'camListener';

// ME - May 8 edit
import { StartMenu } from 'menus';

// ME May 9 edit
// overlays lose menu over game screen *need to connect to lose conditions*
import { LoseMenu } from 'menus';

// Initialize core ThreeJS components
const camera = new CamListener();
const scene = new RectangularTubeScene(camera.getAudioListener());
//const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

// Set up camera
camera.position.set(0, 2, -10);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

const startMenu = new StartMenu(); // ME - May 8 edit


// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
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
window.addEventListener('resize', windowResizeHandler, false);

// Handle keypress events
function handleKeypressEvents(event) {
	if (event.target.tagName === "INPUT") { return; }

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
	}

	const scale = .25; // the magnitude of the movement produced by this keypress

// Check which key was pressed. If it wasn't a triggering key, do nothing.
  if (!keyMap.hasOwnProperty(event.key)) { return; }
else {
  let offset = keyMap[event.key];
  let index = scene.children.findIndex(obj => obj.name === "headphones");
  scene.children[index].position.add(offset.multiplyScalar(scale));
  scene.children[index].checkTubeCollisions();
}
}
    window.addEventListener("keydown", handleKeypressEvents);
