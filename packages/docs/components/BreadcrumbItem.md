# Breadcrumb Item

<div class="vp-doc">

> The classic breadrcumb item, in different colors, sizes, and states

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

> The classic breadrcumb item, in different colors, sizes, and states

```html
<o-breadcrumb-item></o-breadcrumb-item>
```

### Props

| Prop name     | Description                                                  | Type             | Values                                                      | Default                                                                                                                                                       |
| ------------- | ------------------------------------------------------------ | ---------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active        | breadcrumb item is active, works only when tag provided is a | boolean          | `true`, `false`                                             | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;active: undefined<br>}</code>        |
| activeVariant |                                                              | string           | -                                                           | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;activeVariant: undefined<br>}</code> |
| disabled      | breadcrumb item is disabled                                  | boolean          | `true`, `false`                                             | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;disabled: undefined<br>}</code>      |
| iconBoth      | Show the icon in both sides, left - right                    | boolean          | -                                                           | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                   |
| iconLeft      | Icon name to show on the left                                | string           | -                                                           |                                                                                                                                                               |
| iconPack      | Icon pack to use                                             | string           | `mdi`, `fa`, `fas and any other custom icon pack`           | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>      |
| iconRight     | Icon name to show on the right                               | string           | -                                                           |                                                                                                                                                               |
| tag           | breadcrumb item tag name                                     | DynamicComponent | `li`, `a`, `router-link`, `nuxt-link (or other nuxt alias)` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;tag: "a"<br>}</code>                 |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>

<div class="vp-doc">

</div>
