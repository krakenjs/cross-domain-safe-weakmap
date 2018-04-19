'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasNativeWeakMap = hasNativeWeakMap;
function hasNativeWeakMap() {

    if (!window.WeakMap) {
        return false;
    }

    if (!window.Object.freeze) {
        return false;
    }

    try {

        var testWeakMap = new window.WeakMap();
        var testKey = {};
        var testValue = '__testvalue__';

        window.Object.freeze(testKey);

        testWeakMap.set(testKey, testValue);

        if (testWeakMap.get(testKey) === testValue) {
            return true;
        }

        return false;
    } catch (err) {

        return false;
    }
}