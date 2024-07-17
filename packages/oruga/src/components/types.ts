import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";

// Auto generated component theme config definition
declare module "../index" {
    interface OrugaOptions {
        autocomplete?: ComponentConfigBase &
            Partial<{
                /** Add a button/icon to clear the inputed text */
                clearable: boolean;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will add a tag when typing (default tab and enter) */
                confirmKeys: string[];
                /** Class of the menu empty placeholder item */
                itemEmptyClass: ClassDefinition;
                /** Class of the menu footer item */
                itemFooterClass: ClassDefinition;
                /** Class of the menu header item */
                itemHeaderClass: ClassDefinition;
                /** Class of the menu items */
                itemClass: ClassDefinition;
                /** Class of the menu items group title */
                itemGroupTitleClass: ClassDefinition;
                /** Class of the menu items on hover */
                itemHoverClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Classes to apply on internal input component */
                inputClasses: Record<string, any>;
                /** Clear input text on select */
                clearOnSelect: boolean;
                /** Dropdown content (items) are shown into a modal on mobile */
                mobileModal: boolean;
                /** Icon name to be added on the clear button */
                clearIcon: string;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Icon to be shown */
                icon: string;
                /** Keep open dropdown list after select */
                keepOpen: boolean;
                /** Makes the component check if list reached scroll start or end and emit scroll events. */
                checkScroll: boolean;
                /** Max height of dropdown content */
                maxHeight: string | number;
                /** Menu item tag name */
                itemTag: DynamicComponent;
                /** Menu tag name */
                menuTag: DynamicComponent;
                /** Native options to use in HTML5 validation */
                autocomplete: string;
                /** Number of milliseconds to delay before to emit input event */
                debounce: number;
                /** Open dropdown list on focus */
                openOnFocus: boolean;
                /** Position of the dropdown */
                position: "auto" | "top" | "bottom";
                /** Size of the control */
                size: string;
                /** The first option will always be pre-selected (easier to just hit enter or tab) */
                keepFirst: boolean;
                /** Transition name to apply on dropdown list */
                animation: string;
            }>;
        button?: ComponentConfigBase &
            Partial<{
                /** Accessibility Role attribute to be passed to the button. */
                role: string;
                /** Button tag name */
                tag: DynamicComponent;
                /** Class of the button elements wrapper */
                wrapperClass: ClassDefinition;
                /** Class of the button icon */
                iconClass: ClassDefinition;
                /** Class of the button icon on the left */
                iconLeftClass: ClassDefinition;
                /** Class of the button icon on the right */
                iconRightClass: ClassDefinition;
                /** Class of the button label */
                labelClass: ClassDefinition;
                /** Class of the button size */
                sizeClass: ClassDefinition;
                /** Class of the button variant */
                variantClass: ClassDefinition;
                /** Class of the button when disabled */
                disabledClass: ClassDefinition;
                /** Class of the button when expanded */
                expandedClass: ClassDefinition;
                /** Class of the button when inverted */
                invertedClass: ClassDefinition;
                /** Class of the button when outlined */
                outlinedClass: ClassDefinition;
                /** Class of the button when rounded */
                roundedClass: ClassDefinition;
                /** Class of the button with loading */
                loadingClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color variant of the control */
                variant: string;
                /** Enable rounded style */
                rounded: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Size of the control */
                size: string;
            }>;
        carousel?: ComponentConfigBase &
            Partial<{
                /** Class of arrow elements */
                arrowIconClass: ClassDefinition;
                /** Class of carousel item */
                itemClass: ClassDefinition;
                /** Class of carousel item when is active */
                itemActiveClass: ClassDefinition;
                /** Class of carousel item when is clickable */
                itemClickableClass: ClassDefinition;
                /** Class of indicator element to separate different styles */
                indicatorItemStyleClass: ClassDefinition;
                /** Class of indicator element when is active */
                indicatorItemActiveClass: ClassDefinition;
                /** Class of indicator item element */
                indicatorItemClass: ClassDefinition;
                /** Class of indicator link element */
                indicatorClass: ClassDefinition;
                /** Class of indicators wrapper element */
                indicatorsClass: ClassDefinition;
                /** Class of indicators wrapper element when inside */
                indicatorsInsideClass: ClassDefinition;
                /** Class of indicators wrapper element when inside and position */
                indicatorsInsidePositionClass: ClassDefinition;
                /** Class of next arrow element */
                arrowIconNextClass: ClassDefinition;
                /** Class of prev arrow element */
                arrowIconPrevClass: ClassDefinition;
                /** Class of slider items */
                itemsClass: ClassDefinition;
                /** Class of slider items on drag */
                itemsDraggingClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element in overlay */
                overlayClass: ClassDefinition;
                /** Class of the wrapper element of carousel items */
                wrapperClass: ClassDefinition;
                /** Icon name for next icon */
                iconNext: string;
                /** Icon name for previous icon */
                iconPrev: string;
                /** Icon pack to use */
                iconPack: string;
                /** Icon size */
                iconSize: string;
                /** Number of items to show at once */
                itemsToShow: number;
                /** Number of items to switch at once */
                itemsToList: number;
                /** Position of the indicator - depends on used theme */
                indicatorPosition: string;
                /** Role attribute to be passed to the div wrapper for better accessibility */
                ariaRole: string;
                /** Show next / prev arrows */
                arrows: boolean;
                /** Show next / prev arrows only on hover */
                arrowsHover: boolean;
                /** Style of the indicator - depends on used theme */
                indicatorStyle: string;
                /** Timer interval for `autoplay` */
                interval: number;
            }>;
        checkbox?: ComponentConfigBase &
            Partial<{
                /** Class of the checkbox input */
                inputClass: ClassDefinition;
                /** Class of the checkbox input when checked */
                inputCheckedClass: ClassDefinition;
                /** Class of the checkbox labe */
                labelClass: ClassDefinition;
                /** Class of the checkbox size */
                sizeClass: ClassDefinition;
                /** Class of the checkbox variant */
                variantClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element when checked */
                checkedClass: ClassDefinition;
                /** Class when checkbox is disabled */
                disabledClass: ClassDefinition;
                /** Class when checkbox is indeterminate */
                indeterminateClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Size of the control */
                size: string;
            }>;
        collapse?: ComponentConfigBase &
            Partial<{
                /** Class of the content */
                contentClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the trigger element */
                triggerClass: ClassDefinition;
                /** Custom animation (transition name) */
                animation: string;
                /** Trigger position */
                position: "top" | "bottom";
            }>;
        datepicker?: ComponentConfigBase &
            Partial<{
                /** Accessibility next button aria label */
                ariaNextLabel: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | object;
                /** Class configuration for the internal dropdown component */
                dropdownClasses: Record<string, any>;
                /** Class configuration for the internal input component */
                inputClasses: Record<string, any>;
                /** Class configuration for the internal select component */
                selectClasses: Record<string, any>;
                /** Class of Datepicker header with days of the week inside the table */
                tableHeadClass: ClassDefinition;
                /** Class of table cell when it's selected */
                tableCellSelectedClass: ClassDefinition;
                /** Class of table cell when it's selected when type is month */
                monthCellSelectedClass: ClassDefinition;
                /** Class of the cell inside the table header */
                tableHeadCellClass: ClassDefinition;
                /** Class of the cell of a row when at least one event is present */
                tableCellEventsClass: ClassDefinition;
                /** Class of the Datepicker box where you choose the date */
                boxClass: ClassDefinition;
                /** Class of the Datepicker buttons inside the box */
                headerButtonsClass: ClassDefinition;
                /** Class of the Datepicker buttons inside the box when a size is choosen */
                headerButtonsSizeClass: ClassDefinition;
                /** Class of the Datepicker footer */
                footerClass: ClassDefinition;
                /** Class of the Datepicker header inside the box */
                headerClass: ClassDefinition;
                /** Class of the Datepicker size */
                sizeClass: ClassDefinition;
                /** Class of the Datepicker table inside the box */
                tableClass: ClassDefinition;
                /** Class of the Datepicker table inside the box when type is month */
                monthClass: ClassDefinition;
                /** Class of the Datepicker when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the event */
                tableEventClass: ClassDefinition;
                /** Class of the event indicator */
                tableEventIndicatorsClass: ClassDefinition;
                /** Class of the event indicator when a `variant` is specified */
                tableEventVariantClass: ClassDefinition;
                /** Class of the events container */
                tableEventsClass: ClassDefinition;
                /** Class of the events container when type is month */
                monthCellEventsClass: ClassDefinition;
                /** Class of the first hovered table cell during range selection */
                tableCellFirstHoveredClass: ClassDefinition;
                /** Class of the first hovered table cell during range selection when type is month */
                monthCellWithinHoveredRangeClass: ClassDefinition;
                /** Class of the first selected table cell when in range */
                tableCellFirstSelectedClass: ClassDefinition;
                /** Class of the first selected table cell when in range when type is month */
                monthCellFirstSelectedClass: ClassDefinition;
                /** Class of the last selected table cell during range selection */
                tableCellLastSelectedClass: ClassDefinition;
                /** Class of the last selected table cell during range selection when type is month */
                monthCellLastSelectedClass: ClassDefinition;
                /** Class of the last table cell hovered during range selection */
                tableCellLastHoveredClass: ClassDefinition;
                /** Class of the last table cell hovered during range selection when type is month */
                monthCellLastHoveredClass: ClassDefinition;
                /** Class of the month and year selects container inside the Datepicker box */
                listsClass: ClassDefinition;
                /** Class of the next button inside the Datepicker box */
                nextButtonClass: ClassDefinition;
                /** Class of the prev button inside the Datepicker box */
                prevButtonClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the table body inside the box */
                tableBodyClass: ClassDefinition;
                /** Class of the table body inside the box when type is month */
                monthBodyClass: ClassDefinition;
                /** Class of the table cell */
                tableCellClass: ClassDefinition;
                /** Class of the table cell of the current day */
                tableCellTodayClass: ClassDefinition;
                /** Class of the table cell of the current day when type is month */
                monthCellTodayClass: ClassDefinition;
                /** Class of the table cell that is selectable */
                tableCellSelectableClass: ClassDefinition;
                /** Class of the table cell that is selectable when type is month */
                monthCellSelectableClass: ClassDefinition;
                /** Class of the table cell that is unselectable */
                tableCellUnselectableClass: ClassDefinition;
                /** Class of the table cell that is unselectable when type is month */
                monthCellUnselectableClass: ClassDefinition;
                /** Class of the table cell when hovered during range selection */
                tableCellWithinHoveredClass: ClassDefinition;
                /** Class of the table cell when hovered during range selection and cell is in range when type is month */
                monthCellWithinHoveredClass: ClassDefinition;
                /** Class of the table cell when hovered during range selection when type is month */
                monthCellFirstHoveredClass: ClassDefinition;
                /** Class of the table cell when nearby days (prev/next month) are selectable */
                tableCellNearbyClass: ClassDefinition;
                /** Class of the table cell when nearby month days are hidden */
                tableCellInvisibleClass: ClassDefinition;
                /** Class of the table cell when type is month */
                monthCellClass: ClassDefinition;
                /** Class of the table cells within the range when the range is selected */
                tableCellWithinSelectedClass: ClassDefinition;
                /** Class of the table cells within the range when the range is selected when type is month */
                monthCellWithinSelectedClass: ClassDefinition;
                /** Class of the table container when type is month */
                monthTableClass: ClassDefinition;
                /** Class of the table row */
                tableRowClass: ClassDefinition;
                /** Close dropdown on click */
                closeOnClick: boolean;
                /** Custom function to format a date into a string */
                dateFormatter: (date: Date | [] | Date[] | [Date, Date]) => string;
                /** Custom function to parse a string into a date */
                dateParser: (date: string) => Date | [] | Date[] | [Date, Date];
                /** Date creator function, default is `new Date()` */
                dateCreator: () => Date;
                /** Define a list of weeks which can not be selected */
                unselectableDaysOfWeek: number[];
                /** Define if nearby month days can be selected */
                nearbySelectableMonthDays: boolean;
                /** Define if weeek numbers are clickable */
                weekNumberClickable: boolean;
                /** Define the range of years to show */
                yearsRange: number[];
                /** Enable dropdown mobile modal */
                mobileModal: boolean;
                /** Enable mobile native input if mobile agent */
                mobileNative: boolean;
                /** Icon name for next icon */
                iconNext: string;
                /** Icon name for previous icon */
                iconPrev: string;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Icon to be shown */
                icon: string;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Open dropdown on focus */
                openOnFocus: boolean;
                /** Set custom day names, else use names based on locale */
                dayNames: string[];
                /** Set custom month names, else use names based on locale */
                monthNames: string[];
                /** Set the first day of a week */
                firstDayOfWeek: number;
                /** Show nearby month days */
                nearbyMonthDays: boolean;
                /** Show weeek numbers */
                showWeekNumber: boolean;
                /** Size of the control input */
                size: string;
                /** Trap dropdown on focus */
                trapFocus: boolean;
            }>;
        datetimepicker?: ComponentConfigBase &
            Partial<{
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Class of the Datepicker wrapper */
                datepickerWrapperClass: ClassDefinition;
                /** Class of the Timepicker wrapper */
                timepickerWrapperClass: ClassDefinition;
                /** Custom function to format a date into a string */
                dateFormatter: (date: Date) => string;
                /** Custom function to parse a string into a date */
                dateParser: (date: string) => Date;
                /** Date creator function, default is `new Date()` */
                datetimeCreator: (date: Date) => Date;
                /** Enable mobile native input if mobile agent */
                mobileNative: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Icon to be shown */
                icon: string;
                /** Open dropdown on focus */
                openOnFocus: boolean;
                /** Size of the input control */
                size: string;
            }>;
        dropdown?: ComponentConfigBase &
            Partial<{
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | object;
                /** Class for the root element indicating position of dropdown */
                positionClass: ClassDefinition;
                /** Class for the root element indicating whether the dropdown is open */
                activeClass: ClassDefinition;
                /** Class for the root element when the dropdown is hoverable */
                hoverableClass: ClassDefinition;
                /** Class of dropdown menu position */
                menuPositionClass: ClassDefinition;
                /** Class of dropdown menu when active */
                menuActiveClass: ClassDefinition;
                /** Class of dropdown menu when inline */
                inlineClass: ClassDefinition;
                /** Class of dropdown when disabled */
                disabledClass: ClassDefinition;
                /** Class of dropdown when expanded */
                expandedClass: ClassDefinition;
                /** Class of dropdown when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the body when dropdown is open and scroll is clip */
                scrollClipClass: ClassDefinition;
                /** Class of the body when dropdown is open and scroll is not clip */
                noScrollClass: ClassDefinition;
                /** Class of the dropdown item */
                itemClass: ClassDefinition;
                /** Class of the dropdown item when active */
                itemActiveClass: ClassDefinition;
                /** Class of the dropdown item when clickable */
                itemClickableClass: ClassDefinition;
                /** Class of the dropdown item when disabled */
                itemDisabledClass: ClassDefinition;
                /** Class of the dropdown menu */
                menuClass: ClassDefinition;
                /** Class of the overlay when on mobile */
                menuMobileOverlayClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the trigger element */
                triggerClass: ClassDefinition;
                /** Class when the dropdown is teleported */
                teleportClass: ClassDefinition;
                /** Custom animation (transition name) */
                animation: string;
                /** Dropdown close options (pressing escape, clicking the content or outside) */
                closeable: boolean | string[];
                /** Dropdown content (items) are shown into a modal on mobile */
                mobileModal: boolean;
                /** Dropdown item tag name */
                itemTag: DynamicComponent;
                /** Dropdown menu tag name */
                menuTag: DynamicComponent;
                /** Dropdown trigger tag name */
                triggerTag: DynamicComponent;
                /** Dropdown will be triggered by any events */
                triggers: ("focus" | "click" | "hover" | "contextmenu")[];
                /** Makes the component check if menu reached scroll start or end and emit scroll events. */
                checkScroll: boolean;
                /** Max height of dropdown content */
                maxHeight: string | number;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Position of the dropdown relative to the trigger */
                position: "auto" | "top" | "bottom" | "left" | "right" | "top-right" | "top-left" | "bottom-left" | "bottom-right";
                /** Role attribute to be passed to the list container for better accessibility.
Use menu only in situations where your dropdown is related to a navigation menu. */
                ariaRole: "dialog" | "menu" | "list" | "listbox";
                /** Role attribute to be passed to the list item for better accessibility.
Use menuitem only in situations where your dropdown is related to a navigation menu. */
                itemAriaRole: string;
                /** Trap focus inside the dropdown. */
                trapFocus: boolean;
            }>;
        field?: ComponentConfigBase &
            Partial<{
                /**  */
                messageTag: DynamicComponent;
                /** "Class for field body when horizontal */
                bodyHorizontalClass: ClassDefinition;
                /** Class for components automatically attached together when inside a field */
                addonsClass: ClassDefinition;
                /** Class for field body */
                bodyClass: ClassDefinition;
                /** Class for field label */
                labelClass: ClassDefinition;
                /** Class for field label size */
                labelSizeClass: ClassDefinition;
                /** Class for field label when horizontal */
                labelHorizontalClass: ClassDefinition;
                /** Class for the field message */
                messageClass: ClassDefinition;
                /** Class for the filled field */
                filledClass: ClassDefinition;
                /** Class for the focused field */
                focusedClass: ClassDefinition;
                /** Class of file component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the label field variant */
                variantLabelClass: ClassDefinition;
                /** Class of the message field variant */
                variantMessageClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class to align label and control in horizontal forms */
                horizontalClass: ClassDefinition;
                /** Class when fields are grouped together */
                groupedClass: ClassDefinition;
                /** Class when fields fill up multiple lines */
                groupMultilineClass: ClassDefinition;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Vertical size of input */
                labelsize: string;
            }>;
        icon?: ComponentConfigBase &
            Partial<{
                /** Add class to icon font.
See icon library documentation for custom classes. */
                customClass: string;
                /** Class of the element when spin */
                spinClass: ClassDefinition;
                /** Class of the icon size */
                sizeClass: ClassDefinition;
                /** Class of the icon variant */
                variantClass: ClassDefinition;
                /** Class of the icon when clickable */
                clickableClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the icon */
                variant: string;
                /** Icon size */
                size: string;
            }>;
        input?: ComponentConfigBase &
            Partial<{
                /** Add a button/icon to clear the inputed text */
                clearable: boolean;
                /** Class of input when disabled */
                disabledClass: ClassDefinition;
                /** Class of input when expanded */
                expandedClass: ClassDefinition;
                /** Class of input when rounded */
                roundedClass: ClassDefinition;
                /** Class of input when type textarea */
                textareaClass: ClassDefinition;
                /** Class of the counter element */
                counterClass: ClassDefinition;
                /** Class of the input size */
                sizeClass: ClassDefinition;
                /** Class of the input variant */
                variantClass: ClassDefinition;
                /** Class of the left icon */
                iconLeftClass: ClassDefinition;
                /** Class of the left icon space inside the input */
                iconLeftSpaceClass: ClassDefinition;
                /** Class of the native input element */
                inputClass: ClassDefinition;
                /** Class of the right icon */
                iconRightClass: ClassDefinition;
                /** Class of the right icon space inside the input */
                iconRightSpaceClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class to display when a right icon is used */
                hasIconRightClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Icon name to be added on the clear button */
                clearIcon: string;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Icon to be shown */
                icon: string;
                /** Native options to use in HTML5 validation */
                autocomplete: string;
                /** Number of milliseconds to delay before to emit input event */
                debounce: number;
                /** Show character counter when maxlength prop is passed */
                counter: boolean;
                /** Size of the control */
                size: string;
            }>;
        loading?: ComponentConfigBase &
            Partial<{
                /** Class for the loading icon */
                iconClass: ClassDefinition;
                /** Class for the loading label */
                labelClass: ClassDefinition;
                /** Class for the root element when fullpage */
                fullPageClass: ClassDefinition;
                /** Class of the loading overlay */
                overlayClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Custom animation (transition name) */
                animation: string;
                /** DOM element where the loading component will be created on (for programmatic usage).
Note that this also changes fullPage to false. */
                container: string | HTMLElement;
                /** Enable spin effect on icon */
                iconSpin: boolean;
                /** Icon name to show, unnecessary when default slot is used. */
                icon: string;
                /** Icon size */
                iconSize: string;
            }>;
        menu?: ComponentConfigBase &
            Partial<{
                /** Class of the active menu item */
                itemActiveClass: ClassDefinition;
                /** Class of the disabled menu item */
                itemDisabledClass: ClassDefinition;
                /** Class of the icon of menu item */
                itemIconTextClass: ClassDefinition;
                /** Class of the menu item */
                itemClass: ClassDefinition;
                /** Class of the menu item when is a submenu */
                itemSubmenuClass: ClassDefinition;
                /** Class of the menu list */
                listClass: ClassDefinition;
                /** Class of the menu list label */
                listLabelClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element of menu item */
                itemWrapperClass: ClassDefinition;
                /** Icon pack to use */
                iconPack: string;
                /** Icon size */
                iconSize: string;
                /** Menu item tag name */
                menuTag: DynamicComponent;
                /** Role attribute to be passed to the list container for better accessibility.
Use menu only in situations where your dropdown is related to a navigation menu. */
                ariaRole: string;
                /** Role attribute to be passed to the list item for better accessibility. */
                itemAriaRole: string;
                /** Transition name to apply on menu list */
                animation: string;
            }>;
        modal?: ComponentConfigBase &
            Partial<{
                /** Accessibility aria-label to be passed to the div wrapper element */
                ariaLabel: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Automatically focus modal when active */
                autoFocus: boolean;
                /** Class of modal component when its active */
                activeClass: ClassDefinition;
                /** Class of modal component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the body when modal is open and scroll is clip */
                scrollClipClass: ClassDefinition;
                /** Class of the body when modal is open and scroll is not clip */
                noScrollClass: ClassDefinition;
                /** Class of the close button */
                closeClass: ClassDefinition;
                /** Class of the modal content */
                contentClass: ClassDefinition;
                /** Class of the modal overlay */
                overlayClass: ClassDefinition;
                /** Class of the modal when fullscreen */
                fullScreenClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Close icon name */
                closeIcon: string;
                /** Custom animation (transition name) */
                animation: string;
                /** Destroy modal on hide - default `true` for programmatic usage */
                destroyOnHide: boolean;
                /** DOM element where the modal component will be created on (for programmatic usage) */
                container: string | HTMLElement;
                /** Is Modal cancleable by clicking 'X', pressing escape or clicking outside */
                cancelable: boolean | string[];
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Role attribute to be passed to the div wrapper for better accessibility. */
                ariaRole: string;
                /** Show an overlay */
                overlay: boolean;
                /** Size of close icon */
                closeIconSize: string;
                /** Trap focus inside the modal */
                trapFocus: boolean;
                /** Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
but will set body to position fixed, might break some layouts. */
                scroll: "keep" | "clip";
                /** Width of the Modal */
                width: string | number;
            }>;
        notification?: ComponentConfigBase &
            Partial<{
                /** Accessibility label for the close button */
                ariaCloseLabel: string;
                /** Class of the close button container */
                closeClass: ClassDefinition;
                /** Class of the content element */
                contentClass: ClassDefinition;
                /** Class of the custom container element */
                noticeCustomContainerClass: ClassDefinition;
                /** Class of the element when positioned */
                positionClass: ClassDefinition;
                /** Class of the icon on the left */
                iconClass: ClassDefinition;
                /** Class of the notice when positioned */
                noticePositionClass: ClassDefinition;
                /** Class of the notification variant */
                variantClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the wrapper element */
                wrapperClass: ClassDefinition;
                /** Close icon name */
                closeIcon: string;
                /** Color of the control */
                variant: string;
                /** Custom animation (transition name) */
                animation: string;
                /** DOM element the toast will be created on (for programmatic usage).
Note that this also changes the position of the toast from fixed to absolute.
Meaning that the container should be fixed. */
                container: string | HTMLElement;
                /** Hide notification after duration (in miliseconds) */
                duration: number;
                /** Icon pack to use */
                iconPack: string;
                /** Icon size */
                iconSize: string;
                /** If notice should queue with others notices (snackbar/toast/notification). */
                queue: boolean;
                /** Root class of the notice */
                noticeClass: ClassDefinition;
                /** Size of close icon */
                closeIconSize: string;
                /** Which position the notification will appear when programmatically */
                position: string;
            }>;
        pagination?: ComponentConfigBase &
            Partial<{
                /** Accessibility label for the current page button. */
                ariaCurrentLabel: string;
                /** Accessibility label for the next page button. */
                ariaNextLabel: string;
                /** Accessibility label for the page button. */
                ariaPageLabel: string;
                /** Accessibility label for the previous page button. */
                ariaPreviousLabel: string;
                /** Buttons order */
                order: string;
                /** Class for the pagination size */
                sizeClass: ClassDefinition;
                /** Class of pagination component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the current link */
                linkCurrentClass: ClassDefinition;
                /** Class of the disabled link */
                linkDisabledClass: ClassDefinition;
                /** Class of the info in `simple` mode */
                infoClass: ClassDefinition;
                /** Class of the link button */
                linkClass: ClassDefinition;
                /** Class of the next button */
                nextButtonClass: ClassDefinition;
                /** Class of the pagination ellipsis */
                ellipsisClass: ClassDefinition;
                /** Class of the pagination in `simple` mode */
                simpleClass: ClassDefinition;
                /** Class of the pagination list */
                listClass: ClassDefinition;
                /** Class of the pagination list items */
                listItemClass: ClassDefinition;
                /** Class of the pagination order */
                orderClass: ClassDefinition;
                /** Class of the pagination when rounded */
                roundedClass: ClassDefinition;
                /** Class of the prev button */
                prevButtonClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Enable rounded button style */
                rounded: boolean;
                /** Enable simple style */
                simple: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to use for next button */
                iconNext: string;
                /** Icon to use for previous button */
                iconPrev: string;
                /** Items count for each page */
                perPage: string | number;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Pagination button tag name */
                buttonTag: DynamicComponent;
                /** Pagination size */
                size: string;
            }>;
        programmatic?: ComponentConfigBase &
            Partial<{
            }>;
        radio?: ComponentConfigBase &
            Partial<{
                /** Class of the native input element */
                inputClass: ClassDefinition;
                /** Class of the native input element when checked */
                inputCheckedClass: ClassDefinition;
                /** Class of the radio label */
                labelClass: ClassDefinition;
                /** Class of the radio size */
                sizeClass: ClassDefinition;
                /** Class of the radio variant */
                variantClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element when checked */
                checkedClass: ClassDefinition;
                /** Class when radio is disabled */
                disabledClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Size of the control */
                size: string;
            }>;
        select?: ComponentConfigBase &
            Partial<{
                /** Class of select when disabled */
                disabledClass: ClassDefinition;
                /** Class of select when expanded */
                expandedClass: ClassDefinition;
                /** Class of select when rounded */
                roundedClass: ClassDefinition;
                /** Class of the left icon */
                iconLeftClass: ClassDefinition;
                /** Class of the left icon space inside the select */
                iconLeftSpaceClass: ClassDefinition;
                /** Class of the native select element */
                selectClass: ClassDefinition;
                /** Class of the right icon */
                iconRightClass: ClassDefinition;
                /** Class of the right icon space inside the select */
                iconRightSpaceClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the select arrow */
                arrowClass: ClassDefinition;
                /** Class of the select placeholder */
                placeholderClass: ClassDefinition;
                /** Class of the select size */
                sizeClass: ClassDefinition;
                /** Class of the select variant */
                variantClass: ClassDefinition;
                /** Class of the select variant for the root element */
                rootVariantClass: ClassDefinition;
                /** Class of the select when multiple mode is active */
                multipleClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Icon to be shown */
                icon: string;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Vertical size of input */
                size: string;
            }>;
        sidebar?: ComponentConfigBase &
            Partial<{
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Class of sidebar component when its active */
                activeClass: ClassDefinition;
                /** Class of sidebar component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of sidebar when teleported */
                teleportClass: ClassDefinition;
                /** Class of the body when sidebar clipped */
                crollClipClass: ClassDefinition;
                /** Class of the body when sidebar is not clipped */
                noScrollClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the sidebar content */
                contentClass: ClassDefinition;
                /** Class of the sidebar content when sidebar is hidden */
                hiddenClass: ClassDefinition;
                /** Class of the sidebar content when sidebar is visible */
                visibleClass: ClassDefinition;
                /** Class of the sidebar overlay */
                overlayClass: ClassDefinition;
                /** Class of the sidebar position */
                positionClass: ClassDefinition;
                /** Class of the sidebar variant */
                variantClass: ClassDefinition;
                /** Class of the sidebar when expanded on hover */
                expandOnHoverClass: ClassDefinition;
                /** Class of the sidebar when is fullheight */
                fullheightClass: ClassDefinition;
                /** Class of the sidebar when is fullwidth */
                fullwidthClass: ClassDefinition;
                /** Class of the sidebar when its inlined */
                inlineClass: ClassDefinition;
                /** Class of the sidebar when reduced */
                reduceClass: ClassDefinition;
                /** Color of the sidebar */
                variant: string;
                /** Custom animation (transition name) */
                animation: string;
                /** Custom layout on mobile */
                mobile: string;
                /** Destroy sidebar on hide */
                destroyOnHide: boolean;
                /** DOM element where the sidebar component will be created on (for programmatic usage). */
                container: string | HTMLElement;
                /** Expand sidebar on hover when reduced or mobile is reduce */
                expandOnHover: boolean;
                /** Is Sidebar cancleable by pressing escape or clicking outside. */
                cancelable: boolean | string[];
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Show a small sidebar */
                reduce: boolean;
                /** Show an overlay like modal */
                overlay: boolean;
                /** Show sidebar in fullheight */
                fullheight: boolean;
                /** Show sidebar in fullwidth */
                fullwidth: boolean;
                /** Sidebar position */
                position: "top" | "bottom" | "left" | "right";
                /** Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
but will set body to position fixed, might break some layouts. */
                scroll: string;
            }>;
        skeleton?: ComponentConfigBase &
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the skeleton animation */
                animationClass: ClassDefinition;
                /** Class of the skeleton item */
                itemClass: ClassDefinition;
                /** Class of the skeleton item rounded */
                itemRoundedClass: ClassDefinition;
                /** Class of the skeleton position */
                positionClass: ClassDefinition;
                /** Class of the skeleton size */
                sizeClass: ClassDefinition;
                /** Enable rounded style */
                rounded: boolean;
                /** Show a loading animation */
                animated: boolean;
            }>;
        slider?: ComponentConfigBase &
            Partial<{
                /** Accessibility aria-label to to be passed to the slider thumb element. */
                ariaLabel: string;
                /** Class of slider tick */
                tickClass: ClassDefinition;
                /** Class of the filled part of the slider */
                fillClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the slider track */
                trackClass: ClassDefinition;
                /** Class of the slider variant */
                variantClass: ClassDefinition;
                /** Class of the thumb */
                thumbClass: ClassDefinition;
                /** Class of the thumb wrapper */
                thumbWrapperClass: ClassDefinition;
                /** Class of the vertical slider size */
                sizeClass: ClassDefinition;
                /** Class of tick label */
                tickLabelClass: ClassDefinition;
                /** Class to display on the wrapper element when the slider is dragged */
                thumbWrapperDraggingClass: ClassDefinition;
                /** Class when slider is disabled */
                disabledClass: ClassDefinition;
                /** Class when slider tick is hidden */
                tickHiddenClass: ClassDefinition;
                /** Class when the slider is rounded */
                thumbRoundedClass: ClassDefinition;
                /** Class when the thumb gets dragged */
                thumbDraggingClass: ClassDefinition;
                /** Color of the slider */
                variant: string;
                /** Color of the tooltip */
                tooltipVariant: string;
                /** Define v-model format */
                format: "raw" | "percent";
                /** Rounded thumb */
                rounded: boolean;
                /** Show tooltip when thumb is being dragged */
                tooltip: boolean;
                /** Vertical size of slider */
                size: string;
            }>;
        steps?: ComponentConfigBase &
            Partial<{
                /** Accessibility next button aria label */
                ariaNextLabel: string;
                /** Accessibility previous button aria label */
                ariaPreviousLabel: string;
                /** Apply animation on the initial render */
                animateInitially: boolean;
                /** Class of Steps component when animation gets triggered */
                animatedClass: ClassDefinition;
                /** Class of steps component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the content item */
                itemClass: ClassDefinition;
                /** Class of the nav item */
                itemHeaderClass: ClassDefinition;
                /** Class of the nav item behind the active one */
                itemHeaderPreviousClass: ClassDefinition;
                /** Class of the nav item when active */
                itemHeaderActiveClass: ClassDefinition;
                /** Class of the nav item with variant (default value by parent steps component) */
                itemHeaderVariantClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the Step component link label */
                stepLinkLabelClass: ClassDefinition;
                /** Class of the Step component link label when positioned */
                stepLinkLabelPositionClass: ClassDefinition;
                /** Class of the Steps component content */
                stepContentClass: ClassDefinition;
                /** Class of the Steps component content when transition is happening */
                stepContentTransitioningClass: ClassDefinition;
                /** Class of the Steps component dividers */
                stepDividerClass: ClassDefinition;
                /** Class of the Steps component link */
                stepLinkClass: ClassDefinition;
                /** Class of the Steps component link when clickable */
                stepLinkClickableClass: ClassDefinition;
                /** Class of the Steps component marker */
                stepMarkerClass: ClassDefinition;
                /** Class of the Steps component navigation element */
                stepNavigationClass: ClassDefinition;
                /** Class of the Steps component when is vertical and its position changes */
                positionClass: ClassDefinition;
                /** Class of the steps container */
                stepsClass: ClassDefinition;
                /** Class of the Steps markers trigger when are rounded */
                stepMarkerRoundedClass: ClassDefinition;
                /** Class of the tooltip trigger */
                verticalClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Icon on the left */
                icon: string;
                /** Icon pack */
                iconPack: string;
                /** Icon to use for navigation button */
                iconNext: string;
                /** Icon to use for navigation button */
                iconPrev: string;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Position of the marker label */
                labelPosition: string;
                /** Role attribute to be passed to the div wrapper for better accessibility */
                ariaRole: string;
                /** Sets a class to the item header */
                headerClass: string;
                /** Size of the steps */
                sizeClass: ClassDefinition;
                /** Step item tag name */
                itemTag: DynamicComponent;
                /** Step navigation is animated */
                animated: boolean;
                /** Step size */
                size: string;
                /** Transition animation name */
                animation: string[];
            }>;
        switch?: ComponentConfigBase &
            Partial<{
                /** Class of switch label position */
                positionClass: ClassDefinition;
                /** Class of the inner switch check */
                switchCheckClass: ClassDefinition;
                /** Class of the native input element when checked */
                inputCheckedClass: ClassDefinition;
                /** Class of the outer switch check */
                switchClass: ClassDefinition;
                /** Class of the outer switch check when checked */
                switchCheckedClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the switch label */
                labelClass: ClassDefinition;
                /** Class of the switch passive variant */
                passiveVariantClass: ClassDefinition;
                /** Class of the switch size */
                sizeClass: ClassDefinition;
                /** Class of the switch variant */
                variantClass: ClassDefinition;
                /** Class of the switch when rounded */
                roundedClass: ClassDefinition;
                /** Class when switch is disabled */
                disabledClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Color of the switch when is passive */
                passiveVariant: string;
                /** Root class of the native input checkbox */
                inputClass: ClassDefinition;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Size of the control */
                size: string;
            }>;
        table?: ComponentConfigBase &
            Partial<{
                /**  */
                detailTransition: string;
                /** Accessibility label for the pagination current page button. */
                ariaCurrentLabel: string;
                /** Accessibility label for the pagination next page button. */
                ariaNextLabel: string;
                /** Accessibility label for the pagination page button. */
                ariaPageLabel: string;
                /** Accessibility label for the pagination previous page button. */
                ariaPreviousLabel: string;
                /** Adds pagination to the table */
                paginated: boolean;
                /** Allow detail icon and column to be visible (if detailed) */
                showDetailIcon: boolean;
                /** Border to all cells */
                bordered: boolean;
                /** Class configuration for the internal loading component */
                loadingClasses: Record<string, any>;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the sortable form wrapper on mobile */
                mobileSortClass: ClassDefinition;
                /** Class of the sortable Table `th` element */
                thSortableClass: ClassDefinition;
                /** Class of the Table */
                tableClass: ClassDefinition;
                /** Class of the Table `td` element */
                tdClass: ClassDefinition;
                /** Class of the Table `td` element that contains the chevron to trigger details */
                tdDetailedChevronClass: ClassDefinition;
                /** Class of the Table `td` element when component is positioned */
                tdPositionClass: ClassDefinition;
                /** Class of the Table `td` element when component is sticky */
                tdStickyClass: ClassDefinition;
                /** Class of the Table `td` element when is checkable */
                tdCheckboxClass: ClassDefinition;
                /** Class of the Table `th` element */
                thClass: ClassDefinition;
                /** Class of the Table `th` element currently sorted */
                thCurrentSortClass: ClassDefinition;
                /** Class of the Table `th` element of the detail column of triggers */
                thDetailedClass: ClassDefinition;
                /** Class of the Table `th` element that is unsortable */
                thUnselectableClass: ClassDefinition;
                /** Class of the Table `th` element when component is positioned */
                thPositionClass: ClassDefinition;
                /** Class of the Table `th` element when component is sticky" */
                thStickyClass: ClassDefinition;
                /** Class of the Table `th` element when is checkable */
                thCheckboxClass: ClassDefinition;
                /** Class of the Table `th` subheading element */
                thSubheadingClass: ClassDefinition;
                /** Class of the Table component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the Table footer */
                footerClass: ClassDefinition;
                /** Class of the Table pagination wrapper */
                paginationWrapperClass: ClassDefinition;
                /** Class of the Table row detail */
                detailedClass: ClassDefinition;
                /** Class of the Table row when checkable and checked */
                trCheckedClass: ClassDefinition;
                /** Class of the Table row when selected */
                trSelectedClass: ClassDefinition;
                /** Class of the Table sort icon in the header */
                thSortIconClass: ClassDefinition;
                /** Class of the Table when is bordered */
                borderedClass: ClassDefinition;
                /** Class of the Table when is hoverable */
                hoverableClass: ClassDefinition;
                /** Class of the Table when it is empty */
                emptyClass: ClassDefinition;
                /** Class of the Table when rows are narrowed */
                narrowedClass: ClassDefinition;
                /** Class of the Table when rows are striped */
                stripedClass: ClassDefinition;
                /** Class of the Table wrapper */
                wrapperClass: ClassDefinition;
                /** Class of the Table wrapper when header is sticky */
                stickyHeaderClass: ClassDefinition;
                /** Class of the Table wrapper when its content is scrollable */
                scrollableClass: ClassDefinition;
                /** Color of the checkbox when checkable (if checkable) */
                checkboxVariant: string;
                /** Columns won't be filtered with Javascript, use with `searchable` prop to the columns to filter in your backend */
                backendFiltering: boolean;
                /** Columns won't be sorted with Javascript, use with `sort` event to sort in your backend */
                backendSorting: boolean;
                /** Controls the visibility of the trigger that toggles the detailed rows (if detailed) */
                isDetailedVisible: (row: unknown) => boolean;
                /** Custom method to verify if a row is checkable (if checkable) */
                isRowCheckable: (row: unknown) => boolean;
                /** Define individual class for a row */
                rowClass: (row: unknown, index: number) => string;
                /** Enable rounded pagination buttons (if paginated) */
                paginationRounded: boolean;
                /** Enable simple style pagination (if paginated) */
                paginationSimple: boolean;
                /** Filtering debounce time (in milliseconds) */
                debounceSearch: number;
                /** How many rows per page (if paginated) */
                perPage: string | number;
                /** Icon for the loading state */
                loadingIcon: string;
                /** Icon name of detail action (if detailed) */
                detailIcon: string;
                /** Icon of the column search input */
                filterIcon: string;
                /** Icon pack to use */
                iconPack: string;
                /** Label for the loading state */
                loadingLabel: string;
                /** Makes the cells narrower */
                narrowed: boolean;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Pagination buttons order (if paginated) */
                paginationOrder: string;
                /** Pagination position (if paginated) */
                paginationPosition: string;
                /** Placeholder of the column search input */
                filterPlaceholder: string;
                /** Position of the checkbox when checkable (if checkable) */
                checkboxPosition: string;
                /** Rows appears as cards on mobile (collapse rows) */
                mobileCards: boolean;
                /** Rows are highlighted when hovering */
                hoverable: boolean;
                /** Select placeholder text when nothing is selected (if mobileCards) */
                mobileSortPlaceholder: string;
                /** Sets the default sort column and order — e.g. 'first_name' or ['first_name', 'desc'] */
                defaultSort: string | [string, "asc" | "desc"];
                /** Sets the default sort column direction on the first click */
                defaultSortDirection: "asc" | "desc";
                /** Sets the header sorting icon */
                sortIcon: string;
                /** Sets the size of the sorting icon */
                sortIconSize: string;
                /** Show header */
                showHeader: boolean;
                /** Size of pagination (if paginated) */
                paginationSize: string;
                /** Table can be focused and user can select rows. Rows can be navigate with keyboard arrows and are highlighted when hovering. */
                selectable: boolean;
                /** Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended) */
                rowKey: string;
                /** Whether table is striped */
                striped: boolean;
            }>;
        tabs?: ComponentConfigBase &
            Partial<{
                /** Apply animation on the initial render */
                animateInitially: boolean;
                /** Class of Tabs component when expanded */
                expandedClass: ClassDefinition;
                /** Class of Tabs component when multiline */
                multilineClass: ClassDefinition;
                /** Class of Tabs component when vertical */
                verticalClass: ClassDefinition;
                /** Class of Tabs component when when is vertical and its position changes */
                positionClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the tab content */
                contentClass: ClassDefinition;
                /** Class of the tab content when transitioning */
                transitioningClass: ClassDefinition;
                /** Class of the tab item */
                itemClass: ClassDefinition;
                /** Class of the tab item header */
                itemHeaderClass: ClassDefinition;
                /** Class of the tab item header icon */
                itemHeaderIconClass: ClassDefinition;
                /** Class of the tab item header text */
                itemHeaderTextClass: ClassDefinition;
                /** Class of the tab item header type */
                itemHeaderTypeClass: ClassDefinition;
                /** Class of the tab item header when active */
                itemHeaderActiveClass: ClassDefinition;
                /** Class of the tab item header when disabled */
                itemHeaderDisabledClass: ClassDefinition;
                /** Class of the tab item wrapper */
                itemWrapperClass: ClassDefinition;
                /** Class of the Tabs component nav position */
                navPositionClass: ClassDefinition;
                /** Class of the Tabs component nav tabs */
                navTabsClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Icon on the left */
                icon: string;
                /** Icon pack */
                iconPack: string;
                /** Role attribute to be passed to the div wrapper for better accessibility. */
                ariaRole: string;
                /** Sets a class to the item header */
                headerClass: string;
                /** Show tab in vertical layout */
                vertical: boolean;
                /** Size of the navigation */
                navSizeClass: ClassDefinition;
                /** Tab size */
                size: string;
                /** Tab type */
                type: string;
                /** Tab will have an animation */
                animated: boolean;
                /** Tabs item tag name */
                itemTag: DynamicComponent;
                /** Transition animation name */
                animation: string[];
                /** Type of the navigation */
                navTypeClass: ClassDefinition;
            }>;
        taginput?: ComponentConfigBase &
            Partial<{
                /** Accessibility label for the close button */
                ariaCloseLabel: string;
                /** Add close/delete button to the item */
                closable: boolean;
                /** Allow removing last item when pressing given keys
(https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values),
if input is empty */
                removeOnKeys: string[];
                /** Allows adding new items */
                allowNew: boolean;
                /** Allows adding the same item multiple time */
                allowDuplicates: boolean;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Array of chars used to split when pasting a new string */
                separators: string[];
                /** Array of keys
(https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
which will add a item when typing */
                confirmKeys: string[];
                /** Class configuration for the underlying autocomplete component */
                autocompleteClasses: Record<string, any>;
                /** Class of input when expanded */
                expandedClass: ClassDefinition;
                /** Class of the close button of entered item */
                closeClass: ClassDefinition;
                /** Class of the counter element */
                counterClass: ClassDefinition;
                /** Class of the entered item */
                itemClass: ClassDefinition;
                /** Class of the entered item variant */
                variantClass: ClassDefinition;
                /** Class of the input container */
                containerClass: ClassDefinition;
                /** Class of the input container size */
                sizeClass: ClassDefinition;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the each item */
                variant: string;
                /** Icon name of close icon on selected item */
                closeIcon: string;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Keep open dropdown list after select */
                keepOpen: boolean;
                /** Makes the component check if list reached scroll start or end and emit scroll events. */
                checkScroll: boolean;
                /** Native options to use in HTML5 validation */
                autocomplete: string;
                /** Show counter when maxlength or maxtags props are passed */
                counter: boolean;
                /** Vertical size of the input control */
                size: string;
            }>;
        timepicker?: ComponentConfigBase &
            Partial<{
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Class configuration for the internal dropdown component */
                dropdownClasses: Record<string, any>;
                /** Class configuration for the internal input component */
                inputClasses: Record<string, any>;
                /** Class configuration for the internal select component */
                selectClasses: Record<string, any>;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the Timepicker component box where you choose the date */
                boxClass: ClassDefinition;
                /** Class of the Timepicker component size */
                sizeClass: ClassDefinition;
                /** Class of the Timepicker footer */
                footerClass: ClassDefinition;
                /** Class of the Timepicker separator */
                separatorClass: ClassDefinition;
                /** Close dropdown on click */
                closeOnClick: boolean;
                /** Custom function to format a date into a string */
                timeFormatter: (date: Date) => string;
                /** Custom function to parse a string into a date */
                timeParser: (date: string) => Date;
                /** Dropdown trapFocus */
                trapFocus: boolean;
                /** Enable dropdown mobile modal */
                mobileModal: boolean;
                /** Enable mobile native input if mobile agent */
                mobileNative: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Icon to be shown */
                icon: string;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Open dropdown on focus */
                openOnFocus: boolean;
                /** Size of the button */
                size: string;
                /** time creator function, default is `new Date()` */
                timeCreator: () => Date;
            }>;
        tooltip?: ComponentConfigBase &
            Partial<{
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the tooltip arrow */
                arrowClass: ClassDefinition;
                /** Class of the tooltip arrow position */
                arrowPositionClass: ClassDefinition;
                /** Class of the tooltip content */
                contentClass: ClassDefinition;
                /** Class of the tooltip content when is multiline */
                multilineClass: ClassDefinition;
                /** Class of the tooltip trigger */
                triggerClass: ClassDefinition;
                /** Class of the tooltip trigger position */
                positionClass: ClassDefinition;
                /** Class of the tooltip trigger when is always visible */
                alwaysClass: ClassDefinition;
                /** Class of the tooltip variant */
                variantClass: ClassDefinition;
                /** Class when the dropdown is teleported */
                teleportClass: ClassDefinition;
                /** Color of the tooltip */
                variant: string;
                /** Position of the Tooltip relative to the trigger */
                position: string;
                /** Tooltip auto close options (pressing escape, clicking the content or outside) */
                closeable: boolean | string[];
                /** Tooltip default animation */
                animation: string;
                /** Tooltip trigger events */
                triggers: string[];
                /** Tooltip trigger tag name */
                triggerTag: DynamicComponent;
            }>;
        upload?: ComponentConfigBase &
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the Upload variant */
                variantClass: ClassDefinition;
                /** Class of the Upload when disabled */
                disabledClass: ClassDefinition;
                /** Class of the Upload when draggable */
                draggableClass: ClassDefinition;
                /** Class of the Upload when expanded */
                expandedClass: ClassDefinition;
                /** Class of the Upload when hovered */
                hoveredClass: ClassDefinition;
                /** Color of the control */
                variant: string;
            }>;
    }
}
