import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { defineComponent, nextTick } from "vue";

import OCarousel from "@/components/carousel/Carousel.vue";
import OCarouselItem from "@/components/carousel/CarouselItem.vue";
import type { CarouselProps } from "../props";

describe("Dropdown axe tests", () => {
    enableAutoUnmount(afterEach);

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
        template: `<o-carousel>
                <o-carousel-item v-for="(carousel, i) in carousels" :key="i">
                    <article
                        class="ex-slide"
                        :style="{ 'background-color': carousel.color }">
                        <h1>{{ carousel.text }}</h1>
                    </article>
                </o-carousel-item>
            </o-carousel>`,
    });

    const a11yCases: { title: string; props?: CarouselProps }[] = [
        {
            title: "axe carousel - base case",
        },
        {
            title: "axe carousel - arrows",
            props: { arrows: true },
        },
        {
            title: "axe carousel - indicator inside",
            props: { indicatorInside: true },
        },
        {
            title: "axe carousel - indicator bars",
            props: { indicatorStyle: "bars" },
        },
        {
            title: "axe carousel - default modelValue",
            props: { modelValue: 3 },
        },
        {
            title: "axe carousel - custom items",
            props: { itemsToShow: 3, itemsToList: 2 },
        },
        {
            title: "axe carousel - autoplay",
            props: { autoplay: true },
        },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(TestComponent, {
            props: { ...props },
            attachTo: document.body,
        });
        await nextTick(); // await child items got rendered

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
