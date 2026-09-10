import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { defineComponent, ref, type Ref } from "vue";
import { mount } from "@vue/test-utils";

import { usePreventScrolling } from "../usePreventScrolling";

/** Mount a minimal component so lifecycle hooks (onBeforeUnmount) fire correctly. */
function withSetup(scrollStrategy: "clip" | "keep" | Ref<"clip" | "keep">) {
    let toggleScroll!: (active: boolean) => void;
    const wrapper = mount(
        defineComponent({
            setup() {
                toggleScroll = usePreventScrolling(scrollStrategy);
            },
            template: "<div></div>",
        }),
    );
    return { toggleScroll, unmount: (): void => wrapper.unmount() };
}

describe("usePreventScrolling", () => {
    beforeEach(() => {
        vi.spyOn(window, "scrollTo").mockImplementation(() => {});
        document.body.className = "";
        document.body.style.cssText = "";
    });

    afterEach(() => {
        vi.restoreAllMocks();
        document.body.className = "";
        document.body.style.cssText = "";
    });

    describe("clip strategy", () => {
        test("adds scroll-clip class and compensating padding-right on activate", () => {
            vi.spyOn(window, "innerWidth", "get").mockReturnValue(1200);
            vi.spyOn(
                document.documentElement,
                "clientWidth",
                "get",
            ).mockReturnValue(1183);

            const { toggleScroll, unmount } = withSetup("clip");
            toggleScroll(true);

            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                true,
            );
            expect(document.body.style.paddingRight).toBe("17px");

            unmount();
        });

        test("removes class and clears padding-right on deactivate", () => {
            const { toggleScroll, unmount } = withSetup("clip");

            toggleScroll(true);
            toggleScroll(false);

            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                false,
            );
            expect(document.body.style.paddingRight).toBe("");

            unmount();
        });

        test("removes class on component unmount", () => {
            const { toggleScroll, unmount } = withSetup("clip");

            toggleScroll(true);
            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                true,
            );

            unmount();
            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                false,
            );
        });
    });

    describe("keep strategy", () => {
        test("adds scroll-keep class and pins body to saved scroll position on activate", () => {
            vi.spyOn(window, "scrollY", "get").mockReturnValue(300);

            const { toggleScroll, unmount } = withSetup("keep");
            toggleScroll(true);

            expect(document.body.classList.contains("o-scroll-keep")).toBe(
                true,
            );
            expect(document.body.style.top).toBe("-300px");

            unmount();
        });

        test("removes class, clears top, and restores scroll position on deactivate", () => {
            vi.spyOn(window, "scrollY", "get").mockReturnValue(300);

            const { toggleScroll, unmount } = withSetup("keep");
            toggleScroll(true);
            toggleScroll(false);

            expect(document.body.classList.contains("o-scroll-keep")).toBe(
                false,
            );
            expect(document.body.style.top).toBe("");
            expect(window.scrollTo).toHaveBeenCalledWith({ top: 300 });

            unmount();
        });

        test("handles scroll position 0 correctly (falsy value must not be lost)", () => {
            vi.spyOn(window, "scrollY", "get").mockReturnValue(0);

            const { toggleScroll, unmount } = withSetup("keep");
            toggleScroll(true);

            expect(document.body.style.top).toBe("0px");

            toggleScroll(false);
            expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 });

            unmount();
        });

        test("restores scroll and removes class on component unmount", () => {
            vi.spyOn(window, "scrollY", "get").mockReturnValue(150);

            const { toggleScroll, unmount } = withSetup("keep");
            toggleScroll(true);
            unmount();

            expect(document.body.classList.contains("o-scroll-keep")).toBe(
                false,
            );
            expect(window.scrollTo).toHaveBeenCalledWith({ top: 150 });
        });
    });

    describe("reactive scrollStrategy prop", () => {
        test("reads strategy value at activation time", () => {
            const strategy = ref<"clip" | "keep">("clip");
            const { toggleScroll, unmount } = withSetup(strategy);

            toggleScroll(true);
            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                true,
            );

            unmount();
        });
    });

    describe("stacking — multiple overlays open simultaneously", () => {
        test("class is not removed while a second overlay is still active", () => {
            const a = withSetup("clip");
            const b = withSetup("clip");

            a.toggleScroll(true);
            b.toggleScroll(true);

            a.toggleScroll(false); // count: 2 → 1, lock must remain
            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                true,
            );

            b.toggleScroll(false); // count: 1 → 0, now it should be gone
            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                false,
            );

            a.unmount();
            b.unmount();
        });

        test("unmounting one overlay does not release the lock while another is still open", () => {
            const a = withSetup("clip");
            const b = withSetup("clip");

            a.toggleScroll(true);
            b.toggleScroll(true);

            a.unmount(); // onBeforeUnmount fires toggleScroll(false), count: 2 → 1
            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                true,
            );

            b.unmount(); // count: 1 → 0
            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                false,
            );
        });
    });

    describe("edge cases", () => {
        test("deactivating without prior activation is a no-op", () => {
            const { toggleScroll, unmount } = withSetup("clip");

            expect(() => toggleScroll(false)).not.toThrow();
            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                false,
            );

            unmount();
        });

        test("activating a second time from the same instance only increments the count", () => {
            const { toggleScroll, unmount } = withSetup("clip");

            toggleScroll(true);
            toggleScroll(true); // second call — count becomes 2

            const count = [...document.body.classList].filter(
                (c) => c === "o-scroll-clip",
            ).length;
            expect(count).toBe(1); // class added only once

            toggleScroll(false); // count: 2 → 1, lock stays
            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                true,
            );

            toggleScroll(false); // count: 1 → 0
            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                false,
            );

            unmount();
        });
    });
});
