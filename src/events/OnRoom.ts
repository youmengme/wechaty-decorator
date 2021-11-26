import {Room} from 'wechaty'
import { MessageType } from 'wechaty-puppet'
import { defineMetadata } from '../main'
import {MessageUnionType, ReturnFC} from '../utils/handles'

function handleJoin() {}
function handleTopic() {}
function handleLeave() {}

type RoomEventName = 'join' | 'topic' | 'leave'
export function OnRoom(type?: RoomEventName): ReturnFC
export function OnRoom(type?: RoomEventName, topic?: string | RegExp): ReturnFC
export function OnRoom(type?: RoomEventName, topic?: Function): ReturnFC
export function OnRoom(type?: RoomEventName, params?: MessageUnionType): ReturnFC {
  return (target, propertyKey, descriptor) => {
    defineMetadata('OnRoom', (room: Room) => {
      
    })
  }
}
