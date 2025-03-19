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
import InspectorTable from "./InspectorTable.vue";

const INSPECT_CLASS = "odocs-inspected-element";

defineProps({
    inspectData: { type: Object as PropType<InspectData>, required: true },
});

const showcaseElement = useTemplateRef<HTMLElement>("showcaseRef");

const inspectClass = ref<InspectClass>({} as InspectClass);

/** additional data applied to the inspected component */
const data = ref({});
/** additional classes applied to the inspected component */
const classes = ref({});
/** applied classed of the HTML element */
const appliedClasses = ref<string | undefined>();
let interval: ReturnType<typeof setTimeout> | undefined;

onUnmounted(() => {
    clearTimeout(interval);
    interval = undefined;
});

watch(
    inspectClass,
    ({ className, action }) => {
        // clear values
        clearTimeout(interval);
        interval = undefined;
        classes.value = {};
        data.value = {};

        // perform action
        if (typeof action === "function") action(data.value);

        // await property got changed by called action
        nextTick(() => {
            // add INSPECT_CLASS to class by `className`
            setValueByPath(classes.value, className, () => INSPECT_CLASS);
            interval = setTimeout(() => {
                // get example showcase root
                const wrapper =
                    showcaseElement.value?.shadowRoot?.getElementById(
                        "inspector-wrapper",
                    );

                // get DOM element by added INSPECT_CLASS
                const el = wrapper?.getElementsByClassName(INSPECT_CLASS)[0];

                if (el) {
                    clearTimeout(interval);
                    // remove INSPECT_CLASS from the DOM element
                    // extract other classes from the DOM element
                    appliedClasses.value = el.className.replace(
                        INSPECT_CLASS,
                        "",
                    );
                } else {
                    console.warn(
                        "Could not found element with class:",
                        INSPECT_CLASS,
                    );
                }
            }, 300);

            // scroll to inspector
            if (showcaseElement.value)
                window.scrollTo({
                    left: 0,
                    top: showcaseElement.value?.offsetTop,
                    behavior: "smooth",
                });
        });
    },
    { flush: "post" },
);
</script>

<template>
    <div>
        <transition name="fade">
            <div v-show="!!appliedClasses">
                <b>Classes applied to the element:</b>
                <div class="odocs-classes-applied">{{ appliedClasses }}</div>
            </div>
        </transition>

        <!-- web components cannot be rendered in server side -->
        <ClientOnly>
            <!-- wrap example in a shadow root web component -->
            <example-showcase ref="showcaseRef">
                <div id="inspector-wrapper">
                    <slot v-bind="{ ...classes, ...data }" />
                </div>
            </example-showcase>
        </ClientOnly>

        <InspectorTable
            :inspect-data="inspectData"
            @inspect="inspectClass = $event" />
    </div>
</template>

<style lang="scss" scoped>
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
