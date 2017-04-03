(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define("xdsweakmap", [], factory); else if (typeof exports === "object") exports["xdsweakmap"] = factory(); else root["xdsweakmap"] = factory();
})(this, function() {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: false
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.loaded = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.p = "";
        return __webpack_require__(0);
    }({
        0: function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var _interface = __webpack_require__("./src/interface.js");
            Object.keys(_interface).forEach(function(key) {
                if (key === "default" || key === "__esModule") return;
                Object.defineProperty(exports, key, {
                    enumerable: true,
                    get: function get() {
                        return _interface[key];
                    }
                });
            });
            var INTERFACE = _interopRequireWildcard(_interface);
            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                        }
                    }
                    newObj["default"] = obj;
                    return newObj;
                }
            }
            exports["default"] = INTERFACE;
        },
        "./src/interface.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var _weakmap = __webpack_require__("./src/weakmap.js");
            Object.defineProperty(exports, "WeakMap", {
                enumerable: true,
                get: function get() {
                    return _weakmap.WeakMap;
                }
            });
        },
        "./src/weakmap.js": function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.WeakMap = undefined;
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();
            var _util = __webpack_require__("./src/util.js");
            var _native = __webpack_require__("./src/native.js");
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }
            var defineProperty = Object.defineProperty;
            var counter = Date.now() % 1e9;
            var WeakMap = exports.WeakMap = function() {
                function WeakMap() {
                    _classCallCheck(this, WeakMap);
                    counter += 1;
                    this.name = "__weakmap_" + (Math.random() * 1e9 >>> 0) + "__" + counter;
                    if ((0, _native.hasNativeWeakMap)()) {
                        this.weakmap = new window.WeakMap();
                    }
                    this.keys = [];
                    this.values = [];
                }
                _createClass(WeakMap, [ {
                    key: "_cleanupClosedWindows",
                    value: function _cleanupClosedWindows() {
                        var weakmap = this.weakmap;
                        var keys = this.keys;
                        for (var i = 0; i < keys.length; i++) {
                            var value = keys[i];
                            if ((0, _util.isClosedWindow)(value)) {
                                if (weakmap) {
                                    weakmap["delete"](value);
                                }
                                keys.splice(i, 1);
                                this.values.splice(i, 1);
                                i -= 1;
                            }
                        }
                    }
                }, {
                    key: "set",
                    value: function set(key, value) {
                        var weakmap = this.weakmap;
                        if (weakmap) {
                            try {
                                weakmap.set(key, value);
                            } catch (err) {
                                delete this.weakmap;
                            }
                        }
                        if ((0, _util.isWindow)(key)) {
                            this._cleanupClosedWindows();
                            var keys = this.keys;
                            var values = this.values;
                            var index = keys.indexOf(key);
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
                                    value: [ key, value ],
                                    writable: true
                                });
                            }
                        }
                    }
                }, {
                    key: "get",
                    value: function get(key) {
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
                        if ((0, _util.isWindow)(key)) {
                            var keys = this.keys;
                            var index = keys.indexOf(key);
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
                    key: "delete",
                    value: function _delete(key) {
                        var weakmap = this.weakmap;
                        if (weakmap) {
                            try {
                                weakmap["delete"](key);
                            } catch (err) {
                                delete this.weakmap;
                            }
                        }
                        if ((0, _util.isWindow)(key)) {
                            this._cleanupClosedWindows();
                            var keys = this.keys;
                            var index = keys.indexOf(key);
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
                    key: "has",
                    value: function has(key) {
                        var weakmap = this.weakmap;
                        if (weakmap) {
                            try {
                                return weakmap.has(key);
                            } catch (err) {
                                delete this.weakmap;
                            }
                        }
                        if ((0, _util.isWindow)(key)) {
                            this._cleanupClosedWindows();
                            return this.keys.indexOf(key) !== -1;
                        } else {
                            var entry = key[this.name];
                            if (entry && entry[0] === key) {
                                return true;
                            }
                            return false;
                        }
                    }
                } ]);
                return WeakMap;
            }();
        },
        "./src/util.js": function(module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.isWindow = isWindow;
            exports.isClosedWindow = isClosedWindow;
            function isWindow(obj) {
                try {
                    if (obj && obj.self === obj) {
                        return true;
                    }
                } catch (err) {}
                return false;
            }
            function isClosedWindow(obj) {
                try {
                    if (obj && obj !== window && obj.closed) {
                        return true;
                    }
                } catch (err) {
                    if (err && err.message === "Call was rejected by callee.\r\n") {
                        return false;
                    }
                    return true;
                }
                return false;
            }
        },
        "./src/native.js": function(module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.hasNativeWeakMap = hasNativeWeakMap;
            function hasNativeWeakMap() {
                if (!window.WeakMap) {
                    return false;
                }
                if (!window.Object.freeze) {
                    return false;
                }
                try {
                    var testWeakMap = new window.WeakMap();
                    var testKey = {};
                    var testValue = "__testvalue__";
                    window.Object.freeze(testKey);
                    testWeakMap.set(testKey, testValue);
                    if (testWeakMap.get(testKey) === testValue) {
                        return true;
                    }
                    return false;
                } catch (err) {
                    return false;
                }
            }
        }
    });
});


//# sourceMappingURL=cross-domain-safe-weakmap.js.map