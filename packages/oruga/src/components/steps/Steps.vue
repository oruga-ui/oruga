<template>
    <div v-if="vueReady" :class="wrapperClasses">
        <nav :class="mainClasses">
            <ul :class="stepItemsClasses">
                <li
                    v-for="childItem in items"
                    :key="childItem.newValue"
                    v-show="childItem.visible"
                    :class="childItem.itemClasses"
                >
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
                        <div :class="stepDetailsClasses">
                            <span :class="stepTitleClasses">{{ childItem.label }}</span>
                        </div>
                    </a>
                </li>
            </ul>
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

<script>
import Button from '../button/Button'
import Icon from '../icon/Icon'

import BaseComponentMixin from '../../utils/BaseComponentMixin'
import TabbedMixin from '../../utils/TabbedMixin'
import config from '../../utils/config'
import { getValueByPath } from '../../utils/helpers'

/**
 * Responsive horizontal process steps
 * @displayName Steps
 * @requires ./StepItem.vue
 * @example ./examples/Steps.md
 * @style _steps.scss
 */
export default {
    name: 'OSteps',
    components: {
        [Button.name]: Button,
        [Icon.name]: Icon
    },
    mixins: [BaseComponentMixin, TabbedMixin('step')],
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
                return getValueByPath(config, 'steps.iconPrev', 'chevron-left')
            }
        },
        /** Icon to use for navigation button */
        iconNext: {
            type: String,
            default: () => {
                return getValueByPath(config, 'steps.iconNext', 'chevron-right')
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
         * Position of the marker label, optional
         * @values bottom, right, left
         */
        labelPosition: {
            type: String,
            validator(value) {
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
        /**
         * How Steps will be displayed for mobile user
         * @values minimalist, compact, null
         */
        mobileMode: {
            type: String,
            validator(value) {
                return [
                    'minimalist',
                    'compact'
                ].indexOf(value) > -1
            },
            default: 'minimalist'
        },
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        rootClass: String,
        sizeClass: String,
        verticalClass: String,
        positionClass: String,
        stepsClass: String,
        variantClass: String,
        animatedClass: String,
        labelPositionClass: String,
        roundedClass: String,
        mobileClass: String,
        stepItemsClass: String,
        stepContentClass: String,
        stepContentTransitioningClass: String,
        stepNavigationClass: String,
        stepDetailsClass: String,
        stepTitleClass: String,
        stepLinkClass: String,
    },
    computed: {
        wrapperClasses() {
            return [
                this.computedClass('steps', 'rootClass', 'o-steps-wrapper'),
                { [`${this.computedClass('steps', 'sizeClass', 'o-size-')}${this.size}`]: this.size },
                { [this.computedClass('steps', 'verticalClass', 'o-steps-wrapper-vertical')]: this.vertical },
                { [`${this.computedClass('steps', 'positionClass', 'o-steps-wrapper-position-')}${this.position}`]: this.position && this.vertical },
            ]
        },
        mainClasses() {
            return [
                this.computedClass('steps', 'stepsClass', 'o-steps'),
                { [`${this.computedClass('steps', 'variantClass', 'o-color-')}${this.variant}`]: this.variant },
                { [`${this.computedClass('steps', 'labelPositionClass', 'o-steps-label-')}${this.labelPosition}`]: this.labelPosition },
                { [this.computedClass('steps', 'animatedClass', 'o-steps-animated')]: this.animated },
                { [this.computedClass('steps', 'roundedClass', 'o-steps-rounded')]: this.rounded },
                { [`${this.computedClass('steps', 'sizeClass', 'o-steps-mobile-')}${this.mobileMode}`]: this.mobileMode }
            ]
        },
        stepItemsClasses() {
            return [
                this.computedClass('steps', 'stepItemsClass', 'o-step-items')
            ]
        },
        stepMarkerClasses() {
            return [
                this.computedClass('steps', 'stepMarkerClass', 'o-step-marker')
            ]
        },
        stepContentClasses() {
            return [
                this.computedClass('steps', 'stepContentClass', 'o-step-content'),
                { [this.computedClass('steps', 'stepContentTransitioningClass', 'o-step-content-transitioning')]: this.isTransitioning }
            ]
        },
        stepNavigationClasses() {
            return [
                this.computedClass('steps', 'stepNavigationClass', 'o-step-navigation')
            ]
        },
        stepDetailsClasses() {
            return [
                this.computedClass('steps', 'stepDetailsClass', 'o-step-details')
            ]
        },
        stepTitleClasses() {
            return [
                this.computedClass('steps', 'stepTitleClass', 'o-step-title')
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
                this.computedClass('steps', 'stepLinkClass', 'o-step-link'),
                { [this.computedClass('steps', 'stepLinkClickableClass', 'o-step-link-clickable')]: this.isItemClickable(childItem) }
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
                this.activeId = this.prevItem.newValue
            }
        },

        /**
         * Previous button click listener.
         */
        next() {
            if (this.hasNext) {
                this.activeId = this.nextItem.newValue
            }
        }
    }
}
</script>
