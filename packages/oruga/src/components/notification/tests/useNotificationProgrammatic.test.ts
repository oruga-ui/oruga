import { createVNode, nextTick } from "vue";
import { describe, test, expect, afterEach, vi, beforeEach } from "vitest";
import { enableAutoUnmount, flushPromises } from "@vue/test-utils";

import NotificationProgrammatic from "../useNotificationProgrammatic";

describe("useNotificationProgrammatic tests", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        // clear body after each test
        document.body.innerHTML = "";
        vi.useRealTimers();
    });

    enableAutoUnmount(afterEach);

    test("test mounting component correctly", async () => {
        const message = "My Fany Message";

        // open element
        const { close, promise } = NotificationProgrammatic.open(message);

        // check promise get called
        const handler = vi.fn();
        promise.then(() => handler());
        expect(handler).not.toHaveBeenCalled();

        // check element exist
        let notification = document.body.querySelector(
            '[data-oruga="notification"]',
        );
        expect(notification).not.toBeNull();

        expect(notification?.innerHTML).toContain(message);

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

    test("test mounting with target correctly", async () => {
        const container = document.createElement("div");
        container.id = "my-cool-container";
        document.body.appendChild(container);

        const component = createVNode({
            template: `<button @click="$emit('close', 'abc')">Fancy Label</button>`,
        });

        // open element
        const { close } = NotificationProgrammatic.open(
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

    test("test mounting with custom component correctly", async () => {
        const component = createVNode({
            template: `<button @click="$emit('close', 'abc')">Fancy Label</button>`,
        });

        // open element
        NotificationProgrammatic.open({
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

    test("test close event working correctly", async () => {
        const component = createVNode({
            template: `<button @click="$emit('close', {action: 'ok'})">Fancy Label</button>`,
        });
        const onClose = vi.fn();

        // open element
        NotificationProgrammatic.open({ component, onClose });

        // check element exist
        let el = document.body.querySelector<HTMLElement>("button");
        expect(el).not.toBeNull();

        // close element on 'x' button click
        el?.click();
        vi.runAllTimers();

        // check element does not exist
        el = document.body.querySelector("button");
        expect(el).toBeNull();

        expect(onClose).toHaveBeenCalledWith({action: 'ok'});
    });
});
