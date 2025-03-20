import { getOption } from "@/utils/config";
import { toValue } from "vue";

export function useTeleportDefault(): HTMLElement | string {
    const option = getOption("teleportTarget", "body");
    return toValue(option) as HTMLElement | string;
}
