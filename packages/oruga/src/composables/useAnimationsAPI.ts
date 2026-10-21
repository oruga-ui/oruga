import { prefersReducedMotion } from "@/utils/helpers";

/** Built-in open/close animation presets, played via the Web Animations API. */
export type AnimationName =
    | "fade"
    | "scale"
    | "zoom-out"
    | "slide-up"
    | "slide-down"
    | "slide-from-left"
    | "slide-from-right"
    | "slide-from-top"
    | "slide-from-bottom";

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
    // slide in from the edge of the viewport, e.g. for drawers
    "slide-from-left": {
        keyframes: [
            { transform: "translateX(-100%)" },
            { transform: "translateX(0)" },
        ],
        options: { duration: 250, easing: "ease-out", fill: "both" },
    },
    "slide-from-right": {
        keyframes: [
            { transform: "translateX(100%)" },
            { transform: "translateX(0)" },
        ],
        options: { duration: 250, easing: "ease-out", fill: "both" },
    },
    "slide-from-top": {
        keyframes: [
            { transform: "translateY(-100%)" },
            { transform: "translateY(0)" },
        ],
        options: { duration: 250, easing: "ease-out", fill: "both" },
    },
    "slide-from-bottom": {
        keyframes: [
            { transform: "translateY(100%)" },
            { transform: "translateY(0)" },
        ],
        options: { duration: 250, easing: "ease-out", fill: "both" },
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
    /**
     * Plays a named preset, resolving once it has finished (or immediately if it's a no-op).
     * With `withBackdrop` the `::backdrop` of the element fades in and out together with the preset.
     */
    play: (
        el: HTMLElement | undefined | null,
        name: AnimationName | false | undefined,
        opening: boolean,
        withBackdrop?: boolean,
    ) => Promise<void>;
} {
    let current: Animation | undefined;
    let currentBackdrop: Animation | undefined;

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

    /** Fades the `::backdrop` of the element, using the timing of the given preset. */
    function animateBackdrop(
        el: HTMLElement,
        options: KeyframeAnimationOptions,
        opening: boolean,
    ): Animation | undefined {
        try {
            // a single keyframe fades from/to the style which is defined by the theme
            const animation = el.animate([{ opacity: 0 }], {
                ...options,
                pseudoElement: "::backdrop",
            });
            if (!opening) animation.reverse();
            return animation;
        } catch {
            // the browser does not support animating the `::backdrop`
            return undefined;
        }
    }

    function play(
        el: HTMLElement | undefined | null,
        name: AnimationName | false | undefined,
        opening: boolean,
        withBackdrop = false,
    ): Promise<void> {
        if (!canPlay(el, name)) return Promise.resolve();
        const preset = ANIMATION_PRESETS[name as AnimationName];

        if (current && current.playState !== "finished") {
            // smoothly reverse an in-flight animation instead of jump-cutting
            current.reverse();
            currentBackdrop?.reverse();
        } else {
            // release the previous (finished) animation's held `fill: "both"`
            // effect before replacing it
            current?.cancel();
            currentBackdrop?.cancel();
            currentBackdrop = undefined;
            current = el!.animate(preset.keyframes, preset.options);
            if (!opening) current.reverse();
            if (withBackdrop)
                currentBackdrop = animateBackdrop(el!, preset.options, opening);
        }

        return current.finished.then(
            () => undefined,
            () => undefined, // swallow AbortError thrown when an animation is cancelled
        );
    }

    return { canPlay, play };
}
