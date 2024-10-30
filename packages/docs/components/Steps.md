---
sidebarDepth: 2
---

# Steps

<div class="vp-doc">

> Responsive horizontal process steps

</div>

<div class="vp-example">

## Examples

<example-steps />

</div>
<div class="vp-example">

## Class props

<inspector-steps-viewer />

</div>

<div class="vp-doc">

## Steps component

> Responsive horizontal process steps

```html
<o-steps></o-steps>
```

### Props

| Prop name         | Description                                                                                                                   | Type                                                 | Values                                                                          | Default                                                                                                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| animateInitially  | Apply animation on the initial render                                                                                         | boolean                                              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;animateInitially: false<br>}</code>                                             |
| animated          | Step navigation is animated                                                                                                   | boolean                                              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;animated: true<br>}</code>                                                      |
| animation         | Transition animation name                                                                                                     | [string, string] \| [string, string, string, string] | `[next`, `prev]`, `[right`, `left`, `down`, `up]`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;animation: [ "slide-next", "slide-prev", "slide-down", "slide-up",]<br>}</code> |
| ariaNextLabel     | Accessibility next button aria label                                                                                          | string                                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;ariaNextLabel: "Next"<br>}</code>                                               |
| ariaPreviousLabel | Accessibility previous button aria label                                                                                      | string                                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;ariaPreviousLabel: "Previous"<br>}</code>                                       |
| destroyOnHide     | Destroy stepItem on hide                                                                                                      | boolean                                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                                         |
| hasNavigation     | Next and previous buttons below the component. You can use this property if you want to use your own custom navigation items. | boolean                                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                                                          |
| iconNext          | Icon to use for navigation button                                                                                             | string                                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;iconNext: "chevron-right"<br>}</code>                                           |
| iconPack          | Icon pack to use for the navigation                                                                                           | string                                               | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>                                                 |
| iconPrev          | Icon to use for navigation button                                                                                             | string                                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;iconPrev: "chevron-left"<br>}</code>                                            |
| labelPosition     | Position of the marker label                                                                                                  | "left" \| "right" \| "bottom"                        | `bottom`, `right`, `left`                                                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;labelPosition: "bottom"<br>}</code>                                             |
| mobileBreakpoint  | Mobile breakpoint as `max-width` value                                                                                        | string                                               | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code>                                         |
| v-model           | The selected item value, use v-model to make it two-way binding                                                               | string\|number\|object                               | -                                                                               |                                                                                                                                                                                                     |
| options           | Steps options, unnecessary when default slot is used                                                                          | OptionsProp&lt;unknown&gt;                           | -                                                                               |                                                                                                                                                                                                     |
| override          | Override existing theme classes completely                                                                                    | boolean                                              | -                                                                               |                                                                                                                                                                                                     |
| position          | Position of the step                                                                                                          | "left" \| "right" \| "centered"                      | `left`, `centered`, `right`                                                     |                                                                                                                                                                                                     |
| rounded           | Rounded step markers                                                                                                          | boolean                                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                                                          |
| size              | Step size                                                                                                                     | string                                               | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;size: undefined<br>}</code>                                                     |
| variant           | Color of the control                                                                                                          | string                                               | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>                                                  |
| vertical          | Show step in vertical layout                                                                                                  | boolean                                              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                                         |

### Events

| Event name        | Properties                                                                                                          | Description                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| update:modelValue | **value** `string \| number \| object` - updated modelValue prop                                                    | modelValue prop two-way binding |
| change            | **value** `string \| number \| object` - new step value<br/>**value** `string \| number \| object` - old step value | on step change event            |

### Slots

| Name       | Description              | Bindings                                                                                                                                                    |
| ---------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default    | Place step items here    |                                                                                                                                                             |
| navigation | Override step navigation | **previous** `{disabled: boolean, action: (): void }` - previous button configs<br/>**next** `{disabled: boolean, action: (): void }` - next button configs |

</div>

<div class="vp-doc">

## StepItem component

```html
<o-step-item></o-step-item>
```

### Props

| Prop name | Description | Type | Values | Default                                                                                                                                             |
| --------- | ----------- | ---- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaRole  |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;ariaRole: "tab"<br>}</code>     |
| clickable |             |      | -      |                                                                                                                                                     |
| component |             |      | -      |                                                                                                                                                     |
| content   |             |      | -      |                                                                                                                                                     |
| disabled  |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| events    |             |      | -      |                                                                                                                                                     |
| icon      |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>     |
| iconPack  |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| label     |             |      | -      |                                                                                                                                                     |
| override  |             |      | -      |                                                                                                                                                     |
| props     |             |      | -      |                                                                                                                                                     |
| step      |             |      | -      |                                                                                                                                                     |
| tag       |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>steps: {<br>&nbsp;&nbsp;itemTag: "button"<br>}</code>   |
| value     |             |      | -      |                                                                                                                                                     |
| variant   |             |      | -      |                                                                                                                                                     |
| visible   |             |      | -      | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                          |

### Events

| Event name | Properties | Description                   |
| ---------- | ---------- | ----------------------------- |
| activate   |            | on step item activate event   |
| deactivate |            | on step item deactivate event |

### Slots

| Name    | Description       | Bindings |
| ------- | ----------------- | -------- |
| default | Step item content |          |

</div>

<div class="vp-doc">

</div>
<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                       | Default                                      |
| ----------------------------------- | -------------------------------------------- |
| $steps-details-background-color     | hsl(0, 0%, 100%)                             |
| $steps-details-padding              | 0.2em                                        |
| $steps-marker-background            | var(--#{$prefix}grey-light)                  |
| $steps-marker-color                 | var(--#{$prefix}primary-invert)              |
| $steps-marker-border                | 0.2em solid #fff                             |
| $steps-marker-font-weight           | 700                                          |
| $steps-marker-rounded-border-radius | var( --#{$prefix}base-border-radius-rounded) |
| $steps-color                        | var(--#{$prefix}grey-lighter)                |
| $steps-previous-color               | var(--#{$prefix}primary)                     |
| $steps-active-color                 | var(--#{$prefix}primary)                     |
| $steps-divider-height               | 0.2em                                        |
| $steps-vertical-padding             | 1em 0                                        |
| $steps-item-line-height             | var(--#{$prefix}base-line-height)            |
| $steps-link-color                   | hsl(0, 0%, 29%)                              |
| $steps-content-padding              | 1rem                                         |
| $steps-font-size                    | var(--#{$prefix}base-font-size)              |
| $steps-details-title-font-weight    | 600                                          |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_steps.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                   | Default                             |
| ------------------------------- | ----------------------------------- |
| $steps-colors                   | var.$colors                         |
| $steps-mobile-breakpoint        | vars.$tablet                        |
| $steps-marker-background        | css.getVar("grey-light")            |
| $steps-marker-color             | css.getVar("scheme-main")           |
| $steps-marker-border            | 0.2em solid css.getVar("white")     |
| $steps-default-color            | css.getVar("grey-lighter")          |
| $steps-previous-color           | css.getVar("scheme-main")           |
| $steps-previous-background      | css.getVar("primary")               |
| $steps-active-color             | css.getVar("primary")               |
| $steps-active-background        | css.getVar("scheme-main")           |
| $steps-divider-height           | 0.2em                               |
| $steps-details-background-color | css.getVar("body-background-color") |
| $steps-vertical-padding         | 1em 0                               |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_steps.scss)

</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable           | Default                     |
| ----------------------- | --------------------------- |
| $steps-marker-bg        | var(--#{$prefix}gray-light) |
| $steps-marker-border    | var(--#{$prefix}white)      |
| $steps-marker-color     | var(--#{$prefix}white)      |
| $steps-color-active     | var(--#{$prefix}primary)    |
| $steps-title-color      | var(--#{$prefix}dark)       |
| $steps-title-bg         | var(--#{$prefix}white)      |
| $steps-divider-height   | 0.2em                       |
| $steps-content-spacer   | 1rem                        |
| $steps-content-padding  | 1rem                        |
| $steps-vertical-padding | 1em 0                       |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_steps.scss)

</div>

</div>
