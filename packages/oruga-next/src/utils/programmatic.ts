/** Oruga object for programmatic components */
const oruga = {};

/** Add components to the oruga object */
export function addProgrammatic(property: string, component: object): void {
    oruga[property] = component;
}

/** Composable for internal and external usage of programmatic components*/
export function useOruga() {
    return oruga;
}
