import { createVNode, defineComponent, h, markRaw, type VNode } from "vue";
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

    test("render simple div correctly", () => {
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

    test("render slot correctly", () => {
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

    test("render complex component with props correctly", () => {
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

    test("render a component with an async setup function", async () => {
        const warn = vi.spyOn(console, "warn");

        let resolveSetup!: () => void;
        const pending = new Promise<void>((r) => (resolveSetup = r));

        const wrapper = mount(ProgrammaticComponent, {
            props: {
                component: markRaw(
                    defineComponent({
                        async setup() {
                            await pending;
                            return () => h("div", { id: "async-content" });
                        },
                    }),
                ),
            },
        });

        expect(wrapper.find("#async-content").exists()).toBeFalsy();

        resolveSetup();
        await flushPromises();

        expect(wrapper.find("#async-content").exists()).toBeTruthy();
        expect(warn).not.toHaveBeenCalled();

        warn.mockRestore();
    });

    test("close is called correctly", async () => {
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
        expect(closeEmits?.[0][0]).toBe("abc");
        const destroyEmits = wrapper.emitted("destroy");
        expect(destroyEmits).toHaveLength(1);

        expect(onClose).toHaveBeenCalledOnce();
        expect(onDestroy).toHaveBeenCalledOnce();

        vi.useRealTimers();
    });

    test("promise is called correctly", async () => {
        const wrapper = mount(ProgrammaticComponent, {
            props: {
                component: "div",
                props: { "data-oruga": "programmatic" },
            },
        });

        const component =
            wrapper.vm as unknown as ProgrammaticComponentExpose<VNode>;
        expect(component.promise).not.toBeUndefined();

        // check promise get called
        const handler = vi.fn();
        void component.promise.then(() => handler());
        expect(handler).not.toHaveBeenCalled();

        component.close(); // call close programmaticaly

        const closeEmits = wrapper.emitted("close");
        expect(closeEmits).toHaveLength(1);

        await flushPromises(); // await promise finished
        expect(handler).toHaveBeenCalledOnce();
    });

    test("instance registry is called correctly", () => {
        const instanceRegistry = new InstanceRegistry();

        expect(instanceRegistry.count()).toBe(0);

        const wrapper = mount(ProgrammaticComponent, {
            props: {
                component: "div",
                registry: instanceRegistry,
            },
        });

        expect(instanceRegistry.count()).toBe(1);

        wrapper.unmount();

        expect(instanceRegistry.count()).toBe(0);
    });
});
