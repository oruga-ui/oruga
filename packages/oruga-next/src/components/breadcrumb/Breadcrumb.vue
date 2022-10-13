<template>
    <section :class="elementsWrapperClasses">
        <ul class="o-breadcrumb o-breadcrumb--medium o-breadcrumb__slash-separator">
            <slot/>
        </ul>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// import Icon from '../icon/Icon'

import BaseComponentMixin from '../../utils/BaseComponentMixin'
import { getValueByPath } from '../../utils/helpers'
import { getOptions } from '../../utils/config'

/**
 * The classic breadcrumb, in different colors, sizes, and states
 * @displayName Breadcrumb
 * @requires ./BreadcrumbItem.vue
 * @style _breadcrumb.scss
 */
export default defineComponent({
    name: 'OBreadcrumb',
    components: {
        // [Icon.name]: Icon
    },
    configField: 'breadcrumb',
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
        /**
         * Available separators
         * @values arrow, bullet, dot, succeeds
        */
        separator: String,
        /**
         * Alignement
         * @values left, centered, right
        */
        align: String,
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
        // iconBoth: Boolean, // This is used internally
        elementsWrapperClass: [String, Function, Array],
        rootClass: [String, Function, Array],
        // disabledClass: [String, Function, Array],
        // activeClass: [String, Function, Array],
        separatorClass: [String, Function, Array],
        alignClass: [String, Function, Array],
        iconClass: [String, Function, Array],
        iconLeftClass: [String, Function, Array],
        iconRightClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array]
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-breadcrumb'),
                this.computedClass('sizeClass', 'o-breadcrumb--', this.size),
                this.computedClass('separatorClass', 'o-breadcrumb__', this.separator + "-separator"),
                this.computedClass('alignClass', 'o-breadcrumb__', this.align),
                this.computedClass('variantClass', 'o-breadcrumb--', this.variant),

                // { [this.computedClass('outlinedClass', 'o-btn--outlined')]: this.outlined && !this.variant },
                // { [this.computedClass('invertedClass', 'o-btn--inverted')]: this.inverted && !this.variant },
                // { [this.computedClass('outlinedClass', 'o-btn--outlined-', this.variant)]: this.outlined && this.variant },
                // { [this.computedClass('invertedClass', 'o-btn--inverted-', this.variant)]: this.inverted && this.variant },
                // { [this.computedClass('expandedClass', 'o-btn--expanded')]: this.expanded },
                // { [this.computedClass('roundedClass', 'o-btn--rounded')]: this.rounded },
                // { [this.computedClass('disabledClass', 'o-btn--disabled')]: this.disabled },
            ]
        },
        // iconClasses() {
        //     return [
        //         this.computedClass('iconClass', 'o-btn__icon'),
        //     ]
        // },
        // iconLeftClasses() {
        //     return [
        //         ...this.iconClasses,
        //         this.computedClass('iconLeftClass', 'o-btn__icon-left')
        //     ]
        // },
        // iconRightClasses() {
        //     return [
        //         ...this.iconClasses,
        //         this.computedClass('iconRightClass', 'o-btn__icon-right')
        //     ]
        // },
        // elementsWrapperClasses() {
        //     return [
        //         this.computedClass('elementsWrapperClass', 'o-breadcrumb__wrapper'),
        //     ]
        // },
        // computedTag() {
        //     if (this.disabled !== undefined && this.disabled !== false) {
        //         return 'button'
        //     }
        //     return this.tag
        // },
    }
})
</script>
