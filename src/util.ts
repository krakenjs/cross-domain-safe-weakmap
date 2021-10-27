export function safeIndexOf<T>(collection : ReadonlyArray<T>, item : T) : number {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function noop(...args : ReadonlyArray<unknown>) : void {
    // pass
}
