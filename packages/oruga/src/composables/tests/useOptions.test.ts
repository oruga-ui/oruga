import { describe, test, beforeEach, afterEach, vi, expect } from "vitest";
import {
    checkOptionsEmpty,
    filterOptionsItems,
    findOption,
    firstViableOption,
    isGroupOption,
    isOptionViable,
    normalizeOptions,
    toOptionsGroup,
    toOptionsList,
    type OptionsGroupItem,
} from "../useOptions";

describe("useOptions tests", () => {
    const UUID = "123";

    beforeEach(() => {
        vi.stubGlobal("crypto", { randomUUID: vi.fn(() => UUID) });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe("test normalizeOptions", () => {
        test("test empty list", () => {
            const normOptions = normalizeOptions([]);
            expect(normOptions).toEqual([]);
        });

        test("test options object", () => {
            const options = { foo: "bar", a: "b" };
            const normOptions = normalizeOptions(options);

            expect(normOptions).toEqual([
                {
                    key: UUID,
                    label: "bar",
                    value: "foo",
                },
                {
                    key: UUID,
                    label: "b",
                    value: "a",
                },
            ]);
        });

        test("test options array of strings", () => {
            const options = ["foo", "bar"];
            const normOptions = normalizeOptions(options);

            expect(normOptions).toEqual([
                {
                    label: "foo",
                    value: "foo",
                    key: UUID,
                },
                {
                    label: "bar",
                    value: "bar",
                    key: UUID,
                },
            ]);
        });

        test("test options array of objects", () => {
            const options = [
                { label: "foo", value: "bar" },
                { label: "a", value: "b" },
            ];
            const normOptions = normalizeOptions(options);

            expect(normOptions).toEqual([
                {
                    label: "foo",
                    value: "bar",
                    key: UUID,
                },
                {
                    label: "a",
                    value: "b",
                    key: UUID,
                },
            ]);
        });
        test("test can recursively handle options with nested groups", () => {
            const options = [
                {
                    group: "foo",
                    options: ["#ff985d", "#f7ce68", "#FFFFFF", "#2b2b35"],
                },
                {
                    group: "Other",
                    options: [
                        {
                            label: "Red",
                            value: "#ff0000",
                        },
                    ],
                },
            ];

            const normOptions = normalizeOptions(options);

            expect(normOptions).toEqual([
                {
                    group: "foo",
                    key: "123",
                    options: [
                        { key: "123", label: "#ff985d", value: "#ff985d" },
                        { key: "123", label: "#f7ce68", value: "#f7ce68" },
                        { key: "123", label: "#FFFFFF", value: "#FFFFFF" },
                        { key: "123", label: "#2b2b35", value: "#2b2b35" },
                    ],
                },
                {
                    group: "Other",
                    key: "123",
                    options: [{ key: "123", label: "Red", value: "#ff0000" }],
                },
            ]);
        });

        test("test can recursively handle options with groups of objects", () => {
            const options = [
                {
                    group: "Foo",
                    options: [
                        { label: "A", value: 0 },
                        { label: "B", value: 1 },
                    ],
                },
                {
                    group: "Bar",
                    options: [
                        { label: "D", value: 3 },
                        { label: "E", value: 4 },
                    ],
                },
            ];

            const normOptions = normalizeOptions(options);
            expect(normOptions).toEqual([
                {
                    group: "Foo",
                    key: "123",
                    options: [
                        { key: "123", label: "A", value: 0 },
                        { key: "123", label: "B", value: 1 },
                    ],
                },
                {
                    group: "Bar",
                    key: "123",
                    options: [
                        { key: "123", label: "D", value: 3 },
                        { key: "123", label: "E", value: 4 },
                    ],
                },
            ]);
        });
    });

    describe("test isGroupOption", () => {
        test("test is normal option item", () => {
            const option = { label: "foo", value: "bar" };
            expect(isGroupOption(option)).toBeFalsy();
        });
        test("test is group option item", () => {
            const option = {
                group: "my group",
                options: [{ label: "foo", value: "bar" }],
            };
            expect(isGroupOption(option)).toBeTruthy();
        });
    });

    describe("test toOptionsGroup", () => {
        test("test empty list", () => {
            const groupOptions = toOptionsGroup([]);
            expect(groupOptions).toEqual([{ key: UUID, options: [] }]);
        });

        test("test is normal options", () => {
            const options = [
                {
                    label: "foo",
                    value: "bar",
                    key: UUID,
                },
                {
                    label: "a",
                    value: "b",
                    key: UUID,
                },
            ];

            const groupOptions = toOptionsGroup(options);
            expect(groupOptions).toEqual([
                {
                    key: UUID,
                    options,
                },
            ]);
        });

        test("test is group options", () => {
            const options = [
                {
                    group: "foo",
                    options: [
                        {
                            label: "#ff985d",
                            value: "#ff985d",
                        },
                        {
                            label: "#f7ce68",
                            value: "#f7ce68",
                        },
                        {
                            label: "#FFFFFF",
                            value: "#FFFFFF",
                        },
                        {
                            label: "#2b2b35",
                            value: "#2b2b35",
                        },
                    ],
                },
                {
                    group: "Other",
                    options: [
                        {
                            label: "Red",
                            value: "#ff0000",
                        },
                    ],
                },
            ];

            const groupOptions = toOptionsGroup(options);
            expect(groupOptions).toEqual(options);
        });
    });

    describe("test toOptionsList", () => {
        test("test empty list", () => {
            const listOptions = toOptionsList([]);
            expect(listOptions).toEqual([]);
        });

        test("test group options to option item list", () => {
            const options = [
                {
                    group: "foo",
                    options: [
                        {
                            label: "#ff985d",
                            value: "#ff985d",
                        },
                        {
                            label: "#f7ce68",
                            value: "#f7ce68",
                        },
                        {
                            label: "#FFFFFF",
                            value: "#FFFFFF",
                        },
                        {
                            label: "#2b2b35",
                            value: "#2b2b35",
                        },
                    ],
                },
                {
                    group: "Other",
                    options: [
                        {
                            label: "Red",
                            value: "#ff0000",
                        },
                    ],
                },
            ];
            const listOptions = toOptionsList(options);
            expect(listOptions).toEqual([
                ...options[0].options,
                ...options[1].options,
            ]);
        });
    });

    describe("test filterOptionsItems", () => {
        let options: OptionsGroupItem[];

        beforeEach(() => {
            options = [
                {
                    group: "foo",
                    options: [
                        {
                            label: "#ff985d",
                            value: "#ff985d",
                        },
                        {
                            label: "#f7ce68",
                            value: "#f7ce68",
                        },
                        {
                            label: "#FFFFFF",
                            value: "#FFFFFF",
                        },
                        {
                            label: "#2b2b35",
                            value: "#2b2b35",
                        },
                    ],
                },
                {
                    group: "Other",
                    options: [
                        {
                            label: "Red",
                            value: "#ff0000",
                        },
                    ],
                },
            ];
        });

        test("test empty list", () => {
            const options = [];
            filterOptionsItems(options, (o) => o.label == "abc");
            expect(options).toEqual([]);
        });

        test("test filter single value", () => {
            const length = options.length;
            filterOptionsItems(options, (o) => o.label != "#FFFFFF");
            expect(options).toHaveLength(length);
            expect(options[0].options[2]).toEqual({
                label: "#FFFFFF",
                value: "#FFFFFF",
                hidden: false,
            });

            expect(options[0].options.filter((o) => !o.hidden)).toHaveLength(1);
        });

        test("test filter multiple value", () => {
            const length = options.length;
            filterOptionsItems(options, (o) => o.label.startsWith("#"));
            expect(options).toHaveLength(length);
            expect(options.every((o) => o.hidden)).toBeFalsy();
            expect(options[0].options.every((o) => o.hidden)).toBeTruthy();
        });

        test("test filter by invalid value", () => {
            const length = options.length;
            filterOptionsItems(options, (o) => o.label != "abc");
            expect(options).toHaveLength(length);
            expect(options.every((o) => o.hidden)).toBeTruthy();
            expect(options[0].options.every((o) => o.hidden)).toBeTruthy();
        });

        test("test filter with custom function", () => {
            const length = options.length;
            filterOptionsItems(options, (option) =>
                String(option).includes("#FFFFFF"),
            );
            expect(options).toHaveLength(length);
            expect(options[0].options[2]).toEqual({
                label: "#FFFFFF",
                value: "#FFFFFF",
                hidden: false,
            });
            expect(options[1].options.filter((o) => !o.hidden)).toHaveLength(1);
        });
    });

    describe("test checkOptionsEmpty", () => {
        test("test empty list", () => {
            const isEmpty = checkOptionsEmpty([]);
            expect(isEmpty).toBeTruthy();
        });

        test("test list with hidden option", () => {
            const options: OptionsGroupItem[] = [
                {
                    group: "foo",
                    hidden: true,
                    options: [
                        {
                            label: "#ff985d",
                            value: "#ff985d",
                            hidden: true,
                        },
                        {
                            label: "#f7ce68",
                            value: "#f7ce68",
                            hidden: true,
                        },
                        {
                            label: "#FFFFFF",
                            value: "#FFFFFF",
                            hidden: true,
                        },
                        {
                            label: "#2b2b35",
                            value: "#2b2b35",
                            hidden: true,
                        },
                    ],
                },
                {
                    group: "Other",
                    hidden: true,
                    options: [
                        {
                            label: "Red",
                            value: "#ff0000",
                            hidden: true,
                        },
                    ],
                },
            ];

            const isEmpty = checkOptionsEmpty(options);
            expect(isEmpty).toBeTruthy();
        });

        test("test list without hidden options", () => {
            const options = [
                {
                    label: "#ff985d",
                    value: "#ff985d",
                },
                {
                    label: "#f7ce68",
                    value: "#f7ce68",
                },
                {
                    label: "#FFFFFF",
                    value: "#FFFFFF",
                },
                {
                    label: "#2b2b35",
                    value: "#2b2b35",
                },
            ];

            const isEmpty = checkOptionsEmpty(options);
            expect(isEmpty).toBeFalsy();
        });

        test("test list with and without hidden options", () => {
            const options: OptionsGroupItem[] = [
                {
                    group: "foo",
                    options: [
                        {
                            label: "#ff985d",
                            value: "#ff985d",
                        },
                        {
                            label: "#f7ce68",
                            value: "#f7ce68",
                        },
                        {
                            label: "#FFFFFF",
                            value: "#FFFFFF",
                        },
                        {
                            label: "#2b2b35",
                            value: "#2b2b35",
                        },
                    ],
                },
                {
                    group: "Other",
                    hidden: true,
                    options: [
                        {
                            label: "Red",
                            value: "#ff0000",
                            hidden: true,
                        },
                    ],
                },
            ];

            const isEmpty = checkOptionsEmpty(options);
            expect(isEmpty).toBeFalsy();
        });
    });

    describe("test findOption", () => {
        test("test empty list", () => {
            const foundOption = findOption([], "abc");
            expect(foundOption).toBeUndefined();
        });

        test("test filter by valid value", () => {
            const options = [
                {
                    label: "#ff985d",
                    value: "#ff985d",
                },
                {
                    label: "#f7ce68",
                    value: "#f7ce68",
                },
                {
                    label: "#FFFFFF",
                    value: "#FFFFFF",
                },
                {
                    label: "#2b2b35",
                    value: "#2b2b35",
                },
            ];

            const foundOption = findOption(options, "#FFFFFF");
            expect(foundOption).toStrictEqual({
                label: "#FFFFFF",
                value: "#FFFFFF",
            });
        });

        test("test filter by invalid value", () => {
            const options = [
                {
                    label: "#ff985d",
                    value: "#ff985d",
                },
                {
                    label: "#f7ce68",
                    value: "#f7ce68",
                },
                {
                    label: "#FFFFFF",
                    value: "#FFFFFF",
                },
                {
                    label: "#2b2b35",
                    value: "#2b2b35",
                },
            ];

            const foundOption = findOption(options, "#abc");
            expect(foundOption).toBeUndefined();
        });

        test("test group options filter by valid value", () => {
            const options: OptionsGroupItem[] = [
                {
                    group: "foo",
                    options: [
                        {
                            label: "#ff985d",
                            value: "#ff985d",
                        },
                        {
                            label: "#f7ce68",
                            value: "#f7ce68",
                        },
                        {
                            label: "#FFFFFF",
                            value: "#FFFFFF",
                        },
                        {
                            label: "#2b2b35",
                            value: "#2b2b35",
                        },
                    ],
                },
                {
                    group: "Other",
                    hidden: true,
                    options: [
                        {
                            label: "Red",
                            value: "#ff0000",
                            hidden: true,
                        },
                    ],
                },
            ];

            const foundOption = findOption(options, "#FFFFFF");
            expect(foundOption).toStrictEqual({
                label: "#FFFFFF",
                value: "#FFFFFF",
            });
        });

        test("test group options filter by invalid value", () => {
            const options: OptionsGroupItem[] = [
                {
                    group: "foo",
                    options: [
                        {
                            label: "#ff985d",
                            value: "#ff985d",
                        },
                        {
                            label: "#f7ce68",
                            value: "#f7ce68",
                        },
                        {
                            label: "#FFFFFF",
                            value: "#FFFFFF",
                        },
                        {
                            label: "#2b2b35",
                            value: "#2b2b35",
                        },
                    ],
                },
                {
                    group: "Other",
                    hidden: true,
                    options: [
                        {
                            label: "Red",
                            value: "#ff0000",
                            hidden: true,
                        },
                    ],
                },
            ];

            const foundOption = findOption(options, "#abc");
            expect(foundOption).toBeUndefined();
        });
    });

    describe("test firstValidOption", () => {
        test("test empty list", () => {
            const foundOption = firstViableOption([]);
            expect(foundOption).toBeUndefined();
        });

        test("test list with hidden option", () => {
            const options = [
                {
                    label: "#ff985d",
                    value: "#ff985d",
                    hidden: true,
                },
                {
                    label: "#f7ce68",
                    value: "#f7ce68",
                    hidden: true,
                },
                {
                    label: "#FFFFFF",
                    value: "#FFFFFF",
                },
                {
                    label: "#2b2b35",
                    value: "#2b2b35",
                },
            ];
            const foundOption = firstViableOption(options);
            expect(foundOption).toStrictEqual({
                label: "#FFFFFF",
                value: "#FFFFFF",
            });
        });

        test("test list without hidden options", () => {
            const options: OptionsGroupItem[] = [
                {
                    group: "foo",
                    options: [
                        {
                            label: "#ff985d",
                            value: "#ff985d",
                        },
                        {
                            label: "#f7ce68",
                            value: "#f7ce68",
                        },
                        {
                            label: "#FFFFFF",
                            value: "#FFFFFF",
                        },
                        {
                            label: "#2b2b35",
                            value: "#2b2b35",
                        },
                    ],
                },
                {
                    group: "Other",
                    hidden: true,
                    options: [
                        {
                            label: "Red",
                            value: "#ff0000",
                            hidden: true,
                        },
                    ],
                },
            ];

            const foundOption = firstViableOption(options);
            expect(foundOption).toStrictEqual({
                label: "#ff985d",
                value: "#ff985d",
            });
        });

        test("test list with and without hidden options", () => {
            const options: OptionsGroupItem[] = [
                {
                    group: "foo",
                    hidden: true,
                    options: [
                        {
                            label: "#ff985d",
                            value: "#ff985d",
                            hidden: true,
                        },
                        {
                            label: "#f7ce68",
                            value: "#f7ce68",
                            hidden: true,
                        },
                        {
                            label: "#FFFFFF",
                            value: "#FFFFFF",
                            hidden: true,
                        },
                        {
                            label: "#2b2b35",
                            value: "#2b2b35",
                            hidden: true,
                        },
                    ],
                },
                {
                    group: "Other",
                    options: [
                        {
                            label: "Red",
                            value: "#ff0000",
                        },
                    ],
                },
            ];

            const foundOption = firstViableOption(options);
            expect(foundOption).toStrictEqual({
                label: "Red",
                value: "#ff0000",
            });
        });
    });

    describe("test isOptionValid", () => {
        test("test valid option", () => {
            const option = {
                label: "#ff985d",
                value: "#ff985d",
            };

            const isValid = isOptionViable(option);
            expect(isValid).toBeTruthy();
        });

        test("test invalid option", () => {
            const option = {
                label: "#ff985d",
                value: "#ff985d",
                hidden: true,
            };

            const isValid = isOptionViable(option);
            expect(isValid).toBeFalsy();
        });

        test("test invalid option with disabled", () => {
            const option = {
                label: "#ff985d",
                value: "#ff985d",
                attrs: { disabled: true },
            };

            const isValid = isOptionViable(option);
            expect(isValid).toBeFalsy();
        });
    });
});
