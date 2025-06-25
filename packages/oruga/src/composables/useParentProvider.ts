import {
    getCurrentInstance,
    inject,
    onUnmounted,
    provide,
    ref,
    watch,
    type Component,
    type ComputedRef,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";
import { unrefElement } from "./unrefElement";
import { useDebounce } from "./useDebounce";
import { useSequentialId } from "./useSequentialId";

export type ProviderItem<T = unknown> = {
    index: number;
    data?: T;
    identifier: string;
};

type PovidedData<P, I = unknown> = {
    registerItem: (data?: I) => ProviderItem<I>;
    unregisterItem: (item: ProviderItem) => void;
    data?: ComputedRef<P>;
};

type ProviderParentOptions<T = unknown> = {
    /**
     * Root element of the provider component
     */
    rootRef?: MaybeRefOrGetter<HTMLElement | Component | null | undefined>;
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
 * @param options parent provider options
 */
export function useProviderParent<ItemData = unknown, ParentData = unknown>(
    options?: ProviderParentOptions<ParentData>,
): {
    childItems: Readonly<Ref<ProviderItem<ItemData>[]>>;
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

    if (options?.rootRef) {
        // debounced sort function
        const sortHandler = useDebounce((items: typeof childItems.value) => {
            const parent = unrefElement(options.rootRef);
            if (!parent) return;

            // create a list of child item ids
            const ids = items
                .map((item) => `[data-id="${key}-${item.identifier}"]`)
                .join(",");

            if (!ids) return;

            // query all child items in the order of the DOM appearance
            const children = parent.querySelectorAll(ids);

            // create a list of ids ordered after the elements in DOM
            const sortedIds = Array.from(children).map((el) =>
                el.getAttribute("data-id")?.replace(`${key}-`, ""),
            );

            // update the index attribute of the child items
            items.forEach(
                (item) =>
                    (item.index = sortedIds.indexOf(`${item.identifier}`)),
            );

            // sort items according to their index position
            items.sort((a, b) => a.index - b.index);
        }, 500);

        // when child items are added/removed (no deep change - only list update)
        // sort them according to their DOM position
        watch(childItems, sortHandler);
    }

    const { nextSequence } = useSequentialId(1);

    function registerItem(data?: ItemData): ProviderItem<ItemData> {
        const index = childItems.value.length;
        const identifier = nextSequence();
        const item = { index, data, identifier };
        // add new item to the child list
        childItems.value = [
            ...childItems.value,
            item,
        ] as ProviderItem<ItemData>[];
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
        childItems: childItems as Ref<ProviderItem<ItemData>[]>,
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
    options: Omit<ProviderChildOptions<ItemData>, "needParent"> & {
        needParent: true;
    },
): {
    parent: Readonly<Ref<ParentData>>;
    item: Readonly<Ref<ProviderItem<ItemData> | undefined>>;
};

export function useProviderChild<ParentData, ItemData = unknown>(
    options: Omit<ProviderChildOptions<ItemData>, "needParent"> & {
        needParent: false;
    },
): {
    parent: Readonly<Ref<ParentData | undefined>>;
    item: Readonly<Ref<ProviderItem<ItemData> | undefined>>;
};

export function useProviderChild<ParentData, ItemData = unknown>(
    options: Omit<ProviderChildOptions<ItemData>, "needParent"> & {
        register: false;
    },
): {
    parent: Readonly<Ref<ParentData>>;
    item: Readonly<Ref<undefined>>;
};

export function useProviderChild<ParentData, ItemData = unknown>(
    options: Omit<ProviderChildOptions<ItemData>, "needParent" | "register"> & {
        needParent: true;
        register: true;
    },
): {
    parent: Readonly<Ref<ParentData>>;
    item: Readonly<Ref<ProviderItem<ItemData>>>;
};

export function useProviderChild<ParentData, ItemData = unknown>(
    options?: Omit<ProviderChildOptions<ItemData>, "needParent" | "register">,
): {
    parent: Readonly<Ref<ParentData>>;
    item: Readonly<Ref<ProviderItem<ItemData>>>;
};

/**
 * Inject functionalities and data from parent components
 * @param options additional options
 */
export function useProviderChild<ParentData, ItemData = unknown>(
    options?: ProviderChildOptions<ItemData>,
): {
    parent: Readonly<Ref<ParentData | undefined>>;
    item: Readonly<Ref<ProviderItem<ItemData> | undefined>>;
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
    const parent = inject<
        PovidedData<ParentData, ComputedRef<ItemData>> | undefined
    >("$o-" + key, undefined);

    if (options.needParent && !parent)
        throw new Error(
            `You should wrap ${vm.proxy?.$options.name} in a ${key} component`,
        );

    const item = ref<ProviderItem<ItemData>>();

    if (parent && options.register)
        item.value = parent.registerItem(
            options?.data,
        ) as ProviderItem<ItemData>;

    onUnmounted(() => {
        if (parent && item.value) parent.unregisterItem(item.value);
    });

    const data = parent?.data || ref();

    return { parent: data, item: item };
}
