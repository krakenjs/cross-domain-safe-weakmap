/* @flow */

import { isWindow } from './util';

let defineProperty = Object.defineProperty;
let counter = Date.now() % 1e9;

export class WeakMap {

    name : string
    keys : Array<mixed>
    values : Array<mixed>

    constructor() {
        counter += 1;
        this.name = `__weakmap_${Math.random() * 1e9 >>> 0}__${counter}`; // eslint-disable-line
        this.keys = [];
        this.values = [];
    }

    set(key : Object, value : mixed) {

        if (isWindow(key)) {
            return this.safeSet(key, value);
        }

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

    get(key : Object) : ?mixed {

        if (isWindow(key)) {
            return this.safeGet(key);
        }

        let entry = key[this.name];

        if (entry && entry[0] === key) {
            return entry[1];
        }
    }

    delete(key : Object) {

        if (isWindow(key)) {
            return this.safeDelete(key);
        }

        let entry = key[this.name];

        if (entry && entry[0] === key) {
            entry[0] = entry[1] = undefined;
        }
    }

    has(key : Object) {

        if (isWindow(key)) {
            return this.safeHas(key);
        }

        let entry = key[this.name];

        if (entry && entry[0] === key) {
            return true;
        }

        return false;
    }

    safeSet(key : Object, value : mixed) {

        let keys = this.keys;
        let values = this.values;
        let index = keys.indexOf(key);

        if (index === -1) {
            keys.push(key);
            values.push(value);
            return;
        }

        values[index] = value;
    }

    safeGet(key : Object) : ?mixed {

        let keys = this.keys;
        let index = keys.indexOf(key);

        if (index === -1) {
            return;
        }

        return this.values[index];
    }

    safeDelete(key : Object) {

        let keys = this.keys;
        let index = keys.indexOf(key);

        if (index !== -1) {
            keys.splice(index, 1);
            this.values.splice(index, 1);
        }
    }

    safeHas(key : Object) {

        return this.keys.indexOf(key) !== -1;
    }
}
