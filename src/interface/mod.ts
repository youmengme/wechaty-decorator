import {WechatyOptions, WechatyPlugin} from 'wechaty'

export interface RegisterProps {
  botConfig: WechatyOptions
  autoStart?: boolean
  printQrcodeToTerminal?: boolean
  plugins?: Array<WechatyPlugin>
}

type Fc = Function

type Filter = string | RegExp | Fc
interface Abundant {
  filter: Filter,
  order?: number
  exclusive?: boolean
}

export type Params = Fc | Abundant
