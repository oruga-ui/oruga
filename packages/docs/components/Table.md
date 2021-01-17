---
title: Table
---

# Table

> Tabulated data are sometimes needed, it's even better when it's responsive

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/table/examples/Table.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <o-table :data="data" :columns="columns"></o-table>
</template>

<script>
  export default {
    data() {
      return {
        data: [
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
        ],
        columns: [
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
            position: 'centered'
          },
          {
            field: 'gender',
            label: 'Gender'
          }
        ]
      }
    }
  }
</script>
```

:::

### Sandbox

::: demo

```html
<template>
  <section>
    <o-field grouped group-multiline>
      <o-switch v-model="isBordered">Bordered</o-switch>
      <o-switch v-model="isStriped">Striped</o-switch>
      <o-switch v-model="isNarrowed">Narrowed</o-switch>
      <o-switch v-model="isHoverable">Hoverable</o-switch>
      <o-switch v-model="isFocusable">Focusable</o-switch>
      <o-switch v-model="isLoading">Loading state</o-switch>
      <o-switch v-model="isEmpty">Empty</o-switch>
      <o-switch v-model="hasMobileCards">Mobile cards <small>(collapsed rows)</small></o-switch>
    </o-field>

    <o-table
      :data="isEmpty ? [] : data"
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

      <o-table-column field="first_name" label="First Name" v-slot="props">
        {{ props.row.first_name }}
      </o-table-column>

      <o-table-column field="last_name" label="Last Name" v-slot="props">
        {{ props.row.last_name }}
      </o-table-column>

      <o-table-column field="date" label="Date" position="centered" v-slot="props">
        {{ new Date(props.row.date).toLocaleDateString() }}
      </o-table-column>

      <o-table-column label="Gender" v-slot="props">
        <span>
          <o-icon pack="fas" :icon="props.row.gender === 'Male' ? 'mars' : 'venus'"> </o-icon>
          {{ props.row.gender }}
        </span>
      </o-table-column>
    </o-table>
  </section>
</template>

<script>
  export default {
    data() {
      const data = [
        {
          id: 1,
          first_name: 'Jesse',
          last_name: 'Simmons',
          date: '2016/10/15 13:43:27',
          gender: 'Male'
        },
        {
          id: 2,
          first_name: 'John',
          last_name: 'Jacobs',
          date: '2016/12/15 06:00:53',
          gender: 'Male'
        },
        {
          id: 3,
          first_name: 'Tina',
          last_name: 'Gilbert',
          date: '2016/04/26 06:26:28',
          gender: 'Female'
        },
        {
          id: 4,
          first_name: 'Clarence',
          last_name: 'Flores',
          date: '2016/04/10 10:28:46',
          gender: 'Male'
        },
        {
          id: 5,
          first_name: 'Anne',
          last_name: 'Lee',
          date: '2016/12/06 14:38:38',
          gender: 'Female'
        }
      ]

      return {
        data,
        isEmpty: false,
        isBordered: false,
        isStriped: false,
        isNarrowed: false,
        isHoverable: false,
        isFocusable: false,
        isLoading: false,
        hasMobileCards: true
      }
    }
  }
</script>
```

:::

### Selection

::: demo

```html
<template>
  <section>
    <o-button variant="danger" @click="selected = null" :disabled="!selected" icon-left="times">
      <span>Clear selected</span>
    </o-button>

    <p>
      {{ selected }}
    </p>

    <o-table :data="data" :columns="columns" :selected.sync="selected" focusable> </o-table>
  </section>
</template>

<script>
  export default {
    data() {
      const data = [
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
      ]

      return {
        data,
        selected: data[1],
        columns: [
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
            position: 'centered'
          },
          {
            field: 'gender',
            label: 'Gender'
          }
        ]
      }
    }
  }
</script>
```

:::

### Pagination

::: demo

```html
<template>
  <section>
    <o-field grouped group-multiline>
      <o-select v-model="defaultSortDirection">
        <option value="asc">Default sort direction: ASC</option>
        <option value="desc">Default sort direction: DESC</option>
      </o-select>
      <o-select v-model="perPage" :disabled="!isPaginated">
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="15">15 per page</option>
        <option value="20">20 per page</option>
      </o-select>
      <o-button @click="currentPage = 2" :disabled="!isPaginated">Set page to 2</o-button>
      <o-switch v-model="isPaginated">Paginated</o-switch>
      <o-switch v-model="isPaginationSimple" :disabled="!isPaginated">Simple pagination</o-switch>
      <o-select v-model="paginationPosition" :disabled="!isPaginated">
        <option value="bottom">bottom pagination</option>
        <option value="top">top pagination</option>
        <option value="both">both</option>
      </o-select>
      <o-select v-model="sortIcon">
        <option value="arrow-up">Arrow sort icon</option>
        <option value="caret-up">Caret sort icon</option>
        <option value="chevron-up">Chevron sort icon </option>
      </o-select>
      <o-select v-model="sortIconSize">
        <option value="small">Small sort icon</option>
        <option value="">Regular sort icon</option>
        <option value="medium">Medium sort icon</option>
        <option value="large">Large sort icon</option>
      </o-select>
    </o-field>

    <o-table
      :data="data"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      default-sort="user.first_name"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <o-table-column field="id" label="ID" width="40" sortable numeric v-slot="props">
        {{ props.row.id }}
      </o-table-column>

      <o-table-column field="user.first_name" label="First Name" sortable v-slot="props">
        {{ props.row.user.first_name }}
      </o-table-column>

      <o-table-column field="user.last_name" label="Last Name" sortable v-slot="props">
        {{ props.row.user.last_name }}
      </o-table-column>

      <o-table-column field="date" label="Date" sortable position="centered" v-slot="props">
        {{ new Date(props.row.date).toLocaleDateString() }}
      </o-table-column>

      <o-table-column label="Gender" v-slot="props">
        <span>
          <o-icon pack="fas" :icon="props.row.gender === 'Male' ? 'mars' : 'venus'"> </o-icon>
          {{ props.row.gender }}
        </span>
      </o-table-column>
    </o-table>
  </section>
</template>

<script>
  const data = [
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
    },
    {
      id: 11,
      user: { first_name: 'Ronald', last_name: 'Wood' },
      date: '2016/12/04 02:23:48',
      gender: 'Male'
    },
    {
      id: 12,
      user: { first_name: 'Michael', last_name: 'Harper' },
      date: '2016/07/27 13:28:15',
      gender: 'Male'
    },
    {
      id: 13,
      user: { first_name: 'George', last_name: 'Dunn' },
      date: '2017/03/07 12:26:52',
      gender: 'Male'
    },
    {
      id: 14,
      user: { first_name: 'Eric', last_name: 'Rogers' },
      date: '2016/06/07 05:41:52',
      gender: 'Male'
    },
    {
      id: 15,
      user: { first_name: 'Juan', last_name: 'Meyer' },
      date: '2017/02/01 04:56:34',
      gender: 'Male'
    },
    {
      id: 16,
      user: { first_name: 'Silvia', last_name: 'Rosa' },
      date: '2017/01/26 11:50:04',
      gender: 'Female'
    },
    {
      id: 17,
      user: { first_name: 'Lori', last_name: 'Cunningham' },
      date: '2016/05/01 10:00:56',
      gender: 'Female'
    },
    {
      id: 18,
      user: { first_name: 'Charles', last_name: 'Graham' },
      date: '2016/05/31 06:43:30',
      gender: 'Male'
    },
    {
      id: 19,
      user: { first_name: 'Henry', last_name: 'Morrison' },
      date: '2016/09/27 16:15:44',
      gender: 'Male'
    },
    {
      id: 20,
      user: { first_name: 'Albert', last_name: 'Mendoza' },
      date: '2016/08/08 05:29:24',
      gender: 'Male'
    },
    {
      id: 21,
      user: { first_name: 'Ruby', last_name: 'Snyder' },
      date: '2017/04/01 12:04:39',
      gender: 'Female'
    },
    {
      id: 22,
      user: { first_name: 'Jesse', last_name: 'Warren' },
      date: '2016/08/20 01:36:38',
      gender: 'Male'
    },
    {
      id: 23,
      user: { first_name: 'Carlos', last_name: 'Ferguson' },
      date: '2016/05/31 10:40:29',
      gender: 'Male'
    },
    {
      id: 24,
      user: { first_name: 'Melissa', last_name: 'Peters' },
      date: '2016/07/23 00:41:54',
      gender: 'Female'
    },
    {
      id: 25,
      user: { first_name: 'Arthur', last_name: 'Garza' },
      date: '2017/03/11 14:11:37',
      gender: 'Male'
    },
    {
      id: 26,
      user: { first_name: 'Joe', last_name: 'Berry' },
      date: '2016/07/09 15:16:56',
      gender: 'Male'
    },
    {
      id: 27,
      user: { first_name: 'Joseph', last_name: 'Bishop' },
      date: '2016/10/04 19:44:54',
      gender: 'Male'
    },
    {
      id: 28,
      user: { first_name: 'Sarah', last_name: 'Harper' },
      date: '2016/09/23 05:09:11',
      gender: 'Female'
    },
    {
      id: 29,
      user: { first_name: 'Christopher', last_name: 'Fuller' },
      date: '2016/04/12 00:05:35',
      gender: 'Male'
    },
    {
      id: 30,
      user: { first_name: 'Alan', last_name: 'Mendoza' },
      date: '2016/04/22 10:48:02',
      gender: 'Male'
    },
    {
      id: 31,
      user: { first_name: 'James', last_name: 'Davis' },
      date: '2017/01/16 15:17:03',
      gender: 'Male'
    },
    {
      id: 32,
      user: { first_name: 'Scott', last_name: 'Welch' },
      date: '2016/10/04 23:31:51',
      gender: 'Male'
    },
    {
      id: 33,
      user: { first_name: 'Mildred', last_name: 'Myers' },
      date: '2016/11/23 13:46:18',
      gender: 'Female'
    },
    {
      id: 34,
      user: { first_name: 'Victor', last_name: 'Martinez' },
      date: '2016/04/06 17:05:07',
      gender: 'Male'
    },
    {
      id: 35,
      user: { first_name: 'Susan', last_name: 'Medina' },
      date: '2016/12/09 10:33:37',
      gender: 'Female'
    },
    {
      id: 36,
      user: { first_name: 'Judy', last_name: 'Long' },
      date: '2016/07/26 16:19:04',
      gender: 'Female'
    },
    {
      id: 37,
      user: { first_name: 'Joan', last_name: 'Myers' },
      date: '2016/09/22 04:55:54',
      gender: 'Female'
    },
    {
      id: 38,
      user: { first_name: 'Rachel', last_name: 'Gonzales' },
      date: '2016/07/15 13:56:38',
      gender: 'Female'
    },
    {
      id: 39,
      user: { first_name: 'Roger', last_name: 'Hunt' },
      date: '2016/08/14 10:43:11',
      gender: 'Male'
    },
    {
      id: 40,
      user: { first_name: 'Dorothy', last_name: 'Howard' },
      date: '2016/06/19 05:34:49',
      gender: 'Female'
    },
    {
      id: 41,
      user: { first_name: 'Eugene', last_name: 'Lynch' },
      date: '2016/12/24 08:19:24',
      gender: 'Male'
    },
    {
      id: 42,
      user: { first_name: 'Kathy', last_name: 'Webb' },
      date: '2017/04/01 21:09:05',
      gender: 'Female'
    },
    {
      id: 43,
      user: { first_name: 'Antonio', last_name: 'White' },
      date: '2017/02/10 06:51:20',
      gender: 'Male'
    },
    {
      id: 44,
      user: { first_name: 'Louis', last_name: 'Spencer' },
      date: '2016/10/08 02:20:22',
      gender: 'Male'
    },
    {
      id: 45,
      user: { first_name: 'Andrea', last_name: 'Marshall' },
      date: '2016/09/04 10:59:57',
      gender: 'Female'
    },
    {
      id: 46,
      user: { first_name: 'Eugene', last_name: 'Sims' },
      date: '2017/03/15 06:39:48',
      gender: 'Male'
    },
    {
      id: 47,
      user: { first_name: 'Mildred', last_name: 'Gibson' },
      date: '2016/04/18 06:43:54',
      gender: 'Female'
    },
    {
      id: 48,
      user: { first_name: 'Joan', last_name: 'Arnold' },
      date: '2016/12/16 04:52:23',
      gender: 'Female'
    },
    {
      id: 49,
      user: { first_name: 'Jesse', last_name: 'Schmidt' },
      date: '2016/06/11 02:44:33',
      gender: 'Male'
    },
    {
      id: 50,
      user: { first_name: 'David', last_name: 'Frazier' },
      date: '2017/02/15 21:46:30',
      gender: 'Male'
    },
    {
      id: 51,
      user: { first_name: 'Nicholas', last_name: 'Howell' },
      date: '2016/11/01 15:08:31',
      gender: 'Male'
    },
    {
      id: 52,
      user: { first_name: 'Douglas', last_name: 'Chapman' },
      date: '2017/02/08 03:33:24',
      gender: 'Male'
    },
    {
      id: 53,
      user: { first_name: 'Bruce', last_name: 'Simmons' },
      date: '2016/07/14 12:11:17',
      gender: 'Male'
    },
    {
      id: 54,
      user: { first_name: 'Antonio', last_name: 'George' },
      date: '2016/11/07 19:12:55',
      gender: 'Male'
    },
    {
      id: 55,
      user: { first_name: 'Chris', last_name: 'Marshall' },
      date: '2016/07/03 12:11:45',
      gender: 'Male'
    },
    {
      id: 56,
      user: { first_name: 'Ashley', last_name: 'Hudson' },
      date: '2016/10/14 21:08:05',
      gender: 'Female'
    },
    {
      id: 57,
      user: { first_name: 'Alan', last_name: 'Edwards' },
      date: '2017/03/22 21:10:25',
      gender: 'Male'
    },
    {
      id: 58,
      user: { first_name: 'George', last_name: 'Clark' },
      date: '2016/04/28 03:15:05',
      gender: 'Male'
    },
    {
      id: 59,
      user: { first_name: 'Frank', last_name: 'Porter' },
      date: '2016/09/08 00:48:14',
      gender: 'Male'
    },
    {
      id: 60,
      user: { first_name: 'Christopher', last_name: 'Palmer' },
      date: '2016/05/24 08:58:12',
      gender: 'Male'
    }
  ]

  export default {
    data() {
      return {
        data,
        isPaginated: true,
        isPaginationSimple: false,
        paginationPosition: 'bottom',
        defaultSortDirection: 'asc',
        sortIcon: 'arrow-up',
        sortIconSize: 'small',
        currentPage: 1,
        perPage: 5
      }
    }
  }
</script>
```

:::

### Checkable

::: demo

```html
<template>
  <section>
    <o-field grouped group-multiline>
      <o-button variant="danger" @click="checkedRows = []" :disabled="!checkedRows.length" icon-left="times">
        <span>Clear checked</span>
      </o-button>
      <o-select v-model="checkboxPosition">
        <option value="left">Checkbox at left</option>
        <option value="right">Checkbox at right</option>
      </o-select>
    </o-field>

    <o-table
      :data="data"
      :columns="columns"
      :checked-rows.sync="checkedRows"
      :is-row-checkable="(row) => row.id !== 3 && row.id !== 4"
      checkable
      :checkbox-position="checkboxPosition"
    >
      <template slot="bottom-left"> <b>Total checked</b>: {{ checkedRows.length }} </template>
    </o-table>
  </section>
</template>

<script>
  export default {
    data() {
      const data = [
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
      ]

      return {
        data,
        checkboxPosition: 'left',
        checkedRows: [data[1], data[3]],
        columns: [
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
            position: 'centered'
          },
          {
            field: 'gender',
            label: 'Gender'
          }
        ]
      }
    }
  }
</script>
```

:::

### Sticky

::: demo

```html
<template>
  <section>
    <o-field grouped group-multiline>
      <div class="control">
        <o-switch v-model="stickyHeaders">Sticky Headers</o-switch>
      </div>
    </o-field>
    <o-table :data="data" :columns="columns" :sticky-header="stickyHeaders"></o-table>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        data: [
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
        ],
        columns: [
          {
            field: 'id',
            label: 'ID',
            width: '40',
            numeric: true,
            sticky: true,
            headerClass: 'is-sticky-column-one',
            cellClass: 'is-sticky-column-one'
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
            headerClass: 'is-sticky-column-two',
            cellClass: 'is-sticky-column-two'
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
        ],
        stickyHeaders: true
      }
    }
  }
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
```

:::

### Detailed

::: demo

```html
<template>
  <section>
    <o-field grouped group-multiline>
      <o-checkbox v-model="showDetailIcon">Show detail chevron</o-checkbox>
      <o-checkbox v-model="showDefaultDetail">Custom detail column</o-checkbox>
      <div v-for="(column, index) in columnsVisible" :key="index">
        <o-checkbox v-model="column.display">
          {{ column.title }}
        </o-checkbox>
      </div>
    </o-field>

    <o-table
      :data="data"
      ref="table"
      detailed
      hoverable
      :custom-detail-row="!showDefaultDetail"
      :opened-detailed="['Board Games']"
      :default-sort="['name', 'asc']"
      detail-key="name"
      :show-detail-icon="showDetailIcon"
    >
      <o-table-column field="name" :visible="columnsVisible['name'].display" :label="columnsVisible['name'].title" width="300" sortable v-slot="props">
        <template v-if="showDetailIcon">
          {{ props.row.name }}
        </template>
        <template v-else>
          <a @click="toggle(props.row)">
            {{ props.row.name }}
          </a>
        </template>
      </o-table-column>

      <o-table-column field="sold" :visible="columnsVisible['sold'].display" :label="columnsVisible['sold'].title" sortable position="centered" v-slot="props">
        {{ props.row.sold }}
      </o-table-column>

      <o-table-column field="available" :visible="columnsVisible['available'].display" :label="columnsVisible['available'].title" sortable position="centered" v-slot="props">
        {{ props.row.available }}
      </o-table-column>

      <o-table-column :visible="columnsVisible['cleared'].display" :label="columnsVisible['cleared'].title" position="centered" v-slot="props">
        <span>
          {{ Math.round((props.row.sold / props.row.available) * 100) }}%
        </span>
      </o-table-column>

      <template slot="detail" slot-scope="props">
        <tr v-for="item in props.row.items" :key="item.name">
          <td v-if="showDetailIcon"></td>
          <td v-show="columnsVisible['name'].display">
            &nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}
          </td>
          <td v-show="columnsVisible['sold'].display">{{ item.sold }}</td>
          <td v-show="columnsVisible['available'].display">
            {{ item.available }}
          </td>
          <td v-show="columnsVisible['cleared'].display">
            <span>
              {{ Math.round((item.sold / item.available) * 100) }}%
            </span>
          </td>
        </tr>
      </template>
    </o-table>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {
            name: 'Board Games',
            sold: 131,
            available: 301,
            items: [
              {
                name: 'Monopoly',
                sold: 57,
                available: 100
              },
              {
                name: 'Scrabble',
                sold: 23,
                available: 84
              },
              {
                name: 'Chess',
                sold: 37,
                available: 61
              },
              {
                name: 'Battleships',
                sold: 14,
                available: 56
              }
            ]
          },
          {
            name: 'Jigsaws & Puzzles',
            sold: 88,
            available: 167,
            items: [
              {
                name: 'World Map',
                sold: 31,
                available: 38
              },
              {
                name: 'London',
                sold: 23,
                available: 29
              },
              {
                name: 'Sharks',
                sold: 20,
                available: 44
              },
              {
                name: 'Disney',
                sold: 14,
                available: 56
              }
            ]
          },
          {
            name: 'Books',
            sold: 434,
            available: 721,
            items: [
              {
                name: 'Hamlet',
                sold: 101,
                available: 187
              },
              {
                name: 'The Lord Of The Rings',
                sold: 85,
                available: 156
              },
              {
                name: 'To Kill a Mockingbird',
                sold: 78,
                available: 131
              },
              {
                name: 'Catch-22',
                sold: 73,
                available: 98
              },
              {
                name: 'Frankenstein',
                sold: 51,
                available: 81
              },
              {
                name: "Alice's Adventures In Wonderland",
                sold: 46,
                available: 68
              }
            ]
          }
        ],
        columnsVisible: {
          name: { title: 'Name', display: true },
          sold: { title: 'Stock Sold', display: true },
          available: { title: 'Stock Available', display: true },
          cleared: { title: 'Stock Cleared', display: true }
        },
        showDetailIcon: true,
        showDefaultDetail: true
      }
    },
    methods: {
      toggle(row) {
        this.$refs.table.toggleDetails(row)
      }
    }
  }
</script>
```

:::

### Searchable

::: demo

```html
<template>
  <section>
    <o-table :data="data" :columns="columns"> </o-table>
    <hr />
    <p>
      You can debounce search filter to avoid multiple filtering when typing.
    </p>
    <o-table :data="data" :columns="columns" :debounce-search="1000"> </o-table>
    <p>You can also customize the search input using a scoped slot.</p>
    <o-table :data="data">
      <template v-for="column in columns">
        <o-table-column :key="column.id" v-bind="column">
          <template v-if="column.searchable && !column.numeric" slot="searchable" slot-scope="props">
            <o-input v-model="props.filters[props.column.field]" placeholder="Search..." icon="search" size="small" />
          </template>
          <template v-slot="props">
            {{ props.row[column.field] }}
          </template>
        </o-table-column>
      </template>
    </o-table>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        data: [
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
        ],
        columns: [
          {
            field: 'id',
            label: 'ID',
            width: '100',
            numeric: true,
            searchable: true
          },
          {
            field: 'first_name',
            label: 'First Name',
            searchable: true
          },
          {
            field: 'last_name',
            label: 'Last Name',
            searchable: true
          },
          {
            field: 'date',
            label: 'Date',
            position: 'centered'
          },
          {
            field: 'gender',
            label: 'Gender'
          }
        ]
      }
    }
  }
</script>
```

:::

## Class props

<br />
<template>
    <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-table v-bind="s" :data="s.isEmpty ? [] : data" :columns="columns" :selected.sync="selected" detailed>
                    <template slot="footer"> This is the footer </template>
                    <template slot="detail">
                        DETAILS
                    </template>
                </o-table>
            </template>
        </doc-wrapper>
        <inspector :inspectData="inspectData"></inspector>
    </div>
</template>

<script>
export default {
  data() {
    return {
        selected: null,
        data: [
          {
            id: 1,
            first_name: 'Jesse',
            last_name: 'Simmons',
            date: '2016-10-15 13:43:27',
            gender: 'Male',
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
            first_name: 'Brandon',
            last_name: 'Lee',
            date: '2016-12-06 14:38:38',
            gender: 'Female'
          },
          {
            id: 6,
            first_name: 'Anne',
            last_name: 'Straus',
            date: '2017-12-06 14:38:38',
            gender: 'Female'
          },
          {
            id: 7,
            first_name: 'Mark',
            last_name: 'Knopfler',
            date: '2018-12-06 14:38:38',
            gender: 'Male'
          },
          {
            id: 8,
            first_name: 'Craig',
            last_name: 'David',
            date: '2019-12-06 14:38:38',
            gender: 'Male'
          },
          {
            id: 9,
            first_name: 'Dave',
            last_name: 'Copperfield',
            date: '2020-12-06 14:38:38',
            gender: 'Male'
          },
          {
            id: 10,
            first_name: 'Hilary',
            last_name: 'Nelson',
            date: '2021-12-06 14:38:38',
            gender: 'Female'
          }
        ],
        columns: [
          {
            field: 'id',
            label: 'ID',
            width: '40',
            numeric: true
          },
          {
            field: 'first_name',
            label: 'First Name',
            searchable: true,
            sortable: true
          },
          {
            field: 'last_name',
            label: 'Last Name',
            searchable: true
          },
          {
            field: 'date',
            label: 'Date',
            sticky: true,
            position: 'centered'
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
        ],
        inspectData: [
            {
                class: "tableClass",
                description: "Class of the Table"
            },
            {
                class: "borderedClass",
                properties: ["bordered"],
                description: "Class of the Table when bordered",
                action: (cmp) => {
                    cmp.data.bordered = true;
                }
            },
            {
                class: "stripedClass",
                properties: ["striped"],
                description: "Class of the Table when striped",
                action: (cmp) => {
                    cmp.data.striped = true;
                }
            },
            {
                class: "narrowedClass",
                properties: ["narrowed"],
                description: "Class of the Table when narrowed",
                action: (cmp) => {
                    cmp.data.narrowed = true;
                }
            },
            {
                class: "hoverableClass",
                properties: ["hoverable or focusable"],
                description: "Class of the Table when hoverable",
                action: (cmp) => {
                    cmp.data.hoverable = true;
                }
            },
            {
                class: "emptyClass",
                description: "Class of the Table when empty",
                action: (cmp) => {
                    cmp.data.isEmpty = true
                }
            },
            {
                class: "wrapperClass",
                description: "Class of the Table wrapper"
            },
            {
                class: "mobileCardsClass",
                properties: ["mobile-cards"],
                description: "-",
                action: (cmp) => {
                    cmp.data.mobileCards = true;
                }
            },
            {
                class: "stickyHeaderClass",
                properties: ["sticky-header"],
                description: "Class of the Table wrapper when header is sticky",
                action: (cmp) => {
                    cmp.data.stickyHeader = true;
                }
            },
            {
                class: "scrollableClass",
                properties: ["scrollable"],
                description: "Class of the Table wrapper when is scrollable",
                action: (cmp) => {
                    cmp.data.scrollable = true;
                }
            },
            {
                class: "footerClass",
                description: "Class of the Table footer",
                action: (cmp) => {
                    cmp.data.tableClass = 'inspector_table'
                }
            },
            {
                class: "thClass",
                description: "Class of the Table th element"
            },
            {
                class: "tdClass",
                description: "Class of the Table td element"
            },
            {
                class: "thCheckboxClass",
                description: "Class of the Table th element when checkable",
                properties: ["checkable"],
                action: (cmp) => {
                    cmp.data.checkable = true
                }
            },
            {
                class: "thDetailedClass",
                description: "Class of the Table th element of the detail trigger column",
                properties: ["detailed"],
                action: (cmp) => {
                    cmp.data.detailed = true;
                }
            },
            {
                class: "tdCheckboxClass",
                description: "Class of the Table td element when checkable",
                properties: ["checkable"],
                action: (cmp) => {
                    cmp.data.checkable = true
                }
            },
            {
                class: "detailedClass",
                description: "Class of the Table detail",
                properties: ["detailed"],
                warning: "Expand details to see it in action!",
                action: (cmp) => {
                    cmp.data.tableClass = 'inspector_table'
                    cmp.data.mobileCards = true;
                }
            },
            {
                class: "tdDetailedChevronClass",
                properties: ["detailed"],
                description: "Class of the Table td element that contains the chevron to trigger details",
                action: (cmp) => {
                    cmp.data.mobileCards = true;
                }
            },
            {
                class: "thCurrentSortClass",
                description: "Class of the Table th element currently sorted",
                warning: "Click on 'First Name' header to sort elements and see it in action!",
            },
            {
                class: "thSortableClass",
                description: "Class of the sortable Table th element",
                properties: ['sortable']
            },
            {
                class: "thUnselectableClass",
                description: "Class of the Table th element that is unsortable",
                properties: ["!headerSelectable and sortable"]
            },
            {
                class: "thPositionClass",
                description: "Class of the Table th element when positioned",
                suffixes: ['left', 'centered', 'right'],
                properties: ["position"]
            },
            {
                class: "thStickyClass",
                description: "Class of the Table th element when sticky",
                properties: ['sticky']
            },
            {
                class: "trSelectedClass",
                description: "Class of the Table tr element when selected",
                warning: "Select a row of the table to see it in action!",
                action: (cmp) => {
                    cmp.data.tableClass = 'inspector_table'
                }
            },
            {
                class: "thSortIconClass",
                description: "Class of the Table sort icon in the header",
                warning: "Click on 'First Name' header to sort elements and see it in action!",
            },
            {
                class: "tdPositionClass",
                description: "Class of the Table td element when positioned",
                suffixes: ['left', 'centered', 'right'],
                properties: ["position"]
            },
            {
                class: "tdStickyClass",
                description: "Class of the Table td element when sticky",
                properties: ['sticky']
            },
            {
                class: "mobileSortClass",
                description: "-"
            },
            {
                class: "paginationWrapperClass",
                description: "Class of the Table pagination wrapper",
                properties: ["paginated"],
                action: (cmp) => {
                    cmp.data.paginated = true
                    cmp.data.paginationSimple = true
                    cmp.data.perPage = 2
                }
            }
        ],
    };
  },
};
</script>
<style>
.inspector_table {
    border-collapse: collapse;
}
</style>

<br />
<br />

## Props

| Prop name             | Description                                                                                                                             | Type           | Values                     | Default                                                      |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------- | -------------------------- | ------------------------------------------------------------ |
| ariaCurrentLabel      |                                                                                                                                         | string         | -                          |                                                              |
| ariaNextLabel         |                                                                                                                                         | string         | -                          |                                                              |
| ariaPageLabel         |                                                                                                                                         | string         | -                          |                                                              |
| ariaPreviousLabel     |                                                                                                                                         | string         | -                          |                                                              |
| backendFiltering      | Columns won't be filtered with Javascript, use with searchable prop to the columns to filter in your backend                            | boolean        | -                          |                                                              |
| backendPagination     | Rows won't be paginated with Javascript, use with page-change event to paginate in your backend                                         | boolean        | -                          |                                                              |
| backendSorting        | Columns won't be sorted with Javascript, use with sort event to sort in your backend                                                    | boolean        | -                          |                                                              |
| bordered              | Border to all cells                                                                                                                     | boolean        | -                          |                                                              |
| checkable             | Rows can be checked (multiple), checked rows will have a .is-checked class if you want to style                                         | boolean        | -                          |                                                              |
| checkboxPosition      | Position of the checkbox (if checkable is true)                                                                                         | string         | `left`, `right`            | 'left'                                                       |
| checkedRows           | Set which rows are checked, use the .sync modifier (Vue 2.x) or v-model:checkedRows (Vue 3.x) to make it two-way binding                | array          | -                          | []                                                           |
| columns               | Table columns                                                                                                                           | array          | -                          | []                                                           |
| currentPage           | Current page of table data (if paginated), use the .sync modifier (Vue 2.x) or v-model:currentPage (Vue 3.x) to make it two-way binding | number         | -                          | 1                                                            |
| customDetailRow       | Custom style on details                                                                                                                 | boolean        | -                          | false                                                        |
| customIsChecked       | Custom method to verify if row is checked, works when is checkable. Useful for backend pagination                                       | func           | -                          |                                                              |
| customRowKey          | Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended)                       | string         | -                          |                                                              |
| data                  | Table data                                                                                                                              | array          | -                          | []                                                           |
| debounceSearch        | Filtering debounce time (in milliseconds)                                                                                               | number         | -                          |                                                              |
| defaultSort           | Sets the default sort column and order — e.g. ['first_name', 'desc']                                                                    | string\|array  | -                          |                                                              |
| defaultSortDirection  | Sets the default sort column direction on the first click                                                                               | string         | `asc`, `desc`              | 'asc'                                                        |
| detailKey             | Use a unique key of your data Object when use detailed or opened detailed. (id recommended)                                             | string         | -                          | ''                                                           |
| detailed              | Allow row details                                                                                                                       | boolean        | -                          |                                                              |
| draggable             | Allows rows to be draggable                                                                                                             | boolean        | -                          | false                                                        |
| filtersEvent          | Add a native event to filter                                                                                                            | string         | -                          | ''                                                           |
| focusable             | Table can be focused and user can navigate with keyboard arrows (require selected) and rows are highlighted when hovering               | boolean        | -                          |                                                              |
| hasDetailedVisible    | Controls the visibility of the trigger that toggles the detailed rows.                                                                  | func           | -                          | () => true                                                   |
| headerCheckable       | Show check/uncheck all checkbox in table header when checkable                                                                          | boolean        | -                          | true                                                         |
| height                | Table fixed height                                                                                                                      | number\|string | -                          |                                                              |
| hoverable             | Rows are highlighted when hovering                                                                                                      | boolean        | -                          |                                                              |
| iconPack              | Icon pack to use                                                                                                                        | string         | -                          |                                                              |
| isRowCheckable        | Custom method to verify if a row is checkable, works when is checkable                                                                  | func           | -                          | () => true                                                   |
| isRowSelectable       | Custom method to verify if a row is selectable, works when is selected.                                                                 | func           | -                          | () => true                                                   |
| loading               | Loading state                                                                                                                           | boolean        | -                          |                                                              |
| mobileBreakpoint      | Mobile breakpoint as max-width value                                                                                                    | string         | -                          |                                                              |
| mobileCards           | Rows appears as cards on mobile (collapse rows)                                                                                         | boolean        | -                          | Config -> <code> 'table.mobileCards': true</code>            |
| mobileSortPlaceholder | Text when nothing is selected                                                                                                           | string         | -                          |                                                              |
| narrowed              | Makes the cells narrower                                                                                                                | boolean        | -                          |                                                              |
| openedDetailed        | Allow pre-defined opened details. Ideal to open details via vue-router. (A unique key is required; check detail-key prop)               | array          | -                          | []                                                           |
| override              |                                                                                                                                         | boolean        | -                          |                                                              |
| paginated             | Adds pagination to the table                                                                                                            | boolean        | -                          |                                                              |
| paginationPosition    | Pagination position (if paginated)                                                                                                      | string         | `bottom`, `top`, `bot`     | Config -> <code> 'table.paginationPosition': 'bottom'</code> |
| paginationRounded     | Rounded pagination if paginated                                                                                                         | boolean        | -                          |                                                              |
| perPage               | How many rows per page (if paginated)                                                                                                   | number\|string | -                          | Config -> <code> 'table.perPage': 20</code>                  |
| scrollable            | Add a horizontal scrollbar when table is too wide                                                                                       | boolean        | -                          |                                                              |
| selected              | Set which row is selected, use the .sync modifier (Vue 2.x) or v-model:selected (Vue 3.x) to make it two-way binding                    | object         | -                          |                                                              |
| showDetailIcon        | Allow chevron icon and column to be visible                                                                                             | boolean        | -                          | true                                                         |
| showHeader            | Show header                                                                                                                             | boolean        | -                          | Config -> <code> 'table.showHeader': true</code>             |
| sortIcon              | Sets the header sorting icon                                                                                                            | string         | -                          | Config -> <code> 'table.sortIcon': 'arrow-up'</code>         |
| sortIconSize          | Sets the size of the sorting icon                                                                                                       | string         | `small`, `medium`, `large` | Config -> <code> 'table.sortIconSize': 'small'</code>        |
| stickyCheckbox        | Make the checkbox column sticky when checkable                                                                                          | boolean        | -                          | false                                                        |
| stickyHeader          | Show a sticky table header                                                                                                              | boolean        | -                          |                                                              |
| striped               | Whether table is striped                                                                                                                | boolean        | -                          |                                                              |
| total                 | Total number of table data if backend-pagination is enabled                                                                             | number\|string | -                          | 0                                                            |

### Events

| Event name            | Properties                                                                                                         | Description |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------- |
| page-change           |                                                                                                                    |
| dblclick              |                                                                                                                    |
| mouseenter            |                                                                                                                    |
| mouseleave            |                                                                                                                    |
| contextmenu           |                                                                                                                    |
| cell-click            |                                                                                                                    |
| update:currentPage    |                                                                                                                    |
| filters-change        |                                                                                                                    |
| sort                  | **field** `string` - column field<br>**direction** `boolean` - 'asc' or 'desc'<br>**event** `Event` - native event |
| check                 | **newCheckedRows** `Array<Object>` - checked rows                                                                  |
| check-all             |                                                                                                                    |
| update:checkedRows    |                                                                                                                    |
| click                 | **row** `Object` - clicked row<br>**index** `number` - index of clicked row                                        |
| select                | **row** `Object` - selected row<br>**selected** `Array<Object>` - selected rows                                    |
| update:selected       |                                                                                                                    |
| details-close         |                                                                                                                    |
| details-open          |                                                                                                                    |
| update:openedDetailed |                                                                                                                    |
| dragstart             |                                                                                                                    |
| dragend               |                                                                                                                    |
| drop                  |                                                                                                                    |
| dragover              |                                                                                                                    |
| dragleave             |                                                                                                                    |

### Slots

| Name        | Description | Bindings |
| ----------- | ----------- | -------- |
| default     |             |          |
| pagination  |             |          |
| top-left    |             |          |
| detail      |             | <br>     |
| empty       |             |          |
| footer      |             |          |
| loading     |             |          |
| bottom-left |             |          |

---

# Table Column

## Props

| Prop name        | Description                          | Type                                         | Values              | Default |
| ---------------- | ------------------------------------ | -------------------------------------------- | ------------------- | ------- |
| customKey        |                                      | string\|number                               | -                   |         |
| customSearch     |                                      | func                                         | -                   |         |
| customSort       |                                      | func                                         | -                   |         |
| field            |                                      | string                                       | -                   |         |
| headerSelectable |                                      | boolean                                      | -                   |         |
| label            |                                      | string                                       | -                   |         |
| meta             |                                      | string\|number\|boolean\|func\|object\|array | -                   |         |
| numeric          |                                      | boolean                                      | -                   |         |
| position         | Optional, position of column content | string                                       | `centered`, `right` |         |
| searchable       |                                      | boolean                                      | -                   |         |
| sortable         |                                      | boolean                                      | -                   |         |
| sticky           |                                      | boolean                                      | -                   |         |
| subheading       |                                      | string\|number                               | -                   |         |
| visible          |                                      | boolean                                      | -                   | true    |
| width            |                                      | number\|string                               | -                   |         |

## Style

| CSS Variable                                  | SASS Variable                           | Default                                                  |
| --------------------------------------------- | --------------------------------------- | -------------------------------------------------------- |
| --oruga-table-background-color                | \$table-background-color                | #fff                                                     |
| --oruga-table-background                      | \$table-background                      | #f5f5f5                                                  |
| --oruga-table-boder                           | \$table-boder                           | 1px solid transparent                                    |
| --oruga-table-border-radius                   | \$table-border-radius                   | \$base-border-radius                                     |
| --oruga-table-bordered-border-width           | \$table-bordered-border-width           | 1px                                                      |
| --oruga-table-bordered-bottom-color           | \$table-bordered-bottom-color           | \$grey                                                   |
| --oruga-table-card-box-shadow                 | \$table-card-box-shadow                 | 0 2px 3px rgba($black, 0.1), 0 0 0 1px rgba($black, 0.1) |
| --oruga-table-card-cell-font-weight           | \$table-card-cell-font-weight           | 600                                                      |
| --oruga-table-card-cell-padding               | \$table-card-cell-padding               | 0 0.5em 0 0                                              |
| --oruga-table-card-cell-text-align            | \$table-card-cell-text-align            | left                                                     |
| --oruga-table-card-detail-margin              | \$table-card-detail-margin              | -1rem 0 0 0                                              |
| --oruga-table-card-margin                     | \$table-card-margin                     | 0 0 1rem 0                                               |
| --oruga-table-color                           | \$table-color                           | black                                                    |
| --oruga-table-current-sort-border-color       | \$table-current-sort-border-color       | \$grey                                                   |
| --oruga-table-current-sort-font-weight        | \$table-current-sort-font-weight        | 700                                                      |
| --oruga-table-current-sort-hover-border-color | \$table-current-sort-hover-border-color | \$grey                                                   |
| --oruga-table-detail-background               | \$table-detail-background               | #fafafa                                                  |
| --oruga-table-detail-box-shadow               | \$table-detail-box-shadow               | inset 0 1px 3px \$grey                                   |
| --oruga-table-detail-chevron-color            | \$table-detail-chevron-color            | \$primary                                                |
| --oruga-table-detail-chevron-width            | \$table-detail-chevron-width            | 40px                                                     |
| --oruga-table-detail-padding                  | \$table-detail-padding                  | 1rem                                                     |
| --oruga-table-focus-border-color              | \$table-focus-border-color              | \$primary                                                |
| --oruga-table-focus-box-shadow                | \$table-focus-box-shadow                | 0 0 0 0.125em rgba(\$primary, 0.25)                      |
| --oruga-table-hoverable-background-color      | \$table-hoverable-background-color      | #fafafa                                                  |
| --oruga-table-narrow-padding                  | \$table-narrow-padding                  | .25em .5em                                               |
| --oruga-table-row-active-background-color     | \$table-row-active-background-color     | \$primary                                                |
| --oruga-table-row-active-color                | \$table-row-active-color                | \$primary-invert                                         |
| --oruga-table-sticky-header-height            | \$table-sticky-header-height            | 300px                                                    |
| --oruga-table-sticky-zindex                   | \$table-sticky-zindex                   | 1                                                        |
| --oruga-table-striped-background-color        | \$table-striped-background-color        | #fafafa                                                  |
| --oruga-table-td-border                       | \$table-td-border                       | 1px solid #dbdbdb                                        |
| --oruga-table-td-padding                      | \$table-td-padding                      | .5em .75em                                               |
| --oruga-table-th-border                       | \$table-th-border                       | 2px solid #dbdbdb                                        |
| --oruga-table-th-checkbox-width               | \$table-th-checkbox-width               | 40px                                                     |
| --oruga-table-th-color                        | \$table-th-color                        | #363636                                                  |
| --oruga-table-th-detail-width                 | \$table-th-detail-width                 | 14px                                                     |
| --oruga-table-th-font-weight                  | \$table-th-font-weight                  | 600                                                      |
| --oruga-table-th-padding                      | \$table-th-padding                      | 0.5em 0.75em                                             |
