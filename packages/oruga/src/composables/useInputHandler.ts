import {
    nextTick,
    ref,
    computed,
    triggerRef,
    watch,
    watchEffect,
    type ExtractPropTypes,
    type MaybeRefOrGetter,
    type Component,
} from "vue";
import { injectField } from "@/components/field/fieldInjection";
import { unrefElement } from "./unrefElement";
import { getOption } from "@/utils/config";
import { isSSR } from "@/utils/ssr";
import { isDefined } from "@/utils/helpers";

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

const constraintValidationAttributes = [
    "disabled",
    "required",
    "pattern",
    "maxlength",
    "minlength",
    "max",
    "min",
    "step",
];

/**
 * Form input handler functionalities
 */
export function useInputHandler<T extends ValidatableFormElement>(
    /** input ref element - can be a html element or a vue component*/
    inputRef: MaybeRefOrGetter<T | Component>,
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
            modelValue?: unknown;
            useHtml5Validation?: boolean;
            customValidity?:
                | string
                | ((currentValue: any, v: ValidityState) => string);
        }>
    >,
) {
    // inject parent field component if used inside one
    const { parentField } = injectField();

    /// Allows access to the native element in cases where it might be missing,
    /// e.g. because the component hasn't been mounted yet or has been suspended
    /// by a <KeepAlive>
    const maybeElement = computed<T | undefined>(() => {
        const el = unrefElement<Component | HTMLElement>(inputRef);
        if (!el) return undefined;

        if (el.getAttribute("data-oruga-input"))
            // if element is the input element
            return el as T;

        const inputs = el.querySelector("[data-oruga-input]");

        if (!inputs) {
            console.warn(
                "useInputHandler: Underlaying Oruga input component not found",
            );
            return undefined;
        }
        // return underlaying the input element
        return inputs as T;
    });

    /// Should be used for most accesses to the native element; we generally
    /// expect it to be present, especially in event handlers.
    const element = computed(() => {
        const el = maybeElement.value;
        if (!el) console.warn("useInputHandler: inputRef contains no element");
        return el;
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

    /** Unset focused and emit blur event. */
    function onBlur(event?: Event): void {
        isFocused.value = false;
        if (parentField?.value) parentField.value.setFocus(false);
        emits("blur", event ? event : new Event("blur"));
        checkHtml5Validity();
    }

    /** Set focused and emit focus event. */
    function onFocus(event?: Event): void {
        isFocused.value = true;
        if (parentField?.value) parentField.value.setFocus(true);
        emits("focus", event ? event : new Event("focus"));
    }

    // --- Validation Feature ---

    const isValid = ref(true);

    function setFieldValidity(variant, message): void {
        nextTick(() => {
            if (parentField?.value) {
                // Set type only if not defined
                if (!parentField.value.props.variant)
                    parentField.value.setVariant(variant);

                // Set message only if not defined
                if (!parentField.value.props.message)
                    parentField.value.setMessage(message);
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
        const message = element.value?.validationMessage;
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

    if (!isSSR) {
        /**
         * Provides a way to force the watcher on `updateCustomValidationMessage` to re-run
         *
         * There are some cases (e.g. changes to the element's validation attributes) that can
         * force changes to the element's `validityState`, which isn't a reactive property.
         * Note that just calling the watcher's internal function directly (outside the watcher)
         * wouldn't be a complete solution; the watcher would then miss any new reactive dependencies
         * that show up, e.g. because `props.customValidity` starts taking a branch that the watcher
         * hasn't seen before.
         */
        const forceValidationUpdate = ref(null);

        // Propagate any custom constraint validation message to the underlying DOM element.
        // Note that using watchEffect will implicitly pick up any reactive dependencies used
        // inside props.customValidity, which should help the computed message stay up to date.
        watchEffect((): void => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            forceValidationUpdate.value;
            if (!(props.useHtml5Validation ?? true)) return;

            const element = maybeElement.value;
            if (!isDefined(element)) return;

            const validity = props.customValidity ?? "";
            if (typeof validity === "string") {
                element.setCustomValidity(validity);
            } else {
                // The custom validation message may depend on `element.validity`,
                // which isn't a reactive property. `element.validity` depends on
                // the element's current value and the native constraint validation
                // attributes. We can use `props.modelValue` as a reasonable proxy
                // for the DOM element's value, and `props.modelValue` _is_ reactive,
                // so we can read it to help solve that reactivity problem.
                element.setCustomValidity(
                    validity(props.modelValue, element.validity),
                );
            }

            // Updates the user-visible validation message if necessary
            if (!isValid.value) checkHtml5Validity();
        });

        // Clean up validation state if we stop controlling it.
        watch(
            [maybeElement, (): boolean => props.useHtml5Validation ?? true],
            (newItems, oldItems) => {
                const newElement = newItems[0];
                const newUseValidation = newItems[1];
                const oldElement = oldItems[0];
                const oldUseValidation = oldItems[1];
                if (newElement !== oldElement) {
                    // Since we're no longer managing the element, we might
                    // as well clean up any custom validity we set up.
                    oldElement?.setCustomValidity("");
                } else if (oldUseValidation && !newUseValidation) {
                    newElement?.setCustomValidity("");
                }
            },
        );

        // Respond to attribute changes that could affect validation messages.
        //
        // Technically, having the `required` attribute on one element in a radio button
        // group affects the validity of the entire group.
        // See https://html.spec.whatwg.org/multipage/input.html#radio-button-group.
        // We're not checking for that here because it would require more expensive logic.
        // Because of that, this will only work properly if the `required` attributes of all radio
        // buttons in the group are synchronized with each other, which is likely anyway.
        // (We're also expecting the use of radio buttons with our default validation message handling
        // to be fairly uncommon because the overall visual experience is clunky with such a configuration.)
        const onAttributeChange = (): void => {
            triggerRef(forceValidationUpdate);
        };

        let validationAttributeObserver: MutationObserver | null = null;

        watch(
            [
                maybeElement,
                isValid,
                (): boolean => props.useHtml5Validation ?? true,
                ():
                    | string
                    | ((s: ValidityState, v: any) => string)
                    | undefined => props.customValidity,
            ],
            (newData, oldData) => {
                // Not using destructuring assignment because browser support is just a little too weak at the moment
                const el = newData[0];
                const valid = newData[1];
                const useValidation = newData[2];
                const functionalValidation = newData[3] instanceof Function;
                const oldEl = oldData[0];

                const needWatcher =
                    isDefined(el) &&
                    useValidation &&
                    // For inputs known to be invalid, changes in constraint validation properties
                    // may make it so the field is now valid and the message needs to be hidden.
                    // For browser-implemented constraint validation (e.g. the `required` attribute),
                    // we just care about the message displayed to the user, which is hidden for valid inputs
                    // until the next interaction with the control.
                    (!valid ||
                        // For inputs with complex custom validation, any changes to validation-related attributes
                        // may affect the results of `props.customValidity`.
                        functionalValidation);

                // Clean up previous state.
                if (
                    (!needWatcher || el !== oldEl) &&
                    validationAttributeObserver != null
                ) {
                    // Process any pending events.
                    if (validationAttributeObserver.takeRecords().length > 0)
                        onAttributeChange();
                    validationAttributeObserver.disconnect();
                }

                // Update the watcher.
                // Note that this branch is also used for the initial setup of the watcher.
                // We're assuming that `maybeElement` will start out null when the watcher is created, which will
                // cause the watcher to be triggered (with `oldEl == undefined`) once the component is mounted.
                if (needWatcher && isDefined(el) && el !== oldEl) {
                    if (validationAttributeObserver == null) {
                        validationAttributeObserver = new MutationObserver(
                            onAttributeChange,
                        );
                    }
                    validationAttributeObserver.observe(el, {
                        attributeFilter: constraintValidationAttributes,
                    });

                    // Note that this doesn't react to changes in the list of ancestors.
                    // Based on testing, Vue seems to rarely, if ever, re-parent DOM nodes;
                    // it generally prefers to create new ones under the new parent.
                    // That means this simpler solution is likely good enough for now.
                    let ancestor: Node | null = el;
                    while ((ancestor = ancestor.parentNode)) {
                        // Form controls can be disabled by their ancestor fieldsets.
                        if (ancestor instanceof HTMLFieldSetElement) {
                            validationAttributeObserver.observe(ancestor, {
                                attributeFilter: ["disabled"],
                            });
                        }
                    }
                }
            },
        );
    }

    return {
        input: element,
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
