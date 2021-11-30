"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnRoom = void 0;
const main_1 = require("../main");
function handleJoin() { }
function handleTopic() { }
function handleLeave() { }
function OnRoom(type, params) {
    return (target, propertyKey, descriptor) => {
        (0, main_1.defineMetadata)('OnRoom', (room) => {
        });
    };
}
exports.OnRoom = OnRoom;
//# sourceMappingURL=OnRoom.js.map