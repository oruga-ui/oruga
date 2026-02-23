import {
    hasInjectionContext,
    inject,
    type App,
    type InjectionKey,
    type ObjectPlugin,
} from "vue";
import { getValueByPath, merge, setValueByPath } from "./helpers";
import { isClient } from "./ssr";
import { addProgrammatic } from "./plugins";
import type { DeepKeys, DeepType, OrugaConfig } from "@/types";
import * as ComponentPlugins from "@/components/plugins";

// extend the OrugaProgrammatic interface with `config` programmatic interface
declare module "../index" {
    interface OrugaProgrammatic {
        config: typeof ConfigProgrammatic;
    }
}

/** Interface of the programmtic component. interfaces.  */
export interface OrugaProgrammatic {
    [key: string]: Record<string, any>;
}

export type OrugaComponentPlugin = ObjectPlugin<{ oruga: Oruga }>;

/** Oruga Vue Plugin Object */
export interface Oruga extends ObjectPlugin<OrugaConfig> {
    /**
     * The vue instance oruga got registered into.
     * @internal
     */
    _app: App;

    /**
     * The global config object for this instance.
     * @internal
     */
    _config: OrugaConfig;

    /**
     * All registered components programmatic interfaces.
     * @internal
     */
    _programmatic: OrugaProgrammatic;

    /**
     * Defines if this oruga instance is a testing instance.
     * @internal
     */
    _testing?: boolean;

    /**
     * Adds a Oruga component plugin.
     *
     * @param plugin - Oruga component plugin to add
     * @returns Oruga plugin instance
     */
    use(plugin: OrugaComponentPlugin): Oruga;

    /**
     * Provides the oruga instance to the app context.
     * This is useful when you need to use `useOruga()` in a different app instance than the one Oruga got installed in.
     * @param app - The app instance to provide the oruga instance to.
     */
    provide(app: App): void;
}

/** provide/inject oruga key symbol */
const $ORUGA_SYMBOL = Symbol("$oruga") as InjectionKey<Oruga>;

/**
 * The global oruga instance  which allows colling `useOruga()` outside of a component setup
 * after the oruga plugin got installed.
 */
let globalOruga: Oruga | undefined;

export function setActiveOruga(oruga: Oruga | undefined): void {
    globalOruga = oruga;
}

/**
 * Get the currently active oruga instance if there is any.
 */
export function getActiveOruga(): Oruga | undefined {
    return (hasInjectionContext() && inject($ORUGA_SYMBOL)) || globalOruga;
}

/**
 * Create a new Oruga Vue plugin which sets the oruga config options.
 * @param config - Override or extend the default oruga config.
 * @returns A new Oruga instance.
 */
export function createOruga(config: OrugaConfig = {}): Oruga {
    const _plugins: OrugaComponentPlugin[] = [];

    const oruga: Oruga = {
        // the vue instance Oruga gets installed in, it will be set in the install function
        // @ts-expect-error it's actually empty here
        _app: null,
        // default config is defined here
        _config: {
            override: false,
            globalComponents: false,
            iconPack: "mdi",
            useHtml5Validation: true,
            statusIcon: true,
            transformClasses: undefined,
            mobileBreakpoint: "1023px",
            teleportTarget: () => (isClient ? document.body : "body"),
            ...config,
        },
        // map of all registered programmatic interfaces
        // @ts-expect-error it's empty at first
        _programmatic: {},

        // vue plugin install function
        install(app: App, options: OrugaConfig = {}): void {
            // set global vue instance for programmatic usage
            oruga._app = app;
            // merge additional options with the base config
            oruga._config = merge(oruga._config, options, true);

            // set the global oruga instance
            setActiveOruga(oruga);

            // provide the oruga instance to the app context
            this.provide(app);

            // register the programmatic config interface to the programmatic oruga object
            addProgrammatic(oruga, "config", ConfigProgrammatic);

            // check if all components should be registered globaly
            if (oruga._config.globalComponents)
                // add all oruga components to register globaly
                Object.values(ComponentPlugins).forEach((p) =>
                    _plugins.push(p),
                );

            // register oruga component plugins
            _plugins.forEach((p) => app.use(p, { oruga }));
        },
        // helper to register component plugins on install
        use(plugin: OrugaComponentPlugin): Oruga {
            _plugins.push(plugin);
            return oruga;
        },
        // helper to provide the oruga instance to another app instance
        provide(app: App): void {
            // provide the oruga instance
            app.provide($ORUGA_SYMBOL, oruga);
            // set the oruga instance as globalProperties
            app.config.globalProperties.$oruga = oruga;
        },
    };

    return oruga;
}

/**
 * Create a new oruga instance and set it as active even the plugin got not installed yet.
 * @param config - Override or extend the default oruga config.
 * @returns A new Oruga instance.
 */
export function createTestingOruga(config: OrugaConfig = {}): Oruga {
    const oruga = createOruga(config);
    oruga._testing = true;
    setActiveOruga(oruga);
    return oruga;
}

/**
 * Get the oruga instence by injecting from the current context.
 * Throws an error when no inject context or no oruga instance is available.
 * @internal
 */
function getOruga(): Oruga {
    // inject the current active oruga instance
    const oruga = getActiveOruga();
    if (!oruga)
        throw new Error(
            "No Oruga instance available. Have you installed the Oruga plugin yet?",
        );

    return oruga;
}

/**
 * Composable for internal and external usage of programmatic components.
 * It returns the programmatic interface of the current active oruga instance if there is any.
 */
export function useOruga(): OrugaProgrammatic {
    return getActiveOruga()?._programmatic ?? ({} as OrugaProgrammatic);
}

/**
 * Get the config of the current active oruga instance if there is any.
 */
export function getConfig(): OrugaConfig {
    return getActiveOruga()?._config ?? {};
}

/**
 * Override the config of the current active Oruga instance.
 * The given config will be mergen in the existing one.
 * Throws an error when no inject context or no oruga instance is available.
 *
 * @param config - The new config to be mergen into the existing one.
 */
export function setConfig(config: OrugaConfig): void {
    const oruga = getOruga();
    const _config = merge(oruga._config, config, true);
    oruga._config = _config;
}

/**
 * Get a config option by an option path
 * with an optional default value as fallback when no config is set.
 */
export function getOption<
    K extends DeepKeys<OrugaConfig>,
    D extends DeepType<OrugaConfig, K>,
>(path: K | (string & {}), defaultValue: D): D;
export function getOption<
    K extends DeepKeys<OrugaConfig>,
    D extends DeepType<OrugaConfig, K>,
>(path: K | (string & {}), defaultValue?: D): D | undefined;
export function getOption<
    K extends DeepKeys<OrugaConfig>,
    D extends DeepType<OrugaConfig, K>,
>(path: K | (string & {}), defaultValue?: D): D | undefined {
    const config = getConfig();
    return getValueByPath<OrugaConfig, K, D>(config, path, defaultValue);
}

/** Add a config option to the config object. */
function setOption<K extends DeepKeys<OrugaConfig>>(
    path: K,
    value: DeepType<OrugaConfig, K>,
): void {
    const oruga = getOruga();
    setValueByPath(oruga._config, path, value);
}

/**
 * Less type strict version of getOption for component props defaults.
 * @internal
 */
export function getDefault<T>(
    path: DeepKeys<OrugaConfig>,
    defaultValue?: T,
): T {
    const config = getConfig();
    return getValueByPath(config, path, defaultValue) as T & {};
}

/**
 * less type strict version of getOption for component prop default with type function
 * @internal
 */
export function getDefaultFunction<T>(
    path: DeepKeys<OrugaConfig>,
    defaultValue?: T,
): (...args) => any {
    return (...args) => {
        const f = getDefault(path, defaultValue);
        if (typeof f === "function") return f(...args);
    };
}

const ConfigProgrammatic = {
    getOption,
    setOption,
    getConfig,
    setConfig,
};

export function useConfigProgrammatic(): typeof ConfigProgrammatic {
    return ConfigProgrammatic;
}
