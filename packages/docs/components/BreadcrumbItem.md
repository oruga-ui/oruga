---
title: BreadcrumbItem
---

# BreadcrumbItem

<div class="vp-doc">

</div>

<div class="vp-example">

## Examples

<example-breadcrumbitem />

</div>
<div class="vp-example">

## Class props

<inspector-breadcrumbitem-viewer />

</div>

<div class="vp-doc">

## BreadcrumbItem component

```html
<o-breadcrumb-item></o-breadcrumb-item>
```

### Props

| Prop name | Description                    | Type   | Values                                                                   | Default                                                                                                                                              |
| --------- | ------------------------------ | ------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| active    |                                | string | -                                                                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>  |
| disabled  | Button tag name                | string | `button`, `a`, `input`, `router-link`, `nuxt-link (or other nuxt alias)` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>  |
| iconLeft  | Icon name to show on the left  | string | -                                                                        |                                                                                                                                                      |
| iconPack  | Icon pack to use               | string | `mdi`, `fa`, `fas and any other custom icon pack`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| iconRight | Icon name to show on the right | string | -                                                                        |                                                                                                                                                      |
| tag       |                                | string | -                                                                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>  |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>

<div class="vp-doc">

</div>
