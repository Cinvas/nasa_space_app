import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

export default function create_param_box(planetParams, atmosphereParams, atmosphere, bloomPass) {
  const gui = new GUI();

  const param_boxFolder = gui.addFolder('Param_box');
  terrainFolder.add(planetParams.type, 'value', { simplex: 1, fractal: 2, ridgedFractal: 3 }).name('Type');
  terrainFolder.add(planetParams.amplitude, 'value', 0.1, 1.5).name('Amplitude');
  terrainFolder.add(planetParams.sharpness, 'value', 0, 5).name('Sharpness');
  terrainFolder.add(planetParams.offset, 'value', -2, 2).name('Offset');
  terrainFolder.add(planetParams.period, 'value', 0.1, 2).name('Period');
  terrainFolder.add(planetParams.persistence, 'value', 0, 1).name('Persistence');
  terrainFolder.add(planetParams.lacunarity, 'value', 1, 3).name('Lacunarity');
  terrainFolder.add(planetParams.octaves, 'value', 1, 8, 1).name('Octaves');
  terrainFolder.onChange((value) => {
    atmosphere.update();
  });
}; 
