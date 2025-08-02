import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import OListItem from "@/components/listbox/ListItem.vue";

describe("OListItem tests", () => {
    test("expect should wrap in listbox", () => {
        expect(() => mount(OListItem)).toThrowError("should wrap");
    });
});
