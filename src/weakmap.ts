import { isWindow, isWindowClosed } from 'cross-domain-utils';

import { hasNativeWeakMap } from './native';
import { noop, safeIndexOf } from './util';

export class CrossDomainSafeWeakMap<K extends Record<string, unknown>, V> {
    name : string;
    weakmap : WeakMap<K, V> | null | undefined;
    keys : Array<K>;
    values : Array<V>;

    constructor() {
        // eslint-disable-next-line no-bitwise
        this.name = `__weakmap_${ (Math.random() * 1e9) >>> 0 }__`;

        if (hasNativeWeakMap()) {
            try {
                this.weakmap = new WeakMap();
            } catch (err) {
                // pass
            }
        }

        this.keys = [];
        this.values = [];
    }

    _cleanupClosedWindows() : void {
        const weakmap = this.weakmap;
        const keys = this.keys;

        for (let i = 0; i < keys.length; i++) {
            const value = keys[i];

            // @ts-ignore `isWindowClosed` takes window which V is not
            if (isWindow(value) && isWindowClosed(value)) {
                if (weakmap) {
                    try {
                        weakmap.delete(value);
                    } catch (err) {
                        // pass
                    }
                }

                keys.splice(i, 1);
                this.values.splice(i, 1);
                i -= 1;
            }
        }
    }

    isSafeToReadWrite(key : K) : boolean {
        if (isWindow(key)) {
            return false;
        }

        try {
            noop(key && key.self);
            noop(key && key[this.name]);
        } catch (err) {
            return false;
        }

        return true;
    }

    set(key : K, value : V) : void {
        if (!key) {
            throw new Error(`WeakMap expected key`);
        }

        const weakmap = this.weakmap;

        if (weakmap) {
            try {
                weakmap.set(key, value);
            } catch (err) {
                delete this.weakmap;
            }
        }

        if (this.isSafeToReadWrite(key)) {
            try {
                const name = this.name;
                const entry = key[name];

                // @ts-ignore
                if (entry && entry[0] === key) {
                    // @ts-ignore
                    entry[1] = value;
                } else {
                    Object.defineProperty(key, name, {
                        value:    [ key, value ],
                        writable: true
                    });
                }

                return;
            } catch (err) {
                // pass
            }
        }

        this._cleanupClosedWindows();

        const keys = this.keys;
        const values = this.values;
        const index = safeIndexOf(keys, key);

        if (index === -1) {
            keys.push(key);
            values.push(value);
        } else {
            values[index] = value;
        }
    }

    get(key : K) : V | undefined {
        if (!key) {
            throw new Error(`WeakMap expected key`);
        }

        const weakmap = this.weakmap;

        if (weakmap) {
            try {
                if (weakmap.has(key)) {
                    return weakmap.get(key);
                }
            } catch (err) {
                delete this.weakmap;
            }
        }

        if (this.isSafeToReadWrite(key)) {
            try {
                const entry = key[this.name];

                // @ts-ignore
                if (entry && entry[0] === key) {
                    // @ts-ignore
                    return entry[1];
                }

                return;
            } catch (err) {
                // pass
            }
        }

        this._cleanupClosedWindows();

        const keys = this.keys;
        const index = safeIndexOf(keys, key);

        if (index === -1) {
            return;
        }

        return this.values[index];
    }

    delete(key : K) : void {
        if (!key) {
            throw new Error(`WeakMap expected key`);
        }

        const weakmap = this.weakmap;

        if (weakmap) {
            try {
                weakmap.delete(key);
            } catch (err) {
                delete this.weakmap;
            }
        }

        if (this.isSafeToReadWrite(key)) {
            try {
                const entry = key[this.name];

                // @ts-ignore
                if (entry && entry[0] === key) {
                    // @ts-ignore
                    entry[0] = entry[1] = undefined;
                }
            } catch (err) {
                // pass
            }
        }

        this._cleanupClosedWindows();

        const keys = this.keys;
        const index = safeIndexOf(keys, key);

        if (index !== -1) {
            keys.splice(index, 1);
            this.values.splice(index, 1);
        }
    }

    has(key : K) : boolean {
        if (!key) {
            throw new Error(`WeakMap expected key`);
        }

        const weakmap = this.weakmap;

        if (weakmap) {
            try {
                if (weakmap.has(key)) {
                    return true;
                }
            } catch (err) {
                delete this.weakmap;
            }
        }

        if (this.isSafeToReadWrite(key)) {
            try {
                const entry = key[this.name];

                // @ts-ignore
                if (entry && entry[0] === key) {
                    return true;
                }

                return false;
            } catch (err) {
                // pass
            }
        }

        this._cleanupClosedWindows();

        const index = safeIndexOf(this.keys, key);
        return index !== -1;
    }

    getOrSet(key : K, getter : () => V) : V {
        if (this.has(key)) {
            // @ts-ignore
            return this.get(key);
        }

        const value = getter();
        this.set(key, value);
        return value;
    }
}
