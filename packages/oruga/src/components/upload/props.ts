import type { ComponentClass } from "@/types";

type UploadType<T, IsMultiple> = IsMultiple extends true ? T[] : T;

export type UploadProps<
    T extends object | typeof File,
    IsMultiple extends boolean,
> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * The input value state
     * @type object | File
     */
    modelValue?: UploadType<T, IsMultiple> | null;
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
type UploadClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the Upload when draggable */
    draggableClass: ComponentClass;
    /** Class of the Upload variant */
    variantClass: ComponentClass;
    /** Class of the Upload when expanded */
    expandedClass: ComponentClass;
    /** Class of the Upload when disabled */
    disabledClass: ComponentClass;
    /** Class of the Upload when hovered */
    hoveredClass: ComponentClass;
}>;
