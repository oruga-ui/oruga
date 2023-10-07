import { ref } from "vue";
import type { OrugaProgrammatic } from "@/types";

/** Oruga object for programmatic components */
const oruga = ref<OrugaProgrammatic>({} as OrugaProgrammatic);

/** Add components to the oruga object */
export function addProgrammatic(property: string, component: object): void {
    oruga.value[property] = component;
}

/** Composable for internal and external usage of programmatic components*/
export function useOruga(): OrugaProgrammatic {
    return oruga.value;
}
