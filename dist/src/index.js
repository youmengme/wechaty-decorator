"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wechaty = exports.VERSION = void 0;
const package_json_1 = require("../package.json");
const wechaty_1 = __importDefault(require("wechaty"));
exports.wechaty = wechaty_1.default;
__exportStar(require("wechaty-puppet"), exports);
__exportStar(require("./main"), exports);
__exportStar(require("./events"), exports);
exports.VERSION = package_json_1.version;
//# sourceMappingURL=index.js.map