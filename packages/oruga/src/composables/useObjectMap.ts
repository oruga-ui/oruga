import { toValue, type MaybeRefOrGetter } from "vue";
import type { useSequentialId } from "./useSequentialId";

export type ObjectMap<T> = Array<{
    key: string | number;
    value: T;
}>;

/** wrap entities in an array of objects with key/value attributes */
export function useObjectMap<T>(
    values: MaybeRefOrGetter<Array<T>> | undefined,
    key: string | number | symbol | undefined,
    uId: ReturnType<typeof useSequentialId>,
): ObjectMap<T> {
    if (!values || !toValue(values)?.length) return [];
    return toValue(values).map((value: T) => ({
        value: toValue(value),
        key:
            // if no key is given and data is object, create unique row id for each row
            key && value && typeof value === "object"
                ? (value[key as keyof T] as string) || uId()
                : uId(),
    }));
}
