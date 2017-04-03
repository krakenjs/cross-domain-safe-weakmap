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

export function isClosedWindow(obj : Object) {

    try {
        if (obj && obj !== window && obj.closed) {
            return true;
        }
    } catch (err) {

        if (err && err.message === 'Call was rejected by callee.\r\n') {
            return false;
        }

        return true;
    }

    return false;
}
