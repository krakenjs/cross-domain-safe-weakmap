export declare class CrossDomainSafeWeakMap<K extends Record<string, any>, V extends unknown> {
    name: string;
    weakmap: WeakMap<K, V> | null | undefined;
    keys: Array<K>;
    values: Array<V>;
    constructor();
    _cleanupClosedWindows(): void;
    isSafeToReadWrite(key: K): boolean;
    set(key: K, value: V): void;
    get(key: K): V | void;
    delete(key: K): void;
    has(key: K): boolean;
    getOrSet(key: K, getter: () => V): V;
}
