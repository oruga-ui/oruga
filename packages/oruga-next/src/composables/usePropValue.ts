import {
    computed,
    ref,
    watch,
    nextTick,
    type ExtractPropTypes,
    type WritableComputedRef,
    type Ref,
    type UnwrapRef,
    type ComponentObjectPropsOptions,
} from "vue";

/**
 * Adaption of {@link https://vueuse.org/core/useVModel/} options.
 */
export interface PropBindingOptions {
    /**
     * When passive is set to `true`, it will use `watch` to sync with props and ref.
     * Instead of relying on the `v-model` or `.sync` to work.
     *
     * @default false
     */
    passive?: boolean;
    /**
     * When eventName is set, it's value will be used to overwrite the emit event name.
     *
     * @default undefined
     */
    eventName?: string;
    /**
     * Attempting to check for changes of properties in a deeply nested object or array.
     * Apply only when `passive` option is set to `true`
     *
     * @default false
     */
    deep?: boolean;
}

/**
 * Use two-way binded modelValue property in script setup syntax.
 * Adaption of {@link https://vueuse.org/core/useVModel/}.
 * @param props Readonly<ExtractPropTypes<ComponentObjectPropsOptions>>
 * @param emit EmitFn
 * @param options Extened usage options
 * @returns Ref<T>
 */
export const useVModelBinding = <T>(
    props: Readonly<ExtractPropTypes<ComponentObjectPropsOptions>>,
    emit: {
        /** on input focus event */
        (e: "update:modelValue", value: T): void;
    },
    options?: PropBindingOptions,
): WritableComputedRef<T> | Ref<UnwrapRef<T>> =>
    usePropBinding("modelValue", props, emit, options);

/**
 * Use two-way model binding in script setup syntax.
 * Adaption of {@link https://vueuse.org/core/useVModel/}.
 * @param name Property name
 * @param props Readonly<ExtractPropTypes<ComponentObjectPropsOptions>>
 * @param emit EmitFn
 * @param options Extened usage options
 * @returns Ref<T>
 */
export const usePropBinding = <T>(
    name: string,
    props: Readonly<ExtractPropTypes<ComponentObjectPropsOptions<any>>>,
    emit: (event: any, value: T) => void,
    options?: PropBindingOptions,
): WritableComputedRef<T> | Ref<UnwrapRef<T>> => {
    const event = options?.eventName || `update:${name!.toString()}`;

    if (options?.passive) {
        const proxy = ref<T>(props[name!]);
        let isUpdating = false;

        watch(
            () => props[name!],
            (value) => {
                if (!isUpdating) {
                    isUpdating = true;
                    proxy.value = value;
                    nextTick(() => (isUpdating = false));
                }
            },
        );

        watch(
            proxy,
            (value) => {
                if ((!isUpdating && value !== props[name!]) || options.deep)
                    emit(event, value as T);
            },
            { deep: options.deep },
        );

        return proxy;
    } else {
        return computed<T>({
            get() {
                return props[name!] as T;
            },
            set(value) {
                emit(event, value);
            },
        });
    }
};
