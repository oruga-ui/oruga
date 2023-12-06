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
* rename `contentId` to `ariaId` prop

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



