---
title: Dropdown
---

# Dropdown

> Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/dropdown/examples/Dropdown.md" class="docgen-edit-link">edit on github</a>

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

    <o-dropdown :triggers="['hover']" aria-role="list">
      <o-button variant="info" slot="trigger">
        <span>Hover me!</span>
        <o-icon icon="caret-down"></o-icon>
      </o-button>

      <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
      <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
      <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
    </o-dropdown>

    <o-dropdown disabled aria-role="list">
      <o-button slot="trigger">
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
        <o-icon variant="success" icon="caret-down" slot="trigger" role="button"> </o-icon>
      </div>

      <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
      <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
      <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
    </o-dropdown>

    <o-dropdown :triggers="['contextmenu']" aria-role="list">
      <o-button slot="trigger" role="button">
        Right click
      </o-button>

      <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
      <o-dropdown-item aria-role="listitem">Another action</o-dropdown-item>
      <o-dropdown-item aria-role="listitem">Something else</o-dropdown-item>
    </o-dropdown>
  </section>
</template>

<script>
  export default {}
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
      }
    }
  }
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
        <o-switch v-model="isScrollable">Scrollable</o-switch>
      </o-field>
    </div>

    <br />

    <o-dropdown :scrollable="isScrollable" :max-height="maxHeight" v-model="currentMenu" aria-role="list">
      <o-button variant="primary" type="button" slot="trigger">
        <template>
          <o-icon :icon="currentMenu.icon"></o-icon>
          <span>{{currentMenu.text}}</span>
        </template>
        <o-icon icon="caret-down"></o-icon>
      </o-button>

      <o-dropdown-item v-for="(menu, index) in menus" :key="index" :value="menu" aria-role="listitem">
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
        currentMenu: { icon: 'users', text: 'People' },
        menus: [
          { icon: 'users', text: 'People' },
          { icon: 'box', text: 'Orders' },
          { icon: 'credit-card', text: 'Payments' },
          { icon: 'dolly', text: 'Logistics' },
          { icon: 'business-time', text: 'Jobs' },
          { icon: 'shopping-cart', text: 'Cart' },
          { icon: 'cog', text: 'Configuration' }
        ]
      }
    }
  }
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

## Class props

<br />
<template>
  <div>
    <doc-wrapper>
        <template v-slot:default="s">
            <o-dropdown v-model="currentMenu" v-bind="s" aria-role="list">
                <o-button variant="primary" slot="trigger" slot-scope="{ active }" ref="dropdownbtn">
                    <span>Click me!</span>
                    <o-icon :icon="active ? 'caret-up' : 'caret-down'"></o-icon>
                </o-button>
                <o-dropdown-item v-bind="s" value="ac1" aria-role="listitem">Action</o-dropdown-item>
                <o-dropdown-item v-bind="s" value="ac2" aria-role="listitem">Another action</o-dropdown-item>
                <o-dropdown-item v-bind="s" value="ac3" disabled aria-role="listitem">Something else</o-dropdown-item>
            </o-dropdown>
        </template>
    </doc-wrapper>
    <inspector :inspectData="inspectData" :subitem="subitem"></inspector>
  </div>
</template>

<script>
export default {
    data() {
        return {
            currentMenu: '',
            subitem: 'dropdown-item',
            inspectData: [
                {
                    class: "rootClass",
                    description: "Class of the root element"
                },
                {
                    class: "triggerClass",
                    description: "Class of the trigger element"
                },
                {
                    class: "menuMobileOverlayClass",
                    description: "Class of the overlay when on mobile",
                    warning: "Switch to mobile view to see it in action!",
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "menuClass",
                    description: "Class of the dropdown menu",
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "disabledClass",
                    description: "Class of dropdown when disabled",
                    properties: ['disabled'],
                    action: (cmp) => {
                        cmp.data.disabled = true;
                    }
                },
                {
                    class: "menuActiveClass",
                    description: "Class of dropdown menu when active",
                    properties: ['inline'],
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "menuInlineClass",
                    description: "Class of dropdown menu when inline",
                    properties: ['inline'],
                    action: (cmp) => {
                        cmp.data.inline = true;
                    }
                },
                {
                    class: "menuPositionClass",
                    description: "Class of dropdown menu position",
                    properties: ['position'],
                    suffixes: ['top-right', 'top-left', 'bottom-left'],
                    action: (cmp) => {
                        cmp.data.position = 'top-right';
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "mobileClass",
                    description: "Class of dropdown when on mobile",
                    warning: "Switch to mobile view to see it in action!",
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "expandedClass",
                    description: "Class of dropdown when expanded",
                    properties: ['expanded'],
                    action: (cmp) => {
                        cmp.data.expanded = true;
                    }
                },
                {
                    class: "itemClass",
                    description: "Class of the dropdown item",
                    subitem: true,
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "itemActiveClass",
                    description: "Class of the dropdown item when active",
                    subitem: true,
                    action: () => {
                        setTimeout(() => {
                            this.currentMenu = 'ac1'
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
                {
                    class: "itemDisabledClass",
                    subitem: true,
                    description: "Class of the dropdown item when disabled",
                    properties: ['disabled'],
                    action: () => {
                        setTimeout(() => {
                            this.$refs.dropdownbtn.$el.click()
                        }, 300);
                    }
                },
            ],
        };
    },
};
</script>

<br />
<br />

## Props

| Prop name              | Description                                                                                                                                            | Type                                   | Values                                   | Default                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- | ---------------------------------------- | ---------------------------------------------------- |
| animation              | Custom animation (transition name)                                                                                                                     | string                                 | -                                        | Config -> <code> 'dropdown.animation': 'fade'</code> |
| appendToBody           | Append dropdown content to body                                                                                                                        | boolean                                | -                                        |                                                      |
| appendToBodyCopyParent |                                                                                                                                                        | boolean                                | -                                        |                                                      |
| ariaRole               | Role attribute to be passed to list container for better accessibility. Use menu only in situations where your dropdown is related to navigation menus | string                                 | `list`, `menu`, `dialog`                 | null                                                 |
| canClose               | Can close dropdown by pressing escape or by clicking outside                                                                                           | array\|boolean                         | `escape`, `outside`                      | true                                                 |
| closeOnClick           | Close dropdown when content is clicked                                                                                                                 | boolean                                | -                                        | true                                                 |
| disabled               | Dropdown disabled                                                                                                                                      | boolean                                | -                                        |                                                      |
| expanded               | Dropdown will be expanded (full-width)                                                                                                                 | boolean                                | -                                        |                                                      |
| inline                 | Dropdown content (items) are shown inline, trigger is removed                                                                                          | boolean                                | -                                        |                                                      |
| maxHeight              | Max height of dropdown content                                                                                                                         | string\|number                         | -                                        | Config -> <code> 'dropdown.maxHeight': 200</code>    |
| mobileBreakpoint       | Mobile breakpoint as max-width value                                                                                                                   | string                                 | -                                        |                                                      |
| mobileModal            | Dropdown content (items) are shown into a modal on mobile                                                                                              | boolean                                | -                                        | Config -> <code> 'dropdown.mobileModal': true</code> |
| multiple               | Allows multiple selections                                                                                                                             | boolean                                | -                                        |                                                      |
| override               |                                                                                                                                                        | boolean                                | -                                        |                                                      |
| position               | Optional, position of the dropdown relative to the trigger                                                                                             | string                                 | `top-right`, `top-left`, `bottom-left`   |                                                      |
| scrollable             | Dropdown content will be scrollable                                                                                                                    | boolean                                | -                                        |                                                      |
| trapFocus              | Trap focus inside the dropdown.                                                                                                                        | boolean                                | -                                        | Config -> <code> 'dropdown.trapFocus': true</code>   |
| triggers               | Dropdown will be triggered by any events                                                                                                               | array                                  | `click`, `hover`, `contextmenu`, `focus` | ['click']                                            |
| v-model                |                                                                                                                                                        | string\|number\|boolean\|object\|array | -                                        | null                                                 |

### Events

| Event name    | Properties | Description |
| ------------- | ---------- | ----------- |
| active-change |            |
| change        |            |
| input         |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| default |             |          |

---

# Dropdown Item

## Props

| Prop name | Description                                           | Type                                   | Values | Default |
| --------- | ----------------------------------------------------- | -------------------------------------- | ------ | ------- |
| ariaRole  |                                                       | string                                 | -      | ''      |
| clickable | Item is clickable and emit an event                   | boolean                                | -      | true    |
| disabled  | Item is disabled                                      | boolean                                | -      |         |
| override  |                                                       | boolean                                | -      |         |
| tabindex  |                                                       | number\|string                         | -      | 0       |
| value     | The value that will be returned on events and v-model | string\|number\|boolean\|object\|array | -      | null    |

### Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| click      |            |

### Slots

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
| --oruga-dropdown-item-font-weight            | \$dropdown-item-font-weight            | 400                                                                  |
| --oruga-dropdown-menu-background             | \$dropdown-menu-background             | #ffffff                                                              |
| --oruga-dropdown-menu-border-radius          | \$dropdown-menu-border-radius          | \$base-border-radius                                                 |
| --oruga-dropdown-menu-box-shadow             | \$dropdown-menu-box-shadow             | 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02) |
| --oruga-dropdown-menu-margin                 | \$dropdown-menu-margin                 | 0                                                                    |
| --oruga-dropdown-menu-padding                | \$dropdown-menu-padding                | .5rem 0 .5rem 0                                                      |
| --oruga-dropdown-menu-width                  | \$dropdown-menu-width                  | 12rem                                                                |
| --oruga-dropdown-menu-zindex                 | \$dropdown-menu-zindex                 | 20                                                                   |
| --oruga-dropdown-mobile-max-height           | \$dropdown-mobile-max-height           | calc(100vh - 120px)                                                  |
| --oruga-dropdown-mobile-max-width            | \$dropdown-mobile-max-width            | 460px                                                                |
| --oruga-dropdown-mobile-overlay-color        | \$dropdown-mobile-overlay-color        | rgba(#000000, 0.86)                                                  |
| --oruga-dropdown-mobile-overlay-zindex       | \$dropdown-mobile-overlay-zindex       | 40                                                                   |
| --oruga-dropdown-mobile-width                | \$dropdown-mobile-width                | calc(100vw - 40px)                                                   |
| --oruga-dropdown-mobile-zindex               | \$dropdown-mobile-zindex               | 50                                                                   |
