import { computed, type ExtractPropTypes, type WritableComputedRef } from "vue";

/**
 * Use modelValue property in script setup syntax
 * @param props Readonly<ExtractPropTypes<ComponentObjectPropsOptions>>
 * @param emit EmitFn
 * @returns WritableComputedRef<T>
 */
export const useVModelBinding = <T>(
    props: Readonly<ExtractPropTypes<any>>,
    emit: (event: any, ...args: any[]) => void,
): WritableComputedRef<T> => usePropBinding("modelValue", props, emit);

/**
 * Use two way model binding in script setup syntax
 * @param name Property name
 * @param props Readonly<ExtractPropTypes<ComponentObjectPropsOptions>>
 * @param emit EmitFn
 * @returns WritableComputedRef<T>
 */
export const usePropBinding = <T>(
    name: string,
    props: Readonly<ExtractPropTypes<any>>,
    emit: (event: any, ...args: any[]) => void,
): WritableComputedRef<T> =>
    computed<T>({
        get() {
            return props[name] as T;
        },
        set(value) {
            emit(`update:${name}`, value);
        },
    });
