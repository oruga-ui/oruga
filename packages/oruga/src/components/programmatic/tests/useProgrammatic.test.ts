import { createVNode, h } from "vue";
import { describe, test, expect, afterEach, vi, beforeEach } from "vitest";
import { enableAutoUnmount, flushPromises } from "@vue/test-utils";

import InstanceRegistry from "../InstanceRegistry";
import useProgrammatic from "../useProgrammatic";

describe("useProgrammatic tests", () => {
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
            template: `<button id="mycomp"></button>`,
        });

        // open element
        const { close, promise } = useProgrammatic.open(component);

        // check promise get called
        const handler = vi.fn();
        promise.then(() => handler());
        expect(handler).not.toHaveBeenCalled();

        // check element exist
        let el = document.body.querySelector("#mycomp");
        expect(el).not.toBeNull();

        // close element through handler
        close();
        vi.runAllTimers();

        // check element does not edist
        el = document.body.querySelector("#mycomp");
        expect(el).toBeNull();

        await flushPromises(); // await promise finished
        expect(handler).toHaveBeenCalledOnce();
    });

    test("test mounting with target correctly", async () => {
        const container = document.createElement("div");
        container.id = "my-cool-container";
        document.body.appendChild(container);

        const component = createVNode({
            template: `<button id="mycomp"></button>`,
        });

        // open element
        const { close } = useProgrammatic.open(component, {
            target: "#my-cool-container",
        });

        // check element exist
        let el = document.body.querySelector("#mycomp");
        expect(el).not.toBeNull();

        let bodyElements = document.body.querySelectorAll("body > *");
        expect(bodyElements).toHaveLength(1);

        // close element through handler
        close();
        vi.runAllTimers();

        // check element does not edist
        el = document.body.querySelector("#mycomp");
        expect(el).toBeNull();

        // check container still exists
        bodyElements = document.body.querySelectorAll("body > *");
        expect(bodyElements).toHaveLength(1);
    });

    test("test close event working correctly", async () => {
        const component = createVNode({
            template: `<button id="mycomp" @click="$emit('close', 'abc')"></button>`,
        });

        const onClose = vi.fn();

        // open element
        useProgrammatic.open(component, { onClose });

        // check element exist
        let el = document.body.querySelector("button");
        expect(el).not.toBeNull();

        // close element through click
        el.click();
        vi.runAllTimers();

        // check element does not edist
        el = document.body.querySelector("button");
        expect(el).toBeNull();

        expect(onClose).toHaveBeenCalledOnce();
    });

    test("test props working correctly", async () => {
        const component = createVNode({
            template: `<button id="mycomp"></button>`,
        });

        // open element
        const { close } = useProgrammatic.open(component, {
            props: { "data-oruga": "programmatic" },
        });

        // check element exist

        let el = document.body.querySelector<HTMLButtonElement>(
            '[data-oruga="programmatic"]',
        );
        expect(el).not.toBeNull();

        // close element through click
        close();
        vi.runAllTimers();

        // check element does not edist
        el = document.body.querySelector<HTMLButtonElement>(
            '[data-oruga="programmatic"]',
        );
        expect(el).toBeNull();
    });

    test("test using custom instance registry", async () => {
        const instanceRegistry = new InstanceRegistry();

        expect(instanceRegistry.entries).toHaveLength(0);

        const { close } = useProgrammatic.open("div", {
            instances: instanceRegistry,
        });

        expect(instanceRegistry.entries).toHaveLength(1);

        close();
        vi.runAllTimers();

        expect(instanceRegistry.entries).toHaveLength(0);
    });

    test("test closeAll is working correctly", async () => {
        // open elements
        useProgrammatic.open("div");
        useProgrammatic.open("div");

        let bodyElements = document.body.querySelectorAll("*");
        expect(bodyElements).toHaveLength(2);

        // close all elements
        useProgrammatic.closeAll();
        vi.runAllTimers();

        bodyElements = document.body.querySelectorAll("*");
        expect(bodyElements).toHaveLength(0);
    });

    test("test close last is working correctly", async () => {
        // open elements
        useProgrammatic.open("div");
        useProgrammatic.open("div");

        let bodyElements = document.body.querySelectorAll("*");
        expect(bodyElements).toHaveLength(2);

        // close last element
        useProgrammatic.close();
        vi.runAllTimers();

        bodyElements = document.body.querySelectorAll("*");
        expect(bodyElements).toHaveLength(1);

        // close last element
        useProgrammatic.close();
        vi.runAllTimers();

        bodyElements = document.body.querySelectorAll("*");
        expect(bodyElements).toHaveLength(0);
    });

    test("test render slot correctly", async () => {
        const component = createVNode({
            template: `<button id="mycomp"><slot /></button>`,
        });

        // create inner slot element
        const slot = h("p", { "data-oruga": "inner-slot" }, "HELP");

        // open elements
        const { close } = useProgrammatic.open(component, {}, slot);

        // check element exist
        const button = document.body.querySelector("button");
        expect(button).not.toBeNull();

        // check if slot element exist
        expect(button.innerHTML).toBe(`<p data-oruga="inner-slot">HELP</p>`);
        const innerSlot = document.body.querySelector(
            '[data-oruga="inner-slot"]',
        );
        expect(innerSlot).not.toBeNull();

        // close element
        close();
        vi.runAllTimers();
    });
});
