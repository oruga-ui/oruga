import "./chunk-UXIASGQL.js";

// node_modules/@oruga-ui/theme-bulma/dist/bulma.mjs
var bulmaConfig = {
  field: {
    override: true,
    rootClass: "field",
    labelClass: "label",
    labelSizeClass: "is-",
    messageClass: "help",
    variantMessageClass: "is-",
    addonsClass: "has-addons",
    groupedClass: "is-grouped",
    groupMultilineClass: "is-grouped-multiline",
    horizontalClass: "is-horizontal",
    labelHorizontalClass: "field-label",
    bodyHorizontalClass: "field-body",
    bodyClass: "control"
  },
  input: {
    override: true,
    rootClass: (_, { props, computed }) => {
      const classes = ["control"];
      if (props.icon)
        classes.push("has-icons-left");
      if (computed.hasIconRight)
        classes.push("has-icons-right");
      return classes.join(" ").trim();
    },
    inputClass: "input",
    textareaClass: "textarea",
    roundedClass: "is-rounded",
    variantClass: "is-",
    sizeClass: "is-",
    expandedClass: "is-expanded",
    iconLeftClass: "is-left",
    iconRightClass: "is-right",
    counterClass: "help counter"
  },
  select: {
    override: true,
    rootClass: (_, { props, computed }) => {
      const classes = ["control", "select"];
      if (props.size)
        classes.push(`is-${props.size}`);
      if (props.rounded)
        classes.push("is-rounded");
      if (computed.statusVariant)
        classes.push(`is-${computed.statusVariant}`);
      if (props.multiple)
        classes.push("is-multiple");
      if (props.icon)
        classes.push("has-icons-left");
      if (props.iconRight)
        classes.push("has-icons-right");
      return classes.join(" ").trim();
    },
    expandedClass: "is-fullwidth",
    iconLeftClass: "is-left",
    iconRightClass: "is-right",
    placeholderClass: "is-empty"
  },
  icon: {
    override: true,
    rootClass: "icon",
    variantClass: "has-text-",
    sizeClass: "is-",
    clickableClass: "is-clickable",
    spinClass: "is-spin"
  },
  checkbox: {
    override: true,
    rootClass: "b-checkbox checkbox",
    disabledClass: "is-disabled",
    checkClass: "check",
    labelClass: "control-label",
    variantClass: "is-",
    sizeClass: "is-"
  },
  radio: {
    override: true,
    rootClass: "b-radio radio",
    disabledClass: "is-disabled",
    checkClass: "check",
    labelClass: "control-label",
    variantClass: "is-",
    sizeClass: "is-"
  },
  switch: {
    override: true,
    rootClass: (_, { props }) => {
      const classes = ["switch"];
      if (props.rounded)
        classes.push("is-rounded");
      if (props.position === "left")
        classes.push("has-left-label");
      return classes.join(" ");
    },
    checkClass: (_, { props }) => {
      const classes = ["check"];
      if (props.variant)
        classes.push(`is-${props.variant}`);
      if (props.passiveVariant)
        classes.push(`is-${props.passiveVariant}-passive`);
      return classes.join(" ");
    },
    labelClass: "control-label",
    sizeClass: "is-",
    disabledClass: "is-disabled"
  },
  autocomplete: {
    override: true,
    rootClass: "autocomplete control",
    menuClass: "dropdown-menu dropdown-content",
    menuPositionClass: "is-opened-",
    itemClass: "dropdown-item",
    itemHoverClass: "is-hovered",
    itemEmptyClasses: "is-disabled",
    itemGroupTitleClass: "has-text-weight-bold"
  },
  inputitems: {
    override: true,
    rootClass: "taginput control",
    containerClass: "taginput-container is-focusable",
    itemClass: "tag",
    closeClass: "delete is-small"
  },
  pagination: {
    override: true,
    rootClass: (_, { props }) => {
      const classes = ["pagination"];
      if (props.rounded)
        classes.push("is-rounded");
      return classes.join(" ");
    },
    sizeClass: "is-",
    simpleClass: "is-simple",
    orderClass: "is-",
    listClass: "pagination-list",
    linkClass: "pagination-link",
    linkCurrentClass: "is-current",
    linkDisabledClass: "is-disabled",
    nextBtnClass: "pagination-next",
    prevBtnClass: "pagination-previous",
    infoClass: "info"
  },
  slider: {
    override: true,
    rootClass: (_, { props }) => {
      const classes = ["b-slider"];
      if (props.variant)
        classes.push(`is-${props.variant}`);
      if (props.rounded)
        classes.push("is-rounded");
      return classes.join(" ");
    },
    disabledClass: "is-disabled",
    // variantClass: 'is-',
    trackClass: "b-slider-track",
    fillClass: "b-slider-fill",
    thumbWrapperClass: (_, { data }) => {
      const classes = ["b-slider-thumb-wrapper"];
      if (data.dragging)
        classes.push(`is-dragging`);
      return classes.join(" ");
    },
    sizeClass: "is-",
    thumbClass: "b-slider-thumb",
    tickLabelClass: "b-slider-tick-label",
    tickHiddenClass: "is-tick-hidden",
    tickClass: "b-slider-tick"
  },
  tabs: {
    override: true,
    itemTag: "a",
    rootClass: "b-tabs",
    contentClass: "tab-content",
    multilineClass: "is-multiline",
    navTabsClass: (_, { props }) => {
      const classes = ["tabs"];
      if (props.type)
        classes.push(`is-${props.type}`);
      return classes.join(" ");
    },
    expandedClass: "is-fullwidth",
    verticalClass: "is-vertical",
    positionClass: "is-",
    navSizeClass: "is-",
    navPositionClass: "is-",
    transitioningClass: "is-transitioning",
    itemClass: "tab-item",
    itemHeaderActiveClass: () => "is-active",
    itemHeaderDisabledClass: () => "is-disabled"
  },
  table: {
    override: true,
    rootClass: "b-table",
    wrapperClass: "table-wrapper",
    tableClass: "table",
    borderedClass: "is-bordered",
    stripedClass: "is-striped",
    narrowedClass: "is-narrow",
    hoverableClass: "is-hoverable",
    emptyClass: "is-empty",
    detailedClass: "detail",
    footerClass: "table-footer",
    paginationWrapperClass: "level",
    scrollableClass: "table-container",
    trSelectedClass: "is-selected",
    thSortableClass: "is-sortable",
    thCurrentSortClass: "is-current-sort",
    thSortIconClass: "th-wrap sort-icon",
    thUnselectableClass: "is-unselectable",
    thStickyClass: "is-sticky",
    thCheckboxClass: "th-checkbox",
    thDetailedClass: "th-chevron-cell",
    tdDetailedChevronClass: "chevron-cell",
    thPositionClass: (position) => {
      if (position === "centered")
        return "is-centered";
      else if (position === "right")
        return "is-right";
      return;
    },
    tdPositionClass: (position) => {
      if (position === "centered")
        return "has-text-centered";
      else if (position === "right")
        return "has-text-right";
      return;
    },
    mobileClass: "is-mobile",
    mobileSortClass: "table-mobile-sort field"
  },
  tooltip: {
    override: true,
    rootClass: (_, { props }) => {
      const classes = ["b-tooltip"];
      if (props.variant)
        classes.push(`is-${props.variant}`);
      else
        classes.push(`is-primary`);
      if (props.position)
        classes.push(`is-${props.position}`);
      return classes.join(" ");
    },
    contentClass: "tooltip-content",
    triggerClass: "tooltip-trigger",
    alwaysClass: "is-always",
    multilineClass: "is-multiline",
    variantClass: "is-",
    orderClass: "is-"
  },
  steps: {
    override: true,
    rootClass: (_, { props }) => {
      const classes = ["b-steps"];
      if (props.variant)
        classes.push(`is-${props.variant}`);
      if (props.disables)
        classes.push("is-disabled");
      return classes.join(" ");
    },
    stepsClass: (_, { props }) => {
      const classes = ["steps"];
      if (props.animated)
        classes.push("is-animated");
      if (props.rounded)
        classes.push("is-rounded");
      if (props.labelPosition === "left")
        classes.push("has-label-left");
      if (props.labelPosition === "right")
        classes.push("has-label-right");
      return classes.join(" ");
    },
    itemClass: "step-link",
    itemHeaderClass: "step-item",
    itemHeaderVariantClass: "is-",
    itemHeaderActiveClass: "is-active",
    itemHeaderPreviousClass: "is-previous",
    stepLinkClass: "step-link",
    stepLinkLabelClass: "step-title",
    stepLinkClickableClass: "is-clickable",
    stepMarkerClass: "step-marker",
    stepNavigationClass: "step-navigation",
    stepContentClass: "step-content",
    verticalClass: "is-vertical",
    positionClass: "is-",
    stepContentTransitioningClass: "is-transitioning",
    sizeClass: "is-",
    variantClass: "is-"
  },
  button: {
    override: true,
    rootClass: "button",
    sizeClass: "is-",
    variantClass: "is-",
    roundedClass: "is-rounded",
    expandedClass: "is-fullwidth",
    loadingClass: "is-loading",
    outlinedClass: () => "is-outlined",
    invertedClass: () => "is-inverted",
    elementsWrapperClass: "button-wrapper"
  },
  menu: {
    override: true,
    rootClass: "menu",
    listClass: "menu-list",
    listLabelClass: "menu-label"
  },
  skeleton: {
    override: true,
    rootClass: (_, { props }) => {
      const classes = ["b-skeleton"];
      if (props.animated)
        classes.push("is-animated");
      return classes.join(" ");
    },
    itemClass: "b-skeleton-item",
    itemRoundedClass: "is-rounded"
  },
  notification: {
    override: true,
    rootClass: (_, { props }) => {
      const classes = ["notification"];
      if (props.variant)
        classes.push(`is-${props.variant}`);
      return classes.join(" ");
    },
    wrapperClass: "media",
    contentClass: "media-content",
    iconClass: "media-left",
    closeClass: "delete",
    positionClass: "is-",
    noticeClass: "b-notices",
    noticePositionClass: "is-"
  },
  dropdown: {
    override: true,
    itemTag: "a",
    rootClass: (_, { props, data, computed }) => {
      const classes = ["dropdown", "dropdown-menu-animation"];
      if (data.isActive || props.inline)
        classes.push("is-active");
      if (computed.hoverable)
        classes.push("is-hoverable");
      if (props.position)
        classes.push(`is-${props.position}`);
      return classes.join(" ");
    },
    triggerClass: "dropdown-trigger",
    menuClass: "dropdown-content dropdown-menu",
    disabledClass: "is-disabled",
    expandedClass: "is-expanded",
    inlineClass: "is-inline",
    itemClass: "dropdown-item",
    itemActiveClass: "is-active",
    itemDisabledClass: "is-disabled",
    mobileClass: "is-mobile-modal",
    menuMobileOverlayClass: "background"
  },
  datepicker: {
    override: true,
    rootClass: "datepicker",
    headerClass: "datepicker-header",
    footerClass: "datepicker-footer",
    boxClass: "dropdown-item",
    tableClass: "datepicker-table",
    tableHeadClass: "datepicker-header",
    tableHeadCellClass: "datepicker-cell",
    headerButtonsClass: "pagination field is-centered",
    prevBtnClass: "pagination-previous",
    nextBtnClass: "pagination-next",
    listsClass: "pagination-list",
    tableBodyClass: (_, { props }) => {
      const classes = ["datepicker-body"];
      if (props.events)
        classes.push(`has-events`);
      return classes.join(" ");
    },
    tableRowClass: "datepicker-row",
    tableCellClass: "datepicker-cell",
    tableCellSelectableClass: "is-selectable",
    tableCellUnselectableClass: "is-unselectable",
    tableCellTodayClass: "is-today",
    tableCellSelectedClass: "is-selected",
    tableCellWithinHoveredClass: "is-within-hovered",
    tableCellFirstHoveredClass: "is-first-hovered",
    tableCellLastHoveredClass: "is-last-hovered",
    tableCellFirstSelectedClass: "is-first-selected",
    tableCellLastSelectedClass: "is-last-selected",
    tableCellWithinSelectedClass: "is-within-selected",
    tableCellInvisibleClass: "",
    tableCellNearbyClass: "is-nearby",
    tableCellEventsClass: (_, { props }) => {
      const classes = ["has-event"];
      if (props.indicators)
        classes.push(`${props.indicators}`);
      return classes.join(" ");
    },
    tableEventVariantClass: "is-",
    tableEventsClass: "events",
    tableEventClass: "event",
    monthClass: "datepicker-table",
    monthBodyClass: "datepicker-body",
    monthTableClass: "datepicker-months",
    monthCellClass: "datepicker-cell"
  },
  modal: {
    override: true,
    rootClass: (_, { props }) => {
      const classes = ["modal"];
      if (props.active || props.programmatic)
        classes.push("is-active");
      return classes.join(" ");
    },
    overlayClass: "modal-background",
    contentClass: "modal-content animation-content",
    closeClass: "modal-close is-large",
    fullScreenClass: "is-full-screen"
  },
  sidebar: {
    override: true,
    rootClass: "b-sidebar",
    variantClass: "is-",
    contentClass: "sidebar-content",
    staticClass: "is-static",
    absoluteClass: "is-absolute",
    fixedClass: "is-fixed",
    expandOnHoverClass: "is-mini-expand",
    expandOnHoverFixedClass: "is-mini-expand",
    fullheightClass: "is-fullheight",
    fullwidthClass: "is-fullwidth",
    mobileClass: (_, { props }) => {
      if (props.mobile && props.mobile !== "reduce") {
        return `is-${props.mobile}-mobile`;
      }
    },
    overlayClass: "sidebar-background",
    reduceClass: "is-mini-mobile",
    rightClass: "is-right"
  },
  loading: {
    fullPageClass: "is-full-page",
    overlayClass: "loading-overlay",
    iconClass: "icon",
    rootClass: "loading"
  },
  timepicker: {
    override: true,
    rootClass: "timepicker control",
    boxClass: "dropdown-item",
    selectClasses: {
      rootClass: "select control"
    },
    separatorClass: "is-colon control",
    footerClass: "timepicker-footer",
    sizeClass: "is-"
  },
  carousel: {
    override: true,
    rootClass: "carousel",
    overlayClass: "is-overlay",
    sceneClass: "carousel-scene",
    itemsClass: "carousel-items",
    itemsDraggingClass: "is-dragging",
    arrowIconClass: "carousel-arrow",
    arrowIconPrevClass: "has-icons-left",
    arrowIconNextClass: "has-icons-right",
    indicatorsClass: "carousel-indicator",
    indicatorClass: "indicator-item",
    indicatorsInsideClass: "is-inside",
    indicatorsInsidePositionClass: "is-",
    indicatorItemClass: "indicator-style",
    indicatorItemActiveClass: "is-active",
    indicatorItemStyleClass: "is-",
    // CarouselItem
    itemClass: "carousel-item",
    itemActiveClass: "is-active"
  },
  upload: {
    override: true,
    rootClass: "upload control",
    draggableClass: "upload-draggable",
    variantClass: "is-",
    expandedClass: "is-expanded",
    disabledClass: "is-disabled",
    hoveredClass: "is-hovered"
  }
};
export {
  bulmaConfig
};
//# sourceMappingURL=@oruga-ui_theme-bulma.js.map
