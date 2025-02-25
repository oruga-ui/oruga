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
            template: `<o-carousel indicator-inside>
            <o-carousel-item v-for="(carousel, i) in carousels" :key="i">
                <article :style="{ 'background-color': carousel.color }">
                    <h1>{{ carousel.text }}</h1>
                </article>
            </o-carousel-item>
        </o-carousel>`,
        });

        const wrapper = mount(TestComponent);
        await nextTick(); // await subcomponent rendering

        expect(wrapper.attributes("data-oruga")).toBe("carousel");

        const items = wrapper.findAll('[data-oruga="carousel-item"]');
        expect(items).toHaveLength(carousels.length);

        expect(wrapper.html()).toMatchSnapshot();
    });
});
