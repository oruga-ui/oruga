<script setup lang="ts">
import {
    onUnmounted,
    ref,
    watch,
    nextTick,
    useTemplateRef,
    type PropType,
} from "vue";
import { setValueByPath } from "@oruga-ui/oruga-next";
import type { InspectClass, InspectData } from "@docs";

const INSPECT_CLASS = "odocs-inspected-element";

defineProps({
    inspectData: { type: Object as PropType<InspectData>, required: true },
    subitem: { type: String, default: undefined },
});

const component = useTemplateRef("component");

const inspectedClass = ref<InspectClass>({} as InspectClass);

const classes = ref({});
const data = ref({});
const classesApplied = ref<string | undefined>();
const interval = ref<ReturnType<typeof setInterval>>();

onUnmounted(() => {
    clearInterval(interval.value);
    interval.value = undefined;
});

watch(inspectedClass, ({ className, action }) => {
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
                @inspect="inspectedClass = $event" />
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
