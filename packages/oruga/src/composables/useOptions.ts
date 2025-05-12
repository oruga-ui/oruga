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
 * A helper to determine if an option is a group or an option.
 * @param option - An option
 *
 * @returns option is OptionsGroupItem
 */
export function isGroupOption(
    option: Partial<OptionsItem | OptionsGroupItem>,
): option is OptionsGroupItem {
    return (
        option && typeof option === "object" && Array.isArray(option.options)
    );
}

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
 * Applies an filter function for a list of options {@link OptionsItem | OptionsGroupItem}.
 * Options are filtered by setting the hidden attribute.
 * The options reactivity is not triggered by this.
 * @param options - Options to filter
 * @param filter - filter function
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
 * Checks if no options are given or every existing options are hidden.
 * @param options - A list of {@link OptionsItem | OptionsGroupItem} to check for a given value
 *
 * @returns boolean
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
 * Given an list of {@link OptionsItem | OptionsGroupItem}, find the option item with the given value.
 *
 * @param options - A list of {@link OptionsItem | OptionsGroupItem} to check for a given value
 * @param value - The value to check
 *
 * @returns {@link OptionsItem}
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
 * Given an options list, find the first value.
 * @param options - An options list (with groups)
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

export function isOptionViable(option: MaybeRefOrGetter<OptionsItem>): boolean {
    return !toValue(option).hidden && !toValue(option).attrs?.disabled;
}
