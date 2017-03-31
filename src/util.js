/* @flow */

let windows = [];

export function isWindow(obj : Object) {

    if (windows.indexOf(obj) !== -1) {
        return true;
    }

    try {
        if (obj && obj.self === obj) {
            windows.push(obj);
            return true;
        }
    } catch (err) {
        // pass
    }

    return false;
}
