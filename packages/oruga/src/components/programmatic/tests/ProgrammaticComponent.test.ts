import {
    createVNode,
    defineComponent,
    h,
    markRaw,
    type Component,
    type VNode,
} from "vue";
import { describe, test, expect, afterEach, vi, type Mock } from "vitest";
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
        expect(closeEmits?.[0][0]).toBe("abc");
        const destroyEmits = wrapper.emitted("destroy");
        expect(destroyEmits).toHaveLength(1);

        expect(onClose).toHaveBeenCalledOnce();
        expect(onDestroy).toHaveBeenCalledOnce();

        vi.useRealTimers();
    });

    describe("test close delegation", () => {
        /**
         * Creates a component with an exposed `close` function, which does not emit `close` by itself.
         * @param deferredClose - whether the component defines the `deferredClose` option
         */
        function createCloseableComponent(deferredClose: boolean): {
            component: Component;
            close: Mock<(...args: unknown[]) => void>;
            emitClose: (...args: unknown[]) => void;
        } {
            const close = vi.fn<(...args: unknown[]) => void>();
            let emitClose: (...args: unknown[]) => void = () => {};
            const component = defineComponent({
                emits: ["close"],
                setup(_props, { expose, emit }) {
                    expose({ close });
                    emitClose = (...args) => emit("close", ...args);
                    return () => h("div");
                },
            });
            return {
                component: markRaw(
                    Object.assign(component, deferredClose && { deferredClose }),
                ),
                close,
                emitClose: (...args) => emitClose(...args),
            };
        }

        test("close is not delegated to a component without the deferredClose option", () => {
            const { component, close } = createCloseableComponent(false);
            const wrapper = mount(ProgrammaticComponent, {
                props: { component },
            });
            const handle =
                wrapper.vm as unknown as ProgrammaticComponentExpose<VNode>;

            handle.close("abc");

            // terminated right away, because the exposed close might not emit `close`
            expect(close).not.toHaveBeenCalled();
            expect(wrapper.emitted("close")).toHaveLength(1);
            expect(wrapper.emitted("close")![0]).toEqual(["abc"]);
        });

        test("close is delegated to the exposed close of a component with the deferredClose option", async () => {
            vi.useFakeTimers();

            const { component, close, emitClose } =
                createCloseableComponent(true);
            const onDestroy = vi.fn();
            const wrapper = mount(ProgrammaticComponent, {
                props: { component, onDestroy },
            });
            const handle =
                wrapper.vm as unknown as ProgrammaticComponentExpose<VNode>;

            const handler = vi.fn();
            void handle.promise.then(handler);

            handle.close("abc");
            vi.runAllTimers();
            await flushPromises();

            // delegated, but not terminated until the component emits `close`
            expect(close).toHaveBeenCalledOnce();
            expect(close).toHaveBeenCalledWith("abc");
            expect(wrapper.emitted("close")).toBeUndefined();
            expect(handler).not.toHaveBeenCalled();
            expect(onDestroy).not.toHaveBeenCalled();

            emitClose("abc");
            vi.runAllTimers();
            await flushPromises();

            expect(wrapper.emitted("close")).toHaveLength(1);
            expect(wrapper.emitted("close")![0]).toEqual(["abc"]);
            expect(handler).toHaveBeenCalledOnce();
            expect(wrapper.emitted("destroy")).toHaveLength(1);

            vi.useRealTimers();
        });

        test("close terminates a component without an exposed close", () => {
            const wrapper = mount(ProgrammaticComponent, {
                props: { component: markRaw({ template: `<div />` }) },
            });
            const handle =
                wrapper.vm as unknown as ProgrammaticComponentExpose<VNode>;

            handle.close("abc");

            expect(wrapper.emitted("close")).toHaveLength(1);
            expect(wrapper.emitted("close")![0]).toEqual(["abc"]);
        });

        test("close does not delegate to the native close of an element", () => {
            const wrapper = mount(ProgrammaticComponent, {
                props: { component: "dialog" },
            });
            const handle =
                wrapper.vm as unknown as ProgrammaticComponentExpose<VNode>;

            handle.close();

            expect(wrapper.emitted("close")).toHaveLength(1);
        });
    });

    test("test promise is called correctly", async () => {
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

    test("test instance registry is called correctly", () => {
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
