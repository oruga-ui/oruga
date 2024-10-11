export type TableColumnProps<T = unknown> = {
    /** Define the column label */
    label?: string;
    /** Define an object property key if data is an object */
    field?: string;
    /** Provide a formatter function to edit the output */
    formatter?: (value: unknown, row: T) => string;
    /** Define a column sub heading  */
    subheading?: string;
    /** Add addtional meta information for the column for custom purpose*/
    meta?: any;
    /** Column fixed width */
    width?: number | string;
    /** Define column value as number */
    numeric?: boolean;
    /**
     * Position of the column content
     * @values left, centered, right
     */
    position?: "left" | "centered" | "right";
    /** Enable an additional searchbar below the column header */
    searchable?: boolean;
    /** Enable column sortability */
    sortable?: boolean;
    /** Define whether the column is visible or not */
    visible?: boolean;
    /** Whether the column is sticky or not */
    sticky?: boolean;
    /** Make header selectable */
    headerSelectable?: boolean;
    /** Define a custom sort function */
    customSort?: (a: T, b: T, isAsc: boolean) => number;
    /** Define a custom filter funtion for the search */
    customSearch?: (row: T, filter: string) => boolean;
    /** Adds native attributes to th */
    thAttrs?: object;
    /** Adds native attributes to td */
    tdAttrs?: object;
};
