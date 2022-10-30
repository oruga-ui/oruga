<template>
    <div class="vp-doc">
        <o-collapse class="inspector__summary" :open="false">
            <template v-slot:trigger="props">
                <div
                    class="inspector__summary-trigger"
                    role="button"
                >
                    <div>
                        How does <i>Class props inspector</i> work?
                    </div>
                    <a >
                        <o-icon :icon="props.open ? 'caret-up' : 'caret-down'"> </o-icon>
                    </a>
                </div>
            </template>

            <div class="inspector__summary-content">
                <div class="inspector__summary-intro"><i>Class props inspector</i> is useful to see class props you want to use to customize Oruga components and how they change a component. You can click on <b>Inspect</b> button to find the exact element where a specific class prop acts. <br><br>
                In the <i>Class props inspector</i> there are other columns</div>
                <p class="inspector__summary-class">
                    <h4>
                        Class prop
                    </h4>
                    <div>
                        This column contains the name of the Class prop you want to inspect.<br>
                        If you find a name with a link (<span>▷ <a>classPropName</a></span>) this refers to a subitem (e.g. <i>Dropdown Item</i> in <i>Dropdown</i>).
                    </div>
                </p>
                <p class="inspector__summary-class">
                    <h4>
                        Description
                    </h4>
                    <div>
                        This column contains the description of the Class prop you want to inspect.<br>
                        👉 This icon indicates some warning, e.g. <i>this Class prop is visible only on mobile.</i><br>
                        🔍 This icon indicates that you should pay attention to CSS specificity. See <a href="/documentation/#deal-with-specificity">"Deal with specificity"</a> section in the documentation.
                    </div>
                </p>
                <p class="inspector__summary-class">
                    <h4>
                        Props
                    </h4>
                    <div>
                        This column contains a list of props that activate the class, e.g. if a class prop contains <code>disabled</code> prop it means that only when the component has <code>disabled</code> prop.
                    </div>
                </p>
                <p class="inspector__summary-class">
                    <h4>
                        Suffixes
                    </h4>
                    <div>
                        This column contains all the possible suffixes that you'll receive if you use a function to customize your Class prop. You'll find more info in the <a href="/documentation/#overriding-classes">"Overriding section"</a>.
                    </div>
                </p>
            </div>
        </o-collapse>
        <table>
            <tr>
                <th>Class prop</th>
                <th>Description</th>
                <th>Props</th>
                <th>Suffixes</th>
                <th></th>
            </tr>
            <tr v-for="(data, index) of classesToInspect" :key="data.class" :class="{ inspector__highlight: index === selectedElementIndex }">
                <td v-if="!data.subitem">{{data.class}}</td>
                <td v-if="data.subitem">▷ <a :href="`#${subitem}`">{{data.class}}</a></td>
                <td>
                    <span>{{ addDotToTheEnd(data.description) }}</span>
                    <span v-if="data.componentRef">
                        More detail <a target="_blank" :href="`/components/${data.componentRef}.html#class-props`">here</a>
                    </span>
                    <span v-if="data.warning"><br>👉 <i><span v-html="data.warning"></span></i></span>
                    <span v-if="data.specificity"><br>🔍 <i><span>Classes applied have a higher specificity than expected <span v-html="data.specificity"></span></span></i></span>
                </td>
                <td>
                    <span v-if="data.properties"><code style='white-space: nowrap; padding: 0;' v-html="setByProperties(data.properties)"></code></span>
                </td>
                <td>
                    <span v-if="data.suffixes"><code style='white-space: nowrap; padding: 0;' v-html="setByProperties(data.suffixes)"></code></span>
                </td>
                <td>
                    <button v-if="!data.nospec === true" class="inspector__btn" type="button" @click="inspectClass(index, data)">Inspect</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    emits: ['inspect-class'],
    props: {
        inspectData: Array,
        subitem: String
    },
    data () {
        return {
            selectedElementIndex: undefined
        }
    },
    computed: {
        classesToInspect() {
            this.inspectData.sort(function(propa, propb) {
                return (propa.class < propb.class) ? -1 : (propa.class > propb.class) ? 1 : 0;
            })
            return this.inspectData
        }
    },
    methods: {
        addDotToTheEnd (value) {
            if (!value.endsWith('.'))
                return value + '.'
            return value
        },
        setByProperties(props) {
            return props ? props.join('<br>') : null
        },
        inspectClass(index, selectedData) {
            this.selectedElementIndex = index
            const selectedClass = selectedData.realClass || selectedData.class
            this.$emit('inspect-class', { className: selectedClass, action: selectedData.action})
            document.getElementById("class-props").scrollIntoView();
        }
    }
})
</script>

<style scoped>
.inspector__summary {
    margin-top: 2rem;
}
.inspector__summary-class h4 {
    margin-block-start: 0.33em;
    margin-block-end: 0.33em;
}
.inspector__summary-trigger div {
    margin-right: 0.5rem;
}
.inspector__summary-trigger {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
}
.inspector__summary-content {
    border: 1px solid #dfe2e5;
    padding: 0.5rem;
}
.inspector__btn {
    cursor: pointer;
    background: #bd1313 !important;
    color: white!important;
    font-weight: bold!important;
    border: 0;
    box-shadow: none;
    border-radius: 0.3rem;
    padding: 0.4rem;
}
.inspector__highlight, .inspector__highlight code, .inspector__highlight a {
    background: #bd1313 !important;
    color: white!important;
}
</style>
