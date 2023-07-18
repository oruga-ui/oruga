---
title: Loading
---

# Loading

<div class="vp-doc">

> A simple loading overlay

<Carbon />
</div>

<div class="vp-doc">

## Examples

<example-loading />

</div>
<div class="vp-doc">

## Class props

<inspector-loading-viewer />

</div>

<div class="vp-doc">

## Loading Component

### Props

| Prop name    | Description                                                                      | Type                      | Values | Default                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------- | ------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| active       | Whether loading is active or not, use v-model:active to make it two-way binding  | boolean                   | -      |                                                                                                                                          |
| animation    |                                                                                  | string                    | -      | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> loading: {<br>&nbsp;&nbsp;animation: 'fade'<br>}</code> |
| canCancel    | Can close Loading by pressing escape or clicking outside                         | boolean                   | -      | false                                                                                                                                    |
| container    |                                                                                  | object\|func\|HTMLElement | -      |                                                                                                                                          |
| fullPage     | Loader will overlay the full page                                                | boolean                   | -      | true                                                                                                                                     |
| icon         | Icon name                                                                        | string                    | -      | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> loading: {<br>&nbsp;&nbsp;icon: 'loading'<br>}</code>   |
| iconSize     |                                                                                  | string                    | -      | 'medium'                                                                                                                                 |
| iconSpin     | Enable spin effect on icon                                                       | boolean                   | -      | true                                                                                                                                     |
| onCancel     | Callback function to call after user canceled (pressed escape / clicked outside) | func                      | -      | Default function (see source code)                                                                                                       |
| override     |                                                                                  | boolean                   | -      |                                                                                                                                          |
| programmatic |                                                                                  | object                    | -      |                                                                                                                                          |
| promise      |                                                                                  | Promise                   | -      |                                                                                                                                          |

## Events

| Event name       | Properties | Description |
| ---------------- | ---------- | ----------- |
| update:active    |            |
| close            |            |
| update:full-page |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>
<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $loading-overlay-legacy | #7f7f7f !default |
| $loading-overlay | rgba(255,255,255,0.5) !default |
| $loading-zindex | 29 !default |
| $loading-fullpage-zindex | 999 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_loading.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $loading-overlay-legacy | #7f7f7f !default |
| $loading-overlay | rgba(255,255,255,0.5) !default |
| $loading-zindex | 29 !default |
| $loading-fullpage-zindex | 999 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_loading.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $loading-zindex | $zindex-sticky !default |
| $loading-zindex-fullpage | $zindex-fixed !default |
| $loading-overlay | rgba(255, 255, 255, 0.5) !default |

📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_loading.scss)

</div>

</div>
