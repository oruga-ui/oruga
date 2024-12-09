import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
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
});
