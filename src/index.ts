import { version } from '../package.json'
import wechaty from 'wechaty'
export * from 'wechaty-puppet'
export * from './main'
export * from './events'
export * from './interface/mod' // interface

export const VERSION = version

export {
  wechaty
}
