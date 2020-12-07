<template>
    <div :class="rootClasses">
        <nav :class="navClasses">
            <div
                v-for="childItem in items"
                :key="childItem.newValue"
                v-show="childItem.visible"
                :class="itemWrapperClasses">
                    <o-slot-component
                        v-if="childItem.$scopedSlots.header"
                        :component="childItem"
                        name="header"
                        tag="button"
                        @click.native="childClick(childItem)"
                        :class="childItem.headerClasses"
                    />
                    <button v-else @click="childClick(childItem)" :class="itemHeaderClasses(childItem)">
                        <o-icon
                            v-if="childItem.icon"
                            :rootClass="itemHeaderIconClasses.join(' ')"
                            :icon="childItem.icon"
                            :pack="childItem.iconPack"
                            :size="size"/>
                        <span :class="itemHeaderTextClasses">{{ childItem.label }}</span>
                    </button>
            </div>
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
        tabItemHeaderClass: String,
        tabItemHeaderIconClass: String,
        tabItemHeaderTextClass: String,
        tabItemHeaderActiveClass: String,
        tabItemHeaderDisabledClass: String,
        tabItemWrapperClass: String
    },
    methods: {
        itemHeaderClasses(childItem) {
            return [
                this.computedClass('tabs', 'tabItemHeaderClass', 'o-tabs__nav-item'),
                { [this.computedClass('tabs', 'tabItemHeaderActiveClass', 'o-tabs__nav-item--active')]: childItem.isActive },
                { [this.computedClass('tabs', 'tabItemHeaderDisabledClass', 'o-tabs__nav-item--disabled')]: childItem.disabled }
            ]
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('tabs', 'rootClass', 'o-tabs'),
                { [this.computedClass('tabs', 'positionWrapperClass', 'o-tabs--', this.position)]: this.position && this.vertical },
                { [this.computedClass('tabs', 'expandedWrapperClass', 'o-tabs--fullwidth')]: this.expanded },
                { [this.computedClass('tabs', 'verticalWrapperClass', 'o-tabs--vertical')]: this.vertical },
                { [this.computedClass('tabs', 'multilineWrapperClass', 'o-tabs--multiline')]: this.multiline }
            ]
        },
        itemWrapperClasses() {
            return [
                this.computedClass('tabs', 'tabItemWrapperClass', 'o-tabs__nav-item-wrapper'),
            ]
        },
        navClasses() {
            return [
                this.computedClass('tabs', 'tabsClass', 'o-tabs__nav'),
                { [this.computedClass('tabs', 'typeClass', 'o-tabs__nav--', this.type)]: this.type },
                { [this.computedClass('tabs', 'sizeClass', 'o-tabs__nav--', this.size)]: this.size },
                { [this.computedClass('tabs', 'positionClass', 'o-tabs__nav--', this.position)]: this.position && !this.vertical },
            ]
        },
        contentClasses() {
            return [
                this.computedClass('tabs', 'contentClass', 'o-tabs__content'),
                { [this.computedClass('tabs', 'transitioningClass', 'o-tabs__content--transitioning')]: this.isTransitioning }
            ]
        },
        itemHeaderIconClasses() {
            return [
                this.computedClass('tabs', 'tabItemHeaderIconClass', 'o-tabs__nav-item-icon')
            ]
        },
        itemHeaderTextClasses() {
            return [
                this.computedClass('tabs', 'tabItemHeaderTextClass', 'o-tabs__nav-item-text')
            ]
        }
    }
}
</script>
