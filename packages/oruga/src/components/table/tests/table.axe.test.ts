import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";

import OTable from "../Table.vue";
import { nextTick } from "vue";
import type { TableColumn } from "../types";
import type { TableProps } from "../props";

describe("OTable axe tests", () => {
    enableAutoUnmount(afterEach);

    const data = [
        {
            id: 1,
            user: { first_name: "Jesse", last_name: "Simmons" },
            date: "2016/10/15 13:43:27",
            gender: "Male",
        },
        {
            id: 2,
            user: { first_name: "John", last_name: "Jacobs" },
            date: "2016/12/15 06:00:53",
            gender: "Male",
        },
        {
            id: 3,
            user: { first_name: "Tina", last_name: "Gilbert" },
            date: "2016/04/26 06:26:28",
            gender: "Female",
        },
        {
            id: 4,
            user: { first_name: "Clarence", last_name: "Flores" },
            date: "2016/04/10 10:28:46",
            gender: "Male",
        },
        {
            id: 5,
            user: { first_name: "Anne", last_name: "Lee" },
            date: "2016/12/06 14:38:38",
            gender: "Female",
        },
        {
            id: 6,
            user: { first_name: "Sara", last_name: "Armstrong" },
            date: "2016/09/23 18:50:04",
            gender: "Female",
        },
        {
            id: 7,
            user: { first_name: "Anthony", last_name: "Webb" },
            date: "2016/08/30 23:49:38",
            gender: "Male",
        },
        {
            id: 8,
            user: { first_name: "Andrew", last_name: "Greene" },
            date: "2016/11/20 14:57:47",
            gender: "Male",
        },
        {
            id: 9,
            user: { first_name: "Russell", last_name: "White" },
            date: "2016/07/13 09:29:49",
            gender: "Male",
        },
        {
            id: 10,
            user: { first_name: "Lori", last_name: "Hunter" },
            date: "2016/12/09 01:44:05",
            gender: "Female",
        },
        {
            id: 11,
            user: { first_name: "Ronald", last_name: "Wood" },
            date: "2016/12/04 02:23:48",
            gender: "Male",
        },
        {
            id: 12,
            user: { first_name: "Michael", last_name: "Harper" },
            date: "2016/07/27 13:28:15",
            gender: "Male",
        },
        {
            id: 13,
            user: { first_name: "George", last_name: "Dunn" },
            date: "2017/03/07 12:26:52",
            gender: "Male",
        },
        {
            id: 14,
            user: { first_name: "Eric", last_name: "Rogers" },
            date: "2016/06/07 05:41:52",
            gender: "Male",
        },
        {
            id: 15,
            user: { first_name: "Juan", last_name: "Meyer" },
            date: "2017/02/01 04:56:34",
            gender: "Male",
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
            field: "user.first_name",
            label: "First Name",
            sortable: true,
        },
        {
            field: "user.last_name",
            label: "Last Name",
            sortable: true,
        },
        {
            field: "date",
            label: "Date",
            position: "centered",
            sortable: true,
            formatter: (v): string => new Date(String(v)).toLocaleDateString(),
        },
        {
            field: "gender",
            label: "Gender",
            sortable: true,
        },
    ];

    const a11yCases: {
        title: string;
        props: TableProps<(typeof data)[number]>;
    }[] = [
        {
            title: "axe table - base case",
            props: { data, columns },
        },
        {
            title: "axe table - bordered case",
            props: { data, columns, bordered: true },
        },
        {
            title: "axe table - striped case",
            props: { data, columns, striped: true },
        },
        {
            title: "axe table - narrowed case",
            props: { data, columns, narrowed: true },
        },
        {
            title: "axe table - hoverable case",
            props: { data, columns, hoverable: true },
        },
        {
            title: "axe table - selectable case",
            props: { data, columns, selectable: true },
        },
        {
            title: "axe table - checkable case",
            props: {
                data,
                columns,
                checkable: true,
                checkableHeader: true,
                stickyCheckbox: true,
            },
        },
        {
            title: "axe table - draggable case",
            props: { data, columns, draggable: true, draggableColumn: true },
        },
        {
            title: "axe table - scrollable case",
            props: {
                data,
                columns: [...columns, ...columns, ...columns],
                scrollable: true,
            },
        },
        {
            title: "axe table - detailed case",
            props: { data, columns, detailed: true, showDetailIcon: true },
        },
        {
            title: "axe table - pagination case",
            props: {
                data,
                columns,
                paginated: true,
                perPage: 2,
                currentPage: 2,
            },
        },
        {
            title: "axe table - loading case",
            props: { data, columns, loading: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount<typeof OTable<(typeof data)[number]>>(OTable, {
            props: props,
            attachTo: document.body,
        });
        await nextTick(); // await child component rendering
        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
