<template>
    <div :class="rootClass">
        <slot />
    </div>
</template>

<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin';

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
        }
    },
    data() {
        return {
            isMenu: true // Used by MenuItem
        }
    },
    computed: {
        rootClass() {
            return this.computedClass('rootClass', 'o-menu')
        },
    },
}
</script>
