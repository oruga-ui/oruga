import { toValue, type MaybeRefOrGetter } from "vue";
import { isEqual } from "@/utils/helpers";
import { useIndexer, type Indexer } from "./useIndexer";

/** @internal */
export type OptionItem<T extends object> = Omit<T, "hidden" | "key">;

/** @internal */
export type Option<T extends object> = {
    /** internal definiton if the element should be hidden */
    hidden: boolean;
    /** internal genereated uniqe option key */
    key: string;
    /** the option item object */
    item: OptionItem<T>;
};

/** @internal */
export type OptionGroup<T extends object> = {
    /** internal definiton if the element should be hidden */
    hidden: boolean;
    /** internal genereated uniqe option key */
    key: string;
    /** displayed option group label */
    label?: string;
    /** additional attributes bound to the options group element */
    attrs?: Record<string, any>;
    /** list of options */
    options: Option<T>[];
};

//  ---------------------

export type SimpleOptions =
    | (string | number)[]
    | Record<string | number, string>;

/**
 * The types of options that can be passed to the options prop.
 *
 * @public
 */
export type OptionsProp<T extends object = object> =
    | OptionItem<T>[]
    | SimpleOptions;

/**
 * Option groups should always be formatted as an array of group objects with nested options.
 *
 * @public
 */
export type OptionsGroupsProp<T extends object = object> = {
    /** displayed option group label */
    label?: string;
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

// ------------------

type SimpleOption = { label: string; value: string };

type NormalizedOption<T extends object> = Option<T> & { isGroup: false };

type NormalizedGroup<T extends object> = Omit<OptionGroup<T>, "options"> & {
    isGroup: true;
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
    options: OptionsGroupsProp<T> | undefined,
    indexer?: Indexer,
): NormalizedGroup<T>[];
export function normalizeOptions<T extends object>(
    options: OptionsProp<T> | undefined,
    indexer?: Indexer,
): NormalizedOption<T>[];
export function normalizeOptions<T extends object>(
    options: OptionsOrGroupsProp<T> | undefined,
    indexer?: Indexer,
): NormalizedItem<T>[];
export function normalizeOptions<T extends object>(
    options: OptionsProp<T> | OptionsGroupsProp<T> | undefined,
    indexer: Indexer = useIndexer(),
): NormalizedItem<T>[] {
    if (!options) return [] as NormalizedItem<T>[];

    if (Array.isArray(options)) {
        return options.map(
            (
                option:
                    | OptionItem<T>
                    | OptionsGroupsProp<T>[number]
                    | (string | number),
            ) => {
                if (typeof option === "string" || typeof option === "number")
                    // create options item from primitive
                    return {
                        isGroup: false,
                        item: {
                            label: String(option),
                            value: String(option),
                        },
                        key: indexer.nextIndex(),
                        hidden: false,
                    } satisfies NormalizedOption<SimpleOption>;

                if (typeof option == "object") {
                    if ("options" in option) {
                        const options = normalizeOptions(
                            option.options,
                            indexer,
                        ) as NormalizedOption<T>[];

                        // create options group item
                        return {
                            isGroup: true,
                            label: option.label,
                            attrs: option.attrs,
                            options,
                            key: indexer.nextIndex(),
                            hidden: false,
                        } satisfies NormalizedGroup<T>;
                    } else {
                        // create options item
                        return {
                            isGroup: false,
                            item: option,
                            key: indexer.nextIndex(),
                            hidden: false,
                        } satisfies NormalizedOption<T>;
                    }
                }
            },
        ) as NormalizedItem<T>[];
    }

    return Object.keys(options).map(
        (value: string) =>
            ({
                isGroup: false,
                // create option from object key/value
                item: {
                    label: options[value],
                    value,
                },
                key: indexer.nextIndex(),
                hidden: false,
            }) satisfies NormalizedOption<SimpleOption>,
    ) as unknown as NormalizedItem<T>[];
}

// /**
//  * Converts a flat list of options into a grouped options structure.
//  *
//  * If the input already contains grouped options, it returns a shallow copy.
//  * Otherwise, it wraps the flat list in a single group using the provided key.
//  *
//  * @param {OptionItem<V>[] | OptionsGroupItem<V>[]} options
//  *   The list of options, which may be flat or already grouped.
//  * @param {string} key
//  *   The key to assign to the group if grouping is needed.
//  * @returns {OptionsGroupItem<V>[]}
//  *   A grouped options array.
//  *
//  * @deprecated not useable anymore
//  */
// export function toOptionGroup<T extends Object>(
//     options: OptionOrGroupProp<T>,
//     key: string,
// ): OptionGroup<T>[] {
//     if (!Array.isArray(options)) return [];

//     const isGroup = options.some((option) => isGroupOption(option));

//     // if options are already a list options do nothing
//     if (isGroup) return [...options] as OptionGroup<T>[];

//     // create a list with a single group
//     return [{ options, hidden: false, key }] as OptionGroup<T>[];
// }

// /**
//  * Flattens a list of grouped options into a single list of options.
//  *
//  * This function extracts all `OptionsProp` entries from an array of `OptionGroup` objects,
//  * effectively removing the grouping structure.
//  *
//  * @param options - The grouped options to flatten.
//  * @returns A flat array containing all options from all groups.
//  */
// export function toOptionsList<T extends Object>(
//     options: MaybeRefOrGetter<OptionGroup<T>[]>,
// ): Option<T>[] {
//     if (!Array.isArray(toValue(options))) return [];

//     return toValue(options).reduce((list, group) => {
//         list.push(...group.options);
//         return list;
//     }, [] as Option<T>[]);
// }

// /**
//  * Applies a filter function to a list of options or grouped options, updating their visibility.
//  *
//  * The function recursively traverses the options and sets the `hidden` property based on the filter result.
//  * For grouped options, the group is hidden if all its child options are hidden.
//  *
//  * @param {MaybeRefOrGetter<OptionItem<V>[] | OptionsGroupItem<V>[]>} options
//  *   The list of options to filter, which may include grouped options.
//  * @param {(option: OptionItem<V>, index: number) => boolean} filter
//  *   A predicate function that determines whether an option should be hidden.
//  * @returns {void}
//  *
//  * @deprecated not useable anymore
//  */
// export function filterOptionsItems<V>(
//     options: MaybeRefOrGetter<OptionItem<V>[] | OptionsGroupItem<V>[]>,
//     filter: (option: OptionItem<V>, index: number) => boolean,
// ): void {
//     toValue(options).forEach(
//         (option: OptionItem<V> | OptionsGroupItem<V>, idx: number) => {
//             if (isGroupOption(option)) {
//                 filterOptionsItems(option.options, filter);
//                 // hide the whole group if every group options is hidden
//                 option.hidden = option.options.every((option) => option.hidden);
//             } else {
//                 // hide the option if filtered
//                 option.hidden = filter(option, idx);
//             }
//         },
//     );
// }

// /**
//  * Determines whether a list of options or grouped options is effectively empty.
//  *
//  * An options list is considered empty if all options are either hidden or disabled.
//  * The function supports both flat and grouped option structures and performs a recursive check.
//  *
//  * @param {MaybeRefOrGetter<OptionItem[] | OptionsGroupItem[]>} options
//  *   The list of options to evaluate.
//  * @returns {boolean}
//  *   Returns true if all options are non-viable (hidden or disabled); otherwise, false.
//  */
// export function checkOptionsEmpty(
//     options: MaybeRefOrGetter<OptionItem[] | OptionsGroupItem[]>,
// ): boolean {
//     // check if options are empty
//     if (!Array.isArray(toValue(options))) return true;

//     return toValue(options).every((option: OptionItem | OptionsGroupItem) => {
//         if (isGroupOption(option))
//             // check if every options are hidden
//             return checkOptionsEmpty(option.options);
//         // check if option is hidden
//         else return !isOptionViable(option);
//     });
// }

// /**
//  * Recursively searches for an option with a specific value in a list of options or grouped options.
//  *
//  * The function supports both flat and grouped option structures. It compares values using deep equality.
//  *
//  * @param {MaybeRefOrGetter<OptionItem<V>[]> | MaybeRefOrGetter<OptionsGroupItem<V>[]>} options
//  *   The list of options, which may include grouped options.
//  * @param {MaybeRefOrGetter<V>} value
//  *   The value to search for within the options.
//  * @returns {OptionItem<V> | undefined}
//  *   The matching option if found; otherwise, undefined.
//  */
// export function findOption<V>(
//     options:
//         | MaybeRefOrGetter<OptionItem<V>[]>
//         | MaybeRefOrGetter<OptionsGroupItem<V>[]>,
//     value: MaybeRefOrGetter<V>,
// ): OptionItem<V> | undefined {
//     if (!Array.isArray(toValue(options))) return undefined;

//     for (const option of toValue(options)) {
//         if (typeof option !== "object" && option) continue;
//         if (isGroupOption(option)) {
//             // option in group
//             const found = findOption(option.options, value);
//             if (found !== undefined) return found;
//         }
//         // check if option has value
//         else if (isEqual(toValue(value), option.value)) return option;
//     }

//     return undefined;
// }

// /**
//  * Recursively finds the first viable option from a list of options or grouped options.
//  *
//  * A viable option is one that is not hidden and not disabled. The function supports both flat and grouped option structures.
//  *
//  * @param {MaybeRefOrGetter<OptionItem<V>[]> | MaybeRefOrGetter<OptionsGroupItem<V>[]>} options
//  *   The list of options, which may include grouped options.
//  * @returns {OptionItem<V> | undefined}
//  *   The first viable option found, or undefined if none are viable.
//  *
//  * @deprecated not used!
//  */
// export function firstViableOption<V>(
//     options:
//         | MaybeRefOrGetter<OptionItem<V>[]>
//         | MaybeRefOrGetter<OptionsGroupItem<V>[]>,
// ): OptionItem<V> | undefined {
//     if (!Array.isArray(toValue(options))) return undefined;

//     for (const option of toValue(options)) {
//         if (typeof option !== "object" && option) continue;
//         if (isGroupOption(option)) {
//             // option in group
//             const found = firstViableOption(option.options);
//             if (found !== undefined) return found;
//         }
//         // check if option is viable
//         else if (isOptionViable(option)) return option;
//     }

//     return undefined;
// }

// /**
//  * Determines whether an option is viable for selection or display.
//  *
//  * An option is considered viable if it is not marked as hidden and is not disabled via its attributes.
//  *
//  * @param {MaybeRefOrGetter<OptionItem>} option
//  *   The option to evaluate.
//  * @returns {boolean}
//  *   Returns true if the option is not hidden and not disabled; otherwise, false.
//  *
//  * @deprecated not used!
//  */
// export function isOptionViable(option: MaybeRefOrGetter<OptionItem>): boolean {
//     return !toValue(option).hidden && !toValue(option).attrs?.disabled;
// }

// /**
//  * Determines whether a given option matches a search value.
//  *
//  * The match is case-insensitive and checks if the option's label starts with the provided value.
//  * Only viable options are considered for matching.
//  *
//  * @param {MaybeRefOrGetter<OptionItem>} option
//  *   The option to check against the search value.
//  * @param {MaybeRefOrGetter<string>} value
//  *   The search value to match against the option's label.
//  * @returns {boolean}
//  *   Returns true if the option is viable and its label starts with the search value; otherwise, false.
//  *
//  * @deprecated not used!
//  */
// export function isOptionMatched(
//     option: MaybeRefOrGetter<OptionItem>,
//     value: MaybeRefOrGetter<string>,
// ): boolean {
//     return (
//         isOptionViable(option) &&
//         toValue(option)
//             .label?.toLowerCase()
//             .startsWith(toValue(value).toLowerCase())
//     );
// }

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
        if ("isGroup" in item && item.isGroup) {
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
        if ("isGroup" in item && item.isGroup) {
            return length + getOptionsLength(item.options);
        }
        return length + 1;
    }, 0);
}

/**
 * Determines if a normalized options list contains groups or not.
 * @param options - An array of individual options or grouped options.
 * @returns True if the options are grouped; otherwise, false.
 */
export function areOptionsGrouped(
    options: MaybeRefOrGetter<NormalizedItem[]>,
): boolean {
    const _options = toValue(options);
    if (!_options?.length) return false;
    return _options[0].isGroup;
}
