"use strict";
exports.__esModule = true;
exports.handleImage = exports.handleLocation = exports.handleVideo = exports.handleAudio = exports.handleRecalled = exports.handleUrl = exports.handleText = void 0;
var functions_1 = require("./functions");
function handleText(msg, params) {
    if (!params)
        return true;
    if (functions_1.isRegexp(params)) {
        return params.test(msg.text());
    }
    if (functions_1.isFunction(params)) {
        return params(msg);
    }
    return false;
}
exports.handleText = handleText;
function handleUrl(msg, params) {
    if (!params)
        return true;
    if (functions_1.isRegexp(params)) {
        return params.test(msg.text());
    }
    if (functions_1.isFunction(params)) {
        return params(msg);
    }
    return false;
}
exports.handleUrl = handleUrl;
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
