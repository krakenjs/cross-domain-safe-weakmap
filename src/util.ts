export function safeIndexOf<T>(collection: ReadonlyArray<T>, item: T): number {
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

export function noop(...args: ReadonlyArray<unknown>): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    // pass
}
