import { App } from 'vue'
import { merge } from "./helpers"

let config: Object = {
    iconPack: 'mdi',
    useHtml5Validation: true,
    statusIcon: true
}

export { config as default }

export const setOptions = (options: Object) => { config = options }

export let VueInstance: App

export const setVueInstance = (app: App) => { VueInstance = app }

export const Programmatic = {
    getOptions() {
        return config
    },
    setOptions(options: Object) {
        setOptions(merge(config, options, true))
    }
}

export const Plugin = {
    install(app: App, options = {}) {
        setVueInstance(app)
        // Options
        setOptions(merge(config, options, true))
    }
} 
