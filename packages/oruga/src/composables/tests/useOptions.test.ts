import { describe, test, beforeEach, expect } from "vitest";
import {
    findOptionIndex,
    isGroupOption,
    normalizeOptions,
    type OptionsGroupsProp,
    type OptionsProp,
} from "../useOptions";
import { useIndexer } from "../useIndexer";

describe("useOptions tests", () => {
    let indexer: ReturnType<typeof useIndexer>;

    beforeEach(() => {
        indexer = useIndexer();
    });

    describe("test normalizeOptions", () => {
        test("test empty list", () => {
            const normOptions = normalizeOptions([], indexer);
            expect(normOptions).toEqual([]);
        });

        test("test options object", () => {
            const options: OptionsProp = { foo: "bar", a: "b" };
            const normOptions = normalizeOptions(options, indexer);

            expect(normOptions).toEqual([
                {
                    key: "0",
                    item: { label: "bar", value: "foo" },
                },
                {
                    key: "1",
                    item: { label: "b", value: "a" },
                },
            ]);
        });

        test("test options array of strings", () => {
            const options: OptionsProp = ["foo", "bar"];
            const normOptions = normalizeOptions(options, indexer);

            expect(normOptions).toEqual([
                {
                    key: "0",
                    item: { label: "foo", value: "foo" },
                },
                {
                    key: "1",
                    item: { label: "bar", value: "bar" },
                },
            ]);
        });

        test("test options array of objects", () => {
            const options: OptionsProp = [
                { label: "foo", value: "bar" },
                { label: "a", value: "b" },
            ];

            const normOptions = normalizeOptions(options, indexer);

            expect(normOptions).toEqual([
                {
                    key: "0",
                    item: { label: "foo", value: "bar" },
                },
                {
                    key: "1",
                    item: { label: "a", value: "b" },
                },
            ]);
        });

        test("test can recursively handle options with nested groups", () => {
            const options: OptionsGroupsProp = [
                {
                    label: "foo",
                    options: ["#ff985d", "#f7ce68", "#FFFFFF", "#2b2b35"],
                },
                {
                    label: "Other",
                    options: [
                        {
                            label: "Red",
                            value: "#ff0000",
                        },
                    ],
                },
            ];

            const normOptions = normalizeOptions(options, indexer, true);

            expect(normOptions).toStrictEqual([
                {
                    key: "0",
                    attrs: undefined,
                    label: "foo",
                    options: [
                        {
                            key: "1",
                            item: { label: "#ff985d", value: "#ff985d" },
                        },
                        {
                            key: "2",
                            item: { label: "#f7ce68", value: "#f7ce68" },
                        },
                        {
                            key: "3",
                            item: { label: "#FFFFFF", value: "#FFFFFF" },
                        },
                        {
                            key: "4",
                            item: { label: "#2b2b35", value: "#2b2b35" },
                        },
                    ],
                },
                {
                    key: "5",
                    attrs: undefined,
                    label: "Other",
                    options: [
                        { key: "6", item: { label: "Red", value: "#ff0000" } },
                    ],
                },
            ]);
        });

        test("test can recursively handle options with groups of objects", () => {
            const options: OptionsGroupsProp = [
                {
                    label: "Foo",
                    options: [
                        { label: "A", value: 0 },
                        { label: "B", value: 1 },
                    ],
                },
                {
                    label: "Bar",
                    options: [
                        { label: "D", value: 3 },
                        { label: "E", value: 4 },
                    ],
                },
            ];

            const normOptions = normalizeOptions(options, indexer, true);
            expect(normOptions).toStrictEqual([
                {
                    key: "0",
                    label: "Foo",
                    attrs: undefined,
                    options: [
                        { key: "1", item: { label: "A", value: 0 } },
                        { key: "2", item: { label: "B", value: 1 } },
                    ],
                },
                {
                    key: "3",
                    label: "Bar",
                    attrs: undefined,
                    options: [
                        { key: "4", item: { label: "D", value: 3 } },
                        { key: "5", item: { label: "E", value: 4 } },
                    ],
                },
            ]);
        });

        test("test can handle options with inner options but not grouped", () => {
            const options: OptionsGroupsProp = [
                {
                    label: "Foo",
                    options: [
                        { label: "A", value: 0 },
                        { label: "B", value: 1 },
                    ],
                },
                {
                    label: "Bar",
                    options: [
                        { label: "D", value: 3 },
                        { label: "E", value: 4 },
                    ],
                },
            ];

            const normOptions = normalizeOptions(options, indexer, false);
            expect(normOptions).toStrictEqual([
                {
                    key: "0",
                    item: {
                        label: "Foo",
                        options: [
                            { label: "A", value: 0 },
                            { label: "B", value: 1 },
                        ],
                    },
                },
                {
                    key: "1",
                    item: {
                        label: "Bar",
                        options: [
                            { label: "D", value: 3 },
                            { label: "E", value: 4 },
                        ],
                    },
                },
            ]);
        });
    });

    describe("test isGroupOption", () => {
        test("test is normal option item", () => {
            const option = { key: "foo", item: { value: "bar" } };
            expect(isGroupOption(option)).toBeFalsy();
        });

        test("test is group option item", () => {
            const option = {
                key: "foo",
                label: "my group",
                options: [{ key: "foo", item: { value: "bar" } }],
            };
            expect(isGroupOption(option)).toBeTruthy();
        });
    });

    describe("test findOption", () => {
        const options = [
            {
                key: "0",
                item: {
                    label: "#ff985d",
                    value: "#ff985d",
                },
            },
            {
                key: "1",
                item: {
                    label: "#f7ce68",
                    value: "#f7ce68",
                },
            },
            {
                key: "2",
                item: {
                    label: "#FFFFFF",
                    value: "#FFFFFF",
                },
            },
            {
                key: "3",
                item: {
                    label: "#2b2b35",
                    value: "#2b2b35",
                },
            },
        ];
        const groupedOptions = [
            {
                key: "15",
                label: "foo",
                options: options,
            },
            {
                key: "16",
                label: "Other",
                hidden: true,
                options: [
                    {
                        key: "8",
                        item: {
                            label: "Red",
                            value: "#ff0000",
                            hidden: true,
                        },
                    },
                ],
            },
        ];

        test("test empty list", () => {
            const foundOption = findOptionIndex([], { key: "0", item: {} });
            expect(foundOption).toBe(-1);
        });

        test("test filter by valid value", () => {
            const foundOption = findOptionIndex(options, {
                key: "1",
                item: {
                    label: "#f7ce68",
                    value: "#f7ce68",
                },
            });
            expect(foundOption).toStrictEqual(1);
        });

        test("test filter by invalid value", () => {
            const foundOption = findOptionIndex(options, {
                key: "5",
                item: {
                    label: "#fff",
                    value: "#fff",
                },
            });
            expect(foundOption).toBe(-1);
        });

        test("test group options filter by valid value", () => {
            const foundOption = findOptionIndex(groupedOptions, {
                key: "1",
                item: {
                    label: "#f7ce68",
                    value: "#f7ce68",
                },
            });
            expect(foundOption).toStrictEqual(1);
        });

        test("test group options filter by invalid value", () => {
            const foundOption = findOptionIndex(groupedOptions, {
                key: "5",
                item: {
                    label: "#fff",
                    value: "#fff",
                },
            });
            expect(foundOption).toBe(-1);
        });
    });
});
