
<template>
    <div class="menu">
        <slot />
    </div>
</template>

<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin'

/**
 * Responsive menu
 * @displayName Menu
 * @requires ./MenuItem.vue
 * @example ./examples/Menu.md
 * @style _menu.scss
 */
export default {
    name: 'OMenu',
    mixins: [BaseComponentMixin],
    props: {
        accordion: {
            type: Boolean,
            default: true
        },
        activable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            _isMenu: true // Used by MenuItem
        }
    }
}
</script>
