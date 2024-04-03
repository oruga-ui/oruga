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
} from "vue";
import { unrefElement } from "./unrefElement";

export type ProviderItem<T = unknown> = {
    index: number;
    data: ComputedRef<T>;
    identifier: string;
};

type PovidedData<P, I = unknown> = {
    registerItem: (data: ComputedRef<I>) => ProviderItem<I>;
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
    rootRef?: Ref<HTMLElement | Component>,
    options?: ProviderParentOptions<ParentData>,
): {
    childItems: Ref<ProviderItem<ItemData>[]>;
    sortedItems: Ref<ProviderItem<ItemData>[]>;
} {
    // getting a hold of the internal instance in setup()
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "useProviderChild must be called within a component setup function.",
        );

    const configField = vm.proxy?.$options.configField;
    const key = options?.key ? options.key : configField;

    const childItems = ref<ProviderItem<ItemData>[]>([]) as Ref<
        ProviderItem<ItemData>[]
    >;
    const sequence = ref(1);

    /**
     * When items are added/removed sort them according to their position
     */
    const sortedItems = computed(() =>
        childItems.value.slice().sort((a, b) => a.index - b.index),
    );

    function registerItem(
        data?: ComputedRef<ItemData>,
    ): ProviderItem<ItemData> {
        const index = childItems.value.length;
        const identifier = nextSequence();
        const item = { index, data, identifier };
        childItems.value.push(item);
        if (rootRef?.value) {
            nextTick(() => {
                const ids = childItems.value
                    .map((item) => `[data-id="${key}-${item.identifier}"]`)
                    .join(",");
                const parent = unrefElement(rootRef);
                const children = parent.querySelectorAll(ids);
                const sortedIds = Array.from(children).map((el: any) =>
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

/**
 * Inject functionalities and data from parent components
 * @param options additional options
 */
export function useProviderChild<ParentData, ItemData = unknown>(
    options: ProviderChildOptions<ItemData> = { needParent: true },
): { parent: ComputedRef<ParentData>; item: Ref<ProviderItem<ItemData>> } {
    // getting a hold of the internal instance in setup()
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "useProviderChild must be called within a component setup function.",
        );

    const configField = vm.proxy?.$options.configField;
    const key = options?.key ? options.key : configField;

    /** Inject parent component functionality if used inside one **/
    const parent = inject<PovidedData<ParentData, ItemData>>(
        "$o-" + key,
        undefined,
    );

    const needParent =
        typeof options.needParent === "undefined" || options.needParent;

    const register =
        typeof options.register === "undefined" || options.register;

    if (needParent && !parent) {
        throw new Error(
            `You should wrap ${vm.proxy.$options.name} in a ${key} component`,
        );
    }

    const item = ref<ProviderItem<ItemData>>();

    if (parent && register) item.value = parent.registerItem(options.data);

    onUnmounted(() => {
        if (parent && item.value) parent.unregisterItem(item.value);
    });

    return { parent: parent?.data, item: item };
}
