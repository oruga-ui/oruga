<template>
    <div
        :class="rootClasses"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <div
            @mousedown.prevent="dragStart"
            @touchstart="dragStart"
            @click="$emit('click', $event)"
            :class="itemsClasses"
            :style="'transform:translateX('+translation+'px)'">
            <slot/>
        </div>
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
        <progress
            v-if="progress"
            :class="progressClasses"
            :value="scrollIndex"
            :max="childItems.length - 1">
            {{ childItems.length - 1 }}
        </progress>
        <div
            v-if="autoplay && (pauseHover && itemsHovered) && isPause"
            :class="pauseClasses">
            <slot name="pause">
                {{ pauseText }}
            </slot>
        </div>
        <slot
            :active="scrollIndex"
            :switchTo="switchTo"
            name="indicators">
            <div
                v-if="indicator && !asIndicator"
                :class="indicatorsClasses">
                <a
                    v-for="(_, index) in indicatorsCount"
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
        interval: Number,
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
        pauseText: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'carousel.pauseText', 'Pause') }
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
        hasDrag: {
            type: Boolean,
            default: true
        },
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
            activeItem: this.value,
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
        indicatorsCount() {
            if (!this.childItems.length) return
            const diff = this.settings.itemsToShow - this.settings.itemsToList
            return Math.ceil(this.childItems.length / this.settings.itemsToList) - diff
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
            if (!this.asIndicator) {
                this.switchTo(value)
            } else {
                this.checkAsIndicator(value)
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
        indicatorItemClasses(index) {
            let isActive = this.scrollIndex / this.settings.itemsToList === index
            return [
                this.computedClass('indicatorItemClass', 'o-car__indicator__item'),
                { [this.computedClass('indicatorItemActiveClass', 'o-car__indicator__item--active')]: isActive },
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
            const interval = getValueByPath(getOptions(), 'carousel.interval', 3500)
            this.timer = setInterval(() => {
                if (!this.repeat && this.scrollIndex >= this.childItems.length - 1) {
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
        // Indicator trigger when change active item.
        modeChange(trigger, value) {
            if (this.indicatorMode === trigger) {
                return this.switchTo(value)
            }
        },
        resized() {
            this.windowWidth = window.innerWidth
        },
        switchTo(newIndex) {
            if (newIndex === this.scrollIndex || isNaN(newIndex)) { return }

            if (this.settings.repeat) {
                newIndex = mod(newIndex, this.total + 1)
            }

            newIndex = bound(newIndex, 0, this.total)
            this.scrollIndex = newIndex
            if (this.value !== newIndex) {
                this.$emit('input', newIndex)
            }
        },
        next() {
            this.switchTo(this.scrollIndex + this.settings.itemsToList)
        },
        prev() {
            this.switchTo(this.scrollIndex - this.settings.itemsToList)
        },
        checkAsIndicator(value, event) {
            if (!this.asIndicator) return

            if (event) {
                const dragEndX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX
                if (this.hold - Date.now() > 2000 || Math.abs(this.dragX - dragEndX) > 10) return
                this.dragX = false
                this.hold = 0
                event.preventDefault()
            }

            // Make the item appear in the middle
            this.scrollIndex = value

            this.$emit('switch', value)
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
            if (event.touches) {
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
            this.startTimer()
            if (window.ResizeObserver) {
                this.observer = new ResizeObserver(this.refresh)
                this.observer.observe(this.$el)
            }
            window.addEventListener('resize', this.resized)
            document.addEventListener('animationend', this.refresh)
            document.addEventListener('transitionend', this.refresh)
            document.addEventListener('transitionstart', this.refresh)
            this.resized()
        }
        if (this.$attrs.config) {
            throw new Error('The config prop was removed, you need to use v-bind instead')
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            this.pauseTimer()
            if (window.ResizeObserver) {
                this.observer.disconnect()
            }
            window.removeEventListener('resize', this.resized)
            document.removeEventListener('animationend', this.refresh)
            document.removeEventListener('transitionend', this.refresh)
            document.removeEventListener('transitionstart', this.refresh)
            this.dragEnd()
        }
    }
}
</script>
