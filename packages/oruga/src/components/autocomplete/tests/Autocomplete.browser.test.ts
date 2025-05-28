import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-vue";
import { userEvent } from "@vitest/browser/context";

import { defineComponent, h, ref } from "vue";

import OAutocomplete from "../Autocomplete.vue";
import OField from "../../field/Field.vue";

const SimpleAutocomplete = defineComponent({
    name: "SimpleAutocomplete",
    setup() {
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
        const name = ref("");
        const selected = ref<string>();

        return { options, name, selected };
    },
    render() {
        return h(
            OField,
            { label: "Find a JS framework" },
            {
                default: () =>
                    h(OAutocomplete, {
                        modelValue: this.name,
                        "onUpdate:modelValue": (val) => {
                            this.name = val;
                        },
                        options: this.options,
                        placeholder: "e.g. jQuery",
                        icon: "search",
                        clearable: true,
                        onSelect: (val) => {
                            this.selected = val;
                        },
                    }),
                empty: () => "No results found",
            },
        );
    },
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
    });
});
