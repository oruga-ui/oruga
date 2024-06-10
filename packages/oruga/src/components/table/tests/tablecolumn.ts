import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import OTableColumn from "@/components/table/TableColumn.vue";

describe("OTableColumn tests", () => {
    test("expect should wrap in menu", () => {
        expect(() => mount(OTableColumn)).toThrowError("should wrap");
    });
});
