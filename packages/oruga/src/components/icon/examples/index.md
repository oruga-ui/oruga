<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

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

import Oruga from "@oruga-ui/oruga";
app.use(Oruga, {
    iconComponent: "vue-fontawesome",
    iconPack: "fas",
    ...customIconConfig
});
/script>
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
