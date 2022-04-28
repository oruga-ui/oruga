<template>
  <section>
    <o-field grouped group-multiline>
      <div class="control">
        <o-switch v-model="stickyHeaders">Sticky Headers</o-switch>
      </div>
    </o-field>
    <o-table
      :data="data"
      :columns="columns"
      :sticky-header="stickyHeaders"
    ></o-table>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([
      {
        id: 1,
        user: { first_name: 'Jesse', last_name: 'Simmons' },
        date: '2016/10/15 13:43:27',
        gender: 'Male'
      },
      {
        id: 2,
        user: { first_name: 'John', last_name: 'Jacobs' },
        date: '2016/12/15 06:00:53',
        gender: 'Male'
      },
      {
        id: 3,
        user: { first_name: 'Tina', last_name: 'Gilbert' },
        date: '2016/04/26 06:26:28',
        gender: 'Female'
      },
      {
        id: 4,
        user: { first_name: 'Clarence', last_name: 'Flores' },
        date: '2016/04/10 10:28:46',
        gender: 'Male'
      },
      {
        id: 5,
        user: { first_name: 'Anne', last_name: 'Lee' },
        date: '2016/12/06 14:38:38',
        gender: 'Female'
      },
      {
        id: 6,
        user: { first_name: 'Sara', last_name: 'Armstrong' },
        date: '2016/09/23 18:50:04',
        gender: 'Female'
      },
      {
        id: 7,
        user: { first_name: 'Anthony', last_name: 'Webb' },
        date: '2016/08/30 23:49:38',
        gender: 'Male'
      },
      {
        id: 8,
        user: { first_name: 'Andrew', last_name: 'Greene' },
        date: '2016/11/20 14:57:47',
        gender: 'Male'
      },
      {
        id: 9,
        user: { first_name: 'Russell', last_name: 'White' },
        date: '2016/07/13 09:29:49',
        gender: 'Male'
      },
      {
        id: 10,
        user: { first_name: 'Lori', last_name: 'Hunter' },
        date: '2016/12/09 01:44:05',
        gender: 'Female'
      }
    ])

    const columns = ref([
      {
        field: 'id',
        label: 'ID',
        width: '40',
        numeric: true,
        sticky: true,
        thAttrs: () => ({ class: 'is-sticky-column-one' }),
        tdAttrs: () => ({ class: 'is-sticky-column-one' })
      },
      {
        field: 'user.first_name',
        label: 'First Name'
      },
      {
        field: 'user.last_name',
        label: 'Last Name'
      },
      {
        field: 'date',
        label: 'Date',
        position: 'centered',
        sticky: true,
        thAttrs: () => ({ class: 'is-sticky-column-two' }),
        tdAttrs: () => ({ class: 'is-sticky-column-two' })
      },
      {
        field: 'gender',
        label: 'Gender'
      },
      {
        field: 'id',
        label: 'Column A'
      },
      {
        field: 'id',
        label: 'Column B'
      },
      {
        field: 'id',
        label: 'Column C'
      },
      {
        field: 'id',
        label: 'Column D'
      },
      {
        field: 'id',
        label: 'Column E'
      },
      {
        field: 'id',
        label: 'Column F'
      },
      {
        field: 'id',
        label: 'Column G'
      },
      {
        field: 'id',
        label: 'Column H'
      },
      {
        field: 'id',
        label: 'Column I'
      },
      {
        field: 'id',
        label: 'Column L'
      },
      {
        field: 'id',
        label: 'Column M'
      },
      {
        field: 'id',
        label: 'Column N'
      },
      {
        field: 'id',
        label: 'Column O'
      }
    ])

    const stickyHeaders = ref(true)

    return {
      data,
      columns,
      stickyHeaders
    }
  }
})
</script>

<style>
.is-sticky-column-one {
  background: #006724 !important;
  color: white !important;
}
.is-sticky-column-two {
  background: #167df0 !important;
  color: white !important;
}
</style>
