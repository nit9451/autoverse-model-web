import React, { useRef } from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function ModelViewer() {
  const modelUrl =
    "http://res.cloudinary.com/dvrh5nedu/image/upload/v1673459538/h9lkomkpwryshtd56y0g.glb";
  const modelRef = useRef();
  const gltf = useLoader(GLTFLoader, modelUrl);
  return (
    
      <primitive ref={modelRef} object={gltf.scene} />

  );
}

export default ModelViewer;
