import type { App } from "vue";

import Breadcrumb from "./Breadcrumb.vue";
import BreadcrumbItem from "./BreadcrumbItem.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export breadcrumb specific types */
export type * from "./props";

/** export breadcrumb plugin */
export default {
    install(app: App): void {
        registerComponent(app, Breadcrumb);
        registerComponent(app, BreadcrumbItem);
    },
} satisfies OrugaComponentPlugin;

/** export Breadcrumb components */
export { Breadcrumb as OBreadcrumb, BreadcrumbItem as OBreadcrumbItem };
