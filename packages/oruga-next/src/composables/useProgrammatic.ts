import { computed, getCurrentInstance, onMounted, type Ref } from "vue";
import type { ProgrammaticInstance } from "..";
import { isClient } from "@/utils/ssr";
import { usePropBinding } from "./usePropValue";
import { useEventListener } from "./useEventListener";
import { removeElement } from "@/utils/helpers";

type ProgrammaticProps = {
    active: boolean;
    /** Define if the component is cancelable at all or by specific events. */
    cancelable?: boolean | string[];
    /** Callback function to call after user canceled (pressed escape / clicked outside). */
    onCancel: (...args: any[]) => void;
    /** Callback function to call after close (programmatically close or user canceled). */
    onClose: (...args: any[]) => void;
    /** DOM element where the programmatic component will be mounted on. */
    container?: HTMLElement | string;
    /** This defines the programmatic usage. */
    programmatic?: ProgrammaticInstance;
};

export interface ProgrammaticOptions {
    /** Method options that allow the component to be cancelled. */
    cancelOptions?: string[];
}

/**
 * This provides functionalities for programmatic usage.
 * The component get appended to the container.
 * This defines a cancel and close handler, as well as escape handler.
 * The component will be distroyed on close.
 * @param elementRef HTMLElement which should injected
 * @param props ProgrammaticProps
 * @param emits ["update:active", "close"]
 * @param options
 */
export function useProgrammaticComponent(
    elementRef: Ref<HTMLElement> | (() => HTMLElement),
    props: ProgrammaticProps,
    emits: {
        (e: "update:active", value: boolean): void;
        (e: "close", ...args: any[]): void;
    },
    options: ProgrammaticOptions = { cancelOptions: ["escape", "outside"] },
) {
    // getting a hold of the internal instance in setup()
    const vm = getCurrentInstance();
    if (!vm)
        throw new Error(
            "useProgrammaticComponent must be called within a component setup function.",
        );

    const isActive = usePropBinding("active", props, emits);

    const cancelOptions = computed(() =>
        typeof props.cancelable === "boolean"
            ? props.cancelable
                ? options.cancelOptions
                : []
            : props.cancelable,
    );

    function getElement(): HTMLElement {
        return typeof elementRef === "function"
            ? elementRef()
            : elementRef.value;
    }

    const container = computed((): HTMLElement => {
        if (typeof props.container === "string")
            return document.querySelector<HTMLElement>(props.container);
        return props.container || document.body;
    });

    onMounted(() => {
        if (props.programmatic) {
            if (props.programmatic.instances) {
                props.programmatic.instances.add(vm);
            }
            // Insert the component in the container or the body tag
            // only if it's programmatic
            const el = getElement();
            container.value.appendChild(el);

            isActive.value = true;
        }
    });

    if (isClient) useEventListener("keyup", onKeyPress, container.value);

    /** Keypress event that is bound to the document. */
    function onKeyPress(event: KeyboardEvent): void {
        if (isActive.value && (event.key === "Escape" || event.key === "Esc")) {
            cancel("escape");
        }
    }

    /**
     * Close the component if cancelable.
     * @param method Cancel method
     */
    function cancel(method: string): void {
        if (!props.cancelable || !isActive.value) return;
        // check if method is in options
        if (cancelOptions.value.indexOf(method) < 0) return;
        props.onCancel.apply(null);
        close({ action: "cancel", method });
    }

    /** Emit events, and destroy the component if it's programmatic. */
    function close(...args: any[]): void {
        emits("close");
        props.onClose.apply(null, args);

        if (props.programmatic) {
            if (props.programmatic.instances)
                props.programmatic.instances.remove(vm);

            if (props.programmatic.resolve)
                props.programmatic.resolve.apply(null, args);

            // Timeout for the animation complete before destroying
            setTimeout(() => {
                isActive.value = false;
                window.requestAnimationFrame(() => {
                    // remove the component from the container or the body tag
                    const el = getElement();
                    if (el) removeElement(el);
                });
            });
            return;
        }
        isActive.value = false;
    }

    return { close, cancel, isActive, container };
}
