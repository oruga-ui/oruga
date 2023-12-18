import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";

declare module "../../index" {
    interface OrugaOptions {
        datetimepicker?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the Datepicker wrapper */
                datepickerWrapperClass: ClassDefinition;
                /** Class of the Timepicker wrapper */
                timepickerWrapperClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /**  Size of the input control  */
                size: string;
                /** Open dropdown on focus */
                openOnFocus: string;
                /** Custom function to format a date into a string */
                datetimeFormatter: (date: Date) => string;
                /** Custom function to parse a string into a date */
                datetimeParser: (date: string) => Date;
                /** Date creator function, default is `new Date()` */
                datetimeCreator: (date: Date) => Date;
                /** Enable mobile native input if mobile agent */
                mobileNative: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Append the component to another part of the DOM. */
                teleport: DynamicComponent;
            }>;
    }
}
