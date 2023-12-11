import type { App, Plugin } from "vue";

import Pagination from "./Pagination.vue";

import { registerComponent } from "@/utils/plugins";

/** export pagination specific types */
export type * from "./types";

/** export pagination plugin */
export default {
    install(app: App) {
        registerComponent(app, Pagination);
    },
} as Plugin;

/** export pagination components */
export { Pagination as OPagination };
