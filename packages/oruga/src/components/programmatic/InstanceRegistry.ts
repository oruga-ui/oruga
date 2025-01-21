import type { ComponentInternalInstance } from "vue";

export default class InstanceRegistry<T = ComponentInternalInstance> {
    entries: Array<T>;

    constructor() {
        this.entries = [];
    }

    /** Returns the number of registered active instances. */
    count(): number {
        return this.entries.length;
    }

    /** Returns the first registered active instance. */
    fist(): T | undefined {
        return this.entries.at(0);
    }

    /** Returns the last registered active instance. */
    last(): T | undefined {
        return this.entries.at(-1);
    }

    /** Adds a new instance to the instance stack. */
    add(entry: T): void {
        this.entries.push(entry);
    }

    /** Removes an instance from the instance stack. */
    remove(entry: T): void {
        const index = this.entries.indexOf(entry);
        this.entries.splice(index, 1);
    }

    /** Call a function for every registered active instance. */
    walk(callback: (value: T) => boolean | void): void {
        // Walk a copy of the array so that the callback is allowed to remove the instance
        this.entries = [...this.entries].filter((e) => {
            const ret = callback(e);
            return !(ret === true);
        });
    }
}
