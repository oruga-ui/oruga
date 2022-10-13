---
title: Breadcrumb
---

# Breadcrumb

> The classic breadcrumb, in different colors, sizes, and states

<example-breadcrumb />

## Class props

<br />

<inspector-breadcrumb-viewer />

<br />
<br />

## Props

| Prop name | Description                    | Type    | Values                                                                          | Default |
| --------- | ------------------------------ | ------- | ------------------------------------------------------------------------------- | ------- |
| iconBoth  |                                | boolean | -                                                                               |         |
| iconLeft  | Icon name to show on the left  | string  | -                                                                               |         |
| iconPack  | Icon pack to use               | string  | `mdi`, `fa`, `fas and any other custom icon pack`                               |         |
| iconRight | Icon name to show on the right | string  | -                                                                               |         |
| override  |                                | boolean | -                                                                               |         |
| size      | Size of button, optional       | string  | `small`, `medium`, `large`                                                      |         |
| variant   | Color of the control, optional | string  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |         |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

# Breadcrumb Item

<example-breadcrumbitem />

## Class props

<br />

<inspector-breadcrumbitem-viewer />

<br />
<br />

## Props

| Prop name | Description                                          | Type    | Values             | Default |
| --------- | ---------------------------------------------------- | ------- | ------------------ | ------- |
| active    | item when it clicked, optional                       | boolean | `false`, `true`    | false   |
| disabled  | an item to be useless with no click events, optional | boolean | `false`, `true`    | false   |
| tag       | HTML Tag of items, optional                          | string  | `a`, `router-link` | 'a'     |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__breadcrumb.scss.scss)

| CSS Variable                        | SASS Variable                 | Default                 |
| ----------------------------------- | ----------------------------- | ----------------------- |
| --oruga-breadcrumb-color            | \$breadcrumb-color            | \$primary               |
| --oruga-breadcrumb-cursor           | \$breadcrumb-cursor           | pointer                 |
| --oruga-breadcrumb-font-weight      | \$breadcrumb-font-weight      | 400                     |
| --oruga-breadcrumb-active           | \$breadcrumb-active           | black                   |
| --oruga-breadcrumb-disabled-opacity | \$breadcrumb-disabled-opacity | \$base-disabled-opacity |
