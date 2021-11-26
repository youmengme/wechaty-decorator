import { defineMetadata } from '../main'
export {OnMessage} from './OnMessage'

export function OnScan(target, name, descriptor) {
  defineMetadata('onScan', descriptor.value)
}

export function OnLogin(target, name, descriptor) {
  defineMetadata('onLogin', descriptor.value)
}

export function onRoomJoin(target, name, descriptor) {
  defineMetadata('onRoomJoin', descriptor.value)
}

export function OnRoomTopic(target, name, descriptor) {
  defineMetadata('onRoomTopic', descriptor.value)
}

export function OnRoomLeave(target, name, descriptor) {
  defineMetadata('onRoomLeave', descriptor.value)
}

export function OnRoomInvite(target, name, descriptor) {
  defineMetadata('onRoomInvite', descriptor.value)
}

export function OnFriendship(target, name, descriptor) {
  defineMetadata('friendship', descriptor.value)
}

export function OnError(target, name, descriptor) {
  defineMetadata('onError', descriptor.value)
}
