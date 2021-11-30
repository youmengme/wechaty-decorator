"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleImage = exports.handleLocation = exports.handleVideo = exports.handleAudio = exports.handleRecalled = exports.handleMiniProgram = exports.handleUrl = exports.handleText = void 0;
const functions_1 = require("./functions");
function handleText(msg, params) {
    if (!params)
        return true;
    if ((0, functions_1.isRegexp)(params)) {
        return params.test(msg.text());
    }
    if ((0, functions_1.isFunction)(params)) {
        return params(msg);
    }
    return false;
}
exports.handleText = handleText;
function handleUrl(msg, params) {
    if (!params)
        return true;
    if ((0, functions_1.isRegexp)(params)) {
        return params.test(msg.text());
    }
    if ((0, functions_1.isFunction)(params)) {
        return params(msg);
    }
    return false;
}
exports.handleUrl = handleUrl;
function handleMiniProgram(msg, params) {
    if (!params)
        return true;
    if ((0, functions_1.isFunction)(params)) {
        return params(msg);
    }
    return false;
}
exports.handleMiniProgram = handleMiniProgram;
function handleRecalled(data, params) {
    return true;
}
exports.handleRecalled = handleRecalled;
function handleAudio(data, params) {
    return true;
}
exports.handleAudio = handleAudio;
function handleVideo(data, params) {
    return true;
}
exports.handleVideo = handleVideo;
function handleLocation(data, params) {
    return true;
}
exports.handleLocation = handleLocation;
function handleImage(data, params) {
    return true;
}
exports.handleImage = handleImage;
//# sourceMappingURL=handles.js.map