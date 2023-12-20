<script setup lang="ts">
import { computed, watch, nextTick, type PropType } from "vue";

import OPaginationButton from "./PaginationButton.vue";
import OIcon from "../icon/Icon.vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { useComputedClass, useMatchMedia, usePropBinding } from "@/composables";

import type { ComponentClass } from "@/types";

/**
 * A responsive and flexible pagination
 * @displayName Pagination
 * @style _pagination.scss
 */
defineOptions({
    isOruga: true,
    name: "OPagination",
    configField: "pagination",
    inheritAttrs: false,
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** Total count of items */
    total: { type: Number, default: undefined },
    /** Items count for each page */
    perPage: {
        type: [Number, String],
        default: () => getOption("pagination.perPage", 20),
    },
    /** Current page number, use v-model:current to make it two-way binding. */
    current: { type: Number, default: 1 },
    /** Number of pagination items to show before current page. */
    rangeBefore: { type: Number, default: 1 },
    /** Number of pagination items to show after current page. */
    rangeAfter: { type: Number, default: 1 },
    /**
     * Pagination size
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("pagination.size"),
    },
    /** Simple style */
    simple: {
        type: Boolean,
        default: () => getOption("pagination.simple", false),
    },
    /** Rounded button style */
    rounded: {
        type: Boolean,
        default: () => getOption("pagination.rounded", false),
    },
    /**
     * Buttons order
     * @values centered, right, left
     */
    order: {
        type: String,
        default: () => getOption("pagination.order", "right"),
        validator: (value: string) =>
            ["centered", "right", "left"].indexOf(value) >= 0,
    },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("pagination.iconPack"),
    },
    /** Icon to use for previous button */
    iconPrev: {
        type: String,
        default: () => getOption("pagination.iconPrev", "chevron-left"),
    },
    /** Icon to use for next button */
    iconNext: {
        type: String,
        default: () => getOption("pagination.iconNext", "chevron-right"),
    },
    /** Mobile breakpoint as max-width value */
    mobileBreakpoint: {
        type: String,
        default: () => getOption("pagination.mobileBreakpoint"),
    },
    /** Accessibility label for the next page button. */
    ariaNextLabel: {
        type: String,
        default: () => getOption("pagination.ariaNextLabel", "Next page"),
    },
    /** Accessibility label for the previous page button. */
    ariaPreviousLabel: {
        type: String,
        default: () =>
            getOption("pagination.ariaPreviousLabel", "Previous page"),
    },
    /** Accessibility label for the page button. */
    ariaPageLabel: {
        type: String,
        default: () => getOption("pagination.ariaPageLabel", "page"),
    },
    /** Accessibility label for the current page button. */
    ariaCurrentLabel: {
        type: String,
        default: () => getOption("pagination.ariaCurrentLabel", "Current page"),
    },
    // class props (will not be displayed in the docs)
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    prevButtonClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    nextButtonClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    listItemClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    listClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    linkClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    linkCurrentClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    ellipsisClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    infoClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    orderClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    simpleClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    roundedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    linkDisabledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    sizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    mobileClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const emits = defineEmits<{
    /**
     * current prop two-way binding
     * @param value {number} updated current prop
     */
    (e: "update:current", value: number): void;
    /**
     * on current change event
     * @param value {number} current value
     */
    (e: "change", event: number): void;
}>();

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const current = usePropBinding("current", props, emits);

/** Total page size (count). */
const pageCount = computed(() =>
    Math.ceil(props.total / Number(props.perPage)),
);

/** If current page is trying to be greater than page count, set to last. */
watch(
    () => pageCount.value,
    (value) => {
        if (props.current > value) last();
    },
);

/** First item of the page (count). */
const firstItem = computed(() => {
    const perPage = Number(props.perPage);
    const firstItem = props.current * perPage - perPage + 1;
    return firstItem >= 0 ? firstItem : 0;
});

/** Check if previous button is available. */
const hasPrev = computed(() => props.current > 1);

/** Check if first page button should be visible. */
const hasFirst = computed(() => props.current >= 2 + props.rangeBefore);

/** Check if first ellipsis should be visible. */
const hasFirstEllipsis = computed(() => props.current >= props.rangeBefore + 4);

/** Check if last page button should be visible. */
const hasLast = computed(
    () => props.current <= pageCount.value - (1 + props.rangeAfter),
);

/** Check if last ellipsis should be visible. */
const hasLastEllipsis = computed(
    () => props.current < pageCount.value - (2 + props.rangeAfter),
);

/** Check if next button is available. */
const hasNext = computed(() => props.current < pageCount.value);

/**
 * Get near pages, 1 before and 1 after the current.
 * Also add the click event to the array.
 */
const pagesInRange = computed(() => {
    if (props.simple) return;

    let left = Math.max(1, props.current - props.rangeBefore);
    if (left - 1 === 2) {
        left--; // Do not show the ellipsis if there is only one to hide
    }
    let right = Math.min(props.current + props.rangeAfter, pageCount.value);
    if (pageCount.value - right === 2) {
        right++; // Do not show the ellipsis if there is only one to hide
    }

    const pages = [];
    for (let i = left; i <= right; i++) {
        pages.push(getPage(i));
    }
    return pages;
});

/** Get properties for a page */
function getPage(num: number, ariaLabel?: string) {
    return {
        number: num,
        isCurrent: props.current === num,
        click: (event: Event): void => changePage(num, event),
        "aria-label": ariaLabel || getAriaPageLabel(num, props.current === num),
    };
}

/** Get text for aria-label according to page number. */
function getAriaPageLabel(pageNumber: number, isCurrent: boolean): string {
    if (props.ariaPageLabel && (!isCurrent || !props.ariaCurrentLabel))
        return props.ariaPageLabel + " " + pageNumber + ".";
    else if (props.ariaPageLabel && isCurrent && props.ariaCurrentLabel)
        return (
            props.ariaCurrentLabel +
            ", " +
            props.ariaPageLabel +
            " " +
            pageNumber +
            "."
        );
    return null;
}

/** Previous button click listener. */
function prev(event?: Event): void {
    changePage(props.current - 1, event);
}

/** Next button click listener. */
function next(event?: Event): void {
    changePage(props.current + 1, event);
}

/** First button click listener. */
function first(event?: Event): void {
    changePage(1, event);
}

/** Last button click listener. */
function last(event?: Event): void {
    changePage(pageCount.value, event);
}

function changePage(page: number, event: Event): void {
    if (props.current === page || page < 1 || page > pageCount.value) return;
    emits("change", page);
    current.value = page;

    // Set focus on element to keep tab order
    if (event && event.target)
        nextTick(() => (event.target as HTMLElement).focus());
}

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-pag"),
    {
        [useComputedClass("orderClass", "o-pag--", props.order)]: props.order,
    },
    {
        [useComputedClass("sizeClass", "o-pag--", props.size)]: props.size,
    },
    {
        [useComputedClass("simpleClass", "o-pag--simple")]: props.simple,
    },
    {
        [useComputedClass("mobileClass", "o-pag--mobile")]: isMobile.value,
    },
]);

const prevBtnClasses = computed(() => [
    useComputedClass("prevButtonClass", "o-pag__previous"),
    {
        [useComputedClass("linkDisabledClass", "o-pag__link--disabled")]:
            !hasPrev.value,
    },
]);

const nextBtnClasses = computed(() => [
    useComputedClass("nextButtonClass", "o-pag__next"),
    {
        [useComputedClass("linkDisabledClass", "o-pag__link--disabled")]:
            !hasNext.value,
    },
]);

const infoClasses = computed(() => [
    useComputedClass("infoClass", "o-pag__info"),
]);

const ellipsisClasses = computed(() => [
    useComputedClass("ellipsisClass", "o-pag__ellipsis"),
]);

const listClasses = computed(() => [
    useComputedClass("listClass", "o-pag__list"),
]);

const linkClasses = computed(() => [
    useComputedClass("linkClass", "o-pag__link"),
    {
        [useComputedClass("roundedClass", "o-pag__link--rounded")]:
            props.rounded,
    },
]);

const linkCurrentClasses = computed(() => [
    useComputedClass("linkCurrentClass", "o-pag__link--current"),
]);

const listItemClasses = computed(() =>
    useComputedClass("listItemClass", "o-pag__item"),
);

// --- Expose Public Functionality ---

/** expose functionalities for programmatic usage */
defineExpose({ last, first, prev, next });
</script>

<template>
    <nav :class="rootClasses" data-oruga="pagination">
        <!-- 
            @slot Previous button slot
            @binding {number} number - page number 
            @binding {boolean} isCurrent - if page is current
            @binding {(event:Event): void} click - onClick handler
            @binding {string} ariaLabel - aria-label attribute
        -->
        <slot name="previous" v-bind="getPage(current - 1, ariaPreviousLabel)">
            <o-pagination-button
                v-bind="getPage(current - 1, ariaPreviousLabel)"
                :class="prevBtnClasses"
                :link-class="linkClasses"
                :link-current-class="linkCurrentClasses">
                <o-icon
                    :icon="iconPrev"
                    :pack="iconPack"
                    both
                    aria-hidden="true" />
            </o-pagination-button>
        </slot>
        <!-- 
            @slot Next button slot
            @binding {number} number - page number 
            @binding {boolean} isCurrent - if page is current
            @binding {(event:Event): void} click - onClick handler
            @binding {string} ariaLabel - aria-label attribute
        -->
        <slot name="next" v-bind="getPage(current + 1, ariaNextLabel)">
            <o-pagination-button
                v-bind="getPage(current + 1, ariaNextLabel)"
                :class="nextBtnClasses"
                :link-class="linkClasses"
                :link-current-class="linkCurrentClasses">
                <o-icon
                    :icon="iconNext"
                    :pack="iconPack"
                    both
                    aria-hidden="true" />
            </o-pagination-button>
        </slot>

        <small v-if="simple" :class="infoClasses">
            <template v-if="perPage == 1">
                {{ firstItem }} / {{ total }}
            </template>
            <template v-else>
                {{ firstItem }}-{{ Math.min(current * Number(perPage), total) }}
                /
                {{ total }}
            </template>
        </small>

        <ul v-else :class="listClasses">
            <!--First-->
            <li v-if="hasFirst" :class="listItemClasses">
                <slot v-bind="getPage(1)">
                    <o-pagination-button
                        v-bind="getPage(1)"
                        :link-class="linkClasses"
                        :link-current-class="linkCurrentClasses" />
                </slot>
            </li>
            <li v-if="hasFirstEllipsis" :class="listItemClasses">
                <span :class="ellipsisClasses">&hellip;</span>
            </li>

            <!--Pages-->
            <li
                v-for="page in pagesInRange"
                :key="page.number"
                :class="listItemClasses">
                <slot v-bind="page">
                    <o-pagination-button
                        v-bind="page"
                        :link-class="linkClasses"
                        :link-current-class="linkCurrentClasses" />
                </slot>
            </li>

            <!--Last-->
            <li v-if="hasLastEllipsis" :class="listItemClasses">
                <span :class="ellipsisClasses">&hellip;</span>
            </li>
            <li v-if="hasLast" :class="listItemClasses">
                <!-- 
                    @slot Pagination button slot
                    @binding {number} number - page number 
                    @binding {boolean} isCurrent - if page is current
                    @binding {(event:Event): void} click - onClick handler
                    @binding {string} ariaLabel - aria-label attribute
                -->
                <slot v-bind="getPage(pageCount)">
                    <o-pagination-button
                        v-bind="getPage(pageCount)"
                        :link-class="linkClasses"
                        :link-current-class="linkCurrentClasses" />
                </slot>
            </li>
        </ul>
    </nav>
</template>
