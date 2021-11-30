"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnMessage = void 0;
const main_1 = require("../main");
const wechaty_puppet_1 = require("wechaty-puppet");
const handles_1 = require("../utils/handles");
function OnMessage(type, params) {
    return (target, propertyKey, descriptor) => {
        (0, main_1.defineMetadata)('onMessage', (msg) => {
            const messageType = msg.type();
            if (type !== messageType)
                return;
            if (messageType === wechaty_puppet_1.MessageType.Text) {
                const isAvailable = (0, handles_1.handleText)(msg, params);
                if (isAvailable)
                    descriptor.value(msg);
                return;
            }
            if (messageType === wechaty_puppet_1.MessageType.Url) {
                const isAvailable = (0, handles_1.handleUrl)(msg, params);
                if (isAvailable)
                    descriptor.value(msg);
                return;
            }
            if (messageType === wechaty_puppet_1.MessageType.Recalled) {
                const isAvailable = (0, handles_1.handleRecalled)(msg, params);
                if (isAvailable)
                    descriptor.value(msg);
                return;
            }
            if (messageType === wechaty_puppet_1.MessageType.Audio) {
                const isAvailable = (0, handles_1.handleAudio)(msg, params);
                if (isAvailable)
                    descriptor.value(msg);
                return;
            }
            if (messageType === wechaty_puppet_1.MessageType.Video) {
                const isAvailable = (0, handles_1.handleVideo)(msg, params);
                if (isAvailable)
                    descriptor.value(msg);
                return;
            }
            if (messageType === wechaty_puppet_1.MessageType.Location) {
                const isAvailable = (0, handles_1.handleLocation)(msg, params);
                if (isAvailable)
                    descriptor.value(msg);
                return;
            }
            if (messageType === wechaty_puppet_1.MessageType.Image) {
                const isAvailable = (0, handles_1.handleImage)(msg, params);
                if (isAvailable)
                    descriptor.value(msg);
                return;
            }
            if (messageType === wechaty_puppet_1.MessageType.MiniProgram) {
                const isAvailable = (0, handles_1.handleMiniProgram)(msg, params);
                if (isAvailable)
                    descriptor.value(msg);
                return;
            }
        });
    };
}
exports.OnMessage = OnMessage;
//# sourceMappingURL=OnMessage.js.map