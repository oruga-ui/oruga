import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import OPagination from "@/components/pagination/Pagination.vue";

describe("OPagination tests", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(OPagination, { props: { total: 100 } });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("pagination");
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("should select current item correctly", () => {
        let wrapper = mount(OPagination, { props: { total: 100 } });

        let currentItem = wrapper.find(".o-pagination__button--current");
        expect(currentItem.exists()).toBeTruthy();
        expect(currentItem.text()).toEqual("1");

        wrapper = mount(OPagination, { props: { current: 0, total: 100 } });
        currentItem = wrapper.find(".o-pagination__button--current");
        expect(currentItem.exists()).toBeFalsy();

        wrapper = mount(OPagination, { props: { current: 5, total: 100 } });
        currentItem = wrapper.find(".o-pagination__button--current");
        expect(currentItem.exists()).toBeTruthy();
        expect(currentItem.text()).toEqual("5");
    });

    test("should emit change with value of 1 when calling first", async () => {
        let wrapper = mount(OPagination, { props: { current: 1, total: 100 } });
        wrapper.vm.first(new Event(""));
        expect(wrapper.emitted()["change"]).toBeUndefined();
        expect(wrapper.emitted()["update:current"]).toBeUndefined();

        wrapper = mount(OPagination, { props: { current: 5, total: 100 } });
        wrapper.vm.first(new Event(""));
        expect(wrapper.emitted()["change"][0]).toContainEqual(1);
        expect(wrapper.emitted()["update:current"][0]).toContainEqual(1);
    });

    test("should emit change with value of pageCount when calling last", () => {
        let wrapper = mount(OPagination, {
            props: { current: 5, total: 100 },
        });

        wrapper.vm.last(new Event(""));
        expect(wrapper.emitted()["change"]).toBeUndefined();
        expect(wrapper.emitted()["update:current"]).toBeUndefined();

        wrapper = mount(OPagination, { props: { current: 3, total: 100 } });
        wrapper.vm.last(new Event(""));
        expect(wrapper.emitted()["change"][0]).toContainEqual(5);
        expect(wrapper.emitted()["update:current"][0]).toContainEqual(5);
    });

    test("should emit change when calling prev", () => {
        const wrapper = mount(OPagination, {
            props: { current: 5, total: 100 },
        });

        wrapper.vm.prev(new Event(""));
        expect(wrapper.emitted()["change"][0]).toContainEqual(4);
        expect(wrapper.emitted()["update:current"][0]).toContainEqual(4);
    });

    test("should emit change when calling next", () => {
        const wrapper = mount(OPagination, {
            props: { current: 2, total: 100 },
        });

        wrapper.vm.next(new Event(""));
        expect(wrapper.emitted()["change"][0]).toContainEqual(3);
        expect(wrapper.emitted()["update:current"][0]).toContainEqual(3);
    });

    test("return no pages in range when simple", () => {
        const wrapper = mount(OPagination, {
            props: { simple: true, total: 100 },
        });

        const items = wrapper.findAll(".o-pagination__button");
        expect(items).toHaveLength(2);
    });
});
