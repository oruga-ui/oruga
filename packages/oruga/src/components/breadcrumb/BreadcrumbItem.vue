<script setup lang="ts">
import { computed } from "vue";

import OIcon from "../icon/Icon.vue";

import { getDefault } from "@/utils/config";
import { defineClasses, useProviderChild } from "@/composables";

import type { BreadcrumbItemProps } from "./props";
import type { BreadcrumbComponent } from "./types";

/**
 * The classic breadrcumb item, in different colors, sizes, and states
 * @displayName Breadcrumb Item
 */
defineOptions({
    isOruga: true,
    name: "OBreadcrumbItem",
    configField: "breadcrumb",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<BreadcrumbItemProps>(), {
    override: undefined,
    label: undefined,
    active: false,
    disabled: false,
    hidden: false,
    iconLeft: undefined,
    iconRight: undefined,
    iconPack: () => getDefault("breadcrumb.iconPack"),
    iconSize: () => getDefault("breadcrumb.iconSize"),
    tag: () => getDefault("breadcrumb.tag", "span"),
});

/** inject functionalities and data from the parent component */
const { parent, item } = useProviderChild<BreadcrumbComponent>();

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["itemClass", "o-breadcrumb__item"],
    [
        "disabledClass",
        "o-breadcrumb__item--disabled",
        null,
        computed(() => props.disabled),
    ],
    [
        "activeClass",
        "o-breadcrumb__item--active",
        null,
        computed(() => props.active),
    ],
);

const separatorClasses = defineClasses([
    "seperatorClass",
    "o-breadcrumb__item__seperator",
]);

const linkClasses = defineClasses(["linkClass", "o-breadcrumb__item__link"]);

const iconClasses = defineClasses(["iconClass", "o-breadcrumb__item__icon"]);

const iconLeftClasses = defineClasses([
    "iconLeftClass",
    "o-breadcrumb__item__icon-left",
]);

const iconRightClasses = defineClasses([
    "iconRightClass",
    "o-breadcrumb__item__icon-right",
]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <li
        v-show="!hidden"
        data-oruga="breadcrumb-item"
        :data-id="`breadcrumb-${item.identifier}`"
        :class="rootClasses">
        <!-- 
            @slot Item seperator
            @binding {string} seperator - seperator string
        -->
        <slot
            v-if="item.index > 0"
            name="seperator"
            :seperator="parent.separator">
            <span v-if="!!parent.separator" :class="separatorClasses">
                {{ parent.separator }}
            </span>
        </slot>

        <component
            :is="tag"
            v-bind="$attrs"
            :class="linkClasses"
            :disabled="disabled"
            :active="active"
            :aria-current="active ? 'page' : undefined">
            <o-icon
                v-if="iconLeft"
                :icon="iconLeft"
                :pack="iconPack"
                :size="iconSize"
                :class="[...iconClasses, ...iconLeftClasses]" />

            <!-- 
                @slot Override label
            -->
            <slot>
                <span>{{ label }}</span>
            </slot>

            <o-icon
                v-if="iconRight"
                :icon="iconRight"
                :pack="iconPack"
                :size="iconSize"
                :class="[...iconClasses, ...iconRightClasses]" />
        </component>
    </li>
</template>
