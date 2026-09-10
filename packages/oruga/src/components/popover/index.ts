import type { App } from "vue";

import Popover from "./Popover.vue";
import usePopoverProgrammatic, {
    PopoverProgrammaticFactory,
} from "./usePopoverProgrammatic";

import { registerComponent, registerProgrammatic } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export popover specific types */
export type * from "./props";
export type { PopoverProgrammaticFactory } from "./usePopoverProgrammatic";

/** export popover plugin */
export default {
    install(app: App, { oruga }): void {
        registerComponent(app, Popover);
        registerProgrammatic(oruga, "popover", PopoverProgrammaticFactory);
    },
} satisfies OrugaComponentPlugin;

/** export popover components */
export { Popover as OPopover, usePopoverProgrammatic };
