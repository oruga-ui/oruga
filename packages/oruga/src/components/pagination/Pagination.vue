<script setup lang="ts">
import { computed, watch, nextTick } from "vue";

import OPaginationButton from "./PaginationButton.vue";
import OIcon from "../icon/Icon.vue";
import PlainButton from "../utils/PlainButton";

import { getDefault } from "@/utils/config";
import { defineClasses, useMatchMedia } from "@/composables";

import type { PaginationProps } from "./props";
import type { DynamicComponent } from "@/types";

/**
 * A responsive and flexible pagination.
 * @displayName Pagination
 * @style _pagination.scss
 */
defineOptions({
    isOruga: true,
    name: "OPagination",
    configField: "pagination",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<PaginationProps>(), {
    override: undefined,
    current: 1,
    total: undefined,
    perPage: () => getDefault("pagination.perPage", 20),
    rangeBefore: 1,
    rangeAfter: 1,
    size: () => getDefault("pagination.size"),
    simple: () => getDefault("pagination.simple", false),
    rounded: () => getDefault("pagination.rounded", false),
    order: () => getDefault("pagination.order", "right"),
    buttonTag: () => getDefault("pagination.buttonTag", PlainButton),
    iconPack: () => getDefault("pagination.iconPack"),
    iconPrev: () => getDefault("pagination.iconPrev", "chevron-left"),
    iconNext: () => getDefault("pagination.iconNext", "chevron-right"),
    mobileBreakpoint: () => getDefault("pagination.mobileBreakpoint"),
    ariaNextLabel: () => getDefault("pagination.ariaNextLabel", "Next page"),
    ariaPreviousLabel: () =>
        getDefault("pagination.ariaPreviousLabel", "Previous page"),
    ariaPageLabel: () => getDefault("pagination.ariaPageLabel", "Page"),
    ariaCurrentLabel: () =>
        getDefault("pagination.ariaCurrentLabel", "Current page"),
});

const emits = defineEmits<{
    /**
     * current prop two-way binding
     * @param value {number} updated current prop
     */
    "update:current": [value: number];
    /**
     * on current change event
     * @param value {number} current value
     */
    change: [event: number];
}>();

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const currentPage = defineModel<number>("current", { default: 1 });

/** Total page size (count). */
const pageCount = computed(() =>
    Math.ceil((props.total || 0) / Number(props.perPage)),
);

/** If current page is trying to be greater than page count, set to last. */
watch(
    () => pageCount.value,
    (value) => {
        if (currentPage.value > value) last(new Event("change"));
    },
);

/** First item of the page (count). */
const firstItem = computed(() => {
    const perPage = Number(props.perPage);
    const firstItem = currentPage.value * perPage - perPage + 1;
    return firstItem >= 0 ? firstItem : 0;
});

/** Check if this is the first page. */
const isFirst = computed(() => currentPage.value <= 1);

/** Check if first page button should be visible. */
const hasFirst = computed(() => currentPage.value >= props.rangeBefore + 2);

/** Check if first ellipsis should be visible. */
const hasFirstEllipsis = computed(
    () => currentPage.value >= props.rangeBefore + 4,
);

/** Check if this is the last page. */
const isLast = computed(() => currentPage.value >= pageCount.value);

/** Check if last page button should be visible. */
const hasLast = computed(
    () => currentPage.value <= pageCount.value - (1 + props.rangeAfter),
);

/** Check if last ellipsis should be visible. */
const hasLastEllipsis = computed(
    () => currentPage.value < pageCount.value - (2 + props.rangeAfter),
);

/**
 * Get near pages, 1 before and 1 after the current.
 * Also add the click event to the array.
 */
const pagesInRange = computed<ReturnType<typeof getPage>[]>(() => {
    if (props.simple) return [];

    let left = Math.max(1, currentPage.value - props.rangeBefore);
    if (left - 1 === 2) {
        left--; // Do not show the ellipsis if there is only one to hide
    }
    let right = Math.min(currentPage.value + props.rangeAfter, pageCount.value);
    if (pageCount.value - right === 2) {
        right++; // Do not show the ellipsis if there is only one to hide
    }

    const pages: ReturnType<typeof getPage>[] = [];
    for (let i = left; i <= right; i++) {
        pages.push(getPage(i));
    }
    return pages;
});

/** Get properties for a page */
function getPage(
    num: number,
    ariaLabel?: string,
): {
    number: number;
    isCurrent: boolean;
    onClick: (event: Event) => void;
    ariaLabel: string;
    tag: DynamicComponent;
} {
    return {
        number: num,
        isCurrent: currentPage.value === num,
        onClick: (event: Event): void => changePage(num, event),
        ariaLabel:
            ariaLabel || getAriaPageLabel(num, currentPage.value === num),
        tag: props.buttonTag,
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
    return "";
}

/** Previous button click listener. */
function prev(event: Event): void {
    changePage(currentPage.value - 1, event);
}

/** Next button click listener. */
function next(event: Event): void {
    changePage(currentPage.value + 1, event);
}

/** First button click listener. */
function first(event: Event): void {
    changePage(1, event);
}

/** Last button click listener. */
function last(event: Event): void {
    changePage(pageCount.value, event);
}

function changePage(page: number, event: Event): void {
    if (currentPage.value === page || page < 1 || page > pageCount.value)
        return;
    emits("change", page);
    currentPage.value = page;

    // Set focus on element to keep tab order
    if (event && event.target)
        nextTick(() => (event.target as HTMLElement).focus());
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-pagination"],
    [
        "orderClass",
        "o-pagination--",
        computed(() => props.order),
        computed(() => !!props.order),
    ],
    [
        "sizeClass",
        "o-pagination--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    ["simpleClass", "o-pagination--simple", null, computed(() => props.simple)],
    ["mobileClass", "o-pagination--mobile", null, isMobile],
);

const infoClasses = defineClasses(["infoClass", "o-pagination__info"]);

const ellipsisClasses = defineClasses([
    "ellipsisClass",
    "o-pagination__ellipsis",
]);

const listClasses = defineClasses(["listClass", "o-pagination__list"]);

const listItemClasses = defineClasses(["listItemClass", "o-pagination__item"]);

const buttonClasses = defineClasses(
    ["buttonClass", "o-pagination__button"],
    [
        "roundedClass",
        "o-pagination__button--rounded",
        null,
        computed(() => props.rounded),
    ],
);

const buttonCurrentClasses = defineClasses([
    "buttonCurrentClass",
    "o-pagination__button--current",
]);

const buttonPrevClasses = defineClasses(
    ["buttonPrevClass", "o-pagination__button-previous"],
    ["buttonDisabledClass", "o-pagination__button--disabled", null, isFirst],
);

const buttonNextClasses = defineClasses(
    ["buttonNextClass", "o-pagination__button-next"],
    ["buttonDisabledClass", "o-pagination__button--disabled", null, isLast],
);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ last, first, prev, next });
</script>

<template>
    <nav data-oruga="pagination" :class="rootClasses">
        <!--
            @slot Previous button slot
            @binding {number} number - page number
            @binding {boolean} isCurrent - if page is current
            @binding {(event: Event): void} onClick - click handler
            @binding {string} ariaLabel - aria-label attribute
        -->
        <slot
            name="previous"
            v-bind="getPage(currentPage - 1, ariaPreviousLabel)">
            <o-pagination-button
                v-bind="getPage(currentPage - 1, ariaPreviousLabel)"
                :disabled="isFirst"
                :root-class="buttonPrevClasses"
                :button-class="buttonClasses"
                :button-current-class="buttonCurrentClasses">
                <o-icon :icon="iconPrev" :pack="iconPack" aria-hidden="true" />
            </o-pagination-button>
        </slot>

        <!--
            @slot Next button slot
            @binding {number} number - page number
            @binding {boolean} isCurrent - if page is current
            @binding {(event: Event): void} onClick - click handler
            @binding {string} ariaLabel - aria-label attribute
        -->
        <slot name="next" v-bind="getPage(currentPage + 1, ariaNextLabel)">
            <o-pagination-button
                v-bind="getPage(currentPage + 1, ariaNextLabel)"
                :disabled="isLast"
                :root-class="buttonNextClasses"
                :button-class="buttonClasses"
                :button-current-class="buttonCurrentClasses">
                <o-icon :icon="iconNext" :pack="iconPack" aria-hidden="true" />
            </o-pagination-button>
        </slot>

        <small v-if="simple" :class="infoClasses">
            <template v-if="perPage == 1">
                {{ firstItem }} / {{ total }}
            </template>
            <template v-else>
                {{ firstItem }}-{{
                    Math.min(currentPage * Number(perPage), total)
                }}
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
                        :button-class="buttonClasses"
                        :button-current-class="buttonCurrentClasses" />
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
                        :button-class="buttonClasses"
                        :button-current-class="buttonCurrentClasses" />
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
                    @binding {(event: Event): void} onClick - click handler
                    @binding {string} ariaLabel - aria-label attribute
                -->
                <slot v-bind="getPage(pageCount)">
                    <o-pagination-button
                        v-bind="getPage(pageCount)"
                        :button-class="buttonClasses"
                        :button-current-class="buttonCurrentClasses" />
                </slot>
            </li>
        </ul>
    </nav>
</template>
