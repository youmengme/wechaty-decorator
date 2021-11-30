"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const wechaty_voteout_1 = require("./plugins/wechaty-voteout");
const wechaty_puppet_padlocal_1 = require("wechaty-puppet-padlocal");
const wechaty_1 = require("wechaty");
const wechaty_puppet_1 = require("wechaty-puppet");
const index_1 = require("../index");
function log(...data) {
    console.log(...data);
}
class Test {
    constructor() {
        log('Test Instance');
        const puppet = new wechaty_puppet_padlocal_1.PuppetPadlocal({
            token: process.env.WECHATY_PUPPET_TOKEN
        });
        new index_1.WechatyDecorator({
            name: 'wendiaodiao',
            puppet
        }, [(0, wechaty_voteout_1.VoteOut)({
                room: [/^Crawlab/i, /^测试/i]
            })
        ]);
    }
    onScan(qrcode, status) {
        if (status === wechaty_1.ScanStatus.Waiting || status === wechaty_1.ScanStatus.Timeout) {
            const qrcodeImageUrl = [
                'https://wechaty.js.org/qrcode/',
                encodeURIComponent(qrcode),
            ].join('');
            log('StarterBot', 'onScan: %s(%s) - %s', wechaty_1.ScanStatus[status], status, qrcodeImageUrl);
        }
        else {
            log('StarterBot', 'onScan: %s(%s)', wechaty_1.ScanStatus[status], status);
        }
    }
    onLogin(user) {
        console.log('logged in', user.name());
    }
    onRoomJoin(room, inviteeList, inviter, date) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('topic', yield room.topic());
            room.say(`今天${date}${inviter.name()},邀请了${inviteeList.map(ele => ele.name()).join('，')}`);
        });
    }
    onRoomTopic(room, newTopic, oldTopic, changer, date) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('topic', yield room.topic());
            log('newTopic: ', newTopic);
            log('oldTopic: ', oldTopic);
            room.say(`今天${date}${changer.name()},群名称被修改为: ${newTopic}, 之前的名称是: ${oldTopic}`);
        });
    }
    onRoomLeave(room, leaverList, remover, date) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('topic', yield room.topic());
            log('leaverList: ', leaverList);
            log('remover: ', remover);
            log('date: ', date);
            room.say(`今天${date}${remover.name()}将${leaverList.map(ele => ele.name()).join('，')}移除了群聊`);
        });
    }
    onRoomInvite(roomInvitation) {
        return __awaiter(this, void 0, void 0, function* () {
            log(roomInvitation);
        });
    }
    onMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            log('message: ', message);
            const room = message.room();
            if (room) {
                const topic = yield room.topic();
                if (/^机器人测试群/.test(topic)) {
                    yield room.say(`msg from ${topic}`);
                }
            }
        });
    }
    onMessageRegexp(message) {
        return __awaiter(this, void 0, void 0, function* () {
            log('message: ', message);
            const room = message.room();
            if (room) {
                yield room.say('dong');
            }
        });
    }
    onMessageFn(message) {
        return __awaiter(this, void 0, void 0, function* () {
            log('message: ', message);
            const room = message.room();
            if (room) {
                yield room.say('dong');
            }
        });
    }
}
__decorate([
    index_1.OnScan,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Test.prototype, "onScan", null);
__decorate([
    index_1.OnLogin,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Test.prototype, "onLogin", null);
__decorate([
    index_1.onRoomJoin,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wechaty_1.Room, Object, wechaty_1.Contact, Object]),
    __metadata("design:returntype", Promise)
], Test.prototype, "onRoomJoin", null);
__decorate([
    index_1.OnRoomTopic,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wechaty_1.Room, Object, Object, wechaty_1.Contact, Object]),
    __metadata("design:returntype", Promise)
], Test.prototype, "onRoomTopic", null);
__decorate([
    index_1.OnRoomLeave,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wechaty_1.Room, Object, wechaty_1.Contact, Object]),
    __metadata("design:returntype", Promise)
], Test.prototype, "onRoomLeave", null);
__decorate([
    index_1.OnRoomInvite,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Test.prototype, "onRoomInvite", null);
__decorate([
    (0, index_1.OnMessage)(wechaty_puppet_1.MessageType.Text),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wechaty_1.Message]),
    __metadata("design:returntype", Promise)
], Test.prototype, "onMessage", null);
__decorate([
    (0, index_1.OnMessage)(wechaty_puppet_1.MessageType.Text, /^ding/),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wechaty_1.Message]),
    __metadata("design:returntype", Promise)
], Test.prototype, "onMessageRegexp", null);
__decorate([
    (0, index_1.OnMessage)(wechaty_puppet_1.MessageType.Text, (msg) => /^ding/.test(msg.text())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wechaty_1.Message]),
    __metadata("design:returntype", Promise)
], Test.prototype, "onMessageFn", null);
new Test();
//# sourceMappingURL=index.js.map