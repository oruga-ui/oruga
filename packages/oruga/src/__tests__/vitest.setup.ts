import { afterEach, beforeEach, expect, vi } from "vitest";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// mock window.machMedia function
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// add missing Dialog jsdom implementation (https://github.com/jsdom/jsdom/issues/3294)
HTMLDialogElement.prototype.close = vi.fn(function mock(
    this: HTMLDialogElement,
) {
    this.open = false;
    this.dispatchEvent(new Event("close"));
});

HTMLDialogElement.prototype.showModal = vi.fn(function mock(
    this: HTMLDialogElement,
) {
    this.open = true;
});

HTMLDialogElement.prototype.show = vi.fn(function mock(
    this: HTMLDialogElement,
) {
    this.open = true;
});

beforeEach(() => {
    // Preserve original implementation
    const OriginalDateTimeFormat = Intl.DateTimeFormat;

    // Mock DateTimeFormat to enforce a consistent locale
    vi.spyOn(Intl, "DateTimeFormat").mockImplementation(
        function (_?, options?) {
            return new OriginalDateTimeFormat("en-GB", {
                ...options,
            });
        },
    );
});

afterEach(() => {
    vi.restoreAllMocks();
});
