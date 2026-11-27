<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Clickable from "./clickable.vue";
import ClickableCode from "./clickable.vue?raw";

import CustomIconPack from "./custom-icon-pack.vue";
import CustomIconPackCode from "./custom-icon-pack.vue?raw";

const customIconConfigCode = `
<script setup>
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

import Oruga from "@oruga-ui/oruga-next";
app.use(Oruga, {
    iconComponent: "vue-fontawesome",
    iconPack: "fas",
    ...customIconConfig
});
<\/script>
`;

const faIconConfigCode = `
<script setup>
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

import Oruga from "@oruga-ui/oruga-next";
app.use(Oruga, {
    iconComponent: "vue-fontawesome",
    iconPack: "fas"
});
<\/script>
`;
</script>

### Base

Icons can be made interactive by adding the `clickable` property.
Without this property and when no explicit `aria-label` is provided, the icon is given the `aria-hidden` attribute by default.

::: info Accessibility Note:
Always provide an `aria-label` property when the icon has the `clickable` property.
:::

<ExampleViewer :component="Base" :code="BaseCode" />

### Clickable

A clickable icon gets `role="button"` and is focusable, so it needs an `aria-label` that names the action it triggers.
For icon-only controls, prefer a button component with an `aria-label` instead.

<ExampleViewer :component="Clickable" :code="ClickableCode" />

### Custom Icon Pack

A custom icon pack can be registered with the `customIconPacks` option of the global config, for example when installing Oruga.

::: tip TIP
Take a look at the example code below (click on "Show code") to see all internal icons that have to be mapped to the related icons of your custom icon pack.
:::

<ExampleViewer :component="CustomIconPack" :code="CustomIconPackCode" />

### Override Icon Pack

You can also customize some properties of the default icon packs. In this example, default sizes for FontAwesome have been modified.

<ExampleViewer :code="customIconConfigCode" :open="true" />

### Custom Icon Component

::: tip TIP
You can set the `iconComponent` config option to render icons with the vue-fontawesome component (it should work with other Vue icon components as well).
:::

<ExampleViewer :code="faIconConfigCode" :open="true" />
