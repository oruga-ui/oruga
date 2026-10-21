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

        test.each<{ name: AnimationName; from: string }>([
            { name: "slide-from-left", from: "translateX(-100%)" },
            { name: "slide-from-right", from: "translateX(100%)" },
            { name: "slide-from-top", from: "translateY(-100%)" },
            { name: "slide-from-bottom", from: "translateY(100%)" },
        ])("should slide in from the edge with $name", ({ name, from }) => {
            const el = document.createElement("div");
            const animateSpy = vi.spyOn(el, "animate");
            const { play } = useAnimationsAPI();

            play(el, name, true);

            const [keyframes] = animateSpy.mock.calls[0];
            expect(keyframes).toHaveLength(2);
            expect((keyframes as Keyframe[])[0].transform).toBe(from);
            expect((keyframes as Keyframe[])[1].transform).toMatch(/translate[XY]\(0\)/);
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

    describe("play with backdrop", () => {
        function fakeAnimation(): Animation & {
            playState: string;
            reverse: ReturnType<typeof vi.fn>;
            cancel: ReturnType<typeof vi.fn>;
        } {
            return {
                playState: "running",
                finished: Promise.resolve(),
                reverse: vi.fn(),
                cancel: vi.fn(),
            } as unknown as Animation & {
                playState: string;
                reverse: ReturnType<typeof vi.fn>;
                cancel: ReturnType<typeof vi.fn>;
            };
        }

        /** spy on `animate` and collect the created animations */
        function spyAnimate(el: HTMLElement): {
            animateSpy: ReturnType<typeof vi.spyOn>;
            animations: ReturnType<typeof fakeAnimation>[];
        } {
            const animations: ReturnType<typeof fakeAnimation>[] = [];
            const animateSpy = vi.spyOn(el, "animate").mockImplementation(() => {
                const animation = fakeAnimation();
                animations.push(animation);
                return animation;
            });
            return { animateSpy, animations };
        }

        test("should not animate the backdrop by default", () => {
            const el = document.createElement("div");
            const { animateSpy } = spyAnimate(el);
            const { play } = useAnimationsAPI();

            play(el, "fade", true);

            expect(animateSpy).toHaveBeenCalledTimes(1);
        });

        test("should fade the ::backdrop with the timing of the preset", () => {
            const el = document.createElement("div");
            const { animateSpy } = spyAnimate(el);
            const { play } = useAnimationsAPI();

            play(el, "slide-from-left", true, true);

            expect(animateSpy).toHaveBeenCalledTimes(2);
            const [keyframes, options] = animateSpy.mock.calls[1];
            // fades from / to the style which is defined by the theme
            expect(keyframes).toEqual([{ opacity: 0 }]);
            expect(options).toMatchObject({
                pseudoElement: "::backdrop",
                duration: 250,
                fill: "both",
            });
        });

        test("should reverse the backdrop animation when closing", () => {
            const el = document.createElement("div");
            const { animations } = spyAnimate(el);
            const { play } = useAnimationsAPI();

            play(el, "fade", false, true);

            expect(animations).toHaveLength(2);
            expect(animations[0].reverse).toHaveBeenCalledTimes(1);
            expect(animations[1].reverse).toHaveBeenCalledTimes(1);
        });

        test("should reverse both animations when interrupted", () => {
            const el = document.createElement("div");
            const { animateSpy, animations } = spyAnimate(el);
            const { play } = useAnimationsAPI();

            play(el, "fade", true, true);
            play(el, "fade", false, true);

            expect(animateSpy).toHaveBeenCalledTimes(2);
            expect(animations[0].reverse).toHaveBeenCalledTimes(1);
            expect(animations[1].reverse).toHaveBeenCalledTimes(1);
        });

        test("should cancel both finished animations before starting new ones", () => {
            const el = document.createElement("div");
            const { animateSpy, animations } = spyAnimate(el);
            const { play } = useAnimationsAPI();

            play(el, "fade", true, true);
            animations.forEach((animation) => (animation.playState = "finished"));
            play(el, "fade", true, true);

            expect(animations[0].cancel).toHaveBeenCalledTimes(1);
            expect(animations[1].cancel).toHaveBeenCalledTimes(1);
            expect(animateSpy).toHaveBeenCalledTimes(4);
        });

        test("should still animate the element when the backdrop is not supported", async () => {
            const el = document.createElement("div");
            const main = fakeAnimation();
            const animateSpy = vi
                .spyOn(el, "animate")
                .mockImplementation((_keyframes, options) => {
                    if ((options as KeyframeAnimationOptions).pseudoElement)
                        throw new DOMException("unsupported", "SyntaxError");
                    return main;
                });
            const { play } = useAnimationsAPI();

            await expect(play(el, "fade", true, true)).resolves.toBeUndefined();

            expect(animateSpy).toHaveBeenCalledTimes(2);
        });
    });
});
