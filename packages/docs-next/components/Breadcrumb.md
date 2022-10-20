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

| Prop name | Description                    | Type    | Values                                                                          | Default   |
| --------- | ------------------------------ | ------- | ------------------------------------------------------------------------------- | --------- |
| align     | Alignement                     | string  | `left`, `center`, `right`                                                       | 'left'    |
| override  |                                | boolean | -                                                                               |           |
| separator | Available separators           | string  | `slash`, `arrow`, `bullet`, `dot`, `chevron`                                    | "slash"   |
| size      | Size of button, optional       | string  | `small`, `medium`, `large`                                                      | "medium"  |
| variant   | Color of the control, optional | string  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | "primary" |

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

| Prop name | Description                                          | Type    | Values                                            | Default |
| --------- | ---------------------------------------------------- | ------- | ------------------------------------------------- | ------- |
| active    | item when it clicked, optional                       | boolean | `false`, `true`                                   | false   |
| disabled  | an item to be useless with no click events, optional | boolean | `false`, `true`                                   | false   |
| iconLeft  | Icon name to show on the left                        | string  | -                                                 |         |
| iconPack  | Icon pack to use                                     | string  | `mdi`, `fa`, `fas and any other custom icon pack` |         |
| iconRight | Icon name to show on the right                       | string  | -                                                 |         |
| iconSize  | Icon size to show                                    | string  | -                                                 |         |
| override  |                                                      | boolean | -                                                 |         |
| tag       | HTML Tag of items, optional                          | string  | `a`, `router-link`     
                           | 'a'     |

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
| --oruga-breadcrumb-active           | \$breadcrumb-active           | #2b292a                 |
| --oruga-breadcrumb-disabled-opacity | \$breadcrumb-disabled-opacity | \$base-disabled-opacity |
