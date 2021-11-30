import { ReturnFC } from '../utils/handles';
declare type RoomEventName = 'join' | 'topic' | 'leave';
export declare function OnRoom(type?: RoomEventName): ReturnFC;
export declare function OnRoom(type?: RoomEventName, topic?: string | RegExp): ReturnFC;
export declare function OnRoom(type?: RoomEventName, topic?: Function): ReturnFC;
export {};
