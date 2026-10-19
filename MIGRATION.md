# Replace your vehicle system

This folder is the complete UI-free v1.7.1 delivery. Commit the whole folder to Git, including `assets/`, `CREDITS.md` and the integration examples. It includes all 14 vehicle types and six rigged character files with embedded textures. There are no absolute machine paths or network model dependencies. The assets are small enough for ordinary Git; Git LFS is optional.

## 1. Connect the package

Use your game's existing Three.js installation. The tested versions are:

```sh
npm install three@0.185.1 @dimforge/rapier3d-compat@0.19.3
```

Copy both production JavaScript modules and their declarations into your game's source folder. Copy the entire **contents** of `assets/` to `public/vehicles/`. Keep `catalog.json`, all four base packs, `characters/` and `fonts/` at their relative paths. Serve through your game server; opening JavaScript from a local file URL will not load the models.

Alternatively, add this folder as a local package dependency and import `@lokam/vehicles` and `@lokam/vehicles/physics`. The assets still need a public URL. Rapier is optional if your game already supplies physics.

## 2. Replace spawning and updating

```js
import {createVehicleLibrary} from './vehicles/lokam-vehicles.js';
import {createVehiclePhysicsWorld} from './vehicles/lokam-physics.js';

const library = await createVehicleLibrary({
  assetBaseUrl: `${import.meta.env.BASE_URL}vehicles/`,
  textureLimit: 1024, // 512 for lower decoded texture memory
});
const physics = await createVehiclePhysicsWorld({
  ground: false, // add your game's terrain/colliders to physics.world
  feel: 'playful',
});
const vehicle = await library.create('auto', {
  variant: 'kerala',
  plate: {text: 'AZ-2026', style: 'yellow'},
  occupants: {count: 'all', standing: 0, visible: true},
});
scene.add(vehicle.object);
const controller = physics.add(vehicle);

// In your existing input adapter (keyboard, touch, gamepad or AI):
vehicle.setInput({throttle: 1, steering: 0, brake: 0});

// Once per frame in your existing game loop. Seconds, not milliseconds.
physics.update(deltaSeconds);
// physics.update already calls vehicle.update; do not call both.
```

Use one physics world for interacting vehicles. Roots use meters, +Y up and +Z forward, under an untransformed parent at scale 1. Add terrain and obstacles before driving. `physics.addBox()` is useful for simple fixed colliders; `physics.world` exposes Rapier for your terrain integration. Set `ground:true` only when you want the provided flat test ground collider.

The main module also has lightweight flat-ground driving: call `vehicle.update(dt)` directly when no physics controller owns it. If you retain your own simulation, update the root transform and call `setTelemetry()` plus `vehicle.update(dt)`; create with `bodyMotion:false` if your simulation already supplies suspension movement.

## 3. Keep game customization

```js
vehicle.setPaint({primary:'#216d83', secondary:'#e3decf', style:'twoTone'});
vehicle.setPlate('AZ-2050');
vehicle.setLights({head:'low', turn:'left'});
await vehicle.setOccupants({count:1, standing:0});
const saved = vehicle.getConfig(); // serialize this object in your save system
const restored = await library.create(saved.id, saved);
```

Counts include the driver. `getCrowdCapacity()` gives each vehicle's fitted limits. Only the bus accepts standing crowds, up to 12. Its two variants are `ksrtc-blue` and `ksrtc-red`; use `setNameBoard()` for the digital destination display. Auto variants are `kerala` and `delhi`. Use `offroad` with variant `police` for the bilingual police jeep. See `README.md` and `index.d.ts` for all options, and `physics-example.js` for a game-loop adapter.

## 4. Remove the old adapter after testing

Disable your old spawn, input and vehicle-update handlers when activating these replacements, so two systems cannot move the same vehicle. Your game continues to own its camera, renderer, menus, audio, terrain and save system. No viewer UI is included in this folder. Keep the original integration available until you have checked your maps and collision layout.

On despawn call `controller.dispose()` and `vehicle.dispose()`. On scene shutdown call `physics.dispose()` then `await library.dispose()`. Share one library across the scene to reuse geometry and textures. Reduce crowds and projected lights for distant traffic, and use your game's distance culling/LOD strategy.

The browser playground is a separate workspace preview at `/previews/playground.html`; it is not required or shipped as part of this module.

