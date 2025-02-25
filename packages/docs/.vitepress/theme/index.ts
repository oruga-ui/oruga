import { markRaw } from "vue";
import type { App, DefineComponent } from "vue";

// THEME
import DefaultTheme from "vitepress/theme";
import Layout from "./layout/Layout.vue";
import "./styles/index.scss";

import ExampleShowcase from "./components/ExampleShowcase";
import InspectorWrapper from "./components/InspectorWrapper.vue";
import ExampleViewer from "./components/ExampleViewer.vue";
import Expo from "./components/Expo.vue";

import Oruga from "@oruga-ui/oruga-next";

import { bulmaConfig } from "@oruga-ui/theme-bulma";
import { bootstrapConfig } from "@oruga-ui/theme-bootstrap";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import scss from "highlight.js/lib/languages/scss";
import css from "highlight.js/lib/languages/css";

hljs.registerLanguage("xml", xml);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("scss", scss);
hljs.registerLanguage("css", css);

// Import theme definitions
import { Themes, type ThemeConfig } from "@docs/themes";

const STORAGEKEY = "oruga-ui.com:theme";

/** load the last used theme or get a default one */
export function loadTheme(): ThemeConfig {
    if (typeof window !== "undefined") {
        const cache = window.localStorage.getItem(STORAGEKEY);
        if (cache && cache !== "undefined") {
            try {
                const themeConfig = JSON.parse(cache);
                if (themeConfig && typeof themeConfig === "object")
                    return themeConfig;
            } catch (e) {
                console.warn(e);
                return Themes[1];
            }
        }
    }
    return Themes[1];
}

/** save the theme config to load later */
export function saveTheme(theme: ThemeConfig): void {
    if (typeof window === "undefined") {
        console.log("The window object is not available in this environment.");
    } else {
        window.localStorage.setItem(STORAGEKEY, JSON.stringify(theme));
        location.reload();
    }
}

export default {
    ...DefaultTheme,
    Layout,
    enhanceApp({ app }: { app: App }): void {
        // add fortawesome icons
        library.add(fas);
        app.component("VueFontawesome", FontAwesomeIcon);

        // add documentation components
        app.component("InspectorWrapper", InspectorWrapper);
        app.component("ExampleViewer", ExampleViewer);
        app.component("Expo", Expo);

        // register example-showcase web component
        if (!import.meta.env.SSR)
            customElements.define("example-showcase", ExampleShowcase);

        // import example components
        const examples = import.meta.glob<DefineComponent>(
            "../../../oruga/src/components/**/examples/index.vue",
            { eager: true },
        );
        for (const path in examples) {
            const v = path.split("/");
            app.component("example-" + v[6], markRaw(examples[path].default));
        }

        // import inspector components
        const inspectors = import.meta.glob<DefineComponent>(
            "../../../oruga/src/components/**/examples/inspector.vue",
            { eager: true },
        );
        for (const path in inspectors) {
            const v = path.split("/");
            app.component(
                "inspector-" + v[6] + "-viewer",
                markRaw(inspectors[path].default),
            );
        }

        // basic docs config
        let orugaConfig = {
            iconPack: "fas",
            iconComponent: "vue-fontawesome",
        };

        if (typeof window !== "undefined") {
            const theme = loadTheme();

            // update oruga config by theme config
            switch (theme.key) {
                case "theme-bulma": {
                    // update base orugaConfig with bulmaConfig
                    orugaConfig = Object.assign(orugaConfig, bulmaConfig);
                    break;
                }
                case "theme-bootstrap": {
                    // update base orugaConfig with bootstrapConfig
                    orugaConfig = Object.assign(orugaConfig, bootstrapConfig);
                    break;
                }
            }
        }

        // import oruga component with theme config
        app.use(Oruga, orugaConfig);
    },
};
