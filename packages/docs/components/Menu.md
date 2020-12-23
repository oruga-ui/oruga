---
title: Menu
---

# Menu

> Responsive menu

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/menu/examples/Menu.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <div>
    <o-menu>
      <o-menu-list label="Menu">
        <o-menu-item icon-pack="fas" icon="info-circle" label="Info"></o-menu-item>
        <o-menu-item icon-pack="fas" icon="cogs" :active="isActive">
          <template slot="label" slot-scope="props">
            Administrator
            <o-icon pack="fas" :icon="props.expanded ? 'chevron-down' : 'chevron-up'" class="is-pulled-right"></o-icon>
          </template>
          <o-menu-item icon-pack="fas" icon="user-circle" label="Users"></o-menu-item>
          <o-menu-item icon-pack="fas" icon="desktop">
            <template slot="label">
              Devices
              <o-dropdown aria-role="list" class="is-pulled-right" position="bottom-left">
                <div slot="trigger">
                  <o-icon pack="fas" icon="ellipsis-v"></o-icon>
                </div>
                <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
                <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
                <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
              </o-dropdown>
            </template>
          </o-menu-item>
          <o-menu-item icon-pack="fas" icon="money-bill-alt" label="Payments" disabled></o-menu-item>
        </o-menu-item>
        <o-menu-item icon-pack="fas" icon="user-circle" label="My Account">
          <o-menu-item label="Account data"></o-menu-item>
          <o-menu-item label="Addresses"></o-menu-item>
        </o-menu-item>
        <o-menu-item label="Expo" icon-pack="fas" icon="link" target="_blank" href="/components/Menu.html#examples"></o-menu-item>
      </o-menu-list>
      <o-menu-list label="Actions">
        <o-menu-item label="Logout"></o-menu-item>
      </o-menu-list>
    </o-menu>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data() {
      return {
        isActive: true
      }
    }
  }
</script>
```

:::

## Props

| Prop name | Description | Type    | Values | Default |
| --------- | ----------- | ------- | ------ | ------- |
| accordion |             | boolean | -      | true    |
| activable |             | boolean | -      | true    |

## Class props

| Prop name | Description | Type | Values | Default |
| --------- | ----------- | ---- | ------ | ------- |


### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

# OMenuItem

## Props

| Prop name | Description | Type    | Values | Default    |
| --------- | ----------- | ------- | ------ | ---------- |
| label     |             | string  | -      |            |
| v-model   |             | boolean | -      |            |
| expanded  |             | boolean | -      |            |
| disabled  |             | boolean | -      |            |
| iconPack  |             | string  | -      |            |
| icon      |             | string  | -      |            |
| animation |             | string  | -      | 'slide'    |
| tag       |             | string  | -      | 'a'        |
| ariaRole  |             | string  | -      | ''         |
| size      |             | string  | -      | 'is-small' |

## Class props

| Prop name | Description | Type | Values | Default |
| --------- | ----------- | ---- | ------ | ------- |


### Events

| Event name      | Type      | Description |
| --------------- | --------- | ----------- |
| update:expanded | undefined |
| update:active   | undefined |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                              | SASS Variable                       | Default              |
| ----------------------------------------- | ----------------------------------- | -------------------- |
| --oruga-menu-item-color                   | \$menu-item-color                   | \$black              |
| --oruga-menu-item-radius                  | \$menu-item-radius                  | \$base-border-radius |
| --oruga-menu-item-hover-color             | \$menu-item-hover-color             | \$black              |
| --oruga-menu-item-hover-background-color  | \$menu-item-hover-background-color  | \$grey-light         |
| --oruga-menu-item-active-color            | \$menu-item-active-color            | \$primary-invert     |
| --oruga-menu-item-active-background-color | \$menu-item-active-background-color | \$primary            |
| --oruga-menu-list-border-left             | \$menu-list-border-left             | 1px solid \$primary  |
| --oruga-menu-list-line-height             | \$menu-list-line-height             | 1.25                 |
| --oruga-menu-list-link-padding            | \$menu-list-link-padding            | 0.5em 0.75em         |
| --oruga-menu-nested-list-margin           | \$menu-nested-list-margin           | 0.75em               |
| --oruga-menu-nested-list-padding-left     | \$menu-nested-list-padding-left     | 0.75em               |
| --oruga-menu-label-color                  | \$menu-label-color                  | \$black              |
| --oruga-menu-label-font-size              | \$menu-label-font-size              | 0.75em               |
| --oruga-menu-label-letter-spacing         | \$menu-label-letter-spacing         | 0.1em                |
| --oruga-menu-label-spacing                | \$menu-label-spacing                | 1em                  |
