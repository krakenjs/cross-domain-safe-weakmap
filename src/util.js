/* @flow */

export function isWindow(obj : Object) {

    try {
        if (obj && obj.self === obj) {
            return true;
        }
    } catch (err) {
        // pass
    }

    return false;
}
