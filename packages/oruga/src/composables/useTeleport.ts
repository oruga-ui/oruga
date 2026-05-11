import { computed, reactive, toValue, type MaybeRefOrGetter } from "vue";
import { getTeleportDefault } from "./useConfig";

export function useTeleport(
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport?: MaybeRefOrGetter<boolean | string | object>,
): {
    to: string | object | undefined;
    disabled: boolean;
} {
    const to = computed(() => {
        const value = toValue(teleport);
        return typeof value === "boolean" ? getTeleportDefault() : value;
    });
    const disabled = computed(() =>
        typeof toValue(teleport) === "boolean" ? !toValue(teleport) : false,
    );

    return reactive({ to, disabled });
}
