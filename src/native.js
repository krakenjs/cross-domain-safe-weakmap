/* @flow */

export function hasNativeWeakMap() : boolean {

    if (!window.WeakMap) {
        return false;
    }

    if (!window.Object.freeze) {
        return false;
    }

    try {

        let testWeakMap = new window.WeakMap();
        let testKey = {};
        let testValue = '__testvalue__';

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
