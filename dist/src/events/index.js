"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnError = exports.OnFriendship = exports.OnRoomInvite = exports.OnRoomLeave = exports.OnRoomTopic = exports.onRoomJoin = exports.OnLogin = exports.OnScan = exports.OnMessage = void 0;
const main_1 = require("../main");
var OnMessage_1 = require("./OnMessage");
Object.defineProperty(exports, "OnMessage", { enumerable: true, get: function () { return OnMessage_1.OnMessage; } });
function OnScan(target, name, descriptor) {
    (0, main_1.defineMetadata)('onScan', descriptor.value);
}
exports.OnScan = OnScan;
function OnLogin(target, name, descriptor) {
    (0, main_1.defineMetadata)('onLogin', descriptor.value);
}
exports.OnLogin = OnLogin;
function onRoomJoin(target, name, descriptor) {
    (0, main_1.defineMetadata)('onRoomJoin', descriptor.value);
}
exports.onRoomJoin = onRoomJoin;
function OnRoomTopic(target, name, descriptor) {
    (0, main_1.defineMetadata)('onRoomTopic', descriptor.value);
}
exports.OnRoomTopic = OnRoomTopic;
function OnRoomLeave(target, name, descriptor) {
    (0, main_1.defineMetadata)('onRoomLeave', descriptor.value);
}
exports.OnRoomLeave = OnRoomLeave;
function OnRoomInvite(target, name, descriptor) {
    (0, main_1.defineMetadata)('onRoomInvite', descriptor.value);
}
exports.OnRoomInvite = OnRoomInvite;
function OnFriendship(target, name, descriptor) {
    (0, main_1.defineMetadata)('friendship', descriptor.value);
}
exports.OnFriendship = OnFriendship;
function OnError(target, name, descriptor) {
    (0, main_1.defineMetadata)('onError', descriptor.value);
}
exports.OnError = OnError;
//# sourceMappingURL=index.js.map