import { createVNode, nextTick } from "vue";
import { describe, test, expect, afterEach, vi, beforeEach } from "vitest";
import { enableAutoUnmount, flushPromises } from "@vue/test-utils";

import useNotificationProgrammatic from "../useNotificationProgrammatic";

describe("useNotificationProgrammatic tests", () => {
    // create a new factory
    const factory = useNotificationProgrammatic();

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        // clear body after each test
        document.body.innerHTML = "";
        vi.useRealTimers();

        // clear factory items
        factory.closeAll();
    });

    enableAutoUnmount(afterEach);

    test("mounting component correctly", async () => {
        const content = "My Fany Message";

        // open element
        const { close, promise } = factory.open(content);

        // check promise get called
        const handler = vi.fn();
        promise.then(() => handler());
        expect(handler).not.toHaveBeenCalled();

        // check element exist
        let notification = document.body.querySelector(
            '[data-oruga="notification"]',
        );
        expect(notification).not.toBeNull();

        expect(notification?.innerHTML).toContain(content);

        // close element through handler
        close();
        vi.runAllTimers();

        // check element does not exist
        notification = document.body.querySelector(
            '[data-oruga="notification"]',
        );
        expect(notification).toBeNull();

        await flushPromises(); // await promise finished
        expect(handler).toHaveBeenCalledOnce();
    });

    test("mounting with target correctly", async () => {
        const container = document.createElement("div");
        container.id = "my-cool-container";
        document.body.appendChild(container);

        const component = createVNode({
            template: `<button @click="$emit('close', 'abc')">Fancy Label</button>`,
        });

        // open element
        const { close } = factory.open(
            {
                component,
                variant: "success",
            },
            "#my-cool-container",
        );

        await nextTick();

        // check element exist
        let notification = document.body.querySelector(
            '[data-oruga="notification"]',
        );
        expect(notification).not.toBeNull();
        expect(notification?.className).toContain("o-notification--success");

        // check element exist
        const button = notification?.querySelector<HTMLElement>("button");
        expect(button).not.toBeNull();
        expect(button?.innerHTML).toContain("Fancy Label");

        let bodyElements = document.body.querySelectorAll("body > *");
        expect(bodyElements).toHaveLength(1);

        // close element through handler
        close();
        vi.runAllTimers();

        // check element does not exist
        notification = document.body.querySelector(
            '[data-oruga="notification"]',
        );
        expect(notification).toBeNull();

        // check container still exists
        bodyElements = document.body.querySelectorAll("body > *");
        expect(bodyElements).toHaveLength(1);
    });

    test("mounting with custom component correctly", () => {
        const component = createVNode({
            template: `<button @click="$emit('close', 'abc')">Fancy Label</button>`,
        });

        // open element
        factory.open({
            component,
            props: { "data-oruga": "programmatic" },
        });

        // check element exist
        let notification = document.body.querySelector(
            '[data-oruga="notification"]',
        );
        expect(notification).not.toBeNull();

        const button = notification?.querySelector<HTMLElement>(
            '[data-oruga="programmatic"]',
        );
        expect(button).not.toBeNull();

        // close element on button click
        button?.click();
        vi.runAllTimers();

        // check element does not exist
        notification = document.body.querySelector(
            '[data-oruga="notification"]',
        );
        expect(notification).toBeNull();
    });

    test("close event working correctly", () => {
        const component = createVNode({
            template: `<button @click="$emit('close', {action: 'ok'})">Fancy Label</button>`,
        });
        const onClose = vi.fn();

        // open element
        factory.open({ component, onClose });

        expect(factory.count()).toBe(1);

        // check element exist
        let el = document.body.querySelector<HTMLElement>("button");
        expect(el).not.toBeNull();

        // close element on 'x' button click
        el?.click();
        vi.runAllTimers();

        expect(factory.count()).toBe(0);

        // check element does not exist
        el = document.body.querySelector("button");
        expect(el).toBeNull();

        expect(onClose).toHaveBeenCalledWith({ action: "ok" });
    });

    describe("live region and timer", () => {
        const button = (): HTMLElement =>
            document.body.querySelector("button") as HTMLElement;

        test("announce the variant of the notice", () => {
            factory.open({ message: "Saved", variant: "success" });
            factory.open({ message: "Failed", variant: "danger" });

            const roles = [
                ...document.body.querySelectorAll(
                    '[data-oruga="notification"]',
                ),
            ].map((el) => el.getAttribute("role"));
            expect(roles).toContain("status");
            expect(roles).toContain("alert");
        });

        test("close after 5 seconds by default", () => {
            factory.open({ message: "Saved" });

            vi.advanceTimersByTime(4999);
            expect(factory.count()).toBe(1);

            vi.advanceTimersByTime(1);
            vi.runAllTimers();
            expect(factory.count()).toBe(0);
        });

        test("pause while the focus is inside, then close on leave", () => {
            const component = createVNode({
                template: `<button>Undo</button>`,
            });
            factory.open({ component, pauseOnHover: true });

            button().dispatchEvent(
                new FocusEvent("focusin", { bubbles: true }),
            );
            vi.advanceTimersByTime(60000);
            expect(factory.count()).toBe(1);

            button().dispatchEvent(
                new FocusEvent("focusout", { bubbles: true }),
            );
            vi.runAllTimers();
            expect(factory.count()).toBe(0);
        });

        test("keep paused while the pointer is still inside", () => {
            const component = createVNode({
                template: `<button>Undo</button>`,
            });
            factory.open({ component, pauseOnHover: true });
            const notice = document.body.querySelector(
                '[data-oruga="notification"]',
            ) as HTMLElement;

            notice.dispatchEvent(new PointerEvent("pointerenter"));
            button().dispatchEvent(
                new FocusEvent("focusin", { bubbles: true }),
            );
            button().dispatchEvent(
                new FocusEvent("focusout", { bubbles: true }),
            );
            vi.runAllTimers();
            expect(factory.count()).toBe(1);

            notice.dispatchEvent(new PointerEvent("pointerleave"));
            vi.runAllTimers();
            expect(factory.count()).toBe(0);
        });

        test("ignore focus when pause on hover is off", () => {
            const component = createVNode({
                template: `<button>Undo</button>`,
            });
            factory.open({ component });

            button().dispatchEvent(
                new FocusEvent("focusin", { bubbles: true }),
            );
            vi.advanceTimersByTime(5000);
            vi.runAllTimers();
            expect(factory.count()).toBe(0);
        });
    });
});
