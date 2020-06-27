<template>
    <nav :class="rootClasses">
        <slot
            v-if="$scopedSlots.previous"
            name="previous"
            :linkClass="linkClass"
            :linkCurrentClass="linkCurrentClass"
            :page="getPage(current - 1, {
                disabled: !hasPrev,
                class: prevBtnClass,
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
            :class="prevBtnClass"
            :linkClass="linkClass"
            :linkCurrentClass="linkCurrentClass"
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
            :linkClass="linkClass"
            :linkCurrentClass="linkCurrentClass"
            :page="getPage(current + 1, {
                disabled: !hasNext,
                class: nextBtnClass,
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
            :class="nextBtnClass"
            :linkClass="linkClass"
            :linkCurrentClass="linkCurrentClass"
            :disabled="!hasNext"
            :page="getPage(current + 1)">
            <o-icon
                :icon="iconNext"
                :pack="iconPack"
                both
                aria-hidden="true"/>
        </o-pagination-button>

        <small :class="infoClass" v-if="simple">
            <template v-if="perPage == 1">
                {{ firstItem }} / {{ total }}
            </template>
            <template v-else>
                {{ firstItem }}-{{ Math.min(current * perPage, total) }} / {{ total }}
            </template>
        </small>
        <ul :class="listClass" v-else>
            <!--First-->
            <li v-if="hasFirst">
                <slot
                    v-if="$scopedSlots.default"
                    :page="getPage(1)"
                    :linkClass="linkClass"
                    :linkCurrentClass="linkCurrentClass"
                />
                <o-pagination-button
                    v-else
                    :linkClass="linkClass"
                    :linkCurrentClass="linkCurrentClass"
                    :page="getPage(1)" />
            </li>
            <li v-if="hasFirstEllipsis"><span :class="ellipsisClass">&hellip;</span></li>

            <!--Pages-->
            <li v-for="page in pagesInRange" :key="page.number">
                <slot
                    v-if="$scopedSlots.default"
                    :page="page"
                    :linkClass="linkClass"
                    :linkCurrentClass="linkCurrentClass"
                />
                <o-pagination-button
                    v-else
                    :linkClass="linkClass"
                    :linkCurrentClass="linkCurrentClass"
                    :page="page" />
            </li>

            <!--Last-->
            <li v-if="hasLastEllipsis"><span :class="ellipsisClass">&hellip;</span></li>
            <li v-if="hasLast">
                <slot
                    v-if="$scopedSlots.default"
                    :page="getPage(pageCount)"
                    :linkClass="linkClass"
                    :linkCurrentClass="linkCurrentClass"
                />
                <o-pagination-button
                    v-else
                    :linkClass="linkClass"
                    :linkCurrentClass="linkCurrentClass"
                    :page="getPage(pageCount)" />
            </li>
        </ul>
    </nav>
</template>

<script>
import PaginationButton from './PaginationButton'
import Icon from '../icon/Icon'

import config from '../../utils/config'
import { getValueByPath, getCssClass } from '../../utils/helpers'

/**
 * A responsive and flexible pagination
 * @displayName Pagination
 * @style _pagination.scss
 */
export default {
    name: 'OPagination',
    components: {
        [Icon.name]: Icon,
        [PaginationButton.name]: PaginationButton
    },
    props: {
        total: [Number, String],
        perPage: {
            type: [Number, String],
            default: 20
        },
        current: {
            type: [Number, String],
            default: 1
        },
        rangeBefore: {
            type: [Number, String],
            default: 1
        },
        rangeAfter: {
            type: [Number, String],
            default: 1
        },
        size: String,
        simple: Boolean,
        rounded: Boolean,
        order: String,
        iconPack: String,
        iconPrev: {
            type: String,
            default: () => getValueByPath(config, 'pagination.iconPrev', 'chevron-left')
        },
        iconNext: {
            type: String,
            default: () => getValueByPath(config, 'pagination.iconNext', 'chevron-right')
        },
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String,
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'pagination.override', false)
                const clazz = getValueByPath(config, 'pagination.rootClass', '')
                return getCssClass(clazz, override, 'o-pagination')
            }
        },
        prevBtnClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'pagination.override', false)
                const clazz = getValueByPath(config, 'pagination.prevBtnClass', '')
                return getCssClass(clazz, override, 'o-pagination-previous')
            }
        },
        nextBtnClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'pagination.override', false)
                const clazz = getValueByPath(config, 'pagination.nextBtnClass', '')
                return getCssClass(clazz, override, 'o-pagination-next')
            }
        },
        listClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'pagination.override', false)
                const clazz = getValueByPath(config, 'pagination.listClass', '')
                return getCssClass(clazz, override, 'o-pagination-list')
            }
        },
        linkClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'pagination.override', false)
                const clazz = getValueByPath(config, 'pagination.linkClass', '')
                return getCssClass(clazz, override, 'o-pagination-link')
            }
        },
        linkCurrentClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'pagination.override', false)
                const clazz = getValueByPath(config, 'pagination.linkCurrentClass', '')
                return getCssClass(clazz, override, 'o-pagination-link-current')
            }
        },
        ellipsisClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'pagination.override', false)
                const clazz = getValueByPath(config, 'pagination.ellipsisClass', '')
                return getCssClass(clazz, override, 'o-pagination-ellipsis')
            }
        },
        infoClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'pagination.override', false)
                const clazz = getValueByPath(config, 'pagination.infoClass', '')
                return getCssClass(clazz, override, 'o-pagination-info')
            }
        },
        simpleClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'pagination.override', false)
                const clazz = getValueByPath(config, 'pagination.simpleClass', '')
                return getCssClass(clazz, override, 'o-pagination-simple')
            }
        },
        roundedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'pagination.override', false)
                const clazz = getValueByPath(config, 'pagination.roundedClass', '')
                return getCssClass(clazz, override, 'o-pagination-rounded')
            }
        }
    },
    computed: {
        rootClasses() {
            return [
                this.rootClass,
                this.order && 'o-pagination-' + this.order,
                this.size && 'o-size-' + this.size,
                this.simple && this.simpleClass,
                this.rounded && this.roundedClass
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
