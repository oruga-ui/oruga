<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import type { InspectData, InspectClassDescription, InspectClass } from "@docs";
import { VPButton } from "vitepress/theme";

const props = defineProps({
    inspectData: { type: Object as PropType<InspectData>, required: true },
});

const emits = defineEmits<{
    (e: "inspect", value: InspectClass): void;
}>();

const selectedElementIndex = ref<number>();

const classesToInspect = computed<InspectClassDescription[]>(() =>
    Object.values(props.inspectData),
);

function addDotToTheEnd(value: string): string {
    return !value.endsWith(".") ? value + "." : value;
}

function setByProperties(props: string[]): string | null {
    return props ? props.join("<br>") : null;
}

function inspectClass(
    index: number,
    selectedClass: InspectClassDescription,
): void {
    selectedElementIndex.value = index;
    emits("inspect", {
        className: selectedClass.relatedClass || selectedClass.class,
        action: selectedClass.action,
    });
    document.getElementById("class-props")?.scrollIntoView();
}
</script>

<template>
    <!-- eslint-disable vue/no-v-html -->
    <div class="vp-doc">
        <o-collapse class="inspector__summary" :open="false">
            <template #trigger="{ open }">
                <div class="inspector__summary-trigger">
                    <div>How does the <i>Class props inspector</i> work?</div>
                    <a>
                        <o-icon :icon="open ? 'caret-up' : 'caret-down'" />
                    </a>
                </div>
            </template>

            <div class="inspector__summary-content">
                <div class="inspector__summary-intro">
                    <p>
                        <i>Class props inspector</i> is useful to see class
                        props you want to use to customize Oruga components and
                        how they change a component. You can click on
                        <b>Inspect</b> button to find the exact element where a
                        specific class prop acts. <br /><br />
                        In the <i>Class props inspector</i> there are other
                        columns:
                    </p>
                </div>

                <div>
                    <h4>Class prop</h4>
                    <p>
                        This column contains the name of the Class prop you want
                        to inspect.<br />
                        If you find a name with a link (
                        <span>▷ <a>classPropName</a> </span>) this refers to a
                        subitem (e.g. <i>Dropdown Item</i> in <i>Dropdown</i>).
                    </p>
                </div>

                <div>
                    <h4>Description</h4>
                    <p>
                        This column contains the description of the Class prop
                        you want to inspect.<br />
                        👉 This icon indicates some warning, e.g.
                        <i>this Class prop is visible only on mobile.</i><br />
                    </p>
                </div>

                <div>
                    <h4>Props</h4>
                    <p>
                        This column contains a list of props that activate the
                        class, e.g. if a class prop contains
                        <code>disabled</code> prop it means that only when the
                        component has <code>disabled</code> prop.
                    </p>
                </div>

                <div>
                    <h4>Suffixes</h4>
                    <p>
                        This column contains all the possible suffixes that
                        you'll receive if you use a function to customize your
                        Class prop.
                    </p>
                </div>
            </div>
        </o-collapse>

        <table>
            <tbody>
                <tr>
                    <th>Class prop</th>
                    <th>Description</th>
                    <th>Props</th>
                    <th>Suffixes</th>
                    <th></th>
                </tr>
                <tr
                    v-for="(data, index) of classesToInspect"
                    :key="data.class"
                    :class="{
                        inspector__highlight: index === selectedElementIndex,
                    }">
                    <td v-if="!data.subitem">{{ data.class }}</td>
                    <td v-else>
                        ▷
                        <a :href="`#${data.subitem}-component`">
                            {{ data.class }}
                        </a>
                    </td>
                    <td>
                        <span>{{ addDotToTheEnd(data.description) }}</span>
                        <span v-if="data.relatedComponent">
                            More details
                            <a
                                target="_blank"
                                :href="`/components/${data.relatedComponent}.html#class-props`">
                                here.
                            </a>
                        </span>
                        <span v-if="data.info">
                            <br />👉 <i><span v-html="data.info"></span></i>
                        </span>
                    </td>
                    <td>
                        <span v-if="data.properties">
                            <code
                                style="white-space: nowrap; padding: 0"
                                v-html="setByProperties(data.properties)">
                            </code>
                        </span>
                    </td>
                    <td>
                        <span v-if="data.suffixes">
                            <code
                                style="white-space: nowrap; padding: 0"
                                v-html="setByProperties(data.suffixes)">
                            </code>
                        </span>
                    </td>
                    <td>
                        <VPButton
                            v-if="!data.nospec === true"
                            text="Inspect"
                            :theme="
                                selectedElementIndex == index ? 'alt' : 'brand'
                            "
                            @click="inspectClass(index, data)">
                            Inspect
                        </VPButton>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
.inspector__summary {
    margin-top: 2rem;
}

.inspector__summary-trigger {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    div {
        margin-right: 0.5rem;
    }
}

.inspector__summary-content {
    border: 1px solid #dfe2e5;
    padding: 0.5rem;
    border-radius: 2px;
}

.inspector__highlight,
.inspector__highlight code,
.inspector__highlight a {
    background: var(--vp-c-note-2) !important;
    color: white !important;
}
</style>
