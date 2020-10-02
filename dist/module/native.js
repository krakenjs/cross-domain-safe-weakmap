export function hasNativeWeakMap() {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  if (typeof Object.freeze === 'undefined') {
    return false;
  }

  try {
    var testWeakMap = new WeakMap();
    var testKey = {};
    var testValue = '__testvalue__';
    Object.freeze(testKey);
    testWeakMap.set(testKey, testValue);

    if (testWeakMap.get(testKey) === testValue) {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
}