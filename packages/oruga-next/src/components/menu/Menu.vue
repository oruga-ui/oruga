<template>
    <div :class="rootClasses">
        <slot />
    </div>
</template>

<script lang="ts">
import BaseComponentMixin from '../../utils/BaseComponentMixin';
import {defineComponent} from "vue";

/**
 * A simple menu
 * @displayName Menu
 * @style _menu.scss
 */
export default defineComponent({
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
            menuItems: [],
        }
    },
    computed: {
        rootClasses() {
            return this.computedClass('rootClass', 'o-menu')
        },
    },
    methods: {
        registerMenuItem(item) {
            this.menuItems.push(item);
        },
        resetMenu(excludedItems = []) {
            this.menuItems.forEach((item) => {
                if (!excludedItems.includes(item)) item.reset();
            });
        },
    },
    provide() {
        return {
            registerMenuItem: this.registerMenuItem,
            resetMenu: this.resetMenu,
            accordion: () => this.accordion,
            activable: () => this.activable,
        }
    }
})
</script>
