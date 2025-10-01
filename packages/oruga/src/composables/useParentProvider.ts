import {
    computed,
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
    /** The root element of the item component */
    el: MaybeRefOrGetter<HTMLElement | null>;
    /** The index of the item component in the parent */
    index: number;
    /** A unique identifier for the item component */
    identifier: string;
    /** Item component data */
    data: T;
};

type PovidedData<P, I = unknown> = {
    registerItem: (
        el: MaybeRefOrGetter<HTMLElement | null>,
        data: MaybeRefOrGetter<I>,
    ) => ProviderItem<I>;
    unregisterItem: (item: ProviderItem) => void;
    total: ComputedRef<number>;
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
export function useProviderParent<ItemData = undefined, ParentData = unknown>(
    options?: ProviderParentOptions<ParentData>,
): {
    childItems: Readonly<Ref<ProviderItem<ItemData>[]>>;
    itemsCount: ComputedRef<number>;
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
    const total = computed<number>(() => childItems.value.length);

    if (options?.rootRef) {
        /** debounced sort function */
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

    function registerItem(
        el: MaybeRefOrGetter<HTMLElement | null>,
        data: MaybeRefOrGetter<ItemData>,
    ): ProviderItem<ItemData> {
        const index = childItems.value.length;
        const identifier = nextSequence();
        const item = { el, index, identifier, data };
        // add new item to the child list
        // this unwraps all inner refs
        childItems.value = [
            ...childItems.value,
            item,
        ] as ProviderItem<ItemData>[];
        return item as ProviderItem<ItemData>;
    }

    function unregisterItem(item: ProviderItem): void {
        childItems.value = childItems.value.filter((i) => i !== item);
    }

    /** Provide functionality for child components via dependency injection. */
    provide<PovidedData<ParentData, ItemData>>("$o-" + key, {
        registerItem,
        unregisterItem,
        total: total,
        data: options?.data,
    });

    return {
        childItems: childItems as Ref<ProviderItem<ItemData>[]>,
        itemsCount: total,
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

export function useProviderChild<ParentData = undefined, ItemData = unknown>(
    el: MaybeRefOrGetter<HTMLElement | null>,
    options: Omit<ProviderChildOptions<ItemData>, "needParent"> & {
        needParent: true;
    },
): {
    parent: ComputedRef<ParentData>;
    item: Readonly<ProviderItem<ItemData> | undefined>;
    itemsCount: ComputedRef<number>;
};

export function useProviderChild<ParentData = undefined, ItemData = unknown>(
    el: MaybeRefOrGetter<HTMLElement | null>,
    options: Omit<ProviderChildOptions<ItemData>, "needParent"> & {
        needParent: false;
    },
): {
    parent: ComputedRef<ParentData | undefined>;
    item: Readonly<ProviderItem<ItemData> | undefined>;
    itemsCount: ComputedRef<number>;
};

export function useProviderChild<ParentData = undefined, ItemData = unknown>(
    el: MaybeRefOrGetter<HTMLElement | null>,
    options: Omit<ProviderChildOptions<ItemData>, "needParent"> & {
        register: false;
    },
): {
    parent: ComputedRef<ParentData>;
    item: Readonly<undefined>;
    itemsCount: ComputedRef<number>;
};

export function useProviderChild<ParentData = undefined, ItemData = unknown>(
    el: MaybeRefOrGetter<HTMLElement | null>,
    options: Omit<ProviderChildOptions<ItemData>, "needParent" | "register"> & {
        needParent: true;
        register: true;
    },
): {
    parent: ComputedRef<ParentData>;
    item: Readonly<ProviderItem<ItemData>>;
    itemsCount: ComputedRef<number>;
};

export function useProviderChild<ParentData = undefined, ItemData = undefined>(
    el: MaybeRefOrGetter<HTMLElement | null>,
    options?: Omit<ProviderChildOptions<ItemData>, "needParent" | "register">,
): {
    parent: ComputedRef<ParentData>;
    item: Readonly<ProviderItem<ItemData>>;
    itemsCount: ComputedRef<number>;
};

/**
 * Inject functionalities and data from parent components
 * @param options additional options
 */
export function useProviderChild<ParentData = undefined, ItemData = unknown>(
    el: MaybeRefOrGetter<HTMLElement | null>,
    options?: ProviderChildOptions<ItemData>,
): {
    parent: ComputedRef<ParentData | undefined>;
    item: Readonly<ProviderItem<ItemData> | undefined>;
    itemsCount: ComputedRef<number>;
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

    const data = options.data ?? computed(() => undefined as ItemData);
    const parentData = parent?.data ?? computed(() => undefined);
    const total = parent?.total ?? computed(() => 0);

    let item: ProviderItem<ItemData> | undefined = undefined;

    // register item at parent
    if (parent && options.register) item = parent.registerItem(el, data);

    onUnmounted(() => {
        // unregister item at parent on item unmount
        if (parent && item) parent.unregisterItem(item);
    });

    return { parent: parentData, item: item, itemsCount: total };
}
