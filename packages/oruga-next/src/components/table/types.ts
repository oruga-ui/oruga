import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        table?: ComponentConfigBase &
            Partial<{
                /** Icon pack to use */
                iconPack: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the Table wrapper */
                wrapperClass: ClassDefinition;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Accessibility label for the pagination next page button. */
                ariaNextLabel: string;
                /** Accessibility label for the pagination previous page button. */
                ariaPreviousLabel: string;
                /** Class of the Table footer */
                footerClass: ClassDefinition;
                /** Class of the Table */
                tableClass: ClassDefinition;
                /** Class of the Table component when on mobile */
                mobileClass: ClassDefinition;
                /** How many rows per page (if paginated) */
                perPage: string | number;
                /** Accessibility label for the pagination page button. */
                ariaPageLabel: string;
                /** Accessibility label for the pagination current page button. */
                ariaCurrentLabel: string;
                /** Position of the checkbox when checkable */
                checkboxPosition: string;
                /** Color of the checkbox when checkable */
                checkboxVariant: string;
                /** Custom method to verify if a row is checkable, works when is checkable */
                isRowCheckable: (row: unknown) => boolean;
                /** Rows appears as cards on mobile (collapse rows) */
                mobileCards: boolean;
                /** Sets the default sort column and order — e.g. ['first_name', 'desc'] */
                defaultSort: string | string[];
                /** Sets the default sort column direction on the first click */
                defaultSortDirection: string;
                /** Sets the header sorting icon */
                sortIcon: string;
                /** Sets the size of the sorting icon */
                sortIconSize: string;
                /** Columns won't be sorted with Javascript, use with sort event to sort in your backend */
                backendSorting: boolean;
                /** Columns won't be filtered with Javascript, use with searchable prop to the columns to filter in your backend */
                backendFiltering: boolean;
                /** Add a class to row based on the return */
                rowClass: (row: unknown, index: number) => string;
                /** Controls the visibility of the trigger that toggles the detailed rows. */
                hasDetailedVisible: (row: unknown) => boolean;
                /** Use a unique key of your data Object when use detailed or opened detailed. (id recommended) */
                detailKey: string;
                /** Allow chevron icon and column to be visible */
                showDetailIcon: boolean;
                /** Icon name of detail action */
                detailIcon: string;
                /**  */
                detailTransition: string;
                /** Text when nothing is selected */
                mobileSortPlaceholder: string;
                /** Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended) */
                customRowKey: string;
                /** Show header */
                showHeader: boolean;
                /** Adds pagination to the table */
                paginated: boolean;
                /** Pagination position (if paginated) */
                paginationPosition: string;
                /** Rounded pagination if paginated */
                paginationRounded: boolean;
                /** Size of pagination if paginated */
                paginationSize: string;
                /** Enable simple style pagination if paginated */
                paginationSimple: boolean;
                /** Pagination buttons order if paginated */
                paginationOrder: string;
                /** Class of the Table when it is empty */
                emptyClass: ClassDefinition;
                /** Class of the Table row detail */
                detailedClass: ClassDefinition;
                /** Class of the Table when is bordered */
                borderedClass: ClassDefinition;
                /** Class of the Table when rows are striped */
                stripedClass: ClassDefinition;
                /** Class of the Table when rows are narrowed */
                narrowedClass: ClassDefinition;
                /** Class of the Table when is hoverable */
                hoverableClass: ClassDefinition;
                /** Class of the Table wrapper when header is sticky */
                stickyHeaderClass: ClassDefinition;
                /** Class of the Table wrapper when its content is scrollable */
                scrollableClass: ClassDefinition;
                /** Class of the Table row when selected */
                trSelectedClass: ClassDefinition;
                /** Class of the Table row when checkable and checked */
                trCheckedClass: ClassDefinition;
                /** Class of the Table `th` element */
                thClass: ClassDefinition;
                /** Class of the Table `th` element when component is positioned */
                thPositionClass: ClassDefinition;
                /** Class of the Table `th` element when component is sticky" */
                thStickyClass: ClassDefinition;
                /** Class of the Table `th` element when is checkable */
                thCheckboxClass: ClassDefinition;
                /** Class of the Table `th` element currently sorted */
                thCurrentSortClass: ClassDefinition;
                /** Class of the sortable Table `th` element */
                thSortableClass: ClassDefinition;
                /** Class of the Table `th` element that is unsortable */
                thUnselectableClass: ClassDefinition;
                /** Class of the Table sort icon in the header */
                thSortIconClass: ClassDefinition;
                /** Class of the Table `th` element of the detail column of triggers */
                thDetailedClass: ClassDefinition;
                /** Class of the Table `th` subheading element */
                thSubheadingClass: ClassDefinition;
                /** Class of the Table `td` element */
                tdClass: ClassDefinition;
                /** Class of the Table `td` element when component is positioned */
                tdPositionClass: ClassDefinition;
                /** Class of the Table `td` element when component is sticky */
                tdStickyClass: ClassDefinition;
                /** Class of the Table `td` element when is checkable */
                tdCheckboxClass: ClassDefinition;
                /** Class of the Table `td` element that contains the chevron to trigger details */
                tdDetailedChevronClass: ClassDefinition;
                /** Class of the sortable form wrapper on mobile */
                mobileSortClass: ClassDefinition;
                /** Class of the Table pagination wrapper */
                paginationWrapperClass: ClassDefinition;
            }>;
    }
}
