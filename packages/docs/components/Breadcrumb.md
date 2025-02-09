# Breadcrumb

<div class="vp-doc">

> The classic breadcrumb, in different colors, sizes, and states

</div>

<div class="vp-example">

## Examples

<example-breadcrumb />

</div>

<div class="vp-example">

## Class props

<inspector-breadcrumb-viewer />

</div>

<div class="vp-doc">

## Breadcrumb component

> The classic breadcrumb, in different colors, sizes, and states

```html
<o-breadcrumb></o-breadcrumb>
```

### Props

| Prop name     | Description                                    | Type     | Values                      | Default    |
| ------------- | ---------------------------------------------- | -------- | --------------------------- | ---------- |
| align         | Position of breadcrumb                         | string   | `left`, `centered`, `right` | `left`     |
| override      | Override existing theme classes completely     | boolean  |                             |            |
| size          | Size of the breadcrumb                         | string   | `small`, `medium`, `large`  | `medium`   |
| tag           | Tag of the breadcrumb                          | string   | `div`, `section` ...        | `section`  |
| separator     | Separator between breadcrumb items             | string   | `has-arrow-separator`, `has-dot-separator`, `has-slash-separator`, `has-bullet-separator`, `has-succeeds-separator`, `has-chevron-separator` | `has-slash-separator` |

### Slots

| Name    | Description              | Bindings |
| ------- | ------------------------ | -------- |
| default | Display Breadcrumb items |          |

</div>

<div class="vp-doc">

## Breadcrumb item component

> The classic breadcrumb item, in different colors, icons and states

```html
<o-breadcrumb-item></o-breadcrumb-item>
```

### Props

| Prop name     | Description                                    | Type     | Values                      | Default    |
| ------------- | ---------------------------------------------- | -------- | --------------------------- | ---------- |
| active        | Active breadcrumb item                         | boolean  |                             | `false`    |
| activeVariant | Variant of active breadcrumb item              | string   | `primary`, `info`, `warning`, `danger`            | `primary`  |
| disabled      | breadcrum item is disabled                     | boolean  |                             | `false`    |
| tag           | Tag of the breadcrumb item                     | string   | `a`, `router-link`          | `a`        |
| iconLeft      | Icon name to show on the left                  | string   |                             |            |
| iconRight     | Icon name to show on the right                 | string   |                             |            |
| iconBoth      | Icon name to show on both sides                | string   |                             |            |
| iconPack      | Icon pack to use                               | string   | `mdi`, `fa`, `fas` and any other custom icon pack |            |

### Slots

| Name    | Description     | Bindings |
| ------- | --------------- | -------- |
| default | Display content |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</div>
