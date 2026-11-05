import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";

import OCarousel from "@/components/carousel/Carousel.vue";
import OCarouselItem from "@/components/carousel/CarouselItem.vue";

describe("OCarousel tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OCarousel);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("carousel");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("render integration correctly", async () => {
        const carousels = [
            { text: "Slide 1", color: "#445e00" },
            { text: "Slide 2", color: "#006724" },
            { text: "Slide 3", color: "#b60000" },
            { text: "Slide 4", color: "#f4c300" },
            { text: "Slide 5", color: "#005c98" },
        ];

        const TestComponent = defineComponent({
            components: { OCarousel, OCarouselItem },
            data: () => ({ carousels }),
            template: `<OCarousel indicator-inside>
                    <OCarouselItem v-for="carousel in carousels" :key="carousel.text">
                        <article :style="{ 'background-color': carousel.color }">
                            <h1>{{ carousel.text }}</h1>
                        </article>
                    </OCarouselItem>
                </OCarousel>`,
        });

        const wrapper = mount(TestComponent);
        await nextTick(); // await subcomponent rendering

        expect(wrapper.attributes("data-oruga")).toBe("carousel");

        const items = wrapper.findAll('[data-oruga="carousel-item"]');
        expect(items).toHaveLength(carousels.length);

        expect(wrapper.html()).toMatchSnapshot();
    });

    test("handle options props correctly", async () => {
        const slides = [
            {
                title: "Slide 1",
                image: "https://picsum.photos/id/1/1230/500",
            },
            {
                title: "Slide 2",
                image: "https://picsum.photos/id/2/1230/500",
            },
            {
                title: "Slide 3",
                image: "https://picsum.photos/id/3/1230/500",
            },
            {
                title: "Slide 4",
                image: "https://picsum.photos/id/4/1230/500",
            },
            {
                title: "Slide 5",
                image: "https://picsum.photos/id/5/1230/500",
            },
            {
                title: "Slide 6",
                image: "https://picsum.photos/id/6/1230/500",
            },
            {
                title: "Slide 7",
                image: "https://picsum.photos/id/7/1230/500",
            },
        ];

        const wrapper = mount(OCarousel, {
            props: { options: slides },
        });
        await nextTick(); // await dropdown item rendered

        const items = wrapper.findAll('[data-oruga="carousel-item"]');
        expect(items.length).toBe(slides.length);

        items.forEach((item, index) => {
            expect(item.text()).toEqual(slides[index].title);
        });
    });
    describe("test indicator labels", () => {
        const slides = [{ title: "One" }, { title: "Two" }, { title: "Three" }];

        test("render the default english labels with the slide number", async () => {
            const wrapper = mount(OCarousel, {
                props: { options: slides, indicators: true },
            });
            await nextTick(); // await items rendered

            const list = wrapper.find("[role=tablist]");
            expect(list.attributes("aria-label")).toBe("Slides");

            const tabs = wrapper.findAll("[role=tab]");
            expect(tabs.map((tab) => tab.attributes("aria-label"))).toEqual([
                "Slide 1",
                "Slide 2",
                "Slide 3",
            ]);
        });

        test("render labels from a string with a placeholder", async () => {
            const wrapper = mount(OCarousel, {
                props: {
                    options: slides,
                    indicators: true,
                    ariaIndicatorsLabel: "Folien",
                    ariaIndicatorLabel: "Folie {value}",
                },
            });
            await nextTick(); // await items rendered

            expect(
                wrapper.find("[role=tablist]").attributes("aria-label"),
            ).toBe("Folien");
            expect(
                wrapper
                    .findAll("[role=tab]")
                    .map((tab) => tab.attributes("aria-label")),
            ).toEqual(["Folie 1", "Folie 2", "Folie 3"]);
        });

        test("render labels from a function", async () => {
            const wrapper = mount(OCarousel, {
                props: {
                    options: slides,
                    indicators: true,
                    ariaIndicatorLabel: (number) => `go to ${number}`,
                },
            });
            await nextTick(); // await items rendered

            expect(
                wrapper
                    .findAll("[role=tab]")
                    .map((tab) => tab.attributes("aria-label")),
            ).toEqual(["go to 1", "go to 2", "go to 3"]);
        });
    });
});
