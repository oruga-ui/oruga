import type { App } from "vue";

import Pagination from "./Pagination.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export pagination plugin */
export default {
    install(app: App): void {
        registerComponent(app, Pagination);
    },
} satisfies OrugaComponentPlugin;

/** export pagination components */
export { Pagination as OPagination };
