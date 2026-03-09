import { createOruga, type OrugaComponentPlugin } from "./utils/config";

// export all types
export * from "./types";
export * from "./components/types";

// export all vue components
export * from "./components";
// export all components as vue plugins
export * from "./components/plugins";

// export main oruga composables
export { createOruga, createTestingOruga, useOruga } from "./utils/config";

// export programmatic composable
export { useConfigProgrammatic, type OrugaProgrammatic } from "./utils/config";

// export useful helper functions
export * from "./utils/helpers";

// export some useful composables functions
export {
    findFocusable,
    useTrapFocus,
    useEventListener,
    useClickOutside,
    useDebounce,
    unrefElement,
} from "./composables";

import * as plugins from "./components/plugins";
const OrugaComponentPlugins = Object.values(plugins) as OrugaComponentPlugin[];
export { OrugaComponentPlugins };

// default export main oruga vue plugin
const oruga = createOruga();
export default oruga;
