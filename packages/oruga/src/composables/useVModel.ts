import { ref, watch, nextTick, getCurrentInstance, type Ref } from "vue";

/**
 * Adaption of {@link https://vueuse.org/core/useVModel/} options.
 */
export interface PropBindingOptions {
    /**
     * Attempting to check for changes of properties in a deeply nested object or array.
     * Apply only when `passive` option is set to `true`
     *
     * @default false
     */
    deep?: boolean;
}

/**
 * @deprecated can be replaced by `defineModel` with vue 3.5
 * Use two-way model binding in script setup syntax.
 * Adaption of {@link https://vueuse.org/core/useVModel/}.
 * @param name Property name
 * @param options Extended usage options
 * @returns Ref<T>
 */
export function useVModel<T>(
    name: string = "modelValue",
    options?: PropBindingOptions,
): Ref<T> {
    // getting a hold of the internal instance in setup()
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "useVModel must be called within a component setup function.",
        );

    /** reactive two-way binding model */
    const proxy = ref<T>(vm.proxy.$props[name!]) as Ref<T>;

    let isUpdating = false;

    watch(
        () => vm.proxy.$props[name!],
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
            if (
                (!isUpdating && value !== vm.proxy.$props[name!]) ||
                options?.deep
            )
                vm.emit(`update:${name}`, value);
        },
        { deep: options?.deep },
    );

    return proxy;
}
