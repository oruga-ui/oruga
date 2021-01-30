---
title: Tabs
---

# Tabs

> Responsive horizontal navigation tabs, switch between contents with ease

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/tabs/examples/Tabs.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <section>
    <p>
      <o-button @click="activeTab = 1">Set Music</o-button>
    </p>
    <p>
      <o-switch v-model="showBooks"> Show Books item </o-switch>
      <o-switch v-model="multiline"> Multiline </o-switch>
    </p>
    <o-tabs v-model="activeTab" :multiline="multiline">
      <o-tab-item value="0" label="Pictures">
        Lorem ipsum dolor sit amet.
      </o-tab-item>

      <o-tab-item :value="1" label="Music">
        Lorem <br />
        ipsum <br />
        dolor <br />
        sit <br />
        amet.
      </o-tab-item>

      <o-tab-item value="2" :visible="showBooks" label="Books">
        What light is light, if Silvia be not seen? <br />
        What joy is joy, if Silvia be not by— <br />
        Unless it be to think that she is by <br />
        And feed upon the shadow of perfection? <br />
        Except I be by Silvia in the night, <br />
        There is no music in the nightingale.
      </o-tab-item>

      <o-tab-item value="3" label="Videos" icon="video" disabled>
        Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar congue luctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas vehicula pulvinar tellus, id sodales
        felis lobortis eget.
      </o-tab-item>
    </o-tabs>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        activeTab: '0',
        showBooks: false,
        multiline: false
      }
    }
  }
</script>
```

:::

### Custom header

::: demo

```html
<template>
  <o-tabs type="boxed">
    <o-tab-item>
      <template slot="header">
        <o-icon icon="info-circle" rootClass="custom-icon"></o-icon>
        <span> Issues 3 </span>
      </template>
    </o-tab-item>
    <o-tab-item>
      <template slot="header">
        <o-icon icon="retweet" rootClass="custom-icon"></o-icon>
        <span> Pull Requests {{count}} </span>
      </template>
    </o-tab-item>
  </o-tabs>
</template>

<script>
  export default {
    data() {
      return {
        count: 1
      }
    },
    mounted() {
      setTimeout(() => {
        this.count++
      }, 3 * 1000)
    }
  }
</script>

<style>
  .custom-icon {
    margin-right: 5px;
  }
</style>
```

:::

### Vertical

::: demo

```html
<template>
  <section>
    <o-field grouped group-multiline>
      <div class="control">
        <o-switch v-model="atRight"> Right position </o-switch>
      </div>
      <div class="control">
        <o-switch v-model="expanded"> Expanded </o-switch>
      </div>
      <o-field label="Size">
        <o-select v-model="size" placeholder="Size">
          <option :value="null">Default</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </o-select>
      </o-field>
      <o-field label="Type">
        <o-select v-model="type" placeholder="Type">
          <option value="default">Default</option>
          <option value="boxed">Boxed</option>
          <option value="toggle">Toggle</option>
        </o-select>
      </o-field>
    </o-field>

    <o-tabs :position="atRight ? 'right' : ''" :size="size" :type="type" vertical :expanded="expanded">
      <o-tab-item label="Pictures" icon="images">
        Lorem ipsum dolor sit amet. <br />
        Lorem ipsum dolor sit amet. <br />
        Lorem ipsum dolor sit amet. <br />
        Lorem ipsum dolor sit amet. <br />
        Lorem ipsum dolor sit amet. <br />
        Lorem ipsum dolor sit amet.
      </o-tab-item>

      <o-tab-item label="Music" icon="music">
        What light is light, if Silvia be not seen? <br />
        What joy is joy, if Silvia be not by— <br />
        Unless it be to think that she is by <br />
        And feed upon the shadow of perfection? <br />
        Except I be by Silvia in the night, <br />
        There is no music in the nightingale.
      </o-tab-item>

      <o-tab-item label="Videos" icon="video" disabled>
        Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar congue luctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas vehicula pulvinar tellus, id sodales
        felis lobortis eget.
      </o-tab-item>
    </o-tabs>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        expanded: false,
        atRight: false,
        size: null,
        type: 'default'
      }
    }
  }
</script>
```

:::

### Types

::: demo

```html
<template>
  <section>
    <o-tabs type="boxed">
      <o-tab-item label="Pictures" icon="images"></o-tab-item>
      <o-tab-item label="Music" icon="music"></o-tab-item>
      <o-tab-item label="Videos" icon="video"></o-tab-item>
    </o-tabs>

    <o-tabs type="toggle">
      <o-tab-item label="Pictures" icon="images"></o-tab-item>
      <o-tab-item label="Music" icon="music"></o-tab-item>
      <o-tab-item label="Videos" icon="video"></o-tab-item>
    </o-tabs>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

### Position

::: demo

```html
<template>
  <section>
    <o-tabs type="boxed" position="centered">
      <o-tab-item label="Pictures" icon="images"></o-tab-item>
      <o-tab-item label="Music" icon="music"></o-tab-item>
      <o-tab-item label="Videos" icon="video"></o-tab-item>
    </o-tabs>

    <o-tabs type="toggle" position="right">
      <o-tab-item label="Pictures" icon="images"></o-tab-item>
      <o-tab-item label="Music" icon="music"></o-tab-item>
      <o-tab-item label="Videos" icon="video"></o-tab-item>
    </o-tabs>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_tabs.scss)

<br />
<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-tabs v-model="activeTab" v-bind="s">
                    <o-tab-item v-bind="s" :value="1" label="Pictures" icon="images">
                        Lorem ipsum dolor sit amet.
                    </o-tab-item>
                    <o-tab-item v-bind="s" :value="2" label="Music" icon="music">
                        Lorem <br />
                        ipsum <br />
                        dolor <br />
                        sit <br />
                        amet.
                    </o-tab-item>
                    <o-tab-item v-bind="s" :value="3" label="Videos" icon="video">
                        Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar congue luctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas vehicula pulvinar tellus, id sodales
                        felis lobortis eget.
                    </o-tab-item>
                </o-tabs>
            </template>
        </doc-wrapper>
        <inspector :inspectData="inspectData" :subitem="subitem"></inspector>
        <br/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 1,
            subitem: "tab-item",
            inspectData: [
                {
                    class: "rootClass",
                    description: "Root class of the element",
                },
                {
                    class: "navSizeClass",
                    description: "Size of the navigation",
                    properties: ["size"],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.size = 'large';
                    }
                },
                {
                    class: "verticalClass",
                    description: "Class of Tabs component when vertical",
                    properties: ['vertical'],
                    action: (cmp) => {
                        cmp.data.vertical = true
                    }
                },
                {
                    class: "expandedClass",
                    description: "Class of Tabs component when expanded",
                    properties: ['expanded'],
                    action: (cmp) => {
                        cmp.data.expanded = true
                    }
                },
                {
                    class: "multilineClass",
                    description: "Class of Tabs component when multiline",
                    properties: ['multiline'],
                    action: (cmp) => {
                        cmp.data.multiline = true
                    }
                },
                {
                    class: "positionClass",
                    description: "Class of Tabs component when when is vertical and its position changes",
                    properties: ['position', 'vertical'],
                    suffixes: ['bottom', 'left', 'right'],
                    action: (cmp) => {
                        cmp.data.vertical = true
                        cmp.data.position = 'right'
                    }
                },
                {
                    class: "tabItemWrapperClass",
                    description: "Class of the tab item wrapper",
                    specificity: "when <b>expandedClass</b> is applied",
                },
                {
                    class: "itemClass",
                    description: "Class of the tab item",
                    subitem: true
                },
                {
                    class: "itemHeaderClass",
                    description: "Class of the tab item header",
                    specificity: "when <b>verticalClass</b> or <b>expandedClass</b> or <b>positionClass</b> is applied",
                    subitem: true
                },
                {
                    class: "itemHeaderActiveClass",
                    description: "Class of the tab item header when active",
                    subitem: true
                },
                {
                    class: "itemHeaderDisabledClass",
                    description: "Class of the tab item header when disabled",
                    subitem: true,
                    action: (cmp) => {
                        cmp.data.disabled = true;
                    }
                },
                {
                    class: "itemHeaderTypeClass",
                    description: "Class of the tab item header type",
                    subitem: true,
                    action: () => {
                    }
                },
                {
                    class: "itemHeaderIconClass",
                    description: "Class of the tab item header icon",
                    subitem: true,
                    action: () => {
                    }
                },
                {
                    class: "itemHeaderTextClass",
                    description: "Class of the tab item header text",
                    subitem: true,
                    action: () => {
                    }
                },
                {
                    class: "navTabsClass",
                    description: "Class of the Tabs component nav tabs",
                    specificity: "when <b>positionClass</b> is applied",
                },
                {
                    class: "navPositionClass",
                    description: "Class of the Tabs component nav position",
                    properties: ['position'],
                    suffixes: ['bottom', 'left', 'right'],
                    action: (cmp) => {
                        cmp.data.vertical = false
                        cmp.data.position = 'right'
                    }
                },
            ]
        };
    },
};
</script>

<br />
<br />

## Props

| Prop name     | Description                                     | Type           | Values                                                                          | Default                                                                                                                           |
| ------------- | ----------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| animated      | Tab will have an animation                      | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> tabs {<br>&nbsp;&nbsp;animated: true<br>}</code> |
| destroyOnHide | Destroy tab on hide                             | boolean        | -                                                                               | false                                                                                                                             |
| expanded      | Tabs will be expanded (full-width)              | boolean        | -                                                                               |                                                                                                                                   |
| multiline     | Show tab items multiline when there is no space | boolean        | -                                                                               |                                                                                                                                   |
| override      |                                                 | boolean        | -                                                                               |                                                                                                                                   |
| position      | Position of the tab, optional                   | string         | `centered`, `right`                                                             |                                                                                                                                   |
| size          | Tab size, optional                              | string         | `small`, `medium`, `large`                                                      |                                                                                                                                   |
| type          | Tab type                                        | string         | `boxed`, `toggle`                                                               | 'default'                                                                                                                         |
| v-model       |                                                 | string\|number | -                                                                               |                                                                                                                                   |
| variant       | Color of the control, optional                  | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                   |
| vertical      | Show tab in vertical layout                     | boolean        | -                                                                               | false                                                                                                                             |

### Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| input      |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

# Tab Item

## Props

| Prop name | Description                                                  | Type           | Values | Default |
| --------- | ------------------------------------------------------------ | -------------- | ------ | ------- |
| disabled  | Item will be disabled                                        | boolean        | -      |         |
| icon      | Icon on the left                                             | string         | -      |         |
| iconPack  | Icon pack                                                    | string         | -      |         |
| label     | Item label                                                   | string         | -      |         |
| override  |                                                              | boolean        | -      |         |
| value     | Item value (it will be used as v-model of wrapper component) | string\|number | -      |         |
| visible   | Show/hide item                                               | boolean        | -      | true    |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

| CSS Variable                                       | SASS Variable                                | Default                 |
| -------------------------------------------------- | -------------------------------------------- | ----------------------- |
| --oruga-tabs-disabled-opacity                      | \$tabs-disabled-opacity                      | \$base-disabled-opacity |
| --oruga-tabs-font-size                             | \$tabs-font-size                             | \$base-font-size        |
| --oruga-tabs-icon-margin                           | \$tabs-icon-margin                           | 0.5em                   |
| --oruga-tabs-content-padding                       | \$tabs-content-padding                       | 1rem                    |
| --oruga-tabs-margin-bottom                         | \$tabs-margin-bottom                         | 1.5rem                  |
| --oruga-tabs-border-bottom-color                   | \$tabs-border-bottom-color                   | \$grey-lighter          |
| --oruga-tabs-border-bottom-style                   | \$tabs-border-bottom-style                   | solid                   |
| --oruga-tabs-border-bottom-width                   | \$tabs-border-bottom-width                   | 1px                     |
| --oruga-tabs-link-color                            | \$tabs-link-color                            | hsl(0, 0%, 29%)         |
| --oruga-tabs-link-active-border-bottom-color       | \$tabs-link-active-border-bottom-color       | \$primary               |
| --oruga-tabs-link-active-color                     | \$tabs-link-active-color                     | \$primary               |
| --oruga-tabs-link-line-height                      | \$tabs-link-line-height                      | \$base-line-height      |
| --oruga-tabs-link-padding                          | \$tabs-link-padding                          | 0.5em 1em               |
| --oruga-tabs-boxed-link-radius                     | \$tabs-boxed-link-radius                     | \$base-border-radius    |
| --oruga-tabs-boxed-link-hover-background-color     | \$tabs-boxed-link-hover-background-color     | hsl(0, 0%, 96%)         |
| --oruga-tabs-boxed-link-hover-border-bottom-color  | \$tabs-boxed-link-hover-border-bottom-color  | hsl(0, 0%, 86%)         |
| --oruga-tabs-boxed-link-active-background-color    | \$tabs-boxed-link-active-background-color    | hsl(0, 0%, 100%)        |
| --oruga-tabs-boxed-link-active-border-color        | \$tabs-boxed-link-active-border-color        | hsl(0, 0%, 86%)         |
| --oruga-tabs-boxed-link-active-border-bottom-color | \$tabs-boxed-link-active-border-bottom-color | transparent             |
| --oruga-tabs-toggle-link-border-color              | \$tabs-toggle-link-border-color              | hsl(0, 0%, 86%)         |
| --oruga-tabs-toggle-link-border-style              | \$tabs-toggle-link-border-style              | solid                   |
| --oruga-tabs-toggle-link-border-width              | \$tabs-toggle-link-border-width              | 1px                     |
| --oruga-tabs-toggle-link-hover-background-color    | \$tabs-toggle-link-hover-background-color    | hsl(0, 0%, 96%)         |
| --oruga-tabs-toggle-link-hover-border-color        | \$tabs-toggle-link-hover-border-color        | hsl(0, 0%, 71%)         |
| --oruga-tabs-toggle-link-radius                    | \$tabs-toggle-link-radius                    | \$base-border-radius    |
| --oruga-tabs-toggle-link-active-background-color   | \$tabs-toggle-link-active-background-color   | \$primary               |
| --oruga-tabs-toggle-link-active-border-color       | \$tabs-toggle-link-active-border-color       | \$primary               |
| --oruga-tabs-toggle-link-active-color              | \$tabs-toggle-link-active-color              | \$primary-invert        |
