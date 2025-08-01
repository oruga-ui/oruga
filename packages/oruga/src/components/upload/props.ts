import type { Booleanish, ComponentClass } from "@/types";

type UploadType<T, IsMultiple> = IsMultiple extends true ? T[] : T;

export type UploadProps<
    T extends object | typeof File,
    IsMultiple extends boolean = false,
> = {
    /** Override existing theme classes completely */
    override?: Booleanish;
    /**
     * The input value state
     * @type object | File
     */
    modelValue?: UploadType<T, IsMultiple>;
    /** Same as native, also push new item to v-model instead of replacing */
    multiple?: IsMultiple;
    /**
     * Color of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /** Same as native disabled */
    disabled?: boolean;
    /** Same as native accept */
    accept?: string;
    /** Accepts drag & drop and change its style */
    dragDrop?: boolean;
    /** Upload will be expanded (full-width) */
    expanded?: boolean;
    /** Replace last chosen files every time (like native file input element) */
    native?: boolean;
    /** Enable HTML 5 native validation */
    useHtml5Validation?: boolean;
    /** Custom HTML 5 validation error to set on the form control */
    customValidity?:
        | string
        | ((
              currentValue: UploadType<T, IsMultiple> | null | undefined,
              state: ValidityState,
          ) => string);
} & UploadClasses;

// class props (will not be displayed in the docs)
export type UploadClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element when expanded */
    expandedClass: ComponentClass;
    /** Class of the root element with variant */
    variantClass: ComponentClass;
    /** Class of the dragable container element */
    draggableClass: ComponentClass;
    /** Class of the dragable container element when disabled */
    disabledClass: ComponentClass;
    /** Class of the dragable container element when hovered */
    hoveredClass: ComponentClass;
}>;
