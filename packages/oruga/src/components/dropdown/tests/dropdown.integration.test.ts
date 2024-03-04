import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import DropdownExample from "./DropdownExample.vue";
import ODropdownItem from "@/components/dropdown/DropdownItem.vue";

describe("ODropdown Integration", () => {
    enableAutoUnmount(afterEach);

    test("is called", () => {
        const values = ["A", "B", "C"];
        const wrapper = mount(DropdownExample, { props: { values } });
        expect(wrapper.attributes("data-oruga")).toBe("dropdown");
        expect(!!wrapper.vm).toBeTruthy();

        const items = wrapper.findAllComponents(ODropdownItem);
        expect(items.length).toBe(values.length);
        values.forEach((value, idx) =>
            expect(items.at(idx).text()).toBe(value),
        );
    });
});

// it("react accordingly on mouse over", () => {
//     console.log(wrapper.html());
//     const trigger = wrapper.find(".trigger");
//     trigger.trigger("mouseenter");
//     expect(wrapper.vm.isHoverable).toBeFalsy();

//     wrapper.setProps({ triggers: ["hover"] });
//     trigger.trigger("mouseenter");
//     expect(wrapper.vm.isHoverable).toBeTruthy();
// });

// it("react accordingly when new item is selected", () => {
//     vi.useFakeTimers();

//     wrapper.vm.selectItem(val1);
//     expect(wrapper.emitted().input).toHaveLength(1);
//     expect(wrapper.emitted().input[0]).toEqual([val1]);
//     expect(wrapper.emitted().change).toHaveLength(1);
//     expect(wrapper.emitted().change[0]).toEqual([val1]);

//     wrapper.setProps({
//         hoverable: true,
//         closeOnClick: true,
//     });

//     wrapper.vm.selectItem(val2);
//     expect(wrapper.emitted().input).toHaveLength(2);
//     expect(wrapper.emitted().input[1]).toEqual([val2]);
//     expect(wrapper.emitted().change).toHaveLength(2);
//     expect(wrapper.emitted().change[1]).toEqual([val2]);

//     expect(wrapper.vm.isHoverable).toBeFalsy();
// });

// it("react accordingly when same item is selected", () => {
//     vi.useFakeTimers();

//     // will emit only input event
//     wrapper.setProps({ value: val1 });
//     wrapper.vm.selectItem(val1);
//     expect(wrapper.emitted().input).toHaveLength(1);
//     expect(wrapper.emitted().input[0]).toEqual([val1]);
// });

// it("react accordingly when an item is selected with multiple prop", () => {
//     vi.useFakeTimers();
//     wrapper.setProps({
//         multiple: true,
//     });
//     wrapper.vm.selected = null;

//     // no initial value, will return an array with the only selected option
//     wrapper.vm.selectItem(val1);
//     expect(wrapper.emitted().input).toHaveLength(1);
//     expect(wrapper.emitted().input[0]).toEqual([[val1]]);
//     expect(wrapper.emitted().change).toHaveLength(1);
//     expect(wrapper.emitted().change[0]).toEqual([[val1]]);

//     // will return an array with the new value appended
//     wrapper.setProps({ value: [val1] });
//     wrapper.vm.selectItem(val2);
//     expect(wrapper.emitted().input).toHaveLength(2);
//     expect(wrapper.emitted().input[1]).toEqual([[val1, val2]]);
//     expect(wrapper.emitted().change).toHaveLength(2);
//     expect(wrapper.emitted().change[1]).toEqual([[val1, val2]]);

//     // will remove the last selection since it was part of the list
//     wrapper.setProps({ value: [val1, val2] });
//     wrapper.vm.selectItem(val2);
//     expect(wrapper.emitted().input).toHaveLength(3);
//     expect(wrapper.emitted().input[2]).toEqual([[val1]]);
//     expect(wrapper.emitted().change).toHaveLength(3);
//     expect(wrapper.emitted().change[2]).toEqual([[val1]]);
// });

// it("manage the whitelisted items accordingly", () => {
//     let el = wrapper.vm.$refs.dropdownMenu;
//     expect(wrapper.vm.isInWhiteList(el)).toBeTruthy();

//     // el = wrapper.vm.$refs.dropdownMenu.childNodes[0]
//     // expect(wrapper.vm.isInWhiteList(el)).toBeTruthy()

//     wrapper.vm.$refs.dropdownMenu = undefined;

//     el = wrapper.vm.$refs.trigger;
//     expect(wrapper.vm.isInWhiteList(el)).toBeTruthy();

//     el = wrapper.vm.$refs.trigger.querySelector(".trigger");
//     expect(wrapper.vm.isInWhiteList(el)).toBeTruthy();

//     wrapper.vm.$refs.trigger = undefined;

//     el = document.createElement("div");
//     expect(wrapper.vm.isInWhiteList(el)).toBeFalsy();
// });

// todo test select

// todo test select width disabled

// todo test multiple

// todo test clickling items (content) with closable and without

// todo test scroll more
