---
title: Dropdown
---

# Dropdown

> Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content

---

## Examples

### Base

::: demo

```html
<template>
  <section>
    <o-dropdown aria-role="list">
      <o-button variant="primary" slot="trigger" slot-scope="{ active }">
        <span>Click me!</span>
        <o-icon :icon="active ? 'caret-up' : 'caret-down'"></o-icon>
      </o-button>

      <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
      <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
      <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
    </o-dropdown>

    <o-dropdown hoverable aria-role="list">
      <o-button variant="info" slot="trigger">
        <span>Hover me!</span>
        <o-icon icon="caret-down"></o-icon>
      </o-button>

      <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
      <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
      <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
    </o-dropdown>

    <o-dropdown disabled aria-role="list">
      <o-button class="o-button" slot="trigger">
        <span>Disabled</span>
        <o-icon icon="caret-down"></o-icon>
      </o-button>

      <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
      <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
      <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
    </o-dropdown>

    <o-dropdown aria-role="list">
      <div slot="trigger">
        Custom
        <o-icon
          variant="success"
          icon="caret-down"
          slot="trigger"
          role="button"
        >
        </o-icon>
      </div>

      <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
      <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
      <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
    </o-dropdown>
  </section>
</template>

<script>
  export default {};
</script>
```

:::

### Multiple

::: demo

```html
<template>
  <section>
    <p class="content"><b>selected</b>: {{ selectedOptions }}</p>
    <o-dropdown v-model="selectedOptions" multiple aria-role="list">
      <o-button variant="primary" type="button" slot="trigger">
        <span>Selected ({{ selectedOptions.length }})</span>
        <o-icon icon="caret-down"></o-icon>
      </o-button>

      <o-dropdown-item value="option1" aria-role="listitem">
        <span>Option 1</span>
      </o-dropdown-item>

      <o-dropdown-item value="option2" aria-role="listitem">
        <span>Option 2</span>
      </o-dropdown-item>

      <o-dropdown-item value="option3" aria-role="listitem">
        <span>Option 3</span>
      </o-dropdown-item>
    </o-dropdown>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        selectedOptions: []
      };
    }
  };
</script>
```

:::

### Scrollable

::: demo

```html
<template>
  <section>
    <div class="block">
      <o-field>
        <div class="control">
          <o-switch v-model="isScrollable">Scrollable</o-switch>
        </div>
      </o-field>
    </div>

    <br />

    <o-dropdown
      :scrollable="isScrollable"
      :max-height="maxHeight"
      v-model="currentMenu"
      aria-role="list"
    >
      <o-button variant="primary" type="button" slot="trigger">
        <template>
          <o-icon :icon="currentMenu.icon"></o-icon>
          <span>{{currentMenu.text}}</span>
        </template>
        <o-icon icon="caret-down"></o-icon>
      </o-button>

      <o-dropdown-item
        v-for="(menu, index) in menus"
        :key="index"
        :value="menu"
        aria-role="listitem"
      >
        <div class="media">
          <o-icon class="media-left" :icon="menu.icon"></o-icon>
          <div class="media-content">
            <span>{{menu.text}}</span>
          </div>
        </div>
      </o-dropdown-item>
    </o-dropdown>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        isScrollable: true,
        maxHeight: 200,
        currentMenu: { icon: "users", text: "People" },
        menus: [
          { icon: "users", text: "People" },
          { icon: "box", text: "Orders" },
          { icon: "credit-card", text: "Payments" },
          { icon: "dolly", text: "Logistics" },
          { icon: "business-time", text: "Jobs" },
          { icon: "shopping-cart", text: "Cart" },
          { icon: "cog", text: "Configuration" }
        ]
      };
    }
  };
</script>

<style>
  .media {
    align-items: flex-start;
    display: flex;
    text-align: left;
  }
  .media-content {
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: left;
    overflow-y: hidden;
    overflow-x: auto;
  }
  .media-left {
    margin-right: 1rem;
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 0;
  }
</style>
```

:::

## Props

| Prop name              | Description | Type                                         | Values                                                 | Default                                                                      |
| ---------------------- | ----------- | -------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------- |
| value                  |             | string\|number\|boolean\|object\|array\|func | -                                                      | null                                                                         |
| disabled               |             | boolean                                      | -                                                      |                                                                              |
| hoverable              |             | boolean                                      | -                                                      |                                                                              |
| inline                 |             | boolean                                      | -                                                      |                                                                              |
| scrollable             |             | boolean                                      | -                                                      |                                                                              |
| maxHeight              |             | string\|number                               | -                                                      | () => {<br> return getValueByPath(config, 'dropdown.maxHeight', 200)<br>}    |
| position               |             | string                                       | `top-right`, `top-left`, `bottom-left`, `bottom-right` |                                                                              |
| mobileModal            |             | boolean                                      | -                                                      | () => {<br> return getValueByPath(config, 'dropdown.mobileModal', true)<br>} |
| ariaRole               |             | string                                       | `menu`, `list`, `dialog`                               | null                                                                         |
| animation              |             | string                                       | -                                                      | () => {<br> return getValueByPath(config, 'dropdown.animation', 'fade')<br>} |
| multiple               |             | boolean                                      | -                                                      |                                                                              |
| trapFocus              |             | boolean                                      | -                                                      | () => {<br> return getValueByPath(config, 'dropdown.trapFocus', true)<br>}   |
| closeOnClick           |             | boolean                                      | -                                                      | true                                                                         |
| canClose               |             | array\|boolean                               | -                                                      | true                                                                         |
| expanded               |             | boolean                                      | -                                                      |                                                                              |
| appendToBody           |             | boolean                                      | -                                                      |                                                                              |
| appendToBodyCopyParent |             | boolean                                      | -                                                      |                                                                              |
| rootClass              |             | string                                       | -                                                      |                                                                              |
| triggerClass           |             | string                                       | -                                                      |                                                                              |
| backgroundClass        |             | string                                       | -                                                      |                                                                              |
| menuClass              |             | string                                       | -                                                      |                                                                              |
| disabledClass          |             | string                                       | -                                                      |                                                                              |
| activeClass            |             | string                                       | -                                                      |                                                                              |
| hoverableClass         |             | string                                       | -                                                      |                                                                              |
| inlineClass            |             | string                                       | -                                                      |                                                                              |
| mobileClass            |             | string                                       | -                                                      |                                                                              |
| expandedClass          |             | string                                       | -                                                      |                                                                              |

## Events

| Event name    | Type      | Description |
| ------------- | --------- | ----------- |
| active-change | undefined |
| change        | undefined |
| input         | undefined |

## Slots

| Name    | Description | Bindings                                |
| ------- | ----------- | --------------------------------------- |
| trigger |             | [<br> {<br> "name": "active"<br> }<br>] |
| default |             |                                         |

---

---

## title: DropdownItem

# DropdownItem

## Props

| Prop name         | Description | Type                                         | Values | Default |
| ----------------- | ----------- | -------------------------------------------- | ------ | ------- |
| value             |             | string\|number\|boolean\|object\|array\|func | -      | null    |
| disabled          |             | boolean                                      | -      |         |
| custom            |             | boolean                                      | -      |         |
| tabindex          |             | number\|string                               | -      | 0       |
| ariaRole          |             | string                                       | -      | ''      |
| itemClass         |             | string                                       | -      |         |
| itemActiveClass   |             | string                                       | -      |         |
| itemDisabledClass |             | string                                       | -      |         |

## Events

| Event name | Type | Description |
| ---------- | ---- | ----------- |
| click      |      |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                                 | SASS Variable                          | Default                                                              |
| -------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------- |
| --oruga-dropdown-disabled-opacity            | \$dropdown-disabled-opacity            | \$base-disabled-opacity                                              |
| --oruga-dropdown-item-background-active      | \$dropdown-item-background-active      | \$primary                                                            |
| --oruga-dropdown-item-color-active           | \$dropdown-item-color-active           | \$primary-invert                                                     |
| --oruga-dropdown-item-color                  | \$dropdown-item-color                  | #000000                                                              |
| --oruga-dropdown-item-disabled-opacity       | \$dropdown-item-disabled-opacity       | \$base-disabled-opacity                                              |
| --oruga-dropdown-item-font-size              | \$dropdown-item-font-size              | \$base-font-size                                                     |
| --oruga-dropdown-item-hover-background-color | \$dropdown-item-hover-background-color | #f5f5f5                                                              |
| --oruga-dropdown-item-hover-color            | \$dropdown-item-hover-color            | #000000                                                              |
| --oruga-dropdown-item-line-height            | \$dropdown-item-line-height            | \$base-line-height                                                   |
| --oruga-dropdown-item-padding                | \$dropdown-item-padding                | .375rem 1rem                                                         |
| --oruga-dropdown-menu-background             | \$dropdown-menu-background             | #ffffff                                                              |
| --oruga-dropdown-menu-border-radius          | \$dropdown-menu-border-radius          | \$base-border-radius                                                 |
| --oruga-dropdown-menu-box-shadow             | \$dropdown-menu-box-shadow             | 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02) |
| --oruga-dropdown-menu-margin                 | \$dropdown-menu-margin                 | 0                                                                    |
| --oruga-dropdown-menu-padding                | \$dropdown-menu-padding                | .5rem 0 .5rem 0                                                      |
| --oruga-dropdown-menu-width                  | \$dropdown-menu-width                  | 12rem                                                                |
| --oruga-dropdown-menu-zindex                 | \$dropdown-menu-zindex                 | 20                                                                   |
| --oruga-dropdown-mobile-breakpoint           | \$dropdown-mobile-breakpoint           | 1024px                                                               |
| --oruga-dropdown-mobile-max-height           | \$dropdown-mobile-max-height           | calc(100vh - 120px)                                                  |
| --oruga-dropdown-mobile-max-width            | \$dropdown-mobile-max-width            | 460px                                                                |
| --oruga-dropdown-mobile-overlay-color        | \$dropdown-mobile-overlay-color        | rgba(#000000, 0.86)                                                  |
| --oruga-dropdown-mobile-overlay-zindex       | \$dropdown-mobile-overlay-zindex       | 40                                                                   |
| --oruga-dropdown-mobile-width                | \$dropdown-mobile-width                | calc(100vw - 40px)                                                   |
| --oruga-dropdown-mobile-zindex               | \$dropdown-mobile-zindex               | 50                                                                   |
