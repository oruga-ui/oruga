import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import ODropdownItem from "@/components/dropdown/DropdownItem.vue";

describe("ODropdownItem", () => {
    test("expect should wrap in dropdown", () => {
        expect(() => mount(ODropdownItem)).toThrowError("should wrap");
    });
});
