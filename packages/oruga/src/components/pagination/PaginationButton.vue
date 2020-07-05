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

<script>
import config from '../../utils/config'
import { getValueByPath } from '../../utils/helpers'

export default {
    name: 'OPaginationButton',
    props: {
        page: {
            type: Object,
            required: true
        },
        tag: {
            type: String,
            default: 'a',
            validator: (value) => getValueByPath(config, 'linkTags', ['a', 'button', 'input', 'router-link', 'nuxt-link']).indexOf(value) >= 0
        },
        disabled: {
            type: Boolean,
            default: false
        },
        linkClass: [String, Array, Object],
        linkCurrentClass: [String, Array, Object]
    },
    computed: {
        linkClasses() {
            return [
                this.linkClass,
                this.page.class,
                { [this.linkCurrentClass]: this.page.isCurrent }
            ]
        },
        href() {
            if (this.tag === 'a') {
                return '#'
            }
            return ''
        },
        isDisabled() {
            return this.disabled || this.page.disabled
        }
    }
}
</script>
