<template>
    <nav :class="rootClasses">
        <slot
            v-if="$scopedSlots.previous"
            name="previous"
            :linkClass="linkClasses"
            :linkCurrentClass="linkCurrentClasses"
            :page="getPage(current - 1, {
                disabled: !hasPrev,
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
            :disabled="!hasPrev"
            :page="getPage(current - 1)">
            <o-icon
                :icon="iconPrev"
                :pack="iconPack"
                both
                aria-hidden="true"/>
        </o-pagination-button>
        <slot
            v-if="$scopedSlots.next"
            name="next"
            :linkClass="linkClasses"
            :linkCurrentClass="linkCurrentClasses"
            :page="getPage(current + 1, {
                disabled: !hasNext,
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
            :disabled="!hasNext"
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
            <li v-if="hasFirst">
                <slot
                    v-if="$scopedSlots.default"
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
            <li v-if="hasFirstEllipsis"><span :class="ellipsisClasses">&hellip;</span></li>

            <!--Pages-->
            <li v-for="page in pagesInRange" :key="page.number">
                <slot
                    v-if="$scopedSlots.default"
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
            <li v-if="hasLastEllipsis"><span :class="ellipsisClasses">&hellip;</span></li>
            <li v-if="hasLast">
                <slot
                    v-if="$scopedSlots.default"
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

<script>
import PaginationButton from './PaginationButton'
import Icon from '../icon/Icon'

import config from '../../utils/config'
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import { getValueByPath } from '../../utils/helpers'

/**
 * A responsive and flexible pagination
 * @displayName Pagination
 * @example ./examples/Pagination.md
 * @style _pagination.scss
 */
export default {
    name: 'OPagination',
    components: {
        [Icon.name]: Icon,
        [PaginationButton.name]: PaginationButton
    },
    mixins: [BaseComponentMixin],
    provide() {
        return {
            $pagination: this
        }
    },
    props: {
        /** Total count of items */
        total: [Number, String],
        /** Items count for each page */
        perPage: {
            type: [Number, String],
            default: () => { return getValueByPath(config, 'pagination.perPage', 20) }
        },
        /** Current page number, use the .sync modifier to make it two-way binding */
        current: {
            type: [Number, String],
            default: 1
        },
        /** Number of pagination items to show before current page */
        rangeBefore: {
            type: [Number, String],
            default: 1
        },
        /** Number to paginatation items to show after current page */
        rangeAfter: {
            type: [Number, String],
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
        order: String,
        /**
         * Icon pack to use
         * @values mdi, fa, fas and any other custom icon pack
         */
        iconPack: String,
        /** Icon to use for previous button */
        iconPrev: {
            type: String,
            default: () => { return getValueByPath(config, 'pagination.iconPrev', 'chevron-left') }
        },
         /** Icon to use for next button */
        iconNext: {
            type: String,
            default: () => { return getValueByPath(config, 'pagination.iconNext', 'chevron-right') }
        },
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String,
        rootClass: String,
        prevBtnClass: String,
        nextBtnClass: String,
        listClass: String,
        linkClass: String,
        linkCurrentClass: String,
        ellipsisClass: String,
        infoClass: String,
        orderClass: String,
        simpleClass: String,
        roundedClass: String,
        sizeClass: String
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('pagination', 'rootClass', 'o-pagination'),
                { [`${this.computedClass('pagination', 'orderClass', 'o-pagination-')}${this.order}`]: this.order },
                { [`${this.computedClass('pagination', 'sizeClass', 'o-size-')}${this.size}`]: this.size },
                { [this.computedClass('pagination', 'simpleClass', 'o-pagination-simple')]: this.simple },
                { [this.computedClass('pagination', 'roundedClass', 'o-pagination-rounded')]: this.rounded }
            ]
        },
        prevBtnClasses() {
            return [
                this.computedClass('pagination', 'prevBtnClass', 'o-pagination-previous')
            ]
        },
        nextBtnClasses() {
            return [
                this.computedClass('pagination', 'nextBtnClass', 'o-pagination-next')
            ]
        },
        infoClasses() {
            return [
                this.computedClass('pagination', 'infoClass', 'o-pagination-info')
            ]
        },
        ellipsisClasses() {
            return [
                this.computedClass('pagination', 'ellipsisClass', 'o-pagination-ellipsis')
            ]
        },
        listClasses() {
            return [
                this.computedClass('pagination', 'listClass', 'o-pagination-list')
            ]
        },
        linkClasses() {
            return [
                this.computedClass('pagination', 'linkClass', 'o-pagination-link')
            ]
        },
        linkCurrentClasses() {
            return [
                this.computedClass('pagination', 'linkCurrentClass', 'o-pagination-link-current')
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

        getPage(num, options = {}) {
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
}
</script>
