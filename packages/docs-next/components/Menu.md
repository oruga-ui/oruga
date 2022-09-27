---
title: Menu
---

# Menu

<example-menu />

[//]: # (## Class props)

[//]: # ()
[//]: # (<br />)

[//]: # ()
[//]: # (<inspector-menu-viewer />)

[//]: # ()
[//]: # (<br />)

[//]: # (<br />)

## Props

### Menu

| Prop name            | Description                                         | Type    | Values | Default |
| -------------------- |-----------------------------------------------------|---------|--------|---------|
| accordion            | Close automatically the previous selected menu list | Boolean | -      | true    |
| activable            | Active automatically the clicked menu item          | Boolean | -      | true    |

### Menu List

| Prop name  | Description                                                                                                                                                 | Type    | Values | Default |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|--------|---------|
| label      | Menu list label                                                                                                                                             | String  | -      | -       |
| icon       | Icon name                                                                                                                                                   | String  | -      | -       |
| icon-pack  | Icon pack to use                                                                                                                                            | String  | -      | -       |
| aria-role  | Role attribute to be passed to list container for better accessibility. Use `menu` only in situations where your dropdown is really related to navigation.  | String  | `menu` | -       |

### Menu Item

| Prop name | Description                                                                                             | Type    | Values                                              | Default |
|-----------|---------------------------------------------------------------------------------------------------------|---------|-----------------------------------------------------|---------|
| label     | Menu item label                                                                                         | String  | -                                                   | -       |
| icon      | Icon name                                                                                               | String  | -                                                   | -       |
| icon-pack | Icon pack to use                                                                                        | String  | -                                                   | -       |
| disabled  | Item is disabled                                                                                        | Boolean | -                                                   | false   |
| active    | Item is active, use the `.sync` modifier to make it two-way binding                                     | Boolean | -                                                   | false   |
| expanded  | Item is expanded when `default` contains menu items, use the .sync modifier to make it two-way binding  | Boolean | -                                                   | false   |
| animation | Custom animation (transition name)                                                                      | String  | -                                                   | `fade`  |
| tag       | Item tag name                                                                                           | String  | `a`, `router-link`, `nuxt-link` or other nuxt alias | `a`     |
| aria-role | Item is active, use the `.sync` modifier to make it two-way binding                                     | String  | `menu-item`                                         | -       |

## Slots

### Menu

| Name    | Description        | Bindings |
| ------- |--------------------| -------- |
| default | Menu list elements |          |

### Menu List

| Name    | Description            | Bindings |
|---------|------------------------| -------- |
| default | Menu item elements     |          |
| label   | Menu list custom label |          |

### Menu Item

| Name    | Description            | Bindings |
|---------|------------------------| -------- |
| default | Menu item body         |          |
| label   | Menu item custom label |          |


## Style

| CSS Variable                              | SASS Variable                       | Default            |
|-------------------------------------------|-------------------------------------|--------------------|
| --oruga-menu-font-size-small              | \$sizes['small']                    |                    |
| --oruga-menu-font-size-medium             | \$sizes['medium']                   |                    |
| --oruga-menu-font-size-large              | \$sizes['large']                    |                    |
| --oruga-menu-list-line-height             | \$menu-list-line-height             | 1.25em             |
| --oruga-menu-list-border-left             | \$menu-list-border-left             | 1px solid $primary |
| --oruga-menu-nested-list-padding-left     | \$menu-nested-list-padding-left     | .75em              |
| --oruga-menu-nested-list-margin           | \$menu-nested-list-margin           | .75em              |
| --oruga-menu-label-color                  | \$menu-label-color                  | $grey              |
| --oruga-menu-label-font-size              | \$menu-label-font-size              | .75em              |
| --oruga-menu-label-spacing                | \$menu-label-spacing                | 1em                |
| --oruga-menu-item-color                   | \$menu-item-color                   | $grey-dark         |
| --oruga-menu-item-padding                 | \$menu-item-padding                 | 0.5em 0.75em       |
| --oruga-menu-item-hover-color             | \$menu-item-hover-color             | $black             |
| --oruga-menu-item-hover-background-color  | \$menu-item-hover-background-color  | $grey-light        |
| --oruga-menu-item-active-color            | \$menu-item-active-color            | $primary-invert    |
| --oruga-menu-item-active-background-color | \$menu-item-active-background-color | $primary           |
| --oruga-menu-item-disabled-color          | \$menu-item-disabled-color          | $grey-light        |

