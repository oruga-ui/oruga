TODO: add loading new classes
TODO: compare default class changes
TODO: check dropdown-item / NOtificationNotice description not rendered
TODO: add programamtic usage changes

# Autocomplete

 <!> ~ prop: data -> options (type changed)
 <!> - prop: field (replaced by strict options type)
 <!> - prop: formatter (replaced by strict options type)
 <!> - prop: groupField (replaced by strict options type)
 <!> - prop: groupOptions (replaced by strict options type)
 + prop: input (v-model:input)
 + prop: filter
 - prop: validationMessage
 + prop: customValidity
 
 + event: update:input	

 + type: remove modelValue type restrictions
 
# Button

 <!> ~ prop: nativeType -> type (to match same props from other component)
 <!> ~ prop: role -> ariaRole (to match same props from other component)


# Carousel

---

# Checkbox

 + prop: id
 - prop: validationMessage
 + prop: customValidity
 
 + type: remove modelValue type restrictions
 
# Collapse

---

# Datepicker

 <!> ~ prop: dateCreator -> creator
 <!> ~ prop: dateFormatter -> formatter
 <!> ~ prop: dateParser -> parser
 - prop: validationMessage
 + prop: customValidity

# Datetimepicker

 <!> ~ prop: datetimeCreator -> creator
 <!> ~ prop: datetimeFormatter -> formatter
 <!> ~ prop: datetimeParser -> parser
 - prop: validationMessage
 + prop: customValidity

# Dropdown

 + prop: options
 + prop: desktopModal
 
 <!> ~ class: menuMobileOverlayClass -> overlayClass
 + class: modalClass
 + class: scrollClipClass
 + class: noScrollClass

 + type: remove modelValue type restrictions

# Field 
 
 <!> ~ class: bodyHorizontalClass -> horizontalBodyClass 
 <!> ~ class: labelHorizontalClass -> horizontalLabelClass
 <!> ~ class: variantLabelClass -> labelVariantClass
 <!> ~ class: variantMessageClass -> messageVariantClass
 
# Icon

---

# Input 
 
 + prop: debounce
 + prop: number
 - prop: validationMessage
 + prop: customValidity
 
 ~ event: input (only emits string values)

# Loading

- prop: container (only available in programmatic usage)
<!> - prop: onCancel
<!> - prop: onClose (only available in programmatic usage)

+ class: noScrollClass
+ class: scrollClipClass

# Menu

---

# Modal

 - prop: container (only available in programmatic usage)
 <!> - prop: destroyOnHide (no done by default for programmatic usage)
 <!> - prop: onCancel
 <!> - prop: onClose (only available in programmatic usage)
 + prop: overlay
 
# Notification
 
 ~ prop: active (is not longer avaible in programmatic usage)
 - prop: container (only available in programmatic usage)
 <!> - prop: onCancel
 <!> - prop: onClose (only available in programmatic usage)
 
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