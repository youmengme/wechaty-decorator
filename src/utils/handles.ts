import {isFunction, isRegexp} from './functions'
import {Message} from 'wechaty'

export type MsgRegexpType = RegExp
export type MsgFCPromise = (msg: Message) => Promise<boolean>
export type MsgFC = (msg: Message) => boolean

export type MsgFCType = MsgFC | MsgFCPromise
export type MessageUnionType = Function | MsgRegexpType | string | undefined
export type ReturnFC = any

export function handleText(msg: Message, params?: MessageUnionType) {
  if (!params) return true
  if (isRegexp(params)) {
    return (params as RegExp).test(msg.text())
  }
  if (isFunction(params)) {
    return (params as MsgFCType)(msg)
  }
  return false
}

export function handleUrl(msg: Message, params?: MessageUnionType) {
  if (!params) return true
  if (isRegexp(params)) {
    return (params as RegExp).test(msg.text())
  }
  if (isFunction(params)) {
    return (params as MsgFCType)(msg)
  }
  return false
}
export function handleMiniProgram(msg: Message, params?: MessageUnionType) {
  if (!params) return true
  if (isFunction(params)) {
    return (params as MsgFCType)(msg)
  }
  return false
}
export function handleRecalled(data, params?: MessageUnionType) {
  return true
}

export function handleAudio(data, params?: MessageUnionType) {
  return true
}

export function handleVideo(data, params?: MessageUnionType) {
  return true
}

export function handleLocation(data, params?: MessageUnionType) {
  return true
}

export function handleImage(data, params?: MessageUnionType) {
  return true
}
