import type { App, Plugin } from "vue";

import Pagination from "./Pagination.vue";

import { registerComponent } from "@/utils/plugins";

export default {
    install(app: App) {
        registerComponent(app, Pagination);
    },
} as Plugin;

export { Pagination as OPagination };
