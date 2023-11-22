import type { ClassDefinition, ComponentConfigBase } from "@/types";

declare module "@/types" {
    interface OrugaOptions {
        timepicker?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the Timepicker component size */
                sizeClass: ClassDefinition;
                /** Class of the Timepicker component box where you choose the date */
                boxClass: ClassDefinition;
                /** Class of the Timepicker separator */
                separatorClass: ClassDefinition;
                /** Class of the Timepicker footer */
                footerClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Size of the button */
                size: string;
                /** Open dropdown on focus */
                openOnFocus: boolean;
                /** Close dropdown on click */
                closeOnClick: boolean;
                /** Custom function to format a date into a string */
                timeFormatter: (date: Date) => string;
                /** Custom function to parse a string into a date */
                timeParser: (date: string) => Date;
                /** time creator function, default is `new Date()` */
                timeCreator: () => Date;
                /** Dropdown trapFocus */
                trapFocus: boolean;
                /** Enable dropdown mobile modal */
                mobileModal: boolean;
                /** Enable mobile native input if mobile agent */
                mobileNative: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Append the component to another part of the DOM. */
                teleport: string | boolean;
                /** Class configuration for the underlying input component */
                inputClasses: OrugaOptions["input"];
                /** Class configuration for the underlying dropdown component */
                dropdownClasses: OrugaOptions["dropdown"];
                /** Class configuration for the underlying select component */
                selectClasses: OrugaOptions["select"];
            }>;
    }
}
