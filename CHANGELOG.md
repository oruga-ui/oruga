# [0.10.0-pre.1](https://github.com/oruga-ui/oruga/compare/v0.9.3...v0.10.0-pre.1) (2025-02-21)


### Bug Fixes

* **checkbox|radio|switch:** correct labelId formula issues with label slot ([#1166](https://github.com/oruga-ui/oruga/issues/1166)) ([4e00a9e](https://github.com/oruga-ui/oruga/commit/4e00a9e4834060b1c0a3aa3a86e18adbed15e259))
* **datepicker:** make table and month class props reactive ([#1195](https://github.com/oruga-ui/oruga/issues/1195)) ([47e526a](https://github.com/oruga-ui/oruga/commit/47e526a1e0c5ac5284cb428ee24035ec3f7e49a0))
* solve several a11y issues ([#1184](https://github.com/oruga-ui/oruga/issues/1184)) ([bdabeb6](https://github.com/oruga-ui/oruga/commit/bdabeb6ca8e83e66891308295b93245a3337d6dc))
* **table:** prevent table paginate unsafe property inheritance ([#1162](https://github.com/oruga-ui/oruga/issues/1162)) ([e0d17c6](https://github.com/oruga-ui/oruga/commit/e0d17c6318942c2f8244f59b845a5d5dd2f63e0a))
* **table:** solve a table columns ordering problem ([#1171](https://github.com/oruga-ui/oruga/issues/1171)) ([ccae595](https://github.com/oruga-ui/oruga/commit/ccae5953d382df0fc2b633e33f3556622729d655))
* **tabs|steps:** replace falsly check with nullish check for default `value` prop ([#1173](https://github.com/oruga-ui/oruga/issues/1173)) ([eecd0c3](https://github.com/oruga-ui/oruga/commit/eecd0c39be6f4cc6d2af9f72332629f3a7badd5e))
* **taginput:** prevent item removing when is `disabled` ([#1177](https://github.com/oruga-ui/oruga/issues/1177)) ([b17edb6](https://github.com/oruga-ui/oruga/commit/b17edb68c76790e567e0721e9fbda8a5ff7846e8))
* **tooltip:** make `arrowVariantClass` class available ([#1198](https://github.com/oruga-ui/oruga/issues/1198)) ([58a4002](https://github.com/oruga-ui/oruga/commit/58a4002917a38d67f4edcb3f75197279e0f89af4))


### Features

* **autocomplete:** add `v-model:active` prop ([#1193](https://github.com/oruga-ui/oruga/issues/1193)) ([7f2871c](https://github.com/oruga-ui/oruga/commit/7f2871ce93d242d557f503077e1cdcc6566ea3ef))
* **button:** support w3c WAI-ARIA pattern ([#1185](https://github.com/oruga-ui/oruga/issues/1185)) ([205e502](https://github.com/oruga-ui/oruga/commit/205e502784c0296cccf106fc3016aba89e9c1f35))
* **carousel:** support w3c WAI-ARIA pattern ([#1180](https://github.com/oruga-ui/oruga/issues/1180)) ([bab6b37](https://github.com/oruga-ui/oruga/commit/bab6b37c69b947ee3d8a69fe70033fe448136e32))
* **collapse:** add `expanded` prop ([#1194](https://github.com/oruga-ui/oruga/issues/1194)) ([6ead0ac](https://github.com/oruga-ui/oruga/commit/6ead0ac6c0047127819e1f7ee9b2fa0e9ed15731))
* **collapse:** support w3c WAI-ARIA pattern ([#1186](https://github.com/oruga-ui/oruga/issues/1186)) ([5d60eed](https://github.com/oruga-ui/oruga/commit/5d60eedfd69cd7eb13e52fe0ae6f29e3455d1ee0))
* **dropdown:** add `closeOnScroll` feature ([bde7ab1](https://github.com/oruga-ui/oruga/commit/bde7ab18a6bcd6dd87bf1455a8732b5de694bf55))
* **dropdown:** apply w3c WAI-ARIA (a11y) pattern ([#1143](https://github.com/oruga-ui/oruga/issues/1143)) ([b1db037](https://github.com/oruga-ui/oruga/commit/b1db03712c20710a237f81f643677e6bb729e337))
* **dropdown:** make `closeOnOutside`, `selectOnFocus` and `selectOnClose` configurable ([#1182](https://github.com/oruga-ui/oruga/issues/1182)) ([8e235f3](https://github.com/oruga-ui/oruga/commit/8e235f336f5ee2615a7b578f9aba252452920b43))
* **field:** change prop `groupMultiline` to `multiline` ([#1200](https://github.com/oruga-ui/oruga/issues/1200)) ([3b36782](https://github.com/oruga-ui/oruga/commit/3b367826da8218ed70b249451af2f689b11f273c))
* **menu:** support w3c WAI-ARIA pattern | add `options` prop ([#1154](https://github.com/oruga-ui/oruga/issues/1154)) ([b07cc5a](https://github.com/oruga-ui/oruga/commit/b07cc5a4a962c2afb0c9ee737d385d90b3a77451))
* **programmatic:** add programmatic instance `count()` function ([#1161](https://github.com/oruga-ui/oruga/issues/1161)) ([c9b7e25](https://github.com/oruga-ui/oruga/commit/c9b7e257bd03c0f38a799278ba344522e59916b7))
* **programmatic:** make programmatic components devtools compatible ([#1175](https://github.com/oruga-ui/oruga/issues/1175)) ([40dd968](https://github.com/oruga-ui/oruga/commit/40dd9681705e29128135f3c341bcf279c1ae502f))
* **skeleton:** rename classes to match pattern ([#1196](https://github.com/oruga-ui/oruga/issues/1196)) ([9bf2b34](https://github.com/oruga-ui/oruga/commit/9bf2b348ac01a8d41ca4bf6ff5378108d60afbeb))
* **slider:** add slider thumb aria-labelledby connection to the field wrapper ([#1165](https://github.com/oruga-ui/oruga/issues/1165)) ([86d1d7e](https://github.com/oruga-ui/oruga/commit/86d1d7e7339fd5f57746eaaf657c2d7257a82266))
* **steps/tabs:** remove prop `destroyOnHide` ([#1138](https://github.com/oruga-ui/oruga/issues/1138)) ([ce11b3e](https://github.com/oruga-ui/oruga/commit/ce11b3e540e0a9b2d426d9fa2680386bb7eb709a))
* **steps:** support w3c WAI-ARIA pattern ([#1183](https://github.com/oruga-ui/oruga/issues/1183)) ([c0f9c9f](https://github.com/oruga-ui/oruga/commit/c0f9c9f5147ba6886e7764d72404be8a62a9da5f))
* **table:** rename prop `debounceSearch` to `filterDebounce` to match other props ([#1176](https://github.com/oruga-ui/oruga/issues/1176)) ([ceb15e8](https://github.com/oruga-ui/oruga/commit/ceb15e88bca6c80085ee6498b36b4fdb18167210))
* **table:** rename prop `headerCheckable` to `checkableHeader` to match other props ([dac6748](https://github.com/oruga-ui/oruga/commit/dac6748f358f9f8d5935d90f6f8ea0b69e18ee63))
* **table:** rename prop `headerCheckable` to `checkableHeader` to match other props ([#1178](https://github.com/oruga-ui/oruga/issues/1178)) ([a8324c9](https://github.com/oruga-ui/oruga/commit/a8324c9388863537f9f22b5e939fc194cbf8ceef))
* **table:** support w3c WAI-ARIA (a11y) pattern ([#1135](https://github.com/oruga-ui/oruga/issues/1135)) ([ee8c00e](https://github.com/oruga-ui/oruga/commit/ee8c00e04e1c58d70f607ccd8c7fb86ea2cddc88))
* **tabs:** support w3c WAI-ARIA pattern ([#1170](https://github.com/oruga-ui/oruga/issues/1170)) ([2f55c88](https://github.com/oruga-ui/oruga/commit/2f55c883bebd557bddab4ad43798f6f69c2aaef6))
* **tabs:** update tab html structure and classes  ([#1120](https://github.com/oruga-ui/oruga/issues/1120)) ([72662d3](https://github.com/oruga-ui/oruga/commit/72662d34ab6147b100bd11ca3819221c705aa1a4))
* **taginput:** move variant and size class to root element ([#1197](https://github.com/oruga-ui/oruga/issues/1197)) ([aef344b](https://github.com/oruga-ui/oruga/commit/aef344be5d82240b9fc437e98b49c95f2b323eba))
* **tooltip:** support w3c WAI-ARIA pattern ([#1146](https://github.com/oruga-ui/oruga/issues/1146)) ([8e87a15](https://github.com/oruga-ui/oruga/commit/8e87a152642d12b21388e4ee6ad8e51015d0d80d))
* unify HTML input based component classes ([#1201](https://github.com/oruga-ui/oruga/issues/1201)) ([f96628f](https://github.com/oruga-ui/oruga/commit/f96628f96635d9c2f52259c4173251d219d45d62))


### Detailed Changes
_following with the main release..._


## [0.9.3](https://github.com/oruga-ui/oruga/compare/v0.9.2...v0.9.3) (2024-12-19)


### Bug Fixes

* **autocomplete:** solve input does not get cleared ([#1151](https://github.com/oruga-ui/oruga/issues/1151)) ([f0eccaf](https://github.com/oruga-ui/oruga/commit/f0eccafda6e79f71b21f25ae9b13fc824a494ccd))
* **input:** solve prop `number` declaration issue ([#1150](https://github.com/oruga-ui/oruga/issues/1150)) ([123dc6f](https://github.com/oruga-ui/oruga/commit/123dc6f55f09798a531ec732ea06639a71caa71d))
* **table:** solve `mobileClass` trigger issue ([#1153](https://github.com/oruga-ui/oruga/issues/1153)) ([226f19b](https://github.com/oruga-ui/oruga/commit/226f19b43f5138fc6b56dae2808d5764b5f86b5c))



## [0.9.2](https://github.com/oruga-ui/oruga/compare/v0.9.1...v0.9.2) (2024-12-02)


### Bug Fixes

* change `crypto.randomUUID()` with a sequential id generation ([#1137](https://github.com/oruga-ui/oruga/issues/1137)) ([52d3ea5](https://github.com/oruga-ui/oruga/commit/52d3ea56155a11a8f2e710d7b0db34db992cfc45))
* **performance:** solve performance issues with child component registration ([#1133](https://github.com/oruga-ui/oruga/issues/1133)) ([d560007](https://github.com/oruga-ui/oruga/commit/d56000723628f22cf69bd766bedf348d85003e5e))
* **programmatic:** make options interface extandable ([#1118](https://github.com/oruga-ui/oruga/issues/1118)) ([37e17f5](https://github.com/oruga-ui/oruga/commit/37e17f5db2c72e6e62284b0cf0d07179965e8403))
* **notification:** solve typo in `NotificationProgrammaticOptions` type ([#1117](https://github.com/oruga-ui/oruga/issues/1117)) ([16cf988](https://github.com/oruga-ui/oruga/commit/16cf988c5a633845153f2d089bfdefb97ae0abde))
* **tabs:** set fixed `role` attribute values for Tab and TabItem ([#1119](https://github.com/oruga-ui/oruga/issues/1119)) ([c1afcf3](https://github.com/oruga-ui/oruga/commit/c1afcf30529287ff4a72d47fe0be0caf168758f8))


### Features

* **checkbox:** support w3c WAI-ARIA (a11y) pattern ([#1130](https://github.com/oruga-ui/oruga/issues/1130)) ([6d189fe](https://github.com/oruga-ui/oruga/commit/6d189feee88fdfd32d45654797d5d0be2b9a8618))
* **field:** add unique label Id to field injection ([#1129](https://github.com/oruga-ui/oruga/issues/1129)) ([1561718](https://github.com/oruga-ui/oruga/commit/15617181817f9283aabb9550436f883bd3e1c743))
* **radio:** support w3c WAI-ARIA (a11y) pattern ([#1132](https://github.com/oruga-ui/oruga/issues/1132)) ([96255a8](https://github.com/oruga-ui/oruga/commit/96255a8682621e2b11901eeba179e5d10f9c6845))
* **switch:** support w3c WAI-ARIA (a11y) pattern ([#1131](https://github.com/oruga-ui/oruga/issues/1131)) ([60ec0d1](https://github.com/oruga-ui/oruga/commit/60ec0d112310bb38c8e1e1dad1174b5253022833))
* **tabs:** update keyboard navigation to match W3C WAI standart ([#1121](https://github.com/oruga-ui/oruga/issues/1121)) ([58583a3](https://github.com/oruga-ui/oruga/commit/58583a301f052a9c87ad5234f61809bba317b45d))



## [0.9.1](https://github.com/oruga-ui/oruga/compare/v0.9.0...v0.9.1) (2024-11-15)


### Bug Fixes

* **dropdown:** solve closing issue when has `multiple` prop ([#1109](https://github.com/oruga-ui/oruga/issues/1109)) ([5443ec2](https://github.com/oruga-ui/oruga/commit/5443ec2547494657f6599e69258003454bca5c9f))
* **programmatic:** readd `OrugaProgrammatic` interface to the export ([#1110](https://github.com/oruga-ui/oruga/issues/1110)) ([44c7075](https://github.com/oruga-ui/oruga/commit/44c70754a2c755045c36e6d8671c6791b9a861b3))
* **programmatic:** solve wrong `events` prop type ([#1114](https://github.com/oruga-ui/oruga/issues/1114)) ([0271e7e](https://github.com/oruga-ui/oruga/commit/0271e7e21ca962f02aa8a8d202a1c735a945bb34))
* **table:** remove generic type strictness ([#1107](https://github.com/oruga-ui/oruga/issues/1107)) ([4592a9d](https://github.com/oruga-ui/oruga/commit/4592a9d7f66eac56ec76aebfc52f2944ec1fa6bb))



# [0.9.0](https://github.com/oruga-ui/oruga/compare/v0.9.0-pre.5...v0.9.0) (2024-11-11)

These Changes are accumulated from all pre-releases.


### Detailed Changes


Legend:
* ⚠️: breaking change
* `~` : changed
* `-` : removed
* `+` : added
* A -> B : renamed


#### Autocomplete

*  ⚠️ `~` prop: data -> options (type changed)
*  ⚠️ `-` prop: field (replaced by strict options type)
*  ⚠️ `-` prop: formatter (replaced by strict options type)
*  ⚠️ `-` prop: groupField (replaced by strict options type)
*  ⚠️ `-` prop: groupOptions (replaced by strict options type)
*  `+` prop: input (v-model:input)
*  `+` prop: filter
*  `-` prop: validationMessage
*  `+` prop: customValidity
 
*  `+` event: update:input	

*  `+` type: remove modelValue type restrictions
 
#### Button

*  ⚠️ `~` prop: nativeType -> type (to match same props from other component)
*  ⚠️ `~` prop: role -> ariaRole (to match same props from other component)

#### Carousel

--

#### Checkbox

*  `+` prop: id
*  `-` prop: validationMessage
*  `+` prop: customValidity
 
*  `+` type: remove modelValue type restrictions
 
#### Collapse

--

#### Datepicker

*  ⚠️ `~` prop: dateCreator -> creator
*  ⚠️ `~` prop: dateFormatter -> formatter
*  ⚠️ `~` prop: dateParser -> parser
*  `-` prop: validationMessage
*  `+` prop: customValidity

#### Datetimepicker

*  ⚠️ `~` prop: datetimeCreator -> creator
*  ⚠️ `~` prop: datetimeFormatter -> formatter
*  ⚠️ `~` prop: datetimeParser -> parser
*  `-` prop: validationMessage
*  `+` prop: customValidity

#### Dropdown

*  `+` prop: options
*  `+` prop: desktopModal
 
*  ⚠️ `~` class: menuMobileOverlayClass -> overlayClass
*  `+` class: modalClass
*  `+` class: scrollClipClass
*  `+` class: noScrollClass

*  `+` type: remove modelValue type restrictions

#### Field 
 
*  ⚠️ `~` class: bodyHorizontalClass -> horizontalBodyClass 
*  ⚠️ `~` class: labelHorizontalClass -> horizontalLabelClass
*  ⚠️ `~` class: variantLabelClass -> labelVariantClass
*  ⚠️ `~` class: variantMessageClass -> messageVariantClass
 
#### Icon

--

#### Input 
 
*  `+` prop: debounce
*  `+` prop: number
*  `-` prop: validationMessage
*  `+` prop: customValidity
 
*  `~` event: input (only emits string values)

#### Loading

*  `-` prop: container (only available in programmatic usage)
*  ⚠️ `-` prop: onCancel
*  ⚠️ `-` prop: onClose (only available in programmatic usage)

*  `+` class: noScrollClass
*  `+` class: scrollClipClass

*  ⚠️ `~` programmatic: interface changed 

#### Menu

*  ⚠️ `~` class: itemWrapperClass -> itemClass
*  ⚠️ `~` class: itemClass -> itemButtonClass
*  ⚠️ `~` class: itemActiveClass -> itemButtonActiveClass
*  ⚠️ `~` class: itemDisabledClass -> itemButtonDisabledClass
*  ⚠️ `~` class: itemIconTextClass -> itemButtonIconClass

#### Modal

*  `-` prop: container (only available in programmatic usage)
*  ⚠️ `-` prop: destroyOnHide (no done by default for programmatic usage)
*  ⚠️ `-` prop: onCancel
*  ⚠️ `-` prop: onClose (only available in programmatic usage)
*  `+` prop: overlay

*  ⚠️ `~` programmatic: interface changed
 
#### Notification
 
*  `~` prop: active (is not longer avaible in programmatic usage)
*  `-` prop: container (only available in programmatic usage)
*  ⚠️ `-` prop: onCancel
*  ⚠️ `-` prop: onClose (only available in programmatic usage)
 
*  ⚠️ `~` programmatic: interface changed

#### Pagination

*  ⚠️ `~` class: linkClass -> buttonClass 
*  ⚠️ `~` class: linkCurrentClass -> buttonCurrentClass 
*  ⚠️ `~` class: linkDisabledClass -> buttonDisabledClass 
*  ⚠️ `~` class: prevButtonClass -> buttonPrevClass 
*  ⚠️ `~` class: nextButtonClass -> buttonNextClass 
 
#### Radio

*  `+` prop: id
*  `+` prop: customValidity
 
*  `+` type: remove modelValue type restrictions
 
#### Select

*  ⚠️ `~` prop: options (type changed)
*  `-` prop: validationMessage
*  `+` prop: customValidity
 
#### Sidebar

*  `~` prop: mobile (variable changed from `fullwitdh` to `expanded`)
*  `-` prop: variant
*  `-` prop: container (only available in programmatic usage)
*  ⚠️ `-` prop: destroyOnHide (no done by default for programmatic usage)
*  ⚠️ `-` prop: onCancel
*  ⚠️ `-` prop: onClose (only available in programmatic usage)
 
*  ⚠️ `~` programmatic: interface changed

#### Skeleton

--

#### Slider

*  `+` prop: range
*  ⚠️ `~` prop: customFormatter -> formatter

#### Steps
 
*  `+` prop: options
 
*  ⚠️ `~` class: itemHeaderClass -> navItemClass
*  ⚠️ `~` class: itemHeaderVariantClass -> navItemVariantClass
*  ⚠️ `~` class: itemHeaderActiveClass -> navItemActiveClass
*  ⚠️ `~` class: itemHeaderPreviousClass -> navItemPreviousClass
*  `+` class: navItemNextClass
*  ⚠️ `~` class: stepLinkClass -> stepClass
*  ⚠️ `~` class: stepLinkLabelPositionClass -> stepLabelPositionClass
*  ⚠️ `~` class: stepLinkClickableClass -> stepClickableClass
*  `+` class: stepActiveClass
*  `+` class: stepDisabledClass
*  ⚠️ `~` class: stepLinkLabelClass -> stepLabelClass
*  `+` class: stepIconClass
*  ⚠️ `~` class: itemClass -> stepPanelClass
*  ⚠️ `~` class: rootClass (default class changed)
*  ⚠️ `~` class: expandedClass (default class changed)
*  ⚠️ `~` class: verticalClass (default class changed)
*  ⚠️ `~` class: positionClass (default class changed)
*  ⚠️ `~` class: animatedClass (default class changed)
*  ⚠️ `~` class: stepsClass -> navClass
*  ⚠️ `~` class: stepDividerClass -> dividerClass
*  ⚠️ `~` class: stepMarkerClass -> markerClass
*  ⚠️ `~` class: stepMarkerRoundedClass -> markerRoundedClass
*  ⚠️ `~` class: stepContentClass -> contentClass
*  ⚠️ `~` class: stepContentTransitioningClass -> transitioningClass
*  ⚠️ `~` class: stepNavigationClass -> navigationClass

*  `+` type: remove modelValue type restrictions

#### StepItem

*  `+` prop: disabled
 
#### Switch

*  `+` prop: id
*  `+` prop: customValidity
 
*  `+` type: remove modelValue type restrictions
 
#### Table

*  ⚠️ `~` prop: column (type changed)
*  `+` prop: customCompare
*  ⚠️ `~` prop: customRowKey -> rowKey
*  ⚠️ `~` prop: customIsChecked -> isRowChecked (to match other props name pattern)
*  ⚠️ `~` props: hasDetailedVisible -> isDetailedVisible (to match other props name pattern)
*  `-` prop: detailKey (use rowKey instead)
*  `+` props: emptyIcon
*  `+` props: emptyIconSize
*  `+` props: emptyLabel
*  `+` props: filtersIcon
*  `+` props: filtersPlaceholder
*  `+` props: loadingIcon
*  `+` props: loadingLabel
*  ⚠️ `~` props: openedDetailed -> detailedRows (to match props name pattern)
*  `+` props: selectable
*  `+` props: tdAttrs
*  `+` props: thAttrs
 
*  `~` event: update:openedDetailed -> update:detailedRows	
 
*  `+` slots: before
*  `+` slots: after
 
#### TableColumn

*  `+` props: formatter
 
*  `~` types: improve slots type
 
#### Tabs

*  ⚠️ `~` class: navTabsClass -> navClass
*  ⚠️ `~` class: itemWrapperClass -> navItemClass
*  ⚠️ `~` class: itemClass -> tabPanelClass
*  ⚠️ `~` class: itemHeaderActiveClass -> tabActiveClass
*  ⚠️ `~` class: itemHeaderClass -> tabClass
*  ⚠️ `~` class: itemHeaderDisabledClass -> tabDisabledClass
*  ⚠️ `~` class: itemHeaderIconClass -> tabIconClass
*  ⚠️ `~` class: itemHeaderTextClass -> tabLabelClass
*  ⚠️ `~` class: itemHeaderTypeClass -> tabTypeClass
*  ⚠️ `~` class: tabTextClass -> tabLabelClass
*  `+` class: navItemActiveClass
*  `+` class: navItemPreviousClass
*  `+` class: navItemNextClass
 
*  `+` props: options
 
*  `+` type: remove modelValue type restrictions
 
#### Taginput

*  `+` prop: input (v-model:input)
*  `-` props: allowAutocomplete 
*  ⚠️ `~` props: data -> options (type changed)
*  ⚠️ `-` prop: field (replaced by strict options type)
*  ⚠️ `-` prop: groupField (replaced by strict options type)
*  ⚠️ `-` prop: groupOptions (replaced by strict options type)
*  ⚠️ `~` props: beforeAdding -> validateItem
*  `+` prop: filter
*  `-` prop: validationMessage
*  `+` prop: customValidity
 
*  `+` event: update:input
 
#### Timepicker

*  ⚠️ `~` prop: timeCreator -> creator
*  ⚠️ `~` prop: timeFormatter -> formatter
*  ⚠️ `~` prop: timeParser -> parser
*  `-` prop: validationMessage
*  `+` prop: customValidity
 
#### Tooltip

*  `-` prop: validationMessage
*  `+` prop: customValidity

#### Upload 

--



# [0.9.0-pre.5](https://github.com/oruga-ui/oruga/compare/v0.9.0-pre.5...v0.9.0-pre.4) (2024-11-11)


### Bug Fixes

* **datepicker:** add missing scope to defineClasses ([#1091](https://github.com/oruga-ui/oruga/issues/1091)) ([277c2e0](https://github.com/oruga-ui/oruga/commit/277c2e052866147963a6c0392fca3c70f5332eaf))
* solve various issues ([#1100](https://github.com/oruga-ui/oruga/issues/1100)) ([d6b792f](https://github.com/oruga-ui/oruga/commit/d6b792f0850d59ea85857c8ff7a9e4db570d134a))


### Features

* **input:** move the left icon element before the input element ([#1094](https://github.com/oruga-ui/oruga/issues/1094)) ([7bf11e2](https://github.com/oruga-ui/oruga/commit/7bf11e223e24357f63ca00016fea307303acb1ce))
* **menu:** refactor class names to match other components class name patterns ([#1097](https://github.com/oruga-ui/oruga/issues/1097)) ([f3ce20a](https://github.com/oruga-ui/oruga/commit/f3ce20a001a071ff9e89eac1e071367fe72dbf27))


### Detailed Changes

*following with the main release...*



# [0.9.0-pre.4](https://github.com/oruga-ui/oruga/compare/v0.9.0-pre.3...v0.9.0-pre.4) (2024-10-30)


### Features

* **button:** props name adjustment ([#1088](https://github.com/oruga-ui/oruga/issues/1088)) ([1296348](https://github.com/oruga-ui/oruga/commit/1296348514847ae3ff6ca46fbd03a59233bdc067))
* **dropdown:** add `toggle` prop to `trigger` slot ([#1086](https://github.com/oruga-ui/oruga/issues/1086)) ([c9b51f3](https://github.com/oruga-ui/oruga/commit/c9b51f3aec79454d33268ea979c262429190b5f1))
* **pagination:** adjust class names to match other components class patterns ([#1087](https://github.com/oruga-ui/oruga/issues/1087)) ([54c3706](https://github.com/oruga-ui/oruga/commit/54c37068a2e14ae50a057abbce1c117723720c50))
* **steps:** adjust class names to match other components class patterns ([#1084](https://github.com/oruga-ui/oruga/issues/1084)) ([6466757](https://github.com/oruga-ui/oruga/commit/6466757509443750c0f6a41adf64f4ed3e92da3c))


### Detailed Changes

*following with the main release...*



# [0.9.0-pre.3](https://github.com/oruga-ui/oruga/compare/v0.9.0-pre.2...v0.9.0-pre.3) (2024-10-25)


### Bug Fixes

* **1038:** add `vue-component-type-helpers` as dependency ([#1054](https://github.com/oruga-ui/oruga/issues/1054)) ([33c0309](https://github.com/oruga-ui/oruga/commit/33c0309af7a9a76c1f5c7635bb45ea3e465548fb))
* **a11y:** remove unnecessary `aria-hidden="true"` on  overlays ([#1059](https://github.com/oruga-ui/oruga/issues/1059)) ([f831f7f](https://github.com/oruga-ui/oruga/commit/f831f7f518a6d4391858a18b91b495460806b1e1))
* **hydration:** replace custom `uuid` with vues native `useId` composable ([#1053](https://github.com/oruga-ui/oruga/issues/1053)) ([d7091ff](https://github.com/oruga-ui/oruga/commit/d7091ff63157b264918755be579d237f461b91b7))
* **performance:** resolve a memory leak in `defineClasses` with wrong/missing effectScope ([#1067](https://github.com/oruga-ui/oruga/issues/1067)) ([a1f53c2](https://github.com/oruga-ui/oruga/commit/a1f53c2c2c223be5fef12312594ed1fb75ce3093))
* **types:** solve a type generation problems ([#1072](https://github.com/oruga-ui/oruga/issues/1072)) ([54f1409](https://github.com/oruga-ui/oruga/commit/54f1409a7ba09ef3136d7ccc8881bb5997696c07))


### Features

* **1008:** unify component options/items definiton ([#1065](https://github.com/oruga-ui/oruga/issues/1065)) ([16dfd09](https://github.com/oruga-ui/oruga/commit/16dfd098cd34c2b1c5b6e1886c1ca44d3ba3bdec))
* **a11y:** solve accessibility issues ([#1061](https://github.com/oruga-ui/oruga/issues/1061)) ([3615594](https://github.com/oruga-ui/oruga/commit/3615594f787ee0bd32271eeb2203f04c9f556bfa))
* **dropdown:** add `modalDesktop` property ([#1064](https://github.com/oruga-ui/oruga/issues/1064)) ([4819fb7](https://github.com/oruga-ui/oruga/commit/4819fb70ab39a54b535e6af0a006e44b3a884fe9))
* **field:** rename class names to match existing class name patterns ([#1047](https://github.com/oruga-ui/oruga/issues/1047)) ([a2e9b8a](https://github.com/oruga-ui/oruga/commit/a2e9b8a0bdc4d34dbb8a2071be900fe012715c2d))
* **loading:** add body `noscroll` class when fullpage ([#1074](https://github.com/oruga-ui/oruga/issues/1074)) ([bbe2865](https://github.com/oruga-ui/oruga/commit/bbe2865521336ef074c0b1dee5f20433f1332848))
* **picker:** improve date/time picker class drilling ([#1044](https://github.com/oruga-ui/oruga/issues/1044)) ([5ec65c8](https://github.com/oruga-ui/oruga/commit/5ec65c81dc004e0011f259a1abdd5534834852dc))
* **programmatic:** unfiy  `useProgramamtic` interfaces ([#1058](https://github.com/oruga-ui/oruga/issues/1058)) ([80a0c5c](https://github.com/oruga-ui/oruga/commit/80a0c5c9ef49022791c54efae9bfa68d6a6b4139))
* **sidebar:** remove `variant` prop | improve prop definitions ([#1046](https://github.com/oruga-ui/oruga/issues/1046)) ([c6bd1bc](https://github.com/oruga-ui/oruga/commit/c6bd1bc3a606381e3d865939aa541b4f5f4a8918))
* **steps:** add root `variantClass` prop | update examples ([#1049](https://github.com/oruga-ui/oruga/issues/1049)) ([d795946](https://github.com/oruga-ui/oruga/commit/d7959461d49ff62345df76f2128582692af65055))
* **table:** add `addons` to internal mobile sort field wrapper ([#1051](https://github.com/oruga-ui/oruga/issues/1051)) ([781849e](https://github.com/oruga-ui/oruga/commit/781849ee8390b17f4c096dff1cb91ea3dfcc37af))
* **tabs|steps:** add `component` prop to item ([#1071](https://github.com/oruga-ui/oruga/issues/1071)) ([d3ea497](https://github.com/oruga-ui/oruga/commit/d3ea497942e4cace63bfb1960747dee8106431d7))
* **tabs:** update class names ([#1062](https://github.com/oruga-ui/oruga/issues/1062)) ([4bfab60](https://github.com/oruga-ui/oruga/commit/4bfab60d2638d15b50a5cd8df8c0eaa476fcddac))
* **types:** enhance `component` prop type ([#1075](https://github.com/oruga-ui/oruga/issues/1075)) ([73f3801](https://github.com/oruga-ui/oruga/commit/73f38010c9482ccde5ab656affcb256af021f178))
* **types:** update tsconfig | add `strictNullChecks` definition ([#1066](https://github.com/oruga-ui/oruga/issues/1066)) ([923f887](https://github.com/oruga-ui/oruga/commit/923f887c4314acd33ed3c75a7cb45e0e061fe055))


### Detailed Changes

*following with the main release...*



# [0.9.0-pre.2](https://github.com/oruga-ui/oruga/compare/v0.9.0-pre.1...v0.9.0-pre.2) (2024-08-08)


### Bug Fixes

* **datetimepicker:** solve editing directly not working correctly ([#1026](https://github.com/oruga-ui/oruga/issues/1026)) ([05e392e](https://github.com/oruga-ui/oruga/commit/05e392ea81d40e609d85f8aa628c37c380919776))
* **dropdown:** prevent background scrolling on mobile ([#1022](https://github.com/oruga-ui/oruga/issues/1022)) ([bc1b497](https://github.com/oruga-ui/oruga/commit/bc1b49729f67b7e9ea6ea9cfd778e934b8e06e96))
* **icon:** adjust `component` prop type ([#1028](https://github.com/oruga-ui/oruga/issues/1028)) ([a656182](https://github.com/oruga-ui/oruga/commit/a656182c3e29fa87950745dbe8357cabc8e18043))
* **table:** emit `check` and `check-all` after reactive value got updated ([#1031](https://github.com/oruga-ui/oruga/issues/1031)) ([bf708ee](https://github.com/oruga-ui/oruga/commit/bf708eedc8ba319d86e33ae214c8ad407f6693f6))
* **table:** solve an issue with `isRowChecked` prop ([#1032](https://github.com/oruga-ui/oruga/issues/1032)) ([9bcc478](https://github.com/oruga-ui/oruga/commit/9bcc478ac3cf2e051f414e2fa870e62d3953b7d2))
* **theme:** solve an issue with class as string array definition ([#1024](https://github.com/oruga-ui/oruga/issues/1024)) ([754e1ee](https://github.com/oruga-ui/oruga/commit/754e1eecdfe4a68704e1a8b0c32b3f97150aab52))


### Features

* allow custom constraint validation errors ([#1023](https://github.com/oruga-ui/oruga/issues/1023)) ([a465a22](https://github.com/oruga-ui/oruga/commit/a465a22977276edb8f273ef8ccbd63761e56dc55))
* **field:** programmatically associate inputs with field messages ([#1021](https://github.com/oruga-ui/oruga/issues/1021)) ([6fc309f](https://github.com/oruga-ui/oruga/commit/6fc309ff3b4fb324b3c69d193b7b116c1cb9913e))
* **table:** add icon/label to `empty` slot ([#1030](https://github.com/oruga-ui/oruga/issues/1030)) ([79a7ab9](https://github.com/oruga-ui/oruga/commit/79a7ab905e81988544b3c5390f0ca879f71229cb))
* **slider**: rename `customFormatter` prop to `formatter` prop ([#1033](https://github.com/oruga-ui/oruga/pull/1033))


### Detailed Changes

*following with the main release...*


# [0.9.0-pre.1](https://github.com/oruga-ui/oruga/compare/v0.8.11...v0.9.0-pre.1) (2024-07-12)


### Bug Fixes

* **autocomplete:** adjust prop `keepOpen` behavior ([#1015](https://github.com/oruga-ui/oruga/issues/1015)) ([e01ad35](https://github.com/oruga-ui/oruga/commit/e01ad3577f42f8838c81ddcb5e7811c0d3713d23))
* **dropdown:** adjust prop `multiple` behavior ([#1012](https://github.com/oruga-ui/oruga/issues/1012)) ([3e4291a](https://github.com/oruga-ui/oruga/commit/3e4291ac94556603543a92bd17bec2f5b8cc60db))
* **select:** adjust prop `multiple` behavior ([#1014](https://github.com/oruga-ui/oruga/issues/1014)) ([6e25bee](https://github.com/oruga-ui/oruga/commit/6e25bee220819e9abd4b739bd17592859c490894))
* **select:** adjust prop `placeholder` behavior ([#964](https://github.com/oruga-ui/oruga/issues/964)) ([1c8b580](https://github.com/oruga-ui/oruga/commit/1c8b58083dc1f33bf5a6d9a9efe3a17ba0c049ac))
* **table:** solve searchable filter bug ([#949](https://github.com/oruga-ui/oruga/issues/949)) ([858c5c7](https://github.com/oruga-ui/oruga/commit/858c5c72a2207dbb6133458a54a3630ae946e4af))


### Features

* remove deprecated `ConfigPlugin` export ([#873](https://github.com/oruga-ui/oruga/issues/873)) ([66c09f4](https://github.com/oruga-ui/oruga/commit/66c09f45b5c2ecc45d024c8fc38ead20c0c0c2d3))
* expose `value` for every *form* component ([#957](https://github.com/oruga-ui/oruga/issues/957)) ([9a43312](https://github.com/oruga-ui/oruga/commit/9a433124836a50d280dcd9df02574722aa142717))
* **autocomplete:** update type generics ([#956](https://github.com/oruga-ui/oruga/issues/956)) ([26de252](https://github.com/oruga-ui/oruga/commit/26de252197e7cae61178c1593c158ff7c8e9ca75))
* **checkbox:** add type generics ([#968](https://github.com/oruga-ui/oruga/issues/968)) ([c2c9d05](https://github.com/oruga-ui/oruga/commit/c2c9d055f8981725888e34606af7bec80803b6ee))
* **datepicker:** change `mobileNative` default to `false` ([#993](https://github.com/oruga-ui/oruga/issues/993)) ([46e2c89](https://github.com/oruga-ui/oruga/commit/46e2c8940857842e51c9f9c165dfe6ddd47e4b1e))
* **datepicker:** make `modelValue` conditional typed by prop `range`  ([#1006](https://github.com/oruga-ui/oruga/issues/1006)) ([96f1784](https://github.com/oruga-ui/oruga/commit/96f1784e5f626d2b9767d7ebcb345d7c476bbe41))
* **datepicker:** make `datepicker` conditional typed by prop `multiple` ([#1011](https://github.com/oruga-ui/oruga/issues/1011)) ([8689a40](https://github.com/oruga-ui/oruga/commit/8689a40163130bc5c3ea97b761e6af7d9429b4d9))
* **dropdown:** update type generics ([#984](https://github.com/oruga-ui/oruga/issues/984)) ([df7074b](https://github.com/oruga-ui/oruga/commit/df7074b4783e693d20f0537d9e371c26920a5044))
* **dropdown:** make `modelValue` conditional typed by prop `multiple` ([#1003](https://github.com/oruga-ui/oruga/issues/1003)) ([66bbbcc](https://github.com/oruga-ui/oruga/commit/66bbbccc6524c14bd49072069bfd8898b594594b))
* **field:** set prop `addons` default to `false` ([#914](https://github.com/oruga-ui/oruga/issues/914)) ([3871879](https://github.com/oruga-ui/oruga/commit/3871879b4bb40eb4d073e657fa5607dad1c1d8c3))
* **input:** add `number` prop for vmodel casting ([#884](https://github.com/oruga-ui/oruga/issues/884)) ([ded99f9](https://github.com/oruga-ui/oruga/commit/ded99f9de574e3bf427c38223836214413639363))
* **input:** make `modelValue` conditional typed by prop `number`  ([#991](https://github.com/oruga-ui/oruga/issues/991)) ([53924f1](https://github.com/oruga-ui/oruga/commit/53924f10b9348d96a80d6404560a7a9972e9d8c0))
* **radio:** add type generics ([#969](https://github.com/oruga-ui/oruga/issues/969)) ([f241391](https://github.com/oruga-ui/oruga/commit/f241391053e3a6ae623327dc854ccadf881edca8))
* **select:** add native `required` prop ([#971](https://github.com/oruga-ui/oruga/issues/971)) ([e3df9f1](https://github.com/oruga-ui/oruga/commit/e3df9f19b4417a1b02d2e4218c6082e89d145f2b))
* **select:** add type generics | add unit tests ([#963](https://github.com/oruga-ui/oruga/issues/963)) ([a5bdedc](https://github.com/oruga-ui/oruga/commit/a5bdedc2c63200eb0e1ec4d19cee02172500fc05))
* **select:** make `modelValue` conditional typed by prop `multiple` ([#1004](https://github.com/oruga-ui/oruga/issues/1004)) ([d3dc6dd](https://github.com/oruga-ui/oruga/commit/d3dc6ddec9e7120fa28779d3e73818dcef28c52a))
* **select:** register `id` to field wrapper ([#966](https://github.com/oruga-ui/oruga/issues/966)) ([72f253c](https://github.com/oruga-ui/oruga/commit/72f253ccd14b46c699a9452b4c55a6ac877ada8b))
* **slider:** make `modelValue` conditional typed by prop `range` ([#1018](https://github.com/oruga-ui/oruga/issues/1018)) ([eafc3f3](https://github.com/oruga-ui/oruga/commit/eafc3f3466a690f28b524f2781b8eb92760ffa76))
* **steps:** add type generics ([#977](https://github.com/oruga-ui/oruga/issues/977)) ([f07a7cc](https://github.com/oruga-ui/oruga/commit/f07a7ccde7f1a3f11a6b7b5292d839dd1cde0050))
* **switch:** add type generics ([#973](https://github.com/oruga-ui/oruga/issues/973)) ([cb67396](https://github.com/oruga-ui/oruga/commit/cb6739600bd294684955a4b57ea949b2aa84da34))
* **table:** add `before` and `after` slot | add column `display` prop ([#947](https://github.com/oruga-ui/oruga/issues/947)) ([8f64934](https://github.com/oruga-ui/oruga/commit/8f64934ae0fc61fc437c3568d276fcf52b290662))
* **table:** enhance loading spinner ([#946](https://github.com/oruga-ui/oruga/issues/946)) ([a1b7d45](https://github.com/oruga-ui/oruga/commit/a1b7d45495c19edc8b5ffa77466be504dd13be32))
* **table:** add type generics ([#919](https://github.com/oruga-ui/oruga/issues/919)) ([c85bee6](https://github.com/oruga-ui/oruga/commit/c85bee62fcc98d48d7d51e5f2beeecd766d81de4))
* **table:** expose `sort` function ([#959](https://github.com/oruga-ui/oruga/issues/959)) ([e9030bd](https://github.com/oruga-ui/oruga/commit/e9030bdbec26aeef91a15500959f792d8ab9742f))
* **table:** update `thAttrs` and `tdAttrs` properties ([#958](https://github.com/oruga-ui/oruga/issues/958)) ([9dced98](https://github.com/oruga-ui/oruga/commit/9dced984f198bc13cb34cc68835b277ec794a7e7))
* **tabs:** add type generics ([#978](https://github.com/oruga-ui/oruga/issues/978)) ([a9ded34](https://github.com/oruga-ui/oruga/commit/a9ded34592bc337019270b3ec90bddd95a737650))
* **taginput:** update type generics ([#956](https://github.com/oruga-ui/oruga/issues/956)) ([26de252](https://github.com/oruga-ui/oruga/commit/26de252197e7cae61178c1593c158ff7c8e9ca75))
* **taginput:** enhance `allowNew` and `allowDuplicates` props ([#1016](https://github.com/oruga-ui/oruga/issues/1016)) ([1eeeb42](https://github.com/oruga-ui/oruga/commit/1eeeb421d7ffefe9743abfcb20f45e5dec17c892))
* **upload:** add type generics ([#982](https://github.com/oruga-ui/oruga/issues/982)) ([38bc75d](https://github.com/oruga-ui/oruga/commit/38bc75d1702764de36d6fc6b55ce138bffdfe7bb))
* **upload:** make `modelValue` conditional typed by prop `mulitple` ([#1005](https://github.com/oruga-ui/oruga/issues/1005)) ([a93abfe](https://github.com/oruga-ui/oruga/commit/a93abfe71182689ec37db4c9b5dc67f5bd451a6d))
* **programmatic:** add programmatic component ([#944](https://github.com/oruga-ui/oruga/issues/944)) ([2840a7e](https://github.com/oruga-ui/oruga/commit/2840a7e9354af31a42419c2e2112be7f7296cdc3))
* **reactivity:** make components `classes` props reactive ([#960](https://github.com/oruga-ui/oruga/issues/960)) ([c0e429d](https://github.com/oruga-ui/oruga/commit/c0e429dc8db9b4fab5138d25773abb8d355d3996))
* **themes:** remove theme config function `props` object encapsulation ([#760](https://github.com/oruga-ui/oruga/issues/760)) ([317fafb](https://github.com/oruga-ui/oruga/commit/317fafbcb1f071004733776ad17c2fcbea145350))
* **examples:** add package `@oruga-ui/examples` ([#1019](https://github.com/oruga-ui/oruga/issues/1019)) ([5d18d26](https://github.com/oruga-ui/oruga/commit/5d18d26b15c5360a0eefcc3a4c98fe36e4efa781))


### Reverts

* **defineModel:** reuse `useVModel` composable for generics where the type is `T | T[]` ([#998](https://github.com/oruga-ui/oruga/issues/998)) ([c00abf5](https://github.com/oruga-ui/oruga/commit/c00abf5ad767a2121eb486ca4a7f3cd665089665))


### Detailed Changes

*following with the main release...*



## [0.8.12](https://github.com/oruga-ui/oruga/compare/v0.8.11...v0.8.12) (2024-06-28)


### Bug Fixes

* **datetimepicker:** fix datetimepicker initialisation bug ([#948](https://github.com/oruga-ui/oruga/issues/948)) ([92b30f1](https://github.com/oruga-ui/oruga/commit/92b30f16d7f2839f7f69c2ebf6bd9c7f0e11bedf))
* **picker:** fix native input value ([#986](https://github.com/oruga-ui/oruga/issues/986)) ([09154d5](https://github.com/oruga-ui/oruga/commit/09154d5a9adc919a6bcd3f78448dd16baa008bc9))



## [0.8.11](https://github.com/oruga-ui/oruga/compare/v0.8.10...v0.8.11) (2024-06-05)


### Bug Fixes

* **datepicker:** always validate programmatic date updates ([#927](https://github.com/oruga-ui/oruga/issues/927)) ([20ceedd](https://github.com/oruga-ui/oruga/commit/20ceedda2566211b5c790a12a687a01ce26380b5))
* **datepicker:** update focused date on editing directly ([#941](https://github.com/oruga-ui/oruga/issues/941)) ([1af13cf](https://github.com/oruga-ui/oruga/commit/1af13cf1cc97703aa58820d99b403791b554f9ba))
* **taginput:** solve defineModel macro array constrains ([#942](https://github.com/oruga-ui/oruga/issues/942)) ([404c5f6](https://github.com/oruga-ui/oruga/commit/404c5f6d1aa61cbbbe7dfce089bf203ffde4259e))


### Features

* **inputs:** detect constraint validation attribute changes ([#930](https://github.com/oruga-ui/oruga/issues/930)) ([4de3bd7](https://github.com/oruga-ui/oruga/commit/4de3bd74f512a3a1b07363b0cb062d6f2b5cc95d))



## [0.8.10](https://github.com/oruga-ui/oruga/compare/v0.8.9...v0.8.10) (2024-06-03)


### Bug Fixes

* **datetimpicker:** fix inline value edit | make picker props reactive ([#932](https://github.com/oruga-ui/oruga/issues/932)) ([1e93773](https://github.com/oruga-ui/oruga/commit/1e93773fbbe38859ecac3deee8e651c340d01012))


### Features

* **modal:** set default `destroyOnHide` to `true` for programmatic usage ([#937](https://github.com/oruga-ui/oruga/issues/937)) ([0b0bdca](https://github.com/oruga-ui/oruga/commit/0b0bdca61e72bf471d2e8788d8737a47803f79b4))
* **steps:** add `destroyOnHide` prop ([#934](https://github.com/oruga-ui/oruga/issues/934)) ([d06ea1e](https://github.com/oruga-ui/oruga/commit/d06ea1ecf462b54c626a72286ba123d2a1489031))
* **tabs:** add `destroyOnHide` prop ([#926](https://github.com/oruga-ui/oruga/issues/926)) ([e87882b](https://github.com/oruga-ui/oruga/commit/e87882bcb633ba288228f77ddf885a3373bbd860))



## [0.8.9](https://github.com/oruga-ui/oruga/compare/v0.8.8...v0.8.9) (2024-05-01)


### Bug Fixes

* **field:** fix bug when prop `horizontal` is set ([#915](https://github.com/oruga-ui/oruga/issues/915)) ([962bfea](https://github.com/oruga-ui/oruga/commit/962bfea1d447aac2b6a2c3174e2becf49ebac926))
* **table:** fix filtering when table is not sorted ([#911](https://github.com/oruga-ui/oruga/issues/911)) ([10ee451](https://github.com/oruga-ui/oruga/commit/10ee45119d107ae35c9c25fc17f9dfe8d12116c3))
* **Table:** fix table async example backend sort function ([#910](https://github.com/oruga-ui/oruga/issues/910)) ([18f3c00](https://github.com/oruga-ui/oruga/commit/18f3c002bc295601948d111b005bc3f1e221cba5))
* **taginput:** fix infinite recursive update when updating modeValue ([#917](https://github.com/oruga-ui/oruga/issues/917)) ([e2e3c4a](https://github.com/oruga-ui/oruga/commit/e2e3c4a2d9347a3e01709379a4c6ee7bb98eba5f))


### Features

* **table:** make debounceSearch a global option ([#912](https://github.com/oruga-ui/oruga/issues/912)) ([517598f](https://github.com/oruga-ui/oruga/commit/517598f5220db093c282a108a427a36f97502e7d))



## [0.8.8](https://github.com/oruga-ui/oruga/compare/v0.8.7...v0.8.8) (2024-04-23)


### Bug Fixes

* **build:** fix cjs extension in package.json entry point ([#894](https://github.com/oruga-ui/oruga/issues/894)) ([51e7184](https://github.com/oruga-ui/oruga/commit/51e718411014ec2317d38dae2dacc12cededa4b7))
* **datepicker:** fix defineClasses parent props problem ([#900](https://github.com/oruga-ui/oruga/issues/900)) ([087a8dc](https://github.com/oruga-ui/oruga/commit/087a8dcf55c59712d7d31c0b14c0e12a9dde589d))
* **datepicker:** make date parsing work again ([#882](https://github.com/oruga-ui/oruga/issues/882)) ([047e999](https://github.com/oruga-ui/oruga/commit/047e999324b912e8b7b456bb4f72feb09b4282e8))
* **field:** add field `setInputId` & remove `ariaLabelledby` prop ([#902](https://github.com/oruga-ui/oruga/issues/902)) ([458d45c](https://github.com/oruga-ui/oruga/commit/458d45c17d2c3d96813e78f1902cd781d7e6ae93))
* **field:** fix slot invoked outside render function & ass `messageTag` prop ([#906](https://github.com/oruga-ui/oruga/issues/906)) ([f9d07c6](https://github.com/oruga-ui/oruga/commit/f9d07c62a091bf44a36b38454c5b1ba86559270a))
* **menu:** fix `useProviderParent` composable `childItems` type problem ([#897](https://github.com/oruga-ui/oruga/issues/897)) ([b9656a6](https://github.com/oruga-ui/oruga/commit/b9656a6b5adfc27510be66e3bfe9b018e5de2cdd))
* **taginput:** fix selection with autocomplete on non string items ([#889](https://github.com/oruga-ui/oruga/issues/889)) ([930c397](https://github.com/oruga-ui/oruga/commit/930c39707d2f938fe87876808c90251a743b8cd2))


### Features

* **datepicker:** change prop `readonly` default to `false` & disable calendar interaction while `readonly` ([#901](https://github.com/oruga-ui/oruga/issues/901)) ([364d0c5](https://github.com/oruga-ui/oruga/commit/364d0c5c9128e57167cff3922a0585bf6d323010))
* **taginput:** add `removeItem` as selected slot property ([#887](https://github.com/oruga-ui/oruga/issues/887)) ([#888](https://github.com/oruga-ui/oruga/issues/888)) ([c8c26cc](https://github.com/oruga-ui/oruga/commit/c8c26cc7608a4ecdcc7336f63a0a069721a9cfcc))
* **taginput:** update prop types ([#895](https://github.com/oruga-ui/oruga/issues/895)) ([b5709c5](https://github.com/oruga-ui/oruga/commit/b5709c569a8390e0f7944234b166534d146a363d))



## [0.8.7](https://github.com/mlmoravek/oruga/compare/v0.8.6...v0.8.7) (2024-04-02)


### Bug Fixes

* **autocomplete:** adjust active state behavior ([#859](https://github.com/mlmoravek/oruga/issues/859)) ([9ce1971](https://github.com/mlmoravek/oruga/commit/9ce1971c71e719a392dbfa7735dc64c5cabaeef2))
* **autocomplete:** change options type definition to generic ([#866](https://github.com/mlmoravek/oruga/issues/866)) ([5f6717a](https://github.com/mlmoravek/oruga/commit/5f6717a668be58ee5916b55c896034574de02856))
* **steps|tabs:** fix disable animation ([#870](https://github.com/mlmoravek/oruga/issues/870)) ([08c1fbf](https://github.com/mlmoravek/oruga/commit/08c1fbf93adda4af411e733a75fed097432d5da7))
* **steps|tabs:** make item props reactive again ([#879](https://github.com/mlmoravek/oruga/issues/879)) ([269183d](https://github.com/mlmoravek/oruga/commit/269183dcadb918b365894cef4809a12241387172))
* **table:** make `TableColumn` props reactive again ([#878](https://github.com/mlmoravek/oruga/issues/878)) ([d2b1caa](https://github.com/mlmoravek/oruga/commit/d2b1caa3074b7f3826e856942e7979b9abc72aea))
* fix type generation script ([#867](https://github.com/mlmoravek/oruga/issues/867)) ([2f6b6c8](https://github.com/mlmoravek/oruga/commit/2f6b6c893b75997e95be1e276616dd750f5c99a1))
* resolve maximum recursive update exceeded in tests ([#869](https://github.com/mlmoravek/oruga/issues/869)) ([40d8b94](https://github.com/mlmoravek/oruga/commit/40d8b942805e15d07589e9bc93b6841885f5cab3))


### Features

* **tabs:** move inherit attrs to div instead of transition ([#871](https://github.com/mlmoravek/oruga/issues/871)) ([6db3f74](https://github.com/mlmoravek/oruga/commit/6db3f74c0a24b13d4ce7f9edccaa131829640131))



## [0.8.6](https://github.com/oruga-ui/oruga/compare/v0.8.5...v0.8.6) (2024-03-11)


### Bug Fixes

* **build:** add volar types export ([#844](https://github.com/oruga-ui/oruga/issues/844)) ([4b31d5e](https://github.com/oruga-ui/oruga/commit/4b31d5ee3a7cad73df80bc755f0203e9be43cdbc))
* **build:** export `ConfigPlugin` ([#824](https://github.com/oruga-ui/oruga/issues/824)) ([e50cc19](https://github.com/oruga-ui/oruga/commit/e50cc1959f0ca1111ded4c9790f25697cb4708b1))
* **helpers:** remove unintended unref function in `isDefined` helper function ([#834](https://github.com/oruga-ui/oruga/issues/834)) ([ed75a71](https://github.com/oruga-ui/oruga/commit/ed75a718d3282198e532596423ea4b71256cfb06))
* **modal:** make property `witdh` reactive ([#830](https://github.com/oruga-ui/oruga/issues/830)) ([7f65756](https://github.com/oruga-ui/oruga/commit/7f6575664926259be4f5a5bf3516ca42629b1017))
* **programmatic:** fix ProgrammaticExpose type ([#831](https://github.com/oruga-ui/oruga/issues/831)) ([e490336](https://github.com/oruga-ui/oruga/commit/e4903369209789188b61dcebcc95d71a30611e3a))
* **table:** `stickyHeaderClass` should not display by default ([#832](https://github.com/oruga-ui/oruga/issues/832)) ([09a45a1](https://github.com/oruga-ui/oruga/commit/09a45a1176b9b79fc6c018a744bd5e4ce4953e52))
* **table:** fix `page-change` event sending old value ([#842](https://github.com/oruga-ui/oruga/issues/842)) ([082e2fa](https://github.com/oruga-ui/oruga/commit/082e2fa0f0e99b6e995f21848c2a968529dc8cf3))
* **table:** fix TableColumn `searchable` slot property bug ([#836](https://github.com/oruga-ui/oruga/issues/836)) ([0ecba93](https://github.com/oruga-ui/oruga/commit/0ecba93c40f6c249b4a4272b88c48fd068b74f79))
* **table:** prevent TableColumn props trigger recursive reactivity ([#848](https://github.com/oruga-ui/oruga/issues/848)) ([8f83b71](https://github.com/oruga-ui/oruga/commit/8f83b710f937993cb489d3910f0ea492412467f7))
* **table:** set TableColumn `customSort` type to unknown ([#840](https://github.com/oruga-ui/oruga/issues/840)) ([548304d](https://github.com/oruga-ui/oruga/commit/548304d835385d155373c6684db340bb3c427352))
* **upload:** fix input bindung ([#843](https://github.com/oruga-ui/oruga/issues/843)) ([deafbdf](https://github.com/oruga-ui/oruga/commit/deafbdfac0823ac1ae4c6326bd0066660237af19))


### Features

* **table:** make `bordered`, `striped`, `narrowed` and `hoverable` configurable ([#845](https://github.com/oruga-ui/oruga/issues/845)) ([6872eee](https://github.com/oruga-ui/oruga/commit/6872eeee735a309d3489c541c92f192c063cf821))



## [0.8.5](https://github.com/oruga-ui/oruga/compare/v0.8.4...v0.8.5) (2024-02-26)


### Bug Fixes

* check scrolling parent not null ([#813](https://github.com/oruga-ui/oruga/issues/813)) ([e471f76](https://github.com/oruga-ui/oruga/commit/e471f76c7a7b85a5f069b433b59610d66e979fca))
* fix generation scripts ([#814](https://github.com/oruga-ui/oruga/issues/814)) ([27fe3b5](https://github.com/oruga-ui/oruga/commit/27fe3b568a9d4d8e4830dcbe36c57ccaa116e7af))
* **datepicker|timepicker:** wrap focus listener into function ([#810](https://github.com/oruga-ui/oruga/issues/810)) ([b1b6586](https://github.com/oruga-ui/oruga/commit/b1b6586f1ff8516d96eda1625d0432d98113f816))



## [0.8.4](https://github.com/oruga-ui/oruga/compare/v0.8.3...v0.8.4) (2024-02-24)


### Bug Fixes

* **autocomplete:** fix select item by click ([#796](https://github.com/oruga-ui/oruga/issues/796)) ([d3e1465](https://github.com/oruga-ui/oruga/commit/d3e14656241149734efdab3215a7f74e21b53bb0))
* **autocomplete:** show empty slot when available ([#787](https://github.com/oruga-ui/oruga/issues/787)) ([0cebb5c](https://github.com/oruga-ui/oruga/commit/0cebb5c8e214482e284dc64df702c9e507154f1c))
* **composable:** prevent scrolling parent error with parent null ([#794](https://github.com/oruga-ui/oruga/issues/794)) ([34670d4](https://github.com/oruga-ui/oruga/commit/34670d46e430f62b44181c0095e33750d9dc385d))
* **datepicker:** refactor datepicker related components ([#782](https://github.com/oruga-ui/oruga/issues/782)) ([da9eb0f](https://github.com/oruga-ui/oruga/commit/da9eb0f4966af69cfa30643477b1e816f37488f8))
* **datetimepicker:** fix vmodel reactivity ([#785](https://github.com/oruga-ui/oruga/issues/785)) ([cefffc2](https://github.com/oruga-ui/oruga/commit/cefffc2b5f0a2ca10c747b86214f89fa6dd7cae5))
* **input:** update password reveal feature ([#789](https://github.com/oruga-ui/oruga/issues/789)) ([8b8bfa6](https://github.com/oruga-ui/oruga/commit/8b8bfa6a7374d34e236cb9d0313b6377a2ec5034))
* **notification:** extend programmatic props ([#766](https://github.com/oruga-ui/oruga/issues/766)) ([f4bca09](https://github.com/oruga-ui/oruga/commit/f4bca09c71bcd7c67c7a856746e4f71d07f800cb))
* **taginput:** fix rootClass inheritance ([#772](https://github.com/oruga-ui/oruga/issues/772)) ([fadb780](https://github.com/oruga-ui/oruga/commit/fadb7800b95783c9024589ee4c7b21d562b0ddf2))
* **taginput:** forward expanded prop to Autocomplete component so that it's passed to dropdown ([#767](https://github.com/oruga-ui/oruga/issues/767)) ([d46ae92](https://github.com/oruga-ui/oruga/commit/d46ae92237c2081cf9ed9fba4997c96ed1059d5e))


### Features

* expose setFocus function for all input components ([#793](https://github.com/oruga-ui/oruga/issues/793)) ([a290c8b](https://github.com/oruga-ui/oruga/commit/a290c8b3f168c11d6197fd86f3a301b7fca18ab9))
* **pagination:** add button tag property ([#779](https://github.com/oruga-ui/oruga/issues/779)) ([22b36a8](https://github.com/oruga-ui/oruga/commit/22b36a8c591e66f066366547a2ca39b097f7a0de))
* **tabs|steps:** add animation and animateInitially prop ([#797](https://github.com/oruga-ui/oruga/issues/797)) ([f04362e](https://github.com/oruga-ui/oruga/commit/f04362e732e161119ab937ba95b51bb3864ee542))
* **theme:** adjustments for bulma theme integration ([#777](https://github.com/oruga-ui/oruga/issues/777)) ([1b8fcae](https://github.com/oruga-ui/oruga/commit/1b8fcae1e956db5abe53f1d8adc956336c8a71ea))
* **theme:** add autogenerate component theme types ([#775](https://github.com/oruga-ui/oruga/issues/775)) ([5abdfe6](https://github.com/oruga-ui/oruga/commit/5abdfe67ed13cf6f808d09ea31d7d0a69696d1a4))


## [0.8.3](https://github.com/oruga-ui/oruga/compare/v0.8.2...v0.8.3) (2024-02-06)


### Bug Fixes

* **autocomplete:** allow empty slot display and formatter prop usage ([6c9a60d](https://github.com/oruga-ui/oruga/commit/6c9a60d8188b87becb7bfb540281430c30be734a))
* **autocomplete:** change input vbind vmodel prop order ([3297e4b](https://github.com/oruga-ui/oruga/commit/3297e4b9911174214694968adf4b8680841ecd9e))
* **autocomplete:** close dropdown on enter or tab key press ([#761](https://github.com/oruga-ui/oruga/issues/761)) ([796ed9f](https://github.com/oruga-ui/oruga/commit/796ed9f356b6e415d66f2322476114ee5babf30d))
* **carousel:** adjust indicator index out of range ([#752](https://github.com/oruga-ui/oruga/issues/752)) ([eca9d38](https://github.com/oruga-ui/oruga/commit/eca9d38b4079423bc96f9f906580608172519159))
* **carousel:** fix repeat index ([#757](https://github.com/oruga-ui/oruga/issues/757)) ([68e4dee](https://github.com/oruga-ui/oruga/commit/68e4dee9db1a888494d14bb2c1d809694574b6cd))
* **datepicker:** fix datepicker component shows wrong year range when adding max date and min date props ([#731](https://github.com/oruga-ui/oruga/issues/731)) ([9094188](https://github.com/oruga-ui/oruga/commit/90941884a194dbcd406ae143783b480a47c369e2))
* **notification:** adjust querySelector ([#756](https://github.com/oruga-ui/oruga/issues/756)) ([13b0d37](https://github.com/oruga-ui/oruga/commit/13b0d379bd1e2aa72b356d9986841e450341f54d))
* **slider:** remove `this` references ([#746](https://github.com/oruga-ui/oruga/issues/746)) ([9942c0f](https://github.com/oruga-ui/oruga/commit/9942c0f55ccd3d7685f6f54764ac775f525e2122))
* **table:** fix binding current page ([672680a](https://github.com/oruga-ui/oruga/commit/672680ad44cb2f6a50615726a43bbc12470c57ed))
* **tablecolumn:** remove typo in the props ([#727](https://github.com/oruga-ui/oruga/issues/727)) ([6c8238b](https://github.com/oruga-ui/oruga/commit/6c8238bb818eafd5eeebc2fb71e74948442c837e))
* **table:** fix wrong use of thAttrsData ([da4c7c5](https://github.com/oruga-ui/oruga/commit/da4c7c521e697dbc65e11b426f1b1e566087578e))
* **taginput:** only hide input field instead of unmount ([#754](https://github.com/oruga-ui/oruga/issues/754)) ([cd1bcf7](https://github.com/oruga-ui/oruga/commit/cd1bcf73d817fcc1120677f5d9703528cda78b0e))
* **taginput:** pass missing placeholder props to autocomplete component ([928863a](https://github.com/oruga-ui/oruga/commit/928863a1edc64cef3100c86ec8025b3cd4c590fd))
* **taginput:** watch TagInput v-model prop with deep in order to trigger update:modelValue ([#722](https://github.com/oruga-ui/oruga/issues/722)) ([96843a4](https://github.com/oruga-ui/oruga/commit/96843a4b9e8832f328f359a69b7eea8c53b6772c))
* **timepicker:** fix meridien bug ([#753](https://github.com/oruga-ui/oruga/issues/753)) ([f302c27](https://github.com/oruga-ui/oruga/commit/f302c27b026a4fe498c35b0941c9f9b5de02f539))
* **tooltip:** remove console.log usage in Tooltip component  ([bbf8161](https://github.com/oruga-ui/oruga/commit/bbf81619245749d5517acd09832843ab6ab365c2))
* **types:** fix customIconPacks config ([#715](https://github.com/oruga-ui/oruga/issues/715)) ([a123a5e](https://github.com/oruga-ui/oruga/commit/a123a5e1bcaec01065b17a17e5cbe732f60ad113))
* **types:** fix volar type generation ([#702](https://github.com/oruga-ui/oruga/issues/702)) ([1bfd747](https://github.com/oruga-ui/oruga/commit/1bfd747d71a949b1c2926f33a3e4f47e8f9569a9))
* update ClassFunction second parameter from context to props ([#743](https://github.com/oruga-ui/oruga/issues/743)) ([035b619](https://github.com/oruga-ui/oruga/commit/035b61942e2b8bf58efc500c386e8b4230da3fd2))
* fix Vue 3.4 getCurrentInstance() bug by convert useComputedClass to defineClass ([#725](https://github.com/oruga-ui/oruga/issues/725)) ([0a7f9b4](https://github.com/oruga-ui/oruga/commit/0a7f9b475b87e657c77db1482829a02626327ffe))


### Features

* enhance a11y ([#762](https://github.com/oruga-ui/oruga/issues/762)) ([41b1c54](https://github.com/oruga-ui/oruga/commit/41b1c5474a3c493a08c921b3f3cf4c708cb47d5d))
* **useInputHandler:** add input not given warning ([#747](https://github.com/oruga-ui/oruga/issues/747)) ([49e9c4e](https://github.com/oruga-ui/oruga/commit/49e9c4e1bd7e66d0cf0209d6dc9e30ce9f595961))



## [0.8.2](https://github.com/oruga-ui/oruga/compare/v0.8.1...v0.8.2) (2023-12-21)


### Bug Fixes

* **docs:** add missing props ([#697](https://github.com/oruga-ui/oruga/issues/697)) ([13d27de](https://github.com/oruga-ui/oruga/commit/13d27de116c58f79b2ed09b7a970d523656851a7))
* **docs:** update oruga-next cdn link ([#684](https://github.com/oruga-ui/oruga/issues/684)) ([d68308b](https://github.com/oruga-ui/oruga/commit/d68308bb90499fd6322d150cf5a174fa2de8eb71))
* **programmatic:** adjust open params type ([#690](https://github.com/oruga-ui/oruga/issues/690)) ([9e8ad3a](https://github.com/oruga-ui/oruga/commit/9e8ad3a321fca51910cd29825025c758fc28c12a))
* **table:** reorder params from Object.assign to allow for non-extensible objects ([#689](https://github.com/oruga-ui/oruga/issues/689)) ([dc2b9cf](https://github.com/oruga-ui/oruga/commit/dc2b9cfd3dde2b8cb4e225c607a58dd41a6fe767))
* **types:** fix type export ([#687](https://github.com/oruga-ui/oruga/issues/687)) ([829279d](https://github.com/oruga-ui/oruga/commit/829279d6880614c144ff478daa29c17d585811ad))
* **upload:** update click handler ([1f08a2a](https://github.com/oruga-ui/oruga/commit/1f08a2a802f5a1183383655e12eb17b41df89824))


### Features

* **input|select:** add disabledClass ([#691](https://github.com/oruga-ui/oruga/issues/691)) ([c13f324](https://github.com/oruga-ui/oruga/commit/c13f324db8b9d2512223a80cbdd2d3f439bfea8f))
* **type:** add volar.d.ts generation ([#694](https://github.com/oruga-ui/oruga/issues/691)) ([fb191a8](https://github.com/oruga-ui/oruga/commit/fb191a8ad8933197fc16bebb1e5b592f828669d4))


## [0.8.1](https://github.com/oruga-ui/oruga/compare/v0.8.0...v0.8.1) (2023-12-10)

### Bug Fixes
* **build:** fix types export ([#681](https://github.com/oruga-ui/oruga/commit/3973bb22961197a9e36d6274e2fa7cf97d6a4498))
* **docs:** fix ssr hydration error ([#680](https://github.com/oruga-ui/oruga/commit/4d8301f873efc7f6580d5cddfe84038ccd3cd0bb))



# [0.8.0](https://github.com/oruga-ui/oruga/compare/v0.7.0...v0.8.0) (2023-12-06)

### Features
* refactor all components from Option-API to Composition-API (script setup) ([#606](https://github.com/oruga-ui/oruga/issues/606))
* removed default theme from build output (use `theme-oruga` instead)
* add component types to build output
* add OrugaOptions type definition (usefull for themes) ([#632](https://github.com/oruga-ui/oruga/issues/632)) ([#663](https://github.com/oruga-ui/oruga/issues/663)) ([78df3e9](https://github.com/oruga-ui/oruga/commit/78df3e9ce35c6b146fefcf288ce94f6377654cc3))
* change `appendToBody` to `teleport` feature ([#603](https://github.com/oruga-ui/oruga/issues/603) ([#652](https://github.com/oruga-ui/oruga/issues/652)) ([d0c9824](https://github.com/oruga-ui/oruga/commit/d0c98243831b42bd320f68c9825d77c3d79cc4a0))
* rename component `inputitems` to `taginput` ([#653](https://github.com/oruga-ui/oruga/issues/653))
* change programmatic usage to `useOruga()` ([#605](https://github.com/oruga-ui/oruga/issues/605)) ([e7bdb07](https://github.com/oruga-ui/oruga/commit/e7bdb0738d94d6e4a799be1a962f80383abd90ac))
* adjust component properties (see detailed component changes)
* drop vue 2.x support 
* docs: update component props/events/slots descriptions


### Bug Fixes

* **datepicker:** fix infinity loop ([#624](https://github.com/oruga-ui/oruga/issues/624)) ([fc45dcf](https://github.com/oruga-ui/oruga/commit/fc45dcf92dfc9048d2e2301ae607190daba97d98))
* **dropdown:** fix hover on mobile agent ([#609](https://github.com/oruga-ui/oruga/issues/609)) ([#609](https://github.com/oruga-ui/oruga/issues/609)) ([4a5c0ab](https://github.com/oruga-ui/oruga/commit/4a5c0ab7cf751109ba2adf8890a75a7250c7130a))
* **select:** fix vmodel prop type ([#616](https://github.com/oruga-ui/oruga/issues/616)) ([60f67c5](https://github.com/oruga-ui/oruga/commit/60f67c55899068ef9382e8b266d7fb5940b912eb))
* **sidebar:** fix props ([#660](https://github.com/oruga-ui/oruga/issues/660)) ([6e2aa5d](https://github.com/oruga-ui/oruga/commit/6e2aa5d93db438022e2c259097c9bbdd5f232ba3))
* **skeleton:** fix item style ([#659](https://github.com/oruga-ui/oruga/issues/659)) ([3586ae4](https://github.com/oruga-ui/oruga/commit/3586ae4cbd289c6c0e39abd05436f1478aca6e5a))
* **ssr:** fix window not defined for ssr ([#669](https://github.com/oruga-ui/oruga/issues/669)) ([a64cb79](https://github.com/oruga-ui/oruga/commit/a64cb79d1e6de046c771ddf744daa2ac80634d70))
* **docs:** fix component property generation ([#658](https://github.com/oruga-ui/oruga/issues/658)) ([e98dd22](https://github.com/oruga-ui/oruga/commit/e98dd22303f758e2217b67e2cd3bde8ec35cc4d3)) ([7efc3c6](https://github.com/oruga-ui/oruga/commit/7efc3c68fd41e44bc96f969b3ef57fb08c5c2bc4))


### Detailed Component Changes

#### Autocomplete

**Changes props:**
* remove `adppendToBody` prop
* add `teleport` prop
* rename `checkInfiniteScroll` to `checkScroll` prop
* rename `customFormatter` to `formatter` prop
* remame `debounceTyping` to `debounce` prop
* add `iconRightVariant` prop
* remame `menuPosition` to `position` prop
* add `mobileModal` prop
* add `placeholder` prop

**Changes events:**
* remove `@typing` event
* add `@input` event
* remove `@infinite-scroll` event
* add `@scroll-start` event
* add `@scroll-end` event

**Changes classes:**
* remove `expandedClass` class
* remove `menuClass` class
* remove `menuPositionClass` class

#### Button

**Changes props:**
* remove `iconBoth` prop
* add `role` prop

**Changes classes:**
* rename `elementsWrapperClass` to `wrapperClass` class

#### Carousel

**Changes props:**
* rename `arrow` to `arrows` prop
* rename `arrowHover` to `arrowsHover` prop
* rename `hasDrag` to `dragable` prop
* remove `asIndicator` prop
* rename `indicator` to `indicators` prop

**Changes classes:**
* rename `sceneClass` to `wrapperClass` class
* add `itemClickableClass` class

#### Checkbox

**Changes props:**
* add `useHtml5Validation` prop

**Changes events:**
* add `@update:indeterminate` event
* add `@focus` event
* add `@blur` event
* add `@invalid` event

**Changes classes:**
* rename `checkClass` to `inputClass` class
* rename `checkCheckedClass` to `inputCheckedClass` class
* rename `checkIndeterminateClass` to `indeterminateClass` class

#### Collapse

**Changes props:**
* rename `ariaId` to `contentId` prop

#### Datepicker

**Changes props:**
* remove `adppendToBody` prop
* add `teleport` prop
* add `active` prop
* remove `autocomplete` prop
* remove `maxlength` prop
* remove `editable` prop
* add `readonly` prop
* remove `statusIcon` prop

**Changes events:**
* add `@icon-click` event
* rename `@active-change` to `@update:active` event

**Changes classes:**
* remove `monthCellInvisibleClass` class
* remove `monthCellNearbyClass` class
* add `monthCellWithinHoveredRangeClass` class
* remove `monthRowClass` class
* add `monthTableClass` class
* rename `nextBtnClass` to `nextButtonClass` class
* rename `prevBtnClass` to `prevButtonClass` class

#### Datetimepicker

**Changes props:**
* add `active` prop
* remove `autocomplete` prop
* remove `maxlength` prop
* remove `editable` prop
* add `readonly` prop
* remove `statusIcon` prop

**Changes events:**
* add `@icon-click` event
* rename `@active-change` to `@update:active` event
* add `@range-start` event
* add `@range-end` event

#### Dropdown

**Changes props:**
* add `active` prop
* remove `adppendToBody` prop
* add `teleport` prop
* remove `appendToBodyCopyParent` prop
* add `checkScroll` prop
* rename `canClose` to `closeable` prop
* remove `closeOnClick` prop (merged into closeable)
* add `delay` prop
* rename `triggerTabindex` to `tabindex` prop
* add `triggerTag` prop

**Changes events:**
* rename `@active-change` to `@update:active` event
* add `@close` event
* add `@scroll-start` event
* add `@scroll-end` event

**Changes classes:**
* add `teleportClass` class

#### Dropdown Item

**Changes classes:**
* add `itemClickableClass` class

#### Input

**Changes props:**
* add `disabled` prop
* rename `hasCoutner` to `counter` prop

#### Loading

**Changes props:**
* rename `canCancel` to `cancelable` prop
* add `label` prop

**Changes events:**
* add `@update:full-page` event

**Changes classes:**
* add `labelClass` class

#### Menu
* merge `Menu` and `MenuList` component

**Changes props:**
* rename `size` to `iconSize` prop 

#### Modal

**Changes props:**
* rename `canCancel` to `cancelable` prop
* add `container` prop
* add `teleport` prop

**Changes classes:**
* add `activeClass` class

#### Notification

**Changes props:**
* remove `autoClose` prop
* remove `hasIcon` prop
* rename `indefinite` to `infinite` prop

#### Pagination

**Changes events:**
* remove `@update:active` event

**Changes classes:**
* rename `nextBtnClass` to `nextButtonClass` class
* rename `prevBtnClass` to `prevButtonClass` class

#### Radio

**Changes props:**
* add `autocomplete` prop
* add `useHtml5Validation` prop

**Changes events:**
* add `@focus` event
* add `@blur` event
* add `@invalid` event

**Changes classes:**
* rename `checkCheckedClass` to `inputCheckedClass` class
* rename `checkClass` to `inputClass` class

#### Select

**Changes props:**
* add `iconClickable` prop
* remove `maxlength` prop
* add `iconRightClickable` prop
* add `iconRightVariant` prop
* add `options` prop

**Changes events:**
* add `@icon-click` event
* add `@icon-right-click` event

#### Sidebar

**Changes props:**
* rename `open` to `active` prop
* add `animation` prop
* rename `canCancel` to `cancelable` prop
* add `component` prop
* add `container` prop
* add `events` prop
* add `props` prop
* add `teleport` prop
* add `destroyOnHide` prop
* add `inline` prop
* add `onClose` prop
* changed how `position` prop is working
* remove `right` prop
* remove `expandOnHoverFixed` prop

**Changes events:**
* rename `@update:open` to `@update:active` event

**Changes classes:**
* add `activeClass` class
* remove `absoluteClass` class
* remove `fixedClass` class
* remove `staticClass` class
* add `positionClass` class
* remove `rightClass` class
* remove `expandOnHoverFixedClass` class
* add `noScrollClass` class
* add `scrollClipClass` class
* add `teleportClass` class
* add `inlineClass` class

#### Steps

**Changes props:**
* add `position` prop
* add `size` prop
* add `variant` prop

**Changes classes:**
* add `sizeClass` class

#### StepItem

**Changes props:**
* add `ariaRole` prop
* add `icon` prop
* add `iconPack` prop
* add `label` prop
* add `tag` prop
* add `value` prop
* add `visible` prop

**Changes events:**
* add `@activate` event
* add `@deactivate` event

#### Switch

**Changes props:**
* add `autocomplete` prop
* add `useHtml5Validation` 

**Changes events:**
* add `@input` event
* add `@focus` event
* add `@blur` event
* add `@invalid` event

**Changes classes:**
* rename `checkClass` to `switchClass` class
* rename `checkCheckedClass` to `switchCheckedClass` class
* rename `checkSwitchClass` to `switchCheckClass` class
* add `inputCheckedClass` class

#### Table

**Changes props:**
* add `paginationSimple` prop

**Changes classes:**
* add `thSubheadingClass`class 

TableColumn

**Changes props:**
* remove `customKey` prop

#### Tabs

**Changes props:**
* add `position` prop
* add `size` prop
* add `variant` prop
* add `vertical` prop

**Changes events:**
* add `@update:modelValue` event
* add `@change` event

**Changes classes:**
* rename `tabItemWrapperClass` to `itemWrapperClass` class
* add `transitioningClass` class

#### TabItem

**Changes props:**
* add `ariaRole` prop
* add `icon` prop
* add `iconPack` prop
* add `label` prop
* add `value` prop
* add `visible` prop

**Changes events:**
* add `@activate` event
* add `@deactivate` event

#### Taginput (old inputitems):
* rename `inputitems` component into `taginput` 

**Changes props:**
* remove `adppendToBody` prop
* add `teleport` prop
* rename `checkInfiniteScroll` to `checkScroll` prop
* add `keepOpen` prop
* rename `onPasteSeparators` to `separators`  prop
* remove `rounded` prop
* remove `statusIcon` prop
* rename `hasCoutner` to `counter` prop

**Changes events:**
* add `@scroll-start` event
* add `@scroll-end` event
* add `@icon-click` event
* rename `@typing` to `@input` event

#### Timepicker

**Changes props:**
* add `active` prop
* remove `adppendToBody` prop
* add `teleport` prop
* remove `autocomplete` prop
* remove `maxlength` prop
* add `closeOnClick` prop
* remove `editable` prop
* add `iconRight` prop
* add `iconRightClickable` prop
* add `locale` prop
* add `mobileModal` prop
* add `readonly` prop
* remove `statusIcon` prop
* add `trapFocus` prop

**Changes events:**
* add `@icon-click` event
* add `@icon-right-click` event
* add `@update-active` event

#### Tooltip

**Changes props:**
* remove `animated` prop
* remove `adppendToBody` prop
* add `teleport` prop
* remove `autoClose` prop
* add `closeable` prop
* add `disabled` prop
* add `triggerTag` prop

**Changes events:**
* add `@update:active` event

**Changes classes:**
* rename `arrowOrderClass` to `arrowPositionClass` class
* rename `orderClass` to `positionClass` class
* add `teleport` class

#### Upload

**Changes props:**
* remove `autocomplete` prop
* remove `maxlength` prop
* remove `icon` prop
* remove `iconPack` prop
* remove `rounded` prop
* remove `statusIcon` prop


# [0.7.0](https://github.com/oruga-ui/oruga/compare/v0.6.0...v0.7.0) (2023-09-20)


### Bug Fixes

* **autocomplete:** add missing emit and wrong event name 'select-footer' ([3b19d54](https://github.com/oruga-ui/oruga/commit/3b19d54501a54166a3e743bceee37f70e73700f1))
* **autocomplete:** use dynamic component  ([d0b9096](https://github.com/oruga-ui/oruga/commit/d0b909684adbdead878cecc53e7e5345addc3483))
* **input:** better support input type=number ([#528](https://github.com/oruga-ui/oruga/issues/528)) ([f01f591](https://github.com/oruga-ui/oruga/commit/f01f5917d58646b96b2d6268931357b1727b992d))
* **oruga-next:** provide node subpath exports ([#520](https://github.com/oruga-ui/oruga/issues/520)) ([00770a9](https://github.com/oruga-ui/oruga/commit/00770a9e6d1a9b74c496d1d30d56436ae550c2ed))
* **radio:** add checkedClass prop ([2a632a5](https://github.com/oruga-ui/oruga/commit/2a632a5d83b902bb40d6547bb52ad62206b9d0d6))
* remove console.log statement in ModalProgrammatic ([428d08f](https://github.com/oruga-ui/oruga/commit/428d08fa5ab631d06cbe30a8256639c8aa04d291))
* **table:** fix missing paginationSize ([#584](https://github.com/oruga-ui/oruga/issues/584)) ([3f7a692](https://github.com/oruga-ui/oruga/commit/3f7a692d0a2570731da0a02a5a9595b03cbf2717))
* **table:** fix pagination size prop ([126aba4](https://github.com/oruga-ui/oruga/commit/126aba420d7b0635e8d1c9aec1202ab1bf2eab20))


### Features

* add a way to style step dividers  ([#555](https://github.com/oruga-ui/oruga/issues/555)) ([4915c4d](https://github.com/oruga-ui/oruga/commit/4915c4dbcb1a6c2cd39bc7660d41916b330bc0cd))
* add component to tag prop types  ([7c62f2b](https://github.com/oruga-ui/oruga/commit/7c62f2b7daf7fdc364bacccb1f9be9de2ff10f3f))
* add the clearIcon prop to input and autocomplete  ([a33ee8e](https://github.com/oruga-ui/oruga/commit/a33ee8ec11b69df218c17f388b4202947d473164))
* **label:** add several label props  ([22bdd03](https://github.com/oruga-ui/oruga/commit/22bdd03db029ce70b6eda1df87d1d6d24c3c3002))
* **pagination:** add itemClass prop ([3659e50](https://github.com/oruga-ui/oruga/commit/3659e50d45d61a44b833b050b09119e5a677de3f))
* **table:** add checkbox-variant prop ([8821624](https://github.com/oruga-ui/oruga/commit/8821624335c2f7d197706d7d2f35858135fe0bf0))



## [0.6.0](https://github.com/oruga-ui/oruga/compare/v0.5.10...v0.6.0) (2023-04-25)

### Breaking changes :exclamation:

* inputitems: `autocomplete` -> `allow-autocomplete`
* refactor form validation

### Bug Fixes

* button-rounded-border-radius variable  ([26e90af](https://github.com/oruga-ui/oruga/commit/26e90afa773b751fe7d229c45dc6f9923abe641e)) (@fabiiomiiguel)
* **checkbox:** missing checkedClass prop definition [#467](https://github.com/oruga-ui/oruga/issues/467) ([5eed80d](https://github.com/oruga-ui/oruga/commit/5eed80deb9e076794603fd22067d1231d89c1bbd))
* **checkbox:** use background-color attribute  ([69a3d0f](https://github.com/oruga-ui/oruga/commit/69a3d0f45149221939d07fd8556535f74e2269b2)) (@area73)
* **inputitems:** [#493](https://github.com/oruga-ui/oruga/issues/493) set icon pack of close icon ([31a75ee](https://github.com/oruga-ui/oruga/commit/31a75eeaf5f7e99eda796d4e0f97056682f329b5))
* **switch:** add role "switch" ([f322e9c](https://github.com/oruga-ui/oruga/commit/f322e9cd9ddbd92017753762f247833fef3d470d)) (@didaquis)
* **table:** [#465](https://github.com/oruga-ui/oruga/issues/465) td-attrs compute when infinite scroll or backend-filtering ([aa50c60](https://github.com/oruga-ui/oruga/commit/aa50c6060bfb870b6dd729100389d32f7962e0b3))
* **table:** [#486](https://github.com/oruga-ui/oruga/issues/486) add trCheckedClass ([ff83227](https://github.com/oruga-ui/oruga/commit/ff83227a993be17e6f450c2b5b50f3cd89f8cacf))


### Features

* add loading implentation for button in vue 2 ([83955df](https://github.com/oruga-ui/oruga/commit/83955dfbdf2004ef4c3d4336e9d77e2415ce90d2))
* add loading props for button ([001b60b](https://github.com/oruga-ui/oruga/commit/001b60b303e7f96860aa69680ea1664c957bbd06)) (@themodernpk)
* add typescript support and testing ([92cffed](https://github.com/oruga-ui/oruga/commit/92cffedc49824147a48a669c4dd1ee82f6098f31))
* allow to set background color on outlined button ([#514](https://github.com/oruga-ui/oruga/issues/514)) ([8f90b84](https://github.com/oruga-ui/oruga/commit/8f90b84286fd54e9cd87e68750730b7936f10a24)) (@fabiiomiiguel)
* make controls respond to the invalid event ([ca3626c](https://github.com/oruga-ui/oruga/commit/ca3626ca6c450ccd201847892f52a64a0c2e917d)) (@blm768)
* **table:** [#494](https://github.com/oruga-ui/oruga/issues/494) add paginationSize prop ([db70c0d](https://github.com/oruga-ui/oruga/commit/db70c0dbcb58007d78d8f0755ef1499194ea9273))
* **table:** add slot `preheader` ([93c6521](https://github.com/oruga-ui/oruga/commit/93c6521fabf0b55f98668caf9db8c984ec235540)) (@subdavis)



## [0.5.10](https://github.com/oruga-ui/oruga/compare/v0.5.9...v0.5.10) (2022-12-22)


### Bug Fixes

* **select:** pass autocomplete prop through ([#452](https://github.com/oruga-ui/oruga/issues/452)) ([edea7ed](https://github.com/oruga-ui/oruga/commit/edea7ed8f0ce509b6c30d4cf4dc1efd98cc6b6dd))
* **table:** avoid set width when mobile cards [#465](https://github.com/oruga-ui/oruga/issues/465) ([9aaabf0](https://github.com/oruga-ui/oruga/commit/9aaabf0fef3f651e08c38bd70b4c2cbe5a388de9))
* **theme:** [#432](https://github.com/oruga-ui/oruga/issues/432) remove outline none ([220db52](https://github.com/oruga-ui/oruga/commit/220db52f92c2fc6787f2be84fbe6e4d4aa388a5d))
* **tooltip:** add missing !default to tooltip-content-multiline-width SCSS var ([c553764](https://github.com/oruga-ui/oruga/commit/c5537645d9dd9a9406db5b0d25d62a0bee8612b6))


### Features

* **pagination:** allow setting default order  ([751190d](https://github.com/oruga-ui/oruga/commit/751190d007b13af9b6f3e43d291090cd64ad46e0))
* **tabs:** [#446](https://github.com/oruga-ui/oruga/issues/446) set tabindex=0 on active tab ([b0e0d0a](https://github.com/oruga-ui/oruga/commit/b0e0d0ae6a054331a256db93c7ffff2948caaf19))



