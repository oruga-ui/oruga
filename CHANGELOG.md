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



