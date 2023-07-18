<script setup lang="ts">
import { onUnmounted, ref, watch, nextTick } from "vue";
import { setValueByPath } from "../../../../oruga-next/src/utils/helpers";

const UNDERLINE_CLASS = "odocs-underline-element";

const props = defineProps({
    inspectClass: {
        type: Object,
        required: true,
    },
});

const classes = ref({});
const data = ref({});
const classesApplied = ref<string | undefined>(undefined);
const interval = ref<any | undefined>(undefined);

onUnmounted(() => {
    clearInterval(interval.value);
    interval.value = undefined;
});

watch(
    () => props.inspectClass,
    ({ className, action }) => {
        clearInterval(interval.value);
        interval.value = undefined;
        classes.value = Object.assign({}, {});
        data.value = Object.assign({}, {});
        classesApplied.value = undefined;
        nextTick(() => {
            if (action) {
                action(this);
            }
            setValueByPath(classes.value, className, () => UNDERLINE_CLASS);
            classes.value = Object.assign({}, classes.value);
            data.value = Object.assign({}, data.value);
            nextTick(() => {
                interval.value = setInterval(() => {
                    const el =
                        document.getElementsByClassName(UNDERLINE_CLASS)[0];
                    if (el) {
                        clearInterval(interval.value);
                        classesApplied.value = el.className
                            .replace(UNDERLINE_CLASS, "")
                            .replace(/\s/g, "&nbsp;&nbsp;&nbsp;");
                    }
                }, 300);
            });
        });
    },
    { deep: true },
);
</script>

<template>
    <span id="docs__element__to__inspect">
        <div v-if="classesApplied">
            <b>'Classes applied to the element'</b>
            <!-- eslint-disable vue/no-v-html -->
            <div class="odocs-classes-applied" v-html="classesApplied"></div>
        </div>
        <slot :classes="classes" :data="data" />
    </span>
</template>

<style lang="scss">
.odocs-underline-element {
    border: 2px solid #bd1313 !important;
}

.odocs-classes-applied {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
    background: black;
    color: white;
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 0.3rem;
}
</style>
