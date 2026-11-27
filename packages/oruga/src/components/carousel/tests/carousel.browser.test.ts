import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-vue";

import { h } from "vue";

import OCarousel from "../Carousel.vue";
import OCarouselItem from "../CarouselItem.vue";

const slides = ["Slide A", "Slide B", "Slide C", "Slide D"];

function renderCarousel(modelValue?: number): ReturnType<typeof render> {
    return render(OCarousel, {
        props: { modelValue, style: "width: 400px" },
        slots: {
            default: () =>
                slides.map((slide) => h(OCarouselItem, { key: slide }, slide)),
        },
    });
}

/** resize observer callbacks are delivered within the next rendering step */
async function waitForRendering(): Promise<void> {
    for (let i = 0; i < 2; i++)
        await new Promise((resolve) => requestAnimationFrame(resolve));
}

describe("<Carousel>", () => {
    test("activate the slide given by the v-model on mount", async () => {
        const screen = await renderCarousel(2);
        await waitForRendering();

        await expect
            .element(screen.getByRole("tab", { name: "Slide 3" }))
            .toHaveAttribute("aria-selected", "true");
        expect(screen.emitted("update:modelValue")).toBeUndefined();
    });

    test("keep the active slide when the carousel is resized", async () => {
        const screen = await renderCarousel();
        await waitForRendering();

        // the unstyled indicators have no size, so they cannot be clicked by a pointer
        (
            screen
                .getByRole("tab", { name: "Slide 2" })
                .element() as HTMLElement
        ).click();
        await expect
            .element(screen.getByRole("tab", { name: "Slide 2" }))
            .toHaveAttribute("aria-selected", "true");

        const root = screen.container.querySelector<HTMLElement>(
            '[data-oruga="carousel"]',
        );
        root!.style.width = "200px";
        await waitForRendering();

        await expect
            .element(screen.getByRole("tab", { name: "Slide 2" }))
            .toHaveAttribute("aria-selected", "true");
        expect(screen.emitted("update:modelValue")?.at(-1)).toStrictEqual([1]);
    });
});
