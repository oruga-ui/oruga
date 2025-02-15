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

const componentElement = useTemplateRef("component");

const inspectClass = ref<InspectClass>({} as InspectClass);

const classes = ref({});
const data = ref({});
const appliedClasses = ref<string | undefined>();
let interval: NodeJS.Timeout | undefined;

onUnmounted(() => {
    clearInterval(interval);
    interval = undefined;
});

watch(inspectClass, ({ className, action }) => {
    // clear values
    clearInterval(interval);
    interval = undefined;
    classes.value = {};
    data.value = {};
    nextTick(() => {
        // perform action
        if (action && componentElement.value)
            action(componentElement.value, data.value);
        // add INSPECT_CLASS to class by className
        setValueByPath(classes.value, className, () => INSPECT_CLASS);
        interval = setInterval(() => {
            // get element class
            const el = document.getElementsByClassName(INSPECT_CLASS)[0];
            if (el) {
                clearInterval(interval);
                appliedClasses.value = el.className.replace(INSPECT_CLASS, "");
            }
        }, 300);
    });
});
</script>

<template>
    <div id="inspector-wrapper" ref="component">
        <div v-show="!!appliedClasses">
            <b>'Classes applied to the element'</b>
            <div class="odocs-classes-applied">{{ appliedClasses }}</div>
        </div>

        <slot v-bind="{ ...classes, ...data }" />

        <Inspector
            :inspect-data="inspectData"
            :subitem="subitem"
            @inspect="inspectClass = $event" />
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
