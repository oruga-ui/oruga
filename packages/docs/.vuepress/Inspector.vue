<template>
    <table>
        <tr>
            <th>Class</th>
            <th>Description</th>
            <th>Inspect</th>
        </tr>
        <tr v-for="data of inspectData" :key="data.class">
            <td>{{data.class}}</td>
            <td>{{data.description}}</td>
            <td>
              <input type="radio" value="Inspect" name="inspector" @click="inspectClass(data.class, data.action)">
              <label for="inspector">Inspect</label>
            </td>
        </tr>
    </table>
</template>

<script>
export default {
  props: {
    inspectData: Array,
  },
  methods: {
    inspectClass(className, action) {
      this.$root.$emit('inspect-class', className, action)
    }
  }
}
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
