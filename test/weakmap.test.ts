import { describe, it } from "vitest";

import { WeakMap } from "../src";

function getWindow(): Record<string, unknown> {
  const win: Record<string, unknown> = {};
  win.self = win;
  win.closed = false;
  win.parent = win;
  win.top = win;
  return win;
}

describe("weakmap standard cases", () => {
  it("should set and get a key", () => {
    const map = new WeakMap<Record<string, unknown>, string>();
    const obj = {};
    const val = "foo";
    map.set(obj, val);
    const result = map.get(obj);

    if (!result) {
      throw new Error(`Result is undefined`);
    }

    if (result !== val) {
      throw new Error(`Expected ${result} to be '${val}'`);
    }
  });

  it("should get a non-existant key", () => {
    const map = new WeakMap();
    const obj = {};
    const result = map.get(obj);

    if (result !== undefined) {
      throw new Error(`Expected result to be undefined`);
    }
  });

  it("should set over an existing key, and get a key", () => {
    const map = new WeakMap<Record<string, unknown>, string>();
    const obj = {};
    const val1 = "foo";
    const val2 = "bar";
    map.set(obj, val1);
    map.set(obj, val2);
    const result = map.get(obj);

    if (!result) {
      throw new Error(`Result is undefined`);
    }

    if (result !== val2) {
      throw new Error(`Expected ${result} to be '${val2}'`);
    }
  });

  it("should set and check for a key", () => {
    const map = new WeakMap<Record<string, unknown>, string>();
    const obj = {};
    const val = "foo";
    map.set(obj, val);
    const result = map.has(obj);

    if (!result) {
      throw new Error(`Expected result to be truthy`);
    }
  });

  it("should check for a non-existant key", () => {
    const map = new WeakMap();
    const obj = {};
    const result = map.has(obj);

    if (result) {
      throw new Error(`Expected ${result.toString()} to be false`);
    }
  });

  it("should set, delete, and check for a key", () => {
    const map = new WeakMap();
    const obj = {};
    const val = "foo";
    map.set(obj, val);
    map.delete(obj);
    const result = map.has(obj);

    if (result) {
      throw new Error(`Expected ${result.toString()} to be false`);
    }
  });
});

describe("weakmap cross-origin cases", () => {
  const win = getWindow();

  it("should set and get a key", () => {
    const map = new WeakMap<Record<string, unknown>, string>();
    const obj = win;
    const val = "foo";
    map.set(obj, val);
    const result = map.get(obj);

    if (!result) {
      throw new Error(`Result is undefined`);
    }

    if (result !== val) {
      throw new Error(`Expected ${result || ""} to be '${val}'`);
    }
  });

  it("should get a non-existant key", () => {
    const map = new WeakMap();
    const obj = win;
    const result = map.get(obj);

    if (result !== undefined) {
      throw new Error(`Expected result to be undefined`);
    }
  });

  it("should set over an existing key, and get a key", () => {
    const map = new WeakMap<Record<string, unknown>, string>();
    const obj = win;
    const val1 = "foo";
    const val2 = "bar";
    map.set(obj, val1);
    map.set(obj, val2);
    const result = map.get(obj);

    if (!result) {
      throw new Error(`Result is undefined`);
    }

    if (result !== val2) {
      throw new Error(`Expected ${result} to be '${val2}'`);
    }
  });

  it("should set and check for a key", () => {
    const map = new WeakMap();
    const obj = win;
    const val = "foo";
    map.set(obj, val);
    const result = map.has(obj);

    if (!result) {
      throw new Error(`Expected ${result.toString()} to be true`);
    }
  });

  it("should check for a non-existant key", () => {
    const map = new WeakMap();
    const obj = win;
    const result = map.has(obj);

    if (result) {
      throw new Error(`Expected ${result.toString()} to be false`);
    }
  });

  it("should set, delete, and check for a key", () => {
    const map = new WeakMap();
    const obj = win;
    const val = "foo";
    map.set(obj, val);
    map.delete(obj);
    const result = map.has(obj);

    if (result) {
      throw new Error(`Expected ${result.toString()} to be false`);
    }
  });
});

describe("weakmap cross-origin cases with IE erroring window", () => {
  const win = getWindow();
  Object.defineProperty(win, "self", {
    get() {
      throw new Error("Rargh can't do that I'm IE ph34r me");
    },
  });

  it("should set and get a key", () => {
    const map = new WeakMap<Record<string, unknown>, string>();
    const obj = win;
    const val = "foo";
    map.set(obj, val);
    const result = map.get(obj);
    if (!result) {
      throw new Error(`Result is undefined`);
    }

    if (result !== val) {
      throw new Error(`Expected ${result} to be '${val}'`);
    }
  });

  it("should get a non-existant key", () => {
    const map = new WeakMap();
    const obj = win;
    const result = map.get(obj);

    if (result !== undefined) {
      throw new Error(`Expected result to be undefined`);
    }
  });

  it("should set over an existing key, and get a key", () => {
    const map = new WeakMap<Record<string, unknown>, string>();
    const obj = win;
    const val1 = "foo";
    const val2 = "bar";
    map.set(obj, val1);
    map.set(obj, val2);
    const result = map.get(obj);

    if (!result) {
      throw new Error(`Result is undefined`);
    }

    if (result !== val2) {
      throw new Error(`Expected ${result} to be '${val2}'`);
    }
  });

  it("should set and check for a key", () => {
    const map = new WeakMap();
    const obj = win;
    const val = "foo";
    map.set(obj, val);
    const result = map.has(obj);

    if (!result) {
      throw new Error(`Expected ${result.toString()} to be true`);
    }
  });

  it("should check for a non-existant key", () => {
    const map = new WeakMap();
    const obj = win;
    const result = map.has(obj);

    if (result) {
      throw new Error(`Expected ${result.toString()} to be false`);
    }
  });

  it("should set, delete, and check for a key", () => {
    const map = new WeakMap();
    const obj = win;
    const val = "foo";
    map.set(obj, val);
    map.delete(obj);
    const result = map.has(obj);

    if (result) {
      throw new Error(`Expected ${result.toString()} to be false`);
    }
  });
});

describe("weakmap standard cases with no native WeakMap", () => {
  it("should set and get a key", () => {
    const weakMap = window.WeakMap;
    // @ts-expect-error deleting a property we added from window
    delete window.WeakMap;
    const map = new WeakMap<Record<string, unknown>, string>();
    window.WeakMap = weakMap;
    const obj = {};
    const val = "foo";
    map.set(obj, val);
    const result = map.get(obj);

    if (!result) {
      throw new Error(`Result is undefined`);
    }

    if (result !== val) {
      throw new Error(`Expected ${result} to be '${val}'`);
    }
  });

  it("should get a non-existant key", () => {
    const weakMap = window.WeakMap;
    // @ts-expect-error deleting a property we added from window
    delete window.WeakMap;
    const map = new WeakMap();
    window.WeakMap = weakMap;
    const obj = {};
    const result = map.get(obj);

    if (result !== undefined) {
      throw new Error(`Expected result to be undefined`);
    }
  });

  it("should set over an existing key, and get a key", () => {
    const weakMap = window.WeakMap;
    // @ts-expect-error deleting a property we added from window
    delete window.WeakMap;
    const map = new WeakMap<Record<string, unknown>, string>();
    window.WeakMap = weakMap;
    const obj = {};
    const val1 = "foo";
    const val2 = "bar";
    map.set(obj, val1);
    map.set(obj, val2);
    const result = map.get(obj);

    if (!result) {
      throw new Error(`Result is undefined`);
    }

    if (result !== val2) {
      throw new Error(`Expected ${result} to be '${val2}'`);
    }
  });

  it("should set and check for a key", () => {
    const weakMap = window.WeakMap;
    // @ts-expect-error deleting a property we added from window
    delete window.WeakMap;
    const map = new WeakMap();
    window.WeakMap = weakMap;
    const obj = {};
    const val = "foo";
    map.set(obj, val);
    const result = map.has(obj);

    if (!result) {
      throw new Error(`Expected ${result.toString()} to be true`);
    }
  });

  it("should check for a non-existant key", () => {
    const weakMap = window.WeakMap;
    // @ts-expect-error deleting a property we added from window
    delete window.WeakMap;
    const map = new WeakMap();
    window.WeakMap = weakMap;
    const obj = {};
    const result = map.has(obj);

    if (result) {
      throw new Error(`Expected ${result.toString()} to be false`);
    }
  });

  it("should set, delete, and check for a key", () => {
    const weakMap = window.WeakMap;
    // @ts-expect-error deleting a property we added from window
    delete window.WeakMap;
    const map = new WeakMap();
    window.WeakMap = weakMap;
    const obj = {};
    const val = "foo";
    map.set(obj, val);
    map.delete(obj);
    const result = map.has(obj);

    if (result) {
      throw new Error(`Expected ${result.toString()} to be false`);
    }
  });
});

describe("weakmap cross-origin cases with no native WeakMap", () => {
  const win = getWindow();

  it("should set and get a key", () => {
    const weakMap = window.WeakMap;
    // @ts-expect-error deleting a property we added from window
    delete window.WeakMap;
    const map = new WeakMap<Record<string, unknown>, string>();
    window.WeakMap = weakMap;
    const obj = win;
    const val = "foo";
    map.set(obj, val);
    const result = map.get(obj);

    if (!result) {
      throw new Error(`Result is undefined`);
    }

    if (result !== val) {
      throw new Error(`Expected ${result} to be '${val}'`);
    }
  });

  it("should get a non-existant key", () => {
    const weakMap = window.WeakMap;
    // @ts-expect-error deleting a property we added from window
    delete window.WeakMap;
    const map = new WeakMap();
    window.WeakMap = weakMap;
    const obj = win;
    const result = map.get(obj);

    if (result !== undefined) {
      throw new Error(`Expected result to be undefined`);
    }
  });

  it("should set over an existing key, and get a key", () => {
    const weakMap = window.WeakMap;
    // @ts-expect-error deleting a property we added from window
    delete window.WeakMap;
    const map = new WeakMap<Record<string, unknown>, string>();
    window.WeakMap = weakMap;
    const obj = win;
    const val1 = "foo";
    const val2 = "bar";
    map.set(obj, val1);
    map.set(obj, val2);
    const result = map.get(obj);

    if (!result) {
      throw new Error(`Result is undefined`);
    }

    if (result !== val2) {
      throw new Error(`Expected ${result} to be '${val2}'`);
    }
  });

  it("should set and check for a key", () => {
    const weakMap = window.WeakMap;
    // @ts-expect-error deleting a property we added from window
    delete window.WeakMap;
    const map = new WeakMap();
    window.WeakMap = weakMap;
    const obj = win;
    const val = "foo";
    map.set(obj, val);
    const result = map.has(obj);

    if (!result) {
      throw new Error(`Expected ${result.toString()} to be true`);
    }
  });

  it("should check for a non-existant key", () => {
    const weakMap = window.WeakMap;
    // @ts-expect-error deleting a property we added from window
    delete window.WeakMap;
    const map = new WeakMap();
    window.WeakMap = weakMap;
    const obj = win;
    const result = map.has(obj);

    if (result) {
      throw new Error(`Expected ${result.toString()} to be false`);
    }
  });

  it("should set, delete, and check for a key", () => {
    const weakMap = window.WeakMap;
    // @ts-expect-error deleting a property we added from window
    delete window.WeakMap;
    const map = new WeakMap();
    window.WeakMap = weakMap;
    const obj = win;
    const val = "foo";
    map.set(obj, val);
    map.delete(obj);
    const result = map.has(obj);

    if (result) {
      throw new Error(`Expected ${result.toString()} to be false`);
    }
  });
});
