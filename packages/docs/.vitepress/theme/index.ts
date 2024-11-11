import { markRaw } from "vue";
import type { App, DefineComponent } from "vue";

// THEME
import DefaultTheme from "vitepress/theme";
import Layout from "./layout/Layout.vue";
import "./styles/index.scss";

import InspectorWrapper from "./components/InspectorWrapper.vue";
import Inspector from "./components/Inspector.vue";
import ExampleViewer from "./components/ExampleViewer.vue";
import Expo from "./components/Expo.vue";

import Oruga, { useOruga } from "@oruga-ui/oruga-next";

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
import themes from "../themes.json";

// load last used theme or set a default one
function loadTheme() {
    const cache = localStorage.getItem("oruga-ui.com:theme");
    if (cache && cache !== "undefined") {
        try {
            const themeConfig = JSON.parse(cache);
            if (themeConfig && typeof themeConfig === "object")
                return themeConfig;
        } catch (e) {
            return themes[1];
        }
    }
    return themes[1];
}

export default {
    ...DefaultTheme,
    Layout,
    enhanceApp({ app }: { app: App }) {
        // add fortawesome icons
        library.add(fas);
        app.component("VueFontawesome", FontAwesomeIcon);

        // add documentation components
        app.component("InspectorWrapper", InspectorWrapper);
        app.component("Inspector", Inspector);
        app.component("ExampleViewer", ExampleViewer);
        app.component("Expo", Expo);

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

        // import oruga component with theme config
        app.use(Oruga, {
            iconPack: "fas",
            iconComponent: "vue-fontawesome",
        });

        const oruga = useOruga();

        // set oruga as global prop for docs
        app.config.globalProperties.$oruga = oruga;

        if (typeof window !== "undefined") {
            const theme = loadTheme();

            // update oruga config by theme config
            switch (theme.key) {
                case "theme-bulma": {
                    bulmaConfig.iconPack = "fas";
                    bulmaConfig.iconComponent = "vue-fontawesome";
                    oruga.config.setOptions(bulmaConfig);
                    break;
                }
                case "theme-bootstrap": {
                    bootstrapConfig.iconPack = "fas";
                    bootstrapConfig.iconComponent = "vue-fontawesome";
                    oruga.config.setOptions(bootstrapConfig);
                    break;
                }
            }

            // add theme style
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = theme.cdn;
            document.head.appendChild(link);
        }
    },
};
