<script lang="ts">
import BaseComponentMixin from "../../mixins/BaseComponentMixin";
import { defineComponent } from "vue";

export default defineComponent({
    name: "OMenuList",
    configField: "menu",
    mixins: [BaseComponentMixin],
    props: {
        ariaRole: String,
        label: String,
        icon: String,
        iconPack: String,
        /**
         * Icon size, optional
         * @values small, medium, large
         */
        size: String,
        listClass: [String, Array, Function],
        listLabelClass: [String, Array, Function],
    },
    computed: {
        listClasses() {
            return this.computedClass("listClass", "o-menu-list");
        },
        labelClasses() {
            return this.computedClass("listLabelClass", "o-menu-label");
        },
        computedAriaRole() {
            return this.ariaRole === "menu" ? this.ariaRole : null;
        },
    },
});
</script>

<template>
    <div>
        <div v-if="label || $slots.label" :class="labelClasses">
            <o-icon
                v-if="label && icon"
                :icon="icon"
                :pack="iconPack"
                :size="size" />
            <span v-if="label">{{ label }}</span>
            <slot v-else name="label" />
        </div>
        <ul :class="listClasses" :role="computedAriaRole">
            <slot />
        </ul>
    </div>
</template>
