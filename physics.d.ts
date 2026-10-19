import type {Collider, RigidBody, World} from '@dimforge/rapier3d-compat';
import type {Vehicle} from './index.js';
export interface PhysicsOptions {feel?:'playful'|'balanced';ground?:boolean;groundSize?:number;}
export class VehiclePhysicsWorld {
 feel:'playful'|'balanced';readonly world:World;readonly time:number;readonly disposed:boolean;
 add(vehicle:Vehicle, options?:{mass?:number}):VehiclePhysicsController;
 addBox(halfExtents:[number,number,number],position:[number,number,number],rotation?:[number,number,number]):Collider;
 /** Owns attached vehicle.update calls. Delta is seconds. */
 update(deltaSeconds:number):void;
 dispose():void;
}
export class VehiclePhysicsController {
 readonly vehicle:Vehicle;readonly body:RigidBody;readonly disposed:boolean;
 setInput(input:Parameters<Vehicle['setInput']>[0]):this;
 reset(options?:{position?:[number,number,number];rotation?:number}):this;
 dispose():void;
}
export function createVehiclePhysicsWorld(options?:PhysicsOptions):Promise<VehiclePhysicsWorld>;
