import { createVNode } from "vue";
import { describe, test, expect, afterEach, vi, beforeEach } from "vitest";
import { enableAutoUnmount, flushPromises } from "@vue/test-utils";

import useDrawerProgrammatic from "../useDrawerProgrammatic";

describe("useDrawerProgrammatic tests", () => {
    // create a new factory
    const factory = useDrawerProgrammatic();

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
        const component = createVNode({
            template: `<button @click="$emit('close', 'abc')">Fancy Label</button>`,
        });

        // open element
        const { close, promise } = factory.open({ component, animation: false });

        // check promise get called
        const handler = vi.fn();
        promise.then(() => handler());
        expect(handler).not.toHaveBeenCalled();

        // check element exist
        let drawer = document.body.querySelector('[data-oruga="drawer"]');
        expect(drawer).not.toBeNull();

        expect(drawer?.innerHTML).toContain("Fancy Label");

        // close element through handler
        close();
        vi.runAllTimers();

        // check element does not exist
        drawer = document.body.querySelector('[data-oruga="drawer"]');
        expect(drawer).toBeNull();

        await flushPromises(); // await promise finished
        expect(handler).toHaveBeenCalledOnce();
    });

    test("test mounting with target correctly", () => {
        const container = document.createElement("div");
        container.id = "my-cool-container";
        document.body.appendChild(container);

        const component = createVNode({
            template: `<button @click="$emit('close', 'abc')">Fancy Label</button>`,
        });

        // open element
        const { close } = factory.open(
            { component, animation: false },
            "#my-cool-container",
        );

        // check element exist
        let drawer = document.body.querySelector('[data-oruga="drawer"]');
        expect(drawer).not.toBeNull();

        expect(drawer?.innerHTML).toContain("Fancy Label");

        let bodyElements = document.body.querySelectorAll("body > *");
        expect(bodyElements).toHaveLength(1);

        // close element through handler
        close();
        vi.runAllTimers();

        // check element does not exist
        drawer = document.body.querySelector('[data-oruga="drawer"]');
        expect(drawer).toBeNull();

        // check container still exists
        bodyElements = document.body.querySelectorAll("body > *");
        expect(bodyElements).toHaveLength(1);
    });

    test("test mounting with custom component correctly", () => {
        const component = createVNode({
            template: `<button @click="$emit('close', 'abc')">Fancy Label</button>`,
        });

        // open element
        factory.open({
            component,
            animation: false,
            props: { "data-oruga": "programmatic" },
        });

        // check element exist
        let drawer = document.body.querySelector('[data-oruga="drawer"]');
        expect(drawer).not.toBeNull();

        const button = drawer?.querySelector<HTMLElement>(
            '[data-oruga="programmatic"]',
        );
        expect(button).not.toBeNull();

        // close element on button click
        button?.click();
        vi.runAllTimers();

        // check element does not exist
        drawer = document.body.querySelector('[data-oruga="drawer"]');
        expect(drawer).toBeNull();
    });

    test("test close event working correctly", () => {
        const component = createVNode({
            template: `<button @click="$emit('close', 'ok')">Fancy Label</button>`,
        });
        const onClose = vi.fn();

        // open element
        factory.open({ component, animation: false, onClose });

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

        // the close event passes the native event and the return value of the dialog
        expect(onClose).toHaveBeenCalledOnce();
        expect(onClose.mock.calls[0][0]).toBeInstanceOf(Event);
    });

    test("test close event passes the return value of the injected component", () => {
        // keep the return value like a browser does
        vi.spyOn(HTMLDialogElement.prototype, "close").mockImplementation(
            function (this: HTMLDialogElement, returnValue?: string): void {
                if (returnValue !== undefined) this.returnValue = returnValue;
                this.open = false;
                this.dispatchEvent(new Event("close"));
            },
        );
        const component = createVNode({
            template: `<button @click="$emit('close', 'abc')">Fancy Label</button>`,
        });
        const onClose = vi.fn();

        factory.open({ component, animation: false, onClose });
        document.body.querySelector<HTMLElement>("button")?.click();
        vi.runAllTimers();

        expect(onClose).toHaveBeenCalledOnce();
        expect(onClose).toHaveBeenCalledWith(expect.any(Event), "abc");
    });

    test("test header, body and footer props", () => {
        const onConfirm = vi.fn();

        factory.open({
            title: "My Title",
            content: "My Content",
            confirmButton: "OK",
            animation: false,
            onConfirm,
        });

        const drawer = document.body.querySelector('[data-oruga="drawer"]');
        expect(drawer?.querySelector("h1")?.textContent?.trim()).toBe("My Title");
        expect(drawer?.textContent).toContain("My Content");

        drawer?.querySelector<HTMLElement>(".o-drawer__confirm-button")?.click();
        expect(onConfirm).toHaveBeenCalledOnce();
    });

    test("test opening as modal with a backdrop", () => {
        const showModal = vi.spyOn(HTMLDialogElement.prototype, "showModal");
        const show = vi.spyOn(HTMLDialogElement.prototype, "show");

        factory.open({ content: "Modal", backdrop: true, animation: false });

        expect(showModal).toHaveBeenCalledOnce();
        expect(show).not.toHaveBeenCalled();
    });

    test("test accessible name", () => {
        factory.open({ content: "Named", ariaLabel: "My Drawer", animation: false });

        const drawer = document.body.querySelector('[data-oruga="drawer"]');
        expect(drawer?.getAttribute("aria-label")).toBe("My Drawer");
    });

    test("test closing all instances", () => {
        factory.open({ content: "First", animation: false });
        factory.open({ content: "Second", animation: false });
        expect(factory.count()).toBe(2);

        factory.closeAll();
        vi.runAllTimers();

        expect(factory.count()).toBe(0);
        expect(document.body.querySelector('[data-oruga="drawer"]')).toBeNull();
    });
});
