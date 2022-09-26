<template>
    <div>
        <div
            v-if="label || $slots.label"
            :class="labelClass"
        >
            <o-icon
                v-if="label && icon"
                :icon="icon"
                :pack="iconPack"
                :size="size"
            />
            <span v-if="label">{{ label }}</span>
            <slot
                v-else
                name="label"
            />
        </div>
        <ul
            :class="listClass"
            :role="computedAriaRole"
        >
            <slot />
        </ul>
    </div>
</template>

<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin';

export default {
    name: 'OMenuList',
    configField: 'menu',
    mixins: [BaseComponentMixin],
    props: {
        label: String,
        icon: String,
        iconPack: String,
        /**
         * Icon size, optional
         * @values small, medium, large
         */
        size: String,
    },
    computed: {
        listClass() {
            return this.computedClass('listClass', 'o-menu-list');
        },
        labelClass() {
            return this.computedClass('listLabelClass', 'o-menu-label');
        },
        computedAriaRole() {
            return this.ariaRole === 'menu' ? this.ariaRole : null;
        },
    },
}
</script>
