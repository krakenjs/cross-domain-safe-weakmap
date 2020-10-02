/* @flow */

export function safeIndexOf<T>(collection : $ReadOnlyArray<T>, item : T) : number {
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

// eslint-disable-next-line no-unused-vars
export function noop(...args : $ReadOnlyArray<mixed>) {
    // pass
}
