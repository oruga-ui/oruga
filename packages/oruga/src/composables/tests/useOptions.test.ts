import { describe, test, beforeEach, expect } from "vitest";
import {
    checkOptionsEmpty,
    filterOptionsItems,
    findOption,
    firstValidOption,
    isGroupOption,
    isOptionValid,
    normalizeOptions,
    toOptionsGroup,
    toOptionsList,
    type OptionsGroupItem,
} from "../useOptions";
import { useSequentialId } from "../useSequentialId";

describe("useOptions tests", () => {
    let isSecuencer: ReturnType<typeof useSequentialId>;

    beforeEach(() => {
        isSecuencer = useSequentialId();
    });

    describe("test normalizeOptions", () => {
        test("test empty list", () => {
            const normOptions = normalizeOptions([], isSecuencer.nextSequence);
            expect(normOptions).toEqual([]);
        });

        test("test options object", () => {
            const options = { foo: "bar", a: "b" };
            const normOptions = normalizeOptions(
                options,
                isSecuencer.nextSequence,
            );

            expect(normOptions).toEqual([
                {
                    key: "0",
                    label: "bar",
                    value: "foo",
                },
                {
                    key: "1",
                    label: "b",
                    value: "a",
                },
            ]);
        });

        test("test options array of strings", () => {
            const options = ["foo", "bar"];
            const normOptions = normalizeOptions(
                options,
                isSecuencer.nextSequence,
            );

            expect(normOptions).toEqual([
                {
                    key: "0",
                    label: "foo",
                    value: "foo",
                },
                {
                    key: "1",
                    label: "bar",
                    value: "bar",
                },
            ]);
        });

        test("test options array of objects", () => {
            const options = [
                { label: "foo", value: "bar" },
                { label: "a", value: "b" },
            ];
            const normOptions = normalizeOptions(
                options,
                isSecuencer.nextSequence,
            );

            expect(normOptions).toEqual([
                {
                    key: "0",
                    label: "foo",
                    value: "bar",
                },
                {
                    key: "1",
                    label: "a",
                    value: "b",
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

            const normOptions = normalizeOptions(
                options,
                isSecuencer.nextSequence,
            );

            expect(normOptions).toEqual([
                {
                    key: "4",
                    group: "foo",
                    options: [
                        { key: "0", label: "#ff985d", value: "#ff985d" },
                        { key: "1", label: "#f7ce68", value: "#f7ce68" },
                        { key: "2", label: "#FFFFFF", value: "#FFFFFF" },
                        { key: "3", label: "#2b2b35", value: "#2b2b35" },
                    ],
                },
                {
                    key: "6",
                    group: "Other",
                    options: [{ key: "5", label: "Red", value: "#ff0000" }],
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

            const normOptions = normalizeOptions(
                options,
                isSecuencer.nextSequence,
            );
            expect(normOptions).toEqual([
                {
                    key: "2",
                    group: "Foo",
                    options: [
                        { key: "0", label: "A", value: 0 },
                        { key: "1", label: "B", value: 1 },
                    ],
                },
                {
                    key: "5",
                    group: "Bar",
                    options: [
                        { key: "3", label: "D", value: 3 },
                        { key: "4", label: "E", value: 4 },
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
            const groupOptions = toOptionsGroup([], "0");
            expect(groupOptions).toEqual([{ key: "0", options: [] }]);
        });

        test("test is normal options", () => {
            const options = [
                {
                    key: "0",
                    label: "foo",
                    value: "bar",
                },
                {
                    key: "1",
                    label: "a",
                    value: "b",
                },
            ];

            const groupOptions = toOptionsGroup(options, "3");
            expect(groupOptions).toEqual([
                {
                    key: "3",
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

            const groupOptions = toOptionsGroup(options, "22");
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
            const filteredOptions = filterOptionsItems([], "abc");
            expect(filteredOptions).toEqual([]);
        });

        test("test filter single value", () => {
            const filteredOptions = filterOptionsItems(options, "#FFFFFF");
            expect(filteredOptions).toHaveLength(options.length);
            expect(filteredOptions[0].options[2]).toEqual({
                label: "#FFFFFF",
                value: "#FFFFFF",
                hidden: false,
            });

            expect(
                filteredOptions[0].options.filter((o) => !o.hidden),
            ).toHaveLength(1);
        });

        test("test filter multiple value", () => {
            const filteredOptions = filterOptionsItems(options, "#");
            expect(filteredOptions).toHaveLength(options.length);
            expect(filteredOptions.every((o) => o.hidden)).toBeFalsy();
            expect(
                filteredOptions[0].options.every((o) => !o.hidden),
            ).toBeTruthy();
        });

        test("test filter by invalid value", () => {
            const filteredOptions = filterOptionsItems(options, "abc");
            expect(filteredOptions).toHaveLength(options.length);
            expect(filteredOptions.every((o) => o.hidden)).toBeTruthy();
            expect(
                filteredOptions[0].options.every((o) => o.hidden),
            ).toBeTruthy();
        });

        test("test filter with custom function", () => {
            const filteredOptions = filterOptionsItems(
                options,
                "FFFFFF",
                (option, filter) => {
                    return !String(option).includes("#" + filter);
                },
            );
            expect(filteredOptions).toHaveLength(options.length);
            expect(filteredOptions[0].options[2]).toEqual({
                label: "#FFFFFF",
                value: "#FFFFFF",
                hidden: false,
            });

            expect(
                filteredOptions[0].options.filter((o) => !o.hidden),
            ).toHaveLength(1);
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
            const foundOption = firstValidOption([]);
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
            const foundOption = firstValidOption(options);
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

            const foundOption = firstValidOption(options);
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

            const foundOption = firstValidOption(options);
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

            const isValid = isOptionValid(option);
            expect(isValid).toBeTruthy();
        });

        test("test invalid option", () => {
            const option = {
                label: "#ff985d",
                value: "#ff985d",
                hidden: true,
            };

            const isValid = isOptionValid(option);
            expect(isValid).toBeFalsy();
        });

        test("test invalid option with disabled", () => {
            const option = {
                label: "#ff985d",
                value: "#ff985d",
                attrs: { disabled: true },
            };

            const isValid = isOptionValid(option);
            expect(isValid).toBeFalsy();
        });
    });
});
