import { createVNode } from "vue";
import { describe, test, expect, afterEach, vi, beforeEach } from "vitest";
import { enableAutoUnmount, flushPromises } from "@vue/test-utils";

import useSidebarProgrammatic from "../useSidebarProgrammatic";

describe("useSidebarProgrammatic tests", () => {
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
        const component = createVNode({
            template: `<button @click="$emit('close', 'abc')">Fancy Label</button>`,
        });

        // open element
        const { close, promise } = useSidebarProgrammatic.open({ component });

        // check promise get called
        const handler = vi.fn();
        promise.then(() => handler());
        expect(handler).not.toHaveBeenCalled();

        // check element exist
        let sidebar = document.body.querySelector('[data-oruga="sidebar"]');
        expect(sidebar).not.toBeNull();

        expect(sidebar.innerHTML).toContain("Fancy Label");

        // close element through handler
        close();
        vi.runAllTimers();

        // check element does not edist
        sidebar = document.body.querySelector('[data-oruga="sidebar"]');
        expect(sidebar).toBeNull();

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
        const { close } = useSidebarProgrammatic.open(
            { component },
            "#my-cool-container",
        );

        // check element exist
        let sidebar = document.body.querySelector('[data-oruga="sidebar"]');
        expect(sidebar).not.toBeNull();

        expect(sidebar.innerHTML).toContain("Fancy Label");

        let bodyElements = document.body.querySelectorAll("body > *");
        expect(bodyElements).toHaveLength(1);

        // close element through handler
        close();
        vi.runAllTimers();

        // check element does not edist
        sidebar = document.body.querySelector('[data-oruga="sidebar"]');
        expect(sidebar).toBeNull();

        // check container still exists
        bodyElements = document.body.querySelectorAll("body > *");
        expect(bodyElements).toHaveLength(1);
    });

    test("test mounting with custom component correctly", async () => {
        const component = createVNode({
            template: `<button @click="$emit('close', 'abc')">Fancy Label</button>`,
        });

        // open element
        useSidebarProgrammatic.open({
            component,
            props: { "data-oruga": "programmatic" },
        });

        // check element exist
        let sidebar = document.body.querySelector('[data-oruga="sidebar"]');
        expect(sidebar).not.toBeNull();

        const button = sidebar.querySelector<HTMLElement>(
            '[data-oruga="programmatic"]',
        );
        expect(button).not.toBeNull();

        // close element on button click
        button.click();
        vi.runAllTimers();

        // check element does not edist
        sidebar = document.body.querySelector('[data-oruga="sidebar"]');
        expect(sidebar).toBeNull();
    });

    test("test close event working correctly", async () => {
        const component = createVNode({
            template: `<button @click="$emit('close', 'abc')">Fancy Label</button>`,
        });
        const onClose = vi.fn();

        // open element
        useSidebarProgrammatic.open({ component, onClose });

        // check element exist
        let el = document.body.querySelector<HTMLElement>("button");
        expect(el).not.toBeNull();

        // close element on 'x' button click
        el.click();
        vi.runAllTimers();

        // check element does not edist
        el = document.body.querySelector("button");
        expect(el).toBeNull();

        expect(onClose).toHaveBeenCalledOnce();
    });
});
