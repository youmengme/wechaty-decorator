import 'reflect-metadata'
import {log, Wechaty as WechatyModel, WechatyOptions, WechatyPlugin} from 'wechaty'
export class WechatyDecorator {
  bot: WechatyModel

  constructor(options?: WechatyOptions, plugins?: Array<WechatyPlugin>) {
    this.bot = new WechatyModel(options)
    this.use(plugins)
    this.onScan()
    this.onError()
    this.onLogin()
    this.onLogout()
    this.onHeartbeat()
    this.onFriendship()
    this.onMessage()
    this.onReady()
    this.onRoomJoin()
    this.onRoomTopic()
    this.onRoomLeave()
    this.onRoomInvite()
    // start
    this.onStart()
  }

  use(plugins?: Array<WechatyPlugin>) {
    if (!this.bot || !plugins) return
    (plugins || []).forEach(plugin => {
      this.bot.use(plugin)
    })
  }

  onStart() {
    if (!this.bot) return
    this.bot.start()
      .then(() => log.info('StarterBot', 'Starter Bot Started.'))
      .catch(e => {
        log.error('StarterBot', e)
        console.log(e)
      })
  }

  /* 当机器人需要扫码登陆的时候会触发这个事件。建议你安装 qrcode-terminal(运行 npm install qrcode-terminal) 这个包，这样你可以在命令行中直接看到二维码。*/
  onScan() {
    if (!this.bot) return
    const funcs = getMetadata('onScan', [])
    this.bot.on('scan', (...params) => {
      funcs.forEach(func => {
        func(...params)
      })
    })
  }

  /* 当机器人内部出错的时候会触发error 事件。 */
  onError() {
    if (!this.bot) return
    const funcs = getMetadata('onError', [])
    this.bot.on('error', (...params) => {
      funcs.forEach(func => {
        func(...params)
      })
    })
  }

  /* 当机器人成功登陆后，会触发login 事件，并会在事件中传递当前登陆机器人的信息。 */
  onLogin() {
    if (!this.bot) return
    const funcs = getMetadata('onLogin', [])
    this.bot.on('login', (...params) => {
      funcs.forEach(func => {
        func(...params)
      })
    })
  }

  /* 当机器人检测到登出的时候，会触发logout 事件，并会在事件中传递机器人的信息。 */
  onLogout() {
    if (!this.bot) return
    const funcs = getMetadata('onLogout', [])
    this.bot.on('logout', (...params) => {
      funcs.forEach(func => {
        func(...params)
      })
    })
  }

  /* 获取机器人的心跳。 */
  onHeartbeat() {
    if (!this.bot) return
    const funcs = getMetadata('onHeartbeat', [])

    this.bot.on('heartbeat', (...params) => {
      funcs.forEach(func => {
        func(...params)
      })
    })
  }

  /* 当有人给机器人发好友请求的时候会触发这个事件。 */
  onFriendship() {
    if (!this.bot) return
    const funcs = getMetadata('onFriendship', [])

    this.bot.on('friendship', (...params) => {
      funcs.forEach(func => {
        func(...params)
      })
    })
  }

  /* 当机器人收到消息的时候会触发这个事件。 */
  onMessage() {
    if (!this.bot) return
    const funcs = getMetadata('onMessage', [])
    this.bot.on('message', (...params) => {
      funcs.forEach(func => {
        func(...params)
      })
    })
  }

  /* 当所有数据加载完成后，会触发这个事件。在wechaty-puppet-padchat 中，它意味着已经加载完成Contact 和Room 的信息。 */
  onReady() {
    if (!this.bot) return
    const funcs = getMetadata('onReady', [])

    this.bot.on('ready', (...params) => {
      funcs.forEach(func => {
        func(...params)
      })
    })
  }

  /* 当有人进入微信群的时候会触发这个事件。机器人主动进入某个微信群，同样会触发这个事件。 */
  onRoomJoin() {
    if (!this.bot) return
    const funcs = getMetadata('onRoomJoin', [])

    this.bot.on('room-join', (...params) => {
      funcs.forEach(func => {
        func(...params)
      })
    })
  }

  /* 当有人修改群名称的时候会触发这个事件。 */
  onRoomTopic() {
    if (!this.bot) return
    const funcs = getMetadata('onRoomTopic', [])

    this.bot.on('room-topic', (...params) => {
      funcs.forEach(func => {
        func(...params)
      })
    })
  }

  /* 当机器人把群里某个用户移出群聊的时候会触发这个时间。用户主动退群是无法检测到的。 */
  onRoomLeave() {
    if (!this.bot) return
    const funcs = getMetadata('onRoomLeave', [])

    this.bot.on('room-leave', (...params) => {
      funcs.forEach(func => {
        func(...params)
      })
    })
  }

  /* 当收到群邀请的时候，会触发这个事件。具体请[RoomInvitation](https://wechaty.gitbook.io/wechaty/v/zh/api/room-invitation) */
  onRoomInvite() {
    if (!this.bot) return
    const funcs = getMetadata('onRoomInvite', [])

    this.bot.on('room-invite', (...params) => {
      funcs.forEach(func => {
        func(...params)
      })
    })
  }

  instance() {
    return WechatyModel.instance()
  }
}

export function use(plugin: any) {
  const plugins = Reflect.getMetadata('plugins', WechatyDecorator) || []
  Reflect.defineMetadata('plugins', [...plugins, plugin], WechatyDecorator)
}

export function defineMetadata<T>(key: string, val: T, propertyKey?: string) {
  console.log('订阅事件: =========>  ', key, val, propertyKey)
  if (propertyKey) {
    Reflect.defineMetadata(key, Array.isArray(val) ? val : [val], WechatyDecorator, propertyKey)
  } else {
    Reflect.defineMetadata(key, Array.isArray(val) ? val : [val], WechatyDecorator)
  }
}

export function getMetadata<T>(key: string, defaultValue?: T) {
  return Reflect.getMetadata(key, WechatyDecorator) || defaultValue
}

export function delMetadata(key: string, propertyKey?: string) {
  return (
    propertyKey
      ? Reflect.deleteMetadata(key, WechatyDecorator, propertyKey)
      : Reflect.deleteMetadata(key, WechatyDecorator)
  )
}

export function hasMetadata(key: string, propertyKey?: string) {
  return (
    propertyKey
      ? Reflect.hasMetadata(key, WechatyDecorator, propertyKey)
      : Reflect.hasMetadata(key, WechatyDecorator)
  )
}
