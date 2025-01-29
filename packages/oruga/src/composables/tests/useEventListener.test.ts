import {
    afterEach,
    beforeEach,
    describe,
    expect,
    test,
    vi,
    type MockInstance,
} from "vitest";
import { effectScope, nextTick, ref, type Ref } from "vue";

import { useEventListener, type EventListenerOptions } from "../";

describe("useEventListener test", () => {
    const options: EventListenerOptions = { immediate: true };
    let stop: () => void;
    let target: HTMLDivElement;
    let removeSpy: MockInstance;
    let addSpy: MockInstance;
    let listener: () => void;

    beforeEach(() => {
        vi.useFakeTimers();
        target = document.createElement("div");
        removeSpy = vi.spyOn(target, "removeEventListener");
        addSpy = vi.spyOn(target, "addEventListener");
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("should be defined", () => {
        expect(useEventListener).toBeDefined();
    });

    describe("given event", () => {
        const event = "click";

        beforeEach(() => {
            listener = vi.fn();
        });

        test("should add listener", async () => {
            stop = useEventListener(target, event, listener, {
                immediate: true,
            });
            vi.runAllTimers();
            expect(addSpy).toBeCalledTimes(1);
        });

        test("should trigger listener", () => {
            stop = useEventListener(target, event, listener, {
                immediate: true,
            });
            vi.runAllTimers();
            expect(listener).not.toBeCalled();
            target.dispatchEvent(new MouseEvent(event));
            expect(listener).toBeCalledTimes(1);
        });

        test("should remove listener", () => {
            stop = useEventListener(target, event, listener, {
                immediate: true,
            });
            vi.runAllTimers();
            expect(removeSpy).not.toBeCalled();

            stop();

            expect(removeSpy).toBeCalledTimes(1);
            expect(removeSpy).toBeCalledWith(event, listener, options);
        });
    });

    describe("reactive target", () => {
        let target: Ref<HTMLDivElement | null>;

        beforeEach(() => {
            target = ref(document.createElement("div"));
        });

        test("should not listen when target is invalid", async () => {
            useEventListener(target, "click", listener);
            const el = target.value;
            target.value = null;
            await nextTick();
            el?.dispatchEvent(new MouseEvent("click"));
            await nextTick();

            expect(listener).toHaveBeenCalledTimes(0);
        });

        test(`should listen event`, async () => {
            useEventListener(target, "click", listener, { immediate: true });
            vi.runAllTimers();
            target.value!.dispatchEvent(new MouseEvent("click"));

            await nextTick();

            expect(listener).toHaveBeenCalledTimes(1);
        });

        test(`should manually stop listening event`, async () => {
            const stop = useEventListener(target, "click", listener, {
                immediate: true,
            });

            stop();

            target.value!.dispatchEvent(new MouseEvent("click"));

            await nextTick();

            expect(listener).toHaveBeenCalledTimes(0);
        });

        test(`should auto stop listening event`, async () => {
            const scope = effectScope();
            await scope.run(async () => {
                useEventListener(target, "click", listener, {
                    immediate: true,
                });
            });

            await scope.stop();

            target.value!.dispatchEvent(new MouseEvent("click"));

            await nextTick();

            expect(listener).toHaveBeenCalledTimes(0);
        });
    });

    test("should auto register on trigger", async () => {
        const trigger = ref(false);

        useEventListener(target, "click", listener, { trigger });

        vi.runAllTimers();
        expect(addSpy).toHaveBeenCalledTimes(0);

        trigger.value = true;
        await nextTick();
        vi.runAllTimers();

        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(addSpy).toHaveBeenLastCalledWith("click", listener, { trigger });
        expect(removeSpy).toHaveBeenCalledTimes(0);

        trigger.value = false;
        await nextTick();
        vi.runAllTimers();

        await nextTick();
        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).toHaveBeenLastCalledWith("click", listener, {
            trigger,
        });
    });
});
