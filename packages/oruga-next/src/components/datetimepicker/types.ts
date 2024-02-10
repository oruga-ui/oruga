import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        datetimepicker?: ComponentConfigBase &
            Partial<{
                /** Size of the input control */
                size: string;
                /** Open dropdown on focus */
                openOnFocus: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Enable mobile native input if mobile agent */
                mobileNative: boolean;
                /** Custom function to format a date into a string */
                dateFormatter: (date: Date) => string;
                /** Custom function to parse a string into a date */
                dateParser: (date: string) => Date;
                /** Date creator function, default is `new Date()` */
                datetimeCreator: (date: Date) => Date;
                /** Class of the Datepicker wrapper */
                datepickerWrapperClass: ClassDefinition;
                /** Class of the Timepicker wrapper */
                timepickerWrapperClass: ClassDefinition;
            }>;
    }
}
