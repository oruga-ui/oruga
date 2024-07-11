import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import OStepItem from "@/components/steps/StepItem.vue";

describe("OStepItem tests", () => {
    test("expect should wrap in menu", () => {
        expect(() => mount(OStepItem)).toThrowError("should wrap");
    });
});
