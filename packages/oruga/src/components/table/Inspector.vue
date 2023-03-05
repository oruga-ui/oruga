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
                class: "rootClass",
                description: "Class of Table root element"
            },
            {
                class: "tableClass",
                description: "Class of the Table"
            },
            {
                class: "borderedClass",
                properties: ["bordered"],
                description: "Class of the Table when is bordered",
                action: (cmp) => {
                    cmp.data.bordered = true;
                }
            },
            {
                class: "stripedClass",
                properties: ["striped"],
                description: "Class of the Table when rows are striped",
                action: (cmp) => {
                    cmp.data.striped = true;
                }
            },
            {
                class: "narrowedClass",
                properties: ["narrowed"],
                description: "Class of the Table when rows are narrowed",
                action: (cmp) => {
                    cmp.data.narrowed = true;
                }
            },
            {
                class: "hoverableClass",
                properties: ["hoverable or focusable"],
                description: "Class of the Table when is hoverable",
                action: (cmp) => {
                    cmp.data.hoverable = true;
                }
            },
            {
                class: "emptyClass",
                description: "Class of the Table when is empty",
                action: (cmp) => {
                    cmp.data.isEmpty = true
                }
            },
            {
                class: "wrapperClass",
                description: "Class of the Table wrapper"
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
                description: "Class of the Table wrapper when its content is scrollable",
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
                description: "Class of the Table `th` element"
            },
            {
                class: "tdClass",
                description: "Class of the Table `td` element"
            },
            {
                class: "thCheckboxClass",
                description: "Class of the Table `th` element when is checkable",
                properties: ["checkable"],
                action: (cmp) => {
                    cmp.data.checkable = true
                }
            },
            {
                class: "thDetailedClass",
                description: "Class of the Table `th` element of the detail column of triggers",
                properties: ["detailed"],
                action: (cmp) => {
                    cmp.data.detailed = true;
                }
            },
            {
                class: "tdCheckboxClass",
                description: "Class of the Table `td` element when is checkable",
                properties: ["checkable"],
                action: (cmp) => {
                    cmp.data.checkable = true
                }
            },
            {
                class: "detailedClass",
                description: "Class of the Table row detail",
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
                description: "Class of the Table `td` element that contains the chevron to trigger details",
                action: (cmp) => {
                    cmp.data.mobileCards = true;
                }
            },
            {
                class: "thCurrentSortClass",
                description: "Class of the Table `th` element currently sorted",
                warning: "Click on 'First Name' header to sort elements and see it in action!",
            },
            {
                class: "thSortableClass",
                description: "Class of the sortable Table `th` element",
                properties: ['sortable']
            },
            {
                class: "thUnselectableClass",
                description: "Class of the Table `th` element that is unsortable",
                properties: ["!headerSelectable and sortable"]
            },
            {
                class: "thPositionClass",
                description: "Class of the Table `th` element when component is positioned",
                suffixes: ['left', 'centered', 'right'],
                properties: ["position"]
            },
            {
                class: "thStickyClass",
                description: "Class of the Table `th` element when component is sticky",
                properties: ['sticky']
            },
            {
                class: "trSelectedClass",
                description: "Class of the Table row when selected",
                warning: "Select a row of the table to see it in action!",
                action: (cmp) => {
                    cmp.data.tableClass = 'inspector_table'
                }
            },
            {
                class: "trCheckedClass",
                description: "Class of the Table row when checkable and checked",
                warning: "Select a row of the table to see it in action!",
                properties: ["checkable"],
                action: (cmp) => {
                    cmp.data.checkable = true
                }
            },
            {
                class: "thSortIconClass",
                description: "Class of the Table sort icon in the header",
                warning: "Click on 'First Name' header to sort elements and see it in action!",
            },
            {
                class: "tdPositionClass",
                description: "Class of the Table `td` element when component is positioned",
                suffixes: ['left', 'centered', 'right'],
                properties: ["position"]
            },
            {
                class: "tdStickyClass",
                description: "Class of the Table `td` element when component is sticky",
                properties: ['sticky']
            },
            {
                class: "mobileSortClass",
                description: "Class of the sortable form wrapper on mobile",
                warning: "Switch to mobile view to see it in action!",
            },
            {
                class: "mobileClass",
                description: "Class of the Table component when on mobile",
                warning: "Switch to mobile view to see it in action!"
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
