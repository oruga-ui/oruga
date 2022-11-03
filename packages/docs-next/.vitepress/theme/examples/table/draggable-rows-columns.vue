<template>
  <div>
    <p>
      Use <code>draggable</code>/<code>draggable-column</code> prop to allow
      rows and columns to be draggable. Manage dragging using
      <code>dragstart</code
      >/<code>columndragstart</code>,<code>dragover</code>/<code
        >columndragover</code
      >
      and <code>drop</code>/<code>columndrop</code> events
    </p>
    <o-table
      :data="data"
      draggable
      draggable-column
      @dragstart="dragstart"
      @drop="drop"
      @dragover="dragover"
      @dragleave="dragleave"
      @columndragstart="columndragstart"
      @columndrop="columndrop"
      @columndragover="columndragover"
      @columndragleave="columndragleave"
    >
       <o-table-column
            v-for="column in columns"
            v-bind="column"
            #default="{ row }">
            {{ row[column.field]}}
        </o-table-column>
    </o-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {

    const draggingRow = ref(null)
    const draggingRowIndex = ref(null)
    const draggingColumnIndex = ref(null)
    const draggingColumn = ref(null)

    const columns = ref([
      {
        field: 'id',
        label: 'ID',
        width: '40',
        numeric: true
      },
      {
        field: 'first_name',
        label: 'First Name'
      },
      {
        field: 'last_name',
        label: 'Last Name'
      },
      {
        field: 'date',
        label: 'Date',
        centered: true
      },
      {
        field: 'gender',
        label: 'Gender'
      }
    ])

    const data = ref([
      {
        id: 1,
        first_name: 'Jesse',
        last_name: 'Simmons',
        date: '2016-10-15 13:43:27',
        gender: 'Male'
      },
      {
        id: 2,
        first_name: 'John',
        last_name: 'Jacobs',
        date: '2016-12-15 06:00:53',
        gender: 'Male'
      },
      {
        id: 3,
        first_name: 'Tina',
        last_name: 'Gilbert',
        date: '2016-04-26 06:26:28',
        gender: 'Female'
      },
      {
        id: 4,
        first_name: 'Clarence',
        last_name: 'Flores',
        date: '2016-04-10 10:28:46',
        gender: 'Male'
      },
      {
        id: 5,
        first_name: 'Anne',
        last_name: 'Lee',
        date: '2016-12-06 14:38:38',
        gender: 'Female'
      }
    ])

    function dragstart(payload) {
      draggingRow.value = payload.row
      draggingRowIndex.value = payload.index
      payload.event.dataTransfer.effectAllowed = 'copy'
    }

    function dragover(payload) {
      payload.event.dataTransfer.dropEffect = 'copy'
      payload.event.target.closest('tr').classList.add('is-selected')
      payload.event.preventDefault()
    }

    function dragleave(payload) {
      payload.event.target.closest('tr').classList.remove('is-selected')
      payload.event.preventDefault()
    }

    function drop(payload) {
      payload.event.target.closest('tr').classList.remove('is-selected')
      const droppedOnRowIndex = payload.index
      this.$oruga.notification.open(
        `Moved ${
          draggingRow.value.first_name
        } from row ${draggingRowIndex.value + 1} to ${droppedOnRowIndex + 1}`
      )
    }

    function columndragstart(payload) {
      draggingColumn.value = payload.column
      draggingColumnIndex.value = payload.index
      payload.event.dataTransfer.effectAllowed = 'copy'
    }

    function columndragover(payload) {
      payload.event.dataTransfer.dropEffect = 'copy'
      payload.event.target.closest('th').classList.add('is-selected')
      payload.event.preventDefault()
    }

    function columndragleave(payload) {
      payload.event.target.closest('th').classList.remove('is-selected')
      payload.event.preventDefault()
    }

    function columndrop(payload) {
      payload.event.target.closest('th').classList.remove('is-selected')
      const droppedOnColumnIndex = payload.index
      this.$oruga.notification.open(
        `Moved ${
          draggingColumn.value.field
        } from column ${draggingColumnIndex.value +
          1} to ${droppedOnColumnIndex + 1}`
      )
    }

    return {
      data,
      columns,
      draggingRow,
      draggingRowIndex,
      draggingColumn,
      draggingColumnIndex,
      dragstart,
      dragover,
      dragleave,
      drop,
      columndragstart,
      columndragover,
      columndragleave,
      columndrop
    }
  }
})
</script>
