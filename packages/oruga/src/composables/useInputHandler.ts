import {
    nextTick,
    ref,
    computed,
    type ExtractPropTypes,
    type MaybeRefOrGetter,
    type Component,
} from "vue";
import { injectField } from "@/components/field/fieldInjection";
import { unrefElement } from "./unrefElement";
import { getOption } from "@/utils/config";
import { isSSR } from "@/utils/ssr";

// This should cover all types of HTML elements that have properties related to
// HTML constraint validation, e.g. .form and .validity.
const validatableFormElementTypes = isSSR
    ? []
    : [
          HTMLButtonElement,
          HTMLFieldSetElement,
          HTMLInputElement,
          HTMLObjectElement,
          HTMLOutputElement,
          HTMLSelectElement,
          HTMLTextAreaElement,
      ];

export type ValidatableFormElement = InstanceType<
    (typeof validatableFormElementTypes)[number]
>;

function asValidatableFormElement(el: unknown): ValidatableFormElement | null {
    return validatableFormElementTypes.some((t) => el instanceof t)
        ? (el as ValidatableFormElement)
        : null;
}

/**
 * Form input handler functionalities
 */
export function useInputHandler(
    /** input ref element - can be a html element or a vue component*/
    inputRef: MaybeRefOrGetter<ValidatableFormElement | Component>,
    /** emitted input events */
    emits: {
        /** on input focus event */
        (e: "focus", value: Event): void;
        /** on input blur event */
        (e: "blur", value: Event): void;
        /** on input invalid event */
        (e: "invalid", value: Event): void;
    },
    /** validation configuration props */
    props: Readonly<
        ExtractPropTypes<{
            useHtml5Validation?: boolean;
            validationMessage?: string;
        }>
    >,
) {
    // inject parent field component if used inside one
    const { parentField } = injectField();

    const element = computed<ValidatableFormElement>(() => {
        const el = unrefElement<Component | HTMLElement>(inputRef);
        if (!el) {
            console.warn("useInputHandler: inputRef contains no element");
            return undefined;
        }
        if (el.getAttribute("data-oruga-input"))
            // if element is the input element
            return el as ValidatableFormElement;

        const inputs = el.querySelector("[data-oruga-input]");

        if (!inputs) {
            console.warn(
                "useInputHandler: Underlaying Oruga input component not found",
            );
            return undefined;
        }
        // return underlaying the input element
        return inputs as ValidatableFormElement;
    });

    // --- Input Focus Feature ---

    const isFocused = ref(false);

    /** Focus the underlaying input element. */
    function setFocus(): void {
        nextTick(() => {
            if (element.value) element.value.focus();
        });
    }

    /** Click the underlaying input element. */
    function doClick(): void {
        nextTick(() => {
            if (element.value) element.value.click();
        });
    }

    function onBlur(event?: Event): void {
        isFocused.value = false;
        if (parentField?.value) parentField.value.setFocus(false);
        emits("blur", event);
        checkHtml5Validity();
    }

    function onFocus(event?: Event): void {
        isFocused.value = true;
        if (parentField?.value) parentField.value.setFocus(true);
        emits("focus", event);
    }

    // --- Validation Feature ---

    const isValid = ref(true);

    function setFieldValidity(variant, message): void {
        nextTick(() => {
            if (parentField?.value) {
                // Set type only if not defined
                if (!parentField.value.props.variant) {
                    parentField.value.setVariant(variant);
                }
                // Set message only if not defined
                if (!parentField.value.props.message) {
                    parentField.value.setMessage(message);
                }
            }
        });
    }

    /**
     * Check HTML5 validation, set isValid property.
     * If validation fail, send 'danger' type,
     * and error message to parent if it's a Field.
     */
    function checkHtml5Validity(): void {
        if (!props.useHtml5Validation) return;

        if (!element.value) return;
        if (element.value.validity.valid) {
            setFieldValidity(null, null);
            isValid.value = true;
        } else {
            setInvalid();
            isValid.value = false;
        }
    }

    function setInvalid(): void {
        const variant = "danger";
        const message =
            props.validationMessage || element.value.validationMessage;
        setFieldValidity(variant, message);
    }

    function onInvalid(event: Event): void {
        checkHtml5Validity();
        const validatable = asValidatableFormElement(event.target);
        if (validatable && parentField?.value && props.useHtml5Validation) {
            // We provide our own error message on the field, so we should suppress the browser's default tooltip.
            // We still want to focus the form's first invalid input, though.
            event.preventDefault();
            let isFirstInvalid = false;
            if (validatable.form != null) {
                const formElements = validatable.form.elements;
                for (let i = 0; i < formElements.length; ++i) {
                    const element = asValidatableFormElement(
                        formElements.item(i),
                    );
                    if (element?.willValidate && !element.validity.valid) {
                        isFirstInvalid = validatable === element;
                        break;
                    }
                }
            }
            if (isFirstInvalid) {
                const fieldElement = parentField.value.$el;
                const invalidHandler = getOption("invalidHandler");
                if (invalidHandler instanceof Function) {
                    invalidHandler(validatable, fieldElement);
                } else {
                    // We'll scroll to put the whole field in view, not just the element that triggered the event,
                    // which should mean that the message will be visible onscreen.
                    // scrollIntoViewIfNeeded() is a non-standard method (but a very common extension).
                    // If we can't use it, we'll just fall back to focusing the field.
                    const canScrollToField = fieldElement
                        ? fieldElement.scrollIntoView != undefined
                        : false;
                    validatable.focus({ preventScroll: canScrollToField });
                    if (canScrollToField) {
                        fieldElement.scrollIntoView({ block: "nearest" });
                    }
                }
            }
        }
        emits("invalid", event);
    }

    return {
        isFocused,
        isValid,
        setFocus,
        doClick,
        onFocus,
        onBlur,
        checkHtml5Validity,
        onInvalid,
    };
}
