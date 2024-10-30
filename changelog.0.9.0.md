TODO: add loading new classes
TODO: compare default class changes
TODO: check dropdown-item / NOtificationNotice description not rendered
TODO: add programamtic usage changes

# Autocomplete

<!> ~ prop: data -> options (type changed)
<!> - prop: field
<!> - prop: formatter
<!> - prop: groupField
<!> - prop: groupOptions
 + prop: filter

 - prop: validationMessage
 + prop: customValidity
 + prop: input (v-model:input)
 
 + event: update:input	
 
 + type: accepts Number
 
# Button

# Carousel

# Checkbox

 - prop: validationMessage
 + prop: customValidity
 + prop: id
 
 
# Collapse


# Datepicker

 - prop: validationMessage
 + prop: customValidity

 <!> ~ prop: dateCreator -> creator
 <!> ~ prop: dateFormatter -> formatter
 <!> ~ prop: dateParser -> parser

# Datetimepicker

 - prop: validationMessage
 + prop: customValidity
 
 <!> ~ prop: datetimeCreator -> creator
 <!> ~ prop: datetimeFormatter -> formatter
 <!> ~ prop: datetimeParser -> parser


# Dropdown

 + prop: desktopModal
 + prop: options
 
# Field 
 
 <!> ~ class: bodyHorizontalClass -> horizontalBodyClass 
 <!> ~ class: labelHorizontalClass -> horizontalLabelClass
 <!> ~ class: variantLabelClass -> labelVariantClass
 <!> ~ class: variantMessageClass -> messageVariantClass
 
# Icon
 
 - prop: customClass (use `class` instead)
 
# Input 
 
 - prop: validationMessage
 + prop: customValidity
 + prop: debounce
 + prop: number
 
 ~ event: input (only emits string values)


# Loading

+ class: noScrollClass
+ class: scrollClipClass

- prop: container (only available in programmatic usage)
<!> - prop: onCancel
<!> - prop: onClose (only available in programmatic usage)


# Menu

# Modal

 - prop: container (only available in programmatic usage)
 <!> - prop: destroyOnHide (no done by default for programmatic usage)
 <!> - prop: onCancel
 <!> - prop: onClose (only available in programmatic usage)
 + prop: overlay
 
 
# Notification
 
 - prop: container (only available in programmatic usage)
 <!> - prop: onCancel
 <!> - prop: onClose (only available in programmatic usage)
 ~ prop: active (is not longer avaible in programmatic usage)
 
# Pagination
 
 
# Radio

 + prop: customValidity (check this!?!?!)
 + prop: id
 
 + type: add type object to modelValue 
 
# Select

 - prop: validationMessage
 + prop: customValidity
 + prop: customValidation (check this!?!?!)
 <!> ~ prop: options (type changed)
 
# Sidebar

 - prop: container (only available in programmatic usage)
 <!> - prop: destroyOnHide (no done by default for programmatic usage)
 <!> - prop: onCancel
 <!> - prop: onClose (only available in programmatic usage)
 - prop: variant
 
# Skeleton


# Slider

 <!> ~ prop: customFormatter -> formatter
 + prop: range

# Steps
 
 + prop: options
 
 + type: remove modelValue type restrictions

 <!> ~ class: itemHeaderClass -> navItemClass
 <!> ~ class: itemHeaderVariantClass -> navItemVariantClass
 <!> ~ class: itemHeaderActiveClass -> navItemActiveClass
 <!> ~ class: itemHeaderPreviousClass -> navItemPreviousClass
 + class: navItemNextClass
 <!> ~ class: stepLinkClass -> stepClass
 <!> ~ class: stepLinkLabelPositionClass -> stepLabelPositionClass
 <!> ~ class: stepLinkClickableClass -> stepClickableClass
 + class: stepActiveClass
 + class: stepDisabledClass
 <!> ~ class: stepLinkLabelClass -> stepLabelClass
 + class: stepIconClass
 <!> ~ class: itemClass -> stepPanelClass
 <!> ~ class: rootClass (default class changed)
 <!> ~ class: verticalClass (default class changed)
 <!> ~ class: positionClass (default class changed)
 <!> ~ class: stepsClass -> navClass
 <!> ~ class: animatedClass (default class changed)
 <!> ~ class: stepDividerClass -> dividerClass
 <!> ~ class: stepMarkerClass -> markerClass
 <!> ~ class: stepMarkerRoundedClass -> markerRoundedClass
 <!> ~ class: stepContentClass -> contentClass
 <!> ~ class: stepContentTransitioningClass -> transitioningClass
 <!> ~ class: stepNavigationClass -> navigationClass


# StepItem

 + prop: disabled
 
# Switch

 + prop: id
 + prop: customValidation (check this
 
 + type: add type object to modelValue 
 
# Table

 ~ prop: column (type changed)
 ~ prop: data (type changed)
 + prop: customCompare
 - prop: customRowKey
 - prop: customIsChecked
 - prop: detailKey
 + props: detailedRows
 + props: emptyIcon
 + props: emptyIconSize
 + props: emptyLabel
 + props: filtersIcon
 + props: filtersPlaceholder
 - props: hasDetailedVisible
 + props: isDetailedVisible
 + props: isRowChecked
 + props: loadingIcon
 + props: loadingLabel
 - props: openedDetailed -> detailedRows
 + props: rowKey
 - props: rowClass
 + props: selectable
 + props: tdAttrs
 + props: thAttrs
 
 ~ event: update:openedDetailed -> update:detailedRows	
 
 + slots: before
 + slots: after
 
# TableColumn

 + props: formatter
 
 ~ types: better type slots
 
# Tabs

 <!> ~ class: itemWrapperClass -> navClass (check - weg?!?!)
 <!> ~ class: itemClass -> tabPanelClass
 <!> ~ class: itemHeaderActiveClass -> tabActiveClass
 <!> ~ class: itemHeaderClass -> tabClass
 <!> ~ class: itemHeaderDisabledClass -> tabDisabledClass
 <!> ~ class: itemHeaderIconClass -> tabIconClass
 <!> ~ class: itemHeaderTextClass -> tabLabelClass
 <!> ~ class: itemHeaderTypeClass -> tabTypeClass
 <!> ~ class: tabTextClass -> tabLabelClass
 + class: navItemActiveClass
 + class: navItemPreviousClass
 + class: navItemNextClass
 
 + props: options
 
 + type: remove modelValue type restrictions
 
# Taginput

 - prop: validationMessage
 + prop: customValidity
 
 - props: allowAutocomplete
 <!> ~ props: beforeAdding -> validateItem
 <!> ~ props: data -> options (type changed)
 - prop: field
 - prop: groupField
 - prop: groupOptions
 + prop: filter
 + prop: input (v-model:input)
 
 + event: update:input
 
# Timepicker

 - prop: validationMessage
 + prop: customValidity
 
 <!> ~ prop: timeCreator -> creator
 <!> ~ prop: timeFormatter -> formatter
 <!> ~ prop: timeParser -> parser
 
# Tooltip

 - prop: validationMessage
 + prop: customValidity