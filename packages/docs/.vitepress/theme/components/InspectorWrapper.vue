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
import Inspector from "./Inspector.vue";

const INSPECT_CLASS = "odocs-inspected-element";

defineProps({
    inspectData: { type: Object as PropType<InspectData>, required: true },
});

const componentElement = useTemplateRef("componentRef");

const inspectClass = ref<InspectClass>({} as InspectClass);

/** additional data applied to the inspected component */
const data = ref({});
/** additional classes applied to the inspected component */
const classes = ref({});
/** applied classed of the HTML element */
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

        nextTick(() => {
            // add INSPECT_CLASS to class by className
            setValueByPath(classes.value, className, () => INSPECT_CLASS);
            interval = setInterval(() => {
                // get element class
                const el = document.getElementsByClassName(INSPECT_CLASS)[0];
                if (el) {
                    clearInterval(interval);
                    appliedClasses.value = el.className.replace(
                        INSPECT_CLASS,
                        "",
                    );
                }
            }, 300);

            // scroll to inspector
            if (componentElement.value)
                window.scrollTo({
                    left: 0,
                    top: componentElement.value?.offsetTop,
                    behavior: "smooth",
                });
        });
    });
});
</script>

<template>
    <div id="inspector-wrapper" ref="componentRef">
        <transition name="fade">
            <div v-show="!!appliedClasses">
                <b>Classes applied to the element:</b>
                <div class="odocs-classes-applied">{{ appliedClasses }}</div>
            </div>
        </transition>

        <slot v-bind="{ ...classes, ...data }" />

        <Inspector :data="inspectData" @inspect="inspectClass = $event" />
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
