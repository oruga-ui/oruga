import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-vue";

import { defineComponent, h, ref } from "vue";

import OCollapse from "../Collapse.vue";

const SimpleCollapse = defineComponent({
    name: "SimpleCollapse",
    setup() {
        const isOpen = ref(0);
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
        return { isOpen, collapses };
    },
    render() {
        return h(
            "section",
            {},
            this.collapses.map(({ title, text, index }) =>
                h(
                    OCollapse,
                    {
                        key: index,
                        "data-testid": `collapse-${index}`,
                        open: this.isOpen == index,
                        onOpen: () => {
                            this.isOpen = index;
                        },
                    },
                    {
                        trigger: ({ open }) =>
                            h("div", {}, [
                                h("p", {}, [
                                    `${title} (${open ? "Open" : "Closed"})`,
                                ]),
                            ]),
                        default: () =>
                            h("div", { "data-testid": `content-${index}` }, [
                                text,
                            ]),
                    },
                ),
            ),
        );
    },
});

describe("<Collapse>", () => {
    test("works", async () => {
        const screen = render(SimpleCollapse);
        const firstContent = screen.getByTestId("content-0");
        await expect.element(firstContent).toBeVisible();
        const secondContent = screen.getByTestId("content-1");
        await expect.element(secondContent).not.toBeVisible();
        const second = screen.getByTestId("collapse-1");
        const trigger = second.getByRole("button");
        await trigger.click();
        await expect.element(firstContent).not.toBeVisible();
        await expect.element(secondContent).toBeVisible();
    });
});
