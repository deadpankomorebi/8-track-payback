import { Group } from 'three';
import { BoxBufferGeometry, MeshBasicMaterial, Mesh } from 'three';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
//import MODEL from './flower.gltf';

class Obstacle extends Group {
  constructor(parent) {
    // Call parent Group() constructor
    super();

    // Init state
    this.state = {
      gui: parent.state.gui,
      //bob: true,
      //spin: this.spin.bind(this),
      //twirl: 0,
      //music: music,
      frequency: 0,
      boundingBox: null,
      geometry: null,
      material: null,
      cube: null,
    };

    // Load object
    /*const loader = new GLTFLoader();

    this.name = 'flower';
    loader.load(MODEL, (gltf) => {
    this.add(gltf.scene);
  });*/
  // Create a box
  var geometry = new BoxBufferGeometry( 5, 1, 5 );
  this.state.geometry = geometry;
  //debugger;
  var material = new MeshBasicMaterial( {color: 0x0d9880} );
  this.state.material = material;
  var cube = new Mesh( geometry, material );
  this.state.cube = cube;
  //this.add( cube );

  geometry.computeBoundingBox();
  //let box = geometry.boundingBox;
  //debugger;
  this.state.boundingBox = geometry.boundingBox;
  //debugger;
  this.add(this.state.cube);


  // create an AudioAnalyser, passing in the sound and desired fftSize
  /*var analyser = new AudioAnalyser(this.music, 32 );

  // get the average frequency of the sound
  var data = analyser.getAverageFrequency();
  //this.add(audioLoader);
  this.state.frequency = data;*/

  // Add self to parent's update list
  parent.addToUpdateList(this);

  // Populate GUI
  //this.state.gui.add(this.state, 'bob');
  //this.state.gui.add(this.state, 'spin');
  //debugger;
}

/*spin() {
// Add a simple twirl
this.state.twirl += 6 * Math.PI;

// Use timing library for more precice "bounce" animation
// TweenJS guide: http://learningthreejs.com/blog/2011/08/17/tweenjs-for-smooth-animation/
// Possible easings: http://sole.github.io/tween.js/examples/03_graphs.html
const jumpUp = new TWEEN.Tween(this.position)
.to({ y: this.position.y + 1 }, 300)
.easing(TWEEN.Easing.Quadratic.Out);
const fallDown = new TWEEN.Tween(this.position)
.to({ y: 0 }, 300)
.easing(TWEEN.Easing.Quadratic.In);

// Fall down after jumping up
jumpUp.onComplete(() => fallDown.start());

// Start animation
jumpUp.start();
}*/

update(timeStamp, freqData) {
  /*if (this.state.bob) {
  // Bob back and forth
  this.rotation.z = 0.05 * Math.sin(timeStamp / 300);
}
if (this.state.twirl > 0) {
// Lazy implementation of twirl
this.state.twirl -= Math.PI / 8;
this.rotation.y += Math.PI / 8;
}*/
//this.scale.y = this.state.frequency / 128;
//let test = this.state.boundingBox;
//debugger;
//this.state.geometry.dispose();
this.state.cube.geometry.dispose();
this.state.cube.material.dispose();
this.remove(this.state.cube);
let geometry = new BoxBufferGeometry( 5, freqData / 20, 5 );
//this.state.geometry = geometry;
this.state.cube = new Mesh( geometry, this.state.material );
//this.state.boundingBox.max.y = freqData;
this.add(this.state.cube);

// Advance tween animations, if any exist
TWEEN.update();
}
}

export default Obstacle;
