/** create a unique id sequence */
export function useSequentialId(start: number = 0): {
    nextSequence: () => string;
    sequence: Readonly<number>;
} {
    let sequence = start;

    /** increase the unique id sequence */
    function nextSequence(): string {
        return String(sequence++);
    }

    return {
        nextSequence,
        sequence,
    };
}
