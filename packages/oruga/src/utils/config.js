import { merge } from "./helpers"

let config = {
    iconPack: 'mdi',
    useHtml5Validation: true,
    statusIcon: true
}

export { config as default }

export const setOptions = (options) => { config = options }

export let VueInstance

export const setVueInstance = (Vue) => { VueInstance = Vue }

export const Programmatic = {
    getOptions() {
        return config
    },
    setOptions(options) {
        setOptions(merge(config, options, true))
    }
}

export const Plugin = {
    install(Vue, options = {}) {
        setVueInstance(Vue)
        // Options
        setOptions(merge(config, options, true))
    }
} 
