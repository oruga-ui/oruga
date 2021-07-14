// oruga object for programmatic components
const oruga = {};

// add components to the oruga object
function addProgrammatic(property: string, component: any) {
    if (!oruga[property]) {
        oruga[property] = {};
    }
    oruga[property] = component;
}

// composable for internal and external usage
export function useProgrammatic() {
    return {oruga, addProgrammatic};
}
