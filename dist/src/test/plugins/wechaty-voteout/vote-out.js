"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.VoteOut = void 0;
const wechaty_1 = require("wechaty");
const wechaty_puppet_1 = require("wechaty-puppet");
const wechaty_plugin_contrib_1 = require("wechaty-plugin-contrib");
const mustache_view_1 = require("./mustache-view");
const config_1 = require("./config");
const store = __importStar(require("./store"));
function VoteOut(config) {
    wechaty_1.log.verbose('WechatyPluginContrib', 'VoteOut(%s)', JSON.stringify(config));
    config = Object.assign(Object.assign({}, config_1.DEFAULT_CONFIG), config);
    store.init();
    const isVoteDown = (text) => { var _a; return !!((_a = config.downEmoji) === null || _a === void 0 ? void 0 : _a.includes(text)); };
    const isVoteUp = (text) => { var _a; return !!((_a = config.upEmoji) === null || _a === void 0 ? void 0 : _a.includes(text)); };
    const isVoteManagedRoom = wechaty_plugin_contrib_1.matchers.roomMatcher(config.room);
    const isWhitelistContact = wechaty_plugin_contrib_1.matchers.contactMatcher(config.whitelist);
    const talkRepeat = wechaty_plugin_contrib_1.talkers.roomTalker(config.repeat);
    const talkWarn = wechaty_plugin_contrib_1.talkers.roomTalker(config.warn);
    const talkKick = wechaty_plugin_contrib_1.talkers.messageTalker(config.kick);
    return function VoteOutPlugin(wechaty) {
        wechaty_1.log.verbose('WechatyPluginContrib', 'VoteOut() VoteOutPlugin(%s)', wechaty);
        let lastPrune = 0;
        const oneDay = 24 * 3600 * 1000;
        wechaty.on('heartbeat', () => {
            if (Date.now() - lastPrune > oneDay) {
                store.prune();
                lastPrune = Date.now();
            }
        });
        wechaty.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
            wechaty_1.log.silly('WechatyPluginContrib', 'VoteOut() on(message) %s', message);
            const room = message.room();
            const voter = message.talker();
            if (!room) {
                return;
            }
            if (message.type() !== wechaty_puppet_1.MessageType.Text) {
                return;
            }
            const mentionList = yield message.mentionList();
            if (mentionList.length <= 0) {
                return;
            }
            const text = yield message.mentionText();
            if (!isVoteUp(text)
                && !isVoteDown(text)) {
                return;
            }
            if (!(yield isVoteManagedRoom(room))) {
                return;
            }
            wechaty_1.log.verbose('WechatyPluginContrib', 'VoteOut() on(message) %s in %s is voting %s', voter, room, mentionList.join(','));
            const votee = mentionList[0];
            if (!votee) {
                return;
            }
            if (votee.id === message.wechaty.currentUser().id) {
                return;
            }
            if (yield isWhitelistContact(votee)) {
                return;
            }
            let payload = store.get(room, votee);
            wechaty_1.log.verbose('WechatyPluginContrib', 'VoteOut() on(message) payload for votee %s is %s', votee, JSON.stringify(payload));
            if (payload.downIdList.includes(voter.id)
                || payload.upIdList.includes(voter.id)) {
                const view = yield (0, mustache_view_1.getMustacheView)(config, payload, room, votee);
                return talkRepeat(room, voter, view);
            }
            if (isVoteUp(text)) {
                payload = Object.assign(Object.assign({}, payload), { upIdList: [...new Set([
                            ...payload.upIdList,
                            voter.id
                        ])], upNum: payload.upNum + 1 });
                store.set(room, votee, payload);
            }
            else if (isVoteDown(text)) {
                payload = Object.assign(Object.assign({}, payload), { downIdList: [...new Set([
                            ...payload.downIdList,
                            voter.id
                        ])], downNum: payload.downNum + 1 });
                store.set(room, votee, payload);
            }
            const view = yield (0, mustache_view_1.getMustacheView)(config, payload, room, votee);
            if (payload.downNum - payload.upNum >= config.threshold) {
                yield talkKick(message, view);
                if (yield room.has(votee)) {
                    yield room.del(votee);
                }
                store.del(room, votee);
            }
            else {
                yield talkWarn(room, votee, view);
            }
        }));
    };
}
exports.VoteOut = VoteOut;
//# sourceMappingURL=vote-out.js.map