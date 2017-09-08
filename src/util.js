/* @flow */

export function safeIndexOf<T>(collection : Array<T>, item : T) {
    for (let i = 0; i < collection.length; i++) {

        try {
            if (collection[i] === item) {
                return i;
            }
        } catch (err) {
            // pass
        }
    }

    return -1;
}

export function noop(...args : Array<mixed>) {
    // pass
}
