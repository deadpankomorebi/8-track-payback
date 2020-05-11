import { Group } from 'three';
import { BoxBufferGeometry, MeshPhongMaterial, Mesh, Vector3, Box3 } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

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
      parent: parent,
      speed: parent.state.currentSpeed,
    };

    // Create a box
    var geometry = new BoxBufferGeometry( 1, 1, 1 );
    geometry.computeBoundingBox();
    //console.log(geometry);

// YS May 10
    let baseGeometry = geometry;
    let bigGeometry = new BoxBufferGeometry( 256 / 30, 1, 1 );
    let attribute = bigGeometry.getAttribute('position');
    let name = 'target';
    attribute.name = name;
    baseGeometry.morphAttributes.position = [];
    baseGeometry.morphAttributes.position.push(attribute);
    //baseGeometry.morphAttributes.name = 'targets'; // why?
    //debugger;

    this.state.geometry = geometry;

    // YS May 10
    var material = new MeshPhongMaterial( {
      color: 0x0d9880,
      morphTargets: true,
    } );

    this.state.material = material;
    //var cube = new Mesh( geometry, material );
    //debugger;
    var cube = new Mesh( baseGeometry, material );
    cube.position.set(position.x, position.y, position.z);
    //debugger;
    this.state.cube = cube;

    this.add(this.state.cube);

    // Add self to parent's update list
    parent.addToUpdateList(this);

    // Populate GUI
    //this.state.gui.add(this.state, 'bob');
    //this.state.gui.add(this.state, 'spin');
    //console.log(this.state.cube.position);
  }

// YS May 9: Test if the player hit the bounding box of the obstacle
  checkCollision(player, freqData) {
    //console.log(freqData);
    //debugger;
    if (this.state.cube.position.y + 0.5 < player.position.y) return false;
    if (this.state.cube.position.y - 0.5 > player.position.y) return false;
    if (this.state.cube.position.z + 0.5 < player.position.z) return false;
    if (this.state.cube.position.z - 0.5 > player.position.z) return false;
    //debugger;
    //console.log(freqData);
    let end;
    if (this.state.cube.position.x < 0) {
      end = freqData / 60 + this.state.cube.position.x;
      //if (freqData > 100) debugger;
      if (end > player.position.x - 0.35) {console.log(end);console.log(player.position.x);
        return true;}
    } else {
      end = - freqData / 60 + this.state.cube.position.x;
      //if (freqData > 100) debugger;
      if (end < player.position.x + 0.35) {console.log(end);console.log(player.position.x);
        return true;}
    }
    return false;
    //let length = freqData / 60
    /*this.state.geometry.computeBoundingBox();
    let box = this.state.geometry.boundingBox;
    //debugger;
    box.min.add(this.state.cube.position);
    box.max.add(this.state.cube.position);
    //box.min.x += this.state.cube.position.x;
    //box.max.x += this.state.cube.position.x;
    //debugger;
    //let box = new Box3(this.state.geometry.boundingBox.min.add(this.state.position),
                       //this.state.geometry.boundingBox.max.add(this.state.position));
    if (box.containsPoint(player.position)) {//debugger;
    return true;}
    else return false;*/
  }

  translate(distance) {
    //let z = new Vector3(0, 0, 1);
    //debugger;
    this.state.geometry.translateZ(distance);
    //this.state.cube.position.set(this.state.position);
  }

  update(timeStamp, freqData, player) {
    // YS May 10: instead of creating new meshes,
    // use morphTargets
    let target = {};
    target[0] = freqData / 256;
    const durationInMs = 100;
    new TWEEN.Tween(this.state.cube.morphTargetInfluences)
      .to(target, durationInMs)
      .start();
    this.state.geometry.computeBoundingBox();

    // Advance tween animations, if any exist
    TWEEN.update();
    // Check if avatar collide into the obstacle
    if(this.checkCollision(player, freqData))
    this.state.parent.state.loseEnd = true;

    this.state.cube.position.z -= this.state.speed;
    //this.state.position.z = this.position.z;
    if (this.state.cube.position.z < player.position.z) this.state.cube.position.z = this.state.position.z;
  }
}

export default Obstacle;
