<template>
  <section>
  <o-collapse :open="true" animation="slide">
    <template v-slot:trigger="props">
      <o-button>{{ props.open ? 'close' : 'open' }}</o-button>
      </template>
    <section>
        <p class="content"><b>Selected:</b> {{ selected }}</p>
        <o-field label="Find a JS framework">
            <o-autocomplete
                rounded
                v-model="name"
                :data="filteredDataArray"
                placeholder="e.g. jQuery"
                icon="search"
                clearable
                @select="option => selected = option">
                <template v-slot:empty>No results found</template>
            </o-autocomplete>
        </o-field>
    </section>
  </o-collapse>

  <section>
    <o-field label="Name">
      <o-input value="Kevin Garvey"></o-input>
    </o-field>

    <o-field label="Email" variant="danger" message="This email is invalid">
      <o-input type="email" value="john@" maxlength="30"> </o-input>
    </o-field>

    <o-field label="Username" variant="success" message="This username is available">
      <o-input value="johnsilver" maxlength="30"></o-input>
    </o-field>

    <o-field label="Password" variant="warning">
      <o-input value="123" type="password" maxlength="30"></o-input>
    </o-field>

    <o-field label="Subject">
      <o-select placeholder="Select a subject">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </o-select>
    </o-field>
  </section>
   
  <section>
        <p>
            <o-button @click="activeTab = 'music'">Set Music</o-button>
        </p>
        <p>
            <o-switch v-model="showBooks"> Show Books item </o-switch>
            <o-switch v-model="multiline"> Multiline </o-switch>
        </p>
        <o-tabs v-model="activeTab" :multiline="multiline">
            <o-tab-item label="Pictures">
                Lorem ipsum dolor sit amet.
            </o-tab-item>

            <o-tab-item label="Music" value="music">
                Lorem <br>
                ipsum <br>
                dolor <br>
                sit <br>
                amet.
            </o-tab-item>

            <o-tab-item :visible="showBooks" label="Books">
                What light is light, if Silvia be not seen? <br>
                What joy is joy, if Silvia be not by— <br>
                Unless it be to think that she is by <br>
                And feed upon the shadow of perfection? <br>
                Except I be by Silvia in the night, <br>
                There is no music in the nightingale.
            </o-tab-item>

            <o-tab-item label="Videos" icon="video" disabled>
                Nunc nec velit nec libero vestibulum eleifend.
                Curabitur pulvinar congue luctus.
                Nullam hendrerit iaculis augue vitae ornare.
                Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
            </o-tab-item>
        </o-tabs>
    </section>
    

    <section>
    <o-field grouped group-multiline>
      <o-switch v-model="isBordered">Bordered</o-switch>
      <o-switch v-model="isStriped">Striped</o-switch>
      <o-switch v-model="isNarrowed">Narrowed</o-switch>
      <o-switch v-model="isHoverable">Hoverable</o-switch>
      <o-switch v-model="isFocusable">Focusable</o-switch>
      <o-switch v-model="isLoading">Loading state</o-switch>
      <o-switch v-model="isEmpty">Empty</o-switch>
      <o-switch v-model="hasMobileCards"
        >Mobile cards <small>(collapsed rows)</small></o-switch
      >
    </o-field>

    <o-table
      :data="isEmpty ? [] : dataTable"
      :bordered="isBordered"
      :striped="isStriped"
      :narrowed="isNarrowed"
      :hoverable="isHoverable"
      :loading="isLoading"
      :focusable="isFocusable"
      :mobile-cards="hasMobileCards"
    >
      <o-table-column field="id" label="ID" width="40" numeric v-slot="props">
        {{ props.row.id }}
      </o-table-column>

      <o-table-column field="first_name" label="First Name" v-slot="props" v-if="!isHoverable">
        {{ props.row.first_name }}
      </o-table-column>

      <o-table-column field="last_name" label="Last Name" v-slot="props">
        {{ props.row.last_name }}
      </o-table-column>

      <o-table-column field="date" label="Date" centered v-slot="props">
        {{ new Date(props.row.date).toLocaleDateString() }}
      </o-table-column>

      <o-table-column label="Gender" v-slot="props">
        <span>
          <o-icon
            pack="fas"
            :icon="props.row.gender === 'Male' ? 'mars' : 'venus'"
          >
          </o-icon>
          {{ props.row.gender }}
        </span>
      </o-table-column>
    </o-table>
  </section>

  <section>
    <o-field grouped group-multiline>
      <o-button
        variant="danger"
        @click="checkedRows = []"
        :disabled="!checkedRows.length"
        icon-left="times"
      >
        <span>Clear checked</span>
      </o-button>
      <o-select v-model="checkboxPosition">
        <option value="left">Checkbox at left</option>
        <option value="right">Checkbox at right</option>
      </o-select>
    </o-field>


<b>Total checked</b>: {{ checkedRows.length }}
    <o-table
      :data="dataTable"
      :checked-rows.sync="checkedRows"
      :is-row-checkable="(row) => row.id !== 3 && row.id !== 4"
      checkable
      :checkbox-position="checkboxPosition"
    >

    
      <o-table-column field="id" label="ID" width="40" numeric v-slot="props">
        {{ props.row.id }}
      </o-table-column>

      <o-table-column field="first_name" label="First Name" v-slot="props" v-if="!isHoverable">
        {{ props.row.first_name }}
      </o-table-column>

      <o-table-column field="last_name" label="Last Name" v-slot="props">
        {{ props.row.last_name }}
      </o-table-column>

      <o-table-column field="date" label="Date" centered v-slot="props">
        {{ new Date(props.row.date).toLocaleDateString() }}
      </o-table-column>

      <o-table-column label="Gender" v-slot="props">
        <span>
          <o-icon
            pack="fas"
            :icon="props.row.gender === 'Male' ? 'mars' : 'venus'"
          >
          </o-icon>
          {{ props.row.gender }}
        </span>
      </o-table-column>
      
    </o-table>
  </section>
  </section>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
      const data = [
        {
          id: 1,
          first_name: "Jesse",
          last_name: "Simmons",
          date: "2016/10/15 13:43:27",
          gender: "Male",
        },
        {
          id: 2,
          first_name: "John",
          last_name: "Jacobs",
          date: "2016/12/15 06:00:53",
          gender: "Male",
        },
        {
          id: 3,
          first_name: "Tina",
          last_name: "Gilbert",
          date: "2016/04/26 06:26:28",
          gender: "Female",
        },
        {
          id: 4,
          first_name: "Clarence",
          last_name: "Flores",
          date: "2016/04/10 10:28:46",
          gender: "Male",
        },
        {
          id: 5,
          first_name: "Anne",
          last_name: "Lee",
          date: "2016/12/06 14:38:38",
          gender: "Female",
        },
      ];

      return {
        activeTab: undefined,
        showBooks: false,
        multiline: false,
        checkedRows: [data[1], data[3]],
        columns: [
          {
            field: "id",
            label: "ID",
            width: "40",
            numeric: true,
          },
          {
            field: "first_name",
            label: "First Name",
          },
          {
            field: "last_name",
            label: "Last Name",
          },
          {
            field: "date",
            label: "Date",
            centered: true,
          },
          {
            field: "gender",
            label: "Gender",
          },
        ],
        checkboxPosition: 'left',
        data: [
            'Angular',
            'Angular 2',
            'Aurelia',
            'Backbone',
            'Ember',
            'jQuery',
            'Meteor',
            'Node.js',
            'Polymer',
            'React',
            'RxJS',
            'Vue.js'
        ],
        name: '',
        selected: null,
        dataTable: data,
        isEmpty: false,
        isBordered: false,
        isStriped: false,
        isNarrowed: false,
        isHoverable: false,
        isFocusable: false,
        isLoading: false,
        hasMobileCards: true,
      }
    },
    computed: {
        filteredDataArray() {
            return this.data.filter((option) => {
                return option
                    .toString()
                    .toLowerCase()
                    .indexOf(this.name.toLowerCase()) >= 0
            })
        }
    },
    mounted() {
      setTimeout(() => {
        this.dataTable[0].id = 242424242
      }, 10 * 1000)
    }
}
</script>
