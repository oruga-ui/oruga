<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import CustomIconPack from "./custom-icon-pack.vue";
import CustomIconPackCode from "./custom-icon-pack.vue?raw";

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

<template>
    <div class="vp-doc">
        <h3 id="base">Base</h3>
        <ExampleViewer :component="Base" :code="BaseCode" />

        <h3 id="custom">Custom icon pack</h3>
        <p>You can also add it during Oruga import as default config.</p>

        <div class="tip custom-block">
            <p class="custom-block-title">TIP</p>
            <p>
                Take a look at below example code (click on "Show code") to know
                all internal icons to replace with the releated icons of your
                custom icon pack
            </p>
        </div>
        <ExampleViewer :component="CustomIconPack" :code="CustomIconPackCode" />

        <h3 id="override">Override icon pack</h3>
        <p>
            You can also customize some properties of the default icon packs. In
            this example, default sizes for FontAwesome have been modified.
        </p>
        <ExampleViewer :code="customIconConfigCode" :open="true" />

        <h3 id="component">Custom icon component</h3>
        <div class="tip custom-block">
            <p class="custom-block-title">TIP</p>
            <p>
                You can set the `iconComponent` config option to render icons
                with the vue-fontawesome component (it should work with other
                Vue icon components as well).
            </p>
        </div>
        <ExampleViewer :code="faIconConfigCode" :open="true" />
    </div>
</template>
