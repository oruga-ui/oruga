import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-vue";

import { defineComponent, h, type VNode } from "vue";

import OCollapse from "../Collapse.vue";

const collapses = [
    {
        title: "Title 1",
        text: "Text 1",
        index: 0,
    },
    {
        title: "Title 2",
        text: "Text 2",
        index: 1,
    },
    {
        title: "Title 3",
        text: "Text 3",
        index: 2,
    },
];

const SimpleCollapse = defineComponent(() => {
    return (): VNode =>
        h(
            "section",
            {},
            collapses.map(({ title, text, index }) =>
                h(
                    OCollapse,
                    {
                        key: index,
                        "data-testid": `collapse-${index}`,
                        name: "browser-test-collapsables",
                        open: index === 0,
                    },
                    {
                        trigger: ({ open }) =>
                            h("p", { "data-testid": `trigger-${index}` }, [
                                `${title} (${open ? "Open" : "Closed"})`,
                            ]),
                        default: () =>
                            h("div", { "data-testid": `content-${index}` }, [
                                text,
                            ]),
                    },
                ),
            ),
        );
});

describe("<Collapse>", () => {
    test("works", async () => {
        const screen = render(SimpleCollapse);
        const firstContent = screen.getByTestId("content-0");
        await expect.element(firstContent).toBeVisible();
        const secondContent = screen.getByTestId("content-1");
        await expect.element(secondContent).not.toBeVisible();
        const second = screen.getByTestId("collapse-1");
        const trigger = second.getByTestId("trigger-1");
        await trigger.click();
        await expect.element(firstContent).not.toBeVisible();
        await expect.element(secondContent).toBeVisible();
    });
});
