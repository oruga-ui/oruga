import { describe, test, expect, afterEach, vi, beforeEach } from "vitest";
import { enableAutoUnmount, flushPromises, mount } from "@vue/test-utils";
import { nextTick } from "vue";

import type { TableColumn } from "../types";

import OTable from "@/components/table/Table.vue";

describe("OTable tests", () => {
    enableAutoUnmount(afterEach);

    const data = [
        {
            id: 1,
            first_name: "Jesse",
            last_name: "Simmons",
            date: "2016-10-15 13:43:27",
            gender: "Male",
        },
        {
            id: 2,
            first_name: "John",
            last_name: "Jacobs",
            date: "2016-12-15 06:00:53",
            gender: "Male",
        },
        {
            id: 3,
            first_name: "Tina",
            last_name: "Gilbert",
            date: "2016-04-26 06:26:28",
            gender: "Female",
        },
        {
            id: 4,
            first_name: "Clarence",
            last_name: "Flores",
            date: "2016-04-10 10:28:46",
            gender: "Male",
        },
        {
            id: 5,
            first_name: "Anne",
            last_name: "Lee",
            date: "2016-12-06 14:38:38",
            gender: "Female",
        },
    ];

    const columns: TableColumn<(typeof data)[number]>[] = [
        {
            field: "id",
            label: "ID",
            width: "40",
            numeric: true,
            sortable: true,
        },
        {
            field: "first_name",
            label: "First Name",
            sortable: true,
        },
        {
            field: "last_name",
            label: "Last Name",
            sortable: true,
        },
        {
            field: "date",
            label: "Date",
            position: "centered",
            sortable: true,
        },
        {
            field: "gender",
            label: "Gender",
            sortable: true,
        },
    ];

    test("render correctly", async () => {
        const wrapper = mount<typeof OTable<(typeof data)[number]>>(OTable, {
            props: { data, columns },
        });
        await nextTick(); // await child component rendering

        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("table");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("holds columns", async () => {
        const wrapper = mount(OTable, {
            props: {
                columns: [
                    { label: "default", width: "100px" },
                    { label: "pecent", width: "50%" },
                    { label: "fixed_num", width: 100 },
                    { label: "fixed_str", width: "100" },
                ],
            },
        });
        await nextTick();

        const headers = wrapper.findAll("th");

        expect(headers).toHaveLength(4);

        const cols = headers.filter((th) => th.find("span"));
        expect(cols).toHaveLength(4);

        expect(cols[0].attributes("style")).toBe("width: 100px;");
        expect(cols[1].attributes("style")).toBe("width: 50%;");
        expect(cols[2].attributes("style")).toBe("width: 100px;");
        expect(cols[3].attributes("style")).toBe("width: 100px;");
    });

    test("displays all data", async () => {
        const wrapper = mount(OTable, {
            props: {
                columns: [
                    { label: "ID", field: "id", numeric: true },
                    { label: "Name", field: "name", filterable: true },
                ],
                data,
            },
        });
        await nextTick();

        const bodyRows = wrapper.findAll("tbody tr");
        expect(bodyRows).toHaveLength(5);
    });

    describe("test column props", () => {
        test("test column label", async () => {
            const wrapper = mount<typeof OTable<(typeof data)[number]>>(
                OTable,
                { props: { data, columns } },
            );
            await nextTick(); // await child component rendering

            const table = wrapper.find("table");
            expect(table.exists()).toBeTruthy();
            const ths = table.findAll("th");
            expect(ths).toHaveLength(columns.length);

            for (let i = 0; i < ths.length; i++) {
                expect(ths[i].text()).toBe(columns[i].label);
            }
        });

        test("test column field", async () => {
            const wrapper = mount<typeof OTable<(typeof data)[number]>>(
                OTable,
                { props: { data, columns } },
            );
            await nextTick(); // await child component rendering

            const table = wrapper.find("table");
            expect(table.exists()).toBeTruthy();
            const trs = table.findAll("tr");
            expect(trs).toHaveLength(data.length + 1);

            for (let i = 1; i < trs.length; i++) {
                const tds = trs[i].findAll("td");
                expect(tds).toHaveLength(columns.length);

                for (let j = 0; j < columns.length; j++) {
                    expect(tds[j].text()).toBe(
                        String(data[i - 1][columns[j].field!]),
                    );
                }
            }
        });

        test("test column formatter", async () => {
            const columns: TableColumn<(typeof data)[number]>[] = [
                {
                    label: "ID",
                    width: "40",
                    numeric: true,
                    sortable: true,
                    formatter: (a, b) => {
                        expect(a).toBe(b);
                        return "abc";
                    },
                },
                {
                    label: "First Name",
                    sortable: true,
                    formatter: (a, b) => {
                        expect(a).toBe(b);
                        return "abc";
                    },
                },
            ];

            const wrapper = mount<typeof OTable<(typeof data)[number]>>(
                OTable,
                { props: { data, columns } },
            );
            await nextTick(); // await child component rendering

            const table = wrapper.find("table");
            expect(table.exists()).toBeTruthy();
            const trs = table.findAll("tr");
            expect(trs).toHaveLength(data.length + 1);

            for (let i = 1; i < trs.length; i++) {
                const tds = trs[i].findAll("td");
                expect(tds).toHaveLength(columns.length);

                for (let j = 0; j < columns.length; j++) {
                    expect(tds[j].text()).toBe(
                        columns[j].formatter!(data[i], data[i]),
                    );
                }
            }
        });

        test("test column thAttrs and tdAttrs", async () => {
            const columns: TableColumn<(typeof data)[number]>[] = [
                {
                    field: "id",
                    label: "ID",
                    width: "40",
                    numeric: true,
                    sortable: true,
                    thAttrs: { class: "th-id" },
                    tdAttrs: { class: "td-id" },
                },
                {
                    field: "abc",
                    label: "ABC",
                    sortable: true,
                    thAttrs: { class: "th-abc" },
                    tdAttrs: { class: "td-abc" },
                },
            ];

            const wrapper = mount<typeof OTable<(typeof data)[number]>>(
                OTable,
                { props: { data, columns } },
            );
            await nextTick(); // await child component rendering

            const table = wrapper.find("table");
            expect(table.exists()).toBeTruthy();
            const ths = table.findAll("th");
            expect(ths).toHaveLength(columns.length);
            expect(ths[0].classes("th-id")).toBeTruthy();
            expect(ths[1].classes("th-abc")).toBeTruthy();

            const tds = table.findAll("td");
            expect(tds).toHaveLength(columns.length * data.length);

            for (let i = 0; i < tds.length; i++) {
                expect(
                    tds[i].classes(i % 2 === 0 ? "td-id" : "td-abc"),
                ).toBeTruthy();
            }
        });
    });

    describe("test filterable", () => {
        const data = [
            { id: 1, name: "Jesse" },
            { id: 2, name: "João" },
            { id: 3, name: "Tina" },
            { id: 4, name: "Anne" },
            { id: 5, name: "Clarence" },
        ];

        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.clearAllTimers();
            vi.restoreAllMocks();
        });

        test("displays filter row when at least one column is filterable", async () => {
            const wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name", filterable: true },
                    ],
                    data,
                },
            });
            await nextTick();

            const header = wrapper.find("thead");
            expect(header.exists()).toBeTruthy();

            const headRows = header.findAll("tr");
            expect(headRows).toHaveLength(2);

            const inputs = headRows[1].findAll("input");
            expect(inputs).toHaveLength(1);
        });

        test("displays filter input only on filterable columns", async () => {
            const wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name", filterable: true },
                    ],
                    data,
                },
            });
            await nextTick();

            const headRows = wrapper.findAll("thead tr");
            expect(headRows).toHaveLength(2);
            const filterCells = headRows[1].findAll("th");

            expect(filterCells[0].find("input").exists()).toBeFalsy(); // ID column is not filterable
            expect(filterCells[1].find("input").exists()).toBeTruthy(); // Name column is filterable
        });

        test("displays filtered data when searching", async () => {
            const wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name", filterable: true },
                    ],
                    data,
                },
            });
            await nextTick();

            const header = wrapper.find("thead");

            const inputs = header.findAll("input");
            expect(inputs).toHaveLength(1);

            const input = inputs[0];

            await input.setValue("J");
            await input.trigger("input");
            vi.runAllTimers(); // run debounce timer
            await flushPromises();

            const bodyRows = wrapper.findAll("tbody tr");
            expect(bodyRows).toHaveLength(2); // Jesse and João

            expect(wrapper.emitted("filters-change")).toHaveLength(1);
        });

        test("displays filtered data when searching and updating data", async () => {
            const wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name", filterable: true },
                    ],
                    data,
                },
            });
            await nextTick();

            const input = wrapper.find("thead input");
            expect(input.exists()).toBeTruthy();

            await input.setValue("J");
            await input.trigger("input");
            vi.runAllTimers(); // run debounce timer
            await flushPromises();

            let bodyRows = wrapper.findAll("tbody tr");
            expect(bodyRows).toHaveLength(2); // Jesse and João

            wrapper.setProps({
                data: [...data, { id: 6, name: "Justin" }],
            });
            await nextTick();

            bodyRows = wrapper.findAll("tbody tr");
            expect(bodyRows).toHaveLength(3); // Jesse, João and Justin
        });

        test("displays filtered data when searching by name without accent", async () => {
            const wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name", filterable: true },
                    ],
                    data,
                },
            });
            await nextTick();

            const input = wrapper.find("thead input");
            expect(input.exists()).toBeTruthy();

            await input.setValue("Joao");
            await input.trigger("input");
            vi.runAllTimers(); // run debounce timer
            await flushPromises();

            const bodyRows = wrapper.findAll("tbody tr");
            expect(bodyRows).toHaveLength(1); // João
        });

        test("displays filtered data when searching by name with accent", async () => {
            const wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name", filterable: true },
                    ],
                    data,
                },
            });
            await nextTick();

            const input = wrapper.find("thead input");
            expect(input.exists()).toBeTruthy();

            await input.setValue("João");
            await input.trigger("input");
            vi.runAllTimers(); // run debounce timer
            await flushPromises();

            const bodyRows = wrapper.findAll("tbody tr");
            expect(bodyRows).toHaveLength(1); // João
        });

        test("debounce search filtering when filter-debounce is defined", async () => {
            const wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name", filterable: true },
                    ],
                    data,
                    filterDebounce: 1000,
                },
            });
            await nextTick();

            const input = wrapper.find("thead input");
            expect(input.exists()).toBeTruthy();

            for (let i = 0; i < 10; i++) {
                await input.setValue("J".repeat(10 - i));
                await input.trigger("input");
                await setTimeout(() => {}, 500);
                const bodyRows = wrapper.findAll("tbody tr");
                expect(bodyRows).toHaveLength(5); // No filtering yet
            }

            vi.runAllTimers(); // run debounce timer

            const bodyRows = wrapper.findAll("tbody tr");
            expect(bodyRows).toHaveLength(5); // Filtering after debounce
        });

        test("hide detail row when data is filtered out", async () => {
            const wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name", filterable: true },
                    ],
                    data,
                    detailed: true,
                    // open detail for first data row
                    detailedRows: [data[0]],
                },
                slots: { detail: "DETAIL" },
            });
            await nextTick();

            const input = wrapper.find("thead input");
            expect(input.exists()).toBeTruthy();

            let bodyRows = wrapper.findAll("tbody tr");
            expect(bodyRows).toHaveLength(data.length + 1); // data rows + detail for row 1
            expect(bodyRows[1].text()).toBe("DETAIL"); // check second row is detal row

            await input.setValue("T");
            await input.trigger("input");
            vi.runAllTimers(); // run debounce timer
            await flushPromises();

            bodyRows = wrapper.findAll("tbody tr");
            expect(bodyRows).toHaveLength(1); // Tina
        });
    });

    describe("test sorting", () => {
        const random_words = [
            "Apfel", // A
            "Ball", // B
            "Clown", // C
            "Dach", // D
            "Elefant", // E
            "Fisch", // F
            "Garten", // G
            "Haus", // H
            "Insel", // I
            "Jacke", // J
            "Kugel", // K
            "Lampe", // L
            "Maus", // M
            "Nase", // N
            "Ozean", // O
            "Pferd", // P
            "Qualle", // Q
            "Rose", // R
            "Sonne", // S
            "Tiger", // T
            "Uhr", // U
            "Vogel", // V
            "Wolke", // W
            "Xylofon", // X
            "Yacht", // Y
            "Zebra", // Z
        ];

        test("tests sort default when paginated", async () => {
            const perPage = 10;
            let lastId = 1;
            const data = random_words.map((word) => ({
                id: lastId++,
                name: word,
            }));

            const wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name", sortable: true },
                    ],
                    perPage,
                    paginated: true,
                    data,
                    defaultSort: "name",
                },
            });
            await nextTick(); // await column rendered

            const head = wrapper.find("thead");
            const ths = head.findAll("th");
            expect(ths).toHaveLength(2);
            expect(ths[1].classes("o-table__th--sortable")).toBeTruthy();
            // check arrow pointing upwards
            expect(
                ths[1].find('[data-oruga="icon"]').attributes("style"),
            ).toBeFalsy();

            const body = wrapper.find("tbody");
            const trs = body.findAll("tr");
            expect(trs).toHaveLength(perPage);

            // check default sort
            for (let idx = 0; idx < perPage; idx++) {
                const tds = trs[idx].findAll("td");
                expect(tds).toHaveLength(2);
                expect(tds[1].text()).toBe(data[idx].name);
            }
        });

        test("tests sort default desc when paginated", async () => {
            const perPage = 10;
            let lastId = 1;
            const data = random_words.map((word) => ({
                id: lastId++,
                name: word,
            }));

            const wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name", sortable: true },
                    ],
                    perPage,
                    paginated: true,
                    data,
                    defaultSort: "name",
                    defaultSortDirection: "desc",
                },
            });
            await nextTick(); // await column rendered

            const head = wrapper.find("thead");
            const ths = head.findAll("th");
            expect(ths).toHaveLength(2);
            expect(ths[1].classes("o-table__th--sortable")).toBeTruthy();
            // check arrow pointing downwards
            expect(
                ths[1].find('[data-oruga="icon"]').attributes("style"),
            ).toBeTruthy();
            const body = wrapper.find("tbody");

            const trs = body.findAll("tr");
            expect(trs).toHaveLength(perPage);

            // check default desc sort
            for (let idx = 0; idx < perPage; idx++) {
                const tds = trs[idx].findAll("td");
                expect(tds).toHaveLength(2);
                expect(tds[1].text()).toBe(data[data.length - 1 - idx].name);
            }
        });

        test("tests sort change when paginated", async () => {
            const perPage = 10;
            let lastId = 1;
            const data = random_words.map((word) => ({
                id: lastId++,
                name: word,
            }));

            const wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name", sortable: true },
                    ],
                    perPage,
                    paginated: true,
                    data,
                    defaultSort: "name",
                },
            });
            await nextTick(); // await column rendered

            const head = wrapper.find("thead");
            const ths = head.findAll("th");
            expect(ths).toHaveLength(2);
            expect(ths[1].classes("o-table__th--sortable")).toBeTruthy();
            // check arrow pointing upwards
            expect(
                ths[1].find('[data-oruga="icon"]').attributes("style"),
            ).toBeFalsy();
            const body = wrapper.find("tbody");

            let trs = body.findAll("tr");
            expect(trs).toHaveLength(perPage);

            // check asc sort
            for (let idx = 0; idx < perPage; idx++) {
                const tds = trs[idx].findAll("td");
                expect(tds).toHaveLength(2);
                expect(tds[1].text()).toBe(data[idx].name);
            }

            await ths[1].trigger("click");
            // check arrow pointing downwards
            expect(
                ths[1].find('[data-oruga="icon"]').attributes("style"),
            ).toBeTruthy();

            trs = body.findAll("tr");
            expect(trs).toHaveLength(perPage);

            // check desc sort
            for (let idx = 0; idx < perPage; idx++) {
                const tds = trs[idx].findAll("td");
                expect(tds).toHaveLength(2);
                expect(tds[1].text()).toBe(data[data.length - 1 - idx].name);
            }
        });

        test("tests sort correctly after data update when paginated", async () => {
            const perPage = 10;
            let lastId = 1;
            const data = random_words.map((word) => ({
                id: lastId++,
                name: word,
            }));

            const wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name", sortable: true },
                    ],
                    perPage,
                    paginated: true,
                    data,
                    defaultSort: "name",
                },
            });
            await nextTick(); // await column rendered

            const head = wrapper.find("thead");
            const ths = head.findAll("th");
            expect(ths).toHaveLength(2);
            expect(ths[1].classes("o-table__th--sortable")).toBeTruthy();
            // check arrow pointing upwards
            expect(
                ths[1].find('[data-oruga="icon"]').attributes("style"),
            ).toBeFalsy();

            const body = wrapper.find("tbody");
            let trs = body.findAll("tr");
            expect(trs).toHaveLength(perPage);

            const newData = [
                ...random_words.slice(0, 3).map((word) => ({
                    id: lastId++,
                    name: word,
                })),
                ...data,
            ];
            await wrapper.setProps({ data: newData });

            trs = body.findAll("tr");
            expect(trs).toHaveLength(perPage);

            const sortedData = newData.sort((a, b) =>
                a.name.localeCompare(b.name),
            );

            // check default desc sort
            for (let idx = 0; idx < perPage; idx++) {
                const tds = trs[idx].findAll("td");
                expect(tds).toHaveLength(2);
                expect(tds[1].text()).toBe(sortedData[idx].name);
            }
        });
    });

    describe("test checkable", () => {
        test("tests header has checkAll checkbox", async () => {
            const wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name" },
                    ],
                    checkable: true,
                    paginated: false,
                    data: data,
                },
            });
            await nextTick();

            const head = wrapper.find("thead");
            expect(head.exists()).toBeTruthy();
            const checkboxes = head.findAll("input");
            expect(checkboxes).toHaveLength(1);
        });

        test("tests isAllUncheckable method", async () => {
            const isRowCheckable = vi.fn(() => false);

            const wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name", filterable: true },
                    ],
                    checkable: true,
                    isRowCheckable: isRowCheckable,
                    paginated: false,
                    data: [
                        {
                            id: 1,
                            first_name: "Jesse",
                            last_name: "Simmons",
                            date: "2016-10-15 13:43:27",
                            gender: "Male",
                        },
                    ],
                },
            });
            await nextTick();

            const body = wrapper.find("tbody");
            const checkboxes = body.findAll("input");
            expect(checkboxes).toHaveLength(1);
            expect(checkboxes[0].attributes("disabled")).toBe("");
        });

        test("tests checkAll working correctly", async () => {
            const wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name" },
                    ],
                    checkable: true,
                    paginated: false,
                    data: data,
                },
            });
            await nextTick();

            const head = wrapper.find("thead");
            expect(head.exists()).toBeTruthy();
            const headerCheckboxes = head.findAll("input");
            expect(headerCheckboxes).toHaveLength(1);
            const checkAllCheckbox = headerCheckboxes[0];

            const body = wrapper.find("tbody");
            expect(body.exists()).toBeTruthy();
            const checkboxes = body.findAll("input");
            expect(checkboxes).toHaveLength(data.length);
            // assert no row is checked
            checkboxes.forEach((checkbox) =>
                expect(checkbox.element.checked).toBeFalsy(),
            );

            // check checkAll checkbox
            await checkAllCheckbox.setValue(true);
            // assert all rows area are checked
            checkboxes.forEach((checkbox) =>
                expect(checkbox.element.checked).toBeTruthy(),
            );

            // decheck checkAll checkbox again
            await checkAllCheckbox.setValue(false);
            // assert no row is checked
            checkboxes.forEach((checkbox) =>
                expect(checkbox.element.checked).toBeFalsy(),
            );
        });
    });

    describe("test pageable", () => {
        test("show correct amount of rows per page", async () => {
            let perPage = 3;

            let wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name", filterable: true },
                    ],
                    paginated: true,
                    data: data,
                    perPage: perPage,
                },
            });
            await nextTick();

            let body = wrapper.find("tbody");
            let trs = body.findAll("tr");
            expect(trs).toHaveLength(perPage);

            perPage = 5;

            wrapper = mount(OTable, {
                props: {
                    columns: [
                        { label: "ID", field: "id", numeric: true },
                        { label: "Name", field: "name", filterable: true },
                    ],
                    paginated: true,
                    data: data,
                    perPage: perPage,
                },
            });
            await nextTick();

            body = wrapper.find("tbody");
            trs = body.findAll("tr");
            expect(trs).toHaveLength(perPage);
        });
    });
});
