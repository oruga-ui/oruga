import type { ComponentInternalInstance } from "vue";

export default class InstanceRegistry<T = ComponentInternalInstance> {
    private entries: Array<T>;
    private counter: number;

    constructor() {
        this.entries = [];
        this.counter = 0;
    }

    /** Returns the number of registered active instances. */
    count(): number {
        return this.entries.length;
    }

    /** Returns the total number of instances that have ever been created. */
    getCounter(): number {
        return this.counter;
    }

    /** Returns the first registered active instance. */
    fist(): T | undefined {
        return this.entries.length ? this.entries[0] : undefined;
    }

    /** Returns the last registered active instance. */
    last(): T | undefined {
        return this.entries.length
            ? this.entries[this.entries.length - 1]
            : undefined;
    }

    /** Adds a new instance to the instance stack. */
    add(entry: T): void {
        this.entries.push(entry);
        this.counter++;
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
