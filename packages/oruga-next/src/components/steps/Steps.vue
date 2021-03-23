<template>
    <div :class="wrapperClasses">
        <nav :class="mainClasses">
            <div
                v-for="(childItem, index) in items"
                :key="childItem.newValue"
                v-show="childItem.visible"
                :class="childItem.itemClasses"
            >
                <span
                    v-if="index > 0"
                    :class="stepDividerClasses">
                </span>
                <a
                    :class="stepLinkClasses(childItem)"
                    @click="isItemClickable(childItem) && childClick(childItem)">
                    <div :class="stepMarkerClasses">
                        <o-icon
                            v-if="childItem.icon"
                            :icon="childItem.icon"
                            :pack="childItem.iconPack"
                            :size="size"/>
                        <span v-else-if="childItem.step">{{ childItem.step }}</span>
                    </div>
                    <div :class="stepLinkLabelClasses">{{ childItem.label }}</div>
                </a>
            </div>
        </nav>
        <section :class="stepContentClasses">
            <slot/>
        </section>
        <slot
            name="navigation"
            :previous="navigationProps.previous"
            :next="navigationProps.next">
            <nav v-if="hasNavigation" :class="stepNavigationClasses">
                <o-button
                    role="button"
                    :icon-left="iconPrev"
                    :icon-pack="iconPack"
                    icon-both
                    :disabled="navigationProps.previous.disabled"
                    @click.prevent="navigationProps.previous.action"
                    :aria-label="ariaPreviousLabel">
                </o-button>
                <o-button
                    role="button"
                    :icon-left="iconNext"
                    :icon-pack="iconPack"
                    icon-both
                    :disabled="navigationProps.next.disabled"
                    @click.prevent="navigationProps.next.action"
                    :aria-label="ariaNextLabel">
                </o-button>
            </nav>
        </slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Button from '../button/Button.vue'
import Icon from '../icon/Icon.vue'

import BaseComponentMixin from '../../utils/BaseComponentMixin'
import TabbedMixin from '../../utils/TabbedMixin'
import MatchMediaMixin from '../../utils/MatchMediaMixin'

import { getOptions } from '../../utils/config'
import { getValueByPath } from '../../utils/helpers'

/**
 * Responsive horizontal process steps
 * @displayName Steps
 * @requires ./StepItem.vue
 * @example ./examples/Steps.md
 * @style _steps.scss
 */
export default defineComponent({
    name: 'OSteps',
    components: {
        [Button.name]: Button,
        [Icon.name]: Icon
    },
    configField: 'steps',
    mixins: [BaseComponentMixin, MatchMediaMixin, TabbedMixin('step')],
    props: {
        /**
         * Icon pack to use for the navigation
         * @values mdi, fa, fas and any other custom icon pack
         */
        iconPack: String,
        /** Icon to use for navigation button */
        iconPrev: {
            type: String,
            default: () => {
                return getValueByPath(getOptions(), 'steps.iconPrev', 'chevron-left')
            }
        },
        /** Icon to use for navigation button */
        iconNext: {
            type: String,
            default: () => {
                return getValueByPath(getOptions(), 'steps.iconNext', 'chevron-right')
            }
        },
        /**
         * Next and previous buttons below the component. You can use this property if you want to use your own custom navigation items.
         */
        hasNavigation: {
            type: Boolean,
            default: true
        },
        /**
         * Step navigation is animated
         */
        animated: {
            type: Boolean,
            default: true
        },
        /**
         * Position of the marker label, optional
         * @values bottom, right, left
         */
        labelPosition: {
            type: String,
            validator(value: string) {
                return [
                    'bottom',
                    'right',
                    'left'
                ].indexOf(value) > -1
            },
            default: 'bottom'
        },
        /** Rounded step markers */
        rounded: {
            type: Boolean,
            default: true
        },
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        rootClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        verticalClass: [String, Function, Array],
        positionClass: [String, Function, Array],
        stepsClass: [String, Function, Array],
        variantClass: [String, Function, Array],
        animatedClass: [String, Function, Array],
        stepMarkerRoundedClass: [String, Function, Array],
        stepDividerClass: [String, Function, Array],
        stepMarkerClass: [String, Function, Array],
        stepContentClass: [String, Function, Array],
        stepContentTransitioningClass: [String, Function, Array],
        stepNavigationClass: [String, Function, Array],
        stepDetailsClass: [String, Function, Array],
        stepTitleClass: [String, Function, Array],
        stepLinkClass: [String, Function, Array],
        stepLinkClickableClass: [String, Function, Array],
        stepLinkLabelClass: [String, Function, Array],
        stepLinkLabelPositionClass: [String, Function, Array],
        mobileClass: [String, Function, Array],
    },
    computed: {
        wrapperClasses() {
            return [
                this.computedClass('rootClass', 'o-steps__wrapper'),
                { [this.computedClass('sizeClass', 'o-steps--', this.size)]: this.size },
                { [this.computedClass('verticalClass', 'o-steps__wrapper-vertical')]: this.vertical },
                { [this.computedClass('positionClass', 'o-steps__wrapper-position-', this.position)]: this.position && this.vertical },
                { [this.computedClass('mobileClass', 'o-steps--mobile')]: this.isMatchMedia },
            ]
        },
        mainClasses() {
            return [
                this.computedClass('stepsClass', 'o-steps'),
                { [this.computedClass('variantClass', 'o-steps--', this.variant)]: this.variant },
                { [this.computedClass('animatedClass', 'o-steps--animated')]: this.animated }
            ]
        },
        stepDividerClasses() {
            return [
                this.computedClass('stepDividerClass', 'o-steps__divider')
            ]
        },
        stepMarkerClasses() {
            return [
                this.computedClass('stepMarkerClass', 'o-steps__marker'),
                { [this.computedClass('stepMarkerRoundedClass', 'o-steps__marker--rounded')]: this.rounded }
            ]
        },
        stepContentClasses() {
            return [
                this.computedClass('stepContentClass', 'o-steps__content'),
                { [this.computedClass('stepContentTransitioningClass', 'o-steps__content-transitioning')]: this.isTransitioning }
            ]
        },
        stepNavigationClasses() {
            return [
                this.computedClass('stepNavigationClass', 'o-steps__navigation')
            ]
        },
        stepLinkLabelClasses() {
            return [
                this.computedClass('stepLinkLabelClass', 'o-steps__title')
            ]
        },

        // Override mixin implementation to always have a value
        activeItem() {
            return this.childItems.filter((i) => i.newValue === this.activeId)[0] || this.items[0]
        },

        /**
         * Check if previous button is available.
         */
        hasPrev() {
            return !!this.prevItem
        },

        /**
         * Retrieves the next visible item
         */
        nextItem() {
            let nextItem = null
            let idx = this.activeItem ? this.items.indexOf(this.activeItem) + 1 : 0
            for (; idx < this.items.length; idx++) {
                if (this.items[idx].visible) {
                    nextItem = this.items[idx]
                    break
                }
            }
            return nextItem
        },

        /**
         * Retrieves the previous visible item
         */
        prevItem() {
            if (!this.activeItem) { return null }

            let prevItem = null
            for (let idx = this.items.indexOf(this.activeItem) - 1; idx >= 0; idx--) {
                if (this.items[idx].visible) {
                    prevItem = this.items[idx]
                    break
                }
            }
            return prevItem
        },

        /**
         * Check if next button is available.
         */
        hasNext() {
            return !!this.nextItem
        },

        navigationProps() {
            return {
                previous: {
                    disabled: !this.hasPrev,
                    action: this.prev
                },
                next: {
                    disabled: !this.hasNext,
                    action: this.next
                }
            }
        }
    },
    methods: {
        stepLinkClasses(childItem) {
            return [
                this.computedClass('stepLinkClass', 'o-steps__link'),
                { [this.computedClass('stepLinkLabelPositionClass', 'o-steps__link-label-', this.labelPosition)]: this.labelPosition },
                { [this.computedClass('stepLinkClickableClass', 'o-steps__link-clickable')]: this.isItemClickable(childItem) }
            ]
        },
        /**
         * Return if the step should be clickable or not.
         */
        isItemClickable(stepItem) {
            if (stepItem.clickable === undefined) {
                return stepItem.index < this.activeItem.index
            }
            return stepItem.clickable
        },

        /**
         * Previous button click listener.
         */
        prev() {
            if (this.hasPrev) {
                this.childClick(this.prevItem)
            }
        },

        /**
         * Previous button click listener.
         */
        next() {
            if (this.hasNext) {
                this.childClick(this.nextItem)
            }
        }
    }
})
</script>
