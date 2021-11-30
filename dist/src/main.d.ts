import 'reflect-metadata';
import { Wechaty as WechatyModel, WechatyOptions, WechatyPlugin } from 'wechaty';
export declare class WechatyDecorator {
    bot: WechatyModel;
    constructor(options?: WechatyOptions, plugins?: Array<WechatyPlugin>);
    use(plugins?: Array<WechatyPlugin>): void;
    onStart(): void;
    onScan(): void;
    onError(): void;
    onLogin(): void;
    onLogout(): void;
    onHeartbeat(): void;
    onFriendship(): void;
    onMessage(): void;
    onReady(): void;
    onRoomJoin(): void;
    onRoomTopic(): void;
    onRoomLeave(): void;
    onRoomInvite(): void;
    instance(): WechatyModel;
}
export declare function use(plugin: any): void;
export declare function defineMetadata<T>(key: string, val: T, propertyKey?: string): void;
export declare function getMetadata<T>(key: string, defaultValue?: T): any;
export declare function delMetadata(key: string, propertyKey?: string): boolean;
export declare function hasMetadata(key: string, propertyKey?: string): boolean;
