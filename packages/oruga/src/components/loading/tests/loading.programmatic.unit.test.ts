import { describe, test, expect, afterEach, vi, beforeEach } from "vitest";
import { enableAutoUnmount, flushPromises } from "@vue/test-utils";

import useLoadingProgrammatic from "../useLoadingProgrammatic";

describe("useLoadingProgrammatic tests", () => {
    // create a new factory
    const factory = useLoadingProgrammatic();

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

    test("test mounting component correctly", async () => {
        const label = "My Label";

        // open element
        const { close, promise } = factory.open(label);

        // check promise get called
        const handler = vi.fn();
        promise.then(() => handler());
        expect(handler).not.toHaveBeenCalled();

        // check element exist
        let loading = document.body.querySelector('[data-oruga="loading"]');
        expect(loading).not.toBeNull();

        // close element through handler
        close();
        vi.runAllTimers();

        // check element does not exist
        loading = document.body.querySelector('[data-oruga="loading"]');
        expect(loading).toBeNull();

        await flushPromises(); // await promise finished
        expect(handler).toHaveBeenCalledOnce();
    });

    test("test mounting with target correctly", async () => {
        const container = document.createElement("div");
        container.id = "my-cool-container";
        document.body.appendChild(container);

        const label = "My loading Content";

        // open element
        const { close } = factory.open(label, "#my-cool-container");

        // check element exist
        let loading = document.body.querySelector('[data-oruga="loading"]');
        expect(loading).not.toBeNull();

        let bodyElements = document.body.querySelectorAll("body > *");
        expect(bodyElements).toHaveLength(1);

        // close element through handler
        close();
        vi.runAllTimers();

        // check element does not exist
        loading = document.body.querySelector('[data-oruga="loading"]');
        expect(loading).toBeNull();

        // check container still exists
        bodyElements = document.body.querySelectorAll("body > *");
        expect(bodyElements).toHaveLength(1);
    });

    test("test mounting with custom component correctly", async () => {
        const label = "My loading Content";

        // open element
        const { close } = factory.open({
            label,
            active: false,
        });

        // check element exist
        let loading = document.body.querySelector('[data-oruga="loading"]');
        expect(loading).toBeNull();

        // close element on button click
        close();
        vi.runAllTimers();

        // check element does not exist
        loading = document.body.querySelector('[data-oruga="loading"]');
        expect(loading).toBeNull();
    });

    test("test close event working correctly", async () => {
        const label = "My loading Content";
        const onClose = vi.fn();

        // open element
        const { close } = factory.open({ label, onClose });

        expect(factory.count()).toBe(1);

        // check element exist
        let loading = document.body.querySelector<HTMLElement>(
            '[data-oruga="loading"]',
        );
        expect(loading).not.toBeNull();

        expect(loading?.innerHTML).toContain(label);

        // close element on 'x' button click
        close();
        vi.runAllTimers();

        expect(factory.count()).toBe(0);

        // check element does not exist
        loading = document.body.querySelector('[data-oruga="loading"]');
        expect(loading).toBeNull();

        expect(onClose).toHaveBeenCalledOnce();
    });
});
