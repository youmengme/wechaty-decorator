# wechaty-decorator
> 装饰器版本的`wechaty`

可以使用装饰器方便的处理不同类型的事件

## Install
```bash
npm install wechaty-decorator 
# or
yarn add wechaty-decorator
# or
pnpm add wechaty-decorator
```

## TODO

- [x] onRoomJoin
- [x] OnRoomInvite
- [x] OnRoomLeave
- [x] OnRoomTopic
- [x] OnScan
- [x] OnLogin
- [x] OnMessage
- [x] OnFriendship
- [x] OnError
- [ ] OnRoomMessage
- [ ] OnConcatMessage

## Example
```typescript
import { PuppetPadlocal } from 'wechaty-puppet-padlocal'
import {
  ScanStatus,
  Message,
  Room,
  Contact,
} from 'wechaty'
import { MessageType } from 'wechaty-puppet'
import {
  WechatyDecorator,
  onRoomJoin,
  OnRoomInvite,
  OnRoomLeave,
  OnRoomTopic,
  OnScan,
  OnLogin,
  OnMessage,
} from 'wechaty-decorator'

function log(...data) {
  console.log(...data)
}

class Example {
  constructor() {
    const puppet = new PuppetPadlocal({
      token: "YOU_TOKEN"
    })

    new WechatyDecorator({
      name: 'YOUR_BOT_NAME',
      puppet,
    })
  }

  @OnScan
  onScan(qrcode, status) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
      const qrcodeImageUrl = [
        'https://wechaty.js.org/qrcode/',
        encodeURIComponent(qrcode),
      ].join('')
      log('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)
    } else {
      log('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
    }
  }

  @OnLogin
  onLogin(user) {
    console.log('logged in', user.name())
  }

  // TODO: puppet限制 无法完成测试
  @onRoomJoin
  async onRoomJoin(room: Room, inviteeList, inviter: Contact, date) {
    console.log('topic', await room.topic())
    room.say(
      `今天${date}${inviter.name()},邀请了${inviteeList.map(ele => ele.name()).join('，')}`
    )
  }

  @OnRoomTopic
  async onRoomTopic(room: Room, newTopic, oldTopic, changer: Contact, date) {
    console.log('topic', await room.topic())
    log('newTopic: ', newTopic)
    log('oldTopic: ', oldTopic)
    room.say(`今天${date}${changer.name()},群名称被修改为: ${newTopic}, 之前的名称是: ${oldTopic}`)
  }

  // TODO: puppet限制 无法完成测试
  @OnRoomLeave
  async onRoomLeave(room: Room, leaverList, remover: Contact, date) {
    console.log('topic', await room.topic())
    log('leaverList: ', leaverList)
    log('remover: ', remover)
    log('date: ', date)
    room.say(
      `今天${date}${remover.name()}将${leaverList.map(ele => ele.name()).join('，')}移除了群聊`
    )
  }

  @OnRoomInvite
  async onRoomInvite(roomInvitation) {
    log(roomInvitation)
  }

  @OnMessage(MessageType.Text)
  async onMessage(message: Message) {
    log('message: ', message)
    const room = message.room()
    if (room) {
      const topic = await room.topic()
      if (/^机器人测试群/.test(topic)) {
        await room.say(`msg from ${topic}`)
      }
    }
  }

  @OnMessage(MessageType.Text, /^ding/)
  async onMessageRegexp(message: Message) {
    log('message: ', message)
    const room = message.room()
    if (room) {
      await room.say('dong')
    }
  }

  @OnMessage(MessageType.Text, (msg: Message) => /^ding/.test(msg.text()) )
  async onMessageFn(message: Message) {
    log('message: ', message)
    const room = message.room()
    if (room) {
      await room.say('dong')
    }
  }
}

new Example()
```

# Tips
- 项目中依赖的`wechaty`版本是`^0.56.6` 如果使用出现报错，请检查版本是否一致。
