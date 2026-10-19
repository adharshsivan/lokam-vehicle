// Copy the module into your source tree, and assets/ into public/vehicles/.
import {createVehicleLibrary,bindKeyboard} from './lokam-vehicles.js';

// Uses your existing Three.js scene and animation loop. Creates no UI or camera.
export async function addLokamVehicles(scene,{assetBaseUrl='/vehicles/',keyboard=false}={}){
 const library=await createVehicleLibrary({assetBaseUrl});
 const auto=await library.create('auto',{variant:'kerala',plate:'AZ-2026'});
 scene.add(auto.object);
 const bus=await library.create('indian-bus',{
  variant:'ksrtc-red',plate:'AZ-2027',position:[5,0,0],
  nameBoard:{operator:'ASRTC',destination:'മലപ്പുറം',via:'MALAPPURAM',routeNumber:'10'},
 });
 scene.add(bus.object);
 const police=await library.create('offroad',{
  variant:'police',plate:{text:'KL 01 BW 5955',style:'white'},position:[-5,0,0],
  occupants:{count:6,uniform:'police'},
 });
 scene.add(police.object);
 // Every seat is filled by default. The bus also starts with eight standing passengers.
 // Crowd changes are asynchronous when loading character templates:
 // await auto.setOccupants({visible:false});
 // await police.setOccupants(0); // Remove the crew; shared models stay cached.
 // At any time: bus.setNameBoard({destination:'കോഴിക്കോട്',via:'KOZHIKODE',routeNumber:'27'});
 const unbind=keyboard?bindKeyboard(auto):()=>{};
 return {
  library,auto,bus,police,
  // Call with delta seconds in your existing requestAnimationFrame loop.
  update(dt){auto.update(dt);bus.update(dt);police.update(dt);},
  async dispose(){unbind();await library.dispose();},
 };
}
