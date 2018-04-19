'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CrossDomainSafeWeakMap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _src = require('cross-domain-utils/src');

var _native = require('./native');

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defineProperty = Object.defineProperty;
var counter = Date.now() % 1e9;

var CrossDomainSafeWeakMap = exports.CrossDomainSafeWeakMap = function () {
    function CrossDomainSafeWeakMap() {
        _classCallCheck(this, CrossDomainSafeWeakMap);

        counter += 1;

        // eslint-disable-next-line no-bitwise
        this.name = '__weakmap_' + (Math.random() * 1e9 >>> 0) + '__' + counter;

        if ((0, _native.hasNativeWeakMap)()) {
            try {
                this.weakmap = new window.WeakMap();
            } catch (err) {
                // pass
            }
        }

        this.keys = [];
        this.values = [];
    }

    _createClass(CrossDomainSafeWeakMap, [{
        key: '_cleanupClosedWindows',
        value: function _cleanupClosedWindows() {

            var weakmap = this.weakmap;
            var keys = this.keys;

            for (var i = 0; i < keys.length; i++) {
                var value = keys[i];

                if ((0, _src.isWindow)(value) && (0, _src.isWindowClosed)(value)) {

                    if (weakmap) {
                        try {
                            weakmap['delete'](value);
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
    }, {
        key: 'isSafeToReadWrite',
        value: function isSafeToReadWrite(key) {

            if ((0, _src.isWindow)(key)) {
                return false;
            }

            try {
                (0, _util.noop)(key && key.self);
                (0, _util.noop)(key && key[this.name]);
            } catch (err) {
                return false;
            }

            return true;
        }
    }, {
        key: 'set',
        value: function set(key, value) {

            if (!key) {
                throw new Error('WeakMap expected key');
            }

            var weakmap = this.weakmap;

            if (weakmap) {
                try {
                    weakmap.set(key, value);
                } catch (err) {
                    delete this.weakmap;
                }
            }

            if (!this.isSafeToReadWrite(key)) {

                this._cleanupClosedWindows();

                var keys = this.keys;
                var values = this.values;
                var index = (0, _util.safeIndexOf)(keys, key);

                if (index === -1) {
                    keys.push(key);
                    values.push(value);
                } else {
                    values[index] = value;
                }
            } else {

                var name = this.name;
                var entry = key[name];

                if (entry && entry[0] === key) {
                    entry[1] = value;
                } else {
                    defineProperty(key, name, {
                        value: [key, value],
                        writable: true
                    });
                }
            }
        }
    }, {
        key: 'get',
        value: function get(key) {

            if (!key) {
                throw new Error('WeakMap expected key');
            }

            var weakmap = this.weakmap;

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

                var keys = this.keys;
                var index = (0, _util.safeIndexOf)(keys, key);

                if (index === -1) {
                    return;
                }

                return this.values[index];
            } else {

                var entry = key[this.name];

                if (entry && entry[0] === key) {
                    return entry[1];
                }
            }
        }
    }, {
        key: 'delete',
        value: function _delete(key) {

            if (!key) {
                throw new Error('WeakMap expected key');
            }

            var weakmap = this.weakmap;

            if (weakmap) {
                try {
                    weakmap['delete'](key);
                } catch (err) {
                    delete this.weakmap;
                }
            }

            if (!this.isSafeToReadWrite(key)) {

                this._cleanupClosedWindows();

                var keys = this.keys;
                var index = (0, _util.safeIndexOf)(keys, key);

                if (index !== -1) {
                    keys.splice(index, 1);
                    this.values.splice(index, 1);
                }
            } else {

                var entry = key[this.name];

                if (entry && entry[0] === key) {
                    entry[0] = entry[1] = undefined;
                }
            }
        }
    }, {
        key: 'has',
        value: function has(key) {

            if (!key) {
                throw new Error('WeakMap expected key');
            }

            var weakmap = this.weakmap;

            if (weakmap) {
                try {
                    return weakmap.has(key);
                } catch (err) {
                    delete this.weakmap;
                }
            }

            if (!this.isSafeToReadWrite(key)) {

                this._cleanupClosedWindows();

                var index = (0, _util.safeIndexOf)(this.keys, key);
                return index !== -1;
            } else {

                var entry = key[this.name];

                if (entry && entry[0] === key) {
                    return true;
                }

                return false;
            }
        }
    }]);

    return CrossDomainSafeWeakMap;
}();