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
                /** Menu tag name */
                menuTag: DynamicComponent;
                /** Menu item tag name */
                itemTag: DynamicComponent;
                /** Size of the control */
                size: string;
                /** Position of the dropdown */
                position: "auto" | "top" | "bottom";
                /** Makes the component check if list reached scroll start or end and emit scroll events. */
                checkScroll: boolean;
                /** Number of milliseconds to delay before to emit input event */
                debounce: number;
                /** The first option will always be pre-selected (easier to just hit enter or tab) */
                keepFirst: boolean;
                /** Clear input text on select */
                clearOnSelect: boolean;
                /** Open dropdown list on focus */
                openOnFocus: boolean;
                /** Keep open dropdown list after select */
                keepOpen: boolean;
                /** Max height of dropdown content */
                maxHeight: string | number;
                /** Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will add a tag when typing (default tab and enter) */
                confirmKeys: string[];
                /** Dropdown content (items) are shown into a modal on mobile */
                mobileModal: boolean;
                /** Transition name to apply on dropdown list */
                animation: string;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Add a button/icon to clear the inputed text */
                clearable: boolean;
                /** Icon name to be added on the clear button */
                clearIcon: string;
                /** Native options to use in HTML5 validation */
                autocomplete: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | object;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the menu items */
                itemClass: ClassDefinition;
                /** Class of the menu items on hover */
                itemHoverClass: ClassDefinition;
                /** Class of the menu items group title */
                itemGroupTitleClass: ClassDefinition;
                /** Class of the menu empty placeholder item */
                itemEmptyClass: ClassDefinition;
                /** Class of the menu header item */
                itemHeaderClass: ClassDefinition;
                /** Class of the menu footer item */
                itemFooterClass: ClassDefinition;
                /** Classes to apply on internal input component */
                inputClasses: Record<string, any>;
            }>;
        button?: ComponentConfigBase &
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Size of the control */
                size: string;
                /** Class of the button when expanded */
                expandedClass: ClassDefinition;
                /** Class of the button when rounded */
                roundedClass: ClassDefinition;
                /** Class of the button when disabled */
                disabledClass: ClassDefinition;
                /** Class of the button icon on the left */
                iconLeftClass: ClassDefinition;
                /** Class of the button icon on the right */
                iconRightClass: ClassDefinition;
                /** Class of the button size */
                sizeClass: ClassDefinition;
                /** Class of the button variant */
                variantClass: ClassDefinition;
                /** Color variant of the control */
                variant: string;
                /** Enable rounded style */
                rounded: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Accessibility Role attribute to be passed to the button. */
                ariaRole: string;
                /** Button tag name */
                tag: DynamicComponent;
                /** Class of the button elements wrapper */
                wrapperClass: ClassDefinition;
                /** Class of the button when outlined */
                outlinedClass: ClassDefinition;
                /** Class of the button with loading */
                loadingClass: ClassDefinition;
                /** Class of the button when inverted */
                invertedClass: ClassDefinition;
                /** Class of the button icon */
                iconClass: ClassDefinition;
                /** Class of the button label */
                labelClass: ClassDefinition;
            }>;
        carousel?: ComponentConfigBase &
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Icon pack to use */
                iconPack: string;
                /** Class of the root element in overlay */
                overlayClass: ClassDefinition;
                /** Class of the wrapper element of carousel items */
                wrapperClass: ClassDefinition;
                /** Timer interval for `autoplay` */
                interval: number;
                /** Position of the indicator - depends on used theme */
                indicatorPosition: string;
                /** Style of the indicator - depends on used theme */
                indicatorStyle: string;
                /** Number of items to show at once */
                itemsToShow: number;
                /** Number of items to switch at once */
                itemsToList: number;
                /** Show next / prev arrows */
                arrows: boolean;
                /** Show next / prev arrows only on hover */
                arrowsHover: boolean;
                /** Icon size */
                iconSize: string;
                /** Icon name for previous icon */
                iconPrev: string;
                /** Icon name for next icon */
                iconNext: string;
                /** Class of slider items */
                itemsClass: ClassDefinition;
                /** Class of slider items on drag */
                itemsDraggingClass: ClassDefinition;
                /** Class of arrow elements */
                arrowIconClass: ClassDefinition;
                /** Class of prev arrow element */
                arrowIconPrevClass: ClassDefinition;
                /** Class of next arrow element */
                arrowIconNextClass: ClassDefinition;
                /** Class of indicator link element */
                indicatorClass: ClassDefinition;
                /** Class of indicators wrapper element */
                indicatorsClass: ClassDefinition;
                /** Class of indicators wrapper element when inside */
                indicatorsInsideClass: ClassDefinition;
                /** Class of indicators wrapper element when inside and position */
                indicatorsInsidePositionClass: ClassDefinition;
                /** Class of indicator item element */
                indicatorItemClass: ClassDefinition;
                /** Class of indicator element when is active */
                indicatorItemActiveClass: ClassDefinition;
                /** Class of indicator element to separate different styles */
                indicatorItemStyleClass: ClassDefinition;
                /** Class of carousel item */
                itemClass: ClassDefinition;
                /** Role attribute to be passed to the div wrapper for better accessibility */
                ariaRole: string;
                /** Class of carousel item when is active */
                itemActiveClass: ClassDefinition;
                /** Class of carousel item when is clickable */
                itemClickableClass: ClassDefinition;
            }>;
        checkbox?: ComponentConfigBase &
            Partial<{
                /** Color of the control */
                variant: string;
                /** Size of the control */
                size: string;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class when checkbox is disabled */
                disabledClass: ClassDefinition;
                /** Class of the root element when checked */
                checkedClass: ClassDefinition;
                /** Class of the checkbox input */
                inputClass: ClassDefinition;
                /** Class of the checkbox input when checked */
                inputCheckedClass: ClassDefinition;
                /** Class when checkbox is indeterminate */
                indeterminateClass: ClassDefinition;
                /** Class of the checkbox labe */
                labelClass: ClassDefinition;
                /** Class of the checkbox size */
                sizeClass: ClassDefinition;
                /** Class of the checkbox variant */
                variantClass: ClassDefinition;
            }>;
        collapse?: ComponentConfigBase &
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Trigger position */
                position: "top" | "bottom";
                /** Custom animation (transition name) */
                animation: string;
                /** Class of the trigger element */
                triggerClass: ClassDefinition;
                /** Class of the content */
                contentClass: ClassDefinition;
            }>;
        datepicker?: ComponentConfigBase &
            Partial<{
                /** Set custom day names, else use names based on locale */
                dayNames: string[];
                /** Set custom month names, else use names based on locale */
                monthNames: string[];
                /** Size of the control input */
                size: string;
                /** Open dropdown on focus */
                openOnFocus: boolean;
                /** Close dropdown on click */
                closeOnClick: boolean;
                /** Custom function to format a date into a string */
                formatter: ((date: Date | [] | Date[] | [Date, Date]) => string) | undefined;
                /** Custom function to parse a string into a date */
                parser: ((date: string) => Date | [] | Date[] | [Date, Date]) | undefined;
                /** Date creator function, default is `new Date()` */
                creator: (() => Date);
                /** Define a list of weeks which can not be selected */
                unselectableDaysOfWeek: number[];
                /** Show nearby month days */
                nearbyMonthDays: boolean;
                /** Define if nearby month days can be selected */
                nearbySelectableMonthDays: boolean;
                /** Show week numbers */
                showWeekNumber: boolean;
                /** Define if week numbers are clickable */
                weekNumberClickable: boolean;
                /** Set the first day of a week */
                firstDayOfWeek: number;
                /** Define the range of years to show */
                yearsRange: number[];
                /** Trap dropdown on focus */
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
                /** Icon name for previous icon */
                iconPrev: string;
                /** Icon name for next icon */
                iconNext: string;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | object;
                /** Accessibility next button aria label */
                ariaNextLabel: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the Datepicker size */
                sizeClass: ClassDefinition;
                /** Class of the Datepicker box where you choose the date */
                boxClass: ClassDefinition;
                /** Class of the Datepicker header inside the box */
                headerClass: ClassDefinition;
                /** Class of the Datepicker buttons inside the box */
                headerButtonsClass: ClassDefinition;
                /** Class of the Datepicker buttons inside the box when a size is choosen */
                headerButtonsSizeClass: ClassDefinition;
                /** Class of the prev button inside the Datepicker box */
                prevButtonClass: ClassDefinition;
                /** Class of the next button inside the Datepicker box */
                nextButtonClass: ClassDefinition;
                /** Class of the month and year selects container inside the Datepicker box */
                listsClass: ClassDefinition;
                /** Class of the Datepicker footer */
                footerClass: ClassDefinition;
                /** Class of the Datepicker table inside the box */
                tableClass: ClassDefinition;
                /** Class of Datepicker header with days of the week inside the table */
                tableHeadClass: ClassDefinition;
                /** Class of the cell inside the table header */
                tableHeadCellClass: ClassDefinition;
                /** Class of the table body inside the box */
                tableBodyClass: ClassDefinition;
                /** Class of the table row */
                tableRowClass: ClassDefinition;
                /** Class of the table cell */
                tableCellClass: ClassDefinition;
                /** Class of the table cell when nearby month days are hidden */
                tableCellInvisibleClass: ClassDefinition;
                /** Class of table cell when it's selected */
                tableCellSelectedClass: ClassDefinition;
                /** Class of the first selected table cell when in range */
                tableCellFirstSelectedClass: ClassDefinition;
                /** Class of the table cells within the range when the range is selected */
                tableCellWithinSelectedClass: ClassDefinition;
                /** Class of the last selected table cell during range selection */
                tableCellLastSelectedClass: ClassDefinition;
                /** Class of the first hovered table cell during range selection */
                tableCellFirstHoveredClass: ClassDefinition;
                /** Class of the table cell when hovered during range selection */
                tableCellWithinHoveredClass: ClassDefinition;
                /** Class of the last table cell hovered during range selection */
                tableCellLastHoveredClass: ClassDefinition;
                /** Class of the table cell of the current day */
                tableCellTodayClass: ClassDefinition;
                /** Class of the table cell that is selectable */
                tableCellSelectableClass: ClassDefinition;
                /** Class of the table cell that is unselectable */
                tableCellUnselectableClass: ClassDefinition;
                /** Class of the table cell when nearby days (prev/next month) are selectable */
                tableCellNearbyClass: ClassDefinition;
                /** Class of the cell of a row when at least one event is present */
                tableCellEventsClass: ClassDefinition;
                /** Class of the events container */
                tableEventsClass: ClassDefinition;
                /** Class of the event */
                tableEventClass: ClassDefinition;
                /** Class of the event indicator when a `variant` is specified */
                tableEventVariantClass: ClassDefinition;
                /** Class of the event indicator */
                tableEventIndicatorsClass: ClassDefinition;
                /** Class of the Datepicker table inside the box when type is month */
                monthClass: ClassDefinition;
                /** Class of the table body inside the box when type is month */
                monthBodyClass: ClassDefinition;
                /** Class of the table container when type is month */
                monthTableClass: ClassDefinition;
                /** Class of the table cell when type is month */
                monthCellClass: ClassDefinition;
                /** Class of table cell when it's selected when type is month */
                monthCellSelectedClass: ClassDefinition;
                /** Class of the first selected table cell when in range when type is month */
                monthCellFirstSelectedClass: ClassDefinition;
                /** Class of the table cells within the range when the range is selected when type is month */
                monthCellWithinSelectedClass: ClassDefinition;
                /** Class of the last selected table cell during range selection when type is month */
                monthCellLastSelectedClass: ClassDefinition;
                /** Class of the first hovered table cell during range selection when type is month */
                monthCellWithinHoveredRangeClass: ClassDefinition;
                /** Class of the table cell when hovered during range selection when type is month */
                monthCellFirstHoveredClass: ClassDefinition;
                /** Class of the table cell when hovered during range selection and cell is in range when type is month */
                monthCellWithinHoveredClass: ClassDefinition;
                /** Class of the last table cell hovered during range selection when type is month */
                monthCellLastHoveredClass: ClassDefinition;
                /** Class of the table cell of the current day when type is month */
                monthCellTodayClass: ClassDefinition;
                /** Class of the table cell that is selectable when type is month */
                monthCellSelectableClass: ClassDefinition;
                /** Class of the table cell that is unselectable when type is month */
                monthCellUnselectableClass: ClassDefinition;
                /** Class of the events container when type is month */
                monthCellEventsClass: ClassDefinition;
                /** Class of the Datepicker when on mobile */
                mobileClass: ClassDefinition;
                /** Class for the underlaying dropdown component */
                dropdownClass: ClassDefinition;
                /** Class for the HTML input element */
                inputClass: ClassDefinition;
                /** Class configuration for the internal input component */
                inputClasses: Record<string, any>;
                /** Class configuration for the internal dropdown component */
                dropdownClasses: Record<string, any>;
                /** Class configuration for the internal select component */
                selectClasses: Record<string, any>;
            }>;
        datetimepicker?: ComponentConfigBase &
            Partial<{
                /** Size of the input control */
                size: string;
                /** Open dropdown on focus */
                openOnFocus: boolean;
                /** Custom function to format a date into a string */
                dateFormatter: ((date: Date) => string) | undefined;
                /** Custom function to parse a string into a date */
                dateParser: ((date: string) => Date) | undefined;
                /** Date creator function, default is `new Date()` */
                datetimeCreator: (() => Date);
                /** Enable mobile native input if mobile agent */
                mobileNative: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | object;
                /** Class of the Datepicker wrapper */
                datepickerWrapperClass: ClassDefinition;
                /** Class of the Timepicker wrapper */
                timepickerWrapperClass: ClassDefinition;
            }>;
        dropdown?: ComponentConfigBase &
            Partial<{
                /** Max height of dropdown content */
                maxHeight: string | number;
                /** Position of the dropdown relative to the trigger */
                position: "left" | "right" | "auto" | "top" | "bottom" | "top-right" | "top-left" | "bottom-left" | "bottom-right";
                /** Dropdown content (items) are shown into a modal on mobile */
                mobileModal: boolean;
                /** Dropdown content (items) are shown into a modal on desktop */
                desktopModal: boolean;
                /** Custom animation (transition name) */
                animation: string;
                /** Trap focus inside the dropdown. */
                trapFocus: boolean;
                /** Makes the component check if menu reached scroll start or end and emit scroll events. */
                checkScroll: boolean;
                /** Dropdown menu tag name */
                menuTag: DynamicComponent;
                /** Dropdown trigger tag name */
                triggerTag: DynamicComponent;
                /** Dropdown will be triggered by any events */
                triggers: ("click" | "contextmenu" | "focus" | "hover")[];
                /** Dropdown close options (pressing escape, clicking the content or outside) */
                closeable: boolean | string[];
                /** Role attribute to be passed to the list container for better accessibility.
Use menu only in situations where your dropdown is related to a navigation menu. */
                ariaRole: "dialog" | "menu" | "list" | "listbox";
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | object;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class when the dropdown is teleported */
                teleportClass: ClassDefinition;
                /** Class of the trigger element */
                triggerClass: ClassDefinition;
                /** Class of dropdown menu when inline */
                inlineClass: ClassDefinition;
                /** Class of the dropdown menu */
                menuClass: ClassDefinition;
                /** Class of dropdown menu position */
                menuPositionClass: ClassDefinition;
                /** Class of dropdown menu when active */
                menuActiveClass: ClassDefinition;
                /** Class of dropdown when on mobile */
                mobileClass: ClassDefinition;
                /** Class of dropdown when on is shown as modal */
                modalClass: ClassDefinition;
                /** Class of the overlay when is shown as modal */
                overlayClass: ClassDefinition;
                /** Class of dropdown when disabled */
                disabledClass: ClassDefinition;
                /** Class of dropdown when expanded */
                expandedClass: ClassDefinition;
                /** Class for the root element indicating position of dropdown */
                positionClass: ClassDefinition;
                /** Class for the root element indicating whether the dropdown is open */
                activeClass: ClassDefinition;
                /** Class for the root element when the dropdown is hoverable */
                hoverableClass: ClassDefinition;
                /** Class of the body when dropdown is open and scroll is clip */
                scrollClipClass: ClassDefinition;
                /** Class of the body when dropdown is open and scroll is not clip */
                noScrollClass: ClassDefinition;
                /** Dropdown item tag name */
                itemTag: DynamicComponent;
                /** Role attribute to be passed to the list item for better accessibility.
Use menuitem only in situations where your dropdown is related to a navigation menu. */
                itemAriaRole: string;
                /** Class of the dropdown item */
                itemClass: ClassDefinition;
                /** Class of the dropdown item when active */
                itemActiveClass: ClassDefinition;
                /** Class of the dropdown item when clickable */
                itemClickableClass: ClassDefinition;
                /** Class of the dropdown item when disabled */
                itemDisabledClass: ClassDefinition;
            }>;
        field?: ComponentConfigBase &
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of file component when on mobile */
                mobileClass: ClassDefinition;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Vertical size of input */
                labelsize: string;
                /**  */
                messageTag: DynamicComponent;
                /** Class to align label and control in horizontal forms */
                horizontalClass: ClassDefinition;
                /** Class for field label when horizontal */
                horizontalLabelClass: ClassDefinition;
                /** "Class for field body when horizontal */
                horizontalBodyClass: ClassDefinition;
                /** Class when fields are grouped together */
                groupedClass: ClassDefinition;
                /** Class when fields fill up multiple lines */
                groupMultilineClass: ClassDefinition;
                /** Class for field label */
                labelClass: ClassDefinition;
                /** Class for field label size */
                labelSizeClass: ClassDefinition;
                /** Class of the label field variant */
                labelVariantClass: ClassDefinition;
                /** Class for field body */
                bodyClass: ClassDefinition;
                /** Class for components automatically attached together when inside a field */
                addonsClass: ClassDefinition;
                /** Class for the field message */
                messageClass: ClassDefinition;
                /** Class of the message field variant */
                messageVariantClass: ClassDefinition;
                /** Class for the focused field */
                focusedClass: ClassDefinition;
                /** Class for the filled field */
                filledClass: ClassDefinition;
            }>;
        icon?: ComponentConfigBase &
            Partial<{
                /** Color of the icon */
                variant: string;
                /** Icon size */
                size: string;
                /** Add class to icon font.
See icon library documentation for custom classes. */
                customClass: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the icon when clickable */
                clickableClass: ClassDefinition;
                /** Class of the element when spin */
                spinClass: ClassDefinition;
                /** Class of the icon size */
                sizeClass: ClassDefinition;
                /** Class of the icon variant */
                variantClass: ClassDefinition;
            }>;
        input?: ComponentConfigBase &
            Partial<{
                /** Size of the control */
                size: string;
                /** Color of the control */
                variant: string;
                /** Show character counter when maxlength prop is passed */
                counter: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Add a button/icon to clear the inputed text */
                clearable: boolean;
                /** Icon name to be added on the clear button */
                clearIcon: string;
                /** Number of milliseconds to delay before to emit input event */
                debounce: number;
                /** Native options to use in HTML5 validation */
                autocomplete: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of input when expanded */
                expandedClass: ClassDefinition;
                /** Class of input when type textarea */
                textareaClass: ClassDefinition;
                /** Class of the left icon space inside the input */
                iconLeftSpaceClass: ClassDefinition;
                /** Class of the right icon space inside the input */
                iconRightSpaceClass: ClassDefinition;
                /** Class of the native input element */
                inputClass: ClassDefinition;
                /** Class of input when rounded */
                roundedClass: ClassDefinition;
                /** Class of input when disabled */
                disabledClass: ClassDefinition;
                /** Class of the left icon */
                iconLeftClass: ClassDefinition;
                /** Class of the right icon */
                iconRightClass: ClassDefinition;
                /** Class to display when a right icon is used */
                hasIconRightClass: ClassDefinition;
                /** Class of the counter element */
                counterClass: ClassDefinition;
                /** Class of the input size */
                sizeClass: ClassDefinition;
                /** Class of the input variant */
                variantClass: ClassDefinition;
            }>;
        loading?: ComponentConfigBase &
            Partial<{
                /** Custom animation (transition name) */
                animation: string;
                /** Icon name to show, unnecessary when default slot is used. */
                icon: string;
                /** Enable spin effect on icon */
                iconSpin: boolean;
                /** Icon size */
                iconSize: string;
                /** Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
but will set body to position fixed, might break some layouts. */
                scroll: "keep" | "clip";
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class for the root element when fullpage */
                fullPageClass: ClassDefinition;
                /** Class of the loading overlay */
                overlayClass: ClassDefinition;
                /** Class for the loading icon */
                iconClass: ClassDefinition;
                /** Class for the loading label */
                labelClass: ClassDefinition;
                /** Class of the body when loading is fullpage and scroll is clip */
                scrollClipClass: ClassDefinition;
                /** Class of the body when loading is fullpage and scroll is not clip */
                noScrollClass: ClassDefinition;
            }>;
        menu?: ComponentConfigBase &
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Icon pack to use */
                iconPack: string;
                /** Role attribute to be passed to the list container for better accessibility.
Use menu only in situations where your dropdown is related to a navigation menu. */
                ariaRole: string;
                /** Icon size */
                iconSize: string;
                /** Class of the menu list */
                listClass: ClassDefinition;
                /** Class of the menu list label */
                listLabelClass: ClassDefinition;
                /** Transition name to apply on menu list */
                animation: string;
                /** Role attribute to be passed to the list item for better accessibility. */
                itemAriaRole: string;
                /** Class of the menu item */
                itemClass: ClassDefinition;
                /** Class of the active menu item */
                itemActiveClass: ClassDefinition;
                /** Class of the disabled menu item */
                itemDisabledClass: ClassDefinition;
                /** Menu item tag name */
                menuTag: DynamicComponent;
                /** Class of the icon of menu item */
                itemIconTextClass: ClassDefinition;
                /** Class of the menu item when is a submenu */
                itemSubmenuClass: ClassDefinition;
                /** Class of the root element of menu item */
                itemWrapperClass: ClassDefinition;
            }>;
        modal?: ComponentConfigBase &
            Partial<{
                /** Width of the Modal */
                width: string | number;
                /** Custom animation (transition name) */
                animation: string;
                /** Show an overlay */
                overlay: boolean;
                /** Is Modal cancleable by clicking 'X', pressing escape or clicking outside */
                cancelable: boolean | string[];
                /** Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
but will set body to position fixed, might break some layouts. */
                scroll: "keep" | "clip";
                /** Trap focus inside the modal */
                trapFocus: boolean;
                /** Role attribute to be passed to the div wrapper for better accessibility. */
                ariaRole: "dialog" | "alertdialog";
                /** Accessibility aria-label to be passed to the div wrapper element */
                ariaLabel: string;
                /** Automatically focus modal when active */
                autoFocus: boolean;
                /** Close icon name */
                closeIcon: string;
                /** Size of close icon */
                closeIconSize: string;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | object;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of modal component when its active */
                activeClass: ClassDefinition;
                /** Class of the modal overlay */
                overlayClass: ClassDefinition;
                /** Class of the modal content */
                contentClass: ClassDefinition;
                /** Class of the close button */
                closeClass: ClassDefinition;
                /** Class of the modal when fullscreen */
                fullScreenClass: ClassDefinition;
                /** Class of modal component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the body when modal is open and scroll is clip */
                scrollClipClass: ClassDefinition;
                /** Class of the body when modal is open and scroll is not clip */
                noScrollClass: ClassDefinition;
            }>;
        notification?: ComponentConfigBase &
            Partial<{
                /** Color of the control */
                variant: string;
                /** Which position the notification will appear when programmatically */
                position: "top" | "bottom" | "top-right" | "top-left" | "bottom-left" | "bottom-right";
                /** Custom animation (transition name) */
                animation: string;
                /** Icon pack to use */
                iconPack: string;
                /** Icon size */
                iconSize: string;
                /** Close icon name */
                closeIcon: string;
                /** Size of close icon */
                closeIconSize: string;
                /** Accessibility label for the close button */
                ariaCloseLabel: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the close button */
                closeClass: ClassDefinition;
                /** Class of the content element */
                contentClass: ClassDefinition;
                /** Class of the icon on the left */
                iconClass: ClassDefinition;
                /** Class of the element when positioned */
                positionClass: ClassDefinition;
                /** Class of the notification variant */
                variantClass: ClassDefinition;
                /** Class of the wrapper element */
                wrapperClass: ClassDefinition;
                /** Hide notification after duration (in miliseconds) */
                duration: number;
                /** If notice should queue with others notices (snackbar/toast/notification). */
                queue: boolean;
                /** Root class of the notice */
                noticeClass: ClassDefinition;
                /** Class of the notice when positioned */
                noticePositionClass: ClassDefinition;
                /** Class of the custom container element */
                noticeContainerClass: ClassDefinition;
            }>;
        pagination?: ComponentConfigBase &
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class for the pagination size */
                sizeClass: ClassDefinition;
                /** Class of pagination component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the pagination when rounded */
                roundedClass: ClassDefinition;
                /** Pagination size */
                size: string;
                /** Enable rounded button style */
                rounded: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Icon to use for previous button */
                iconPrev: string;
                /** Icon to use for next button */
                iconNext: string;
                /** Accessibility label for the next page button. */
                ariaNextLabel: string;
                /** Accessibility label for the previous page button. */
                ariaPreviousLabel: string;
                /** Class of the pagination list */
                listClass: ClassDefinition;
                /** Items count for each page */
                perPage: string | number;
                /** Enable simple style */
                simple: boolean;
                /** Buttons order */
                order: string;
                /** Pagination button tag name */
                buttonTag: DynamicComponent;
                /** Accessibility label for the page button. */
                ariaPageLabel: string;
                /** Accessibility label for the current page button. */
                ariaCurrentLabel: string;
                /** Class of the pagination list items */
                listItemClass: ClassDefinition;
                /** Class of the link button */
                buttonClass: ClassDefinition;
                /** Class of the current link */
                buttonCurrentClass: ClassDefinition;
                /** Class of the disabled link */
                buttonDisabledClass: ClassDefinition;
                /** Class of the prev button */
                buttonPrevClass: ClassDefinition;
                /** Class of the next button */
                buttonNextClass: ClassDefinition;
                /** Class of the pagination ellipsis */
                ellipsisClass: ClassDefinition;
                /** Class of the info in `simple` mode */
                infoClass: ClassDefinition;
                /** Class of the pagination order */
                orderClass: ClassDefinition;
                /** Class of the pagination in `simple` mode */
                simpleClass: ClassDefinition;
            }>;
        radio?: ComponentConfigBase &
            Partial<{
                /** Color of the control */
                variant: string;
                /** Size of the control */
                size: string;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class when radio is disabled */
                disabledClass: ClassDefinition;
                /** Class of the root element when checked */
                checkedClass: ClassDefinition;
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
            }>;
        select?: ComponentConfigBase &
            Partial<{
                /** Vertical size of input */
                size: string;
                /** Color of the control */
                variant: string;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the native select element */
                selectClass: ClassDefinition;
                /** Class of the left icon space inside the select */
                iconLeftSpaceClass: ClassDefinition;
                /** Class of the right icon space inside the select */
                iconRightSpaceClass: ClassDefinition;
                /** Class of select when rounded */
                roundedClass: ClassDefinition;
                /** Class of the select when multiple mode is active */
                multipleClass: ClassDefinition;
                /** Class of select when expanded */
                expandedClass: ClassDefinition;
                /** Class of select when disabled */
                disabledClass: ClassDefinition;
                /** Class of the left icon */
                iconLeftClass: ClassDefinition;
                /** Class of the right icon */
                iconRightClass: ClassDefinition;
                /** Class of the select size */
                sizeClass: ClassDefinition;
                /** Class of the select variant */
                variantClass: ClassDefinition;
                /** Class of the select placeholder */
                placeholderClass: ClassDefinition;
                /** Class of the select arrow */
                arrowClass: ClassDefinition;
                /** Class of the select variant for the root element */
                rootVariantClass: ClassDefinition;
            }>;
        sidebar?: ComponentConfigBase &
            Partial<{
                /** Show an overlay like modal */
                overlay: boolean;
                /** Sidebar position */
                position: "left" | "right" | "top" | "bottom";
                /** Show sidebar in fullheight */
                fullheight: boolean;
                /** Show sidebar in fullwidth */
                fullwidth: boolean;
                /** Show a small sidebar */
                reduce: boolean;
                /** Custom layout on mobile */
                mobile: "fullwidth" | "reduced" | "hidden";
                /** Expand sidebar on hover when reduced or mobile is reduce */
                expandOnHover: boolean;
                /** Custom animation (transition name) */
                animation: string;
                /** Is Sidebar cancleable by pressing escape or clicking outside. */
                cancelable: boolean | string[];
                /** Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
but will set body to position fixed, might break some layouts. */
                scroll: "keep" | "clip";
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | object;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of sidebar component when its active */
                activeClass: ClassDefinition;
                /** Class of sidebar when teleported */
                teleportClass: ClassDefinition;
                /** Class of the sidebar overlay */
                overlayClass: ClassDefinition;
                /** Class of the sidebar content */
                contentClass: ClassDefinition;
                /** Class of the sidebar position */
                positionClass: ClassDefinition;
                /** Class of the sidebar when is fullheight */
                fullheightClass: ClassDefinition;
                /** Class of the sidebar when is fullwidth */
                fullwidthClass: ClassDefinition;
                /** Class of the sidebar when its inlined */
                inlineClass: ClassDefinition;
                /** Class of the sidebar when reduced */
                reduceClass: ClassDefinition;
                /** Class of the sidebar when expanded on hover */
                expandOnHoverClass: ClassDefinition;
                /** Class of sidebar component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the body when sidebar clipped */
                crollClipClass: ClassDefinition;
                /** Class of the body when sidebar is not clipped */
                noScrollClass: ClassDefinition;
                /** Class of the sidebar content when sidebar is hidden */
                hiddenClass: ClassDefinition;
                /** Class of the sidebar content when sidebar is visible */
                visibleClass: ClassDefinition;
            }>;
        skeleton?: ComponentConfigBase &
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the skeleton size */
                sizeClass: ClassDefinition;
                /** Enable rounded style */
                rounded: boolean;
                /** Class of the skeleton position */
                positionClass: ClassDefinition;
                /** Class of the skeleton item */
                itemClass: ClassDefinition;
                /** Show a loading animation */
                animated: boolean;
                /** Class of the skeleton animation */
                animationClass: ClassDefinition;
                /** Class of the skeleton item rounded */
                itemRoundedClass: ClassDefinition;
            }>;
        slider?: ComponentConfigBase &
            Partial<{
                /** Color of the slider */
                variant: string;
                /** Vertical size of slider */
                size: string;
                /** Show tooltip when thumb is being dragged */
                tooltip: boolean;
                /** Color of the tooltip */
                tooltipVariant: string;
                /** Rounded thumb */
                rounded: boolean;
                /** Define v-model format */
                format: "raw" | "percent";
                /** Accessibility aria-label to to be passed to the slider thumb element. */
                ariaLabel: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the vertical slider size */
                sizeClass: ClassDefinition;
                /** Class of the slider track */
                trackClass: ClassDefinition;
                /** Class of the filled part of the slider */
                fillClass: ClassDefinition;
                /** Class when slider is disabled */
                disabledClass: ClassDefinition;
                /** Class of the slider variant */
                variantClass: ClassDefinition;
                /** Class of the thumb wrapper */
                thumbWrapperClass: ClassDefinition;
                /** Class to display on the wrapper element when the slider is dragged */
                thumbWrapperDraggingClass: ClassDefinition;
                /** Class of the thumb */
                thumbClass: ClassDefinition;
                /** Class when the slider is rounded */
                thumbRoundedClass: ClassDefinition;
                /** Class when the thumb gets dragged */
                thumbDraggingClass: ClassDefinition;
                /** Class of slider tick */
                tickClass: ClassDefinition;
                /** Class when slider tick is hidden */
                tickHiddenClass: ClassDefinition;
                /** Class of tick label */
                tickLabelClass: ClassDefinition;
            }>;
        steps?: ComponentConfigBase &
            Partial<{
                /** Icon on the left */
                icon: string;
                /** Icon pack */
                iconPack: string;
                /** Step item tag name */
                itemTag: DynamicComponent;
                /** Role attribute to be passed to the div wrapper for better accessibility */
                ariaRole: string;
                /** Class of the nav item */
                navItemClass: ClassDefinition;
                /** Class of the nav item when active */
                navItemActiveClass: ClassDefinition;
                /** Class of the nav item before the active one */
                navItemPreviousClass: ClassDefinition;
                /** Class of the nav item after the active one */
                navItemNextClass: ClassDefinition;
                /** Class of the nav item with variant (default value by parent steps component) */
                navItemVariantClass: ClassDefinition;
                /** Class of the step item */
                stepClass: ClassDefinition;
                /** Class of the tab item when active */
                stepActiveClass: ClassDefinition;
                /** Class of the step item when clickable */
                stepClickableClass: ClassDefinition;
                /** Class of the step item when disabled */
                stepDisabledClass: ClassDefinition;
                /** Class of the step item label when positioned */
                stepLabelPositionClass: ClassDefinition;
                /** Class of the step item label */
                stepLabelClass: ClassDefinition;
                /** Class of the step item icon */
                stepIconClass: ClassDefinition;
                /** Class of the content item */
                stepPanelClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Step size */
                size: string;
                /** Icon to use for navigation button */
                iconPrev: string;
                /** Icon to use for navigation button */
                iconNext: string;
                /** Step navigation is animated */
                animated: boolean;
                /** Transition animation name */
                animation: [string, string] | [string, string, string, string];
                /** Apply animation on the initial render */
                animateInitially: boolean;
                /** Position of the marker label */
                labelPosition: "left" | "right" | "bottom";
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Accessibility next button aria label */
                ariaNextLabel: string;
                /** Accessibility previous button aria label */
                ariaPreviousLabel: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Size of the steps */
                sizeClass: ClassDefinition;
                /** Class of the steps variant */
                variantClass: ClassDefinition;
                /** Class of the tooltip trigger */
                verticalClass: ClassDefinition;
                /** Class of the Steps component when is vertical and its position changes */
                positionClass: ClassDefinition;
                /** Class of steps component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the steps nav container */
                navClass: ClassDefinition;
                /** Class of Steps component when animation gets triggered */
                animatedClass: ClassDefinition;
                /** Class of the Steps component dividers */
                dividerClass: ClassDefinition;
                /** Class of the Steps markers trigger when are rounded */
                markerRoundedClass: ClassDefinition;
                /** Class of the Steps component marker */
                markerClass: ClassDefinition;
                /** Class of the Steps component content */
                contentClass: ClassDefinition;
                /** Class of the Steps component content when transition is happening */
                transitioningClass: ClassDefinition;
                /** Class of the Steps component navigation element */
                navigationClass: ClassDefinition;
            }>;
        switch?: ComponentConfigBase &
            Partial<{
                /** Color of the control */
                variant: string;
                /** Color of the switch when is passive */
                passiveVariant: string;
                /** Size of the control */
                size: string;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class when switch is disabled */
                disabledClass: ClassDefinition;
                /** Class of the outer switch check */
                switchClass: ClassDefinition;
                /** Class of the outer switch check when checked */
                switchCheckedClass: ClassDefinition;
                /** Class of the inner switch check */
                switchCheckClass: ClassDefinition;
                /** Class of the switch when rounded */
                roundedClass: ClassDefinition;
                /** Class of the switch passive variant */
                passiveVariantClass: ClassDefinition;
                /** Class of switch label position */
                positionClass: ClassDefinition;
                /** Root class of the native input checkbox */
                inputClass: ClassDefinition;
                /** Class of the native input element when checked */
                inputCheckedClass: ClassDefinition;
                /** Class of the switch label */
                labelClass: ClassDefinition;
                /** Class of the switch size */
                sizeClass: ClassDefinition;
                /** Class of the switch variant */
                variantClass: ClassDefinition;
            }>;
        table?: ComponentConfigBase &
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the Table footer */
                footerClass: ClassDefinition;
                /** Class of the Table */
                tableClass: ClassDefinition;
                /** Class of the Table component when on mobile */
                mobileClass: ClassDefinition;
                /** Icon pack to use */
                iconPack: string;
                /** Class of the Table when is hoverable */
                hoverableClass: ClassDefinition;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Accessibility label for the pagination next page button. */
                ariaNextLabel: string;
                /** Accessibility label for the pagination previous page button. */
                ariaPreviousLabel: string;
                /** Class of the Table wrapper */
                wrapperClass: ClassDefinition;
                /** How many rows per page (if paginated) */
                perPage: string | number;
                /** Accessibility label for the pagination page button. */
                ariaPageLabel: string;
                /** Accessibility label for the pagination current page button. */
                ariaCurrentLabel: string;
                /** Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended) */
                rowKey: string;
                /** Define individual class for a row */
                rowClass: ((row: unknown, index: number) => string);
                /** Border to all cells */
                bordered: boolean;
                /** Whether table is striped */
                striped: boolean;
                /** Makes the cells narrower */
                narrowed: boolean;
                /** Rows are highlighted when hovering */
                hoverable: boolean;
                /** Table can be focused and user can select rows. Rows can be navigate with keyboard arrows and are highlighted when hovering. */
                selectable: boolean;
                /** Show header */
                showHeader: boolean;
                /** Filtering debounce time (in milliseconds) */
                debounceSearch: number;
                /** Position of the checkbox when checkable (if checkable) */
                checkboxPosition: string;
                /** Color of the checkbox when checkable (if checkable) */
                checkboxVariant: string;
                /** Custom method to verify if a row is checkable (if checkable) */
                isRowCheckable: ((row: unknown) => boolean);
                /** Columns won't be sorted with Javascript, use with `sort` event to sort in your backend */
                backendSorting: boolean;
                /** Sets the default sort column and order — e.g. 'first_name' or ['first_name', 'desc'] */
                defaultSort: string | [string, "asc" | "desc"];
                /** Sets the default sort column direction on the first click */
                defaultSortDirection: "asc" | "desc";
                /** Sets the header sorting icon */
                sortIcon: string;
                /** Sets the size of the sorting icon */
                sortIconSize: string;
                /** Controls the visibility of the trigger that toggles the detailed rows (if detailed) */
                isDetailedVisible: ((row: unknown) => boolean);
                /** Allow detail icon and column to be visible (if detailed) */
                showDetailIcon: boolean;
                /** Icon name of detail action (if detailed) */
                detailIcon: string;
                /**  */
                detailTransition: string;
                /** Adds pagination to the table */
                paginated: boolean;
                /** Pagination position (if paginated) */
                paginationPosition: string;
                /** Size of pagination (if paginated) */
                paginationSize: string;
                /** Enable rounded pagination buttons (if paginated) */
                paginationRounded: boolean;
                /** Enable simple style pagination (if paginated) */
                paginationSimple: boolean;
                /** Pagination buttons order (if paginated) */
                paginationOrder: string;
                /** Columns won't be filtered with Javascript, use with `searchable` prop to the columns to filter in your backend */
                backendFiltering: boolean;
                /** Icon of the column search input */
                filterIcon: string;
                /** Placeholder of the column search input */
                filterPlaceholder: string;
                /** Label to be shown when the table is empty */
                emptyLabel: string;
                /** Icon to be shown when the table is empty */
                emptyIcon: string;
                /** Size of empty icon */
                emptyIconSize: string;
                /** Icon for the loading state */
                loadingIcon: string;
                /** Label for the loading state */
                loadingLabel: string;
                /** Rows appears as cards on mobile (collapse rows) */
                mobileCards: boolean;
                /** Select placeholder text when nothing is selected (if mobileCards) */
                mobileSortPlaceholder: string;
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
                /** Class configuration for the internal loading component */
                loadingClasses: Record<string, any>;
            }>;
        tabs?: ComponentConfigBase &
            Partial<{
                /** Icon on the left */
                icon: string;
                /** Icon pack */
                iconPack: string;
                /** Tabs item tag name */
                itemTag: DynamicComponent;
                /** Role attribute to be passed to the div wrapper for better accessibility */
                ariaRole: string;
                /** Class of the tab item */
                navItemClass: ClassDefinition;
                /** Class of the nav item when active */
                navItemActiveClass: ClassDefinition;
                /** Class of the nav item before the active one */
                navItemPreviousClass: ClassDefinition;
                /** Class of the nav item after the active one */
                navItemNextClass: ClassDefinition;
                /** Class of the tab item */
                tabClass: ClassDefinition;
                /** Class of the tab item when active */
                tabActiveClass: ClassDefinition;
                /** Class of the tab item when disabled */
                tabDisabledClass: ClassDefinition;
                /** Class of the tab item type */
                tabTypeClass: ClassDefinition;
                /** Class of the tab item icon */
                tabIconClass: ClassDefinition;
                /** Class of the tab item label */
                tabLabelClass: ClassDefinition;
                /** Class of the tab item */
                tabPanelClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Tab size */
                size: string;
                /** Show tab in vertical layout */
                vertical: boolean;
                /** Tab type */
                type: string;
                /** Tab will have an animation */
                animated: boolean;
                /** Transition animation name */
                animation: [string, string] | [string, string, string, string];
                /** Apply animation on the initial render */
                animateInitially: boolean;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of Tabs component when when is vertical and its position changes */
                positionClass: ClassDefinition;
                /** Class of Tabs component when expanded */
                expandedClass: ClassDefinition;
                /** Class of Tabs component when vertical */
                verticalClass: ClassDefinition;
                /** Class of Tabs component when multiline */
                multilineClass: ClassDefinition;
                /** Class of the Tabs component nav tabs */
                navClass: ClassDefinition;
                /** Size of the navigation */
                navSizeClass: ClassDefinition;
                /** Class of the Tabs component nav position */
                navPositionClass: ClassDefinition;
                /** Type of the navigation */
                navTypeClass: ClassDefinition;
                /** Class of the tab content */
                contentClass: ClassDefinition;
                /** Class of the tab content when transitioning */
                transitioningClass: ClassDefinition;
            }>;
        taginput?: ComponentConfigBase &
            Partial<{
                /** Vertical size of the input control */
                size: string;
                /** Color of the each item */
                variant: string;
                /** Show counter when maxlength or maxtags props are passed */
                counter: boolean;
                /** Keep open dropdown list after select */
                keepOpen: boolean;
                /** Array of keys
(https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
which will add a item when typing */
                confirmKeys: string[];
                /** Array of chars used to split when pasting a new string */
                separators: string[];
                /** Allows adding new items */
                allowNew: boolean;
                /** Allows adding the same item multiple time */
                allowDuplicates: boolean;
                /** Allow removing last item when pressing given keys
(https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values),
if input is empty */
                removeOnKeys: string[];
                /** Makes the component check if list reached scroll start or end and emit scroll events. */
                checkScroll: boolean;
                /** Add close/delete button to the item */
                closable: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Icon name of close icon on selected item */
                closeIcon: string;
                /** Accessibility label for the close button */
                ariaCloseLabel: string;
                /** Native options to use in HTML5 validation */
                autocomplete: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | object;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of input when expanded */
                expandedClass: ClassDefinition;
                /** Class of the input container */
                containerClass: ClassDefinition;
                /** Class of the input container size */
                sizeClass: ClassDefinition;
                /** Class of the entered item variant */
                variantClass: ClassDefinition;
                /** Class of the close button of entered item */
                closeClass: ClassDefinition;
                /** Class of the entered item */
                itemClass: ClassDefinition;
                /** Class of the counter element */
                counterClass: ClassDefinition;
                /** Class configuration for the underlying autocomplete component */
                autocompleteClasses: Record<string, any>;
            }>;
        timepicker?: ComponentConfigBase &
            Partial<{
                /** Size of the button */
                size: string;
                /** Open dropdown on focus */
                openOnFocus: boolean;
                /** Close dropdown on click */
                closeOnClick: boolean;
                /** Custom function to format a date into a string */
                formatter: ((date: Date) => string) | undefined;
                /** Custom function to parse a string into a date */
                parser: ((date: string) => Date) | undefined;
                /** time creator function, default is `new Date()` */
                creator: (() => Date);
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
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | object;
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
                /** Class for the underlaying dropdown component */
                dropdownClass: ClassDefinition;
                /** Class for the HTML input element */
                inputClass: ClassDefinition;
                /** Class configuration for the internal input component */
                inputClasses: Record<string, any>;
                /** Class configuration for the internal dropdown component */
                dropdownClasses: Record<string, any>;
                /** Class configuration for the internal select component */
                selectClasses: Record<string, any>;
            }>;
        tooltip?: ComponentConfigBase &
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the tooltip variant */
                variantClass: ClassDefinition;
                /** Color of the tooltip */
                variant: string;
                /** Position of the Tooltip relative to the trigger */
                position: string;
                /** Tooltip default animation */
                animation: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Class when the dropdown is teleported */
                teleportClass: ClassDefinition;
                /** Class of the tooltip trigger */
                triggerClass: ClassDefinition;
                /** Class of the tooltip trigger position */
                positionClass: ClassDefinition;
                /** Tooltip trigger tag name */
                triggerTag: DynamicComponent;
                /** Tooltip trigger events */
                triggers: string[];
                /** Tooltip auto close options (pressing escape, clicking the content or outside) */
                closeable: boolean | string[];
                /** Class of the tooltip arrow */
                arrowClass: ClassDefinition;
                /** Class of the tooltip content */
                contentClass: ClassDefinition;
                /** Class of the tooltip content when is multiline */
                multilineClass: ClassDefinition;
                /** Class of the tooltip trigger when is always visible */
                alwaysClass: ClassDefinition;
                /** Class of the tooltip arrow position */
                arrowPositionClass: ClassDefinition;
            }>;
        upload?: ComponentConfigBase &
            Partial<{
                /** Color of the control */
                variant: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the Upload when draggable */
                draggableClass: ClassDefinition;
                /** Class of the Upload variant */
                variantClass: ClassDefinition;
                /** Class of the Upload when expanded */
                expandedClass: ClassDefinition;
                /** Class of the Upload when disabled */
                disabledClass: ClassDefinition;
                /** Class of the Upload when hovered */
                hoveredClass: ClassDefinition;
            }>;
    }
}
