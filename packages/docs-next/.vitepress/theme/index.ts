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
import Carbon from "./components/Carbon.vue";

import Oruga, { useProgrammatic } from "../../../oruga-next/dist/oruga";

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

export default {
    ...DefaultTheme,
    Layout,
    enhanceApp({ app }: { app: App }) {
        library.add(fas);

        app.component("VueFontawesome", FontAwesomeIcon);

        app.component("InspectorWrapper", InspectorWrapper);
        app.component("Inspector", Inspector);
        app.component("ExampleViewer", ExampleViewer);
        app.component("Expo", Expo);
        app.component("Carbon", Carbon);

        // import example components
        const examples = import.meta.glob<DefineComponent>(
            "./examples/**/index.vue",
            { eager: true },
        );
        for (const path in examples) {
            const v = path.split("/");
            app.component("example-" + v[2], markRaw(examples[path].default));
        }

        // import inspector components
        const inspectors = import.meta.glob<DefineComponent>(
            "./examples/**/inspector.vue",
            { eager: true },
        );
        for (const path in inspectors) {
            const v = path.split("/");
            app.component(
                "inspector-" + v[2] + "-viewer",
                markRaw(inspectors[path].default),
            );
        }

        app.use(Oruga, {
            iconPack: "fas",
            iconComponent: "vue-fontawesome",
        });

        if (typeof window !== "undefined") {
            const cache = localStorage.getItem("oruga.io_theme");
            const theme =
                cache && cache !== "undefined"
                    ? JSON.parse(cache).key
                    : "theme-orugafull";
            switch (theme) {
                case "theme-orugafull": {
                    const link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href =
                        "https://cdn.jsdelivr.net/npm/@oruga-ui/theme-oruga/dist/oruga-full.min.css";
                    document.head.appendChild(link);
                    break;
                }
                case "theme-orugabase": {
                    const link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href =
                        "https://cdn.jsdelivr.net/npm/@oruga-ui/theme-oruga/dist/oruga.min.css";
                    document.head.appendChild(link);
                    break;
                }
                case "theme-bulma": {
                    bulmaConfig.iconPack = "fas";
                    bulmaConfig.iconComponent = "vue-fontawesome";
                    const { oruga } = useProgrammatic() as any;
                    oruga.config.setOptions(bulmaConfig);
                    const link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href =
                        "https://cdn.jsdelivr.net/npm/@oruga-ui/theme-bulma/dist/bulma.min.css";
                    document.head.appendChild(link);
                    break;
                }
                case "theme-bootstrap": {
                    bootstrapConfig.iconPack = "fas";
                    bootstrapConfig.iconComponent = "vue-fontawesome";
                    const { oruga } = useProgrammatic() as any;
                    oruga.config.setOptions(bootstrapConfig);
                    const link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href =
                        "https://cdn.jsdelivr.net/npm/@oruga-ui/theme-bootstrap/dist/bootstrap.min.css";
                    document.head.appendChild(link);
                    break;
                }
            }
        }
    },
};
