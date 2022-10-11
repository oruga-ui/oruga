---
title: Menu
---

# Menu

> A simple vertical menu

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/menu/examples/Menu.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
    <o-menu>
        <o-menu-list label="Menu">
            <o-menu-item icon="info-circle" label="Info"></o-menu-item>
            <o-menu-item icon="cog" :active="isActive" expanded>
                <template #label="props">
                    Administrator
                    <o-icon class="is-pulled-right" :icon="props.expanded ? 'chevron-up' : 'chevron-down'"></o-icon>
                </template>
                <o-menu-item icon="user" label="Users"></o-menu-item>
                <o-menu-item icon="mobile">
                    <template #label>
                        Devices
                    </template>
                </o-menu-item>
                <o-menu-item icon="money-bill" label="Payments" disabled></o-menu-item>
            </o-menu-item>
            <o-menu-item icon="user" label="My Account">
                <o-menu-item label="Account data"></o-menu-item>
                <o-menu-item label="Addresses"></o-menu-item>
            </o-menu-item>
        </o-menu-list>
        <o-menu-list>
            <o-menu-item label="Documentation" icon="link" tag="a" target="_blank" href="/documentation/"></o-menu-item>
        </o-menu-list>
        <o-menu-list label="Actions">
            <o-menu-item label="Logout"></o-menu-item>
        </o-menu-list>
    </o-menu>
</template>

<script>
    export default {
        data() {
            return {
                isActive: true
            }
        }
    }
</script>
```

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_menu.scss)

<br />
<template>
  <div class="field">
    <inspector :inspectData="inspectData"></inspector>
  </div>
</template>

<script>
export default {
    data() {
        return {
            filtered: [
                {
                    type: 'Frameworks',
                    items: ['Vue.js']
                }
            ],
            inspectData: [
                {
                    class: "rootClass",
                    description: "Class of the root menu element",
                },
            ],
        };
    }
}
</script>

<br />
<br />

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
