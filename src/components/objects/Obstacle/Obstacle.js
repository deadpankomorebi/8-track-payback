import { Group } from 'three';
import { BoxBufferGeometry, MeshPhongMaterial, Mesh, Vector3 } from 'three';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
//import MODEL from './flower.gltf';

class Obstacle extends Group {
  constructor(parent, position) {
    // Call parent Group() constructor
    super();

    // Init state
    this.state = {
      gui: parent.state.gui,
      geometry: null,
      material: null,
      cube: null,
      position: position,
    };

    // Create a box
    var geometry = new BoxBufferGeometry( 1, 1, 1 );
    this.state.geometry = geometry;
    var material = new MeshPhongMaterial( {color: 0x0d9880} );
    this.state.material = material;
    var cube = new Mesh( geometry, material );
    cube.position.set(position.x, position.y, position.z);
    //debugger;
    this.state.cube = cube;

    //this.state.position = position;

    this.add(this.state.cube);

    // Add self to parent's update list
    parent.addToUpdateList(this);

    // Populate GUI
    //this.state.gui.add(this.state, 'bob');
    //this.state.gui.add(this.state, 'spin');
    //debugger;
  }

  setPosition(position) {
    this.state.cube.position.set(position);
    this.state.position = position;
  }

  update(timeStamp, freqData) {
    // dispose of old mesh
    this.state.cube.geometry.dispose();
    this.state.cube.material.dispose();
    this.remove(this.state.cube);

    // create new mesh
    let geometry = new BoxBufferGeometry( freqData / 25, 1, 1 );
    this.state.geometry = geometry;
    let cube = new Mesh( geometry, this.state.material);
    let position = this.state.position;
    //debugger;
    //cube.position.set(position);
    //debugger;
    this.state.cube = cube;
    //debugger;
    /*let position = this.state.position;
    this.state.cube.position.set(position);*/
    //this.state.cube.position.set(new Vector3(0,2,0));
    this.add(this.state.cube);
    this.state.cube.position.set(position.x, position.y, position.z);
//debugger;
    // Advance tween animations, if any exist
    TWEEN.update();
  }
}

export default Obstacle;
