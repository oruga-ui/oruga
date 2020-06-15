<template>
    <div :class="rootClasses">
        <select
            :class="selectClasses"
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

        <o-icon
            v-if="icon"
            class="o-icon-left"
            :icon="icon"
            :pack="iconPack"
            :size="size"/>

         <o-icon
            v-if="iconRight"
            class="o-icon-right"
            :icon="iconRight"
            :pack="iconPack"
            :size="size"
            both />
    </div>
</template>

<script>
import Icon from '../icon/Icon'
import FormElementMixin from '../../utils/FormElementMixin'
import config from '../../utils/config'
import { getValueByPath, getCssClass } from '../../utils/helpers'

export default {
    name: 'OSelect',
    components: {
        [Icon.name]: Icon
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array],
            default: null
        },
        iconRight: {
            type: String,
            default: 'caret-down'
        },
        placeholder: String,
        multiple: Boolean,
        nativeSize: [String, Number],
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.inputClass', '')
                return getCssClass(clazz, override, 'o-control-select')
            }
        },
        selectClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.selectClass', '')
                return getCssClass(clazz, override, 'o-select')
            }
        },
        roundedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.roundedClass', '')
                return getCssClass(clazz, override, 'o-select-rounded')
            }
        },
        multipleClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.multipleClass', '')
                return getCssClass(clazz, override, 'o-select-multiple')
            }
        },
        emptyClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'select.override', false)
                const clazz = getValueByPath(config, 'select.emptyClass', '')
                return getCssClass(clazz, override, 'o-select-empty')
            }
        }
    },
    data() {
        return {
            selected: this.value,
            _elementRef: 'select'
        }
    },
    computed: {
        rootClasses() {
            return [
                this.rootClass,
                this.icon && 'o-control-select-icons-left',
                this.iconRight && 'o-control-select-icons-right',
                this.expanded && 'o-control-select-expanded'
            ]
        },
        selectClasses() {
            return [
                this.selectClass,
                this.size && 'o-size',
                this.statusVariant && 'o-color-' + this.statusVariant, 
                this.rounded && this.roundedClass, 
                this.selected === null && this.emtpyClass, 
                this.multiple && this.multipleClass, 
                this.expanded && 'o-select-expanded'
            ]
        },
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
@import "../../scss/oruga.scss";

.o-control-select {
    display: inline-flex;
    position: relative;
    font-size: $base-font-size;
    &.o-control-select-icons-right .o-icon.o-icon-right {
        right: 0;
        height: $select-height;
        position: absolute;
        top: 0;
        width: $select-height;
        z-index: $select-control-icon-zindex;
        &:not(.o-icon-clickable) {
            pointer-events: none;
        }
    }
    &.o-control-select-icons-left .o-icon.o-icon-left {
        left: 0;
        height: $select-height;
        pointer-events: none;
        position: absolute;
        top: 0;
        width: $select-height;
        z-index: $select-control-icon-zindex;
        &:not(.o-icon-clickable) {
            pointer-events: none;
        }
    }
    &.o-control-select-icons-left .o-select {
        padding-left: $select-height;
    }
    &.o-control-select-icons-right .o-select {
        padding-right: $select-height;
    }
    &.o-control-select-expanded {
        flex-grow: 1;
        flex-shrink: 1;
    }
}

.o-select {
    -moz-appearance: none;
    -webkit-appearance: none;
    display: inline-block;
    position: relative;
    vertical-align: top;
    cursor: pointer;
    justify-content: flex-start;
    align-items: center;
    outline: 0;
    font-size: $select-font-size;
    max-width: $select-max-width;
    background-color: $select-background-color;
    border-color: $select-border-color;
    border-radius: $select-border-radius;
    color: $select-color;
    margin: $select-margin;
    box-shadow: $select-box-shadow;
    height: $select-height;
    line-height: $select-line-height;
    padding: $select-padding;
    &:not(.o-select-multiple) {
        height: $select-height;
    }
    @each $name, $value in $sizes {
        &.o-size-#{$name} {
            font-size: $value;
        }
    }
    @each $name, $pair in $colors {
        $color: nth($pair, 1);
        &.o-color-#{$name} {
            border-color: $color;
        }
    } 
    option {
        color: $select-option-color;
        padding: $select-option-padding;
    }
    option:disabled {
        opacity: $select-option-disabled-opacity;
    }
    optgroup {
        color: $select-optgroup-color;
        font-weight: $select-optgroup-font-weight;
        font-style: $select-optgroup-font-style;
        padding: $select-optgroup-padding;
    }
    &.o-select-empty select {
        color: $select-empty-color;
    }
    &.o-select-expanded {
        width: 100%;
    }
}

</style>