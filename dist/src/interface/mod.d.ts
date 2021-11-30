import { WechatyOptions, WechatyPlugin } from 'wechaty';
export interface RegisterProps {
    botConfig: WechatyOptions;
    autoStart?: boolean;
    printQrcodeToTerminal?: boolean;
    plugins?: Array<WechatyPlugin>;
}
declare type Fc = Function;
declare type Filter = string | RegExp | Fc;
interface Abundant {
    filter: Filter;
    order?: number;
    exclusive?: boolean;
}
export declare type Params = Fc | Abundant;
export {};
