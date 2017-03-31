
export let WeakMap;

if (window.WeakMap) {
    WeakMap = window.WeakMap;
} else {
    WeakMap = require('./weakmap').WeakMap;
}
