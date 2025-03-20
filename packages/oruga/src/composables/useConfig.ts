import { toValue, type MaybeRefOrGetter } from "vue";
import { unrefElement } from "./unrefElement";
import { getOption } from "@/utils/config";

/** get the root config `teleportTarget` */
export function useTeleportDefault(): HTMLElement | string {
    const option = getOption("teleportTarget", "body");
    return toValue(option) as HTMLElement | string;
}

/** resolve an HTML element based on query selector or explizit defined */
export function resolveElement(
    target: MaybeRefOrGetter<HTMLElement | string>,
): HTMLElement | null {
    const targetQuery = toValue(target);
    // query element if target is a string
    if (typeof targetQuery === "string")
        return document.querySelector<HTMLElement>(targetQuery);
    // else unwrap element
    else return unrefElement(targetQuery);
}
