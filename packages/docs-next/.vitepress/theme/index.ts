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

import Oruga, { useOruga } from "../../../oruga-next/dist/oruga";

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
            return themes[0];
        }
    }
    return themes[0];
}

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

        /** This contains same pollyfills for the docs because outdated themes. */

        // feature #549: rename inputitems to taginput
        // copy inputitems config to taginput config if not given
        // remove after themes are updated
        const inputitems = oruga.config.getOption("inputitems");
        const taginput = oruga.config.getOption("taginput");
        if (!taginput) oruga.config.setOption("taginput", inputitems);

        // adjust sidebar old to new position
        const sidebar = oruga.config.getOption("sidebar");
        if (sidebar) {
            if (!sidebar.positionClass)
                sidebar.positionClass = (val: any) => {
                    if (val === "right") return sidebar.rightClass;
                    else return " ";
                };
            if (!sidebar.inlineClass) sidebar.inlineClass = sidebar.staticClass;
            oruga.config.setOption("sidebar", sidebar);
        }

        // adjust button classes
        const button = oruga.config.getOption("button");
        if (button) {
            if (!button.wrapperClass)
                button.wrapperClass = button.elementsWrapperClass;
        }

        // adjust carousel classes
        const carousel = oruga.config.getOption("carousel");
        if (carousel) {
            if (!carousel.wrapperClass)
                carousel.wrapperClass = carousel.sceneClass;
        }

        // adjust checkbox classes
        const checkbox = oruga.config.getOption("checkbox");
        if (checkbox) {
            if (!checkbox.inputClass) checkbox.inputClass = checkbox.checkClass;
            if (!checkbox.inputCheckedClass)
                checkbox.inputCheckedClass = checkbox.checkCheckedClass;
            if (!checkbox.indeterminateClass)
                checkbox.indeterminateClass = checkbox.checkIndeterminateClass;
        }

        // adjust datepicker classes
        const datepicker = oruga.config.getOption("datepicker");
        if (datepicker) {
            if (!datepicker.nextButtonClass)
                datepicker.nextButtonClass = datepicker.nextBtnClass;
            if (!datepicker.prevButtonClass)
                datepicker.prevButtonClass = datepicker.prevBtnClass;
        }

        // adjust pagination classes
        const pagination = oruga.config.getOption("pagination");
        if (pagination) {
            if (!pagination.nextButtonClass)
                pagination.nextButtonClass = pagination.nextBtnClass;
            if (!pagination.prevButtonClass)
                pagination.prevButtonClass = pagination.prevBtnClass;
        }

        // adjust radio classes
        const radio = oruga.config.getOption("radio");
        if (radio) {
            if (!radio.inputCheckedClass)
                radio.inputCheckedClass = radio.checkCheckedClass;
            if (!radio.inputClass) radio.inputClass = radio.checkClass;
        }

        // adjust switch classes
        const switch_ = oruga.config.getOption("switch");

        if (radio) {
            if (!switch_.switchClass) switch_.switchClass = switch_.checkClass;
            if (!switch_.switchCheckedClass)
                switch_.switchCheckedClass = switch_.checkCheckedClass;
            if (!switch_.switchCheckClass)
                switch_.switchCheckClass = switch_.checkSwitchClass;
        }

        // adjust tabs classes
        const tabs = oruga.config.getOption("tabs");
        if (tabs) {
            if (!tabs.itemWrapperClass)
                tabs.itemWrapperClass = tabs.tabItemWrapperClass;
        }

        // adjust tooltip classes
        const tooltip = oruga.config.getOption("tooltip");
        if (tooltip) {
            if (!tooltip.arrowPositionClass)
                tooltip.arrowPositionClass = tooltip.arrowOrderClass;
            if (!tooltip.positionClass)
                tooltip.positionClass = tooltip.orderClass;
        }
    },
};
