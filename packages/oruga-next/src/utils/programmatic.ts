import { ref } from "vue";
import type { OrugaPrgrammatic } from "@/types/Programmatic";

/** Oruga object for programmatic components */
const oruga = ref<OrugaPrgrammatic>({} as OrugaPrgrammatic);

/** Add components to the oruga object */
export function addProgrammatic(property: string, component: object): void {
    oruga.value[property] = component;
}

/** Composable for internal and external usage of programmatic components*/
export function useOruga() {
    return oruga.value;
}
