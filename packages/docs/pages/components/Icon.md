[//]: # "This file is generated and should not be edited by hand!"

# Icon

<section class="odocs-head">

The **Icon** component helps to display icons the right way. Icons are an important part of any application.
Oruga is compatible with both [Material Design Icons](https://materialdesignicons.com/) and [FontAwesome 5](https://fontawesome.com/) but you can also add your own custom icon pack.

</section>

<section class="odocs-examples">

## Examples

<script setup>
import Base from "@/components/Icon/examples/base.vue";
import BaseCode from "@/components/Icon/examples/base.vue?raw";

import CustomIconPack from "@/components/Icon/examples/custom-icon-pack.vue";
import CustomIconPackCode from "@/components/Icon/examples/custom-icon-pack.vue?raw";

const customIconConfigCode = `
<script setup lang="ts">
const customIconConfig = {
    customIconPacks: {
        fas: {
            sizes: {
                default: null,
                small: null,
                medium: "fa-lg",
                large: "fa-xl"
            }
        }
    }
}

import Oruga from "@oruga-ui/oruga";
app.use(Oruga, {
    iconComponent: "vue-fontawesome",
    iconPack: "fas",
    ...customIconConfig
});
/script>
`;

const faIconConfigCode = `
<script setup lang="ts">
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
app.component("vue-fontawesome", FontAwesomeIcon);

// ...

import Oruga from "@oruga-ui/oruga";
app.use(Oruga, {
    iconComponent: "vue-fontawesome",
    iconPack: "fas"
});
/script>
`;
</script>

### Base

<ExampleViewer :component="Base" :code="BaseCode" />

### Custom icon pack

You can also add it during Oruga import as default config.

::: tip TIP
Take a look at below example code (click on "Show code") to know all internal icons to replace with the releated icons of your custom icon pack
:::

<ExampleViewer :component="CustomIconPack" :code="CustomIconPackCode" />

### Override icon pack

You can also customize some properties of the default icon packs. In this example, default sizes for FontAwesome have been modified.

<ExampleViewer :code="customIconConfigCode" :open="true" />

### Custom icon component

::: tip TIP
You can set the `iconComponent` config option to render icons with the vue-fontawesome component (it should work with other Vue icon components as well).
:::

<ExampleViewer :code="faIconConfigCode" :open="true" />

</section>

<section class="odocs-specs">

## Icon Component

> Icons take an important role of any application.

```html
<o-icon></o-icon>
```

### Props

| Prop name   | Description                                                                    | Type             | Values                                                                                                           | Default                                                                                                                                           |
| ----------- | ------------------------------------------------------------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| clickable   | Makes the icon interactive by clicking and focusable                           | boolean          | -                                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                       |
| component   | Icon component name                                                            | DynamicComponent | -                                                                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;iconComponent: undefined<br>}</code> |
| customClass | Add class to icon font.<br/>See icon library documentation for custom classes. | string           | -                                                                                                                |                                                                                                                                                   |
| customSize  | Overrides icon font size                                                       | string           | `Depends on library: null (smallest)`, `fa-sm`, `fa-lg`, `fa-xl`, `mdi-18px`, `mdi-24px`, `mdi-36px`, `mdi-48px` |                                                                                                                                                   |
| icon        | Icon name                                                                      | string           | -                                                                                                                |                                                                                                                                                   |
| override    | Override existing theme classes completely                                     | boolean          | -                                                                                                                |                                                                                                                                                   |
| pack        | Icon pack to use                                                               | string           | `mdi`, `fa`, `fas and any other custom icon pack`                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;iconPack: "mdi"<br>}</code>          |
| rotation    | Rotation 0-360                                                                 | number \| string | -                                                                                                                |                                                                                                                                                   |
| size        | Icon size                                                                      | string           | `small`, `medium`, `large`                                                                                       | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>icon: {<br>&nbsp;&nbsp;size: undefined<br>}</code>    |
| spin        | Enable spin effect on icon                                                     | boolean          | -                                                                                                                | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                       |
| variant     | Color of the icon                                                              | string           | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color`                                  | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>icon: {<br>&nbsp;&nbsp;variant: undefined<br>}</code> |

### Events

| Event name | Properties                       | Description         |
| ---------- | -------------------------------- | ------------------- |
| click      | **event** `event` - native event | on item click event |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-icon-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                 | Default |
| ----------------------------- | ------- |
| $icon-color                   | inherit |
| $icon-font-size               | inherit |
| $icon-spin-animation-duration | 2s      |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_icon.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable       | Default |
| ------------------- | ------- |
| $icon-spin-duration | 2s      |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_icon.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                 | Default |
| ----------------------------- | ------- |
| $icon-spin-animation-duration | 1.5s    |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_icon.scss)

</div>

</section>
