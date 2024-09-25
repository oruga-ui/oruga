import { createVNode, markRaw } from "vue";
import { describe, test, expect, afterEach, vi } from "vitest";
import { enableAutoUnmount, flushPromises, mount } from "@vue/test-utils";

import { OModal } from "@/components/modal";

import InstanceRegistry from "../InstanceRegistry";
import {
    ProgrammaticComponent,
    type ProgrammaticComponentExpose,
} from "../ProgrammaticComponent";

describe("ProgrammaticComponent tests", () => {
    enableAutoUnmount(afterEach);

    test("test render simple div correctly", () => {
        const wrapper = mount(ProgrammaticComponent, {
            props: {
                component: "div",
                props: { "data-oruga": "programmatic" },
            },
        });

        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        const element = wrapper.find('[data-oruga="programmatic"]');
        expect(element.exists()).toBeTruthy();
    });

    test("test render slot correctly", () => {
        const wrapper = mount(ProgrammaticComponent, {
            props: {
                component: createVNode({
                    template: `<div><slot /></div>`,
                }),
                props: { "data-oruga": "programmatic" },
            },
            slots: {
                default: `<p data-oruga="inner-slot">HELP</p>`,
            },
        });

        const element = wrapper.find('[data-oruga="programmatic"]');
        expect(element.exists()).toBeTruthy();
        const inner = wrapper.find('[data-oruga="inner-slot"]');
        expect(inner.exists()).toBeTruthy();
    });

    test("test render complex component with props correctly", () => {
        const content = "This is my content";
        const wrapper = mount(ProgrammaticComponent, {
            props: {
                component: markRaw(OModal),
                props: { content },
            },
        });

        const model = wrapper.find('[data-oruga="modal"]');
        expect(model.exists()).toBeTruthy();
        expect(model.text()).toBe(content);
    });

    test("test close is called correctly", async () => {
        vi.useFakeTimers();

        const onClose = vi.fn();
        const onDestroy = vi.fn();
        const wrapper = mount(ProgrammaticComponent, {
            props: {
                component: createVNode({
                    template: `<button @click="$emit('close', 'abc')"></button>`,
                }),
                props: { "data-oruga": "programmatic" },
                onClose,
                onDestroy,
            },
        });

        const button = wrapper.find("button");
        await button.trigger("click");

        vi.runAllTimers();

        const closeEmits = wrapper.emitted("close");
        expect(closeEmits).toHaveLength(1);
        expect(closeEmits[0][0]).toBe("abc");
        const destroyEmits = wrapper.emitted("destroy");
        expect(destroyEmits).toHaveLength(1);

        expect(onClose).toHaveBeenCalledOnce();
        expect(onDestroy).toHaveBeenCalledOnce();

        vi.useRealTimers();
    });

    test("test promise is called correctly", async () => {
        const wrapper = mount(ProgrammaticComponent, {
            props: {
                component: "div",
                props: { "data-oruga": "programmatic" },
            },
        });

        const component = wrapper.vm as unknown as ProgrammaticComponentExpose;
        expect(component.promise).not.toBeUndefined();

        // check promise get called
        const handler = vi.fn();
        component.promise.then(() => handler());
        expect(handler).not.toHaveBeenCalled();

        component.close(); // call close programmaticaly

        const closeEmits = wrapper.emitted("close");
        expect(closeEmits).toHaveLength(1);

        await flushPromises(); // await promise finished
        expect(handler).toHaveBeenCalledOnce();
    });

    test("test instance registry is called correctly", async () => {
        const instanceRegistry = new InstanceRegistry();

        expect(instanceRegistry.entries).toHaveLength(0);

        const wrapper = mount(ProgrammaticComponent, {
            props: {
                component: "div",
                instances: instanceRegistry,
            },
        });

        expect(instanceRegistry.entries).toHaveLength(1);

        wrapper.unmount();

        expect(instanceRegistry.entries).toHaveLength(0);
    });
});
