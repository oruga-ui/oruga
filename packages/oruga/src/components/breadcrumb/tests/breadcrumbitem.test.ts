import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";

import OBreadcrumbItem from "@/components/breadcrumb//BreadcrumbItem.vue";

describe("OBreadcrumbItem tests", () => {
    test("expect should wrap in dropdown", () => {
        expect(() => mount(OBreadcrumbItem)).toThrowError("should wrap");
    });
});
