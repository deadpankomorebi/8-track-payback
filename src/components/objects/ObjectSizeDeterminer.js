const box = new Box3().setFromObject(gltf.scene);
const boxSize = box.getSize(new Vector3()).length();
const boxCenter = box.getCenter(new Vector3());
console.log(boxSize);
console.log(boxCenter);
