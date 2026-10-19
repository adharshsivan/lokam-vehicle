import type {Group, Object3D, Skeleton, LoadingManager} from 'three';
export const VERSION: string;
export type VehicleId = 'garbage-truck'|'taxi'|'tow-truck'|'compact'|'hatchback'|'minivan'|'offroad'|'pickup'|'sedan'|'sport'|'suv'|'wagon'|'indian-bus'|'auto';
export type PaintStyle = 'solid'|'twoTone'|'stripes'|'pinstripe'|'camo'|'gradient'|'busClassic'|'autoBand'|'taxiBand'|'heritageLine';
export const paintStyles: readonly PaintStyle[];
export type Variant = 'kerala'|'delhi'|'ksrtc-blue'|'ksrtc-red'|'standard'|'police';
export interface Paint {enabled?:boolean;primary?:string;secondary?:string;accent?:string;style?:PaintStyle;finish?:'gloss'|'metallic'|'satin'|'matte';scope?:'all'|'body'|'roof';width?:number;scale?:number;angle?:number;offset?:number;detail?:number;}
export interface Plate {text?:string;style?:'white'|'yellow'|'black';front?:boolean;rear?:boolean;enabled?:boolean;}
export interface LightControls {head?:'off'|'low'|'high';turn?:'off'|'left'|'right'|'hazard';tail?:boolean;brake?:boolean;reverse?:boolean;beacons?:boolean;strength?:number;autoCancel?:boolean;}
export interface NameBoard {operator?:string;destination?:string;via?:string;routeNumber?:string;enabled?:boolean;operatorVisible?:boolean;routeVisible?:boolean;backlight?:'auto'|'on'|'off';background?:string;operatorColor?:string;destinationColor?:string;}
export type WiperMode = 'off'|'intermittent'|'low'|'high';
export interface Handling {maxSpeed?:number;reverse?:number;acceleration?:number;braking?:number;steer?:number;response?:number;grip?:number;}
export interface OccupantSettings {count?:number|'all';standing?:number;visible?:boolean;uniform?:'auto'|'police'|'civilian';}
export interface SeatInfo {id:string;role:'driver'|'passenger';anchor:Object3D;}
export interface OccupantInfo {seatId:string;role:'driver'|'passenger'|'standing';gender:'male'|'female';object:Group;skeleton:Skeleton;}
export interface VehicleOptions {variant?:Variant;paint?:Paint;plate?:string|Plate;nameBoard?:NameBoard;interior?:boolean;bodyMotion?:boolean;lights?:LightControls;wipers?:WiperMode;smoke?:boolean;cargo?:boolean;occupants?:number|OccupantSettings;position?:[number,number,number];rotation?:number;castShadow?:boolean;projectedLights?:boolean;lightShadows?:boolean;glow?:boolean;}
export interface VehicleInfo {id:VehicleId;name:string;pack:string;node:string;dimensions:[number,number,number];wheelCount:number;type:string;variants:Variant[];}
export interface VehicleConfig {id:VehicleId;variant:Variant|null;paint:Paint;plate:Plate;lights:LightControls;wipers:WiperMode;smoke:boolean;cargo?:boolean;nameBoard?:NameBoard;interior:boolean;bodyMotion:boolean;occupants:OccupantSettings;}
export class Vehicle {
 private constructor();
 readonly id:VehicleId;readonly object:Group;readonly disposed:boolean;
 readonly meta:{id:VehicleId;size:[number,number,number];wheelbase:number;profile:Handling};
 readonly state:{speed:number;steering:number;curvature:number;distance:number;yaw:number;braking:boolean;acceleration:number};
 setVariant(id:Variant):this;
 setPaint(paint:Paint):this;
 setPlate(plate:string|Plate):this;
 /** Indian bus only. Partial updates redraw changed boards immediately. English and Malayalam supported. */
 setNameBoard(settings:NameBoard):this;
 /** Defaults to every seat occupied, plus eight standing bus passengers. Count includes the driver. */
 setOccupants(settings:number|OccupantSettings):Promise<this>;
 getCrowdCapacity():{seated:number;standing:number};
 getStandingPlaces():{id:string;anchor:Object3D}[];
 getSeats():SeatInfo[];
 getOccupants():OccupantInfo[];
 setLights(lights:LightControls):this;
 /** Finishes the current sweep and parks when switched off. */
 setWipers(mode:WiperMode):this;
 /** Subtle exhaust vapor. Enabled by default; ramps up with engine load. */
 setSmoke(enabled:boolean):this;
 /** Pickup: local load-deck origin for custom objects, or null on other vehicles. */
 getCargoAnchor():Group|null;
 /** Pickup: show or hide the three stock cartons; custom cargo stays attached. */
 setCargoVisible(visible:boolean):this;
 setInput(input:{throttle?:number;steering?:number;brake?:number}):this;
 setHandling(handling:Handling):this;
 setTelemetry(telemetry:{speed?:number;steering?:number;curvature?:number;braking?:boolean}):this;
 useBuiltInDriving():this;
 update(deltaSeconds:number):this;
 reset(options?:{position?:[number,number,number];rotation?:number}):this;
 getConfig():VehicleConfig;
 dispose():void;
}
export class VehicleLibrary {
 private constructor();
 list():VehicleInfo[];
 create(id:VehicleId,options?:VehicleOptions):Promise<Vehicle>;
 dispose():Promise<void>;
}
export function createVehicleLibrary(options?:{assetBaseUrl?:string|URL;manager?:LoadingManager;textureLimit?:256|512|1024|2048}):Promise<VehicleLibrary>;
export function bindKeyboard(vehicle:Vehicle,options?:{target?:Window|HTMLElement}):()=>void;
