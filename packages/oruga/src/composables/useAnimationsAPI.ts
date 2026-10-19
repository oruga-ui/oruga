import { prefersReducedMotion } from "@/utils/helpers";

/** Built-in open/close animation presets, played via the Web Animations API. */
export type AnimationName =
    | "fade"
    | "scale"
    | "zoom-out"
    | "slide-up"
    | "slide-down";

const ANIMATION_PRESETS: Record<
    AnimationName,
    { keyframes: Keyframe[]; options: KeyframeAnimationOptions }
> = {
    fade: {
        keyframes: [{ opacity: 0 }, { opacity: 1 }],
        options: { duration: 150, easing: "ease-out", fill: "both" },
    },
    scale: {
        keyframes: [
            { opacity: 0, transform: "scale(0.95)" },
            { opacity: 1, transform: "scale(1)" },
        ],
        options: { duration: 150, easing: "ease-out", fill: "both" },
    },
    "zoom-out": {
        keyframes: [
            { opacity: 0, transform: "scale(1.15)" },
            { opacity: 1, transform: "scale(1)" },
        ],
        options: { duration: 150, easing: "ease-out", fill: "both" },
    },
    "slide-up": {
        keyframes: [
            { opacity: 0, transform: "translateY(8px)" },
            { opacity: 1, transform: "translateY(0)" },
        ],
        options: { duration: 150, easing: "ease-out", fill: "both" },
    },
    "slide-down": {
        keyframes: [
            { opacity: 0, transform: "translateY(-8px)" },
            { opacity: 1, transform: "translateY(0)" },
        ],
        options: { duration: 150, easing: "ease-out", fill: "both" },
    },
};

/**
 * Plays named [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
 * presets on an element, tracking the in-flight animation
 * so a rapid open/close reverses smoothly instead of jump-cutting.
 */
export function useAnimationsAPI(): {
    /** Checks whether a preset would actually play for the given element. */
    canPlay: (
        el: HTMLElement | undefined | null,
        name: AnimationName | false | undefined,
    ) => boolean;
    /** Plays a named preset, resolving once it has finished (or immediately if it's a no-op). */
    play: (
        el: HTMLElement | undefined | null,
        name: AnimationName | false | undefined,
        opening: boolean,
    ) => Promise<void>;
} {
    let current: Animation | undefined;

    function canPlay(
        el: HTMLElement | undefined | null,
        name: AnimationName | false | undefined,
    ): boolean {
        return (
            typeof el?.animate === "function" &&
            !!(name && ANIMATION_PRESETS[name]) &&
            !prefersReducedMotion()
        );
    }

    function play(
        el: HTMLElement | undefined | null,
        name: AnimationName | false | undefined,
        opening: boolean,
    ): Promise<void> {
        if (!canPlay(el, name)) return Promise.resolve();
        const preset = ANIMATION_PRESETS[name as AnimationName];

        if (current && current.playState !== "finished") {
            // smoothly reverse an in-flight animation instead of jump-cutting
            current.reverse();
        } else {
            // release the previous (finished) animation's held `fill: "both"`
            // effect before replacing it
            current?.cancel();
            current = el!.animate(preset.keyframes, preset.options);
            if (!opening) current.reverse();
        }

        return current.finished.then(
            () => undefined,
            () => undefined, // swallow AbortError thrown when an animation is cancelled
        );
    }

    return { canPlay, play };
}
