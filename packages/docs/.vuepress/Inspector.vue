<template>
    <table>
        <tr>
            <th>Class</th>
            <th>Description</th>
            <th></th>
        </tr>
        <tr v-for="(data, index) of inspectData" :key="data.class" :class="{ inspector__highlight: index === selectedElementIndex }">
            <td>{{data.class}}</td>
            <td>{{data.description}}</td>
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
    props: {
        inspectData: Array,
    },
    methods: {
        inspectClass(index, selectedData) {
            this.selectedElementIndex = index
            this.$root.$emit('inspect-class', selectedData.class, selectedData.action)
        }
    }
}
</script>

<style scoped>
.inspector__btn {
    cursor: pointer;
    background: red!important;
    color: white!important;
    font-weight: bold!important;
    border: 0;
    box-shadow: none;
    border-radius: 0.3rem;
    padding: 0.4rem;
}
.inspector__highlight {
    background: red!important;
    color: white!important;
}
</style>
