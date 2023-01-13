
  import * as THREE from 'three';
  import GLTFLoader from 'three-gltf-loader';
  import DRACOLoader from 'three/examples/jsm/loaders/DRACOLoader.js';
  
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('path/to/draco_decoder.wasm');
  
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);
  
  gltfLoader.load(
    'path/to/model.glb',
    (gltf) => {
      scene.add(gltf.scene);
      renderer.render(scene, camera);
    },
    undefined,
    (error) => {
      console.error(error);
    },
  );