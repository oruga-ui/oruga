import { createOruga } from "./utils/config";

// export all types
export * from "./types";
export * from "./components/types";

// export all helper functions
export * from "./utils/helpers";

// export some useful composables
export {
    findFocusable,
    useTrapFocus,
    useEventListener,
    useClickOutside,
    useDebounce,
    useScrollEvents,
    unrefElement,
    getScrollingParent,
} from "./composables";

// export all vue components
export * from "./components";
// export all components as vue plugins
export * from "./components/plugins";

// export main oruga composables
export { createOruga, useOruga } from "./utils/config";

// export programmatic composable
export { useProgrammaticConfig, type OrugaProgrammatic } from "./utils/config";

// main oruga vue plugin
const plugin = createOruga();

// export default oruga vue plugin
export { plugin as Oruga };
export default plugin;
