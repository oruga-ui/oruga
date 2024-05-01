import type { App, Plugin } from "vue";

import Autocomplete from "./Autocomplete.vue";

import { registerComponent } from "@/utils/plugins";

/** export autocomplete plugin */
export default {
    install(app: App) {
        registerComponent(app, Autocomplete);
    },
} as Plugin;

/** export autocomplete components */
export { Autocomplete as OAutocomplete };
