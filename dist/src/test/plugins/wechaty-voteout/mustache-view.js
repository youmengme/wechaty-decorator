"use strict";
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
exports.getMustacheView = exports.getAtNameText = void 0;
const config_1 = require("./config");
function getMustacheView(config, payload, room, votee) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            downEmoji: (config.downEmoji && config.downEmoji[0]) || config_1.DEFAULT_CONFIG.downEmoji[0],
            downNum: payload.downNum,
            downVoters: yield getAtNameText([...payload.downIdList], room),
            threshold: config.threshold || config_1.DEFAULT_CONFIG.threshold,
            upEmoji: config.upEmoji && config.upEmoji[0],
            upNum: payload.upNum,
            upVoters: yield getAtNameText([...payload.upIdList], room),
            votee: (yield room.alias(votee)) || votee.name(),
        };
    });
}
exports.getMustacheView = getMustacheView;
function getAtNameText(contactIdList, room) {
    return __awaiter(this, void 0, void 0, function* () {
        if (contactIdList.length <= 0) {
            return '';
        }
        const uniqIdList = [...new Set([...contactIdList])];
        const contactList = uniqIdList.map(id => room.wechaty.Contact.load(id));
        yield Promise.all(contactList.map(c => c.ready()));
        const contactNameList = contactList.map(c => c.name());
        const roomAliasListFuture = contactList.map(c => room.alias(c));
        const roomAliasList = yield Promise.all(roomAliasListFuture);
        const mentionList = contactNameList.map((name, i) => roomAliasList[i] ? roomAliasList[i] : name);
        const mentionText = '@' + mentionList.join(' @');
        return mentionText;
    });
}
exports.getAtNameText = getAtNameText;
//# sourceMappingURL=mustache-view.js.map