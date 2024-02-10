import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        timepicker?: ComponentConfigBase &
            Partial<{
                /** Size of the button */
                size: string;
                /** Open dropdown on focus */
                openOnFocus: boolean;
                /** Enable dropdown mobile modal */
                mobileModal: boolean;
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
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class configuration for the internal input component */
                inputClasses: Record<string, any>;
                /** Class of the Timepicker component size */
                sizeClass: ClassDefinition;
                /** Close dropdown on click */
                closeOnClick: boolean;
                /** Dropdown trapFocus */
                trapFocus: boolean;
                /** Enable mobile native input if mobile agent */
                mobileNative: boolean;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Class of the Timepicker component box where you choose the date */
                boxClass: ClassDefinition;
                /** Class of the Timepicker footer */
                footerClass: ClassDefinition;
                /** Class configuration for the internal dropdown component */
                dropdownClasses: Record<string, any>;
                /** Class configuration for the internal select component */
                selectClasses: Record<string, any>;
                /** Custom function to format a date into a string */
                timeFormatter: (date: Date) => string;
                /** Custom function to parse a string into a date */
                timeParser: (date: string) => Date;
                /** time creator function, default is `new Date()` */
                timeCreator: () => Date;
                /** Class of the Timepicker separator */
                separatorClass: ClassDefinition;
            }>;
    }
}
