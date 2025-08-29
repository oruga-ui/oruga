import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import OTabItem from "@/components/tabs/TabItem.vue";

describe("OTabItem tests", () => {
    test("expect should wrap in menu", () => {
        expect(() => mount(OTabItem)).toThrowError("should wrap");
    });
});
