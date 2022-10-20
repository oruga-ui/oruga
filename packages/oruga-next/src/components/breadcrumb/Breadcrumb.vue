<template>
    <section :class="elementsWrapperClasses">
        <ul :class="rootClasses">
            <slot/>
        </ul>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
    configField: 'breadcrumb',
    mixins: [BaseComponentMixin],
    inheritAttrs: false,
    props: {
        /**
        * Color of the control, optional
        * @values primary, info, success, warning, danger, and any other custom color
        */
        variant: { type: String, default: "primary"},
        /**
         * Size of button, optional
         * @values small, medium, large
         */
        size: { type: String, default: "medium"},
        /**
         * Available separators
         * @values slash, arrow, bullet, dot, chevron
        */
        separator: { type: String, default: "slash"},
        /**
         * Alignnement
         * @values left, center, right
        */
        align: { type: String, default: 'left'},
        /**
         * Icon pack to use
         * @values mdi, fa, fas and any other custom icon pack
         */
        /**  @ignore */
        // iconBoth: Boolean, // This is used internally
        rootClass: [String, Function, Array],
        separatorClass: [String, Function, Array],
        alignClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array]
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-breadcrumb'),
                this.computedClass('sizeClass', 'o-breadcrumb--', this.size),
                this.computedClass('separatorClass', 'o-breadcrumb--', this.separator + "-separator"),
                this.computedClass('alignClass', 'o-breadcrumb--', this.align),
                this.computedClass('variantClass', 'o-breadcrumb--', this.variant),
            ]
        },
    }
})
</script>
