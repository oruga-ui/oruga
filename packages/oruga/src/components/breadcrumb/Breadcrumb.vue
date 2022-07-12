<template>
    <section>
        <ul class="o-breadcrumb o-breadcrumb--medium o-breadcrumb__slash-separator">
            <slot/>
        </ul>
    </section>
</template>

<script>
import Icon from '../icon/Icon'

import BaseComponentMixin from '../../utils/BaseComponentMixin'
import { getValueByPath } from '../../utils/helpers'
import { getOptions } from '../../utils/config'

/**
 * The classic breadcrumb, in different colors, sizes, and states
 * @displayName Breadcrumb
 * @example ./examples/Breadcrumb.md
 * @style _breadcrumb.scss
 */
export default {
    name: 'OBreadcrumb',
    components: {
        [Icon.name]: Icon
    },
    configField: 'button',
    mixins: [BaseComponentMixin],
    inheritAttrs: false,
    props: {
        /**
        * Color of the control, optional
        * @values primary, info, success, warning, danger, and any other custom color
        */
        variant: String,
        /**
         * Size of button, optional
         * @values small, medium, large
         */
        size: String,
        /**
         * Icon pack to use
         * @values mdi, fa, fas and any other custom icon pack
         */
        iconPack: String,
        /**
         * Icon name to show on the left
         */
        iconLeft: String,
        /**
         * Icon name to show on the right
         */
        iconRight: String,

        /**  @ignore */
        iconBoth: Boolean, // This is used internally
        elementsWrapperClass: [String, Function, Array],
        rootClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        activeClass: [String, Function, Array],
        separatorClass: [String, Function, Array],
        iconClass: [String, Function, Array],
        iconLeftClass: [String, Function, Array],
        iconRightClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array]
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-btn'),
                { [this.computedClass('sizeClass', 'o-btn--', this.size)]: this.size },
                { [this.computedClass('variantClass', 'o-btn--', this.variant)]: this.variant },
                // { [this.computedClass('outlinedClass', 'o-btn--outlined')]: this.outlined && !this.variant },
                // { [this.computedClass('invertedClass', 'o-btn--inverted')]: this.inverted && !this.variant },
                // { [this.computedClass('outlinedClass', 'o-btn--outlined-', this.variant)]: this.outlined && this.variant },
                // { [this.computedClass('invertedClass', 'o-btn--inverted-', this.variant)]: this.inverted && this.variant },
                // { [this.computedClass('expandedClass', 'o-btn--expanded')]: this.expanded },
                // { [this.computedClass('roundedClass', 'o-btn--rounded')]: this.rounded },
                { [this.computedClass('disabledClass', 'o-btn--disabled')]: this.disabled },
            ]
        },
        iconClasses() {
            return [
                this.computedClass('iconClass', 'o-btn__icon'),
            ]
        },
        iconLeftClasses() {
            return [
                ...this.iconClasses,
                this.computedClass('iconLeftClass', 'o-btn__icon-left')
            ]
        },
        iconRightClasses() {
            return [
                ...this.iconClasses,
                this.computedClass('iconRightClass', 'o-btn__icon-right')
            ]
        },
        elementsWrapperClasses() {
            return [
                this.computedClass('elementsWrapperClass', 'o-btn__wrapper'),
            ]
        },
        computedTag() {
            if (this.disabled !== undefined && this.disabled !== false) {
                return 'button'
            }
            return this.tag
        },
    }
}
</script>
