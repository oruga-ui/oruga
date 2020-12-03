<template>
    <div :class="rootClasses">
        <nav :class="navClasses">
            <ul>
                <li
                    v-for="childItem in items"
                    :key="childItem.newValue"
                    v-show="childItem.visible"
                    :class="childItem.headerClasses">
                    <o-slot-component
                        v-if="childItem.$scopedSlots.header"
                        :component="childItem"
                        name="header"
                        tag="button"
                        @click.native="childClick(childItem)"
                    />
                    <button v-else @click="childClick(childItem)">
                        <o-icon
                            v-if="childItem.icon"
                            :icon="childItem.icon"
                            :pack="childItem.iconPack"
                            :size="size"/>
                        <span>{{ childItem.label }}</span>
                    </button>
                </li>
            </ul>
        </nav>
        <section :class="contentClasses">
            <slot/>
        </section>
    </div>
</template>

<script>
import config from '../../utils/config'
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import TabbedMixin from '../../utils/TabbedMixin.js'
import { getValueByPath } from '../../utils/helpers'

/**
 * Responsive horizontal navigation tabs, switch between contents with ease
 * @displayName Tabs
 * @requires ./TabItem.vue
 * @example ./examples/Tabs.md
 * @style _tabs.scss
 */
export default {
    name: 'OTabs',
    mixins: [BaseComponentMixin, TabbedMixin('tab')],
    props: {
        /**
         * Tab type
         * @values boxed, toggle
         */
        type: [String, Object],
         /**
         * Tabs will be expanded (full-width)
         */
        expanded: Boolean,
        /** Tab will have an animation */
        animated: {
            type: Boolean,
            default: () => {
                return getValueByPath(config, 'tabs.animated', true)
            }
        },
        /** Show tab items multiline when there is no space */
        multiline: Boolean,
        rootClass: String,
        positionWrapperClass: String,
        expandedWrapperClass: String,
        verticalWrapperClass: String,
        multilineWrapperClass: String,
        tabsClass: String,
        typeClass: String,
        sizeClass: String,
        positionClass: String,
        contentClass: String,
        transitioningClass: String,
        tabItemHeaderActiveClass: String,
        tabItemHeaderDisabledClass: String
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('tabs', 'rootClass', 'o-tabs-wrapper'),
                { [this.computedClass('tabs', 'positionWrapperClass', 'o-tabs-wrapper-position-', this.position)]: this.position && this.vertical },
                { [this.computedClass('tabs', 'expandedWrapperClass', 'o-tabs-wrapper-fullwidth')]: this.expanded },
                { [this.computedClass('tabs', 'verticalWrapperClass', 'o-tabs-wrapper-vertical')]: this.vertical },
                { [this.computedClass('tabs', 'multilineWrapperClass', 'o-tabs-wrapper-multiline')]: this.multiline }
            ]
        },
        navClasses() {
            return [
                this.computedClass('tabs', 'tabsClass', 'o-tabs'),
                { [this.computedClass('tabs', 'typeClass', 'o-tabs-', this.type)]: this.type },
                { [this.computedClass('tabs', 'sizeClass', 'o-size-', this.size)]: this.size },
                { [this.computedClass('tabs', 'positionClass', 'o-tabs-position-', this.position)]: this.position && !this.vertical },
            ]
        },
        contentClasses() {
            return [
                this.computedClass('tabs', 'contentClass', 'o-tab-content'),
                { [this.computedClass('tabs', 'transitioningClass', 'o-tab-content-transitioning')]: this.isTransitioning }
            ]
        }
    }
}
</script>
