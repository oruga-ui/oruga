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
            expect(item.text()).toStrictEqual(slides[index].title);
        });
    });

    describe("clickable items", () => {
        const mountCarousel = async (clickable: boolean) => {
            const TestComponent = defineComponent({
                components: { OCarousel, OCarouselItem },
                props: { clickable: Boolean },
                emits: [
                    // eslint-disable-next-line vue/no-unused-emit-declarations
                    "click",
                ],
                template: `<OCarousel :autoplay="false" @click="$emit('click')">
                    <OCarouselItem v-for="n in 3" :key="n" :clickable="clickable">
                        <button class="inner">Slide {{ n }}</button>
                    </OCarouselItem>
                </OCarousel>`,
            });

            const wrapper = mount(TestComponent, { props: { clickable } });
            await nextTick(); // await subcomponent rendering
            return wrapper;
        };

        test("are focusable with a roving tab stop on the active item", async () => {
            const wrapper = await mountCarousel(true);
            const items = wrapper.findAll('[data-oruga="carousel-item"]');
            expect(items.map((i) => i.attributes("tabindex"))).toStrictEqual([
                "0",
                "-1",
                "-1",
            ]);
        });

        test("items which are not clickable stay out of the tab order", async () => {
            const wrapper = await mountCarousel(false);
            for (const item of wrapper.findAll('[data-oruga="carousel-item"]'))
                expect(item.attributes("tabindex")).toBeUndefined();
        });

        test("Enter and Space on the active item emit click", async () => {
            const wrapper = await mountCarousel(true);
            const item = wrapper.find('[data-oruga="carousel-item"]');

            await item.trigger("keydown", { key: "Enter" });
            await item.trigger("keydown", { key: " " });
            expect(wrapper.emitted("click")).toHaveLength(2);
        });

        test("Space does not scroll the page", async () => {
            const wrapper = await mountCarousel(true);
            const item = wrapper.find('[data-oruga="carousel-item"]');

            const event = new KeyboardEvent("keydown", {
                key: " ",
                bubbles: true,
                cancelable: true,
            });
            item.element.dispatchEvent(event);
            expect(event.defaultPrevented).toBe(true);
        });

        test("keys pressed inside the item content are ignored", async () => {
            const wrapper = await mountCarousel(true);
            const inner = wrapper.find(".inner");

            await inner.trigger("keydown", { key: "Enter" });
            expect(wrapper.emitted("click")).toBeUndefined();
        });
    });
});
