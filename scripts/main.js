import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import createUI from './ui';
import create_param_box from './param_box'; // CREATING NEW PARAM BOX
import { Atmosphere } from './atmosphere';
import { randFloat } from 'three/src/math/MathUtils.js';

window.onload = () => loadScene();

if(planetNr == 1)
{
	var planetParams = {
		type: { value: 2 },
		radius: { value: 20.0 },
		amplitude: { value: 0.9786 },
		sharpness: { value: 0.74 },
		offset: { value: -0.132 },
		period: { value: 0.8949 },
		persistence: { value: 0.443 },
		lacunarity: { value: 2.106 },
		octaves: { value: 7 },
		undulation: { value: 0.0 },
		ambientIntensity: { value: 0 },
		diffuseIntensity: { value: 1.105 },
		specularIntensity: { value: 2 },
		shininess: { value: 21.1 },
		lightDirection: { value: new THREE.Vector3(1, 1, 1) },
		lightColor: { value: new THREE.Color(0xffffff) },
		bumpStrength: { value: 1.0 },
		bumpOffset: { value: 0.0001 },
		color1: { value: new THREE.Color(0.8, 0.643, 0.435) },
		color2: { value: new THREE.Color(0.53, 0.435, 0.294) },
		color3: { value: new THREE.Color(0.33, 0.27, 0.1843) },
		color4: { value: new THREE.Color(0.384, 0.313, 0.2156) },
		color5: { value: new THREE.Color(0.262, 0.21, 0.146) },
		transition2: { value: 0.3 },
		transition3: { value: 0.215 },
		transition4: { value: 0.372 },
		transition5: { value: 1.2 },
		blend12: { value: 0.366 },
		blend23: { value: 0.152 },
		blend34: { value: 0.104 },
		blend45: { value: 0.168 }
	  }
	  
	  var atmosphereParams = {
		particles: { value: 30742 },
		minParticleSize: { value: 48.4 },
		maxParticleSize: { value: 105.8 },
		radius: { value: planetParams.radius.value + 1 },
		thickness: { value: 0.7056 },
		density: { value: 0.016 },
		opacity: { value: 0.381 },
		scale: { value: 20.967 },
		color: { value: new THREE.Color(0xffffff) },
		speed: { value: 0.0603 },
		lightDirection: planetParams.lightDirection
	  };
}
else if(planetNr == 2)
{
	var planetParams = {
		type: { value: 2 },
		radius: { value: 20.0 },
		amplitude: { value: 0.966 },
		sharpness: { value: 3.155 },
		offset: { value: 0.084 },
		period: { value: 0.3876 },
		persistence: { value: 0.533 },
		lacunarity: { value: 1.844 },
		octaves: { value: 8 },
		undulation: { value: 0.0 },
		ambientIntensity: { value: 0 },
		diffuseIntensity: { value: 0.635 },
		specularIntensity: { value: 0.39 },
		shininess: { value: 25 },
		lightDirection: { value: new THREE.Vector3(1, 1, 1) },
		lightColor: { value: new THREE.Color(0xffffff) },
		bumpStrength: { value: 0.754 },
		bumpOffset: { value: 0.0001 },
		color1: { value: new THREE.Color(0.9, 0.9, 0.314) },
		color2: { value: new THREE.Color(0.58, 0.51, 0.412) },
		color3: { value: new THREE.Color(0.58, 0.482, 0.216) },
		color4: { value: new THREE.Color(0.678, 0.538, 0.244) },
		color5: { value: new THREE.Color(0.51, 0.51, 0.496) },
		transition2: { value: 1.656 },
		transition3: { value: 0.215 },
		transition4: { value: 0.372 },
		transition5: { value: 1.2 },
		blend12: { value: 0.58 },
		blend23: { value: 0.152 },
		blend34: { value: 0.104 },
		blend45: { value: 0.168 }
	  }
	  
	  var atmosphereParams = {
		particles: { value: 16811 },
		minParticleSize: { value: 23 },
		maxParticleSize: { value: 138.6 },
		radius: { value: planetParams.radius.value + 1 },
		thickness: { value: 0.1 },
		density: { value: -0.46 },
		opacity: { value: 0.238 },
		scale: { value: 18.241 },
		color: { value: new THREE.Color(0xffffff) },
		speed: { value: 0.0004 },
		lightDirection: planetParams.lightDirection
	  };
}



function loadScene() {
  console.log('loading scene');

  const stats = new Stats()
  document.body.appendChild(stats.dom)

  const clock = new THREE.Clock(true);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  // https://opengameart.org/content/night-sky-skybox-generator
  scene.background = new THREE.CubeTextureLoader()
    .load( [
          'xpos.png',
          'xneg.png',
          'ypos.png',
          'yneg.png',
          'zpos.png',
          'zneg.png'
        ] );
        
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.maxDistance = 200;
  controls.minDistance = 30;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.5;
  camera.position.z = 50;

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);

  composer.addPass(renderPass);
 
  const bloomPass = new UnrealBloomPass();
  bloomPass.threshold = 0;
  bloomPass.strength = 0.2;
  bloomPass.radius = 0.5;
  composer.addPass(bloomPass);

  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  const noiseFunctions = document.getElementById('noise-functions').innerHTML;
  const vertexShader = document.getElementById('planet-vert-shader').innerHTML;
  const fragmentShader = document.getElementById('planet-frag-shader').innerHTML;

  const material = new THREE.ShaderMaterial({
    uniforms: planetParams,
    vertexShader: vertexShader.replace(
      'void main() {',
      `${noiseFunctions}
       void main() {`
    ),
    fragmentShader: fragmentShader.replace(
      'void main() {',
      `${noiseFunctions}
       void main() {`
    ),
  });

  const planet = new THREE.Mesh(new THREE.SphereGeometry(1, 128, 128), material);
  planet.geometry.computeTangents();
  scene.add(planet);

  const atmosphere = new Atmosphere(atmosphereParams);
  planet.add(atmosphere);

  function animate()
  {
		requestAnimationFrame(animate);
	
		// Get the distance from the camera to the planet
		const cameraDistance = camera.position.distanceTo(planet.position);
	
		// Adjust the atmosphere's scale based on the camera distance
		if(zoom == 0)
		{
			controls.enableZoom = false;
			controls.enableRotate = false;
			controls.autoRotate = false;
			atmosphere.visible = false;
			planet.scale.set(0.01, 0.01, 0.01);
			planetParams.diffuseIntensity.value = randFloat(2,10);
			planetParams.amplitude.value = 0;
			planetParams.sharpness.value = 0;
			renderer.setPixelRatio(0.3);
		}
		else if(zoom == 1)
		{
			controls.enableZoom = false;
			controls.enableRotate = true;
			controls.autoRotate = true;
			atmosphere.visible = false;
			planet.scale.set(0.05, 0.05, 0.05);
			planetParams.amplitude.value = 0.8;
			renderer.setPixelRatio(0.5);
		}
		else if(zoom == 2)
		{
			const atmosphereScaleFactor = 50/cameraDistance; // Adjust this factor based on how you want the scaling to behave
			if(cameraDistance > 100)
				atmosphere.scale.set(0, 0, 0)
			else if(cameraDistance > 50 && cameraDistance < 100)
				atmosphere.scale.set(Math.sqrt(atmosphereScaleFactor), Math.sqrt(atmosphereScaleFactor),Math.sqrt(atmosphereScaleFactor))
			else
				atmosphere.scale.set(1, 1, 1)
		
			atmosphere.material.uniforms.time.value = clock.getElapsedTime();
			atmosphere.rotation.y += 0.0002;
		
		}
		
	
		controls.update();
		composer.render();
		stats.update();
  }

  // Events
  window.addEventListener('resize', () => {
    // Resize camera aspect ratio and renderer size to the new window size
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  createUI(planetParams, atmosphereParams, atmosphere, bloomPass);
  //create_param_box(planetParams, atmosphereParams, atmosphere, bloomPass);
  animate();

  console.log('done');
}
