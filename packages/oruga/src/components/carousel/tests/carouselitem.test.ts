import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import OCarouselItem from "@/components/carousel/CarouselItem.vue";

describe("OCarouselItem tests", () => {
    test("expect should wrap in carousel", () => {
        expect(() => mount(OCarouselItem)).toThrowError("should wrap");
    });
});
