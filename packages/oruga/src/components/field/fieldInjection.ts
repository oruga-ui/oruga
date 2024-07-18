import {
    computed,
    inject,
    provide,
    type ComputedRef,
    type InjectionKey,
} from "vue";

import Field from "./Field.vue";
import { getOption } from "@/utils/config";

export type FieldProps = InstanceType<typeof Field>["$props"];

type FieldData = {
    $el: Element;
    props: FieldProps;
    hasInnerField: boolean;
    variant: string;
    hasMessage: boolean;
    message: string;
    inputAttrs: object;
    addInnerField: () => void;
    setInputId: (value: string) => void;
    setFocus: (value: boolean) => void;
    setFilled: (value: boolean) => void;
    setVariant: (value: string) => void;
    setMessage: (value: string) => void;
};

/** provide/inject type */
type ProvidedField = ComputedRef<FieldData> | undefined;

/** provide/inject key */
const $FieldKey: InjectionKey<ProvidedField> = Symbol("FielData");

/**
 * Provide field component data via dependency injection.
 * Provided data is a computed ref to enjure reactivity.
 */
export function provideField(data: ProvidedField): void {
    provide($FieldKey, data);
}

/** Inject parent field component if used inside one. **/
export function injectField(): {
    parentField?: ComputedRef<FieldData> | undefined;
    statusVariant: ComputedRef<string>;
    statusVariantIcon: ComputedRef<string>;
    statusMessage: ComputedRef<string>;
} {
    const parentField = inject($FieldKey, undefined);

    /** Get the message prop from parent if it's a Field. */
    const statusMessage = computed<string>(() =>
        parentField.value?.hasMessage ? parentField.value.message : "",
    );

    /** Get the type prop from parent if it's a Field. */
    const statusVariant = computed<string | undefined>(() => {
        if (!parentField?.value?.variant) return undefined;
        if (typeof parentField.value.variant === "string")
            return parentField.value.variant;
        if (Array.isArray(parentField.value.variant)) {
            for (const key in parentField.value.variant as any) {
                if (parentField.value.variant[key]) return key;
            }
        }
        return undefined;
    });

    /** Icon name based on the variant. */
    const statusVariantIcon = computed<string>(() => {
        const statusVariantIcon = getOption("statusVariantIcon", {
            success: "check",
            danger: "alert-circle",
            info: "information",
            warning: "alert",
        });
        return statusVariantIcon[statusVariant.value] || "";
    });

    return {
        parentField,
        statusVariant,
        statusVariantIcon,
        statusMessage,
    };
}
