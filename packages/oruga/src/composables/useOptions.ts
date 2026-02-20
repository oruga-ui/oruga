import { toValue, type MaybeRefOrGetter } from "vue";
import { isEqual } from "@/utils/helpers";
import { type Indexer } from "./useIndexer";

//  --- PUBLIC API ---

/**
 * An real option item object which get passed by an options property.
 *
 * @public
 */
export type Option<T extends object> = {} & T & Record<string, any>;

/**
 * Simplified types of options that can be passed to the options prop.
 *
 * @public
 */
export type SimpleOptions =
    | (string | number)[]
    | Record<string | number, string>;

/**
 * The types of options that can be passed to the options prop.
 *
 * @public
 */
export type OptionsProp<T extends object = object> =
    | SimpleOptions
    | Option<T>[];

/**
 * Option groups should always be formatted as an array of group objects with nested options.
 *
 * @public
 */
export type OptionsGroupsProp<T extends object = object> = {
    /** displayed option group label */
    label: string;
    /** list of options */
    options: OptionsProp<T>;
    /** additional attributes bound to the options group element */
    attrs?: Record<string, any>;
}[];

/**
 * A list of options that can either be a list of option items or a list of group items.
 *
 * @public
 */
export type OptionsOrGroupsProp<T extends object = object> =
    | OptionsProp<T>
    | OptionsGroupsProp<T>;

//  --- INTERNAL API ---

/**
 * Internal option item representation wrapper with additional information.
 * @internal
 */
export type OptionItem<T extends object> = {
    /** internal genereated uniqe option key */
    key: string;
    /** the option item object */
    item: Option<T>;
};

/**
 * Internal option group item representation wrapper with additional information.
 * @internal
 */
export type OptionGroupItem<T extends object> = {
    /** internal genereated uniqe option key */
    key: string;
    /** displayed option group label */
    label: string;
    /** additional attributes bound to the options group element */
    attrs?: Record<string, any>;
    /** list of options */
    options: OptionItem<T>[];
};

// ------------------

type SimpleOption = { label: string; value: string | number };

type NormalizedOption<T extends object> = OptionItem<T>;

type NormalizedGroup<T extends object> = Omit<OptionGroupItem<T>, "options"> & {
    options: NormalizedOption<T>[];
};

type NormalizedItem<T extends object = any> =
    | NormalizedOption<T>
    | NormalizedGroup<T>;

/**
 * A function to normalize an array of objects, array of strings, or object of
 * key-value pairs to an array of internal option items.
 *
 * @param options - An un-normalized array of options.
 * @param indexer - An indexer to generate unique keys for each option.
 * @returns A list of normalized option items.
 */
export function normalizeOptions<T extends object>(
    options: OptionsProp<T> | undefined,
    indexer: Indexer,
    groupable?: false,
): NormalizedOption<T>[];
export function normalizeOptions<T extends object>(
    options: OptionsOrGroupsProp<T> | undefined,
    indexer: Indexer,
    groupable: boolean,
): NormalizedItem<T>[];
export function normalizeOptions<T extends object>(
    options: OptionsProp<T> | OptionsGroupsProp<T> | undefined,
    indexer: Indexer,
    groupable: boolean = false,
): NormalizedItem<T>[] {
    if (!options) return [] as NormalizedOption<T>[];

    if (Array.isArray(options)) {
        return options.map(
            (
                option:
                    | (string | number)
                    | Option<T>
                    | OptionsGroupsProp<T>[number],
            ) => {
                if (typeof option === "string" || typeof option === "number")
                    // create options item from primitive
                    return {
                        item: {
                            label: String(option),
                            value: option,
                        },
                        key: indexer.nextIndex(),
                    } satisfies NormalizedOption<SimpleOption>;

                if (groupable && "options" in option) {
                    const key = indexer.nextIndex();
                    const options = normalizeOptions(
                        option.options,
                        indexer,
                    ) as NormalizedOption<T>[];

                    // create options group item
                    return {
                        label: option.label,
                        attrs: option.attrs,
                        options,
                        key,
                    } satisfies NormalizedGroup<T>;
                }

                // create options item
                return {
                    item: toValue(option),
                    key: indexer.nextIndex(),
                };
            },
        ) as NormalizedItem<T>[];
    }

    // options are from type SimpleOption and is an object
    return Object.keys(options).map(
        (value: string | number) =>
            ({
                // create option from object key/value
                item: {
                    label: options[value],
                    value,
                },
                key: indexer.nextIndex(),
            }) satisfies NormalizedOption<SimpleOption>,
    ) as unknown as NormalizedOption<T>[];
}

/**
 * Checks if the given normalized option item is an option group or not.
 *
 * @param options - An option item to check.
 * @returns True if the option is a group; otherwise, false.
 */
export function isGroupOption<T extends object>(
    option: NormalizedItem<T>,
): option is NormalizedGroup<T> {
    return "options" in option;
}

/**
 * Determines if a normalized options list contains groups or not.
 *
 * @param options - An array of individual options or grouped options.
 * @returns True if the options are grouped; otherwise, false.
 */
export function areOptionsGrouped(
    options: MaybeRefOrGetter<NormalizedItem[]>,
): boolean {
    const _options = toValue(options);
    if (!_options?.length) return false;
    return isGroupOption(_options[0]);
}

/**
 * Recursively finds the index of a specific option within a flat or grouped options array.
 * It traverses the structure and returns the index of the target option as if all options were flattened.
 *
 * @param options - A list of options, which may be a flat array or an array of grouped options.
 * @param option - The option to find within the options list.
 * @returns The index of the option if found; otherwise, -1.
 */
export function findOptionIndex<T extends object>(
    options: MaybeRefOrGetter<NormalizedItem<T>[]>,
    option: MaybeRefOrGetter<NormalizedOption<T>>,
): number {
    if (!Array.isArray(toValue(options))) return -1;
    const optionItem = toValue(option).item;

    let idx = 0;
    for (const item of toValue(options)) {
        if (typeof item !== "object" && item) continue;

        // check if the first item has an options propery which defines it as group
        if (isGroupOption(item)) {
            // check options in group options
            const groupIdx = findOptionIndex(item.options, option);
            // increase full group options length when not found
            if (groupIdx === -1) idx += item.options.length;
            else {
                // increase found index of group options
                idx += groupIdx;
                return idx;
            }
        }
        // check if option is searched option
        else if (isEqual(item.item, optionItem)) return idx;
        // else increase search indx
        else idx += 1;
    }

    // not matching option found
    return -1;
}

/**
 * Recursively calculates the total number of options from a list of options or grouped options.
 *
 * @param options - An array of individual options or grouped options.
 * @returns The total count of individual options, including those nested within groups.
 */
export function getOptionsLength<T extends object>(
    options: MaybeRefOrGetter<NormalizedItem<T>[]>,
): number {
    if (!Array.isArray(toValue(options))) return 0;

    return toValue(options).reduce((length, item) => {
        if (item && typeof item !== "object") return length;
        if (isGroupOption(item)) {
            return length + getOptionsLength(item.options);
        }
        return length + 1;
    }, 0);
}
