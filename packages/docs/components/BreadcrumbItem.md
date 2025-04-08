# Breadcrumb Item

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

> The classic breadrcumb item, in different colors, sizes, and states

```html
<o-breadcrumb-item></o-breadcrumb-item>
```

### Props

| Prop name     | Description                                                  | Type             | Values                                                      | Default                                                                                                                                                       |
| ------------- | ------------------------------------------------------------ | ---------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active        | breadcrumb item is active, works only when tag provided is a | boolean          | `true`, `false`                                             | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;active: false<br>}</code>            |
| activeVariant | Active color, works only when tag provided is a              | string           | `primary`, `success`, `warning`, `danger`                   | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;activeVariant: "primary"<br>}</code> |
| disabled      | breadcrumb item is disabled                                  | boolean          | `true`, `false`                                             | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;disabled: false<br>}</code>          |
| iconLeft      | Icon name to show on the left                                | string           | -                                                           |                                                                                                                                                               |
| iconPack      | Icon pack to use                                             | string           | `mdi`, `fa`, `fas and any other custom icon pack`           | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                        |
| iconRight     | Icon name to show on the right                               | string           | -                                                           |                                                                                                                                                               |
| override      | Override existing theme classes completely                   | boolean          | -                                                           |                                                                                                                                                               |
| tag           | breadcrumb item tag name                                     | DynamicComponent | `li`, `a`, `router-link`, `nuxt-link (or other nuxt alias)` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>breadcrumb: {<br>&nbsp;&nbsp;tag: "a"<br>}</code>                 |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>
