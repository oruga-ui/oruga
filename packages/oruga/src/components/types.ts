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
                /** Size of the input control */
                size: string;
                /** Position of the dropdown */
                position: "auto" | "bottom" | "top";
                /** Number of milliseconds to delay before to emit input event */
                debounce: number;
                /** The first option will always be focused (easier to just hit enter or tab) */
                keepFirst: boolean;
                /** Keep open dropdown list after select */
                keepOpen: boolean;
                /** Clear input text on select */
                clearOnSelect: boolean;
                /** Open dropdown list on focus */
                openOnFocus: boolean;
                /** Max height of dropdown content */
                maxHeight: number | string;
                /** Makes the component check if list reached scroll start or end and emit scroll events */
                checkScroll: boolean;
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
                /** Dropdown content (items) are shown into a modal on mobile */
                mobileModal: boolean;
                /** Dropdown content (items) are shown into a modal on desktop */
                desktopModal: boolean;
                /** Transition name to apply on dropdown list */
                animation: string;
                /** Native options to use in HTML5 validation */
                autocomplete: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: boolean | object | string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the menu items */
                itemClass: ClassDefinition;
                /** Class of the menu items group title */
                itemGroupTitleClass: ClassDefinition;
                /** Class of the empty menu placeholder item */
                itemEmptyClass: ClassDefinition;
                /** Class of the menu header item */
                itemHeaderClass: ClassDefinition;
                /** Class of the menu footer item */
                itemFooterClass: ClassDefinition;
                /** Class configuration for the internal input component */
                inputClasses: Record<string, any>;
            }>;
        button?: ComponentConfigBase &
            Partial<{
                /** Button tag name */
                tag: DynamicComponent;
                /** Color variant of the control */
                variant: string;
                /** Size of the control */
                size: string;
                /** Icon pack to use */
                iconPack: string;
                /** Enable rounded style */
                rounded: boolean;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element with size */
                sizeClass: ClassDefinition;
                /** Class of the root element with variant */
                variantClass: ClassDefinition;
                /** Class of the root element when outlined */
                outlinedClass: ClassDefinition;
                /** Class of the root element when inverted */
                invertedClass: ClassDefinition;
                /** Class of the root element when loading */
                loadingClass: ClassDefinition;
                /** Class of the root element when expanded */
                expandedClass: ClassDefinition;
                /** Class of the root element when rounded */
                roundedClass: ClassDefinition;
                /** Class of the root element when disabled */
                disabledClass: ClassDefinition;
                /** Class of the inner wrapper element */
                wrapperClass: ClassDefinition;
                /** Class of the icon element */
                iconClass: ClassDefinition;
                /** Class of the icon element on the left */
                iconLeftClass: ClassDefinition;
                /** Class of the icon element on the right */
                iconRightClass: ClassDefinition;
                /** Class of the label element */
                labelClass: ClassDefinition;
            }>;
        carousel?: ComponentConfigBase &
            Partial<{
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
                /** Icon pack to use */
                iconPack: string;
                /** Icon size */
                iconSize: string;
                /** Icon name for previous button */
                iconPrev: string;
                /** Icon name for next button */
                iconNext: string;
                /** Icon name for autoplay pause button */
                iconAutoplayPause: string;
                /** Icon name for autoplay resume button */
                iconAutoplayResume: string;
                /** Accessibility autoplay pause button aria label */
                ariaAutoplayPauseLabel: string;
                /** Accessibility autoplay resume button aria label */
                ariaAutoplayResumeLabel: string;
                /** Accessibility next button aria label */
                ariaNextLabel: string;
                /** Accessibility previous button aria label */
                ariaPreviousLabel: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element in overlay */
                overlayClass: ClassDefinition;
                /** Class of the inner wrapper element */
                wrapperClass: ClassDefinition;
                /** Class of items container element */
                itemsClass: ClassDefinition;
                /**  */
                itemsDraggingClass: ClassDefinition;
                /** Class of icon button elements */
                iconClass: ClassDefinition;
                /** Class of prev icon button element */
                iconPrevClass: ClassDefinition;
                /** Class of next icon button element */
                iconNextClass: ClassDefinition;
                /** Class of autoplay icon button element */
                iconAutoplayClass: ClassDefinition;
                /** Class of indicators tablist element */
                indicatorsClass: ClassDefinition;
                /** Class of indicators tablist element when inside */
                indicatorsInsideClass: ClassDefinition;
                /** Class of indicators tablist element with position */
                indicatorsPositionClass: ClassDefinition;
                /** Class of indicator tab element */
                indicatorClass: ClassDefinition;
                /** Class of indicator item element */
                indicatorItemClass: ClassDefinition;
                /** Class of indicator element when active */
                indicatorItemActiveClass: ClassDefinition;
                /** Class of indicator element to separate different styles */
                indicatorItemStyleClass: ClassDefinition;
                /** Class of item element */
                itemClass: ClassDefinition;
                /** Class of item element when active */
                itemActiveClass: ClassDefinition;
                /** Class of item element when clickable */
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
                /** Class of the root element with size */
                sizeClass: ClassDefinition;
                /** Class of the root element with variant */
                variantClass: ClassDefinition;
                /** Class of the root element when disabled */
                disabledClass: ClassDefinition;
                /** Class of the root element when checked */
                checkedClass: ClassDefinition;
                /** Class of the the root element when indeterminate */
                indeterminateClass: ClassDefinition;
                /** Class of the native input element */
                inputClass: ClassDefinition;
                /** Class of the label element */
                labelClass: ClassDefinition;
            }>;
        collapse?: ComponentConfigBase &
            Partial<{
                /** Custom animation (transition name) */
                animation: string;
                /** Trigger position */
                position: "bottom" | "top";
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element when expanded */
                expandedClass: ClassDefinition;
                /** Clas of the root element with position */
                positionClass: ClassDefinition;
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
                /** Dropdown content is shown into a modal on mobile */
                mobileModal: boolean;
                /** Dropdown content is shown into a modal on desktop */
                desktopModal: boolean;
                /** Enable mobile native input if mobile agent */
                mobileNative: boolean;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: boolean | object | string;
                /** Accessibility next button aria label */
                ariaNextLabel: string;
                /** Accessibility month select aria label */
                ariaSelectMonthLabel: string;
                /** Accessibility year select aria label */
                ariaSelectYearLabel: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the root element with size */
                sizeClass: ClassDefinition;
                /** Class of the root element when expanded */
                expandedClass: ClassDefinition;
                /** Class of the box container element where you choose the date */
                boxClass: ClassDefinition;
                /** Class of the header element inside the box */
                headerClass: ClassDefinition;
                /** Class of the prev button element inside the box */
                prevButtonClass: ClassDefinition;
                /** Class of the next button element inside the box */
                nextButtonClass: ClassDefinition;
                /** Class of the month and year selects container inside the box */
                listsClass: ClassDefinition;
                /** Class of the footer element */
                footerClass: ClassDefinition;
                /** Class of the dates table element inside the box */
                tableClass: ClassDefinition;
                /** Class of dates table header element with days of the week */
                tableHeadClass: ClassDefinition;
                /** Class of the cell element inside the table header */
                tableHeadCellClass: ClassDefinition;
                /** Class of the table body element inside the box */
                tableBodyClass: ClassDefinition;
                /** Class of the table row element */
                tableRowClass: ClassDefinition;
                /** Class of the table cell element */
                tableCellClass: ClassDefinition;
                /** Class of the table cell element when nearby month days are hidden */
                tableCellInvisibleClass: ClassDefinition;
                /** Class of table cell element when selected */
                tableCellSelectedClass: ClassDefinition;
                /** Class of the first selected table cell element when in range */
                tableCellFirstSelectedClass: ClassDefinition;
                /** Class of the table cell elements within the range when the range is selected */
                tableCellWithinSelectedClass: ClassDefinition;
                /** Class of the last selected table cell element during range selection */
                tableCellLastSelectedClass: ClassDefinition;
                /** Class of the first hovered table cell element during range selection */
                tableCellFirstHoveredClass: ClassDefinition;
                /** Class of the table cell element when hovered during range selection */
                tableCellWithinHoveredClass: ClassDefinition;
                /** Class of the last table cell element hovered during range selection */
                tableCellLastHoveredClass: ClassDefinition;
                /** Class of the table cell element of the current day */
                tableCellTodayClass: ClassDefinition;
                /** Class of the table cell element when selectable */
                tableCellSelectableClass: ClassDefinition;
                /** Class of the table cell element when unselectable */
                tableCellUnselectableClass: ClassDefinition;
                /** Class of the table cell element when nearby days (prev/next month) are selectable */
                tableCellNearbyClass: ClassDefinition;
                /** Class of the cell element of a row when at least one event is present */
                tableCellEventsClass: ClassDefinition;
                /** Class of the events container element */
                tableEventsClass: ClassDefinition;
                /** Class of the event element */
                tableEventClass: ClassDefinition;
                /** Class of the event element with variant */
                tableEventVariantClass: ClassDefinition;
                /** Class of the event element with indicator */
                tableEventIndicatorClass: ClassDefinition;
                /** Class of the month table element inside the box when type is `month` */
                monthClass: ClassDefinition;
                /** Class of the table container when type is `month` */
                monthTableClass: ClassDefinition;
                /** Class of the table cell element when type is `month` */
                monthCellClass: ClassDefinition;
                /** Class of table cell element when selected when type is `month` */
                monthCellSelectedClass: ClassDefinition;
                /** Class of the first selected table cell element when in range when type is `month` */
                monthCellFirstSelectedClass: ClassDefinition;
                /** Class of the table cell elements within the range when the range is selected when type is `month` */
                monthCellWithinSelectedClass: ClassDefinition;
                /** Class of the last selected table cell element during range selection when type is `month` */
                monthCellLastSelectedClass: ClassDefinition;
                /** Class of the first hovered table cell element during range selection when type is `month` */
                monthCellWithinHoveredRangeClass: ClassDefinition;
                /** Class of the table cell element when hovered during range selection when type is `month` */
                monthCellFirstHoveredClass: ClassDefinition;
                /** Class of the table cell element when hovered during range selection and cell is in range when type is `month` */
                monthCellWithinHoveredClass: ClassDefinition;
                /** Class of the last table cell element when hovered during range selection when type is `month` */
                monthCellLastHoveredClass: ClassDefinition;
                /** Class of the table cell element of the current day when type is `month` */
                monthCellTodayClass: ClassDefinition;
                /** Class of the table cell element whis is selectable when type is `month` */
                monthCellSelectableClass: ClassDefinition;
                /** Class of the table cell element whis is unselectable when type is `month` */
                monthCellUnselectableClass: ClassDefinition;
                /** Class of the events container when type is `month` */
                monthCellEventsClass: ClassDefinition;
                /** Class of the events container element when type is `month` */
                monthEventsClass: ClassDefinition;
                /** Class of the event element when type is `month` */
                monthEventClass: ClassDefinition;
                /** Class of the event element with variant when type is `month` */
                monthEventVariantClass: ClassDefinition;
                /** Class of the event element with indicator when type is `month` */
                monthEventIndicatorClass: ClassDefinition;
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
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Dropdown content is shown into a modal on mobile */
                mobileModal: boolean;
                /** Dropdown content is shown into a modal on desktop */
                desktopModal: boolean;
                /** Enable mobile native input if mobile agent */
                mobileNative: boolean;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: boolean | object | string;
                /** Class of the Datepicker component wrapper element */
                datepickerWrapperClass: ClassDefinition;
                /** Class of the Timepicker component wrapper element */
                timepickerWrapperClass: ClassDefinition;
            }>;
        dropdown?: ComponentConfigBase &
            Partial<{
                /** Makes the component check if menu reached scroll start or end and emit scroll events */
                checkScroll: boolean;
                /** Max height of dropdown content */
                maxHeight: number | string;
                /** Position of the dropdown relative to the trigger */
                position: "auto" | "bottom-left" | "bottom-right" | "bottom" | "left" | "right" | "top-left" | "top-right" | "top";
                /** Custom animation (transition name) */
                animation: string;
                /** Dropdown menu tag name */
                menuTag: DynamicComponent;
                /** Dropdown trigger tag name */
                triggerTag: DynamicComponent;
                /** Dropdown will be triggered by any events */
                triggers: ("click" | "contextmenu" | "focus" | "keydown" | "hover")[];
                /** Keep dropdown list open when item get selected */
                keepOpen: boolean;
                /** The first option will always be pre-selected (easier to just hit enter or tab) */
                keepFirst: boolean;
                /** Close Dropdown when clicked outside */
                closeOnOutside: boolean;
                /** Close Dropdown when page get scrolled */
                closeOnScroll: boolean;
                /** Select current focused item when focused */
                selectOnFocus: boolean;
                /** Select current focused item when closed */
                selectOnClose: boolean;
                /** Dropdown content (items) are shown into a modal on mobile */
                mobileModal: boolean;
                /** Dropdown content (items) are shown into a modal on desktop */
                desktopModal: boolean;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: boolean | object | string;
                /** Set `true` to remove the body scrollbar.
When `false`, a non-scrollable scrollbar will be kept to avoid moving the background,
but will set the body to a fixed position, which may break some layouts. */
                clipScroll: boolean;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the root element when shown as modal */
                modalClass: ClassDefinition;
                /** Class of the root element when teleported */
                teleportClass: ClassDefinition;
                /** Class of the root element when inlined */
                inlineClass: ClassDefinition;
                /** Class of the root element when disabled */
                disabledClass: ClassDefinition;
                /** Class of the root element when expanded */
                expandedClass: ClassDefinition;
                /** Class for the root element with position */
                positionClass: ClassDefinition;
                /** Class for the root element when active or inline */
                activeClass: ClassDefinition;
                /** Class for the root element when trigger is hoverable */
                hoverableClass: ClassDefinition;
                /** Class of the trigger element */
                triggerClass: ClassDefinition;
                /** Class of the menu element */
                menuClass: ClassDefinition;
                /** Class of the menu element with position */
                menuPositionClass: ClassDefinition;
                /** Class of the menu element when active or inline */
                menuActiveClass: ClassDefinition;
                /** Class of the overlay when is shown as modal */
                overlayClass: ClassDefinition;
                /** Class of the body when dropdown is open and scroll is clipped */
                scrollClipClass: ClassDefinition;
                /** Class of the body when dropdown is open and scroll is keeped */
                scrollKeepClass: ClassDefinition;
                /** Dropdown item tag name */
                itemTag: DynamicComponent;
                /** Class of the item element. */
                itemClass: ClassDefinition;
                /** Class of the item element when selected */
                itemSelectedClass: ClassDefinition;
                /** Class of the item element when focused */
                itemFocusedClass: ClassDefinition;
                /** Class of the item element when clickable */
                itemClickableClass: ClassDefinition;
                /** Class of the item element when disabled */
                itemDisabledClass: ClassDefinition;
            }>;
        field?: ComponentConfigBase &
            Partial<{
                /** Vertical size of input */
                labelsize: string;
                /** Message element tag name */
                messageTag: DynamicComponent;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the root element when the form element is focused */
                focusedClass: ClassDefinition;
                /** Class of the root element when the form element is filled */
                filledClass: ClassDefinition;
                /** Class for the body wrapper element */
                bodyClass: ClassDefinition;
                /** Class for inner wrapper element when grouped */
                groupedClass: ClassDefinition;
                /** Class of the inner wrapper element when element get automatically attached together inside a field */
                addonsClass: ClassDefinition;
                /** Class for inner body wrapper element to fill up multiple lines */
                multilineClass: ClassDefinition;
                /** Class to align label and control in horizontal forms */
                horizontalClass: ClassDefinition;
                /** Class for the label element when horizontal */
                horizontalLabelClass: ClassDefinition;
                /** Class for the body element when horizontal */
                horizontalBodyClass: ClassDefinition;
                /** Class for the label element */
                labelClass: ClassDefinition;
                /** Class for the label element with size */
                labelSizeClass: ClassDefinition;
                /** Class for the label element with variant */
                labelVariantClass: ClassDefinition;
                /** Class for the message element */
                messageClass: ClassDefinition;
                /** Class for the message element with variant */
                messageVariantClass: ClassDefinition;
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
                /** Class of the root element with size */
                sizeClass: ClassDefinition;
                /** Class of the root element with variant */
                variantClass: ClassDefinition;
                /** Class of the root element when clickable */
                clickableClass: ClassDefinition;
                /** Class of the root element when spin */
                spinClass: ClassDefinition;
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
                /** Class of the root element with size */
                sizeClass: ClassDefinition;
                /** Class of the root element with variant */
                variantClass: ClassDefinition;
                /** Class of the root element when expanded */
                expandedClass: ClassDefinition;
                /** Class of the root element when rounded */
                roundedClass: ClassDefinition;
                /** Class of the root element when disabled */
                disabledClass: ClassDefinition;
                /** Class of the root element when type `textarea` */
                textareaClass: ClassDefinition;
                /** Class to the root element when has a right icon */
                hasIconRightClass: ClassDefinition;
                /** Class of the native input element */
                inputClass: ClassDefinition;
                /** Class of the native input element with left icon space */
                iconLeftSpaceClass: ClassDefinition;
                /** Class of the native input element with right icon space */
                iconRightSpaceClass: ClassDefinition;
                /** Class of the native input element with placeholder */
                placeholderClass: ClassDefinition;
                /** Class of the left icon element */
                iconLeftClass: ClassDefinition;
                /** Class of the right icon element */
                iconRightClass: ClassDefinition;
                /** Class of the counter element */
                counterClass: ClassDefinition;
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
                /** Set `true` to remove the body scrollbar.
When `false`, a non-scrollable scrollbar will be kept to avoid moving the background,
but will set the body to a fixed position, which may break some layouts. */
                clipScroll: boolean;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class for the root element when fullpage */
                fullPageClass: ClassDefinition;
                /** Class of the overlay element */
                overlayClass: ClassDefinition;
                /** Class for the icon element */
                iconClass: ClassDefinition;
                /** Class for the label element */
                labelClass: ClassDefinition;
                /** Class of the body when fullpage and scroll is clipped */
                scrollClipClass: ClassDefinition;
                /** Class of the body when fullpage and scroll is keeped */
                scrollKeepClass: ClassDefinition;
            }>;
        menu?: ComponentConfigBase &
            Partial<{
                /** Role attribute to be passed to the list container for better accessibility.
Use menu only in situations where your dropdown is related to a navigation menu. */
                role: "menu" | "tree";
                /** Icon pack to use */
                iconPack: string;
                /** Icon size */
                iconSize: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the menu list element */
                listClass: ClassDefinition;
                /** Class of the menu label element */
                labelClass: ClassDefinition;
                /** Transition name to apply on menu list */
                animation: string;
                /** Menu item tag name */
                itemTag: DynamicComponent;
                /** Class of the menu item root element */
                itemClass: ClassDefinition;
                /** Class of the menu item root element when active */
                itemActiveClass: ClassDefinition;
                /** Class of the menu item root element when focused */
                itemFocusedClass: ClassDefinition;
                /** Class of the menu item root element when disabled */
                itemDisabledClass: ClassDefinition;
                /** Class of the menu button element */
                itemButtonClass: ClassDefinition;
                /** Class of the menu button element when active */
                itemButtonActiveClass: ClassDefinition;
                /** Class of the menu button element when focused */
                itemButtonFocusedClass: ClassDefinition;
                /** Class of the menu button element when disabled */
                itemButtonDisabledClass: ClassDefinition;
                /** Class of the menu button element with icon */
                itemButtonIconClass: ClassDefinition;
                /** Class of the menu item submenu element */
                itemSubmenuClass: ClassDefinition;
            }>;
        modal?: ComponentConfigBase &
            Partial<{
                /** Width of the Modal */
                width: number | string;
                /** Custom animation (transition name) */
                animation: string;
                /** Show an overlay */
                overlay: boolean;
                /** Is Modal cancleable by clicking 'X', pressing escape or clicking outside */
                cancelable: boolean | string[];
                /** Set `true` to remove the body scrollbar.
When `false`, a non-scrollable scrollbar will be kept to avoid moving the background,
but will set the body to a fixed position, which may break some layouts. */
                clipScroll: boolean;
                /** Trap focus inside the modal */
                trapFocus: boolean;
                /** Role attribute to be passed to the div wrapper for better accessibility. */
                role: "alertdialog" | "dialog";
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
                teleport: boolean | object | string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the root element when active */
                activeClass: ClassDefinition;
                /** Class of the overlay element */
                overlayClass: ClassDefinition;
                /** Class of the content element */
                contentClass: ClassDefinition;
                /** Class of the content element when fullscreen */
                fullScreenClass: ClassDefinition;
                /** Class of the close button element */
                closeClass: ClassDefinition;
                /** Class of the body when modal is open and scroll is clipped */
                scrollClipClass: ClassDefinition;
                /** Class of the body when modal is open and scroll is keeped */
                scrollKeepClass: ClassDefinition;
            }>;
        notification?: ComponentConfigBase &
            Partial<{
                /** Color of the control */
                variant: string;
                /** Which position the notification will appear when programmatically */
                position: "bottom-left" | "bottom-right" | "bottom" | "top-left" | "top-right" | "top";
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
                /** Class of the root element when positioned */
                positionClass: ClassDefinition;
                /** Class of the root element with variant */
                variantClass: ClassDefinition;
                /** Class of the close button element */
                closeClass: ClassDefinition;
                /** Class of the content element */
                contentClass: ClassDefinition;
                /** Class of the icon element on the left */
                iconClass: ClassDefinition;
                /** Class of the wrapper element */
                wrapperClass: ClassDefinition;
                /** Hide notification after duration (in miliseconds) */
                duration: number;
                /** If notice should queue with others notices (snackbar/toast/notification). */
                queue: boolean;
                /** Class of the notice wrapper element */
                noticeClass: ClassDefinition;
                /** Class of the notice wrapper element when positioned */
                noticePositionClass: ClassDefinition;
                /** Class of the notice container element */
                noticeContainerClass: ClassDefinition;
            }>;
        pagination?: ComponentConfigBase &
            Partial<{
                /** Items count for each page */
                perPage: number | string;
                /** Pagination size */
                size: string;
                /** Enable simple style */
                simple: boolean;
                /** Enable rounded button style */
                rounded: boolean;
                /** Buttons order */
                order: "centered" | "left" | "right";
                /** Pagination button tag name */
                buttonTag: DynamicComponent;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to use for previous button */
                iconPrev: string;
                /** Icon to use for next button */
                iconNext: string;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Accessibility label for the next page button. */
                ariaNextLabel: string;
                /** Accessibility label for the previous page button. */
                ariaPreviousLabel: string;
                /** Accessibility label for the page button. */
                ariaPageLabel: string;
                /** Accessibility label for the current page button. */
                ariaCurrentLabel: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the root element with order */
                orderClass: ClassDefinition;
                /** Class of the root element with size */
                sizeClass: ClassDefinition;
                /** Class of the root element when in `simple` mode */
                simpleClass: ClassDefinition;
                /** Class of the page info in `simple` mode */
                infoClass: ClassDefinition;
                /** Class of the items list element */
                listClass: ClassDefinition;
                /** Class of the list item element */
                listItemClass: ClassDefinition;
                /** Class of the ellipsis element */
                ellipsisClass: ClassDefinition;
                /** Class of the button element */
                buttonClass: ClassDefinition;
                /** Class of the button element when rounded */
                roundedClass: ClassDefinition;
                /** Class of the current button element */
                buttonCurrentClass: ClassDefinition;
                /** Class of the prev button element */
                buttonPrevClass: ClassDefinition;
                /** Class of the next button element */
                buttonNextClass: ClassDefinition;
                /** Class of the prev or next button when disabled */
                buttonDisabledClass: ClassDefinition;
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
                /** Class of the root element with size */
                sizeClass: ClassDefinition;
                /** Class of the root element with variant */
                variantClass: ClassDefinition;
                /** Class of the root element when disabled */
                disabledClass: ClassDefinition;
                /** Class of the root element when checked */
                checkedClass: ClassDefinition;
                /** Class of the native input element */
                inputClass: ClassDefinition;
                /** Class of the label element */
                labelClass: ClassDefinition;
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
                /** Class of the root element with size */
                sizeClass: ClassDefinition;
                /** Class of the root element with variant */
                variantClass: ClassDefinition;
                /** Class of the root element when expanded */
                expandedClass: ClassDefinition;
                /** Class of the root element when disabled */
                disabledClass: ClassDefinition;
                /** Class of the root element when rounded */
                roundedClass: ClassDefinition;
                /** Class of the root element when has icon right */
                hasIconRightClass: ClassDefinition;
                /** Class of the root element when multiple */
                multipleClass: ClassDefinition;
                /** Class of the native select element */
                selectClass: ClassDefinition;
                /** Class of the native select element with placeholder */
                placeholderClass: ClassDefinition;
                /** Class of the native select element when arrowed */
                arrowedClass: ClassDefinition;
                /** Class of the native select element with left icon space */
                iconLeftSpaceClass: ClassDefinition;
                /** Class of the native select element with right icon space */
                iconRightSpaceClass: ClassDefinition;
                /** Class of the left icon element */
                iconLeftClass: ClassDefinition;
                /** Class of the right icon element */
                iconRightClass: ClassDefinition;
            }>;
        sidebar?: ComponentConfigBase &
            Partial<{
                /** Show an overlay like modal */
                overlay: boolean;
                /** Sidebar position */
                position: "bottom" | "left" | "right" | "top";
                /** Show sidebar in fullheight */
                fullheight: boolean;
                /** Show sidebar in fullwidth */
                fullwidth: boolean;
                /** Show a small sidebar */
                reduce: boolean;
                /** Custom layout on mobile */
                mobile: "expanded" | "hidden" | "reduced";
                /** Expand sidebar on hover when reduced or mobile is reduce */
                expandOnHover: boolean;
                /** Custom animation (transition name) */
                animation: string;
                /** Is Sidebar cancleable by pressing escape or clicking outside. */
                cancelable: boolean | string[];
                /** Set `true` to remove the body scrollbar.
When `false`, a non-scrollable scrollbar will be kept to avoid moving the background,
but will set the body to a fixed position, which may break some layouts. */
                clipScroll: boolean;
                /** Trap focus inside the sidebar */
                trapFocus: boolean;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: boolean | object | string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the root element when active */
                activeClass: ClassDefinition;
                /** Class of the root element when teleported */
                teleportClass: ClassDefinition;
                /** Class of the root element when inlined */
                inlineClass: ClassDefinition;
                /** Class of the overlay element */
                overlayClass: ClassDefinition;
                /** Class of the content element */
                contentClass: ClassDefinition;
                /** Class of the content element when hidden */
                hiddenClass: ClassDefinition;
                /** Class of the content element when visible */
                visibleClass: ClassDefinition;
                /** Class of the content element with position */
                positionClass: ClassDefinition;
                /** Class of the content element when is fullheight */
                fullheightClass: ClassDefinition;
                /** Class of the content element when is fullwidth */
                fullwidthClass: ClassDefinition;
                /** Class of the content element when reduced */
                reduceClass: ClassDefinition;
                /** Class of the content element when expanded on hover */
                expandOnHoverClass: ClassDefinition;
                /** Class of the body when is visible and scroll is clipped */
                scrollClipClass: ClassDefinition;
                /** Class of the body when is visible and scroll is keeped */
                scrollKeepClass: ClassDefinition;
            }>;
        skeleton?: ComponentConfigBase &
            Partial<{
                /** Show a loading animation */
                animated: boolean;
                /** Enable rounded style */
                rounded: boolean;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element with position */
                positionClass: ClassDefinition;
                /** Class of the item element */
                itemClass: ClassDefinition;
                /** Class of the item element when rounded */
                roundedClass: ClassDefinition;
                /** Class of the item element when animated */
                animatedClass: ClassDefinition;
                /** Class of the item element with size */
                sizeClass: ClassDefinition;
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
                format: "percent" | "raw";
                /** Accessibility aria-label to to be passed to the slider thumb element. */
                ariaLabel: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element with size */
                sizeClass: ClassDefinition;
                /** Class of the root element when disabled */
                disabledClass: ClassDefinition;
                /** Class of the slider track element. */
                trackClass: ClassDefinition;
                /** Class of the filled part of the slider */
                fillClass: ClassDefinition;
                /** Class of the filled part of the slider with variant */
                variantClass: ClassDefinition;
                /** Class of the thumb wrapper element */
                thumbWrapperClass: ClassDefinition;
                /** Class to the thumb wrapper element when the slider is dragged */
                thumbWrapperDraggingClass: ClassDefinition;
                /** Class of the thumb element */
                thumbClass: ClassDefinition;
                /** Class of the thumb element when rounded */
                thumbRoundedClass: ClassDefinition;
                /** Class of the thumb element when is dragged */
                thumbDraggingClass: ClassDefinition;
                /** Class of the slider tick element */
                tickClass: ClassDefinition;
                /** Class of the slider tick element when is hidden */
                tickHiddenClass: ClassDefinition;
                /** Class of the slider tick label element */
                tickLabelClass: ClassDefinition;
            }>;
        steps?: ComponentConfigBase &
            Partial<{
                /** Icon on the left */
                icon: string;
                /** Icon pack */
                iconPack: string;
                /** Class of the step item element. */
                stepClass: ClassDefinition;
                /** Class of the step item element when active */
                stepActiveClass: ClassDefinition;
                /** Class of the step item element with variant (default value by parent steps component) */
                stepVariantClass: ClassDefinition;
                /** Class of the step item element when positioned */
                stepPositionClass: ClassDefinition;
                /** Class of the step item element when clickable */
                stepClickableClass: ClassDefinition;
                /** Class of the step item element when disabled */
                stepDisabledClass: ClassDefinition;
                /** Class of the step item element before the active one */
                stepPreviousClass: ClassDefinition;
                /** Class of the step item element after the active one */
                stepNextClass: ClassDefinition;
                /** Class of the step item label element */
                stepLabelClass: ClassDefinition;
                /** Class of the step item icon element */
                stepIconClass: ClassDefinition;
                /** Class of the step panel element */
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
                labelPosition: "bottom" | "left" | "right";
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Accessibility aria-label to be passed to the tablist wrapper element */
                ariaLabel: string;
                /** Accessibility next button aria label */
                ariaNextLabel: string;
                /** Accessibility previous button aria label */
                ariaPreviousLabel: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element when on mobile */
                mobileClass: ClassDefinition;
                /** Size of the root element with size */
                sizeClass: ClassDefinition;
                /** Class of the root element with variant */
                variantClass: ClassDefinition;
                /** Class of the root element when is vertical */
                verticalClass: ClassDefinition;
                /** Class of the root element when is vertical and has position */
                positionClass: ClassDefinition;
                /** Class of the list container element */
                listClass: ClassDefinition;
                /** Class of the list container when animated */
                animatedClass: ClassDefinition;
                /** Class of the item divider element */
                dividerClass: ClassDefinition;
                /** Class of the item marker element */
                markerClass: ClassDefinition;
                /** Class of the item marker element when rounded */
                markerRoundedClass: ClassDefinition;
                /** Class of the panel container element */
                contentClass: ClassDefinition;
                /** Class of the panel container element when transitioning */
                transitioningClass: ClassDefinition;
                /** Class of the navigation element */
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
                /** Rounded style */
                rounded: boolean;
                /** Label position */
                right: string;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element with size */
                sizeClass: ClassDefinition;
                /** Class of the root element with variant */
                variantClass: ClassDefinition;
                /** Class of the root element with passive variant */
                passiveVariantClass: ClassDefinition;
                /** Class of the root element with position */
                positionClass: ClassDefinition;
                /** Class of the root element when disabled */
                disabledClass: ClassDefinition;
                /** Class of the root element when rounded */
                roundedClass: ClassDefinition;
                /** Class of the root element when checked */
                checkedClass: ClassDefinition;
                /** Class of the native input element */
                inputClass: ClassDefinition;
                /** Class of the label element */
                labelClass: ClassDefinition;
            }>;
        table?: ComponentConfigBase &
            Partial<{
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
                /** Position of the checkbox when checkable (if checkable) */
                checkboxPosition: "left" | "right";
                /** Color of the checkbox when checkable (if checkable) */
                checkboxVariant: string;
                /** Custom method to verify if a row is checkable (if checkable) */
                isRowCheckable: ((row: unknown) => boolean);
                /** Columns won't be sorted with JavaScript, use with `sort` event to sort in your backend */
                backendSorting: boolean;
                /** Sets the default sort column and order — e.g. 'first_name' or ['first_name', 'desc'] */
                defaultSort: string | [string, "desc" | "asc"];
                /** Sets the default sort column direction on the first click */
                defaultSortDirection: "asc" | "desc";
                /** Sets the header sorting icon */
                sortIcon: string;
                /** Sets the size of the sorting icon */
                sortIconSize: string;
                /** Icon pack to use */
                iconPack: string;
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
                /** How many rows per page (if paginated) */
                perPage: number | string;
                /** Pagination position (if paginated) */
                paginationPosition: "both" | "bottom" | "top";
                /** Size of pagination (if paginated) */
                paginationSize: string;
                /** Enable rounded pagination buttons (if paginated) */
                paginationRounded: boolean;
                /** Enable simple style pagination (if paginated) */
                paginationSimple: boolean;
                /** Pagination buttons order (if paginated) */
                paginationOrder: "centered" | "left" | "right";
                /** Columns won't be filtered with JavaScript, use with `searchable` prop to the columns to filter in your backend */
                backendFiltering: boolean;
                /** Icon of the column search input */
                filterIcon: string;
                /** Placeholder of the column search input */
                filterPlaceholder: string;
                /** Filtering debounce time (in milliseconds) */
                filterDebounce: number;
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
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Rows appears as cards on mobile (collapse rows) */
                mobileCards: boolean;
                /** Select placeholder text when nothing is selected (if mobileCards) */
                mobileSortPlaceholder: string;
                /** Accessibility label for the pagination next page button. */
                ariaNextLabel: string;
                /** Accessibility label for the pagination previous page button. */
                ariaPreviousLabel: string;
                /** Accessibility label for the pagination page button. */
                ariaPageLabel: string;
                /** Accessibility label for the pagination current page button. */
                ariaCurrentLabel: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the sortable form wrapper on mobile */
                mobileSortClass: ClassDefinition;
                /** Class of the table wrapper element */
                wrapperClass: ClassDefinition;
                /** Class of the table wrapper element when header is sticky */
                stickyHeaderClass: ClassDefinition;
                /** Class of the table wrapper element when its content is scrollable */
                scrollableClass: ClassDefinition;
                /** Class of the Table */
                tableClass: ClassDefinition;
                /** Class of the table elemnet when bordered */
                borderedClass: ClassDefinition;
                /** Class of the table element when striped */
                stripedClass: ClassDefinition;
                /** Class of the table element when narrowed */
                narrowedClass: ClassDefinition;
                /** Class of the table element when hoverable */
                hoverableClass: ClassDefinition;
                /** Class of the table element when it is empty */
                emptyClass: ClassDefinition;
                /** Class of the table `th` element */
                thClass: ClassDefinition;
                /** Class of the table `th` element with position */
                thPositionClass: ClassDefinition;
                /** Class of the table `th` element when checkable */
                thCheckboxClass: ClassDefinition;
                /** Class of the table `th` element when checkbox is sticky */
                thStickyClass: ClassDefinition;
                /** Class of the table `th` element of the detail column of triggers */
                thDetailedClass: ClassDefinition;
                /** Class of the table `th` element when sortable */
                thSortableClass: ClassDefinition;
                /** Class of the table header sort icon element */
                thSortIconClass: ClassDefinition;
                /** Class of the table `th` element that is currently sorted */
                thCurrentSortClass: ClassDefinition;
                /** Class of the table `th` element that is unsortable */
                thUnselectableClass: ClassDefinition;
                /** Class of the table `th` subheading element */
                thSubheadingClass: ClassDefinition;
                /** Class of the table `tr` element when selected */
                trSelectedClass: ClassDefinition;
                /** Class of the table `tr` element when checkable and checked */
                trCheckedClass: ClassDefinition;
                /** Class of the table `tr` element when detailed */
                trDetailedClass: ClassDefinition;
                /** Class of the table `tr` element when table is empty */
                trEmptyClass: ClassDefinition;
                /** Class of the table `td` element */
                tdClass: ClassDefinition;
                /** Class of the table `td` element with position */
                tdPositionClass: ClassDefinition;
                /** Class of the table `td` element when column is sticky */
                tdStickyClass: ClassDefinition;
                /** Class of the table `td` element when row is checkable */
                tdCheckboxClass: ClassDefinition;
                /** Class of the table `td` element that contains the chevron to trigger details */
                tdDetailedChevronClass: ClassDefinition;
                /** Class of the Table pagination wrapper element */
                paginationWrapperClass: ClassDefinition;
                /** Class of the table footer element */
                footerClass: ClassDefinition;
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
                /** Class of the tab item element */
                tabClass: ClassDefinition;
                /** Class of the tab item element when active */
                tabActiveClass: ClassDefinition;
                /** Class of the tab item element before the active one */
                tabPreviousClass: ClassDefinition;
                /** Class of the tab item element after the active one */
                tabNextClass: ClassDefinition;
                /** Class of the tab item element when disabled */
                tabDisabledClass: ClassDefinition;
                /** Class of the tab item icon element */
                tabIconClass: ClassDefinition;
                /** Class of the tab item label element */
                tabLabelClass: ClassDefinition;
                /** Class of the tab panel element */
                tabPanelClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Tab size */
                size: string;
                /** Show tab in vertical layout */
                vertical: boolean;
                /** Tab type */
                type: string;
                /** Tablist tag name */
                tag: DynamicComponent;
                /** Tab will have an animation */
                animated: boolean;
                /** Transition animation name */
                animation: [string, string] | [string, string, string, string];
                /** Apply animation on the initial render */
                animateInitially: boolean;
                /** Accessibility aria-label to be passed to the tablist wrapper element */
                ariaLabel: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element with position */
                positionClass: ClassDefinition;
                /** Class of the root element with size */
                sizeClass: ClassDefinition;
                /** Class of the root element with type */
                typeClass: ClassDefinition;
                /** Class of the root element when expanded */
                expandedClass: ClassDefinition;
                /** Class of the root element when vertical */
                verticalClass: ClassDefinition;
                /** Class of the root element when multilined */
                multilineClass: ClassDefinition;
                /** Class of the list container element */
                listClass: ClassDefinition;
                /** Class of the panel container element */
                contentClass: ClassDefinition;
                /** Class of the panel container element when transitioning */
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
                /** Opens a dropdown with choices when the input field is focused */
                openOnFocus: boolean;
                /** Keep open dropdown list after select */
                keepOpen: boolean;
                /** The first option will always be pre-selected (easier to just hit enter or tab) */
                keepFirst: boolean;
                /** Allows adding new items */
                allowNew: boolean;
                /** Allows adding the same item multiple time */
                allowDuplicates: boolean;
                /** Makes the component check if list reached scroll start or end and emit scroll events */
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
                teleport: boolean | object | string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element when expanded */
                expandedClass: ClassDefinition;
                /** Class of the root element with size */
                sizeClass: ClassDefinition;
                /** Class of the root element with variant */
                variantClass: ClassDefinition;
                /** Class of the inner container element */
                containerClass: ClassDefinition;
                /** Class of the tag item element */
                itemClass: ClassDefinition;
                /** Class of the tag item close button element */
                closeClass: ClassDefinition;
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
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Dropdown content is shown into a modal on mobile */
                mobileModal: boolean;
                /** Dropdown content is shown into a modal on desktop */
                desktopModal: boolean;
                /** Enable mobile native input if mobile agent */
                mobileNative: boolean;
                /** Mobile breakpoint as `max-width` value */
                mobileBreakpoint: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: boolean | object | string;
                /** Accessibility seconds select aria label */
                ariaSelectSecondLabel: string;
                /** Accessibility minutes select aria label */
                ariaSelectMinuteLabel: string;
                /** Accessibility hours select aria label */
                ariaSelectHourLabel: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the root element component size */
                sizeClass: ClassDefinition;
                /** Class of the dropdown box element where you choose the date */
                boxClass: ClassDefinition;
                /** Class of the select separator element */
                separatorClass: ClassDefinition;
                /** Class of the footer element */
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
                /** Color of the tooltip */
                variant: string;
                /** Position of the Tooltip relative to the trigger */
                position: "auto" | "bottom-left" | "bottom-right" | "bottom" | "left" | "right" | "top-left" | "top-right" | "top";
                /** Tooltip default animation */
                animation: string;
                /** Tooltip trigger tag name */
                triggerTag: DynamicComponent;
                /** Tooltip trigger events */
                triggers: ("click" | "contextmenu" | "focus" | "hover")[];
                /** Tooltip auto close options (pressing escape, clicking the content or outside) */
                closeable: boolean | ("content" | "escape" | "outside")[];
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: boolean | object | string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element when teleported */
                teleportClass: ClassDefinition;
                /** Class of the trigger element */
                triggerClass: ClassDefinition;
                /** Class of the content element */
                contentClass: ClassDefinition;
                /** Class of the content element with position */
                positionClass: ClassDefinition;
                /** Class of the content element with variant */
                variantClass: ClassDefinition;
                /** Class of the content element when is multiline */
                multilineClass: ClassDefinition;
                /** Class of the content element when is always visible */
                alwaysClass: ClassDefinition;
                /** Class of the arrow element */
                arrowClass: ClassDefinition;
                /** Class of the arrow element with position */
                arrowPositionClass: ClassDefinition;
                /** Class of the arrow element with variant */
                arrowVariantClass: ClassDefinition;
            }>;
        upload?: ComponentConfigBase &
            Partial<{
                /** Color of the control */
                variant: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the root element when expanded */
                expandedClass: ClassDefinition;
                /** Class of the root element with variant */
                variantClass: ClassDefinition;
                /** Class of the dragable container element */
                draggableClass: ClassDefinition;
                /** Class of the dragable container element when disabled */
                disabledClass: ClassDefinition;
                /** Class of the dragable container element when hovered */
                hoveredClass: ClassDefinition;
            }>;
    }
}
