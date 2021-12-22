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
                    :tag="childItem.tag"
                    name="header"
                    @click.native="childClick(childItem)"
                    @keydown.native.left.prevent="leftPressed"
                    @keydown.native.right.prevent="rightPressed"
                    @keydown.native.up.prevent="upPressed"
                    @keydown.native.down.prevent="downPressed"
                    @keydown.native.home.prevent="homePressed"
                    @keydown.native.end.prevent="endPressed"
                    :class="childItem.headerClasses"
                />
                <component
                    v-else
                    :is="childItem.tag"
                    @click="childClick(childItem)"
                    @keydown.left.prevent="leftPressed"
                    @keydown.right.prevent="rightPressed"
                    @keydown.up.prevent="upPressed"
                    @keydown.down.prevent="downPressed"
                    @keydown.home.prevent="homePressed"
                    @keydown.end.prevent="endPressed"
                    :class="childItem.headerClasses">
                    <o-icon
                        v-if="childItem.icon"
                        :rootClass="childItem.headerIconClasses"
                        :icon="childItem.icon"
                        :pack="childItem.iconPack"
                        :size="size"/>
                    <span :class="childItem.headerTextClasses">{{ childItem.label }}</span>
                </component>
            </div>
        </nav>
        <section :class="contentClasses">
            <slot/>
        </section>
    </div>
</template>

<script>
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import TabbedMixin from '../../utils/TabbedMixin.js'
import { getValueByPath } from '../../utils/helpers'
import { getOptions } from '../../utils/config'

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
    configField: 'tabs',
    props: {
        /**
         * Tab type
         * @values boxed, toggle
         */
        type: {
            type: String,
            default: 'default'
        },
         /**
         * Tabs will be expanded (full-width)
         */
        expanded: Boolean,
        /** Tab will have an animation */
        animated: {
            type: Boolean,
            default: () => {
                return getValueByPath(getOptions(), 'tabs.animated', true)
            }
        },
        /** Show tab items multiline when there is no space */
        multiline: Boolean,
        rootClass: [String, Function, Array],
        positionClass: [String, Function, Array],
        expandedClass: [String, Function, Array],
        verticalClass: [String, Function, Array],
        multilineClass: [String, Function, Array],
        navTabsClass: [String, Function, Array],
        navSizeClass: [String, Function, Array],
        navPositionClass: [String, Function, Array],
        contentClass: [String, Function, Array],
        transitioningClass: [String, Function, Array],
        tabItemWrapperClass: [String, Function, Array],
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-tabs'),
                { [this.computedClass('positionClass', 'o-tabs--', this.position)]: this.position && this.vertical },
                { [this.computedClass('expandedClass', 'o-tabs--fullwidth')]: this.expanded },
                { [this.computedClass('verticalClass', 'o-tabs--vertical')]: this.vertical },
                { [this.computedClass('multilineClass', 'o-tabs--multiline')]: this.multiline }
            ]
        },
        itemWrapperClasses() {
            return [
                this.computedClass('tabItemWrapperClass', 'o-tabs__nav-item-wrapper'),
            ]
        },
        navClasses() {
            return [
                this.computedClass('navTabsClass', 'o-tabs__nav'),
                { [this.computedClass('navSizeClass', 'o-tabs__nav--', this.size)]: this.size },
                { [this.computedClass('navPositionClass', 'o-tabs__nav--', this.position)]: this.position && !this.vertical },
            ]
        },
        contentClasses() {
            return [
                this.computedClass('contentClass', 'o-tabs__content'),
                { [this.computedClass('transitioningClass', 'o-tabs__content--transitioning')]: this.isTransitioning }
            ]
        }
    }
}
</script>
