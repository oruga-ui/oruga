import {
    afterEach,
    beforeEach,
    describe,
    expect,
    test,
    vi,
    type MockInstance,
} from "vitest";
import { EffectScope, effectScope, nextTick, ref } from "vue";

import { useEventListener } from "../";

describe("useEventListener test", () => {
    let target: HTMLDivElement;
    let removeSpy: MockInstance;
    let addSpy: MockInstance;
    let listener: () => void;

    beforeEach(() => {
        target = document.createElement("div");
        removeSpy = vi.spyOn(target, "removeEventListener");
        addSpy = vi.spyOn(target, "addEventListener");
        listener = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });
    test("should be defined", () => {
        expect(useEventListener).toBeDefined();
    });

    describe("given event", () => {
        const event = "click";

        test("should add listener", () => {
            useEventListener(target, event, listener, {
                immediate: true,
            });

            expect(addSpy).toHaveBeenCalledTimes(1);
        });

        test("should trigger listener", () => {
            useEventListener(target, event, listener, {
                immediate: true,
            });

            expect(listener).not.toHaveBeenCalled();
            target.dispatchEvent(new PointerEvent(event));
            expect(listener).toHaveBeenCalledTimes(1);
        });

        test("should remove listener", () => {
            const stop = useEventListener(target, event, listener, {
                immediate: true,
            });

            expect(removeSpy).not.toHaveBeenCalled();
            stop();

            expect(removeSpy).toHaveBeenCalledTimes(1);
            expect(removeSpy).toHaveBeenCalledWith(event, listener, {
                immediate: true,
            });
        });
    });

    describe("reactive target", () => {
        let scope: EffectScope;
        const event = "click";
        const target = ref<HTMLDivElement | null>(
            document.createElement("div"),
        );

        beforeEach(() => {
            scope = effectScope();
            target.value = document.createElement("div");
        });

        test("should not listen when target is invalid", async () => {
            useEventListener(target, event, listener);
            const el = target.value;
            target.value = null;
            await nextTick();
            el?.dispatchEvent(new PointerEvent(event));
            await nextTick();

            expect(listener).toHaveBeenCalledTimes(0);
        });

        test(`should listen event`, async () => {
            useEventListener(target, event, listener, { immediate: true });
            target.value?.dispatchEvent(new PointerEvent(event));

            await nextTick();

            expect(listener).toHaveBeenCalledTimes(1);
        });

        test(`should manually stop listening event`, async () => {
            const stop = useEventListener(target, event, listener, {
                immediate: true,
            });
            stop();

            target.value?.dispatchEvent(new PointerEvent(event));

            await nextTick();

            expect(listener).toHaveBeenCalledTimes(0);
        });

        test(`should auto stop listening event`, async () => {
            scope.run(() => {
                useEventListener(target, event, listener, {
                    immediate: true,
                });
            });

            scope.stop();

            target.value?.dispatchEvent(new PointerEvent(event));

            await nextTick();

            expect(listener).toHaveBeenCalledTimes(0);
        });
    });

    test("should auto register on trigger", async () => {
        const trigger = ref(false);

        useEventListener(target, "click", listener, { trigger });

        expect(addSpy).toHaveBeenCalledTimes(0);

        trigger.value = true;
        await nextTick();

        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(addSpy).toHaveBeenLastCalledWith("click", listener, { trigger });
        expect(removeSpy).toHaveBeenCalledTimes(0);

        trigger.value = false;
        await nextTick();

        await nextTick();
        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).toHaveBeenLastCalledWith("click", listener, {
            trigger,
        });
    });
});
