<template>
    <div
        :class="rootClasses"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <div :class="sceneClasses">
            <div
                @mousedown.prevent="dragStart"
                @touchstart="dragStart"
                :class="itemsClasses"
                :style="'transform:translateX('+translation+'px)'">
                <slot/>
            </div>
            <slot
                name="arrow"
                :hasPrev="hasPrev"
                :prev="prev"
                :hasNext="hasNext"
                :next="next"
            >
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
            </slot>
         </div>
        <slot
            :active="activeIndex"
            :switchTo="switchTo"
            :indicatorIndex="indicatorIndex"
            name="indicators">
            <template v-if="childItems.length">
                <div
                    v-if="indicator && !asIndicator"
                    :class="indicatorsClasses">
                    <a
                        v-for="(_, index) in indicatorCount"
                        :class="indicatorClasses"
                        @mouseover="modeChange('hover', index)"
                        @click="modeChange('click', index)"
                        :key="index">
                        <slot
                            :i="index"
                            name="indicator">
                            <span :class="indicatorItemClasses(index)"/>
                        </slot>
                    </a>
                </div>
            </template>
        </slot>
        <template v-if="overlay">
            <slot name="overlay"/>
        </template>
    </div>
</template>

<script>
import {sign, mod, bound, getValueByPath} from '../../utils/helpers'
import { getOptions } from '../../utils/config'

import Icon from '../icon/Icon'
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import {default as ProviderParentMixin, Sorted} from '../../utils/ProviderParentMixin'

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
        interval: {
            type: Number,
            default: () => { getValueByPath(getOptions(), 'carousel.interval', 3500) }
        },
        hasDrag: {
            type: Boolean,
            default: true
        },
        autoplay: {
            type: Boolean,
            default: false
        },
        pauseHover: {
            type: Boolean,
            default: false
        },
        repeat: {
            type: Boolean,
            default: false
        },
        indicator: {
            type: Boolean,
            default: true
        },
        indicatorInside: {
            type: Boolean,
            default: false
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
        overlay: Boolean,
        itemsToShow: {
            type: Number,
            default: 1
        },
        itemsToList: {
            type: Number,
            default: 1
        },
        asIndicator: Boolean,
        arrow: {
            type: Boolean,
            default: true
        },
        arrowHover: {
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
        breakpoints: {
            type: Object,
            default: () => ({})
        },
        rootClass: [String, Function, Array],
        overlayClass: [String, Function, Array],
        sceneClass: [String, Function, Array],
        itemsClass: [String, Function, Array],
        arrowIconClass: [String, Function, Array],
        arrowIconPrevClass: [String, Function, Array],
        arrowIconNextClass: [String, Function, Array],
        indicatorsClass: [String, Function, Array],
        indicatorsInsideClass: [String, Function, Array],
        indicatorsInsidePositionClass: [String, Function, Array],
        indicatorItemClass: [String, Function, Array],
        indicatorItemActiveClass: [String, Function, Array],
        indicatorItemStyleClass: [String, Function, Array]
    },
    data() {
        return {
            activeIndex: this.value,
            scrollIndex: this.value,
            delta: 0,
            dragX: false,
            hold: 0,
            windowWidth: 0,
            touch: false,
            observer: null,
            refresh_: 0,
            itemsHovered: false,
            isPause: false,
            timer: null
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-car'),
                { [this.computedClass('overlayClass', 'o-car__overlay')]: this.overlay }
            ]
        },
        sceneClasses() {
            return [
                this.computedClass('sceneClass', 'o-car__scene')
            ]
        },
        itemsClasses() {
            return [
                this.computedClass('itemsClass', 'o-car__items'),
                { [this.computedClass('itemsDraggingClass', 'o-car__items--dragging')]: this.dragging },
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
        dragging() {
            return this.dragX !== false
        },
        itemStyle() {
            return `width: ${this.itemWidth}px;`
        },
        translation() {
            return -bound(
                this.delta + (this.scrollIndex * this.itemWidth), 0,
                (this.childItems.length - this.settings.itemsToShow) * this.itemWidth
            )
        },
        total() {
            return this.childItems.length - this.settings.itemsToShow
        },
        indicatorCount() {
            return Math.ceil(this.total / this.settings.itemsToList) + 1
        },
        indicatorIndex() {
            return Math.ceil(this.scrollIndex / this.settings.itemsToList)
        },
        hasArrows() {
            return (this.settings.arrowHover && this.itemsHovered) || !this.settings.arrowHover
        },
        hasPrev() {
            return (this.settings.repeat || this.scrollIndex > 0) && this.hasArrows
        },
        hasNext() {
            return (this.settings.repeat || this.scrollIndex < this.total) && this.hasArrows
        },
        breakpointKeys() {
            return Object.keys(this.breakpoints).sort((a, b) => b - a)
        },
        settings() {
            let breakpoint = this.breakpointKeys.filter((breakpoint) => {
                if (this.windowWidth >= breakpoint) {
                    return true
                }
            })[0]
            if (breakpoint) {
                return {...this.$props, ...this.breakpoints[breakpoint]}
            }
            return this.$props
        },
        itemWidth() {
            if (this.windowWidth) { // Ensure component is mounted
                /* eslint-disable-next-line */
                this.refresh_; // We force the computed property to refresh if this prop is changed

                const rect = this.$el.getBoundingClientRect()
                return rect.width / this.settings.itemsToShow
            }
            return 0
        }
    },
    watch: {
        /**
         * When v-model is changed set the new active item.
         */
        value(value) {
            if (value <= this.childItems.length - 1) {
                this.activeIndex = value
                this.switchTo(value * this.settings.itemsToList, true)
            }
        },
        /**
         *  When autoplay is changed, start or pause timer accordingly
         */
        autoplay(status) {
            if (status) {
                this.startTimer()
            } else {
                this.pauseTimer()
            }
        },
        /**
         *  Since the timer can get paused at the end, if repeat is changed we need to restart it
         */
        repeat(status) {
            if (status) {
                this.startTimer()
            }
        }
    },
    methods: {
        indicatorItemClasses(index) {
            return [
                this.computedClass('indicatorItemClass', 'o-car__indicator__item'),
                { [this.computedClass('indicatorItemActiveClass', 'o-car__indicator__item--active')]: this.indicatorIndex === index },
                { [this.computedClass('indicatorItemStyleClass', 'o-car__indicator__item--', this.indicatorStyle)]: this.indicatorStyle },
            ]
        },
        onMouseEnter() {
            this.itemsHovered = true
            this.checkPause()
        },
        onMouseLeave() {
            this.itemsHovered = false
            this.startTimer()
        },
        startTimer() {
            if (!this.autoplay || this.timer) return
            this.isPause = false
            this.timer = setInterval(() => {
                if (!this.repeat && this.activeIndex >= this.childItems.length - 1) {
                    this.pauseTimer()
                } else {
                    this.next()
                }
            }, this.interval)
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
        modeChange(trigger, value) {
            if (this.indicatorMode === trigger) {
                return this.switchTo(value * this.settings.itemsToList)
            }
        },
        resized() {
            this.windowWidth = window.innerWidth
        },
        switchTo(newIndex, onlyMove = this.asIndicator) {
            if (this.settings.repeat) {
                newIndex = mod(newIndex, this.total + 1)
            }
            newIndex = bound(newIndex, 0, this.total)
            this.scrollIndex = newIndex
            this.$emit('scroll', this.indicatorIndex)
            if (!onlyMove) {
                this.activeIndex = Math.ceil(newIndex / this.settings.itemsToList)
                if (this.value !== this.activeIndex) {
                    this.$emit('input', this.activeIndex)
                }
            }
        },
        next() {
            this.switchTo(this.scrollIndex + this.settings.itemsToList)
        },
        prev() {
            this.switchTo(this.scrollIndex - this.settings.itemsToList)
        },
        // handle drag event
        dragStart(event) {
            if (this.dragging || !this.settings.hasDrag || (event.button !== 0 && event.type !== 'touchstart')) return
            this.hold = Date.now()
            this.touch = !!event.touches
            this.dragX = this.touch ? event.touches[0].clientX : event.clientX
            if (this.touch) {
                this.pauseTimer()
            }
            window.addEventListener(this.touch ? 'touchmove' : 'mousemove', this.dragMove)
            window.addEventListener(this.touch ? 'touchend' : 'mouseup', this.dragEnd)
        },
        dragMove(event) {
            if (!this.dragging) return
            const dragEndX = event.touches
                ? (event.changedTouches[0] || event.touches[0]).clientX : event.clientX
            this.delta = this.dragX - dragEndX
            if (!event.touches) {
                event.preventDefault()
            }
        },
        dragEnd(event) {
            if (!this.dragging && !this.hold) return
            if (this.hold) {
                const signCheck = sign(this.delta)
                const results = Math.round(Math.abs(this.delta / this.itemWidth) + 0.15)// Hack
                this.switchTo(this.scrollIndex + signCheck * results)
            }
            this.delta = 0
            this.dragX = false
            if (event && event.touches) {
                this.startTimer()
            }
            window.removeEventListener(this.touch ? 'touchmove' : 'mousemove', this.dragMove)
            window.removeEventListener(this.touch ? 'touchend' : 'mouseup', this.dragEnd)
        },
        refresh() {
            this.$nextTick(() => {
                this.refresh_++
            })
        }
    },
    mounted() {
        if (typeof window !== 'undefined') {
            if (window.ResizeObserver) {
                this.observer = new ResizeObserver(this.refresh)
                this.observer.observe(this.$el)
            }
            window.addEventListener('resize', this.resized)
            document.addEventListener('animationend', this.refresh)
            document.addEventListener('transitionend', this.refresh)
            document.addEventListener('transitionstart', this.refresh)
            this.resized()
            this.startTimer()
        }
        if (this.$attrs.config) {
            throw new Error('The config prop was removed, you need to use v-bind instead')
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            if (window.ResizeObserver) {
                this.observer.disconnect()
            }
            window.removeEventListener('resize', this.resized)
            document.removeEventListener('animationend', this.refresh)
            document.removeEventListener('transitionend', this.refresh)
            document.removeEventListener('transitionstart', this.refresh)
            this.dragEnd()
            this.pauseTimer()
        }
    }
}
</script>
