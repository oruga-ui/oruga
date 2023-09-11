<template>
    <nav :class="rootClasses">
        <slot
            v-if="hasPreviousSlot"
            name="previous"
            :linkClass="linkClasses"
            :linkCurrentClass="linkCurrentClasses"
            :page="getPage(current - 1, {
                class: prevBtnClasses,
                'aria-label': ariaPreviousLabel
        })">
            <o-icon
                :icon="iconPrev"
                :pack="iconPack"
                both
                aria-hidden="true"/>
        </slot>
        <o-pagination-button
            v-else
            :class="prevBtnClasses"
            :linkClass="linkClasses"
            :linkCurrentClass="linkCurrentClasses"
            :page="getPage(current - 1)">
            <o-icon
                :icon="iconPrev"
                :pack="iconPack"
                both
                aria-hidden="true"/>
        </o-pagination-button>
        <slot
            v-if="hasNextSlot"
            name="next"
            :linkClass="linkClasses"
            :linkCurrentClass="linkCurrentClasses"
            :page="getPage(current + 1, {
                class: nextBtnClasses,
                'aria-label': ariaNextLabel,
        })">
            <o-icon
                :icon="iconNext"
                :pack="iconPack"
                both
                aria-hidden="true"/>
        </slot>
        <o-pagination-button
            v-else
            :class="nextBtnClasses"
            :linkClass="linkClasses"
            :linkCurrentClass="linkCurrentClasses"
            :page="getPage(current + 1)">
            <o-icon
                :icon="iconNext"
                :pack="iconPack"
                both
                aria-hidden="true"/>
        </o-pagination-button>

        <small :class="infoClasses" v-if="simple">
            <template v-if="perPage == 1">
                {{ firstItem }} / {{ total }}
            </template>
            <template v-else>
                {{ firstItem }}-{{ Math.min(current * perPage, total) }} / {{ total }}
            </template>
        </small>
        <ul :class="listClasses" v-else>
            <!--First-->
            <li v-if="hasFirst" :class="listItemClass">
                <slot
                    v-if="hasDefaultSlot"
                    :page="getPage(1)"
                    :linkClass="linkClasses"
                    :linkCurrentClass="linkCurrentClasses"
                />
                <o-pagination-button
                    v-else
                    :linkClass="linkClasses"
                    :linkCurrentClass="linkCurrentClasses"
                    :page="getPage(1)" />
            </li>
            <li v-if="hasFirstEllipsis" :class="listItemClass"><span :class="ellipsisClasses">&hellip;</span></li>

            <!--Pages-->
            <li v-for="page in pagesInRange" :key="page.number" :class="listItemClass">
                <slot
                    v-if="hasDefaultSlot"
                    :page="page"
                    :linkClass="linkClasses"
                    :linkCurrentClass="linkCurrentClasses"
                />
                <o-pagination-button
                    v-else
                    :linkClass="linkClasses"
                    :linkCurrentClass="linkCurrentClasses"
                    :page="page" />
            </li>

            <!--Last-->
            <li v-if="hasLastEllipsis" :class="listItemClass"><span :class="ellipsisClasses">&hellip;</span></li>
            <li v-if="hasLast" :class="listItemClass">
                <slot
                    v-if="hasDefaultSlot"
                    :page="getPage(pageCount)"
                    :linkClass="linkClasses"
                    :linkCurrentClass="linkCurrentClasses"
                />
                <o-pagination-button
                    v-else
                    :linkClass="linkClasses"
                    :linkCurrentClass="linkCurrentClasses"
                    :page="getPage(pageCount)" />
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PaginationButton from './PaginationButton.vue'
import Icon from '../icon/Icon.vue'

import { getOptions } from '../../utils/config'
import { getValueByPath } from '../../utils/helpers'

import BaseComponentMixin from '../../utils/BaseComponentMixin'
import MatchMediaMixin from '../../utils/MatchMediaMixin'

/**
 * A responsive and flexible pagination
 * @displayName Pagination
 * @style _pagination.scss
 */
export default defineComponent({
    name: 'OPagination',
    components: {
        [Icon.name]: Icon,
        [PaginationButton.name]: PaginationButton
    },
    configField: 'pagination',
    mixins: [BaseComponentMixin, MatchMediaMixin],
    provide() {
        return {
            $pagination: this
        }
    },
    emits: ['update:active', 'change', 'update:current'],
    props: {
        /** Total count of items */
        total: Number,
        /** Items count for each page */
        perPage: {
            type: Number,
            default: () => { return getValueByPath(getOptions(), 'pagination.perPage', 20) }
        },
        /** Current page number, use v-model:current to make it two-way binding */
        current: {
            type: Number,
            default: 1
        },
        /** Number of pagination items to show before current page */
        rangeBefore: {
            type: Number,
            default: 1
        },
        /** Number of pagination items to show after current page */
        rangeAfter: {
            type: Number,
            default: 1
        },
        /**
         * Pagination size, optional
         * @values small, medium, large
         */
        size: String,
        /** Simple style */
        simple: Boolean,
        /** Rounded button styles */
        rounded: Boolean,
        /**
         * Buttons order, optional
         * @values centered, right, left
         */
        order: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'pagination.order', 'right') }
        },
        /**
         * Icon pack to use
         * @values mdi, fa, fas and any other custom icon pack
         */
        iconPack: String,
        /** Icon to use for previous button */
        iconPrev: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'pagination.iconPrev', 'chevron-left') }
        },
         /** Icon to use for next button */
        iconNext: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'pagination.iconNext', 'chevron-right') }
        },
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String,
        rootClass: [String, Function, Array],
        prevBtnClass: [String, Function, Array],
        nextBtnClass: [String, Function, Array],
        listItemClass: [String, Function, Array],
        listClass: [String, Function, Array],
        linkClass: [String, Function, Array],
        linkCurrentClass: [String, Function, Array],
        ellipsisClass: [String, Function, Array],
        infoClass: [String, Function, Array],
        orderClass: [String, Function, Array],
        simpleClass: [String, Function, Array],
        roundedClass: [String, Function, Array],
        linkDisabledClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        mobileClass: [String, Function, Array]
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-pag'),
                { [this.computedClass('orderClass', 'o-pag--', this.order)]: this.order },
                { [this.computedClass('sizeClass', 'o-pag--', this.size)]: this.size },
                { [this.computedClass('simpleClass', 'o-pag--simple')]: this.simple },
                { [this.computedClass('mobileClass', 'o-pag--mobile')]: this.isMatchMedia },
            ]
        },
        prevBtnClasses() {
            return [
                this.computedClass('prevBtnClass', 'o-pag__previous'),
                { [this.computedClass('linkDisabledClass', 'o-pag__link--disabled')]: !this.hasPrev }
            ]
        },
        nextBtnClasses() {
            return [
                this.computedClass('nextBtnClass', 'o-pag__next'),
                { [this.computedClass('linkDisabledClass', 'o-pag__link--disabled')]: !this.hasNext }
            ]
        },
        infoClasses() {
            return [
                this.computedClass('infoClass', 'o-pag__info')
            ]
        },
        ellipsisClasses() {
            return [
                this.computedClass('ellipsisClass', 'o-pag__ellipsis')
            ]
        },
        listClasses() {
            return [
                this.computedClass('listClass', 'o-pag__list')
            ]
        },
        linkClasses() {
            return [
                this.computedClass('linkClass', 'o-pag__link'),
                { [this.computedClass('roundedClass', 'o-pag__link--rounded')]: this.rounded }
            ]
        },
        linkCurrentClasses() {
            return [
                this.computedClass('linkCurrentClass', 'o-pag__link--current'),
            ]
        },

        beforeCurrent() {
            return parseInt(this.rangeBefore)
        },

        afterCurrent() {
            return parseInt(this.rangeAfter)
        },

        /**
        * Total page size (count).
        */
        pageCount() {
            return Math.ceil(this.total / this.perPage)
        },

        /**
        * First item of the page (count).
        */
        firstItem() {
            const firstItem = this.current * this.perPage - this.perPage + 1
            return firstItem >= 0 ? firstItem : 0
        },

        /**
        * Check if previous button is available.
        */
        hasPrev() {
            return this.current > 1
        },

        /**
        * Check if first page button should be visible.
        */
        hasFirst() {
            return this.current >= (2 + this.beforeCurrent)
        },

        /**
        * Check if first ellipsis should be visible.
        */
        hasFirstEllipsis() {
            return this.current >= (this.beforeCurrent + 4)
        },

        /**
        * Check if last page button should be visible.
        */
        hasLast() {
            return this.current <= this.pageCount - (1 + this.afterCurrent)
        },

        /**
        * Check if last ellipsis should be visible.
        */
        hasLastEllipsis() {
            return this.current < this.pageCount - (2 + this.afterCurrent)
        },

        /**
        * Check if next button is available.
        */
        hasNext() {
            return this.current < this.pageCount
        },

        /**
        * Get near pages, 1 before and 1 after the current.
        * Also add the click event to the array.
        */
        pagesInRange() {
            if (this.simple) return

            let left = Math.max(1, this.current - this.beforeCurrent)
            if (left - 1 === 2) {
                left-- // Do not show the ellipsis if there is only one to hide
            }
            let right = Math.min(this.current + this.afterCurrent, this.pageCount)
            if (this.pageCount - right === 2) {
                right++ // Do not show the ellipsis if there is only one to hide
            }

            const pages = []
            for (let i = left; i <= right; i++) {
                pages.push(this.getPage(i))
            }
            return pages
        },

        hasDefaultSlot() {
            return this.$slots.default
        },
        hasPreviousSlot() {
            return this.$slots.previous
        },
        hasNextSlot() {
            return this.$slots.next
        }
    },
    watch: {
        /**
        * If current page is trying to be greater than page count, set to last.
        */
        pageCount(value) {
            if (this.current > value) this.last()
        }
    },
    methods: {
        /**
        * Previous button click listener.
        */
        prev(event) {
            this.changePage(this.current - 1, event)
        },
        /**
        * Next button click listener.
        */
        next(event) {
            this.changePage(this.current + 1, event)
        },
        /**
        * First button click listener.
        */
        first(event) {
            this.changePage(1, event)
        },
        /**
        * Last button click listener.
        */
        last(event) {
            this.changePage(this.pageCount, event)
        },

        changePage(num, event) {
            if (this.current === num || num < 1 || num > this.pageCount) return
            this.$emit('change', num)
            this.$emit('update:current', num)

            // Set focus on element to keep tab order
            if (event && event.target) {
                this.$nextTick(() => event.target.focus())
            }
        },

        getPage(num, options: any = {}) {
            return {
                number: num,
                isCurrent: this.current === num,
                click: (event) => this.changePage(num, event),
                disabled: options.disabled || false,
                class: options.class || '',
                'aria-label': options['aria-label'] || this.getAriaPageLabel(num, this.current === num)
            }
        },

        /**
        * Get text for aria-label according to page number.
        */
        getAriaPageLabel(pageNumber, isCurrent) {
            if (this.ariaPageLabel && (!isCurrent || !this.ariaCurrentLabel)) {
                return this.ariaPageLabel + ' ' + pageNumber + '.'
            } else if (this.ariaPageLabel && isCurrent && this.ariaCurrentLabel) {
                return this.ariaCurrentLabel + ', ' + this.ariaPageLabel + ' ' + pageNumber + '.'
            }
            return null
        }
    }
})
</script>
