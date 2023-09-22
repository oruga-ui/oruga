<script lang="ts">
import { defineComponent } from "vue";

import BaseComponentMixin from "../../mixins/BaseComponentMixin";
import CheckRadioMixin from "../../mixins/CheckRadioMixin";

/**
 * Select a single or grouped options
 * @displayName Checkbox
 * @style _checkbox.scss
 */
export default defineComponent({
    name: "OCheckbox",
    mixins: [BaseComponentMixin, CheckRadioMixin],
    configField: "checkbox",
    props: {
        /**
         * Input label, unnecessary when default slot is used
         */
        label: {
            type: String,
            default: undefined,
        },
        /**
         * Same as native indeterminate
         */
        indeterminate: {
            type: Boolean,
            default: false,
        },
        /**
         * Overrides the returned value when it's checked
         */
        trueValue: {
            type: [String, Number, Boolean],
            default: true,
        },
        /**
         * Overrides the returned value when it's not checked
         */
        falseValue: {
            type: [String, Number, Boolean],
            default: false,
        },
        /** Accessibility label to establish relationship between the checkbox and control label */
        ariaLabelledby: String,
        /* Same as native autocomplete */
        autocomplete: String,
        rootClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        checkClass: [String, Function, Array],
        checkedClass: [String, Function, Array],
        checkCheckedClass: [String, Function, Array],
        checkIndeterminateClass: [String, Function, Array],
        labelClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array],
    },
    emits: ["input"],
    computed: {
        getLabel() {
            return this.$refs.label;
        },
        isChecked() {
            return (
                this.computedValue === this.trueValue ||
                (Array.isArray(this.computedValue) &&
                    this.computedValue.indexOf(this.nativeValue) !== -1)
            );
        },
        rootClasses() {
            return [
                this.computedClass("rootClass", "o-chk"),
                {
                    [this.computedClass("checkedClass", "o-chk--checked")]:
                        this.isChecked,
                },
                {
                    [this.computedClass("sizeClass", "o-chk--", this.size)]:
                        this.size,
                },
                {
                    [this.computedClass("disabledClass", "o-chk--disabled")]:
                        this.disabled,
                },
                {
                    [this.computedClass(
                        "variantClass",
                        "o-chk--",
                        this.variant,
                    )]: this.variant,
                },
            ];
        },
        checkClasses() {
            return [
                this.computedClass("checkClass", "o-chk__check"),
                {
                    [this.computedClass(
                        "checkCheckedClass",
                        "o-chk__check--checked",
                    )]: this.isChecked,
                },
                {
                    [this.computedClass(
                        "checkIndeterminateClass",
                        "o-chk__check--indeterminate",
                    )]: this.isIndeterminate,
                },
            ];
        },
        labelClasses() {
            return [this.computedClass("labelClass", "o-chk__label")];
        },
    },
    watch: {
        indeterminate: {
            handler(val) {
                this.isIndeterminate = val;
            },
            immediate: true,
        },
    },
});
</script>

<template>
    <label
        ref="label"
        :class="rootClasses"
        @click.stop="focus"
        @keydown.prevent.enter="getLabel.click()">
        <input
            v-bind="$attrs"
            ref="input"
            v-model="computedValue"
            type="checkbox"
            :class="checkClasses"
            :disabled="disabled"
            :required="required"
            :name="name"
            :autocomplete="autocomplete"
            :value="nativeValue"
            :indeterminate.prop="indeterminate"
            :true-value="trueValue"
            :false-value="falseValue"
            :aria-labelledby="ariaLabelledby"
            @click.stop />
        <span
            v-if="label || $slots.default"
            :id="ariaLabelledby"
            :class="labelClasses">
            <slot>{{ label }}</slot>
        </span>
    </label>
</template>
