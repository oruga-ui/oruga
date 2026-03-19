import type { App } from "vue";

import Popup from "./Popup.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export popup specific types */
export type * from "./props";

/** export popup plugin */
export default {
    install(app: App): void {
        registerComponent(app, Popup);
    },
} satisfies OrugaComponentPlugin;

/** export popup components */
export { Popup as OPopup };
