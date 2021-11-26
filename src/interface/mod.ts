import {WechatyOptions, WechatyPlugin} from 'wechaty'

export interface RegisterProps {
  botConfig: WechatyOptions
  autoStart?: boolean
  printQrcodeToTerminal?: boolean
  plugins?: Array<WechatyPlugin>
}
