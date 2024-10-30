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

 <!> ~ programmatic: interface changed 

# Menu

---

# Modal

 - prop: container (only available in programmatic usage)
 <!> - prop: destroyOnHide (no done by default for programmatic usage)
 <!> - prop: onCancel
 <!> - prop: onClose (only available in programmatic usage)
 + prop: overlay

 <!> ~ programmatic: interface changed
 
# Notification
 
 ~ prop: active (is not longer avaible in programmatic usage)
 - prop: container (only available in programmatic usage)
 <!> - prop: onCancel
 <!> - prop: onClose (only available in programmatic usage)
 
 <!> ~ programmatic: interface changed

# Pagination

 <!> ~ class: linkClass -> buttonClass 
 <!> ~ class: linkCurrentClass -> buttonCurrentClass 
 <!> ~ class: linkDisabledClass -> buttonDisabledClass 
 <!> ~ class: prevButtonClass -> buttonPrevClass 
 <!> ~ class: nextButtonClass -> buttonNextClass 
 
# Radio

 + prop: id
 + prop: customValidity
 
 + type: remove modelValue type restrictions
 
# Select

 <!> ~ prop: options (type changed)
 - prop: validationMessage
 + prop: customValidity
 
# Sidebar

 - prop: variant
 - prop: container (only available in programmatic usage)
 <!> - prop: destroyOnHide (no done by default for programmatic usage)
 <!> - prop: onCancel
 <!> - prop: onClose (only available in programmatic usage)
 
 <!> ~ programmatic: interface changed

# Skeleton

---

# Slider

 + prop: range
 <!> ~ prop: customFormatter -> formatter

# Steps
 
 + prop: options
 
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
 <!> ~ class: animatedClass (default class changed)
 <!> ~ class: stepsClass -> navClass
 <!> ~ class: stepDividerClass -> dividerClass
 <!> ~ class: stepMarkerClass -> markerClass
 <!> ~ class: stepMarkerRoundedClass -> markerRoundedClass
 <!> ~ class: stepContentClass -> contentClass
 <!> ~ class: stepContentTransitioningClass -> transitioningClass
 <!> ~ class: stepNavigationClass -> navigationClass

 + type: remove modelValue type restrictions

# StepItem

 + prop: disabled
 
# Switch

 + prop: id
 + prop: customValidity
 
 + type: remove modelValue type restrictions
 
# Table

 <!> ~ prop: column (type changed)
 + prop: customCompare
 <!> ~ prop: customRowKey -> rowKey
 <!> ~ prop: customIsChecked -> isRowChecked (to match other props name pattern)
 <!> ~ props: hasDetailedVisible -> isDetailedVisible (to match other props name pattern)
 - prop: detailKey (use rowKey instead)
 + props: emptyIcon
 + props: emptyIconSize
 + props: emptyLabel
 + props: filtersIcon
 + props: filtersPlaceholder
 + props: loadingIcon
 + props: loadingLabel
 <!> ~ props: openedDetailed -> detailedRows (to match props name pattern)
 + props: selectable
 + props: tdAttrs
 + props: thAttrs
 
 ~ event: update:openedDetailed -> update:detailedRows	
 
 + slots: before
 + slots: after
 
# TableColumn

 + props: formatter
 
 ~ types: improve slots type
 
# Tabs

 <!> ~ class: navTabsClass -> navClass
 <!> ~ class: itemWrapperClass -> navItemClass
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

 + prop: input (v-model:input)
 - props: allowAutocomplete 
 <!> ~ props: data -> options (type changed)
 <!> - prop: field (replaced by strict options type)
 <!> - prop: groupField (replaced by strict options type)
 <!> - prop: groupOptions (replaced by strict options type)
 <!> ~ props: beforeAdding -> validateItem
 + prop: filter
 - prop: validationMessage
 + prop: customValidity
 
 + event: update:input
 
# Timepicker

 <!> ~ prop: timeCreator -> creator
 <!> ~ prop: timeFormatter -> formatter
 <!> ~ prop: timeParser -> parser
 - prop: validationMessage
 + prop: customValidity
 
# Tooltip

 - prop: validationMessage
 + prop: customValidity

# Upload 

---
