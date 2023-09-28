<script lang="ts">
import { defineComponent } from "vue";

import CheckRadioMixin from "../../utils/CheckRadioMixin";
import BaseComponentMixin from "../../utils/BaseComponentMixin";

/**
 * Select an option from a set
 * @displayName Radio
 * @style _radio.scss
 */
export default defineComponent({
    name: "ORadio",
    mixins: [BaseComponentMixin, CheckRadioMixin],
    configField: "radio",
    emits: ["input"],
    props: {
        /**
         * Input label, unnecessary when default slot is used
         */
        label: {
            type: String,
            default: undefined,
        },
        /** Accessibility label to establish relationship between the checkbox and control label */
        ariaLabelledby: String,
        rootClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        checkedClass: [String, Function, Array],
        checkCheckedClass: [String, Function, Array],
        checkClass: [String, Function, Array],
        labelClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array],
    },
    computed: {
        getLabel() {
            return this.$refs.label;
        },
        isChecked() {
            return this.modelValue === this.nativeValue;
        },
        rootClasses() {
            return [
                this.computedClass("rootClass", "o-radio"),
                {
                    [this.computedClass("checkedClass", "o-radio--checked")]:
                        this.isChecked,
                },
                {
                    [this.computedClass("sizeClass", "o-radio--", this.size)]:
                        this.size,
                },
                {
                    [this.computedClass("disabledClass", "o-radio--disabled")]:
                        this.disabled,
                },
                {
                    [this.computedClass(
                        "variantClass",
                        "o-radio--",
                        this.variant,
                    )]: this.variant,
                },
            ];
        },
        checkClasses() {
            return [
                this.computedClass("checkClass", "o-radio__check"),
                {
                    [this.computedClass(
                        "checkCheckedClass",
                        "o-radio__check--checked",
                    )]: this.isChecked,
                },
            ];
        },
        labelClasses() {
            return [this.computedClass("labelClass", "o-radio__label")];
        },
    },
});
</script>

<template>
    <label
        :class="rootClasses"
        ref="label"
        @click.stop="focus"
        @keydown.prevent.enter="getLabel.click()">
        <input
            v-model="computedValue"
            type="radio"
            ref="input"
            @click.stop
            :class="checkClasses"
            :disabled="disabled"
            :required="required"
            :name="name"
            :value="nativeValue"
            :aria-labelledby="ariaLabelledby" />
        <span
            v-if="label || $slots.default"
            :id="ariaLabelledby"
            :class="labelClasses">
            <slot>{{ label }}</slot>
        </span>
    </label>
</template>
