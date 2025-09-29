import { toValue, type MaybeRefOrGetter } from "vue";
import { isEqual } from "@/utils/helpers";

/**
 * Internal OptionsItem representation object with additional state information.
 *
 * @internal
 */
export type OptionsItem<V = unknown> = OptionsPropItem<V> & {
    /** internal definiton if the element should be hidden */
    hidden?: boolean;
    /** internal genereated uniqe option key */
    key?: string;
};

/**
 * Options should always be formatted as an array of objects with label and value properties.
 *
 * @public
 */
export type OptionsPropItem<V = unknown> = {
    /** displayed option label */
    label: string;
    /** the real option value */
    value: V;
    /** additional attributes bound to the option element */
    attrs?: {
        disabled?: boolean;
    } & Record<string, any>;
    [index: string]: any;
};

export type SimpleOptionsProp =
    | (string | number)[]
    | Omit<OptionsPropItem<never>, "value">[];

/**
 * The types of options that can be passed to the options prop.
 *
 * @public
 */
export type OptionsProp<V = string | number | object> =
    | (string | number)[]
    | Record<string | number, string>
    | OptionsPropItem<V>[];

/**
 * Option groups should always be formatted as an array of objects with group and nested options.
 *
 * @internal
 */
export type OptionsGroupItem<V = unknown> = {
    /** displayed option group label */
    label?: string;
    /** the real option group value */
    value?: V;
    /** list of options */
    options: OptionsItem<V>[];
    /** additional attributes bound to the options grouü element */
    attrs?: Record<string, any>;
    /** internal definiton if the element should be hidden */
    hidden?: boolean;
    /** internal genereated uniqe option key */
    key?: string;
};

/**
 * Option groups should always be formatted as an array of objects with group and nested options.
 *
 * @public
 */
export type OptionsGroupPropItem<V = unknown> = {
    /** displayed option group label */
    label?: string;
    /** the real option group value */
    value?: V;
    /** list of options */
    options: OptionsProp<V>;
    /** additional attributes bound to the options grouü element */
    attrs?: Record<string, any>;
};

/**
 * An array of option items with a group support — where the `option` of the
 * groups can be any valid OptionsProp type.
 *
 * @public
 */
export type OptionsGroupProp<V = string | number | object> =
    OptionsGroupPropItem<V>[];

/**
 * The types of options that can be passed to the options prop.
 * An array of option items with a group support — where the `option` of the
 * groups can be any valid OptionsProp type.
 *
 * @public
 */
export type OptionsPropWithGroups<V = unknown> =
    | OptionsProp<V>
    | OptionsGroupProp<V>;

/** Normalized external options prop for internal usage */
type NormalizedOptions<
    V,
    O extends OptionsPropWithGroups<V> | SimpleOptionsProp | undefined,
> =
    O extends OptionsGroupProp<V>
        ? OptionsGroupItem<V>[]
        : O extends OptionsProp<V>
          ? OptionsItem<V>[]
          : O extends SimpleOptionsProp
            ? OptionsItem<never>[]
            : never[];

/**
 * A function to normalize an array of objects, array of strings, or object of
 * key-values to use an array of objects with value and label properties.
 *
 * @param options - An un-normalized {@link OptionsPropWithGroups}.
 *
 * @returns A list of {@link OptionsItem} | {@link OptionsGroupItem}.
 */
export function normalizeOptions<
    V,
    O extends
        | SimpleOptionsProp
        | OptionsPropWithGroups<V> = OptionsPropWithGroups<V>,
>(options: O | undefined, uuid: () => string): NormalizedOptions<V, O> {
    if (!options) return [] as NormalizedOptions<V, O>;

    if (Array.isArray(options))
        return options.map(
            (option: O[number]): OptionsItem | OptionsGroupItem => {
                if (typeof option === "string" || typeof option === "number")
                    // create options item from primitive
                    return {
                        label: String(option),
                        value: String(option),
                        key: uuid(),
                    } as OptionsItem<V>;

                if (typeof option == "object") {
                    if ("options" in option) {
                        // process group options
                        const options = normalizeOptions(option.options, uuid);
                        // create options group item
                        return {
                            ...option,
                            options,
                            key: uuid(),
                        } as OptionsGroupItem<V>;
                    } else if ("value" in option) {
                        // create options item
                        return {
                            ...option,
                            key: uuid(),
                        } as OptionsItem<V>;
                    }
                }
                return option as OptionsItem<V>;
            },
        ) as NormalizedOptions<V, O>;

    return Object.keys(options).map(
        (value: string): OptionsItem<string> => ({
            // create option from object key/value
            label: options[value],
            value,
            key: uuid(),
        }),
    ) as NormalizedOptions<V, O>;
}

/**
 * Determines whether a given option is a group of options.
 *
 * A group option is identified by being an object that contains an `options` array attribute.
 *
 * @param {Partial<OptionsItem | OptionsGroupItem>} option
 *   The option to check.
 * @returns {option is OptionsGroupItem}
 *   Returns true if the option is a group option; otherwise, false.
 */
export function isGroupOption(
    option: Partial<OptionsItem | OptionsGroupItem>,
): option is OptionsGroupItem {
    return (
        option && typeof option === "object" && Array.isArray(option.options)
    );
}

/**
 * Converts a flat list of options into a grouped options structure.
 *
 * If the input already contains grouped options, it returns a shallow copy.
 * Otherwise, it wraps the flat list in a single group using the provided key.
 *
 * @template V
 * @param {OptionsItem<V>[] | OptionsGroupItem<V>[]} options
 *   The list of options, which may be flat or already grouped.
 * @param {string} key
 *   The key to assign to the group if grouping is needed.
 * @returns {OptionsGroupItem<V>[]}
 *   A grouped options array.
 */
export function toOptionsGroup<V>(
    options: OptionsItem<V>[] | OptionsGroupItem<V>[],
    key: string,
): OptionsGroupItem<V>[] {
    if (!Array.isArray(options)) return [];

    const isGroup = options.some((option) => isGroupOption(option));

    // if options are already a list options do nothing
    if (isGroup) return [...options] as OptionsGroupItem<V>[];

    // create a list with a single group
    return [{ options, key }] as OptionsGroupItem<V>[];
}

/**
 * Flattens a list of grouped options into a single list of options.
 *
 * This function extracts all `OptionsItem` entries from an array of `OptionsGroupItem` objects,
 * effectively removing the grouping structure.
 *
 * @param {MaybeRefOrGetter<OptionsGroupItem<V>[]>} options
 *   The grouped options to flatten.
 * @returns {OptionsItem<V>[]}
 *   A flat array containing all options from all groups.
 */
export function toOptionsList<V>(
    options: MaybeRefOrGetter<OptionsGroupItem<V>[]>,
): OptionsItem<V>[] {
    if (!Array.isArray(toValue(options))) return [];

    return toValue(options).reduce((list, group) => {
        list.push(...group.options);
        return list;
    }, [] as OptionsItem<V>[]);
}

/**
 * Applies a filter function to a list of options or grouped options, updating their visibility.
 *
 * The function recursively traverses the options and sets the `hidden` property based on the filter result.
 * For grouped options, the group is hidden if all its child options are hidden.
 *
 * @param {MaybeRefOrGetter<OptionsItem<V>[] | OptionsGroupItem<V>[]>} options
 *   The list of options to filter, which may include grouped options.
 * @param {(option: OptionsItem<V>, index: number) => boolean} filter
 *   A predicate function that determines whether an option should be hidden.
 * @returns {void}
 */
export function filterOptionsItems<V>(
    options: MaybeRefOrGetter<OptionsItem<V>[] | OptionsGroupItem<V>[]>,
    filter: (option: OptionsItem<V>, index: number) => boolean,
): void {
    toValue(options).forEach(
        (option: OptionsItem<V> | OptionsGroupItem<V>, idx: number) => {
            if (isGroupOption(option)) {
                filterOptionsItems(option.options, filter);
                // hide the whole group if every group options is hidden
                option.hidden = option.options.every((option) => option.hidden);
            } else {
                // hide the option if filtered
                option.hidden = filter(option, idx);
            }
        },
    );
}

/**
 * Determines whether a list of options or grouped options is effectively empty.
 *
 * An options list is considered empty if all options are either hidden or disabled.
 * The function supports both flat and grouped option structures and performs a recursive check.
 *
 * @param {MaybeRefOrGetter<OptionsItem[] | OptionsGroupItem[]>} options
 *   The list of options to evaluate.
 * @returns {boolean}
 *   Returns true if all options are non-viable (hidden or disabled); otherwise, false.
 */
export function checkOptionsEmpty(
    options: MaybeRefOrGetter<OptionsItem[] | OptionsGroupItem[]>,
): boolean {
    // check if options are empty
    if (!Array.isArray(toValue(options))) return true;

    return toValue(options).every((option: OptionsItem | OptionsGroupItem) => {
        if (isGroupOption(option))
            // check if every options are hidden
            return checkOptionsEmpty(option.options);
        // check if option is hidden
        else return !isOptionViable(option);
    });
}

/**
 * Recursively searches for an option with a specific value in a list of options or grouped options.
 *
 * The function supports both flat and grouped option structures. It compares values using deep equality.
 *
 * @param {MaybeRefOrGetter<OptionsItem<V>[]> | MaybeRefOrGetter<OptionsGroupItem<V>[]>} options
 *   The list of options, which may include grouped options.
 * @param {MaybeRefOrGetter<V>} value
 *   The value to search for within the options.
 * @returns {OptionsItem<V> | undefined}
 *   The matching option if found; otherwise, undefined.
 */
export function findOption<V>(
    options:
        | MaybeRefOrGetter<OptionsItem<V>[]>
        | MaybeRefOrGetter<OptionsGroupItem<V>[]>,
    value: MaybeRefOrGetter<V>,
): OptionsItem<V> | undefined {
    if (!Array.isArray(toValue(options))) return undefined;

    for (const option of toValue(options)) {
        if (typeof option !== "object" && option) continue;
        if (isGroupOption(option)) {
            // option in group
            const found = findOption(option.options, value);
            if (found !== undefined) return found;
        }
        // check if option has value
        else if (isEqual(toValue(value), option.value)) return option;
    }

    return undefined;
}

/**
 * Recursively finds the first viable option from a list of options or grouped options.
 *
 * A viable option is one that is not hidden and not disabled. The function supports both flat and grouped option structures.
 *
 * @param {MaybeRefOrGetter<OptionsItem<V>[]> | MaybeRefOrGetter<OptionsGroupItem<V>[]>} options
 *   The list of options, which may include grouped options.
 * @returns {OptionsItem<V> | undefined}
 *   The first viable option found, or undefined if none are viable.
 */
export function firstViableOption<V>(
    options:
        | MaybeRefOrGetter<OptionsItem<V>[]>
        | MaybeRefOrGetter<OptionsGroupItem<V>[]>,
): OptionsItem<V> | undefined {
    if (!Array.isArray(toValue(options))) return undefined;

    for (const option of toValue(options)) {
        if (typeof option !== "object" && option) continue;
        if (isGroupOption(option)) {
            // option in group
            const found = firstViableOption(option.options);
            if (found !== undefined) return found;
        }
        // check if option is viable
        else if (isOptionViable(option)) return option;
    }

    return undefined;
}

/**
 * Determines whether an option is viable for selection or display.
 *
 * An option is considered viable if it is not marked as hidden and is not disabled via its attributes.
 *
 * @param {MaybeRefOrGetter<OptionsItem>} option
 *   The option to evaluate.
 * @returns {boolean}
 *   Returns true if the option is not hidden and not disabled; otherwise, false.
 */
export function isOptionViable(option: MaybeRefOrGetter<OptionsItem>): boolean {
    return !toValue(option).hidden && !toValue(option).attrs?.disabled;
}

/**
 * Determines whether a given option matches a search value.
 *
 * The match is case-insensitive and checks if the option's label starts with the provided value.
 * Only viable options are considered for matching.
 *
 * @param {MaybeRefOrGetter<OptionsItem>} option
 *   The option to check against the search value.
 * @param {MaybeRefOrGetter<string>} value
 *   The search value to match against the option's label.
 * @returns {boolean}
 *   Returns true if the option is viable and its label starts with the search value; otherwise, false.
 */
export function isOptionMatched(
    option: MaybeRefOrGetter<OptionsItem>,
    value: MaybeRefOrGetter<string>,
): boolean {
    return (
        isOptionViable(option) &&
        toValue(option)
            .label?.toLowerCase()
            .startsWith(toValue(value).toLowerCase())
    );
}

/**
 * Recursively finds the index of a specific option within a flat or grouped options array.
 *
 * This function supports both flat arrays of options and arrays of grouped options.
 * It traverses the structure and returns the index of the target option as if all options were flattened.
 *
 * @param {MaybeRefOrGetter<OptionsItem[]> | MaybeRefOrGetter<OptionsGroupItem[]>} options
 *   The list of options, which may be a flat array or an array of grouped options.
 * @param {MaybeRefOrGetter<OptionsItem>} option
 *   The option to find within the options list.
 * @returns {number}
 *   The index of the option if found; otherwise, -1.
 */
export function findOptionIndex(
    options:
        | MaybeRefOrGetter<OptionsItem[]>
        | MaybeRefOrGetter<OptionsGroupItem[]>,
    option: MaybeRefOrGetter<OptionsItem>,
): number {
    if (!Array.isArray(toValue(options))) return -1;

    let idx = 0;
    for (const item of toValue(options)) {
        if (typeof item !== "object" && item) continue;
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
        else if (isEqual(item.value, toValue(option).value)) return idx;
        // else increase search indx
        else idx += 1;
    }

    // not matching option found
    return -1;
}

/**
 * Recursively calculates the total number of options from a list of options or grouped options.
 *
 * @param {MaybeRefOrGetter<OptionsItem[]> | MaybeRefOrGetter<OptionsGroupItem[]>} options
 *   A reactive reference or getter that returns an array of individual options or grouped options.
 * @returns {number}
 *   The total count of individual options, including those nested within groups.
 */
export function getOptionsLength(
    options:
        | MaybeRefOrGetter<OptionsItem[]>
        | MaybeRefOrGetter<OptionsGroupItem[]>,
): number {
    if (!Array.isArray(toValue(options))) return 0;

    return toValue(options).reduce((length, item) => {
        if (typeof item !== "object" && item) return length;
        if (isGroupOption(item)) {
            return length + getOptionsLength(item.options);
        }
        return length + 1;
    }, 0);
}
