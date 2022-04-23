---
title: Icon
---

# Icon

> Icons take an important role of any application

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga-next/src/components/icon/examples/Icon.md" class="docgen-edit-link">edit on github</a>

## Examples

Oruga is compatible with both <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a>
and <a href="https://fontawesome.com/" target="_blank">FontAwesome 5</a> but you can also add your own custom icon pack.<br>

### Base

<ExampleViewer example="icon/base" />

### Custom icon pack

<p>
    You can also add it during Oruga import as default config.
</p>

::: tip
Take a look at below example code (click on "Show code") to know all internal icons to replace with the releated icons of your custom icon pack
:::

<ExampleViewer example="icon/custom-icon-pack" />

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
        medium: "fa-lg",
        large: "fa-2x"
      }
    }
  }
};
export default {
  created() {
    // only for docs purpose, you can set in globally
    this.$oruga.config.setOptions(customIconConfig);
  }
};
```

### Custom icon component

::: tip
You can set the `iconComponent` config option to render icons with the vue-fontawesome component (it should work with other Vue icon components as well).
:::

```js
import { library } from "@fortawesome/fontawesome-svg-core";
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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

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
);
Vue.component("vue-fontawesome", FontAwesomeIcon);

// ...

import Oruga from "@oruga-ui/oruga";
Vue.use(Oruga, {
  iconComponent: "vue-fontawesome",
  iconPack: "fas"
});
```

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_icon.scss)

<br />

<br />
<br />

## Props

| Prop name   | Description                                                                                                          | Type           | Values                                                                                                                             | Default |
| ----------- | -------------------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------- |
| both        |                                                                                                                      | boolean        | -                                                                                                                                  |         |
| clickable   | When true makes icon clickable                                                                                       | boolean        | -                                                                                                                                  |         |
| component   | Icon component name                                                                                                  | string         | -                                                                                                                                  |         |
| customClass | Add class to icon font, optional. See here for MDI, here for FontAwesome 4 and here for FontAwesome 5 custom classes | string         | -                                                                                                                                  |         |
| customSize  | Overrides icon font size, optional                                                                                   | string         | `Depends on library: null (smallest)`, `fa-lg`, `fa-2x`, `fa-3x`, `fa-4x`, `fa-5x`, `mdi-18px`, `mdi-24px`, `mdi-36px`, `mdi-48px` |         |
| icon        | Icon name                                                                                                            | string         | -                                                                                                                                  |         |
| override    |                                                                                                                      | boolean        | -                                                                                                                                  |         |
| pack        | Icon pack to use                                                                                                     | string         | `mdi`, `fa`, `fas and any other custom icon pack`                                                                                  |         |
| rotation    | Rotation 0-360                                                                                                       | number\|string | -                                                                                                                                  |         |
| size        | Icon size, optional                                                                                                  | string         | `small`, `medium`, `large`                                                                                                         |         |
| spin        | Enable spin effect on icon                                                                                           | boolean        | -                                                                                                                                  |         |
| variant     | Color of the icon, optional                                                                                          | string\|object | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color`                                                    |         |

## Style

| CSS Variable               | SASS Variable        | Default |
| -------------------------- | -------------------- | ------- |
| --oruga-icon-spin-duration | \$icon-spin-duration | 2s      |
