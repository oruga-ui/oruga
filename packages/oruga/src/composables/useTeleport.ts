import { computed, reactive, toValue, type MaybeRefOrGetter } from "vue";
import { getOption } from "@/utils/config";

/** Get the root config `teleportTarget`. */
export function getTeleportDefault(): HTMLElement | string {
    const option = getOption("teleportTarget", "body");
    return toValue<HTMLElement | string>(option);
}

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
    const disabled = computed(() => {
        const value = toValue(teleport);
        return typeof value === "boolean" ? !value : false;
    });

    return reactive({ to, disabled });
}
