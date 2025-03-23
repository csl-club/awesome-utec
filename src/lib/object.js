"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = exports.maxKeyByValue = void 0;
var maxKeyByValue = function (obj) {
    var entries = Object.entries(obj);
    if (entries.length === 0) {
        throw new Error('object cannot be empty');
    }
    entries.sort(function (a, b) { return b[1] - a[1]; });
    return entries[0][0];
};
exports.maxKeyByValue = maxKeyByValue;
var isEmpty = function (obj) {
    for (var prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }
    return true;
};
exports.isEmpty = isEmpty;
