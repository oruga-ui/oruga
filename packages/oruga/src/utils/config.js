import { merge } from "./helpers"

let config = {
    iconPack: 'mdi',
    useHtml5Validation: true,
    statusIcon: true
}

export const setOptions = (options) => { config = options }

export const getOptions = () => { return config }

export let VueInstance

export const setVueInstance = (Vue) => { VueInstance = Vue }

export const Programmatic = {
    getOptions,
    setOptions(options) {
        setOptions(merge(getOptions(), options, true))
    }
}

export const Plugin = {
    install(Vue, options = {}) {
        setVueInstance(Vue)
        // Options
        setOptions(merge(getOptions(), options, true))
    }
}
