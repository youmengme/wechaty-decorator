"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMetadata = exports.delMetadata = exports.getMetadata = exports.defineMetadata = exports.use = exports.WechatyDecorator = void 0;
require("reflect-metadata");
const wechaty_1 = require("wechaty");
class WechatyDecorator {
    constructor(options, plugins) {
        this.bot = new wechaty_1.Wechaty(options);
        this.use(plugins);
        this.onScan();
        this.onError();
        this.onLogin();
        this.onLogout();
        this.onHeartbeat();
        this.onFriendship();
        this.onMessage();
        this.onReady();
        this.onRoomJoin();
        this.onRoomTopic();
        this.onRoomLeave();
        this.onRoomInvite();
        this.onStart();
    }
    use(plugins) {
        if (!this.bot || !plugins)
            return;
        (plugins || []).forEach(plugin => {
            this.bot.use(plugin);
        });
    }
    onStart() {
        if (!this.bot)
            return;
        this.bot.start()
            .then(() => wechaty_1.log.info('StarterBot', 'Starter Bot Started.'))
            .catch(e => {
            wechaty_1.log.error('StarterBot', e);
            console.log(e);
        });
    }
    onScan() {
        if (!this.bot)
            return;
        const funcs = getMetadata('onScan', []);
        this.bot.on('scan', (...params) => {
            funcs.forEach(func => {
                func(...params);
            });
        });
    }
    onError() {
        if (!this.bot)
            return;
        const funcs = getMetadata('onError', []);
        this.bot.on('error', (...params) => {
            funcs.forEach(func => {
                func(...params);
            });
        });
    }
    onLogin() {
        if (!this.bot)
            return;
        const funcs = getMetadata('onLogin', []);
        this.bot.on('login', (...params) => {
            funcs.forEach(func => {
                func(...params);
            });
        });
    }
    onLogout() {
        if (!this.bot)
            return;
        const funcs = getMetadata('onLogout', []);
        this.bot.on('logout', (...params) => {
            funcs.forEach(func => {
                func(...params);
            });
        });
    }
    onHeartbeat() {
        if (!this.bot)
            return;
        const funcs = getMetadata('onHeartbeat', []);
        this.bot.on('heartbeat', (...params) => {
            funcs.forEach(func => {
                func(...params);
            });
        });
    }
    onFriendship() {
        if (!this.bot)
            return;
        const funcs = getMetadata('onFriendship', []);
        this.bot.on('friendship', (...params) => {
            funcs.forEach(func => {
                func(...params);
            });
        });
    }
    onMessage() {
        if (!this.bot)
            return;
        const funcs = getMetadata('onMessage', []);
        this.bot.on('message', (...params) => {
            funcs.forEach(func => {
                func(...params);
            });
        });
    }
    onReady() {
        if (!this.bot)
            return;
        const funcs = getMetadata('onReady', []);
        this.bot.on('ready', (...params) => {
            funcs.forEach(func => {
                func(...params);
            });
        });
    }
    onRoomJoin() {
        if (!this.bot)
            return;
        const funcs = getMetadata('onRoomJoin', []);
        this.bot.on('room-join', (...params) => {
            funcs.forEach(func => {
                func(...params);
            });
        });
    }
    onRoomTopic() {
        if (!this.bot)
            return;
        const funcs = getMetadata('onRoomTopic', []);
        this.bot.on('room-topic', (...params) => {
            funcs.forEach(func => {
                func(...params);
            });
        });
    }
    onRoomLeave() {
        if (!this.bot)
            return;
        const funcs = getMetadata('onRoomLeave', []);
        this.bot.on('room-leave', (...params) => {
            funcs.forEach(func => {
                func(...params);
            });
        });
    }
    onRoomInvite() {
        if (!this.bot)
            return;
        const funcs = getMetadata('onRoomInvite', []);
        this.bot.on('room-invite', (...params) => {
            funcs.forEach(func => {
                func(...params);
            });
        });
    }
    instance() {
        return wechaty_1.Wechaty.instance();
    }
}
exports.WechatyDecorator = WechatyDecorator;
function use(plugin) {
    const plugins = Reflect.getMetadata('plugins', WechatyDecorator) || [];
    Reflect.defineMetadata('plugins', [...plugins, plugin], WechatyDecorator);
}
exports.use = use;
function defineMetadata(key, val, propertyKey) {
    console.log('订阅事件: =========>  ', key, val, propertyKey);
    if (propertyKey) {
        Reflect.defineMetadata(key, Array.isArray(val) ? val : [val], WechatyDecorator, propertyKey);
    }
    else {
        Reflect.defineMetadata(key, Array.isArray(val) ? val : [val], WechatyDecorator);
    }
}
exports.defineMetadata = defineMetadata;
function getMetadata(key, defaultValue) {
    return Reflect.getMetadata(key, WechatyDecorator) || defaultValue;
}
exports.getMetadata = getMetadata;
function delMetadata(key, propertyKey) {
    return (propertyKey
        ? Reflect.deleteMetadata(key, WechatyDecorator, propertyKey)
        : Reflect.deleteMetadata(key, WechatyDecorator));
}
exports.delMetadata = delMetadata;
function hasMetadata(key, propertyKey) {
    return (propertyKey
        ? Reflect.hasMetadata(key, WechatyDecorator, propertyKey)
        : Reflect.hasMetadata(key, WechatyDecorator));
}
exports.hasMetadata = hasMetadata;
//# sourceMappingURL=main.js.map