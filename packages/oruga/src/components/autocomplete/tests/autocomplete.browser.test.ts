import { describe, expect, test } from "vitest";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-vue";

import { defineComponent, h, ref, type VNode } from "vue";

import OAutocomplete from "../Autocomplete.vue";
import OField from "../../field/Field.vue";

const SimpleAutocomplete = defineComponent(() => {
    const options = [
        "Angular 2",
        "Ember",
        "jQuery",
        "Meteor",
        "Node.js",
        "React",
        "RxJS",
        "Vue.js",
    ];
    const name = ref<string>("");
    const selected = ref<string>();

    return (): VNode =>
        h(
            OField,
            { label: "Find a JS framework" },
            {
                default: () =>
                    h(OAutocomplete, {
                        modelValue: name,
                        "onUpdate:modelValue": (val) => {
                            name.value = val as string;
                        },
                        options: options,
                        placeholder: "e.g. jQuery",
                        icon: "search",
                        clearable: true,
                        onSelect: (val) => {
                            selected.value = val as string;
                        },
                    }),
                empty: () => "No results found",
            },
        );
});

describe("<Autocomplete>", () => {
    test("works", async () => {
        const screen = render(SimpleAutocomplete);
        const input = screen.getByRole("textbox");
        await input.click();
        await expect.element(input).toHaveFocus();
        await userEvent.keyboard("j");
        const dropdown = screen.getByRole("listbox");
        await expect.element(dropdown).toBeVisible();
        await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");
        await expect.element(input).toHaveValue("Node.js");
        screen.unmount();
    });
});
