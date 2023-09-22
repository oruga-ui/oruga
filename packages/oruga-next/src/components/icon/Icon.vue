<script lang="ts">
import { defineComponent } from "vue";
import BaseComponentMixin from "../../utils/BaseComponentMixin";

import { getOptions } from "../../utils/config";
import getIcons from "../../utils/icons";
import { getValueByPath } from "../../utils/helpers";

/**
 * Icons take an important role of any application
 * @displayName Icon
 * @style _icon.scss
 */
export default defineComponent({
    name: "OIcon",
    mixins: [BaseComponentMixin],
    configField: "icon",
    props: {
        /**
         * 	Color of the icon, optional
         *  @values primary, info, success, warning, danger, and any other custom color
         */
        variant: [String, Object],
        /**
         * Icon component name
         */
        component: String,
        /**
         * Icon pack to use
         * @values mdi, fa, fas and any other custom icon pack
         */
        pack: String,
        /**
         * Icon name
         */
        icon: String,
        /**
         * Icon size, optional
         * @values small, medium, large
         */
        size: String,
        /**
         * Overrides icon font size, optional
         * @values Depends on library: null (smallest), fa-lg, fa-2x, fa-3x, fa-4x, fa-5x, mdi-18px, mdi-24px, mdi-36px, mdi-48px
         */
        customSize: String,
        /**
         * Add class to icon font, optional. See here for MDI, here for FontAwesome 4 and here for FontAwesome 5 custom classes
         */
        customClass: String,
        /**
         * When true makes icon clickable
         */
        clickable: Boolean,
        /** Enable spin effect on icon */
        spin: Boolean,
        /** Rotation 0-360 */
        rotation: [Number, String],
        /** @ignore */
        both: Boolean, // This is used internally
        rootClass: [String, Function, Array],
        clickableClass: [String, Function, Array],
        spinClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array],
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass("rootClass", "o-icon"),
                {
                    [this.computedClass("clickableClass", "o-icon--clickable")]:
                        this.clickable,
                },
                {
                    [this.computedClass("spinClass", "o-icon--spin")]:
                        this.spin,
                },
                {
                    [this.computedClass("sizeClass", "o-icon--", this.size)]:
                        this.size,
                },
                {
                    [this.computedClass(
                        "variantClass",
                        "o-icon--",
                        this.newVariant,
                    )]: this.newVariant,
                },
            ];
        },
        rootStyle() {
            const style = {};
            if (this.rotation) {
                style["transform"] = `rotate(${this.rotation}deg)`;
            }
            return style;
        },
        iconConfig() {
            return getIcons()[this.newPack];
        },
        iconPrefix() {
            if (this.iconConfig && this.iconConfig.iconPrefix) {
                return this.iconConfig.iconPrefix;
            }
            return "";
        },
        /**
         * Internal icon name based on the pack.
         * If pack is 'fa', gets the equivalent FA icon name of the MDI,
         * internal icons are always MDI.
         */
        newIcon() {
            return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon)}`;
        },
        newPack() {
            return this.pack || getValueByPath(getOptions(), "iconPack", "mdi");
        },
        newVariant() {
            if (!this.variant) return;
            let newVariant = "";
            if (typeof this.variant === "string") {
                newVariant = this.variant;
            } else {
                newVariant = Object.keys(this.variant).filter(
                    (key) => this.variant[key],
                )[0];
            }
            return newVariant;
        },
        newCustomSize() {
            return this.customSize || this.customSizeByPack;
        },
        customSizeByPack() {
            if (this.iconConfig && this.iconConfig.sizes) {
                if (
                    this.size &&
                    this.iconConfig.sizes[this.size] !== undefined
                ) {
                    return this.iconConfig.sizes[this.size];
                } else if (this.iconConfig.sizes.default) {
                    return this.iconConfig.sizes.default;
                }
            }
            return null;
        },
        useIconComponent() {
            if (this.component) return this.component;
            const component = getValueByPath(getOptions(), "iconComponent");
            if (component) return component;
            return null;
        },
    },
    methods: {
        /**
         * Equivalent icon name of the MDI.
         */
        getEquivalentIconOf(value) {
            // Only transform the class if the both prop is set to true
            if (!this.both) {
                return value;
            }
            if (
                this.iconConfig &&
                this.iconConfig.internalIcons &&
                this.iconConfig.internalIcons[value]
            ) {
                return this.iconConfig.internalIcons[value];
            }
            return value;
        },
    },
});
</script>

<template>
    <span :class="rootClasses" :style="rootStyle">
        <i
            v-if="!useIconComponent"
            :class="[newPack, newIcon, newCustomSize, customClass]" />
        <!-- custom icon component -->
        <component
            :is="useIconComponent"
            v-else
            :icon="[newPack, newIcon]"
            :size="newCustomSize"
            :class="[customClass]" />
    </span>
</template>
