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
                /** Size of the control */
                size: string;
                /** Menu tag name */
                menuTag: DynamicComponent;
                /** Menu item tag name */
                itemTag: DynamicComponent;
                /** Position of the dropdown */
                position: string;
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
                teleport: string | boolean | Record<string, any>;
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
                /** Size of the control */
                size: string;
                /** Enable rounded style */
                rounded: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Button tag name */
                tag: DynamicComponent;
                /** Color variant of the control */
                variant: string;
                /** Accessibility Role attribute to be passed to the button. */
                role: string;
                /** Class of the button elements wrapper */
                wrapperClass: ClassDefinition;
                /** Class of the button when outlined */
                outlinedClass: ClassDefinition;
                /** Class of the button with loading */
                loadingClass: ClassDefinition;
                /** Class of the button when inverted */
                invertedClass: ClassDefinition;
                /** Class of the button when expanded */
                expandedClass: ClassDefinition;
                /** Class of the button when rounded */
                roundedClass: ClassDefinition;
                /** Class of the button when disabled */
                disabledClass: ClassDefinition;
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
            }>;
        carousel?: ComponentConfigBase &
            Partial<{
                /** Icon pack to use */
                iconPack: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
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
                /** Class of the root element in overlay */
                overlayClass: ClassDefinition;
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
                /** Size of the control */
                size: string;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Class when checkbox is disabled */
                disabledClass: ClassDefinition;
                /** Class of the checkbox labe */
                labelClass: ClassDefinition;
                /** Class of the checkbox size */
                sizeClass: ClassDefinition;
                /** Class of the checkbox variant */
                variantClass: ClassDefinition;
                /** Class of the root element when checked */
                checkedClass: ClassDefinition;
                /** Class of the checkbox input */
                inputClass: ClassDefinition;
                /** Class of the checkbox input when checked */
                inputCheckedClass: ClassDefinition;
                /** Class when checkbox is indeterminate */
                indeterminateClass: ClassDefinition;
            }>;
        collapse?: ComponentConfigBase &
            Partial<{
                /** Trigger position */
                position: "top" | "bottom";
                /** Custom animation (transition name) */
                animation: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the trigger element */
                triggerClass: ClassDefinition;
                /** Class of the content */
                contentClass: ClassDefinition;
            }>;
        datepicker?: ComponentConfigBase &
            Partial<{
                /** Size of the control input */
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
                /** Class of the Datepicker size */
                sizeClass: ClassDefinition;
                /** Icon name for previous icon */
                iconPrev: string;
                /** Icon name for next icon */
                iconNext: string;
                /** Set custom day names, else use names based on locale */
                dayNames: string[];
                /** Set custom month names, else use names based on locale */
                monthNames: string[];
                /** Close dropdown on click */
                closeOnClick: boolean;
                /** Custom function to format a date into a string */
                dateFormatter: (date: Date | Date[]) => string;
                /** Custom function to parse a string into a date */
                dateParser: (date: string) => Date;
                /** Date creator function, default is `new Date()` */
                dateCreator: () => Date;
                /** Define a list of weeks which can not be selected */
                unselectableDaysOfWeek: number[];
                /** Show nearby month days */
                nearbyMonthDays: boolean;
                /** Define if nearby month days can be selected */
                nearbySelectableMonthDays: boolean;
                /** Show weeek numbers */
                showWeekNumber: boolean;
                /** Define if weeek numbers are clickable */
                weekNumberClickable: boolean;
                /** Set the first day of a week */
                firstDayOfWeek: number;
                /** Define the range of years to show */
                yearsRange: number[];
                /** Trap dropdown on focus */
                trapFocus: boolean;
                /** Enable mobile native input if mobile agent */
                mobileNative: boolean;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Accessibility next button aria label */
                ariaNextLabel: string;
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
        dropdown?: ComponentConfigBase &
            Partial<{
                /** Dropdown menu tag name */
                menuTag: DynamicComponent;
                /** Position of the dropdown relative to the trigger */
                position: string;
                /** Makes the component check if menu reached scroll start or end and emit scroll events. */
                checkScroll: boolean;
                /** Max height of dropdown content */
                maxHeight: string | number;
                /** Dropdown content (items) are shown into a modal on mobile */
                mobileModal: boolean;
                /** Custom animation (transition name) */
                animation: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of dropdown when expanded */
                expandedClass: ClassDefinition;
                /** Class of dropdown when disabled */
                disabledClass: ClassDefinition;
                /** Role attribute to be passed to the list container for better accessibility.
Use menu only in situations where your dropdown is related to a navigation menu. */
                ariaRole: string;
                /** Class of the trigger element */
                triggerClass: ClassDefinition;
                /** Trap focus inside the dropdown. */
                trapFocus: boolean;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Class of dropdown when on mobile */
                mobileClass: ClassDefinition;
                /** Dropdown trigger tag name */
                triggerTag: DynamicComponent;
                /** Dropdown will be triggered by any events */
                triggers: string[];
                /** Dropdown close options (pressing escape, clicking the content or outside) */
                closeable: boolean | string[];
                /** Class when the dropdown is teleported */
                teleportClass: ClassDefinition;
                /** Class of dropdown menu when inline */
                inlineClass: ClassDefinition;
                /** Class of the overlay when on mobile */
                menuMobileOverlayClass: ClassDefinition;
                /** Class of the dropdown menu */
                menuClass: ClassDefinition;
                /** Class of dropdown menu position */
                menuPositionClass: ClassDefinition;
                /** Class of dropdown menu when active */
                menuActiveClass: ClassDefinition;
                /** Class for the root element indicating position of dropdown */
                positionClass: ClassDefinition;
                /** Class for the root element indicating whether the dropdown is open */
                activeClass: ClassDefinition;
                /** Class for the root element when the dropdown is hoverable */
                hoverableClass: ClassDefinition;
                /** Class of the dropdown item */
                itemClass: ClassDefinition;
                /** Dropdown item tag name */
                itemTag: DynamicComponent;
                /** Role attribute to be passed to the list item for better accessibility.
Use menuitem only in situations where your dropdown is related to a navigation menu. */
                itemAriaRole: string;
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
                /** Class for field label */
                labelClass: ClassDefinition;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Class of file component when on mobile */
                mobileClass: ClassDefinition;
                /** Vertical size of input */
                labelsize: string;
                /** Class to align label and control in horizontal forms */
                horizontalClass: ClassDefinition;
                /** Class when fields are grouped together */
                groupedClass: ClassDefinition;
                /** Class when fields fill up multiple lines */
                groupMultilineClass: ClassDefinition;
                /** Class for field label size */
                labelSizeClass: ClassDefinition;
                /** Class for field label when horizontal */
                labelHorizontalClass: ClassDefinition;
                /** Class for field body */
                bodyClass: ClassDefinition;
                /** "Class for field body when horizontal */
                bodyHorizontalClass: ClassDefinition;
                /** Class for components automatically attached together when inside a field */
                addonsClass: ClassDefinition;
                /** Class for the field message */
                messageClass: ClassDefinition;
                /** Class of the message field variant */
                variantMessageClass: ClassDefinition;
                /** Class of the label field variant */
                variantLabelClass: ClassDefinition;
                /** Class for the focused field */
                focusedClass: ClassDefinition;
                /** Class for the filled field */
                filledClass: ClassDefinition;
            }>;
        icon?: ComponentConfigBase &
            Partial<{
                /** Icon size */
                size: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the icon */
                variant: string;
                /** Class of the icon size */
                sizeClass: ClassDefinition;
                /** Class of the icon variant */
                variantClass: ClassDefinition;
                /** Add class to icon font.
See icon library documentation for custom classes. */
                customClass: string;
                /** Class of the icon when clickable */
                clickableClass: ClassDefinition;
                /** Class of the element when spin */
                spinClass: ClassDefinition;
            }>;
        input?: ComponentConfigBase &
            Partial<{
                /** Size of the control */
                size: string;
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
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Class of input when expanded */
                expandedClass: ClassDefinition;
                /** Class of input when rounded */
                roundedClass: ClassDefinition;
                /** Class of input when disabled */
                disabledClass: ClassDefinition;
                /** Class of the left icon */
                iconLeftClass: ClassDefinition;
                /** Class of the right icon */
                iconRightClass: ClassDefinition;
                /** Class of the input size */
                sizeClass: ClassDefinition;
                /** Class of the input variant */
                variantClass: ClassDefinition;
                /** Class of the native input element */
                inputClass: ClassDefinition;
                /** Show character counter when maxlength prop is passed */
                counter: boolean;
                /** Class of input when type textarea */
                textareaClass: ClassDefinition;
                /** Class of the left icon space inside the input */
                iconLeftSpaceClass: ClassDefinition;
                /** Class of the right icon space inside the input */
                iconRightSpaceClass: ClassDefinition;
                /** Class of the counter element */
                counterClass: ClassDefinition;
                /** Class to display when a right icon is used */
                hasIconRightClass: ClassDefinition;
            }>;
        loading?: ComponentConfigBase &
            Partial<{
                /** Custom animation (transition name) */
                animation: string;
                /** Icon name to show, unnecessary when default slot is used. */
                icon: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class for the loading icon */
                iconClass: ClassDefinition;
                /** Class for the loading label */
                labelClass: ClassDefinition;
                /** Icon size */
                iconSize: string;
                /** Class of the loading overlay */
                overlayClass: ClassDefinition;
                /** Enable spin effect on icon */
                iconSpin: boolean;
                /** DOM element where the loading component will be created on (for programmatic usage).
Note that this also changes fullPage to false. */
                container: string | HTMLElement;
                /** Class for the root element when fullpage */
                fullPageClass: ClassDefinition;
            }>;
        menu?: ComponentConfigBase &
            Partial<{
                /** Icon pack to use */
                iconPack: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Icon size */
                iconSize: string;
                /** Role attribute to be passed to the list container for better accessibility.
Use menu only in situations where your dropdown is related to a navigation menu. */
                ariaRole: string;
                /** Class of the menu list */
                listClass: ClassDefinition;
                /** Class of the menu list label */
                listLabelClass: ClassDefinition;
                /** Transition name to apply on menu list */
                animation: string;
                /** Class of the menu item */
                itemClass: ClassDefinition;
                /** Menu item tag name */
                menuTag: DynamicComponent;
                /** Role attribute to be passed to the list item for better accessibility. */
                itemAriaRole: string;
                /** Class of the active menu item */
                itemActiveClass: ClassDefinition;
                /** Class of the disabled menu item */
                itemDisabledClass: ClassDefinition;
                /** Class of the icon of menu item */
                itemIconTextClass: ClassDefinition;
                /** Class of the menu item when is a submenu */
                itemSubmenuClass: ClassDefinition;
                /** Class of the root element of menu item */
                itemWrapperClass: ClassDefinition;
            }>;
        modal?: ComponentConfigBase &
            Partial<{
                /** Custom animation (transition name) */
                animation: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
but will set body to position fixed, might break some layouts. */
                scroll: string;
                /** Class of the modal overlay */
                overlayClass: ClassDefinition;
                /** Role attribute to be passed to the div wrapper for better accessibility. */
                ariaRole: string;
                /** Class of the modal content */
                contentClass: ClassDefinition;
                /** Trap focus inside the modal */
                trapFocus: boolean;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Class of modal component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of modal component when its active */
                activeClass: ClassDefinition;
                /** Is Modal cancleable by clicking 'X', pressing escape or clicking outside */
                cancelable: boolean | string[];
                /** DOM element where the modal component will be created on (for programmatic usage) */
                container: string | HTMLElement;
                /** Width of the Modal */
                width: string | number;
                /** Accessibility aria-label to be passed to the div wrapper element */
                ariaLabel: string;
                /** Destroy modal on hide */
                destroyOnHide: boolean;
                /** Automatically focus modal when active */
                autoFocus: boolean;
                /** Close icon name */
                closeIcon: string;
                /** Size of close icon */
                closeIconSize: string;
                /** Class of the close button */
                closeClass: ClassDefinition;
                /** Class of the modal when fullscreen */
                fullScreenClass: ClassDefinition;
                /** Class of the modal when scroll is clip */
                scrollClipClass: ClassDefinition;
                /** Class of the modal when scroll is not clip */
                noScrollClass: ClassDefinition;
            }>;
        notification?: ComponentConfigBase &
            Partial<{
                /** Which position the notification will appear when programmatically */
                position: string;
                /** Custom animation (transition name) */
                animation: string;
                /** Icon pack to use */
                iconPack: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Class of the wrapper element */
                wrapperClass: ClassDefinition;
                /** Class of the icon on the left */
                iconClass: ClassDefinition;
                /** Class of the notification variant */
                variantClass: ClassDefinition;
                /** Icon size */
                iconSize: string;
                /** Class of the content element */
                contentClass: ClassDefinition;
                /** Class of the element when positioned */
                positionClass: ClassDefinition;
                /** Close icon name */
                closeIcon: string;
                /** Size of close icon */
                closeIconSize: string;
                /** Class of the close button container */
                closeClass: ClassDefinition;
                /** Accessibility label for the close button */
                ariaCloseLabel: string;
                /** Root class of the notice */
                noticeClass: ClassDefinition;
                /** Class of the notice when positioned */
                noticePositionClass: ClassDefinition;
                /** Class of the custom container element */
                noticeCustomContainerClass: ClassDefinition;
            }>;
        pagination?: ComponentConfigBase &
            Partial<{
                /** Pagination size */
                size: string;
                /** Rounded button style */
                rounded: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the pagination when rounded */
                roundedClass: ClassDefinition;
                /** Class for the pagination size */
                sizeClass: ClassDefinition;
                /** Icon to use for previous button */
                iconPrev: string;
                /** Icon to use for next button */
                iconNext: string;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Accessibility label for the next page button. */
                ariaNextLabel: string;
                /** Accessibility label for the previous page button. */
                ariaPreviousLabel: string;
                /** Class of the prev button */
                prevButtonClass: ClassDefinition;
                /** Class of the next button */
                nextButtonClass: ClassDefinition;
                /** Class of pagination component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the pagination list */
                listClass: ClassDefinition;
                /** Items count for each page */
                perPage: string | number;
                /** Simple style */
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
                linkClass: ClassDefinition;
                /** Class of the current link */
                linkCurrentClass: ClassDefinition;
                /** Class of the pagination ellipsis */
                ellipsisClass: ClassDefinition;
                /** Class of the info in `simple` mode */
                infoClass: ClassDefinition;
                /** Class of the pagination order */
                orderClass: ClassDefinition;
                /** Class of the pagination in `simple` mode */
                simpleClass: ClassDefinition;
                /** Class of the disabled link */
                linkDisabledClass: ClassDefinition;
            }>;
        radio?: ComponentConfigBase &
            Partial<{
                /** Size of the control */
                size: string;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Class when radio is disabled */
                disabledClass: ClassDefinition;
                /** Class of the radio label */
                labelClass: ClassDefinition;
                /** Class of the radio size */
                sizeClass: ClassDefinition;
                /** Class of the radio variant */
                variantClass: ClassDefinition;
                /** Class of the root element when checked */
                checkedClass: ClassDefinition;
                /** Class of the native input element */
                inputClass: ClassDefinition;
                /** Class of the native input element when checked */
                inputCheckedClass: ClassDefinition;
            }>;
        select?: ComponentConfigBase &
            Partial<{
                /** Vertical size of input */
                size: string;
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
                /** Color of the control */
                variant: string;
                /** Class of select when expanded */
                expandedClass: ClassDefinition;
                /** Class of select when rounded */
                roundedClass: ClassDefinition;
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
                /** Class of the left icon space inside the select */
                iconLeftSpaceClass: ClassDefinition;
                /** Class of the right icon space inside the select */
                iconRightSpaceClass: ClassDefinition;
                /** Class of the native select element */
                selectClass: ClassDefinition;
                /** Class of the select when multiple mode is active */
                multipleClass: ClassDefinition;
                /** Class of the select placeholder */
                placeholderClass: ClassDefinition;
                /** Class of the select arrow */
                arrowClass: ClassDefinition;
                /** Class of the select variant for the root element */
                rootVariantClass: ClassDefinition;
            }>;
        sidebar?: ComponentConfigBase &
            Partial<{
                /** Show a small sidebar */
                reduce: boolean;
                /** Sidebar position */
                position: "top" | "bottom" | "left" | "right";
                /** Custom animation (transition name) */
                animation: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the sidebar */
                variant: string;
                /** Class of the sidebar variant */
                variantClass: ClassDefinition;
                /** Use `clip` to remove the body scrollbar, `keep` to have a non scrollable scrollbar to avoid shifting background,
but will set body to position fixed, might break some layouts. */
                scroll: string;
                /** Show an overlay like modal */
                overlay: boolean;
                /** Class of the sidebar overlay */
                overlayClass: ClassDefinition;
                /** Class of the sidebar content */
                contentClass: ClassDefinition;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Class of sidebar component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of sidebar when teleported */
                teleportClass: ClassDefinition;
                /** Class of the sidebar when its inlined */
                inlineClass: ClassDefinition;
                /** Class of the sidebar position */
                positionClass: ClassDefinition;
                /** Class of sidebar component when its active */
                activeClass: ClassDefinition;
                /** Is Sidebar cancleable by pressing escape or clicking outside. */
                cancelable: boolean | string[];
                /** DOM element where the sidebar component will be created on (for programmatic usage). */
                container: string | HTMLElement;
                /** Destroy sidebar on hide */
                destroyOnHide: boolean;
                /** Class of the body when sidebar is not clipped */
                noScrollClass: ClassDefinition;
                /** Show sidebar in fullheight */
                fullheight: boolean;
                /** Show sidebar in fullwidth */
                fullwidth: boolean;
                /** Custom layout on mobile */
                mobile: string;
                /** Expand sidebar on hover when reduced or mobile is reduce */
                expandOnHover: boolean;
                /** Class of the sidebar when is fullheight */
                fullheightClass: ClassDefinition;
                /** Class of the sidebar when is fullwidth */
                fullwidthClass: ClassDefinition;
                /** Class of the sidebar when reduced */
                reduceClass: ClassDefinition;
                /** Class of the sidebar when expanded on hover */
                expandOnHoverClass: ClassDefinition;
                /** Class of the body when sidebar clipped */
                crollClipClass: ClassDefinition;
                /** Class of the sidebar content when sidebar is hidden */
                hiddenClass: ClassDefinition;
                /** Class of the sidebar content when sidebar is visible */
                visibleClass: ClassDefinition;
            }>;
        skeleton?: ComponentConfigBase &
            Partial<{
                /** Enable rounded style */
                rounded: boolean;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the skeleton item */
                itemClass: ClassDefinition;
                /** Class of the skeleton size */
                sizeClass: ClassDefinition;
                /** Class of the skeleton position */
                positionClass: ClassDefinition;
                /** Show a loading animation */
                animated: boolean;
                /** Class of the skeleton animation */
                animationClass: ClassDefinition;
                /** Class of the skeleton item rounded */
                itemRoundedClass: ClassDefinition;
            }>;
        slider?: ComponentConfigBase &
            Partial<{
                /** Vertical size of slider */
                size: string;
                /** Rounded thumb */
                rounded: boolean;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the slider */
                variant: string;
                /** Class when slider is disabled */
                disabledClass: ClassDefinition;
                /** Class of the vertical slider size */
                sizeClass: ClassDefinition;
                /** Class of the slider variant */
                variantClass: ClassDefinition;
                /** Accessibility aria-label to to be passed to the slider thumb element. */
                ariaLabel: string | string[];
                /** Show tooltip when thumb is being dragged */
                tooltip: boolean;
                /** Color of the tooltip */
                tooltipVariant: string;
                /** Define v-model format */
                format: string;
                /** Class of the slider track */
                trackClass: ClassDefinition;
                /** Class of the filled part of the slider */
                fillClass: ClassDefinition;
                /** Class when the slider is rounded */
                thumbRoundedClass: ClassDefinition;
                /** Class when the thumb gets dragged */
                thumbDraggingClass: ClassDefinition;
                /** Class of the thumb wrapper */
                thumbWrapperClass: ClassDefinition;
                /** Class of the thumb */
                thumbClass: ClassDefinition;
                /** Class of slider tick */
                tickClass: ClassDefinition;
                /** Class when slider tick is hidden */
                tickHiddenClass: ClassDefinition;
                /** Class of tick label */
                tickLabelClass: ClassDefinition;
                /** Class to display on the wrapper element when the slider is dragged */
                thumbWrapperDraggingClass: ClassDefinition;
            }>;
        steps?: ComponentConfigBase &
            Partial<{
                /** Icon pack */
                iconPack: string;
                /** Icon on the left */
                icon: string;
                /** Class of the content item */
                itemClass: ClassDefinition;
                /** Class of the nav item */
                itemHeaderClass: ClassDefinition;
                /** Step item tag name */
                itemTag: DynamicComponent;
                /** Role attribute to be passed to the div wrapper for better accessibility */
                ariaRole: string;
                /** Sets a class to the item header */
                headerClass: string;
                /** Class of the nav item when active */
                itemHeaderActiveClass: ClassDefinition;
                /** Class of the nav item behind the active one */
                itemHeaderPreviousClass: ClassDefinition;
                /** Class of the nav item with variant (default value by parent steps component) */
                itemHeaderVariantClass: ClassDefinition;
                /** Tab size */
                size: string;
                /** Transition animation name */
                animation: string[];
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Size of the steps */
                sizeClass: ClassDefinition;
                /** Icon to use for navigation button */
                iconPrev: string;
                /** Icon to use for navigation button */
                iconNext: string;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Accessibility next button aria label */
                ariaNextLabel: string;
                /** Accessibility previous button aria label */
                ariaPreviousLabel: string;
                /** Class of steps component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the Steps component when is vertical and its position changes */
                positionClass: ClassDefinition;
                /** Step navigation is animated */
                animated: boolean;
                /** Apply animation on the initial render */
                animateInitially: boolean;
                /** Position of the marker label */
                labelPosition: string;
                /** Class of the tooltip trigger */
                verticalClass: ClassDefinition;
                /** Class of the steps container */
                stepsClass: ClassDefinition;
                /** Class of Steps component when animation gets triggered */
                animatedClass: ClassDefinition;
                /** Class of the Steps markers trigger when are rounded */
                stepMarkerRoundedClass: ClassDefinition;
                /** Class of the Steps component dividers */
                stepDividerClass: ClassDefinition;
                /** Class of the Steps component marker */
                stepMarkerClass: ClassDefinition;
                /** Class of the Steps component content */
                stepContentClass: ClassDefinition;
                /** Class of the Steps component content when transition is happening */
                stepContentTransitioningClass: ClassDefinition;
                /** Class of the Steps component navigation element */
                stepNavigationClass: ClassDefinition;
                /** Class of the Steps component link */
                stepLinkClass: ClassDefinition;
                /** Class of the Steps component link when clickable */
                stepLinkClickableClass: ClassDefinition;
                /** Class of the Step component link label */
                stepLinkLabelClass: ClassDefinition;
                /** Class of the Step component link label when positioned */
                stepLinkLabelPositionClass: ClassDefinition;
            }>;
        switch?: ComponentConfigBase &
            Partial<{
                /** Size of the control */
                size: string;
                /** Same as native autocomplete options to use in HTML5 validation */
                autocomplete: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Class of the switch when rounded */
                roundedClass: ClassDefinition;
                /** Class when switch is disabled */
                disabledClass: ClassDefinition;
                /** Class of the switch label */
                labelClass: ClassDefinition;
                /** Class of the switch size */
                sizeClass: ClassDefinition;
                /** Class of the switch variant */
                variantClass: ClassDefinition;
                /** Root class of the native input checkbox */
                inputClass: ClassDefinition;
                /** Class of the native input element when checked */
                inputCheckedClass: ClassDefinition;
                /** Class of switch label position */
                positionClass: ClassDefinition;
                /** Color of the switch when is passive */
                passiveVariant: string;
                /** Class of the outer switch check */
                switchClass: ClassDefinition;
                /** Class of the outer switch check when checked */
                switchCheckedClass: ClassDefinition;
                /** Class of the inner switch check */
                switchCheckClass: ClassDefinition;
                /** Class of the switch passive variant */
                passiveVariantClass: ClassDefinition;
            }>;
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
                /** Class of the Table when is hoverable */
                hoverableClass: ClassDefinition;
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
        tabs?: ComponentConfigBase &
            Partial<{
                /** Icon pack */
                iconPack: string;
                /** Icon on the left */
                icon: string;
                /** Class of the tab item */
                itemClass: ClassDefinition;
                /** Class of the tab item header */
                itemHeaderClass: ClassDefinition;
                /** Tabs item tag name */
                itemTag: DynamicComponent;
                /** Role attribute to be passed to the div wrapper for better accessibility. */
                ariaRole: string;
                /** Sets a class to the item header */
                headerClass: string;
                /** Class of the tab item header when active */
                itemHeaderActiveClass: ClassDefinition;
                /** Class of the tab item header when disabled */
                itemHeaderDisabledClass: ClassDefinition;
                /** Class of the tab item header type */
                itemHeaderTypeClass: ClassDefinition;
                /** Class of the tab item header icon */
                itemHeaderIconClass: ClassDefinition;
                /** Class of the tab item header text */
                itemHeaderTextClass: ClassDefinition;
                /** Tab size */
                size: string;
                /** Tab type */
                type: string;
                /** Transition animation name */
                animation: string[];
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Class of Tabs component when expanded */
                expandedClass: ClassDefinition;
                /** Class of the tab content */
                contentClass: ClassDefinition;
                /** Class of Tabs component when when is vertical and its position changes */
                positionClass: ClassDefinition;
                /** Class of the tab item wrapper */
                itemWrapperClass: ClassDefinition;
                /** Tab will have an animation */
                animated: boolean;
                /** Show tab in vertical layout */
                vertical: boolean;
                /** Apply animation on the initial render */
                animateInitially: boolean;
                /** Class of Tabs component when vertical */
                verticalClass: ClassDefinition;
                /** Class of Tabs component when multiline */
                multilineClass: ClassDefinition;
                /** Class of the Tabs component nav tabs */
                navTabsClass: ClassDefinition;
                /** Size of the navigation */
                navSizeClass: ClassDefinition;
                /** Class of the Tabs component nav position */
                navPositionClass: ClassDefinition;
                /** Type of the navigation */
                navTypeClass: ClassDefinition;
                /** Class of the tab content when transitioning */
                transitioningClass: ClassDefinition;
            }>;
        taginput?: ComponentConfigBase &
            Partial<{
                /** Vertical size of the input control */
                size: string;
                /** Makes the component check if list reached scroll start or end and emit scroll events. */
                checkScroll: boolean;
                /** Keep open dropdown list after select */
                keepOpen: boolean;
                /** Array of keys
(https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
which will add a item when typing */
                confirmKeys: string[];
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Native options to use in HTML5 validation */
                autocomplete: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the entered item */
                itemClass: ClassDefinition;
                /** Color of the each item */
                variant: string;
                /** Class of input when expanded */
                expandedClass: ClassDefinition;
                /** Class of the input container size */
                sizeClass: ClassDefinition;
                /** Class of the entered item variant */
                variantClass: ClassDefinition;
                /** Show counter when maxlength or maxtags props are passed */
                counter: boolean;
                /** Class of the counter element */
                counterClass: ClassDefinition;
                /** Icon name of close icon on selected item */
                closeIcon: string;
                /** Class of the close button of entered item */
                closeClass: ClassDefinition;
                /** Accessibility label for the close button */
                ariaCloseLabel: string;
                /** Add close/delete button to the item */
                closable: boolean;
                /** Array of chars used to split when pasting a new string */
                separators: string[];
                /** Allow removing last item when pressing given keys, if input is empty */
                removeOnKeys: string[];
                /** Class of the input container */
                containerClass: ClassDefinition;
                /** Class configuration for the underlying autocomplete component */
                autocompleteClasses: Record<string, any>;
            }>;
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
        tooltip?: ComponentConfigBase &
            Partial<{
                /** Position of the Tooltip relative to the trigger */
                position: string;
                /** Tooltip default animation */
                animation: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the tooltip */
                variant: string;
                /** Class of the tooltip variant */
                variantClass: ClassDefinition;
                /** Class of the tooltip trigger */
                triggerClass: ClassDefinition;
                /** Class of the tooltip content */
                contentClass: ClassDefinition;
                /** Tooltip trigger tag name */
                triggerTag: DynamicComponent;
                /** Tooltip trigger events */
                triggers: string[];
                /** Tooltip auto close options (pressing escape, clicking the content or outside) */
                closeable: boolean | string[];
                /** Class when the dropdown is teleported */
                teleportClass: ClassDefinition;
                /** Class of the tooltip trigger position */
                positionClass: ClassDefinition;
                /** Class of the tooltip arrow */
                arrowClass: ClassDefinition;
                /** Class of the tooltip content when is multiline */
                multilineClass: ClassDefinition;
                /** Class of the tooltip trigger when is always visible */
                alwaysClass: ClassDefinition;
                /** Class of the tooltip arrow position */
                arrowPositionClass: ClassDefinition;
            }>;
        upload?: ComponentConfigBase &
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Class of the Upload when expanded */
                expandedClass: ClassDefinition;
                /** Class of the Upload when disabled */
                disabledClass: ClassDefinition;
                /** Class of the Upload variant */
                variantClass: ClassDefinition;
                /** Class of the Upload when draggable */
                draggableClass: ClassDefinition;
                /** Class of the Upload when hovered */
                hoveredClass: ClassDefinition;
            }>;
    }
}
