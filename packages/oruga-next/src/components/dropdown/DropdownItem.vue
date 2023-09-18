<script lang="ts">
import type { Component, PropType } from "vue";
import { defineComponent } from "vue";

import BaseComponentMixin from "../../utils/BaseComponentMixin";

import { getOptions } from "../../utils/config";
import { getValueByPath } from "../../utils/helpers";

/**
 * @displayName Dropdown Item
 */
export default defineComponent({
    name: "ODropdownItem",
    mixins: [BaseComponentMixin],
    configField: "dropdown",
    inject: ["$dropdown"],
    props: {
        /**
         * The value that will be returned on events and v-model
         */
        value: {
            type: [String, Number, Boolean, Object, Array],
        },
        /**
         * Item is disabled
         */
        disabled: Boolean,
        /**
         * Item is clickable and emit an event
         */
        clickable: {
            type: Boolean,
            default: true,
        },
        /**
         * Dropdown item tag name
         */
        tag: {
            type: [String, Object, Function] as PropType<string | Component>,
            default: () => {
                return getValueByPath(getOptions(), "dropdown.itemTag", "div");
            },
        },
        tabindex: {
            type: [Number, String],
            default: 0,
        },
        ariaRole: {
            type: String,
            default: "",
        },
        itemClass: [String, Function, Array],
        itemActiveClass: [String, Function, Array],
        itemDisabledClass: [String, Function, Array],
    },
    emits: ["click"],
    computed: {
        parent() {
            return this.$dropdown;
        },
        rootClasses() {
            return [
                this.computedClass("itemClass", "o-drop__item"),
                {
                    [this.computedClass(
                        "itemDisabledClass",
                        "o-drop__item--disabled",
                    )]: this.parent.disabled || this.disabled,
                },
                {
                    [this.computedClass(
                        "itemActiveClass",
                        "o-drop__item--active",
                    )]: this.isActive,
                },
            ];
        },
        ariaRoleItem() {
            return this.ariaRole === "menuitem" || this.ariaRole === "listitem"
                ? this.ariaRole
                : null;
        },
        isClickable() {
            return !this.parent.disabled && !this.disabled && this.clickable;
        },
        isActive() {
            if (this.parent.selected === null) return false;
            if (this.parent.multiple)
                return this.parent.selected.indexOf(this.value) >= 0;
            return this.value === this.parent.selected;
        },
    },
    created() {
        if (!this.parent) {
            throw new Error("You should wrap oDropdownItem on a oDropdown");
        }
    },
    methods: {
        /**
         * Click listener, select the item.
         */
        selectItem() {
            if (!this.isClickable) return;

            this.parent.selectItem(this.value);
            this.$emit("click");
        },
    },
});
</script>

<template>
    <component
        :is="tag"
        :class="rootClasses"
        :role="ariaRoleItem"
        :tabindex="tabindex"
        @click="selectItem">
        <slot />
    </component>
</template>
