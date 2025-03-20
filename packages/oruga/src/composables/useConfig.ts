import { toValue } from "vue";
import { getOption } from "@/utils/config";

/** get the root config `teleportTarget` */
export function useTeleportDefault(): HTMLElement | string {
    const option = getOption("teleportTarget", "body");
    return toValue(option) as HTMLElement | string;
}
