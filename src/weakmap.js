/* @flow */

import { isWindow, isWindowClosed } from 'cross-domain-utils/src';

import { hasNativeWeakMap } from './native';
import { noop, safeIndexOf } from './util';

let defineProperty = Object.defineProperty;
let counter = Date.now() % 1e9;

export class CrossDomainSafeWeakMap<K : Object, V : mixed> {

    name : string
    weakmap : WeakMap<K, V>
    keys : Array<K>
    values : Array<V>

    constructor() {
        counter += 1;

        // eslint-disable-next-line no-bitwise
        this.name = `__weakmap_${ Math.random() * 1e9 >>> 0 }__${ counter }`;

        if (hasNativeWeakMap()) {
            try {
                this.weakmap = new window.WeakMap();
            } catch (err) {
                // pass
            }
        }

        this.keys  = [];
        this.values = [];
    }

    _cleanupClosedWindows() {

        let weakmap = this.weakmap;
        let keys = this.keys;

        for (let i = 0; i < keys.length; i++) {
            let value = keys[i];

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

    set(key : K, value : V) {

        if (!key) {
            throw new Error(`WeakMap expected key`);
        }

        let weakmap = this.weakmap;

        if (weakmap) {
            try {
                weakmap.set(key, value);
            } catch (err) {
                delete this.weakmap;
            }
        }

        if (!this.isSafeToReadWrite(key)) {

            this._cleanupClosedWindows();

            let keys = this.keys;
            let values = this.values;
            let index = safeIndexOf(keys, key);

            if (index === -1) {
                keys.push(key);
                values.push(value);
            } else {
                values[index] = value;
            }

        } else {

            let name = this.name;
            let entry = key[name];

            if (entry && entry[0] === key) {
                entry[1] = value;
            } else {
                defineProperty(key, name, {
                    value:    [ key, value ],
                    writable: true
                });
            }
        }
    }

    get(key : K) : V | void {

        if (!key) {
            throw new Error(`WeakMap expected key`);
        }

        let weakmap = this.weakmap;

        if (weakmap) {
            try {
                if (weakmap.has(key)) {
                    return weakmap.get(key);
                }
            } catch (err) {
                delete this.weakmap;
            }
        }

        if (!this.isSafeToReadWrite(key)) {

            this._cleanupClosedWindows();

            let keys = this.keys;
            let index = safeIndexOf(keys, key);

            if (index === -1) {
                return;
            }

            return this.values[index];

        } else {

            let entry = key[this.name];

            if (entry && entry[0] === key) {
                return entry[1];
            }
        }
    }

    delete(key : K) {

        if (!key) {
            throw new Error(`WeakMap expected key`);
        }

        let weakmap = this.weakmap;

        if (weakmap) {
            try {
                weakmap.delete(key);
            } catch (err) {
                delete this.weakmap;
            }
        }

        if (!this.isSafeToReadWrite(key)) {

            this._cleanupClosedWindows();

            let keys = this.keys;
            let index = safeIndexOf(keys, key);

            if (index !== -1) {
                keys.splice(index, 1);
                this.values.splice(index, 1);
            }

        } else {

            let entry = key[this.name];

            if (entry && entry[0] === key) {
                entry[0] = entry[1] = undefined;
            }
        }
    }

    has(key : K) : boolean {

        if (!key) {
            throw new Error(`WeakMap expected key`);
        }

        let weakmap = this.weakmap;

        if (weakmap) {
            try {
                return weakmap.has(key);
            } catch (err) {
                delete this.weakmap;
            }
        }

        if (!this.isSafeToReadWrite(key)) {

            this._cleanupClosedWindows();

            let index = safeIndexOf(this.keys, key);
            return index !== -1;

        } else {

            let entry = key[this.name];

            if (entry && entry[0] === key) {
                return true;
            }

            return false;
        }
    }
}
