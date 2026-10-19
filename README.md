# Lokam Vehicles — final Three.js module

**v1.8.3:** Repaired KSRTC self-shadow patches with shadows retained, continuous front glazing and a fitted seal, a driver window confined to its sill with a flush painted lower panel, matching silver wheel faces, and fleet handle/side-guard protection. Metallic finish is the default for every vehicle and variant. Correct initial body/paint visibility, repaired auto mirrors, removed lower auto stripe, a flat pickup load deck with three cartons, and police emblems removed. Includes bevelled metal plates, body-mounted wiper pivots and subtle exhaust smoke. Fictional brand badges and their controls have been removed. Checker and diagonal paint effects have also been removed. The final package remains UI-free; the playground is outside this folder.

One reusable JavaScript vehicle factory, **14 vehicle types**, Mixamo-rigged drivers and adjustable passenger crowds, procedural colors and patterns, editable number plates, working lights and vehicle-specific driving. No viewer, menus, color picker, HUD, image wraps, studio ground, camera, rendering loop or automatic keyboard listeners are included.

The auto has exactly **Kerala** and **Delhi** variants. The Indian bus has exactly **blue/cream** and **red/cream** variants, with a rounded **digital ASRTC destination display**. The existing variant IDs `ksrtc-blue` and `ksrtc-red` remain compatible. Other vehicles retain their original paint colors until you change them. The whole fleet uses calibrated, less reflective base materials.

Windows use dark, partially transparent glazing at 76% opacity. A clear, low-glare viewing area over the bus LED display keeps its amber English and Malayalam lettering readable. The auto's outer side panels retain the exterior paint and continuous upper belt stripe; the lower sill stripe is removed, while inward cabin faces and fittings remain black. Bus side rails connect to the front window posts and return into the lower wall at the rear; the overhead aisle rail ends at its supporting poles.

Two-tone paint keeps the primary color on the roof, pillars and upper body, with the secondary color ending 10 cm below the lowest window edge. Exterior mirror housings and roof rails retain their original finish; the sport car uses neutral black housings and stalks with every paint setting. The bonnet paint mask also covers residual texture marks at the windshield base. Door handles and side protection strips retain a neutral dark finish under every paint style, including the minivan’s previously red inserts. These masks use the existing body draw rather than adding per-handle meshes. Bus body normals and shadow casting are repaired on cached derived geometry; source GLBs remain unchanged. The driver’s glass and frame stop at the sliding-window sill, with an opaque flush body panel below. The front pane has continuous corner glazing and a fitted rubber seal; cached wiper paths follow the repaired pane. Duplicate static wheel covers are removed, and four matching merged silver wheel faces follow the wheel rigs while the rear dual tyres remain.

## Cabin and exterior refinement (v1.8)

Cars and trucks have vehicle-specific dashboard positions measured from their windshields and steering controls. The fitted cabins include enclosed footwells, contoured seats with floor rails, individual door cards, handles, pockets, speakers, glove compartments, vents, gauges, radio and climate controls. The dashboard stays near the windshield base rather than extending across passengers. The auto, police jeep and bus retain their tailored layouts.

Old seats and duplicate controls are removed as connected parts when replaced. Remaining cabin caps are trimmed against each tapered cabin volume while exterior surface segments are preserved. This clears the triangular flaps at passengers' shoulders and across the rear glass. The unsupported upright rods beside the windows have been removed, along with the added auto side rails and dangling supports. Rear hatch lining, floors and parcel decks follow the body taper. Exterior mirror housings and door handles are preserved whole. Bus aisle supports terminate at the ceiling, and its inner walls stay within the asymmetric body shell.

Overhead cabin additions have been simplified: added headliner panels, sun visors, roof grab handles, ceiling trim and small ceiling lights are removed. Fitted car/truck rear-view mirrors remain under the original roof shell.

Supplemental lamps are fitted to actual body surfaces, including their slopes. The hatchback uses its existing rear indicator and reverse lenses, eliminating the extra boxes. Registration plates use fitted backing gaskets, a bevelled aluminium face, embossed-text relief and four recessed steel fasteners. The backings follow their mounting panels while the plate faces stay upright. Plate text, lighting controls and per-vehicle customization remain available.

Interior geometry is merged by material and shared between instances of the same vehicle type. A typical fitted car interior adds approximately 16–20k triangles and 13 draws, including two shared 256 × 128 instrument textures. The source GLB packs and six character assets are retained. For distant traffic, create vehicles with `interior: false, occupants: 0`; for nearby traffic, lower occupant counts and texture limits. See `validation.json` and `asset-report.json` for the measured checks and asset sizes.

Driver grips solve palm contact and wrist direction together. Forearm roll follows the hand, and hands regrip around a limited comfortable arc while the wheel continues turning. Passengers rest their hands on reachable parts of their own thighs; targets adapt to each character's arm length. Lap targets stay in the passenger's local space as the vehicle moves. Small head and chest movements run through the normal vehicle update, with staggered passenger updates to keep crowd cost bounded.

## Add it to your Three.js game

Use the same `three` installation throughout the game. Tested with **Three.js 0.185.1** and WebGL2 in Microsoft Edge. This package imports Three.js and its GLTFLoader/MeshoptDecoder addons from your installation; it contains no second copy of Three.js and uses no CDN.

For a Vite game:

1. Copy `lokam-vehicles.js` and `index.d.ts` into your game's source, for example `src/vehicles/`.
2. Copy the **contents of `assets/`** into your game's `public/vehicles/` directory. Keep the four vehicle GLBs, `catalog.json`, **`characters/`**, and **`fonts/`** together.
3. Import the module and pass the public asset URL explicitly:

```js
import { createVehicleLibrary, bindKeyboard } from './vehicles/lokam-vehicles.js';

const library = await createVehicleLibrary({
  assetBaseUrl: `${import.meta.env.BASE_URL}vehicles/`,
});

const auto = await library.create('auto', {
  variant: 'kerala', // 'kerala' or 'delhi'
  plate: 'AZ-2026',
  position: [0, 0, 0],
});
scene.add(auto.object); // your existing scene

const bus = await library.create('indian-bus', {
  variant: 'ksrtc-red', // 'ksrtc-red' or 'ksrtc-blue'
  plate: { text: 'AZ-2027', style: 'yellow' },
  nameBoard: { operator: 'ASRTC', destination: 'മലപ്പുറം', via: 'MALAPPURAM', routeNumber: '10' },
  position: [5, 0, 0],
});
scene.add(bus.object);

// Call once per frame, in your EXISTING game loop. dt is in seconds.
function updateVehicles(dt) {
  auto.update(dt);
  bus.update(dt);
}
```

Run through your game server, rather than opening files with `file://`. `assetBaseUrl` is a browser URL, not a Windows disk path. For a game served under `/lokam/`, the URL should include that prefix. Set cache headers on the static GLBs for repeat visits. The default URL works when the module is served directly beside its `assets/` directory; explicit URLs are recommended with bundlers. Your renderer, lights, environment map and exposure determine the final appearance. A reasonable environment map preserves the polished paint and glass reflections.

## Vehicle IDs

`auto`, `indian-bus`, `compact`, `hatchback`, `minivan`, `offroad`, `pickup`, `sedan`, `sport`, `suv`, `wagon`, `taxi`, `garbage-truck`, `tow-truck`.

`library.list()` returns IDs, dimensions, wheel counts, handling classes and the supported named variants. Ambulance, citybus, police sedan, road service truck, school bus, postvan and the Cylinder001 display platform are excluded.

## Drivers, passengers and crowd controls (v1.5)

Every vehicle starts with its fitted seats occupied. The bus starts with **58 seated people (driver + 57 passengers) and eight standing passengers**; up to 12 standing passengers fit in its central aisle. Standing people have their feet on the floor and a posed hand gripping a continuous, rounded rail with floor sockets and roof connections. Door landings and driver access remain clear. The auto retains its original tan seats and handlebars. Cars/trucks have fitted seats, cabin floors, controls and right-hand steering; the off-road has two front buckets and four inward-facing rear places.

| Vehicle | Seated capacity, including driver | Standing |
| --- | ---: | ---: |
| auto | 4 | 0 |
| compact, hatchback | 4 | 0 |
| taxi, pickup, sedan, suv, wagon | 5 | 0 |
| minivan | 7 | 0 |
| offroad | 6 | 0 |
| indian-bus | 58 | 12 |

```js
const car = await library.create('sedan'); // Driver + four passengers.
const bus = await library.create('indian-bus', {
  occupants: { count: 'all', standing: 8 },
});

// Counts are independently adjustable on each vehicle. Await changes.
await bus.setOccupants({ count: 20, standing: 4 });
await bus.setOccupants({ count: 'all', standing: 12 });
await bus.setOccupants({ visible: false }); // Hide; retain rigs.
await bus.setOccupants({ visible: true });
await bus.setOccupants({ count: 0, standing: 0 }); // Release this crowd.

const capacity = bus.getCrowdCapacity(); // { seated: 58, standing: 12 }
const seats = bus.getSeats(); // { id, role, anchor }
const standing = bus.getStandingPlaces(); // { id, anchor }
const people = bus.getOccupants(); // { seatId, role, gender, object, skeleton }

// Four male and two female officers, with independent 65-joint rigs.
const jeep = await library.create('offroad', {
  variant: 'police', occupants: { count: 6, uniform: 'police' },
});

// Choose a smaller crowd AT CREATION for mobile or distant traffic.
const lightBus = await library.create('indian-bus', {
  occupants: { count: 9, standing: 2 },
});
const driverOnly = await library.create('sedan', { occupants: 1 });
const emptyCar = await library.create('sedan', { occupants: 0 });
const sourceCar = await library.create('sedan', { interior: false, occupants: 0 });
```

`count` means **seated people including the driver**; a number or `'all'` is accepted. `standing` is separate and bus-only. Numeric `setOccupants(n)` changes the seated count while preserving other settings; use `{count:0,standing:0}` to remove everyone from a bus. Invalid or excessive counts are rejected. `uniform` is `auto`, `police` or `civilian`; `auto` resolves from the current variant when creating the crew. Call `setOccupants({uniform:'police'})` explicitly if switching an already populated civilian vehicle to a police variant. `getConfig()` preserves interior and crowd settings for JSON save/restore.

Drivers use two-bone arm IK, palm orientation and finger curl around the physical control. The rickshaw uses its original handlebar assembly, padded grips and the inclined steering-column axis; its torso follows larger turns. Circular-wheel hand positions follow a comfortable arc and reposition along the rim at larger turns instead of forcing crossed, stretched arms. No bone translations or bone scaling are used to fake reach. `vehicle.update(dt)` or external `setTelemetry()` keeps steering and hand poses synchronized. Passenger arms rest at their laps, and standing passengers hold the aisle poles. Occupants remain attached while the vehicle moves.

Six optimized local character templates are included: a white-shirt driver, male/female police officers, and three civilian passenger looks (blue shirt, striped polo, green top). They retain their source **65-joint Mixamo skeletons and skin weights**. Geometry/materials/textures are shared per template; skeletons remain private per person. Templates load only when needed, once per library. WebP textures are capped at **1024 px**, or the lower library `textureLimit`. Source hashes, exact compressed sizes and triangle counts are in `asset-report.json`.

Crowd cost scales with visible people. A fully occupied bus is intended for nearby traffic; use smaller counts or `visible:false` for distant traffic and lower-powered devices. No automatic distance manager, crowd spawning system or UI is imposed on your game. Interior resources are cached per vehicle type. Driver steering IK updates with the controls; small head/chest motion and staggered passenger arm refitting keep supported lap contacts during normal updates. `dispose()` releases each person's private skeleton, and `library.dispose()` releases shared resources. This is a vehicle-attached seated/standing system; walking, boarding, ragdolls and animation clips are not bundled. Retarget external Mixamo clips to these characters' supplied bind poses before playing them.

## Colors, variants and procedural patterns

```js
auto.setVariant('delhi');
bus.setVariant('ksrtc-blue');

const car = await library.create('sedan');
scene.add(car.object);
car.setPaint({
  primary: '#2256a6', secondary: '#e8e1ce', accent: '#ed9e26',
  style: 'twoTone', finish: 'metallic', scope: 'all',
});
car.setPaint({ primary: '#b32343' }); // partial updates preserve other settings
car.setPaint({ enabled: false }); // original source paint
```

Styles: `solid`, `twoTone`, `stripes`, `pinstripe`, `camo`, `gradient`, `busClassic`, `autoBand`, `taxiBand`, `heritageLine`. Finishes: `gloss`, `metallic`, `satin`, `matte`. Every vehicle and named variant defaults to `metallic`, including bodywork with its original colors. Areas: `all`, `body`, `roof`. Optional controls: `width` 0.03–0.3, `scale` 0.3–4, `angle` 0–180 degrees, `offset` -0.4–0.4, and `detail` 0–1. Use six-digit hex colors. No generated paint images or artwork requests are involved.

Tires/rims, glass, lens surfaces, the off-road spare/carrier and wipers, and the auto's controls, seats and cabin floor are protected from body recoloring. The auto front mudguard steers without rotating with the tire. Paint stays attached while moving. Body-specific shaders preserve physical shading and clearcoat reflections. Changing colors, patterns or variants updates uniforms rather than loading another vehicle model.

Rear wipers, exhausts, tubes and grille bars retain their natural finishes. The recess behind a grille stays dark. The auto's inner frame, supports and inner body surfaces stay black; its exterior mirrors have complete opaque silver faces with graphite housings and stalks. Their original blue surface fragments are removed. Body-panel masks prevent pale texture fragments and old wiper marks showing through new paint.

### Windshield wipers

Call `vehicle.setWipers('intermittent')`, `'low'`, `'high'` or `'off'`. The same `wipers` setting is accepted when creating a vehicle and is saved by `getConfig()`. Keep calling `vehicle.update(dt)` as usual; the physics adapter also updates the wipers. Switching off finishes the current cycle and parks the blades. Intermittent mode pauses between sweeps. The front blades follow cached paths measured from the vehicle's glass, with smooth reversals and articulated arms. Pivot pins mount on the body below the glass, and the arms bridge to the blades; the rear wipers retain their authored parked position. In the playground use the wiper selector or press **V** to toggle low/off. `bindKeyboard()` also supports V.

Interior mirrors have bonded windshield feet and connected stalks. Fire truck, coupe, motorcycle, scooter, boat and helicopter are unavailable in the 14-vehicle catalog.

## Number plates

```js
auto.setPlate('AZ-4321');
auto.setPlate({ style: 'yellow', front: true, rear: true });
car.setPlate({ text: 'AZ-9000', style: 'white' });
```

Plates accept 1–14 letters, digits, spaces and hyphens; text is uppercased. Styles are `white`, `yellow`, `black`. `enabled`, `front` and `rear` control visibility. Default generated registrations start with AZ. Front and rear share two small **256–512×128** textures per instance: the metal/ink finish and lettering relief. These redraw only when text or style changes. The playground offers White metal, Yellow metal and Dark metal finishes. The off-road rear plate sits on the bumper below and beside the spare tire.

## Digital ASRTC destination display (v1.3)

Both Indian bus liveries use one roof-fitted, rounded digital display behind the windshield. Amber LED lettering shows ASRTC, the route number, the Malayalam destination and the English/via line. A clear optical window over the display preserves contrast through the tinted windshield; the rest of the windshield remains dark. Filled glyph cores and discrete LED points keep small lettering legible. The interior mirror sits below the display. The old rectangular plaques, windshield divider, blank interior sign and stray red source lettering have been removed. Continuous tinted glazing and a slim rubber seal sit in front of the recessed display; the cabin uses neutral dark finishes.

```js
bus.setNameBoard({
  operator: 'ASRTC',
  destination: 'കോഴിക്കോട്',
  via: 'KOZHIKODE • VIA TIRUR',
  routeNumber: '27',
});

bus.setNameBoard({ destination: 'കൊച്ചി', via: 'KOCHI' });
bus.setNameBoard({ operatorColor: '#ffc979', destinationColor: '#ffb84f' });
bus.setNameBoard({ backlight: 'auto' });
bus.setNameBoard({ operatorVisible: false }); // destination + route remain
bus.setNameBoard({ enabled: false }); // hide the display assembly
```

`operator`, `destination`, `via` and `routeNumber` are plain single-line strings, limited to 32, 96, 128 and 12 Unicode code points respectively. An empty route number removes that line; an empty `via` gives the destination more space. Text fits the available area; shorter names remain easier to read at driving distance. English and Malayalam are supported, including Malayalam shaping. Other scripts depend on fonts available in your game/browser.

`enabled`, `operatorVisible` and `routeVisible` are booleans. Both text fields share one continuous screen; hiding a field lets the remaining text use its space. `backlight` accepts `auto`, `on`, `off`: auto uses normal daytime LED brightness and brightens with headlights/tail lights, on selects the brighter level, and off dims the matrix. No scene lights are added. `background`, `operatorColor` and `destinationColor` accept six-digit hex colors. A dark background preserves the digital display's appearance. Defaults are **ASRTC**, **സിറ്റി സർവീസ് / CITY SERVICE**, route **10**, with warm amber lettering. These are editable sample values.

Name boards are supported on `indian-bus` only. Paint changes, variant changes and driving preserve the display settings. `getConfig().nameBoard` is JSON-safe; pass it back as `nameBoard` when recreating a bus. The API remains compatible with v1.2; its paper-board appearance is replaced by the digital unit.

Each bus owns one **768×160** canvas at the default texture limit, without mipmaps: about **0.47 MiB** of RGBA8 texture memory. A 512 texture limit uses **512×107**, and a 256 limit uses **256×53**. The canvas redraws only when text, field visibility or colors change; lighting updates change material brightness without uploading the canvas again. The rounded screen, casing and concealed mounts are lightweight geometry. Repaired source meshes, continuous front glazing and rubber seal geometry are cached once per library and shared by its buses; each bus has independent glass/interior materials and display texture. The source GLB packs remain unchanged.

The **38,960-byte** Malayalam WOFF2 font loads once per library when the first bus is created; subsequent text changes are synchronous and require no network requests. Bus creation waits for the local font, so ship `assets/fonts/` with the other assets. The font is a static bold instance of [Noto Sans Malayalam](https://github.com/google/fonts/tree/main/ofl/notosansmalayalam), under the SIL Open Font License included at `assets/fonts/OFL.txt`. No font CDN is used. Vehicle disposal releases its private screen geometry, materials and texture. Library disposal releases the shared derived geometry and unregisters its private font face.

## Light controls

```js
auto.setLights({ head: 'low', turn: 'left' });
auto.setLights({ head: 'high', turn: 'hazard', tail: true });
auto.setLights({ head: 'off', turn: 'off', tail: false });
car.setLights({ brake: true, reverse: true }); // manual override/test
```

`head`: `off`, `low`, `high`. `turn`: `off`, `left`, `right`, `hazard`. Boolean options: `tail`, `brake`, `reverse`, `beacons`, `autoCancel`. `strength` is 0–2. Braking/reverse lamps follow driving automatically. Signals blink at roughly 90 cycles/minute and can cancel after a turn. Lenses illuminate at their physical source; fitted auto and bus fixtures retain their mounted housings. The module never changes your scene background, world lights, environment or camera.

At most **two projected headlight spotlights per vehicle**, one on each side, are enabled by default. Headlight shadows default to off. Warm-white beams illuminate actual receiving surfaces in your scene; no cone or billboard is drawn in empty air. Halo sprites are **off by default** (`glow: false`); `glow: true` explicitly opts into the older stylized halo. Tail/indicator lamps use emissive surfaces rather than a point light per lens. Spawn with `{ projectedLights: false, glow: false, castShadow: false }` for distant traffic. Use `{ lightShadows: true }` only for nearby important vehicles when your renderer supports shadows.

## Pickup load bed

The pickup has a level charcoal load deck over the wheel housings, with a fitted liner and three taped cartons. The liner and cartons share cached geometry and materials between pickups. The liner uses one mesh; the complete addition uses six draws.

Pass `{cargo:false}` when creating a pickup to start with an empty deck. `pickup.setCargoVisible(false)` hides only the stock cartons. Add your own cargo to `pickup.getCargoAnchor()`; its local origin is the deck surface. The cargo visibility setting is saved by `getConfig()`. Custom cargo geometry remains your game's responsibility.

## Exhaust smoke

Exhaust smoke is enabled by default. A small pool of 64 soft particles follows each vehicle's exhaust outlets, with subtle idle puffs and increased output under throttle. Emitted particles retain their position in the world as the vehicle moves. There are no smoke image assets or extra model files.

Pass `{smoke:false}` when creating a vehicle or call `vehicle.setSmoke(false)` to disable it. `getConfig()` saves the setting. Keep calling `vehicle.update(dt)`; `reset()` clears the trail. The playground also has a smoke toggle.

## Driving and inputs

```js
auto.setInput({ throttle: 1, steering: 0.4, brake: 0 });
auto.setInput({ throttle: 0, steering: 0, brake: 1 });
auto.setInput({ throttle: -1, steering: 0, brake: 0 }); // stop, then reverse
auto.reset({ position: [0, 0, 0], rotation: 0 });

// Optional keyboard binding. No listeners are installed unless you call this.
const unbind = bindKeyboard(auto);
// WASD/arrows: drive; Space: brake; L: headlights; Q/E: signals; X: hazards.
// Call unbind() when leaving your driving mode.
```

Throttle is -1–1, steering is -1–1 (**positive turns left**), brake is 0–1. Keep calling `vehicle.update(dt)` every frame for wheels and lights. Built-in motion uses a fixed 60 Hz step and a flat-ground bicycle model with vehicle-specific handling, steering response and grip. Front tires use individual Ackermann angles; all driven visual tires roll according to radius and distance, with independent inner/outer speeds. Dual rear tires remain separate. State exposes speed in m/s, steering/yaw in radians, curvature in 1/m and distance in meters. Handling profiles are calibrated game estimates, not manufacturer specifications.

`setHandling()` accepts `maxSpeed`, `reverse` (m/s), `acceleration`, `braking`, `grip` (m/s²), `steer` (degrees) and `response`. Dimensions are meters, +Y is up, and +Z is forward. Vehicle roots use ground height beneath the rear axle center. Keep the root scale at 1 for handling to match its geometry. Place it under an unrotated, uniformly scaled scene/world parent when using built-in motion.

## Use your game's physics

The main visual module can work with any physics system. The optional lokam-physics.js module described below provides rigid-body physics. If your game already uses Rapier, Cannon, a custom controller or network-driven traffic, let that system own the root pose and supply telemetry for visual tires and lamps:

```js
car.object.position.copy(bodyPosition);
car.object.quaternion.copy(bodyRotation);
car.setTelemetry({
  speed: signedForwardSpeed, // m/s
  steering: steeringAngle, // radians, positive left
  braking: brakePressed,
});
car.update(dt); // animates wheels/lights without moving the root
```

You may supply `curvature` explicitly instead of deriving it from `steering`. `useBuiltInDriving()` returns pose control to the built-in controller. Your game remains responsible for collisions, slopes and suspension.

## Save, restore and clean up

```js
const saved = car.getConfig(); // JSON-safe customization, no geometry duplication
const restored = await library.create(saved.id, {
  variant: saved.variant || undefined, paint: saved.paint, plate: saved.plate, nameBoard: saved.nameBoard,
  interior: saved.interior, occupants: saved.occupants,
  smoke: saved.smoke, wipers: saved.wipers, cargo: saved.cargo,
});
restored.setLights(saved.lights);

car.dispose(); // removes this instance and its private materials/plates/lights
await library.dispose(); // disposes all remaining instances and cached resources
```

Geometries and source textures are shared by repeated instances of the same model. Paint/lamp materials, plate textures and bus sign textures are isolated per instance; changing or disposing one vehicle does not recolor or break another. Packs load on demand and are cached per library. Use one library for your game, not one per vehicle.

## Size and performance

Four compressed vehicle packs total approximately **7.43 MB** (7.08 MiB), plus **2.50 MB** for all six character templates. All load on demand. The runtime imports the Three.js version already used by your game; exact byte sizes are in `asset-report.json`. Meshopt compression, welded vertices, deduplicated geometry/materials/textures and WebP textures reduce payload size. Vehicle geometry retains its original detail; character meshes are simplified with skin weights preserved. Vehicle textures are at most 1024 pixels and character textures at most 1024 pixels. Generated image wraps are excluded.

For memory-limited devices, opt into `createVehicleLibrary({ assetBaseUrl: '/vehicles/', textureLimit: 512 })`. This downsizes decoded textures once per loaded pack and shares them across instances, reducing their RGBA memory by about four times where the source was 1024². Default `textureLimit: 1024` retains the shipped detail. Limits 256, 512, 1024 and 2048 are accepted; larger values cannot add detail absent from the source. WebP reduces download size; decoded texture memory is separate from download size.

Turn off projected lights, glows and shadows for background traffic, update only active vehicles, and use your game's distance culling. Geometry/material sharing does **not** turn this customizable hierarchy into a single instanced draw call. The detailed bus has many materials; a large traffic simulation still needs your engine's LOD/batching strategy. No fixed FPS or compatibility with every device is implied.

## Files and validation

`lokam-vehicles.js` is the production ESM module. `index.d.ts` documents its typed API. `integration-example.js` shows how to connect your existing scene and loop. `assets/catalog.json` indexes the four packs. `asset-report.json`, `validation.json` and `SHA256SUMS.txt` record the delivery. There is no workbench dependency or HTML app to deploy.

The original four model source files remain in the workspace unchanged. This package is derived from them with the retained fleet, wheel rigs, glazing and lamp/plate repairs. Original model ownership/licensing is not changed by this packaging.


## Police livery for the off-road jeep (v1.1)

```js
const jeep = await library.create('offroad', {
  variant: 'police',
  plate: { text: 'KL 01 BW 5955', style: 'white' },
});
scene.add(jeep.object);
jeep.setLights({ head: 'low', beacons: true });
// jeep.update(dt) in your game loop animates the red/blue roof beacon.
```

The reference-inspired police option uses the **offroad** model, ivory bodywork, red **POLICE** and **പോലീസ്** lettering, a bilingual windshield header, and a mounted red-blue beacon. The text sits on the flat panels and does not spill onto the wheel arches or running boards. The spare cover is plain black in this variant, with the source 4x4 lettering hidden. Malayalam is drawn from shaped vector outlines, so it does not depend on fonts installed on the player's device. Police emblems have been removed.

Rear English and Malayalam captions are fitted separately to the actual lamp positions, accounting for the model's slightly asymmetric body. Their smaller footprints stay on the flat panels, with clearance below the lower lamp housings and above the bumper, so letters do not clip at the outside edges.

`library.create('offroad')` creates the normal SUV with its original bodywork and civilian occupants. Both `standard` and `police` variants remain available; the playground labels them **Normal SUV** and **Police SUV** and defaults to normal. Switching in the playground also refreshes automatic civilian/police clothing and the emergency-light controls.

`jeep.setVariant('standard')` restores its original paint colors and spare graphic, with the calibrated base finish. `jeep.setVariant('police')` reapplies the police livery. Call `await jeep.setOccupants({})` after changing variants to refresh clothing when `uniform` is `auto`. The regular `suv` has no police markings and shares the fleet material calibration. You can still change body paint and plates on the police jeep; `getConfig()` retains its police markings and attachments. The livery adds no photographs, downloaded wrap images or extra vehicle model pack. Crew assets load as described above. The procedural text-only marking atlas is 512×304, and all accessory geometry/textures are released when the vehicle is disposed.


## Semi-realistic finish and physical light bar (v1.4)

The fleet defaults to metallic paint, with restrained clearcoat and metallic response. Original base materials are calibrated for softer reflections; tire/black trim, glass and lamp surfaces use separate settings. Texture roughness detail is retained with a minimum roughness so a glossy source map cannot turn the body into a mirror. Base material variants are cached once per library and reuse the original textures. Paint and lamp controls remain independent per vehicle. The source packs are not edited.

The off-road police light bar has rounded smoked red/blue covers, fourteen recessed emitter/reflector cells (forward, rear and ends), a single dark base and rubber roof mounts. The covers sit directly in the base without a bright metal perimeter; reflector cups stay inside the lenses. Static parts are merged into **six meshes** for the complete bar. Flashing changes the two emitter-bank materials; the whole cover does not glow. `setLights({beacons:true})` starts the flashing pattern immediately, and `strength` scales the emitters. No extra scene lights or image assets are added. The headlight halo cards are disabled by default.

The Indian bus rear no longer carries the unused blank gray panel. Its molded mounts are flattened into the painted bumper, without cutting holes or changing the tail lights and number plate. Both bus liveries and custom paint still apply to the repaired surface. These geometry repairs share the library's cache.

In v1.4.1, paint panels render as a single surface instead of a painted copy over the original body. Matching original faces are split out for both original-color and custom paint rendering, eliminating competition between coincident body layers. Protected pixels retain their natural color and finish in the same pass. Disabling custom paint restores the original texture colors on that same surface while retaining the selected finish. Protected trim stays separate. The derived geometry is cached once per library and reused by subsequent vehicles; the four source packs stay unchanged. No matching work runs in the game loop.

The standalone previews use softer daylight, lower exposure and a neutral ground to judge the finish. The police preview includes a night toggle and real receiving ground for the projected beams. These preview objects, controls and lighting are **outside this package**; your game's renderer and lighting still determine the final appearance. No photorealism or uniform device frame rate is implied.

## Playable physics for all 14 vehicles

Install `@dimforge/rapier3d-compat@0.19.3` in your game, then copy `lokam-physics.js` and `physics.d.ts` alongside the main module. The visual module has no physics dependency unless you import this optional module. Rapier is a peer dependency, shared with your game. Its compat package contains the WASM; no remote CDN is used.

```js
import {createVehicleLibrary} from './vehicles/lokam-vehicles.js';
import {createVehiclePhysicsWorld} from './vehicles/lokam-physics.js';

const library = await createVehicleLibrary({assetBaseUrl:'/vehicles/'});
const car = await library.create('sedan', {occupants:{count:'all'}});
scene.add(car.object);
const physics = await createVehiclePhysicsWorld({ground:true});
const controller = physics.add(car);
car.setInput({throttle:.6, steering:.15, brake:0});
function update(dt) {
  physics.update(dt); // Calls car.update too; do not update it a second time.
}
controller.reset({position:[0,.05,0], rotation:0});
// On leaving: physics.dispose(); await library.dispose();
```

Physics runs at **120 Hz**, with interpolated display transforms, damped inputs and speed-dependent steering limits. Ground vehicles use rigid bodies, wheel raycasts, suspension, grip, braking and static-obstacle collisions. Tall vehicles have progressive roll resistance. These are gameplay approximations, not manufacturer simulation or a full flight simulator. Chassis collision uses simple boxes; tire raycasts do not model tire sidewall collisions.

Use `createVehiclePhysicsWorld({ground:false})` to supply your own ground. `physics.addBox([halfWidth,halfHeight,halfLength], [x,y,z], [rx,ry,rz])` adds a fixed obstacle in meters/radians. `physics.world` exposes Rapier for your terrain/colliders. Use one world for interacting vehicles. Controllers expose `body` for impulses and game effects. Dispose controllers before disposing the world, or call `physics.dispose()` to dispose all of them. A disposed vehicle detaches automatically on the next physics step.

`setHandling()` changes speed, acceleration, braking, steering and grip. `physics.add(vehicle,{mass:1400})` overrides mass in kilograms. Keep roots under an untransformed world parent at scale 1. The main module's flat-ground controller remains useful for simple traffic; use the optional physics module for playable vehicles, terrain and collisions. For your own external physics, create with `bodyMotion:false` when the simulation already supplies body movement. The included physics controller temporarily disables that visual spring.

## Cabin and handling repairs

The car cabin covers are removed with bounded geometry checks that preserve roof and window edges. Obsolete source steering details are removed as whole connected parts. Molded dashboards, enclosed footwells, seats and door cards fit each cabin. Auto passengers share one supported bench row. Resting hand skin clears the posed thighs, and driver hands remain fitted to the moving controls.

Playable physics defaults to **playful** handling: stronger acceleration, tighter low-speed turns, quicker steering and a gradual steering reduction at speed. Grounded yaw assistance and side-slip correction help the chassis follow ordinary corners, with extra roll support for tall vehicles. The assistance switches off in the air and while overturned. Brakes remain progressive, and each vehicle retains its own wheelbase and handling profile. Use `createVehiclePhysicsWorld({feel:'balanced'})` for gentler acceleration and more conservative steering, or change `physics.feel` at runtime. The detailed migration instructions are in MIGRATION.md.




The SUV tailgate and lower rear shell are preserved when trimming the cabin, clearing the broken rear opening. Police offroad bumpers receive complete paint coverage while the grille and front guard retain a dark finish. Police markings have physical surface clearance in addition to depth bias. Paint and original body faces remain disjoint.

Initial paint visibility is applied before first rendering on every vehicle. Original texture colors and custom paint use the same disjoint body surface, preventing duplicate layers when a vehicle starts with its original colors. The original-color path skips pattern calculations.

The bus saloon lining sits inside the body skin, clearing the gray triangular patches on its exterior. Window-side passengers have additional lateral clearance. The red variant uses a deeper red with warm yellow-cream, based on a photographed Kerala KSRTC bus; the blue/cream option remains available.
