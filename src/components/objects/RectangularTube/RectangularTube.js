import { Group, TubeGeometry, LineCurve3, Vector3, MeshNormalMaterial, Mesh, DoubleSide } from 'three';

class RectangularTube extends Group {
    constructor(parent, depth) {
        // Call parent Group() constructor
        super();

        this.name = 'rectangular tube';

        var v1 = new Vector3(0, 0, -100);
        var v2 = new Vector3(0, 0, 50);
        var path = new LineCurve3 (v1, v2);
        var geometry = new TubeGeometry(
                            path,              // Curve
                            5,              // tubular segments
                            5,              // radius
                            4,             // radial segments
                            false           // closed
                            );
        var material = new MeshNormalMaterial( {color:0xffff00});
        material.side = DoubleSide;
        var tube = new Mesh(geometry, material);
        tube.position.set(0, 1, depth);
        tube.rotation.set(0, 0, Math.PI * .25);
        this.add(tube);

        this.state = {
          length: 120,
					position: this.position,
					speed: parent.state.currentSpeed,
				};

        // YS May 9
        parent.addToUpdateList(this);
    }

    update() {
      this.position.z -= this.state.speed;
      if (this.position.z < 0) this.position.z += 50;
    }
}

export default RectangularTube;
