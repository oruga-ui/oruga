import type { App } from "vue";

import Autocomplete from "./Autocomplete.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export autocomplete specific types */
export type * from "./props";

/** export autocomplete plugin */
export default {
    install(app: App): void {
        registerComponent(app, Autocomplete);
    },
} satisfies OrugaComponentPlugin;

/** export autocomplete components */
export { Autocomplete as OAutocomplete };
