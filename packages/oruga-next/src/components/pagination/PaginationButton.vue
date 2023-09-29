<script lang="ts">
import type { Component, PropType } from "vue";
import { defineComponent } from "vue";
import { getOptions } from "../../utils/config";
import { getValueByPath } from "../../utils/helpers";

export default defineComponent({
    name: "OPaginationButton",
    inject: ["$pagination"],
    configField: "pagination",
    props: {
        page: {
            type: Object,
            required: true,
        },
        tag: {
            type: [String, Object, Function] as PropType<string | Component>,
            default: "a",
            validator: (value) => {
                if (typeof value === "string") {
                    return (
                        getValueByPath(getOptions(), "linkTags", [
                            "a",
                            "button",
                            "input",
                            "router-link",
                            "nuxt-link",
                        ]).indexOf(value) >= 0
                    );
                }
                return true;
            },
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        linkClass: [String, Array, Object],
        linkCurrentClass: [String, Array, Object],
    },
    computed: {
        linkClasses() {
            return [
                this.linkClass || [...this.$pagination.linkClasses],
                this.page.class,
                {
                    [this.linkCurrentClass ||
                    this.$pagination.linkCurrentClasses]: this.page.isCurrent,
                },
            ];
        },
        href() {
            if (this.tag === "a") {
                return "#";
            }
            return "";
        },
        isDisabled() {
            if (this.tag === "a") return null;
            return this.disabled || this.page.disabled;
        },
    },
});
</script>

<template>
    <component
        :is="tag"
        role="button"
        :href="href"
        :disabled="isDisabled"
        :class="linkClasses"
        v-bind="$attrs"
        @click.prevent="page.click"
        :aria-label="page['aria-label']"
        :aria-current="page.isCurrent">
        <slot>{{ page.number }}</slot>
    </component>
</template>
