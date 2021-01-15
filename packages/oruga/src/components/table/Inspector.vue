<template>
    <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-table v-bind="s" :data="s.isEmpty ? [] : data" :columns="columns" :debounce-search="1000">
                    <template slot="footer"> This is the footer </template>
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
            gender: 'Female'
          },
          {
            id: 8,
            first_name: 'Craig',
            last_name: 'David',
            date: '2019-12-06 14:38:38',
            gender: 'Female'
          },
          {
            id: 9,
            first_name: 'Dave',
            last_name: 'Copperfield',
            date: '2020-12-06 14:38:38',
            gender: 'Female'
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
        ],
        inspectData: [
            {
                class: "tableClass",
                description: "Class of the root element"
            },
            {
                class: "borderedClass",
                properties: ["bordered"],
                description: "Class of the trigger element",
                action: (cmp) => {
                    cmp.data.bordered = true;
                }
            },
            {
                class: "stripedClass",
                properties: ["striped"],
                description: "Class of the trigger element",
                action: (cmp) => {
                    cmp.data.striped = true;
                }
            },
            {
                class: "narrowedClass",
                properties: ["narrowed"],
                description: "Class of the trigger element",
                action: (cmp) => {
                    cmp.data.narrowed = true;
                }
            },
            {
                class: "hoverableClass",
                properties: ["hoverable or focusable"],
                description: "Class of the trigger element",
                action: (cmp) => {
                    cmp.data.hoverable = true;
                }
            },
            {
                class: "emptyClass",
                description: "Class of the trigger element",
                action: (cmp) => {
                    cmp.data.isEmpty = true
                }
            },
            // WRAPPER
            {
                class: "wrapperClass",
                properties: [""],
                description: "Class of the trigger element"
            },
            {
                class: "mobileCardsClass",
                properties: ["mobileCards"],
                description: "Class of the trigger element",
                action: (cmp) => {
                    cmp.data.mobileCards = true;
                }
            },
            {
                class: "stickyHeaderClass",
                properties: ["stickyHeader"],
                description: "Class of the trigger element",
                action: (cmp) => {
                    cmp.data.stickyHeader = true;
                }
            },
            {
                class: "scrollableClass",
                properties: ["scrollable"],
                description: "Class of the trigger element",
                action: (cmp) => {
                    cmp.data.scrollable = true;
                }
            },
            {
                class: "footerClass",
                description: "Footer class",
                action: (cmp) => {
                    cmp.data.tableClass = 'inspector_table'
                }
            },
            {
                class: "thClass",
                description: "Class of the trigger element"
            },
            {
                class: "tdClass",
                description: "Class of the trigger element"
            },
            {
                class: "thCheckboxClass",
                description: "Class of the trigger element",
                properties: ["checkable"],
                action: (cmp) => {
                    cmp.data.checkable = true
                }
            },
            {
                class: "thDetailedClass",
                description: "-"
            },
            {
                class: "tdCheckboxCellClass",
                description: "Class of the trigger element",
                properties: ["checkable"],
                action: (cmp) => {
                    cmp.data.checkable = true
                }
            },
            {
                class: "detailedClass",
                description: "-"
            },
            {
                class: "tdChevronClass",
                description: "-"
            },
            {
                class: "subheadingClass",
                description: "-"
            },
            {
                class: "mobileSortClass",
                description: "Class of the trigger element"
            },
            {
                class: "paginationWrapperClass",
                description: "Class of the trigger element",
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
