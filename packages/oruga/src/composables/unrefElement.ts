import {
    toValue,
    type ComponentPublicInstance,
    type MaybeRefOrGetter,
    type MaybeRef,
    type Component,
} from "vue";

export type MaybeElement =
    | HTMLElement
    | Component
    | ComponentPublicInstance
    | undefined
    | null;

export type UnRefElementReturn<T extends MaybeElement> = T extends
    | ComponentPublicInstance
    | Component
    ? HTMLElement
    : T;

/** Get the dom element of a ref of element or Vue component instance */
export function unrefElement<T extends MaybeElement>(
    elRef: MaybeRefOrGetter<T> | MaybeRef<T>,
): UnRefElementReturn<T> {
    const plain = toValue(elRef);
    return (plain as ComponentPublicInstance)?.$el ?? plain;
}

/** Resolve an HTML element based on query selector or an explizit dom element */
export function resolveElement(
    target: MaybeRefOrGetter<HTMLElement | string>,
): HTMLElement | null {
    const targetQuery = toValue(target);
    // query element if target is a string
    if (typeof targetQuery === "string")
        return document.querySelector<HTMLElement>(targetQuery);
    // else unwrap element
    else return unrefElement(targetQuery);
}
