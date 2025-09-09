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
    _vue: App;

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
     * Adds a Oruga component plugin.
     *
     * @param plugin - Oruga component plugin to add
     * @returns Oruga plugin instance
     */
    use(plugin: OrugaComponentPlugin): Oruga;
}

/** provide/inject oruga key symbol */
const $ORUGA_SYMBOL = Symbol("$oruga") as InjectionKey<Oruga>;

/**
 * The global oruga instance  which allows colling `useOruga()` outside of a component setup
 * after the oruga plugin got installed.
 */
let globalOruga: Oruga | undefined;

/** create a new Oruga Vue plugin which sets the oruga config options. */
export function createOruga(): Oruga {
    const _plugins: OrugaComponentPlugin[] = [];

    const oruga: Oruga = {
        // @ts-expect-error it's actually undefined here
        _vue: null,
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
        },
        // @ts-expect-error it's empty at first
        _programmatic: {},

        // vue plugin install function
        install(app: App, options: OrugaConfig = {}): void {
            // set global vue instance for programmatic usage
            oruga._vue = app;
            // merge additional options with the base config
            oruga._config = merge(oruga._config, options, true);

            // set the global oruga instance
            globalOruga = oruga;

            // provide the oruga instance
            app.provide($ORUGA_SYMBOL, oruga);
            // set the oruga instance as globalProperties
            app.config.globalProperties.$oruga = oruga;

            // register the programmatic config interface to the programmatic oruga object
            addProgrammatic(oruga, "config", ConfigProgrammatic);

            // check if all components should be registered globaly
            if (oruga._config.globalComponents)
                // register all oruga vue components globaly
                for (const componentKey in ComponentPlugins) {
                    app.use(ComponentPlugins[componentKey]);
                }

            // register custom component plugins
            _plugins.forEach((p) => app.use(p, { oruga }));
        },
        // helper to register component plugins on install
        use(plugin: OrugaComponentPlugin): Oruga {
            _plugins.push(plugin);
            return oruga;
        },
    };

    return oruga;
}

/**
 * Get the currently active oruga instance if there is any.
 */
export function getActiveOruga(): Oruga | undefined {
    return (hasInjectionContext() && inject($ORUGA_SYMBOL)) || globalOruga;
}

/**
 * Get the oruga instence by injecting from the current context.
 * Throws an error when not inject context or no oruga instance is available.
 * @internal
 */
function getOruga(): Oruga {
    // check for inject context
    if (!hasInjectionContext())
        throw new Error(
            "Oruga's config can only be accessed when an inject context is available.",
        );

    // inject the current oruga instance
    const oruga = inject($ORUGA_SYMBOL);
    // check for oruga instance
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
function getConfig(): OrugaConfig {
    return getActiveOruga()?._config ?? {};
}

/** Override the current config the Oruga instance. */
function setConfig(options: OrugaConfig): void {
    const oruga = getOruga();
    const config = merge(oruga._config, options, true);
    oruga._config = config;
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

const ConfigProgrammatic = {
    getOption,
    setOption,
    getConfig,
    setConfig,
};

export function useProgrammaticConfig(): typeof ConfigProgrammatic {
    return ConfigProgrammatic;
}
