import { describe, expect, test, vi } from "vitest";

import { useAnimationsAPI, type AnimationName } from "..";

function mockReducedMotion(matches: boolean): void {
    vi.spyOn(window, "matchMedia").mockImplementation(
        (query) =>
            ({
                matches,
                media: query,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            }) as unknown as MediaQueryList,
    );
}

describe("useAnimationsAPI test", () => {
    test("should be defined", () => {
        expect(useAnimationsAPI).toBeDefined();
    });

    describe("canPlay", () => {
        test("should return false when the element has no `animate` function", () => {
            const { canPlay } = useAnimationsAPI();
            expect(canPlay({} as HTMLElement, "fade")).toBe(false);
        });

        test("should return false when no preset name is given", () => {
            const { canPlay } = useAnimationsAPI();
            const el = document.createElement("div");
            expect(canPlay(el, false)).toBe(false);
            expect(canPlay(el, undefined)).toBe(false);
        });

        test("should return false when the given preset name is unknown", () => {
            const { canPlay } = useAnimationsAPI();
            const el = document.createElement("div");
            expect(canPlay(el, "not-a-preset" as AnimationName)).toBe(false);
        });

        test("should return false when the user prefers reduced motion", () => {
            mockReducedMotion(true);
            const { canPlay } = useAnimationsAPI();
            const el = document.createElement("div");
            expect(canPlay(el, "fade")).toBe(false);
        });

        test("should return true for a valid element and preset", () => {
            mockReducedMotion(false);
            const { canPlay } = useAnimationsAPI();
            const el = document.createElement("div");
            expect(canPlay(el, "fade")).toBe(true);
        });
    });

    describe("play", () => {
        test("should resolve immediately without animating when it cannot play", async () => {
            const el = document.createElement("div");
            const animateSpy = vi.spyOn(el, "animate");
            const { play } = useAnimationsAPI();

            await expect(play(el, false, true)).resolves.toBeUndefined();
            expect(animateSpy).not.toHaveBeenCalled();
        });

        test("should animate the element with the resolved preset", () => {
            const el = document.createElement("div");
            const animateSpy = vi.spyOn(el, "animate");
            const { play } = useAnimationsAPI();

            play(el, "fade", true);

            expect(animateSpy).toHaveBeenCalledTimes(1);
            const [keyframes, options] = animateSpy.mock.calls[0];
            expect(keyframes).toEqual([{ opacity: 0 }, { opacity: 1 }]);
            expect(options).toMatchObject({ fill: "both" });
        });

        test("should reverse the playback direction when closing", () => {
            const el = document.createElement("div");
            const reverseSpy = vi.fn();
            vi.spyOn(el, "animate").mockReturnValue({
                playState: "running",
                finished: Promise.resolve(),
                reverse: reverseSpy,
                cancel: vi.fn(),
            } as unknown as Animation);
            const { play } = useAnimationsAPI();

            play(el, "fade", false);

            expect(reverseSpy).toHaveBeenCalledTimes(1);
        });

        test("should resolve once the animation has finished", async () => {
            const el = document.createElement("div");
            const { play } = useAnimationsAPI();

            const animateSpy = vi.spyOn(el, "animate");
            const result = play(el, "fade", true);
            const animation = animateSpy.mock.results[0].value as Animation & {
                playState: string;
            };

            expect(animation.playState).toBe("running");
            await result;
            expect(animation.playState).toBe("finished");
        });

        test("should reverse an in-flight animation instead of starting a new one", () => {
            const el = document.createElement("div");
            const animateSpy = vi.spyOn(el, "animate");
            const { play } = useAnimationsAPI();

            play(el, "fade", true); // starts, still "running" synchronously
            const first = animateSpy.mock.results[0].value as Animation;
            const reverseSpy = vi.spyOn(first, "reverse");

            play(el, "fade", false); // interrupts before it finished

            expect(animateSpy).toHaveBeenCalledTimes(1);
            expect(reverseSpy).toHaveBeenCalledTimes(1);
        });

        test("should cancel a finished animation before starting a new one", async () => {
            const el = document.createElement("div");
            const animateSpy = vi.spyOn(el, "animate");
            const { play } = useAnimationsAPI();

            await play(el, "fade", true);
            const first = animateSpy.mock.results[0].value as Animation;
            const cancelSpy = vi.spyOn(first, "cancel");

            play(el, "fade", true);

            expect(cancelSpy).toHaveBeenCalledTimes(1);
            expect(animateSpy).toHaveBeenCalledTimes(2);
        });

        test("should swallow a rejection from a cancelled animation", async () => {
            const el = document.createElement("div");
            vi.spyOn(el, "animate").mockReturnValue({
                playState: "running",
                finished: Promise.reject(
                    new DOMException("aborted", "AbortError"),
                ),
                reverse: vi.fn(),
                cancel: vi.fn(),
            } as unknown as Animation);
            const { play } = useAnimationsAPI();

            await expect(play(el, "fade", true)).resolves.toBeUndefined();
        });
    });
});
