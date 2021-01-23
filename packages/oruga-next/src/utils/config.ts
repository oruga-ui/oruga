import { App } from "vue"
import { merge } from "./helpers"

let config = {
    iconPack: 'mdi',
    useHtml5Validation: true,
    statusIcon: true
}

export { config as default }

export const setOptions = (options: any) => { config = options }

export let VueInstance: App

export const setVueInstance = (Vue: App) => { VueInstance = Vue }

export const Programmatic = {
    getOptions() {
        return config
    },
    setOptions(options: any) {
        setOptions(merge(config, options, true))
    }
}

export const Plugin = {
    install(Vue: App, options = {}) {
        setVueInstance(Vue)
        // Options
        setOptions(merge(config, options, true))
    }
}
