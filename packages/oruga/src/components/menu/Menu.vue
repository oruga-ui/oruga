<template>
    <div :class="rootClasses">
        <slot />
    </div>
</template>

<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin';

/**
 * A simple menu
 * @displayName M
 * @style _menu.scss
 */
export default {
    name: 'OMenu',
    configField: 'menu',
    mixins: [BaseComponentMixin],
    props: {
        accordion: {
            type: Boolean,
            default: true
        },
        activable: {
            type: Boolean,
            default: true
        },
        rootClass: [String, Array, Function]
    },
    data() {
        return {
            isMenu: true // Used by MenuItem
        }
    },
    computed: {
        rootClasses() {
            return this.computedClass('rootClass', 'o-menu')
        }
    }
}
</script>
