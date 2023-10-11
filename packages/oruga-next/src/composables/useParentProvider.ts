import {
    computed,
    getCurrentInstance,
    inject,
    nextTick,
    onUnmounted,
    provide,
    ref,
    type Ref,
} from "vue";

type Item = {
    index: number;
    value: string;
};

type PovidedData<T> = {
    registerItem: (value: string) => Item;
    unregisterItem: (item: Item) => void;
    nextSequence: () => string;
    data?: T;
};

/**
 * Provide functionalities and data to child components
 * @param componentName Name of the provider component
 * @param rootRef Root element of the provider component
 * @param data Additional data to provide
 */
export function useProviderParent<T>(
    componentName: string,
    rootRef: Ref<HTMLElement>,
    data?: T,
) {
    const childItems = ref<Item[]>([]);
    const sequence = ref(1);

    /**
     * When items are added/removed sort them according to their position
     */
    const sortedItems = computed(() =>
        childItems.value.slice().sort((a, b) => a.index - b.index),
    );

    function registerItem(value: string): Item {
        const index = childItems.value.length;
        const item = { index, value };
        childItems.value.push(item);
        if (rootRef.value) {
            nextTick(() => {
                const ids = childItems.value
                    .map((item) => `[data-id="${componentName}-${item.value}"]`)
                    .join(",");
                const elements = rootRef.value.querySelectorAll(ids);
                const sortedIds = Array.from(elements).map((el: any) =>
                    el.getAttribute("data-id").replace(`${componentName}-`, ""),
                );

                childItems.value.forEach(
                    (item) => (item.index = sortedIds.indexOf(`${item.value}`)),
                );
            });
        }
        return item;
    }

    function unregisterItem(item: Item): void {
        childItems.value = childItems.value.filter((i) => i !== item);
    }

    function nextSequence(): string {
        return String(sequence.value++);
    }

    /** Provide functionality for child components via dependency injection. */
    provide<PovidedData<T>>("o" + componentName, {
        registerItem,
        unregisterItem,
        nextSequence,
        data: data,
    });

    return {
        childItems,
        sortedItems,
    };
}

/**
 * Inject functionalities and data from parent components
 * @param componentName Name of the provider component
 * @param value special identifier value
 */
export function useProviderChild<T>(
    componentName: string,
    value?: string,
): { parent: T; item: Item } {
    /** Inject parent component functionality if used inside one **/
    const parent = inject<PovidedData<T>>("o" + componentName, undefined);

    const item = ref<Item>();

    if (parent) {
        const identifier = value ? value : parent.nextSequence();
        item.value = parent.registerItem(identifier);
    } else {
        const vm = getCurrentInstance();
        throw new Error(
            `You should wrap ${vm.proxy.$options.name} in a ${componentName}`,
        );
    }

    onUnmounted(() => {
        if (parent && item.value) parent.unregisterItem(item.value);
    });

    return { parent: parent?.data, item: item.value };
}
