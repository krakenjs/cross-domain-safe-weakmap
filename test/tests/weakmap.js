/* @flow */

import { WeakMap } from 'src/interface';

function getWindow() : Object {
    let win = {};
    win.self = win;
    win.closed = false;
    win.parent = win;
    win.top = win;
    return win;
}

describe('weakmap standard cases', () => {

    it('should set and get a key', () => {

        let map = new WeakMap();
        let obj = {};
        let val = 'foo';

        map.set(obj, val);

        let result = map.get(obj);

        if (result !== val) {
            throw new Error(`Expected ${result || ''} to be '${val}'`);
        }
    });

    it('should get a non-existant key', () => {

        let map = new WeakMap();
        let obj = {};

        let result = map.get(obj);

        if (result !== undefined) {
            throw new Error(`Expected result to be undefined`);
        }
    });


    it('should set over an existing key, and get a key', () => {

        let map = new WeakMap();
        let obj = {};
        let val1 = 'foo';
        let val2 = 'bar';

        map.set(obj, val1);
        map.set(obj, val2);

        let result = map.get(obj);

        if (result !== val2) {
            throw new Error(`Expected ${result || ''} to be '${val2}'`);
        }
    });

    it('should set and check for a key', () => {

        let map = new WeakMap();
        let obj = {};
        let val = 'foo';

        map.set(obj, val);

        let result = map.has(obj);

        if (!result) {
            throw new Error(`Expected ${result.toString()} to be true`);
        }
    });

    it('should check for a non-existant key', () => {

        let map = new WeakMap();
        let obj = {};

        let result = map.has(obj);

        if (result) {
            throw new Error(`Expected ${result.toString()} to be false`);
        }
    });

    it('should set, delete, and check for a key', () => {

        let map = new WeakMap();
        let obj = {};
        let val = 'foo';

        map.set(obj, val);
        map.delete(obj);

        let result = map.has(obj);

        if (result) {
            throw new Error(`Expected ${result.toString()} to be false`);
        }
    });
});

describe('weakmap cross-origin cases', () => {

    let win = getWindow();

    it('should set and get a key', () => {

        let map = new WeakMap();
        let obj = win;
        let val = 'foo';

        map.set(obj, val);

        let result = map.get(obj);

        if (result !== val) {
            throw new Error(`Expected ${result || ''} to be '${val}'`);
        }
    });

    it('should get a non-existant key', () => {

        let map = new WeakMap();
        let obj = win;

        let result = map.get(obj);

        if (result !== undefined) {
            throw new Error(`Expected result to be undefined`);
        }
    });

    it('should set over an existing key, and get a key', () => {

        let map = new WeakMap();
        let obj = win;
        let val1 = 'foo';
        let val2 = 'bar';

        map.set(obj, val1);
        map.set(obj, val2);

        let result = map.get(obj);

        if (result !== val2) {
            throw new Error(`Expected ${result || ''} to be '${val2}'`);
        }
    });

    it('should set and check for a key', () => {

        let map = new WeakMap();
        let obj = win;
        let val = 'foo';

        map.set(obj, val);

        let result = map.has(obj);

        if (!result) {
            throw new Error(`Expected ${result.toString()} to be true`);
        }
    });

    it('should check for a non-existant key', () => {

        let map = new WeakMap();
        let obj = win;

        let result = map.has(obj);

        if (result) {
            throw new Error(`Expected ${result.toString()} to be false`);
        }
    });

    it('should set, delete, and check for a key', () => {

        let map = new WeakMap();
        let obj = win;
        let val = 'foo';

        map.set(obj, val);
        map.delete(obj);

        let result = map.has(obj);

        if (result) {
            throw new Error(`Expected ${result.toString()} to be false`);
        }
    });
});

describe('weakmap cross-origin cases with IE erroring window', () => {

    let win = getWindow();

    // $FlowFixMe
    Object.defineProperty(win, 'self', {
        get() {
            throw new Error("Rargh can't do that I'm IE ph34r me"); // eslint-disable-line
        }
    });

    it('should set and get a key', () => {

        let map = new WeakMap();
        let obj = win;
        let val = 'foo';

        map.set(obj, val);

        let result = map.get(obj);

        if (result !== val) {
            throw new Error(`Expected ${result || ''} to be '${val}'`);
        }
    });

    it('should get a non-existant key', () => {

        let map = new WeakMap();
        let obj = win;

        let result = map.get(obj);

        if (result !== undefined) {
            throw new Error(`Expected result to be undefined`);
        }
    });

    it('should set over an existing key, and get a key', () => {

        let map = new WeakMap();
        let obj = win;
        let val1 = 'foo';
        let val2 = 'bar';

        map.set(obj, val1);
        map.set(obj, val2);

        let result = map.get(obj);

        if (result !== val2) {
            throw new Error(`Expected ${result || ''} to be '${val2}'`);
        }
    });

    it('should set and check for a key', () => {

        let map = new WeakMap();
        let obj = win;
        let val = 'foo';

        map.set(obj, val);

        let result = map.has(obj);

        if (!result) {
            throw new Error(`Expected ${result.toString()} to be true`);
        }
    });

    it('should check for a non-existant key', () => {

        let map = new WeakMap();
        let obj = win;

        let result = map.has(obj);

        if (result) {
            throw new Error(`Expected ${result.toString()} to be false`);
        }
    });

    it('should set, delete, and check for a key', () => {

        let map = new WeakMap();
        let obj = win;
        let val = 'foo';

        map.set(obj, val);
        map.delete(obj);

        let result = map.has(obj);

        if (result) {
            throw new Error(`Expected ${result.toString()} to be false`);
        }
    });
});

describe('weakmap standard cases with no native WeakMap', () => {

    it('should set and get a key', () => {

        let weakMap = window.WeakMap;
        delete window.WeakMap;
        let map = new WeakMap();
        window.WeakMap = weakMap;

        let obj = {};
        let val = 'foo';

        map.set(obj, val);

        let result = map.get(obj);

        if (result !== val) {
            throw new Error(`Expected ${result || ''} to be '${val}'`);
        }
    });

    it('should get a non-existant key', () => {

        let weakMap = window.WeakMap;
        delete window.WeakMap;
        let map = new WeakMap();
        window.WeakMap = weakMap;

        let obj = {};

        let result = map.get(obj);

        if (result !== undefined) {
            throw new Error(`Expected result to be undefined`);
        }
    });


    it('should set over an existing key, and get a key', () => {

        let weakMap = window.WeakMap;
        delete window.WeakMap;
        let map = new WeakMap();
        window.WeakMap = weakMap;

        let obj = {};
        let val1 = 'foo';
        let val2 = 'bar';

        map.set(obj, val1);
        map.set(obj, val2);

        let result = map.get(obj);

        if (result !== val2) {
            throw new Error(`Expected ${result || ''} to be '${val2}'`);
        }
    });

    it('should set and check for a key', () => {

        let weakMap = window.WeakMap;
        delete window.WeakMap;
        let map = new WeakMap();
        window.WeakMap = weakMap;

        let obj = {};
        let val = 'foo';

        map.set(obj, val);

        let result = map.has(obj);

        if (!result) {
            throw new Error(`Expected ${result.toString()} to be true`);
        }
    });

    it('should check for a non-existant key', () => {

        let weakMap = window.WeakMap;
        delete window.WeakMap;
        let map = new WeakMap();
        window.WeakMap = weakMap;

        let obj = {};

        let result = map.has(obj);

        if (result) {
            throw new Error(`Expected ${result.toString()} to be false`);
        }
    });

    it('should set, delete, and check for a key', () => {

        let weakMap = window.WeakMap;
        delete window.WeakMap;
        let map = new WeakMap();
        window.WeakMap = weakMap;

        let obj = {};
        let val = 'foo';

        map.set(obj, val);
        map.delete(obj);

        let result = map.has(obj);

        if (result) {
            throw new Error(`Expected ${result.toString()} to be false`);
        }
    });
});

describe('weakmap cross-origin cases with no native WeakMap', () => {

    let win = getWindow();

    it('should set and get a key', () => {

        let weakMap = window.WeakMap;
        delete window.WeakMap;
        let map = new WeakMap();
        window.WeakMap = weakMap;

        let obj = win;
        let val = 'foo';

        map.set(obj, val);

        let result = map.get(obj);

        if (result !== val) {
            throw new Error(`Expected ${result || ''} to be '${val}'`);
        }
    });

    it('should get a non-existant key', () => {

        let weakMap = window.WeakMap;
        delete window.WeakMap;
        let map = new WeakMap();
        window.WeakMap = weakMap;

        let obj = win;

        let result = map.get(obj);

        if (result !== undefined) {
            throw new Error(`Expected result to be undefined`);
        }
    });

    it('should set over an existing key, and get a key', () => {

        let weakMap = window.WeakMap;
        delete window.WeakMap;
        let map = new WeakMap();
        window.WeakMap = weakMap;

        let obj = win;
        let val1 = 'foo';
        let val2 = 'bar';

        map.set(obj, val1);
        map.set(obj, val2);

        let result = map.get(obj);

        if (result !== val2) {
            throw new Error(`Expected ${result || ''} to be '${val2}'`);
        }
    });

    it('should set and check for a key', () => {

        let weakMap = window.WeakMap;
        delete window.WeakMap;
        let map = new WeakMap();
        window.WeakMap = weakMap;

        let obj = win;
        let val = 'foo';

        map.set(obj, val);

        let result = map.has(obj);

        if (!result) {
            throw new Error(`Expected ${result.toString()} to be true`);
        }
    });

    it('should check for a non-existant key', () => {

        let weakMap = window.WeakMap;
        delete window.WeakMap;
        let map = new WeakMap();
        window.WeakMap = weakMap;

        let obj = win;

        let result = map.has(obj);

        if (result) {
            throw new Error(`Expected ${result.toString()} to be false`);
        }
    });

    it('should set, delete, and check for a key', () => {

        let weakMap = window.WeakMap;
        delete window.WeakMap;
        let map = new WeakMap();
        window.WeakMap = weakMap;

        let obj = win;
        let val = 'foo';

        map.set(obj, val);
        map.delete(obj);

        let result = map.has(obj);

        if (result) {
            throw new Error(`Expected ${result.toString()} to be false`);
        }
    });
});
