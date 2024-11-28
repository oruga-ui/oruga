/** create a unique id sequence */
export function useSequentialId(): {
    nextSequence: () => string;
    sequence: Readonly<number>;
} {
    let sequence = 0;

    /** increase the unique id sequence */
    function nextSequence(): string {
        return String(sequence++);
    }

    return {
        nextSequence,
        sequence,
    };
}
