import { afterEach, beforeEach, expect, vi } from "vitest";
import { toHaveNoViolations } from "jest-axe";
import { config } from "@vue/test-utils";
import { createTestingOruga } from "@/utils/config";

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
Object.defineProperties(HTMLDialogElement.prototype, {
    show: {
        value() {
            this.open = true;
        },
        configurable: true,
        writable: true,
    },
    close: {
        value() {
            this.open = false;
            this.dispatchEvent(new Event("close"));
        },
        configurable: true,
        writable: true,
    },
    showModal: {
        value() {
            this.open = true;
        },
        configurable: true,
        writable: true,
    },
});

class MockToggleEvent extends Event {
    oldState?: string;
    newState?: string;

    constructor(type: string, init: any = {}) {
        super(type, init);
        this.oldState = init.oldState;
        this.newState = init.newState;
    }
}

Object.defineProperty(globalThis, "ToggleEvent", {
    value: MockToggleEvent,
    writable: true,
});

// add missing PopoverAPI jsdom implementation (https://github.com/jsdom/jsdom/issues/3721)
Object.defineProperties(HTMLElement.prototype, {
    showPopover: {
        value() {
            const beforeToggleEvent = new globalThis.ToggleEvent(
                "beforetoggle",
                {
                    bubbles: true,
                    newState: "open",
                    oldState: "close",
                },
            );
            this.dispatchEvent(beforeToggleEvent);

            // display: block is important for getting RTL tests to see the popover
            // this is also how the popover is revealed in the browser
            this.style.display = "block";
            this.setAttribute("popover-open", "");

            const toggleEvent = new globalThis.ToggleEvent("toggle", {
                bubbles: true,
                newState: "open",
                oldState: "close",
            });
            this.dispatchEvent(toggleEvent);
        },
        configurable: true,
        writable: true,
    },
    hidePopover: {
        value() {
            const beforeToggleEvent = new globalThis.ToggleEvent(
                "beforetoggle",
                {
                    bubbles: true,
                    newState: "close",
                    oldState: "open",
                },
            );
            this.dispatchEvent(beforeToggleEvent);

            // display; none is also how popovers are hidden in the browser
            this.style.display = "none";
            this.removeAttribute("popover-open");

            const toggleEvent = new globalThis.ToggleEvent("toggle", {
                bubbles: true,
                newState: "close",
                oldState: "open",
            });
            this.dispatchEvent(toggleEvent);
        },
        configurable: true,
        writable: true,
    },
    togglePopover: {
        value(force) {
            const isOpen = this.matches("[popover-open]");

            if (force === undefined) {
                if (isOpen) {
                    this.hidePopover();
                } else {
                    this.showPopover();
                }
            } else if (force) {
                this.showPopover();
            } else {
                this.hidePopover();
            }
        },
        configurable: true,
        writable: true,
    },
});

// create a global oruga instance for all tests
config.global.plugins = [createTestingOruga()];

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
