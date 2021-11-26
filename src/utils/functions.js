"use strict";
exports.__esModule = true;
exports.isFunction = exports.isRegexp = void 0;
var util = require("util");
function isRegexp(data) {
    return util.types.isRegExp(data);
}
exports.isRegexp = isRegexp;
function isFunction(data) {
    return typeof data === 'function';
}
exports.isFunction = isFunction;
