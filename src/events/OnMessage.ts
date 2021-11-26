import { defineMetadata } from '../main'
import { Message } from 'wechaty'
import { MessageType } from 'wechaty-puppet'
import type {
  MsgRegexpType,
  MsgFCType,
  MessageUnionType
} from '../utils/handles'
import {
  handleAudio,
  handleImage,
  handleLocation,
  handleMiniProgram,
  handleRecalled,
  handleText,
  handleUrl,
  handleVideo,
  ReturnFC
} from '../utils/handles'

export function OnMessage(type: MessageType.Unknown): ReturnFC
export function OnMessage(type: MessageType.Attachment): ReturnFC
export function OnMessage(type: MessageType.Audio): ReturnFC
export function OnMessage(type: MessageType.Contact): ReturnFC
export function OnMessage(type: MessageType.ChatHistory): ReturnFC
export function OnMessage(type: MessageType.Emoticon): ReturnFC
export function OnMessage(type: MessageType.Image): ReturnFC
export function OnMessage(type: MessageType.Text): ReturnFC
export function OnMessage(type: MessageType.Location): ReturnFC
export function OnMessage(type: MessageType.MiniProgram): ReturnFC
export function OnMessage(type: MessageType.GroupNote): ReturnFC
export function OnMessage(type: MessageType.Transfer): ReturnFC
export function OnMessage(type: MessageType.RedEnvelope): ReturnFC
export function OnMessage(type: MessageType.Recalled): ReturnFC
export function OnMessage(type: MessageType.Url): ReturnFC
export function OnMessage(type: MessageType.Video): ReturnFC
export function OnMessage(type: MessageType.MiniProgram, cb: MsgFCType): ReturnFC
export function OnMessage(type: MessageType.Text, cb?: MsgFCType): ReturnFC
export function OnMessage(type: MessageType.Text, regexp?: MsgRegexpType): ReturnFC
export function OnMessage(type: MessageType.Url, cb?: MsgFCType): ReturnFC
export function OnMessage(type: MessageType.Url, regexp?: MsgRegexpType): ReturnFC
export function OnMessage(type: MessageType.Recalled, cb?: MsgFCType): ReturnFC
export function OnMessage(type: MessageType.Recalled, regexp?: MsgRegexpType): ReturnFC
export function OnMessage(type?: MessageType, params?: MessageUnionType): ReturnFC {
  return (target, propertyKey, descriptor) => {
    defineMetadata('onMessage', (msg: Message) => {
      const messageType = msg.type()
      if (type !== messageType) return

      if (messageType === MessageType.Text) {
        const isAvailable = handleText(msg, params)
        if (isAvailable) descriptor.value(msg)
        return
      }
      if (messageType === MessageType.Url) {
        const isAvailable = handleUrl(msg, params)
        if (isAvailable) descriptor.value(msg)
        return
      }
      if (messageType === MessageType.Recalled) {
        const isAvailable = handleRecalled(msg, params)
        if (isAvailable) descriptor.value(msg)
        return
      }
      if (messageType === MessageType.Audio) {
        const isAvailable = handleAudio(msg, params)
        if (isAvailable) descriptor.value(msg)
        return
      }
      if (messageType === MessageType.Video) {
        const isAvailable = handleVideo(msg, params)
        if (isAvailable) descriptor.value(msg)
        return
      }
      if (messageType === MessageType.Location) {
        const isAvailable = handleLocation(msg, params)
        if (isAvailable) descriptor.value(msg)
        return
      }
      if (messageType === MessageType.Image) {
        const isAvailable = handleImage(msg, params)
        if (isAvailable) descriptor.value(msg)
        return
      }
      if (messageType === MessageType.MiniProgram) {
        const isAvailable = handleMiniProgram(msg, params)
        if (isAvailable) descriptor.value(msg)
        return
      }
    })
  }
}
