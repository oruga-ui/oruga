import {
    toValue,
    type ComponentPublicInstance,
    type MaybeRefOrGetter,
} from "vue";

export type VueInstance = ComponentPublicInstance;
export type MaybeElement =
    | Element
    | Document
    | Window
    | HTMLElement
    | SVGElement
    | VueInstance
    | undefined
    | null;

export type UnRefElementReturn<T extends MaybeElement = MaybeElement> =
    T extends VueInstance ? Exclude<MaybeElement, VueInstance> : T | undefined;

/**
 * Get the dom element of a ref of element or Vue component instance
 *
 * @param elRef
 */
export function unrefElement<T extends MaybeElement>(
    elRef: MaybeRefOrGetter<T>,
): UnRefElementReturn<T> {
    const plain = toValue(elRef);
    return (plain as VueInstance)?.$el ?? plain;
}
