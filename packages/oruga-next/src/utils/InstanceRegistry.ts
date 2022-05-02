export default class InstanceRegistry {
    entries: Array<any>

    constructor() {
        this.entries = []
    }

    add(entry) {
        this.entries.push(entry)
    }

    remove(entry) {
        let index = this.entries.indexOf(entry)
        this.entries.splice(index, 1)
    }

    walk(callback) {
        // Walk a copy of the array so that the callback is allowed to remove the instance
        this.entries = [...this.entries].filter((e) => {
            const ret = callback(e)
            return !(ret === true)
        })
    }
}
