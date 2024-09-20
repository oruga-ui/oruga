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
                /** Class of the dropdown item */
                itemClass: ClassDefinition;
                /** Class of the dropdown item when active */
                itemActiveClass: ClassDefinition;
                /** Class of the dropdown item when clickable */
                itemClickableClass: ClassDefinition;
                /** Class of the dropdown item when disabled */
                itemDisabledClass: ClassDefinition;
                /** Dropdown item tag name */
                itemTag: DynamicComponent;
                /** Role attribute to be passed to the list item for better accessibility.
Use menuitem only in situations where your dropdown is related to a navigation menu. */
                itemAriaRole: string;
            }>;
        field?: ComponentConfigBase &
            Partial<{
                /**  */
                messageTag: DynamicComponent;
                /** "Class for field body when horizontal */
                horizontalBodyClass: ClassDefinition;
                /** Class for components automatically attached together when inside a field */
                addonsClass: ClassDefinition;
                /** Class for field body */
                bodyClass: ClassDefinition;
                /** Class for field label */
                labelClass: ClassDefinition;
                /** Class for field label size */
                labelSizeClass: ClassDefinition;
                /** Class for field label when horizontal */
                horizontalLabelClass: ClassDefinition;
                /** Class for the field message */
                messageClass: ClassDefinition;
                /** Class for the filled field */
                filledClass: ClassDefinition;
                /** Class for the focused field */
                focusedClass: ClassDefinition;
                /** Class of file component when on mobile */
                mobileClass: ClassDefinition;
                /** Class of the label field variant */
                labelVariantClass: ClassDefinition;
                /** Class of the message field variant */
                messageVariantClass: ClassDefinition;
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
                /** Custom animation (transition name) */
                animation: string;
                /** Custom layout on mobile */
                mobile: "fullwidth" | "reduced" | "hidden";
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
                scroll: "keep" | "clip";
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
                /**  */
                tickClass: ClassDefinition;
                /** Class of tick label */
                tickLabelClass: ClassDefinition;
                /** Class when slider tick is hidden */
                tickHiddenClass: ClassDefinition;
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
                /** Class of the steps variant */
                variantClass: ClassDefinition;
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
                /** Icon to be shown when the table is empty */
                emptyIcon: string;
                /** Label for the loading state */
                loadingLabel: string;
                /** Label to be shown when the table is empty */
                emptyLabel: string;
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
                /** Size of empty icon */
                emptyIconSize: string;
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
                navItemClass: ClassDefinition;
                /** Class of the tab item */
                tabClass: ClassDefinition;
                /** Class of the tab item */
                tabPanelClass: ClassDefinition;
                /** Class of the tab item icon */
                tabIconClass: ClassDefinition;
                /** Class of the tab item label */
                tabLabelClass: ClassDefinition;
                /** Class of the tab item type */
                tabTypeClass: ClassDefinition;
                /** Class of the tab item when active */
                tabActiveClass: ClassDefinition;
                /** Class of the tab item when disabled */
                tabDisabledClass: ClassDefinition;
                /** Class of the Tabs component nav position */
                navPositionClass: ClassDefinition;
                /** Class of the Tabs component nav tabs */
                navClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Icon on the left */
                icon: string;
                /** Icon pack */
                iconPack: string;
                /** Role attribute to be passed to the div wrapper for better accessibility. */
                ariaRole: string;
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
                /** Class for the HTML input element */
                inputClass: ClassDefinition;
                /** Class for the underlaying dropdown component */
                dropdownClass: ClassDefinition;
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
            }>;
    }
}
