/** Oruga object for programmatic components */
const oruga = {};

/** Add components to the oruga object */
function addProgrammatic(property: string, component: object): void {
    oruga[property] = component;
}

/** Composable for internal and external usage */
export function useProgrammatic() {
    return { oruga, addProgrammatic };
}
