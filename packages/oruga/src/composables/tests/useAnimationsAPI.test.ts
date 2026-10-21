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

        test("should animate the `zoom-in` preset from a smaller size", () => {
            const el = document.createElement("div");
            const animateSpy = vi.spyOn(el, "animate");
            const { play } = useAnimationsAPI();

            play(el, "zoom-in", true);

            const [keyframes] = animateSpy.mock.calls[0];
            expect(keyframes).toEqual([
                { opacity: 0, transform: "scale(0.85)" },
                { opacity: 1, transform: "scale(1)" },
            ]);
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

    /** A fake animation with a manually resolved `finished` promise and a direction which follows `reverse`. */
    function createFakeAnimation(): Animation & { finish: () => void } {
        let finish = (): void => {};
        const animation = {
            playState: "running",
            playbackRate: 1,
            finished: new Promise<void>((resolve) => {
                finish = () => {
                    animation.playState = "finished";
                    resolve();
                };
            }),
            reverse: vi.fn(() => {
                animation.playbackRate *= -1;
            }),
            cancel: vi.fn(),
            finish: () => finish(),
        };
        return animation as unknown as Animation & { finish: () => void };
    }

    describe("release of the opening animation", () => {
        test("should cancel the animation once it has finished opening", async () => {
            const el = document.createElement("div");
            const animation = createFakeAnimation();
            vi.spyOn(el, "animate").mockReturnValue(animation);
            const { play } = useAnimationsAPI();

            const result = play(el, "fade", true);
            expect(animation.cancel).not.toHaveBeenCalled();

            animation.finish();
            await result;

            expect(animation.cancel).toHaveBeenCalledTimes(1);
        });

        test("should keep the end state of a closing animation", async () => {
            const el = document.createElement("div");
            const animation = createFakeAnimation();
            vi.spyOn(el, "animate").mockReturnValue(animation);
            const { play } = useAnimationsAPI();

            const result = play(el, "fade", false);
            animation.finish();
            await result;

            expect(animation.cancel).not.toHaveBeenCalled();
        });

        test("should keep the end state when an opening animation got reversed", async () => {
            const el = document.createElement("div");
            const animation = createFakeAnimation();
            vi.spyOn(el, "animate").mockReturnValue(animation);
            const { play } = useAnimationsAPI();

            play(el, "fade", true);
            const result = play(el, "fade", false); // reverses the in-flight animation
            animation.finish();
            await result;

            expect(animation.cancel).not.toHaveBeenCalled();
        });

        test("should release the animation when a closing got reversed back to opening", async () => {
            const el = document.createElement("div");
            const animation = createFakeAnimation();
            vi.spyOn(el, "animate").mockReturnValue(animation);
            const { play } = useAnimationsAPI();

            play(el, "fade", false);
            const result = play(el, "fade", true); // reverses the in-flight animation
            animation.finish();
            await result;

            expect(animation.cancel).toHaveBeenCalledTimes(1);
        });

        test("should start a new animation after the opening animation was released", async () => {
            const el = document.createElement("div");
            const opening = createFakeAnimation();
            const closing = createFakeAnimation();
            const animateSpy = vi
                .spyOn(el, "animate")
                .mockReturnValueOnce(opening)
                .mockReturnValueOnce(closing);
            const { play } = useAnimationsAPI();

            const result = play(el, "fade", true);
            opening.finish();
            await result;

            play(el, "fade", false);

            // the released animation must not be reversed, because it has been cancelled
            expect(opening.reverse).not.toHaveBeenCalled();
            expect(animateSpy).toHaveBeenCalledTimes(2);
            expect(closing.reverse).toHaveBeenCalledTimes(1);
        });
    });
});
