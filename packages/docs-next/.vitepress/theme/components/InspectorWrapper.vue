<script setup lang="ts">
import { onUnmounted, ref, watch, nextTick } from "vue";
import { setValueByPath } from "../../../../oruga-next/src/utils/helpers";

const INSPECT_CLASS = "odocs-inspected-element";

defineProps({
    inspectData: {
        type: Array as () => any[],
        required: true,
    },
    subitem: {
        type: String,
        default: undefined,
    },
});

const component = ref<HTMLElement | null>(null);

const inspectClass = ref<{
    className: string;
    action: (cmp: HTMLElement, data: any) => void;
}>({} as any);

const classes = ref({});
const data = ref({});
const classesApplied = ref<string | undefined>();
const interval = ref<any>();

onUnmounted(() => {
    clearInterval(interval.value);
    interval.value = undefined;
});

watch(inspectClass, ({ className, action }) => {
    // clear values
    clearInterval(interval.value);
    interval.value = undefined;
    classes.value = {};
    data.value = {};
    nextTick(() => {
        // perform action
        if (action && component.value) action(component.value, data.value);
        // add INSPECT_CLASS to class by className
        setValueByPath(classes.value, className, () => INSPECT_CLASS);
        interval.value = setInterval(() => {
            // get element class
            const el = document.getElementsByClassName(INSPECT_CLASS)[0];
            if (el) {
                clearInterval(interval.value);
                classesApplied.value = el.className.replace(INSPECT_CLASS, "");
            }
        }, 300);
    });
});
</script>

<template>
    <div id="inspector-wrapper" ref="component">
        <div v-show="classesApplied">
            <b>'Classes applied to the element'</b>
            <div class="odocs-classes-applied">{{ classesApplied }}</div>
        </div>

        <ClientOnly>
            <slot v-bind="{ ...classes, ...data }" />
        </ClientOnly>

        <ClientOnly>
            <Inspector
                :inspect-data="inspectData"
                :subitem="subitem"
                @inspect="inspectClass = $event" />
        </ClientOnly>
    </div>
</template>

<style lang="scss">
.odocs-inspected-element {
    border: 2px solid #bd1313 !important;
}

.odocs-classes-applied {
    display: flex;
    align-items: center;
    padding: 1rem;
    margin: 1rem 0;
    font-weight: bold;
    color: white;
    background: black;
    border-radius: 0.3rem;
    word-spacing: 0.5em;
}
</style>
