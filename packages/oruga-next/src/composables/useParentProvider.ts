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

export type ProviderItem = {
    index: number;
    data: any;
    identifier: string;
};

type PovidedData<T> = {
    registerItem: (value: string) => ProviderItem;
    unregisterItem: (item: ProviderItem) => void;
    data?: T;
};

type ProviderParentOptions = {
    /**
     * Override the provide/inject key.
     * Default is the component configField attribute
     */
    key?: string;
    /**
     * Additional data provided for the child to the item
     */
    data?: any;
};

/**
 * Provide functionalities and data to child components
 * @param rootRef Root element of the provider component
 * @param data Additional data to provide
 * @param options additional options
 */
export function useProviderParent<T>(
    rootRef: Ref<HTMLElement>,
    data?: T,
    options?: ProviderParentOptions,
) {
    // getting a hold of the internal instance in setup()
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "useProviderChild must be called within a component setup function.",
        );

    const configField = vm.proxy?.$options.configField;
    const key = options?.key ? options.key : configField;

    const childItems = ref<ProviderItem[]>([]);
    const sequence = ref(1);

    /**
     * When items are added/removed sort them according to their position
     */
    const sortedItems = computed(() =>
        childItems.value.slice().sort((a, b) => a.index - b.index),
    );

    function registerItem(data?: any): ProviderItem {
        const index = childItems.value.length;
        const identifier = nextSequence();
        const item = { index, data, identifier };
        childItems.value.push(item);
        if (rootRef.value) {
            nextTick(() => {
                const ids = childItems.value
                    .map((item) => `[data-id="${key}-${item.identifier}"]`)
                    .join(",");
                const elements = rootRef.value.querySelectorAll(ids);
                const sortedIds = Array.from(elements).map((el: any) =>
                    el.getAttribute("data-id").replace(`${key}-`, ""),
                );

                childItems.value.forEach(
                    (item) =>
                        (item.index = sortedIds.indexOf(`${item.identifier}`)),
                );
            });
        }
        return item;
    }

    function unregisterItem(item: ProviderItem): void {
        childItems.value = childItems.value.filter((i) => i !== item);
    }

    function nextSequence(): string {
        return String(sequence.value++);
    }

    /** Provide functionality for child components via dependency injection. */
    provide<PovidedData<T>>("$o-" + key, {
        registerItem,
        unregisterItem,
        data: data,
    });

    return {
        childItems,
        sortedItems,
    };
}

type ProviderChildOptions = {
    /**
     * Override the provide/inject key.
     * Default is the component configField attribute
     */
    key?: string;
    /**
     * Does the child need the be below the parent?
     * @default true
     */
    needParent?: boolean;
    /**
     * Additional data appended to the item
     */
    data?: any;
};

/**
 * Inject functionalities and data from parent components
 * @param options additional options
 */
export function useProviderChild<T>(
    options: ProviderChildOptions = { needParent: true },
): { parent: T; item: Ref<ProviderItem> } {
    // getting a hold of the internal instance in setup()
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "useProviderChild must be called within a component setup function.",
        );

    const configField = vm.proxy?.$options.configField;
    const key = options?.key ? options.key : configField;

    /** Inject parent component functionality if used inside one **/
    const parent = inject<PovidedData<T>>("$o-" + key, undefined);

    const needParent =
        typeof options.needParent === "undefined" || options.needParent;

    if (needParent && !parent) {
        throw new Error(
            `You should wrap ${vm.proxy.$options.name} in a ${key} component`,
        );
    }

    const item = ref<ProviderItem>();

    if (parent) item.value = parent.registerItem(options.data);

    onUnmounted(() => {
        if (parent && item.value) parent.unregisterItem(item.value);
    });

    return { parent: parent?.data, item: item };
}
