import {
    Scene,
    Color,
    PerspectiveCamera,
    WebGLRenderer,
    DirectionalLight,
    HemisphereLight,
    Vector3,
    Clock
  } from "three";
  import OrbitControls from "three-orbitcontrols";
  import OBJLoader from "three-obj-loader-es6-module";
  import JLTFLoader from "three-gltf-loader";
  
  let container;
  let camera;
  let renderer;
  let scene;
  
  const mixers = [];
  const clock = new Clock();
  
  function init() {
    container = document.querySelector("#scene-container");
  
    // Creating the scene
    scene = new Scene();
    scene.background = new Color("skyblue");
  
    createCamera();
    createLights();
    loadModels();
    createControls();
    createRenderer();
  
    renderer.setAnimationLoop(() => {
      update();
      render();
    });
  }
  
  function createCamera() {
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1000;
    camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-1.5, 1.5, 10);
  }
  
  function createLights() {
    const mainLight = new DirectionalLight(0xffffff, 1);
    mainLight.position.set(10, 10, 10);
  
    const hemisphereLight = new HemisphereLight(0xddeeff, 0x202020, 1);
    scene.add(mainLight, hemisphereLight);
  }
  
  function loadModels() {
    const loader = new OBJLoader();
  
    const onLoad = (result, position) => {
      scene.add(result);
    };
  
    const sofaPosition = new Vector3(0, 0, 2.5);
    loader.load("http://res.cloudinary.com/dvrh5nedu/image/upload/v1673459538/h9lkomkpwryshtd56y0g.glb", obj => onLoad(obj, sofaPosition));
  }
  
  function createRenderer() {
    renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.physicallyCorrectLights = true;
  
    container.appendChild(renderer.domElement);
  }
  
  function createControls() {
    new OrbitControls(camera, container);
  }
  
  function update() {
    const delta = clock.getDelta();
    mixers.forEach(mixer => mixer.update(delta));
  }
  
  function render() {
    renderer.render(scene, camera);
  }
  
  init();
  
  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
  
    // Update camera frustum
    camera.updateProjectionMatrix();
  
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  window.addEventListener("resize", onWindowResize, false);
  