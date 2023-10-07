import type { App, Plugin } from "vue";

import Autocomplete from "./Autocomplete.vue";

import { registerComponent } from "@/utils/plugins";

export default {
    install(app: App) {
        registerComponent(app, Autocomplete);
    },
} as Plugin;

export { Autocomplete as OAutocomplete };
