<template>
    <table>
        <tr>
            <th>Class</th>
            <th>Description</th>
            <th>Props</th>
            <th>Suffixes</th>
            <th></th>
        </tr>
        <tr v-for="(data, index) of classesToInspect" :key="data.class" :class="{ inspector__highlight: index === selectedElementIndex }">
            <td v-if="!data.subitem">{{data.class}}</td>
            <td v-if="data.subitem">▷ <a :href="`#${subitem}`">{{data.class}}</a></td>
            <td>
                <span>{{data.description | addDotToTheEnd}}</span>
                <span v-if="data.warning"><br>👉 <span v-html="data.warning"></span></span>
            </td>
            <td>
                <span v-if="data.properties"><code v-html="setByProperties(data.properties)"></code></span>
            </td>
            <td>
                <span v-if="data.suffixes"><code v-html="setByProperties(data.suffixes)"></code></span>
            </td>
            <td>
              <button class="inspector__btn" type="button" @click="inspectClass(index, data)">Inspect</button>
            </td>
        </tr>
    </table>
</template>

<script>
export default {
    data () {
        return {
            selectedElementIndex: Number
        }
    },
    filters: {
        addDotToTheEnd (value) {
            if (!value.endsWith('.'))
                return value + '.'
            return value
        }
    },
    computed: {
        classesToInspect() {
            this.inspectData.sort(function(propa, propb) {
                return (propa.class < propb.class) ? -1 : (propa.class > propb.class) ? 1 : 0;
            });
            return this.inspectData
        }
    },
    props: {
        inspectData: Array,
        subitem: String
    },
    methods: {
        setByProperties(props) {
            return props ? props.join('<br>') : null
        },
        inspectClass(index, selectedData) {
            this.selectedElementIndex = index
            this.$root.$emit('inspect-class', selectedData.class, selectedData.action)
            document.getElementById("class-props").scrollIntoView();
        }
    }
}
</script>

<style scoped>
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
