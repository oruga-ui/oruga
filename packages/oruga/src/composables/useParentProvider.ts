import {
    computed,
    getCurrentInstance,
    inject,
    nextTick,
    onUnmounted,
    provide,
    ref,
    type Component,
    type ComputedRef,
    type Ref,
    type UnwrapNestedRefs,
} from "vue";
import { unrefElement } from "./unrefElement";
import { useSequentialId } from "./useSequentialId";

export type ProviderItem<T = unknown> = {
    index: number;
    data?: ComputedRef<T>;
    identifier: string;
};

type PovidedData<P, I = unknown> = {
    registerItem: (data?: ComputedRef<I>) => ProviderItem<I>;
    unregisterItem: (item: ProviderItem<I>) => void;
    data?: ComputedRef<P>;
};

type ProviderParentOptions<T = unknown> = {
    /**
     * Override the provide/inject key.
     * Default is the component configField attribute
     */
    key?: string;
    /**
     * Additional data provided for the child to the item
     */
    data?: ComputedRef<T>;
};

/**
 * Provide functionalities and data to child components
 * @param rootRef Root element of the provider component
 * @param data Additional data to provide
 * @param options additional options
 */
export function useProviderParent<ItemData = unknown, ParentData = unknown>(
    rootRef?: Ref<HTMLElement | Component | null | undefined>,
    options?: ProviderParentOptions<ParentData>,
): {
    childItems: Ref<UnwrapNestedRefs<ProviderItem<ItemData>[]>>;
    sortedItems: ComputedRef<UnwrapNestedRefs<ProviderItem<ItemData>[]>>;
} {
    // getting a hold of the internal instance in setup()
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "useProviderChild must be called within a component setup function.",
        );

    const configField = vm.proxy?.$options.configField;
    const key = options?.key || configField;

    const childItems = ref<ProviderItem<ItemData>[]>([]);

    /**
     * When items are added/removed sort them according to their position
     */
    const sortedItems = computed(() =>
        childItems.value.slice().sort((a, b) => a.index - b.index),
    );

    const { nextSequence } = useSequentialId();

    function registerItem(
        data?: ComputedRef<ItemData>,
    ): ProviderItem<ItemData> {
        const index = childItems.value.length;
        const identifier = nextSequence();
        const item = { index, data, identifier };
        childItems.value.push(item as UnwrapNestedRefs<typeof item>);
        if (rootRef?.value) {
            nextTick(() => {
                const ids = childItems.value
                    .map((item) => `[data-id="${key}-${item.identifier}"]`)
                    .join(",");
                const parent = unrefElement(rootRef);
                if (!parent) return;
                const children = parent.querySelectorAll(ids);
                const sortedIds = Array.from(children).map((el) =>
                    el.getAttribute("data-id")?.replace(`${key}-`, ""),
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

    /** Provide functionality for child components via dependency injection. */
    provide<PovidedData<ParentData, ItemData>>("$o-" + key, {
        registerItem,
        unregisterItem,
        data: options?.data,
    });

    return {
        childItems,
        sortedItems,
    };
}

type ProviderChildOptions<T = unknown> = {
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
    data?: ComputedRef<T>;
    /**
     * Register child on parent
     * @default true
     */
    register?: boolean;
};

export function useProviderChild<ParentData, ItemData = unknown>(
    options?: Omit<ProviderChildOptions<ItemData>, "needParent" | "register">,
): {
    parent: Ref<ParentData>;
    item: Ref<ProviderItem<ItemData>>;
};

export function useProviderChild<ParentData, ItemData = unknown>(
    options: Omit<ProviderChildOptions<ItemData>, "needParent" | "register"> & {
        needParent: true;
    },
): {
    parent: Ref<ParentData>;
    item: Ref<ProviderItem<ItemData> | undefined>;
};

export function useProviderChild<ParentData, ItemData = unknown>(
    options: Omit<ProviderChildOptions<ItemData>, "needParent" | "register"> & {
        needParent: true;
        register: true;
    },
): {
    parent: Ref<ParentData>;
    item: Ref<ProviderItem<ItemData>>;
};

export function useProviderChild<ParentData, ItemData = unknown>(
    options: Omit<ProviderChildOptions<ItemData>, "needParent"> & {
        needParent?: false;
    },
): {
    parent: Ref<ParentData | undefined>;
    item: Ref<ProviderItem<ItemData> | undefined>;
};

/**
 * Inject functionalities and data from parent components
 * @param options additional options
 */
export function useProviderChild<ParentData, ItemData = unknown>(
    options?: ProviderChildOptions<ItemData>,
): {
    parent: Ref<ParentData | undefined>;
    item: Ref<ProviderItem<ItemData> | undefined>;
} {
    options = Object.assign({ needParent: true, register: true }, options);

    // getting a hold of the internal instance in setup()
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "useProviderChild must be called within a component setup function.",
        );

    const configField = vm.proxy?.$options.configField;
    const key = options?.key || configField;

    /** Inject parent component functionality if used inside one **/
    const parent = inject<PovidedData<ParentData, ItemData> | undefined>(
        "$o-" + key,
        undefined,
    );

    if (options.needParent && !parent)
        throw new Error(
            `You should wrap ${vm.proxy?.$options.name} in a ${key} component`,
        );

    const item = ref<ProviderItem<ItemData>>();

    if (parent && options.register)
        item.value = parent.registerItem(options?.data);

    onUnmounted(() => {
        if (parent && item.value) parent.unregisterItem(item.value);
    });

    const data = parent?.data || ref();

    return { parent: data, item: item };
}
