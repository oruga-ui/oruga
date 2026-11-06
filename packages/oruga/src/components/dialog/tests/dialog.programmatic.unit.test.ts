import { createVNode } from "vue";
import { describe, test, expect, afterEach, vi, beforeEach } from "vitest";
import { enableAutoUnmount, flushPromises } from "@vue/test-utils";

import useDialogProgrammatic from "../useDialogProgrammatic";

describe("useDialogProgrammatic tests", () => {
    // create a new factory
    const factory = useDialogProgrammatic();

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(async () => {
        // clear factory items, while the timers are still faked
        // to have the leave animation and destroy timers of remaining instances finished
        factory.closeAll();
        await flushPromises();
        vi.runAllTimers();
        vi.useRealTimers();

        // clear body after each test
        document.body.innerHTML = "";
    });

    enableAutoUnmount(afterEach);

    test("test mounting component correctly", async () => {
        const content = "My Dialog Content";

        // open element
        const { close, promise } = factory.open(content);

        // check promise get called
        const handler = vi.fn();
        promise.then(() => handler());
        expect(handler).not.toHaveBeenCalled();

        // check element exist
        const dialog = document.body.querySelector('[data-oruga="dialog"]');
        expect(dialog).not.toBeNull();

        expect(dialog?.innerHTML).toContain(content);

        // close element through handler
        close();
        await flushPromises(); // wait for the leave animation
        vi.runAllTimers();

        // check element does not exist
        const dialogAgain = document.body.querySelector(
            '[data-oruga="dialog"]',
        );
        expect(dialogAgain).toBeNull();

        await flushPromises(); // await promise finished
        expect(handler).toHaveBeenCalledOnce();
    });

    test("test mounting with target correctly", async () => {
        const container = document.createElement("div");
        container.id = "my-cool-container";
        document.body.appendChild(container);

        const content = "My Dialog Content";

        // open element
        const { close } = factory.open(content, "#my-cool-container");

        // check element exist
        const dialog = document.body.querySelector('[data-oruga="dialog"]');
        expect(dialog).not.toBeNull();

        let bodyElements = document.body.querySelectorAll("body > *");
        expect(bodyElements).toHaveLength(1);

        // close element through handler
        close();
        await flushPromises(); // wait for the leave animation
        vi.runAllTimers();

        // check element does not exist
        const dialogAgain = document.body.querySelector(
            '[data-oruga="dialog"]',
        );
        expect(dialogAgain).toBeNull();

        // check container still exists
        bodyElements = document.body.querySelectorAll("body > *");
        expect(bodyElements).toHaveLength(1);
    });

    test("test mounting with custom component correctly", async () => {
        const onClose = vi.fn();

        const component = createVNode({
            template: `<button @click="$emit('close', 'abc')">Fancy Label</button>`,
        });

        // open element
        factory.open({
            component,
            onClose,
            props: { "data-oruga": "programmatic" },
        });

        // check element exist
        const dialog = document.body.querySelector('[data-oruga="dialog"]');
        expect(dialog).not.toBeNull();

        const button = dialog?.querySelector<HTMLElement>(
            '[data-oruga="programmatic"]',
        );
        expect(button).not.toBeNull();

        // close element on button click
        button?.click();
        await flushPromises(); // wait for the leave animation
        vi.runAllTimers();

        // check element does not exist
        const dialogAgain = document.body.querySelector(
            '[data-oruga="dialog"]',
        );
        expect(dialogAgain).toBeNull();

        expect(onClose).toHaveBeenCalledOnce();
    });

    test("test internal close (x) event working correctly", async () => {
        const content = "My Dialog Content";
        const onClose = vi.fn();

        // open element
        factory.open({ content, closeable: true, onClose });

        // check element exist
        let el = document.body.querySelector<HTMLElement>(
            '[data-oruga="close"]',
        );
        expect(el).not.toBeNull();

        // close element on 'x' button click
        el?.click();
        await flushPromises(); // wait for the leave animation
        vi.runAllTimers();

        // check element does not exist
        el = document.body.querySelector('[data-oruga="close"]');
        expect(el).toBeNull();

        expect(onClose).toHaveBeenCalledOnce();
    });

    test("test external close event working correctly", async () => {
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
        await flushPromises(); // wait for the leave animation
        vi.runAllTimers();

        expect(factory.count()).toBe(0);

        // check element does not exist
        el = document.body.querySelector("button");
        expect(el).toBeNull();

        expect(onClose).toHaveBeenCalledOnce();
    });

    describe("closing through the handle", () => {
        /** Replaces the animation by an animation which is finished manually. */
        function mockPendingAnimation(): { finish: () => void } {
            let finish = (): void => {};
            vi.spyOn(HTMLElement.prototype, "animate").mockImplementation(
                () => {
                    const animation = {
                        playState: "running",
                        playbackRate: 1,
                        finished: new Promise<void>((resolve) => {
                            finish = resolve;
                        }),
                        reverse: () => {
                            animation.playbackRate *= -1;
                        },
                        cancel: vi.fn(),
                    };
                    return animation as unknown as Animation;
                },
            );
            return { finish: () => finish() };
        }

        test("the leave animation is played before the dialog is destroyed", async () => {
            const { finish } = mockPendingAnimation();
            const onClose = vi.fn();

            const { close, promise } = factory.open({
                content: "My Dialog Content",
                onClose,
            });
            const dialog = document.body.querySelector<HTMLDialogElement>(
                '[data-oruga="dialog"]',
            );
            expect(dialog).not.toBeNull();

            close();
            await flushPromises();
            vi.runAllTimers();

            // still rendered and open while the leave animation is playing
            expect(
                document.body.querySelector('[data-oruga="dialog"]'),
            ).not.toBeNull();
            expect(dialog?.open).toBe(true);
            expect(onClose).not.toHaveBeenCalled();

            finish();
            await flushPromises();
            vi.runAllTimers();

            expect(
                document.body.querySelector('[data-oruga="dialog"]'),
            ).toBeNull();
            expect(factory.count()).toBe(0);
            // the close event is emitted only once
            expect(onClose).toHaveBeenCalledOnce();
            await expect(promise).resolves.toBeDefined();
        });

        test("closing again during the leave animation does not close twice", async () => {
            const { finish } = mockPendingAnimation();
            const onClose = vi.fn();

            const { close } = factory.open({ content: "Content", onClose });

            close();
            close();
            factory.closeAll();
            finish();
            await flushPromises();
            vi.runAllTimers();

            expect(onClose).toHaveBeenCalledOnce();
            expect(factory.count()).toBe(0);
        });
    });
});
