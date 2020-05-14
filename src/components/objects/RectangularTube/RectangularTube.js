import {
  Group,
  TubeGeometry,
  LineCurve3,
  Vector3,
  MeshNormalMaterial,
  Mesh,
  DoubleSide,
} from "three";

class RectangularTube extends Group {
  constructor(parent, depth) {
    // Call parent Group() constructor
    super();

    this.name = "rectangular tube";

    // set path for tube to follow
    var v1 = new Vector3(0, 0, -10);
    var v2 = new Vector3(0, 0, 80);
    var path = new LineCurve3(v1, v2);


    var geometry = new TubeGeometry(
      path, // Curve
      5, // tubular segments
      5, // radius
      4, // radial segments
      false // closed
    );

    // set material properties of tube
    var material = new MeshNormalMaterial();
    material.side = DoubleSide;

    // create tube and set position and orientation
    var tube = new Mesh(geometry, material);
    tube.position.set(0, 1, depth);
    tube.rotation.set(0, 0, Math.PI * 0.25);
    this.add(tube);

    // set state of tube
    this.state = {
      length: 120,
      position: this.position,
      speed: parent.state.currentSpeed,
    };
  }

  update() {

  }
}

export default RectangularTube;
