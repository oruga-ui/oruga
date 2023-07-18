---
title: Tabs
---

# Tabs

<div class="vp-doc">

> Responsive horizontal navigation tabs, switch between contents with ease

<Carbon />
</div>

<div class="vp-doc">

## Examples

<example-tabs />

</div>
<div class="vp-doc">

## Class props

<inspector-tabs-viewer />

</div>

<div class="vp-doc">

## Tabs Component

### Props

| Prop name | Description                                     | Type    | Values            | Default                                                                                                                                        |
| --------- | ----------------------------------------------- | ------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| animated  | Tab will have an animation                      | boolean | -                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> tabs: {<br>&nbsp;&nbsp;animated: true<br>}</code> |
| expanded  | Tabs will be expanded (full-width)              | boolean | -                 |                                                                                                                                                |
| multiline | Show tab items multiline when there is no space | boolean | -                 |                                                                                                                                                |
| override  |                                                 | boolean | -                 |                                                                                                                                                |
| type      | Tab type                                        | string  | `boxed`, `toggle` | 'default'                                                                                                                                      |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| start   |             |          |
| end     |             |          |
| default |             |          |

</div>

<div class="vp-doc">

## TabItem Component

### Props

| Prop name | Description           | Type                | Values | Default                                                                                                                                           |
| --------- | --------------------- | ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| disabled  | Item will be disabled | boolean             | -      |                                                                                                                                                   |
| override  |                       | boolean             | -      |                                                                                                                                                   |
| tag       | Tabs item tag name    | string \| Component | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> tabs: {<br>&nbsp;&nbsp;itemTag: 'button'<br>}</code> |

</div>

<div class="vp-doc">

</div>
<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $tabs-disabled-opacity | $base-disabled-opacity !default |
| $tabs-font-size | $base-font-size !default |
| $tabs-icon-margin | 0.5em !default |
| $tabs-content-padding | 1rem !default |
| $tabs-margin-bottom | 1.5rem !default |
| $tabs-border-bottom-color | $grey-lighter !default |
| $tabs-border-bottom-style | solid !default |
| $tabs-border-bottom-width | 1px !default |
| $tabs-link-color | hsl(0, 0%, 29%) !default |
| $tabs-link-active-border-bottom-color | $primary !default |
| $tabs-link-active-color | $primary !default |
| $tabs-link-line-height | $base-line-height !default |
| $tabs-link-padding | 0.5em 1em !default |
| $tabs-boxed-link-radius | $base-border-radius !default |
| $tabs-boxed-link-hover-background-color | hsl(0, 0%, 96%) !default |
| $tabs-boxed-link-hover-border-bottom-color | hsl(0, 0%, 86%) !default |
| $tabs-boxed-link-active-background-color | hsl(0, 0%, 100%) !default |
| $tabs-boxed-link-active-border-color | hsl(0, 0%, 86%) !default |
| $tabs-boxed-link-active-border-bottom-color | transparent !default |
| $tabs-toggle-link-border-color | hsl(0, 0%, 86%) !default |
| $tabs-toggle-link-border-style | solid !default |
| $tabs-toggle-link-border-width | 1px !default |
| $tabs-toggle-link-hover-background-color | hsl(0, 0%, 96%) !default |
| $tabs-toggle-link-hover-border-color | hsl(0, 0%, 71%) !default |
| $tabs-toggle-link-radius | $base-border-radius !default |
| $tabs-toggle-link-active-background-color | $primary !default |
| $tabs-toggle-link-active-border-color | $primary !default |
| $tabs-toggle-link-active-color | $primary-invert !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_tabs.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $tabs-disabled-opacity | $base-disabled-opacity !default |
| $tabs-font-size | $base-font-size !default |
| $tabs-icon-margin | 0.5em !default |
| $tabs-content-padding | 1rem !default |
| $tabs-margin-bottom | 1.5rem !default |
| $tabs-border-bottom-color | $grey-lighter !default |
| $tabs-border-bottom-style | solid !default |
| $tabs-border-bottom-width | 1px !default |
| $tabs-link-color | hsl(0, 0%, 29%) !default |
| $tabs-link-active-border-bottom-color | $primary !default |
| $tabs-link-active-color | $primary !default |
| $tabs-link-line-height | $base-line-height !default |
| $tabs-link-padding | 0.5em 1em !default |
| $tabs-boxed-link-radius | $base-border-radius !default |
| $tabs-boxed-link-hover-background-color | hsl(0, 0%, 96%) !default |
| $tabs-boxed-link-hover-border-bottom-color | hsl(0, 0%, 86%) !default |
| $tabs-boxed-link-active-background-color | hsl(0, 0%, 100%) !default |
| $tabs-boxed-link-active-border-color | hsl(0, 0%, 86%) !default |
| $tabs-boxed-link-active-border-bottom-color | transparent !default |
| $tabs-toggle-link-border-color | hsl(0, 0%, 86%) !default |
| $tabs-toggle-link-border-style | solid !default |
| $tabs-toggle-link-border-width | 1px !default |
| $tabs-toggle-link-hover-background-color | hsl(0, 0%, 96%) !default |
| $tabs-toggle-link-hover-border-color | hsl(0, 0%, 71%) !default |
| $tabs-toggle-link-radius | $base-border-radius !default |
| $tabs-toggle-link-active-background-color | $primary !default |
| $tabs-toggle-link-active-border-color | $primary !default |
| $tabs-toggle-link-active-color | $primary-invert !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_tabs.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $nav-tabs-color | var(--#{$prefix}body-color) !default |
| $nav-tabs-spacer | $spacer !default |
| $nav-tabs-disabled-opacity | 0.5 !default |

📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_tabs.scss)

</div>

</div>
