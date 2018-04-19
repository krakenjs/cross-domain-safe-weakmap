'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _weakmap = require('./weakmap');

Object.defineProperty(exports, 'WeakMap', {
  enumerable: true,
  get: function get() {
    return _weakmap.CrossDomainSafeWeakMap;
  }
});