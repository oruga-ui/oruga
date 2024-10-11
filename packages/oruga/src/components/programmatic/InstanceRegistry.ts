import type { ComponentInternalInstance } from "vue";

export default class InstanceRegistry<T = ComponentInternalInstance> {
    entries: Array<T>;

    constructor() {
        this.entries = [];
    }

    fist(): T | undefined {
        return this.entries.at(0);
    }

    last(): T | undefined {
        return this.entries.at(-1);
    }

    add(entry: T): void {
        this.entries.push(entry);
    }

    remove(entry: T): void {
        const index = this.entries.indexOf(entry);
        this.entries.splice(index, 1);
    }

    walk(callback: (value: T) => boolean | void): void {
        // Walk a copy of the array so that the callback is allowed to remove the instance
        this.entries = [...this.entries].filter((e) => {
            const ret = callback(e);
            return !(ret === true);
        });
    }
}
