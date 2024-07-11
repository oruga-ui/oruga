import { markRaw } from "vue";
import type { App, DefineComponent, Plugin } from "vue";

// import icon library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// add fontawesome icons
import "@fortawesome/fontawesome-free/scss/fontawesome.scss";
import "@fortawesome/fontawesome-free/scss/regular.scss";
import "@fortawesome/fontawesome-free/scss/solid.scss";

// import code highlight library
import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import scss from "highlight.js/lib/languages/scss";
import css from "highlight.js/lib/languages/css";

// register highlight languages
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("scss", scss);
hljs.registerLanguage("css", css);

// import example styling
import "node_modules/vitepress/dist/client/theme-default/styles/vars.css";
import "node_modules/vitepress/dist/client/theme-default/styles/base.css";
import "node_modules/vitepress/dist/client/theme-default/styles/components/vp-code-group.css";
import "node_modules/vitepress/dist/client/theme-default/styles/components/vp-code.css";
import "node_modules/vitepress/dist/client/theme-default/styles/components/vp-doc.css";
import "node_modules/vitepress/dist/client/theme-default/styles/components/custom-block.css";
import "../../docs/.vitepress/theme/styles/vitepress.scss";

// import documentation components
import ExampleViewer from "../../docs/.vitepress/theme/components/ExampleViewer.vue";
import { ClientOnly } from "node_modules/vitepress/dist/client/app/components/ClientOnly.js";

// main oruga vue plugin
const plugin: Plugin = {
    install(app: App) {
        // add fortawesome icons
        library.add(fas);
        app.component("VueFontawesome", FontAwesomeIcon);

        // add examples components
        const examples = import.meta.glob<DefineComponent>(
            "../../oruga/src/components/**/examples/index.vue",
            { eager: true },
        );
        for (const path in examples) {
            const str = path.split("/")[5];
            const component =
                str.charAt(0).toUpperCase() + str.slice(1) + "Examples";
            app.component(component, markRaw(examples[path].default));
        }

        // add documentation components
        app.component("ExampleViewer", ExampleViewer);
        app.component("ClientOnly", ClientOnly);
    },
};

// export example plugins
export default plugin;
