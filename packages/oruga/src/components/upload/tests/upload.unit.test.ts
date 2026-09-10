import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OUpload from "@/components/upload/Upload.vue";

describe("OUpload tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OUpload);
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("upload");
        expect(wrapper.html()).toMatchSnapshot();
    });

    describe("test events", () => {
        test("check emit focus and blur event correctly", async () => {
            const wrapper = mount(OUpload);

            const input = wrapper.find("input");
            expect(input.exists()).toBeTruthy();

            await input.trigger("focus");
            await input.trigger("blur");

            expect(wrapper.emitted("focus")).toHaveLength(1);
            expect(wrapper.emitted("blur")).toHaveLength(1);
        });
    });
});
