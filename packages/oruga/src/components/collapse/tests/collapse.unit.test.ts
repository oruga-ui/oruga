import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OCollapse from "@/components/collapse/Collapse.vue";
import { setTimeout } from "timers/promises";

describe("OCollapse tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OCollapse, {
            slots: {
                trigger: "<button>Trigger Button</button>",
                default:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("collapse");
        expect(wrapper.html()).toMatchSnapshot();

        const summary = wrapper.find("summary");
        expect(summary.exists()).toBeTruthy();
        expect(summary.classes("o-collapse__trigger"));
        expect(summary.text()).toBe("Trigger Button");

        const content = wrapper.find("div");
        expect(content.exists()).toBeTruthy();
        expect(summary.classes("o-collapse__content"));
        expect(content.text()).toBe(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        );
    });

    test("emit events when toggled", async () => {
        const wrapper = mount(OCollapse, {
            props: { open: false },
            slots: {
                trigger: "<button>Trigger Button</button>",
                default:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
        });

        const summary = wrapper.find("summary");
        expect(summary.exists()).toBeTruthy();

        // open element
        await summary.trigger("click");
        await setTimeout(); // await dom handlers run

        expect(wrapper.emitted("update:open")).toHaveLength(1);
        expect(wrapper.emitted("open")).toHaveLength(1);
        expect(wrapper.emitted("close")).toBeUndefined();

        // click again to close element
        await summary.trigger("click");
        await setTimeout(); // await dom handlers run

        expect(wrapper.emitted("update:open")).toHaveLength(2);
        expect(wrapper.emitted("open")).toHaveLength(1);
        expect(wrapper.emitted("close")).toHaveLength(1);
    });
});
