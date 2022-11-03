---
title: Icon
---

# Icon

> Icons take an important role of any application

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/icon/examples/Icon.md" class="docgen-edit-link">edit on github</a>

## Examples

Oruga is compatible with both <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a>
and <a href="https://fontawesome.com/" target="_blank">FontAwesome 5</a> but you can also add your own custom icon pack.<br>

### Base

::: demo

```html
<template>
  <section>
    <div class="block">
      <o-icon pack="fas" icon="user" size="small"> </o-icon>
      <o-icon pack="fas" icon="home" size="small"> </o-icon>
      <o-icon pack="fas" icon="tachometer-alt" size="small"> </o-icon>
    </div>

    <div class="block">
      <o-icon pack="fas" icon="user"> </o-icon>
      <o-icon pack="fas" icon="home"> </o-icon>
      <o-icon pack="fas" icon="tachometer-alt"> </o-icon>
    </div>

    <div class="block">
      <o-icon pack="fas" icon="user" size="medium"> </o-icon>
      <o-icon pack="fas" icon="home" size="medium"> </o-icon>
      <o-icon pack="fas" icon="tachometer-alt" size="medium"> </o-icon>
    </div>

    <div class="block">
      <o-icon pack="fas" icon="user" size="large" variant="success"> </o-icon>
      <o-icon pack="fas" icon="home" size="large" variant="info"> </o-icon>
      <o-icon pack="fas" icon="tachometer-alt" size="large" variant="primary"> </o-icon>
    </div>

    <o-button variant="success">
      <o-icon pack="fas" icon="check"></o-icon>
      <span>Finish</span>
    </o-button>

    <o-button variant="warning">
      <o-icon pack="fas" icon="check"></o-icon>
      <span>Finish</span>
    </o-button>

    <o-button variant="warning">
      <o-icon pack="fas" icon="sync-alt" spin> </o-icon>
      <span>Refresh</span>
    </o-button>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

### Custom icon pack

<p>
    You can also add it during Oruga import as default config.
</p>

::: tip
Take a look at below example code (click on "Show code") to know all internal icons to replace with the releated icons of your custom icon pack
:::

::: demo

```html
<template>
  <section>
    <div class="block">
      <o-icon pack="ionicons" icon="person" size="small"> </o-icon>
      <o-icon pack="ionicons" icon="home" size="small"> </o-icon>
      <o-icon pack="ionicons" icon="apps" size="small"> </o-icon>
    </div>

    <div class="block">
      <o-icon pack="ionicons" icon="person"> </o-icon>
      <o-icon pack="ionicons" icon="home"> </o-icon>
      <o-icon pack="ionicons" icon="apps"> </o-icon>
    </div>

    <div class="block">
      <o-icon pack="ionicons" icon="person" size="medium"> </o-icon>
      <o-icon pack="ionicons" icon="home" size="medium"> </o-icon>
      <o-icon pack="ionicons" icon="apps" size="medium"> </o-icon>
    </div>

    <div class="block">
      <o-icon pack="ionicons" icon="person" size="large" variant="success"> </o-icon>
      <o-icon pack="ionicons" icon="home" size="large" variant="info"> </o-icon>
      <o-icon pack="ionicons" icon="apps" size="large" variant="primary"> </o-icon>
    </div>

    <o-button variant="primary">
      <o-icon pack="ionicons" icon="checkmark"></o-icon>
      <span>Finish</span>
    </o-button>

    <o-button variant="warning">
      <o-icon pack="ionicons" icon="checkmark"></o-icon>
      <span>Finish</span>
    </o-button>

    <o-button variant="warning">
      <o-icon spin pack="ionicons" icon="refresh"> </o-icon>
      <span>Refresh</span>
    </o-button>
  </section>
</template>

<script>
  const customIconConfig = {
    iconComponent: undefined,
    customIconPacks: {
      ionicons: {
        sizes: {
          default: 'is-size-5',
          small: '',
          medium: 'is-size-3',
          large: 'is-size-1'
        },
        iconPrefix: 'ion-md-',
        internalIcons: {
          check: 'checkmark',
          information: 'information',
          alert: 'alert',
          'alert-circle': 'alert',
          'arrow-up': 'arrow-up',
          'chevron-right': 'arrow-forward',
          'chevron-left': 'arrow-back',
          'chevron-down': 'arrow-down',
          eye: 'eye',
          'eye-off': 'eye-off',
          'caret-down': 'arrow-dropdown',
          'caret-up': 'arrow-dropup',
          loading: 'reload-outline',
          times: 'close-outline',
          'close-circle': 'close-circle-outline'
        }
      }
    }
  }
  export default {
    data() {
      return {
        docsIcon: undefined
      }
    },
    created() {
      this.$oruga.config.setOptions(customIconConfig)
    },
    beforeCreate() {
      // only for docs purpose
      const docsIcon = this.$oruga.config.getOptions().iconComponent
      if (typeof window !== 'undefined') {
        window.requestAnimationFrame(() => {
          this.$oruga.config.setOptions({
            iconComponent: docsIcon
          })
        })
      }
    }
  }
</script>

<style>
  @import 'https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css';
</style>
```

:::

### Override icon pack

<p>
    You can also customize some properties of the default icon packs. In this example, default sizes for FontAwesome have been modified.
</p>

```js
const customIconConfig = {
  customIconPacks: {
    fas: {
      sizes: {
        default: null,
        small: null,
        medium: 'fa-lg',
        large: 'fa-2x'
      }
    }
  }
}
export default {
  created() {
    // only for docs purpose, you can set in globally
    this.$oruga.config.setOptions(customIconConfig)
  }
}
```

### Custom icon component

::: tip
You can set the `iconComponent` config option to render icons with the vue-fontawesome component (it should work with other Vue icon components as well).
:::

```js
import { library } from '@fortawesome/fontawesome-svg-core'
// internal icons
import {
  faCheck,
  faCheckCircle,
  faInfoCircle,
  faExclamationTriangle,
  faExclamationCircle,
  faArrowUp,
  faAngleRight,
  faAngleLeft,
  faAngleDown,
  faEye,
  faEyeSlash,
  faCaretDown,
  faCaretUp
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faCheck,
  faCheckCircle,
  faInfoCircle,
  faExclamationTriangle,
  faExclamationCircle,
  faArrowUp,
  faAngleRight,
  faAngleLeft,
  faAngleDown,
  faEye,
  faEyeSlash,
  faCaretDown,
  faCaretUp
)
Vue.component('vue-fontawesome', FontAwesomeIcon)

// ...

import Oruga from '@oruga-ui/oruga'
Vue.use(Oruga, {
  iconComponent: 'vue-fontawesome',
  iconPack: 'fas'
})
```

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_icon.scss)

<br />
<template>
     <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-icon v-bind="s" pack="fas" icon="home"></o-icon>
            </template>
        </doc-wrapper>
        <inspector :inspectData="inspectData"></inspector>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inspectData: [
                {
                    class: "rootClass",
                    description: "Class of the root element"
                },
                {
                    class: "clickableClass",
                    description: "Class of the icon when clickable",
                    properties: ['clickable'],
                    action: (cmp) => {
                        cmp.data.clickable = true;
                    }
                },
                {
                    class: "spinClass",
                    description: "Class of the element when spin",
                    properties: ['spin'],
                    action: (cmp) => {
                        cmp.data.spin = true;
                    }
                },
                {
                    class: "sizeClass",
                    description : 'Class of the icon size',
                    properties: ["size"],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.size = "large";
                    }
                },
                {
                    class: "variantClass",
                    description : 'Class of the icon variant',
                    properties: ["variant"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    action: (cmp) => {
                        cmp.data.variant = "warning";
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

| Prop name   | Description                                                                                                          | Type           | Values                                                                                                                             | Default |
| ----------- | -------------------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------- |
| clickable   | When true makes icon clickable                                                                                       | boolean        | -                                                                                                                                  |         |
| component   | Icon component name                                                                                                  | string         | -                                                                                                                                  |         |
| customClass | Add class to icon font, optional. See here for MDI, here for FontAwesome 4 and here for FontAwesome 5 custom classes | string         | -                                                                                                                                  |         |
| customSize  | Overrides icon font size, optional                                                                                   | string         | `Depends on library: null (smallest)`, `fa-lg`, `fa-2x`, `fa-3x`, `fa-4x`, `fa-5x`, `mdi-18px`, `mdi-24px`, `mdi-36px`, `mdi-48px` |         |
| icon        | Icon name                                                                                                            | string         | -                                                                                                                                  |         |
| override    | Override classes                                                                                                     | boolean        | -                                                                                                                                  | false   |
| pack        | Icon pack to use                                                                                                     | string         | `mdi`, `fa`, `fas and any other custom icon pack`                                                                                  |         |
| rotation    | Rotation 0-360                                                                                                       | number\|string | -                                                                                                                                  |         |
| size        | Icon size, optional                                                                                                  | string         | `small`, `medium`, `large`                                                                                                         |         |
| spin        | Enable spin effect on icon                                                                                           | boolean        | -                                                                                                                                  |         |
| variant     | Color of the icon, optional                                                                                          | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color`                                                    |         |

## Style

| CSS Variable               | SASS Variable        | Default |
| -------------------------- | -------------------- | ------- |
| --oruga-icon-spin-duration | \$icon-spin-duration | 2s      |
