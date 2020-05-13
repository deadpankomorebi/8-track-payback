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
      position: position, // the original position
      parent: parent,
      speed: parent.state.currentSpeed,
      frequencyNum: 256,
      scaleFactor: 33,
    };

    // Create a box
    var geometry = new BoxBufferGeometry( 1, 1.5, 1 );
    geometry.computeBoundingBox();

    let baseGeometry = geometry;
    let bigGeometry = new BoxBufferGeometry( this.state.frequencyNum / this.state.scaleFactor, 1.5, 1 );
    let attribute = bigGeometry.getAttribute('position');
    let name = 'target';
    attribute.name = name;
    baseGeometry.morphAttributes.position = [];
    baseGeometry.morphAttributes.position.push(attribute);

    this.state.geometry = geometry;

    var material = new MeshPhongMaterial( {
      color: 0x0d9880,
      morphTargets: true,
    } );

    this.state.material = material;

    var cube = new Mesh( baseGeometry, material );
    cube.position.set(position.x, position.y, position.z);
    this.state.cube = cube;

    this.add(this.state.cube);

    // Add self to parent's update list
    parent.addToUpdateList(this);
  }

  // Test if the player hit the bounding box of the obstacle
  checkCollision(player, freqData) {
    // do nothing if the obstacle's y and z positions cannot intersect with the player
    if (this.state.cube.position.y + 0.5 < player.position.y - 0.5) return false;
    if (this.state.cube.position.y - 0.5 > player.position.y + 0.5) return false;
    if (this.state.cube.position.z + 0.5 < player.position.z) return false;
    if (this.state.cube.position.z - 0.5 > player.position.z) return false;

    // Chek if the width of the obstacle (depending on freqData) intersects with
    // the player
    let end;
    if (this.state.cube.position.x < 0) { // obstacles on the right side
      end = freqData / (this.state.scaleFactor * 2) + this.state.cube.position.x;
      if (end > player.position.x - 0.35) {
        this.state.cube.position.z = this.state.position.z;
        return true;
      }
    } else { // obstacles on the left side
      end = - freqData / (this.state.scaleFactor * 2) + this.state.cube.position.x;
      if (end < player.position.x + 0.35) {
        this.state.cube.position.z = this.state.position.z;
        return true;
      }
    }
    return false;

        // collision detection using bounding boxes, did not work out
        //this.state.geometry.computeBoundingBox();
        //let box = this.state.geometry.boundingBox;
        /*box.min.add(this.state.cube.position);
        //box.max.add(this.state.cube.position);
        //box.min.x += this.state.cube.position.x;
        //box.max.x += this.state.cube.position.x;
        //let box = new Box3(this.state.geometry.boundingBox.min.add(this.state.position),
        //this.state.geometry.boundingBox.max.add(this.state.position));
        if (box.containsPoint(player.position)) {
        return true;}
        else return false;*/
  }

  update(timeStamp, freqData, player) {
    // instead of creating new meshes, use morphTargets
    let target = {};
    target[0] = freqData / this.state.frequencyNum;
    const durationInMs = 100;
    new TWEEN.Tween(this.state.cube.morphTargetInfluences)
    .to(target, durationInMs)
    .start();
    this.state.geometry.computeBoundingBox();

    // Advance tween animations, if any exist
    TWEEN.update();
    // Check if avatar collide into the obstacle, if so change the flag in parent scene
    if(this.checkCollision(player, freqData)) {
      this.state.parent.state.obstacleCollision = true;
    }

    // Move the obstacle toward the player
    this.state.cube.position.z -= this.state.speed;
    // When the obstacle gets too close to the screen,
    // return it to the original position
    if (this.state.cube.position.z < player.position.z - 4)
      this.state.cube.position.z = this.state.position.z;
  }
}

export default Obstacle;
