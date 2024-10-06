import { createVNode } from "vue";
import { describe, test, expect, afterEach, vi, beforeEach } from "vitest";
import { enableAutoUnmount, flushPromises } from "@vue/test-utils";

import useModalProgrammatic from "../useModalProgrammatic";

describe("useModalProgrammatic tests", () => {
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
        const content = "My Modal Content";

        // open element
        const { close, promise } = useModalProgrammatic.open(content);

        // check promise get called
        const handler = vi.fn();
        promise.then(() => handler());
        expect(handler).not.toHaveBeenCalled();

        // check element exist
        let modal = document.body.querySelector('[data-oruga="modal"]');
        expect(modal).not.toBeNull();

        expect(modal?.innerHTML).toContain(content);

        // close element through handler
        close();
        vi.runAllTimers();

        // check element does not edist
        modal = document.body.querySelector('[data-oruga="modal"]');
        expect(modal).toBeNull();

        await flushPromises(); // await promise finished
        expect(handler).toHaveBeenCalledOnce();
    });

    test("test mounting with target correctly", async () => {
        const container = document.createElement("div");
        container.id = "my-cool-container";
        document.body.appendChild(container);

        const content = "My Modal Content";

        // open element
        const { close } = useModalProgrammatic.open(
            content,
            "#my-cool-container",
        );

        // check element exist
        let modal = document.body.querySelector('[data-oruga="modal"]');
        expect(modal).not.toBeNull();

        let bodyElements = document.body.querySelectorAll("body > *");
        expect(bodyElements).toHaveLength(1);

        // close element through handler
        close();
        vi.runAllTimers();

        // check element does not edist
        modal = document.body.querySelector('[data-oruga="modal"]');
        expect(modal).toBeNull();

        // check container still exists
        bodyElements = document.body.querySelectorAll("body > *");
        expect(bodyElements).toHaveLength(1);
    });

    test("test mounting with custom component correctly", async () => {
        const component = createVNode({
            template: `<button @click="$emit('close', 'abc')">Fancy Label</button>`,
        });

        // open element
        useModalProgrammatic.open({
            component,
            props: { "data-oruga": "programmatic" },
        });

        // check element exist
        let modal = document.body.querySelector('[data-oruga="modal"]');
        expect(modal).not.toBeNull();

        const button = modal!.querySelector<HTMLElement>(
            '[data-oruga="programmatic"]',
        );
        expect(button).not.toBeNull();

        // close element on button click
        button!.click();
        vi.runAllTimers();

        // check element does not edist
        modal = document.body.querySelector('[data-oruga="modal"]');
        expect(modal).toBeNull();
    });

    test("test close event working correctly", async () => {
        const content = "My Modal Content";
        const onClose = vi.fn();

        // open element
        useModalProgrammatic.open({ content, onClose });

        // check element exist
        let el = document.body.querySelector<HTMLElement>(".o-icon");
        expect(el).not.toBeNull();

        // close element on 'x' button click
        el!.click();
        vi.runAllTimers();

        // check element does not edist
        el = document.body.querySelector("button");
        expect(el).toBeNull();

        expect(onClose).toHaveBeenCalledOnce();
    });
});
