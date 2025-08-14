import { toValue } from "vue";
import { getOption } from "@/utils/config";

/** Get the root config `teleportTarget`. */
export function getTeleportDefault(): HTMLElement | string {
    const option = getOption("teleportTarget", "body");
    return toValue<HTMLElement | string>(option);
}
