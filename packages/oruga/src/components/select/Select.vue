<template>
    <div
        class="control"
        :class="{ 'is-expanded': expanded, 'has-icons-left': icon }">
        <span class="select" :class="spanClasses">

            <select
                v-model="computedValue"
                ref="select"
                :multiple="multiple"
                :size="nativeSize"
                v-bind="$attrs"
                @blur="$emit('blur', $event) && checkHtml5Validity()"
                @focus="$emit('focus', $event)">

                <template v-if="placeholder">
                    <option
                        v-if="computedValue == null"
                        :value="null"
                        disabled
                        hidden>
                        {{ placeholder }}
                    </option>
                </template>

                <slot/>

            </select>
        </span>

        <o-icon
            v-if="icon"
            class="is-left"
            :icon="icon"
            :pack="iconPack"
            :size="size"/>
    </div>
</template>

<script>
import Icon from '../icon/Icon'
import FormElementMixin from '../../utils/FormElementMixin'

export default {
    name: 'OSelect',
    components: {
        [Icon.name]: Icon
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array, Function],
            default: null
        },
        placeholder: String,
        multiple: Boolean,
        nativeSize: [String, Number]
    },
    data() {
        return {
            selected: this.value,
            _elementRef: 'select'
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.selected
            },
            set(value) {
                this.selected = value
                this.$emit('input', value)
                !this.isValid && this.checkHtml5Validity()
            }
        },
        spanClasses() {
            return [
                this.size && 'o-size',
                this.statusVariant && 'o-color-' + this.statusVariant, {
                'is-fullwidth': this.expanded,
                'is-loading': this.loading,
                'is-multiple': this.multiple,
                'is-rounded': this.rounded,
                'is-empty': this.selected === null
            }]
        }
    },
    watch: {
        /**
        * When v-model is changed:
        *   1. Set the selected option.
        *   2. If it's invalid, validate again.
        */
        value(value) {
            this.selected = value
            !this.isValid && this.checkHtml5Validity()
        }
    }
}
</script>

<style lang="scss">
@import "../../scss/variables.scss";

$select-arrow-color: $primary !default;

.select {
    display: inline-block;
    max-width: 100%;
    position: relative;
    vertical-align: top;
    &:not(.is-multiple) {
        height: 2.5em;
    }
    &:not(.is-multiple):not(.is-loading)::after {
        border-color: #3273dc;
        right: 1.125em;
        z-index: 4;
        border: 3px solid transparent;
        border-radius: 2px;
        border-right: 0;
        border-top: 0;
        content: " ";
        display: block;
        height: .625em;
        margin-top: -.4375em;
        pointer-events: none;
        position: absolute;
        top: 50%;
        transform: rotate(-45deg);
        transform-origin: center;
        width: .625em;
    }
    @each $name, $value in $sizes {
        &.o-size-#{$name} {
            font-size: $value;
        }
    }
    @each $name, $pair in $colors {
        $color: nth($pair, 1);
        &.o-color-#{$name} {
            select {
                border-color: $color;
            }
        }
    }
    select {
        cursor: pointer;
        display: block;
        font-size: 1em;
        max-width: 100%;
        outline: 0;
        background-color: #fff;
        border-color: #dbdbdb;
        border-radius: 4px;
        color: #363636;
        padding-right: 2em;
        margin: 0;
        -moz-appearance: none;
        -webkit-appearance: none;
        align-items: center;
        box-shadow: none;
        // height: 2em;
        justify-content: flex-start;
        line-height: 1.5;
        padding-bottom: calc(.5em - 1px);
        padding-left: calc(.75em - 1px);
        padding-top: calc(.5em - 1px);
        position: relative;
        option {
            // color: $grey-dark;
           //  padding: $control-padding-vertical $control-padding-horizontal;
        }
        option:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
        optgroup {
            // color: $grey-light;
            font-weight: 500;
            font-style: normal;
            padding: 0.25em 0;
        }
    }
    &.is-empty select {
        color: rgba($grey, 0.7);
    }
    &:not(.is-loading) {
        &::after {
            border-color: $select-arrow-color !important;
        }
    }
    // fix Bulma 0.8.2
    &.is-loading::after {
        top: calc(50% - (1em / 2));
        right: calc((2.5em / 2) - .5em);
    }
}

</style>