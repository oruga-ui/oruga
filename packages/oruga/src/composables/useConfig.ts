import { getOption } from "@/utils/config";
import { toValue } from "vue";

export function useTeleportDefault(): HTMLElement {
    const option = getOption("teleportTarget", document.body);
    return toValue(option) as HTMLElement;
}
