import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import OMenuItem from "@/components/menu/MenuItem.vue";

describe("OMenuItem tests", () => {
    test("expect should wrap in menu", () => {
        expect(() => mount(OMenuItem)).toThrowError("should wrap");
    });
});
