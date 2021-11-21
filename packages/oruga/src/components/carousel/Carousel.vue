<template>
    <div
        :class="rootClasses"
        @mouseenter="checkPause"
        @mouseleave="startTimer">
        <progress
            v-if="progress"
            :class="progressClasses"
            :value="activeChild"
            :max="childItems.length - 1">
            {{ childItems.length - 1 }}
        </progress>
        <div
            :class="itemsClasses"
            @mouseenter="itemsHovered = true"
            @mouseleave="itemsHovered = false"
            @mousedown="dragStart"
            @mouseup="dragEnd"
            @touchstart.stop="dragStart"
            @touchend.stop="dragEnd">
            <slot/>
            <template v-if="arrow">
                <o-icon
                    v-show="hasPrev"
                    :class="arrowIconPrevClasses"
                    @click.native="prev"
                    :pack="iconPack"
                    :icon="iconPrev"
                    :size="iconSize"
                    both />
                <o-icon
                    v-show="hasNext"
                    :class="arrowIconNextClasses"
                    @click.native="next"
                    :pack="iconPack"
                    :icon="iconNext"
                    :size="iconSize"
                    both />
            </template>
        </div>
        <div
            v-if="autoplay && (pauseHover && itemsHovered) && isPause"
            :class="pauseClasses">
            <slot name="pause">
                {{ pauseText }}
            </slot>
        </div>
        <div
            v-if="indicator"
            :class="indicatorsClasses">
            <a
                v-for="(item, index) in sortedItems"
                :class="indicatorClasses"
                @mouseover="modeChange('hover', index)"
                @click="modeChange('click', index)"
                :key="item._uid">
                <slot
                    :i="index"
                    name="indicators">
                    <span :class="indicatorItemClasses(item)"/>
                </slot>
            </a>
        </div>
        <slot
            :active="activeChild"
            :switch="changeActive"
            name="list"/>
        <template v-if="overlay">
            <slot name="overlay"/>
        </template>
    </div>
</template>

<script>
import { getOptions } from '../../utils/config'

import Icon from '../icon/Icon'
import {default as ProviderParentMixin, Sorted} from '../../utils/ProviderParentMixin'
import {mod, bound, getValueByPath} from '../../utils/helpers'
import BaseComponentMixin from '../../utils/BaseComponentMixin'

/**
 * A Slideshow for cycling images in confined spaces
 * @displayName Carousel
 * @example ./examples/Carousel.md
 * @style _carousel.scss
 */
export default {
    name: 'OCarousel',
    components: {
        [Icon.name]: Icon
    },
    configField: 'carousel',
    mixins: [ProviderParentMixin('carousel', Sorted), BaseComponentMixin],
    props: {
        value: {
            type: Number,
            default: 0
        },
        animated: {
            type: String,
            default: 'slide'
        },
        interval: Number,
        hasDrag: {
            type: Boolean,
            default: true
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        pauseHover: {
            type: Boolean,
            default: true
        },
        pauseInfo: {
            type: Boolean,
            default: true
        },
        pauseText: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'carousel.pauseText', 'Pause') }
        },
        arrow: {
            type: Boolean,
            default: true
        },
        arrowHover: {
            type: Boolean,
            default: true
        },
        repeat: {
            type: Boolean,
            default: true
        },
        iconPack: String,
        iconSize: String,
        iconPrev: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'carousel.iconPrev', 'chevron-left') }
        },
        iconNext: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'carousel.iconNext', 'chevron-right') }
        },
        indicator: {
            type: Boolean,
            default: true
        },
        indicatorInside: {
            type: Boolean,
            default: true
        },
        indicatorMode: {
            type: String,
            default: 'click'
        },
        indicatorPosition: {
            type: String,
            default: 'bottom'
        },
        indicatorStyle: {
            type: String,
            default: 'dots'
        },
        progress: Boolean,
        overlay: Boolean,
        rootClass: [String, Function, Array],
        overlayClass: [String, Function, Array],
        progressClass: [String, Function, Array],
        itemsClass: [String, Function, Array],
        arrowIconClass: [String, Function, Array],
        arrowIconPrevClass: [String, Function, Array],
        arrowIconNextClass: [String, Function, Array],
        pauseClass: [String, Function, Array],
        indicatorsClass: [String, Function, Array],
        indicatorsInsideClass: [String, Function, Array],
        indicatorsInsidePositionClass: [String, Function, Array],
        indicatorItemClass: [String, Function, Array],
        indicatorItemActiveClass: [String, Function, Array],
        indicatorItemStyleClass: [String, Function, Array]
    },
    data() {
        return {
            transition: 'next',
            activeChild: this.value || 0,
            isPause: false,
            dragX: false,
            timer: null,
            itemsHovered: false
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-car'),
                { [this.computedClass('overlayClass', 'o-car__overlay')]: this.overlay }
            ]
        },
        progressClasses() {
            return [
                this.computedClass('progressClass', 'o-car__progress')
            ]
        },
        itemsClasses() {
            return [
                this.computedClass('itemsClass', 'o-car__items'),
            ]
        },
        arrowIconClasses() {
            return [
                this.computedClass('arrowIconClass', 'o-car__arrow__icon'),
            ]
        },
        arrowIconClasses() {
            return [
                this.computedClass('arrowIconClass', 'o-car__arrow__icon'),
            ]
        },
        arrowIconPrevClasses() {
            return [
                ...this.arrowIconClasses,
                this.computedClass('arrowIconLeftClass', 'o-car__arrow__icon-left')
            ]
        },
        arrowIconNextClasses() {
            return [
                ...this.arrowIconClasses,
                this.computedClass('arrowIconRightClass', 'o-car__arrow__icon-right')
            ]
        },
        pauseClasses() {
            return [
                this.computedClass('pauseClass', 'o-car__pause')
            ]
        },
        indicatorsClasses() {
            return [
                this.computedClass('indicatorsClass', 'o-car__indicators'),
                { [this.computedClass('indicatorsInsideClass', 'o-car__indicators--inside')]: this.indicatorInside },
                { [this.computedClass('indicatorsInsidePositionClass', 'o-car__indicators--inside--', this.indicatorPosition)]: this.indicatorInside && this.indicatorPosition }
            ]
        },
        indicatorClasses() {
            return [
                this.computedClass('indicatorClass', 'o-car__indicator')
            ]
        },
        hasArrows() {
            return (this.arrowHover && this.itemsHovered) || !this.arrowHover
        },
        hasPrev() {
            return (this.repeat || this.activeChild !== 0) && this.hasArrows
        },
        hasNext() {
            return (this.repeat || this.activeChild < this.childItems.length - 1) && this.hasArrows
        }
    },
    watch: {
        /**
         * When v-model is changed set the new active item.
         */
        value(value) {
            this.changeActive(value)
        },
        /**
         * When carousel-items are updated, set active one.
         */
        sortedItems(items) {
            if (this.activeChild >= items.length && this.activeChild > 0) {
                this.changeActive(this.activeChild - 1)
            }
        },
        /**
         *  When autoplay is changed, start or pause timer accordingly
         */
        autoplay(status) {
            status ? this.startTimer() : this.pauseTimer()
        },
        /**
         *  Since the timer can get paused at the end, if repeat is changed we need to restart it
         */
        repeat(status) {
            if (status) { this.startTimer() }
        }
    },
    methods: {
        indicatorItemClasses(item) {
            return [
                this.computedClass('indicatorItemClass', 'o-car__indicator__item'),
                { [this.computedClass('indicatorItemActiveClass', 'o-car__indicator__item--active')]: item.isActive },
                { [this.computedClass('indicatorItemStyleClass', 'o-car__indicator__item--', this.indicatorStyle)]: this.indicatorStyle },
            ]
        },
        startTimer() {
            if (!this.autoplay || this.timer) return
            this.isPause = false
            const interval = getValueByPath(getOptions(), 'carousel.interval', 3500)
            this.timer = setInterval(() => {
                if (!this.repeat && this.activeChild >= this.childItems.length - 1) {
                    this.pauseTimer()
                } else {
                    this.next()
                }
            }, (this.interval || interval))
        },
        pauseTimer() {
            this.isPause = true
            if (this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }
        },
        restartTimer() {
            this.pauseTimer()
            this.startTimer()
        },
        checkPause() {
            if (this.pauseHover && this.autoplay) {
                this.pauseTimer()
            }
        },
        /**
         * Change the active item and emit change event.
         * action only for animated slide, there true = next, false = prev
         */
        changeActive(newIndex, direction = 0) {
            if (this.activeChild === newIndex || isNaN(newIndex)) return

            direction = direction || (newIndex - this.activeChild)

            newIndex = this.repeat ? mod(newIndex, this.childItems.length)
                : bound(newIndex, 0, this.childItems.length - 1)

            this.transition = direction > 0 ? 'prev' : 'next'
            // Transition names are reversed from the actual direction for correct effect

            this.activeChild = newIndex
            if (newIndex !== this.value) {
                this.$emit('input', newIndex)
            }
            this.restartTimer()
            this.$emit('change', newIndex) // BC
        },
        // Indicator trigger when change active item.
        modeChange(trigger, value) {
            if (this.indicatorMode === trigger) {
                return this.changeActive(value)
            }
        },
        prev() {
            this.changeActive(this.activeChild - 1, -1)
        },
        next() {
            this.changeActive(this.activeChild + 1, 1)
        },
        // handle drag event
        dragStart(event) {
            if (!this.hasDrag ||
                !event.target.draggable) return
            this.dragX = event.touches ? event.changedTouches[0].pageX : event.pageX
            if (event.touches) {
                this.pauseTimer()
            } else {
                event.preventDefault()
            }
        },
        dragEnd(event) {
            if (this.dragX === false) return
            const detected = event.touches ? event.changedTouches[0].pageX : event.pageX
            const diffX = detected - this.dragX
            if (Math.abs(diffX) > 30) {
                if (diffX < 0) {
                    this.next()
                } else {
                    this.prev()
                }
            } else {
                event.target.click()
                this.sortedItems[this.activeChild].$emit('click')
                this.$emit('click')
            }
            if (event.touches) {
                this.startTimer()
            }
            this.dragX = false
        }
    },
    mounted() {
        this.startTimer()
    },
    beforeDestroy() {
        this.pauseTimer()
    }
}
</script>
