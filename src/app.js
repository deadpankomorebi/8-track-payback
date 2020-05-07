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
import { SeedScene } from 'scenes';
// YS - May 6 edit
import { Audio, AudioListener, AudioLoader, AudioAnalyser } from 'three';
import MUSIC from './You Gotta Be.mp3';
//import { Music } from 'music';
import { CamListener } from 'camListener';

// Initialize core ThreeJS components
//const scene = new SeedScene();
//const camera = new PerspectiveCamera(camera.getAudioListener());
const camera = new CamListener();
const scene = new SeedScene(camera.getAudioListener());
// const scene = new MusicScene(camera.get);
const renderer = new WebGLRenderer({ antialias: true });

// Set up camera
camera.position.set(6, 3, -10);
camera.lookAt(new Vector3(0, 0, 0));

// YS - May 6 edit: global audio!
// create an AudioListener and add it to the camera
/*var listener = new AudioListener();
camera.add( listener );*/

// create a global audio source
/*var sound = new Audio(camera.getAudioListener());

// load a sound and set it as the Audio object's buffer
var audioLoader = new AudioLoader();
audioLoader.load( MUSIC, function( buffer ) {
sound.setBuffer( buffer );
sound.setLoop( true );
sound.setVolume( 0.5 );
// uncomment this line to play automatically
//sound.play();
});

// create an AudioAnalyser, passing in the sound and desired fftSize
var analyser = new AudioAnalyser( sound, 32 );

// get the average frequency of the sound
var data = analyser.getFrequencyData();*/

// made boxes that correspond to

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

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
