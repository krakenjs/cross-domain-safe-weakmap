/* @flow */

export function hasNativeWeakMap() : boolean {

    if (typeof WeakMap === 'undefined') {
        return false;
    }

    if (typeof Object.freeze === 'undefined') {
        return false;
    }

    try {

        const testWeakMap = new WeakMap();
        const testKey = {};
        const testValue = '__testvalue__';

        Object.freeze(testKey);

        testWeakMap.set(testKey, testValue);

        if (testWeakMap.get(testKey) === testValue) {
            return true;
        }

        return false;

    } catch (err) {

        return false;
    }
}
