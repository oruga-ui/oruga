export type Indexer = {
    nextIndex: () => string;
    index: Readonly<number>;
};

/** create a unique index sequencer */
export function useIndexer(start: number = 0): Indexer {
    let index = start;

    /** increase the unique index */
    function nextIndex(): string {
        return String(index++);
    }

    return {
        nextIndex,
        index,
    };
}
