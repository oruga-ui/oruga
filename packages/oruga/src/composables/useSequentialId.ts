/** create a unique id sequence */
export function useSequentialId() {
    let id = 0;

    /** increase the unique id sequence */
    return (): string => {
        return String(id++);
    };
}
