import {createVehicleLibrary} from './lokam-vehicles.js';
import {createVehiclePhysicsWorld} from './lokam-physics.js';
// Uses your renderer, scene, input system and animation loop. No UI is created.
export async function addPlayableFleet(scene,{assetBaseUrl='/vehicles/'}={}){
 const library=await createVehicleLibrary({assetBaseUrl});
 const physics=await createVehiclePhysicsWorld({ground:true});
 const vehicle=await library.create('sedan',{occupants:{count:'all'},plate:'AZ-2026'});
 scene.add(vehicle.object);const controller=physics.add(vehicle);
 return{library,vehicle,physics,controller,
  input(value){vehicle.setInput(value);},
  async crowd(count){await vehicle.setOccupants({count});},
  customize(paint){vehicle.setPaint(paint);},
  save(){return vehicle.getConfig();},
  update(dt){physics.update(dt);},
  async dispose(){physics.dispose();await library.dispose();}
 };
}
