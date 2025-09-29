import type { App } from "vue";

import Breadcrumb from "./Breadcrumb.vue";
import BreadcrumbItem from "./BreadcrumbItem.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export breadcrumb plugin */
export default {
    install(app: App) {
        registerComponent(app, Breadcrumb);
        registerComponent(app, BreadcrumbItem);
    },
} as OrugaComponentPlugin;

/** export Breadcrumb components */
export { Breadcrumb as OBreadcrumb, BreadcrumbItem as OBreadcrumbItem };
