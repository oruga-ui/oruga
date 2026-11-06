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
        expect(currentItem.text()).toStrictEqual("1");

        wrapper = mount(OPagination, { props: { modelValue: 0, total: 100 } });
        currentItem = wrapper.find(".o-pagination__button--current");
        expect(currentItem.exists()).toBeFalsy();

        wrapper = mount(OPagination, { props: { modelValue: 5, total: 100 } });
        currentItem = wrapper.find(".o-pagination__button--current");
        expect(currentItem.exists()).toBeTruthy();
        expect(currentItem.text()).toStrictEqual("5");
    });

    test("should emit change with value of 1 when calling first", () => {
        let wrapper = mount(OPagination, {
            props: { modelValue: 1, total: 100 },
        });
        wrapper.vm.first();
        expect(wrapper.emitted()["change"]).toBeUndefined();
        expect(wrapper.emitted()["update:modelValue"]).toBeUndefined();

        wrapper = mount(OPagination, { props: { modelValue: 5, total: 100 } });
        wrapper.vm.first();
        expect(wrapper.emitted()["change"][0]).toContainEqual(1);
        expect(wrapper.emitted()["update:modelValue"][0]).toContainEqual(1);
    });

    test("should emit change with value of pageCount when calling last", () => {
        let wrapper = mount(OPagination, {
            props: { modelValue: 5, total: 100 },
        });

        wrapper.vm.last();
        expect(wrapper.emitted()["change"]).toBeUndefined();
        expect(wrapper.emitted()["update:modelValue"]).toBeUndefined();

        wrapper = mount(OPagination, { props: { modelValue: 3, total: 100 } });
        wrapper.vm.last();
        expect(wrapper.emitted()["change"][0]).toContainEqual(5);
        expect(wrapper.emitted()["update:modelValue"][0]).toContainEqual(5);
    });

    test("should emit change when calling prev", () => {
        const wrapper = mount(OPagination, {
            props: { modelValue: 5, total: 100 },
        });

        wrapper.vm.prev();
        expect(wrapper.emitted()["change"][0]).toContainEqual(4);
        expect(wrapper.emitted()["update:modelValue"][0]).toContainEqual(4);
    });

    test("should emit change when calling next", () => {
        const wrapper = mount(OPagination, {
            props: { modelValue: 2, total: 100 },
        });

        wrapper.vm.next();
        expect(wrapper.emitted()["change"][0]).toContainEqual(3);
        expect(wrapper.emitted()["update:modelValue"][0]).toContainEqual(3);
    });

    test("return no pages in range when simple", () => {
        const wrapper = mount(OPagination, {
            props: { simple: true, total: 100 },
        });

        const items = wrapper.findAll(".o-pagination__button");
        expect(items).toHaveLength(2);
    });
    describe("button attributes", () => {
        test("the current page is marked with aria-current page", () => {
            const wrapper = mount(OPagination, {
                props: { total: 100, modelValue: 3 },
            });
            const current = wrapper.find(".o-pagination__button--current");
            expect(current.attributes("aria-current")).toBe("page");

            const others = wrapper
                .findAll(".o-pagination__list button")
                .filter((b) => b.text() !== "3");
            expect(others.length).toBeGreaterThan(0);
            for (const button of others)
                expect(button.attributes("aria-current")).toBeUndefined();
        });

        test("internal slot props do not leak as DOM attributes", () => {
            const wrapper = mount(OPagination, {
                props: { total: 100, modelValue: 3 },
            });
            for (const button of wrapper.findAll("button")) {
                expect(button.attributes("iscurrent")).toBeUndefined();
                expect(button.attributes("number")).toBeUndefined();
            }
        });
    });

    describe("slot props", () => {
        const slotProps = (props: Record<string, unknown>) => {
            const received: Record<string, Record<string, unknown>> = {};
            mount(OPagination, {
                props: { total: 100, ...props },
                slots: {
                    previous: (p: Record<string, unknown>) => {
                        received.previous = p;
                        return "";
                    },
                    next: (p: Record<string, unknown>) => {
                        received.next = p;
                        return "";
                    },
                    default: (p: Record<string, unknown>) => {
                        if (p.isCurrent) received.current = p;
                        return "";
                    },
                },
            });
            return received;
        };

        test("previous and next expose whether they are disabled", () => {
            let received = slotProps({ modelValue: 1 });
            expect(received.previous.disabled).toBe(true);
            expect(received.next.disabled).toBe(false);

            // a middle page: 100 items with 20 per page are 5 pages
            received = slotProps({ modelValue: 3 });
            expect(received.previous.disabled).toBe(false);
            expect(received.next.disabled).toBe(false);

            received = slotProps({ modelValue: 5, total: 100, perPage: 20 });
            expect(received.next.disabled).toBe(true);

            received = slotProps({ modelValue: 3, disabled: true });
            expect(received.previous.disabled).toBe(true);
            expect(received.next.disabled).toBe(true);
        });

        test("the current page slot exposes ariaCurrent page", () => {
            const received = slotProps({ modelValue: 3 });
            expect(received.current.ariaCurrent).toBe("page");
            expect(received.previous.ariaCurrent).toBeUndefined();
        });
    });
});
