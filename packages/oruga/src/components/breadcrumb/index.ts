import type { App, Plugin } from "vue";

import Breadcrumb from "./Breadcrumb.vue";
import BreadcrumbItem from "./BreadcrumbItem.vue";

import { registerComponent } from "@/utils/plugins";

/** export button plugin */
export default {
    install(app: App) {
        registerComponent(app, Breadcrumb);
        registerComponent(app, BreadcrumbItem);
    },
} as Plugin;

/** export Breadcrumb components */
export { Breadcrumb as OBreadcrumb, BreadcrumbItem as OBreadcrumbItem };
