<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
    inspectData: {
        type: Array as () => any[],
        required: true,
    },
    subitem: {
        type: String,
        default: undefined,
    },
});

const emits = defineEmits(["inspect"]);

const selectedElementIndex = ref<number>();

const classesToInspect = computed(() => {
    const data = props.inspectData;
    return data.sort((propa, propb) =>
        propa.class < propb.class ? -1 : propa.class > propb.class ? 1 : 0,
    );
});

function addDotToTheEnd(value: string) {
    return !value.endsWith(".") ? value + "." : value;
}

function setByProperties(props: string[]) {
    return props ? props.join("<br>") : null;
}

function inspectClass(index: number, selectedData: any) {
    selectedElementIndex.value = index;
    const selectedClass = selectedData.realClass || selectedData.class;
    emits("inspect", {
        className: selectedClass,
        action: selectedData.action,
    });
    document.getElementById("class-props")?.scrollIntoView();
}
</script>

<template>
    <!-- eslint-disable vue/no-v-html -->
    <div class="vp-doc">
        <o-collapse class="inspector__summary" :open="false">
            <template #trigger="{ open }">
                <div class="inspector__summary-trigger" role="button">
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
                        columns
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
                        🔍 This icon indicates that you should pay attention to
                        CSS specificity. See
                        <a href="/documentation/#deal-with-specificity">
                            "Deal with specificity"
                        </a>
                        section in the documentation.
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
                        Class prop. You'll find more info in the
                        <a href="/documentation/#overriding-classes">
                            "Overriding section" </a
                        >.
                    </p>
                </div>
            </div>
        </o-collapse>

        <ClientOnly>
            <table>
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
                    <td v-if="data.subitem">
                        ▷
                        <a :href="`#${subitem}-component`">{{ data.class }}</a>
                    </td>
                    <td>
                        <span>{{ addDotToTheEnd(data.description) }}</span>
                        <span v-if="data.componentRef">
                            More detail
                            <a
                                target="_blank"
                                :href="`/components/${data.componentRef}.html#class-props`">
                                here
                            </a>
                        </span>
                        <span v-if="data.warning">
                            <br />👉 <i><span v-html="data.warning"></span></i>
                        </span>
                        <span v-if="data.specificity">
                            <br />🔍
                            <i>
                                <span>
                                    Classes applied have a higher specificity
                                    than expected
                                    <span v-html="data.specificity"> </span>
                                </span>
                            </i>
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
                        <o-button
                            v-if="!data.nospec === true"
                            label="Inspect"
                            variant="warning"
                            class="inspector__btn"
                            type="button"
                            @click="inspectClass(index, data)" />
                    </td>
                </tr>
            </table>
        </ClientOnly>
    </div>
</template>

<style lang="scss" scoped>
.inspector__summary {
    margin-top: 2rem;
}

.inspector__summary-trigger {
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
    background: #bd1313 !important;
    color: white !important;
}
</style>
