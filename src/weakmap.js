/* @flow */

import { isWindow } from './util';
import { hasNativeWeakMap } from './native';

let defineProperty = Object.defineProperty;
let counter = Date.now() % 1e9;

export class WeakMap {

    name : string
    weakmap : WeakMap
    keys : Array<mixed>
    values : Array<mixed>

    constructor() {
        counter += 1;
        this.name = `__weakmap_${Math.random() * 1e9 >>> 0}__${counter}`; // eslint-disable-line

        if (hasNativeWeakMap()) {
            this.weakmap = new window.WeakMap();
        }

        this.keys = [];
        this.values = [];
    }

    set(key : Object, value : mixed) {

        let weakmap = this.weakmap;

        if (weakmap) {
            try {
                weakmap.set(key, value);
            } catch (err) {
                delete this.weakmap;
            }
        }

        if (isWindow(key)) {

            let keys = this.keys;
            let values = this.values;
            let index = keys.indexOf(key);

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
                    value: [ key, value ],
                    writable: true
                });
            }
        }
    }

    get(key : Object) : ?mixed {

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

        if (isWindow(key)) {

            let keys = this.keys;
            let index = keys.indexOf(key);

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

    delete(key : Object) {

        let weakmap = this.weakmap;

        if (weakmap) {
            try {
                weakmap.delete(key);
            } catch (err) {
                delete this.weakmap;
            }
        }

        if (isWindow(key)) {

            let keys = this.keys;
            let index = keys.indexOf(key);

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

    has(key : Object) {

        let weakmap = this.weakmap;

        if (weakmap) {
            try {
                return weakmap.has(key);
            } catch (err) {
                delete this.weakmap;
            }
        }

        if (isWindow(key)) {

            return this.keys.indexOf(key) !== -1;

        } else {

            let entry = key[this.name];

            if (entry && entry[0] === key) {
                return true;
            }

            return false;
        }
    }
}
