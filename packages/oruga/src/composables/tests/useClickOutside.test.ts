import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { useClickOutside } from "../";

describe("useClickOutside test", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("should call handler when clicking outside the element", () => {
        const handler = vi.fn();
        const element = document.createElement("div");
        document.body.appendChild(element);

        const stop = useClickOutside(element, handler, { immediate: true });
        vi.runAllTimers();

        // Simulate click outside
        document.body.dispatchEvent(new MouseEvent("click", { bubbles: true }));

        expect(handler).toHaveBeenCalled();

        stop();
        document.body.removeChild(element);
    });

    test("should not call handler when clicking inside the element", () => {
        const handler = vi.fn();
        const element = document.createElement("div");
        document.body.appendChild(element);

        const stop = useClickOutside(element, handler, { immediate: true });
        vi.runAllTimers();

        // Simulate click inside
        element.dispatchEvent(new MouseEvent("click", { bubbles: true }));

        expect(handler).not.toHaveBeenCalled();

        stop();
        document.body.removeChild(element);
    });

    test("should respect ignore option", () => {
        const handler = vi.fn();
        const element = document.createElement("div");
        const ignoreElement = document.createElement("div");
        document.body.appendChild(element);
        document.body.appendChild(ignoreElement);

        const stop = useClickOutside([element, ignoreElement], handler, {
            immediate: true,
        });
        vi.runAllTimers();

        // Simulate click on ignored element
        ignoreElement.dispatchEvent(new MouseEvent("click", { bubbles: true }));

        expect(handler).not.toHaveBeenCalled();

        stop();
        document.body.removeChild(element);
        document.body.removeChild(ignoreElement);
    });
});
