import { toValue, useId, type MaybeRefOrGetter } from "vue";

export type ObjectMap<T> = Array<{
    key: string | number;
    value: T;
}>;

/** wrap entities in an array of objects with key/value attributes */
export function useObjectMap<T>(
    values: MaybeRefOrGetter<Array<T>>,
    key?: string,
): ObjectMap<T> {
    if (!toValue(values)?.length) return [];
    return toValue(values).map((value: T) => ({
        value: toValue(value),
        key:
            // if no key is given and data is object, create unique row id for each row
            key && typeof value === "object"
                ? (value![key as keyof T] as string) || useId()
                : useId(),
    }));
}
