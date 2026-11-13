import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { defineComponent, nextTick, ref, type Ref } from "vue";
import { mount, type VueWrapper } from "@vue/test-utils";

import { useScrollLock, type ScrollLock } from "../useScrollLock";

const wrappers: VueWrapper[] = [];

/**
 * Mount a minimal component so the scope is disposed on unmount.
 * Everything still mounted is unmounted after each test, because the lock state is module-level.
 */
function withSetup(
    initial = false,
    scrollLock: ScrollLock | Ref<ScrollLock> = "keep",
) {
    const active = ref(initial);
    const wrapper = mount(
        defineComponent({
            setup() {
                useScrollLock(active, scrollLock);
            },
            template: "<div></div>",
        }),
    );
    wrappers.push(wrapper);

    return {
        active,
        /** set the active state and wait for the post flush watcher */
        async toggle(value: boolean): Promise<void> {
            active.value = value;
            await nextTick();
        },
        unmount(): void {
            wrappers.splice(wrappers.indexOf(wrapper), 1);
            wrapper.unmount();
        },
    };
}

const hasClass = (name: string): boolean =>
    document.body.classList.contains(name);

describe("useScrollLock", () => {
    beforeEach(() => {
        vi.spyOn(window, "scrollTo").mockImplementation(() => {});
        document.body.className = "";
        document.body.style.cssText = "";
    });

    afterEach(() => {
        wrappers.splice(0).forEach((w) => w.unmount());
        vi.restoreAllMocks();
        document.body.className = "";
        document.body.style.cssText = "";
    });

    describe("clip mode", () => {
        test("adds scroll-clip class and compensating padding-right on activate", async () => {
            vi.spyOn(window, "innerWidth", "get").mockReturnValue(1200);
            vi.spyOn(
                document.documentElement,
                "clientWidth",
                "get",
            ).mockReturnValue(1183);

            const { toggle } = withSetup(false, "clip");
            await toggle(true);

            expect(hasClass("o-scroll-clip")).toBe(true);
            expect(document.body.style.paddingRight).toBe("17px");
        });

        test("removes class and restores padding-right on deactivate", async () => {
            document.body.style.paddingRight = "4px";

            const { toggle } = withSetup(false, "clip");
            await toggle(true);
            await toggle(false);

            expect(hasClass("o-scroll-clip")).toBe(false);
            expect(document.body.style.paddingRight).toBe("4px");
        });

        test("removes class on component unmount", () => {
            const { unmount } = withSetup(true, "clip");
            expect(hasClass("o-scroll-clip")).toBe(true);

            unmount();
            expect(hasClass("o-scroll-clip")).toBe(false);
        });
    });

    describe("keep mode", () => {
        test("adds scroll-keep class and pins body to saved scroll position on activate", async () => {
            vi.spyOn(window, "scrollY", "get").mockReturnValue(300);

            const { toggle } = withSetup(false, "keep");
            await toggle(true);

            expect(hasClass("o-scroll-keep")).toBe(true);
            expect(document.body.style.top).toBe("-300px");
        });

        test("removes class, clears top, and restores scroll position on deactivate", async () => {
            vi.spyOn(window, "scrollY", "get").mockReturnValue(300);

            const { toggle } = withSetup(false, "keep");
            await toggle(true);
            await toggle(false);

            expect(hasClass("o-scroll-keep")).toBe(false);
            expect(document.body.style.top).toBe("");
            expect(window.scrollTo).toHaveBeenCalledWith({
                top: 300,
                behavior: "instant",
            });
        });

        test("handles scroll position 0 correctly (falsy value must not be lost)", async () => {
            vi.spyOn(window, "scrollY", "get").mockReturnValue(0);

            const { toggle } = withSetup(false, "keep");
            await toggle(true);

            expect(document.body.style.top).toBe("0px");

            await toggle(false);
            expect(window.scrollTo).toHaveBeenCalledWith({
                top: 0,
                behavior: "instant",
            });
        });

        test("restores scroll and removes class on component unmount", () => {
            vi.spyOn(window, "scrollY", "get").mockReturnValue(120);

            const { unmount } = withSetup(true, "keep");
            unmount();

            expect(hasClass("o-scroll-keep")).toBe(false);
            expect(document.body.style.top).toBe("");
            expect(window.scrollTo).toHaveBeenCalledWith({
                top: 120,
                behavior: "instant",
            });
        });
    });

    describe("off mode", () => {
        test("does not touch the body", async () => {
            const { toggle } = withSetup(false, "off");
            await toggle(true);

            expect(document.body.className).toBe("");
            expect(document.body.style.cssText).toBe("");

            await toggle(false);
            expect(window.scrollTo).not.toHaveBeenCalled();
        });

        test("does not hold a lock that releases another one", async () => {
            const a = withSetup(true, "clip");
            const b = withSetup(true, "off");

            await b.toggle(false);
            expect(hasClass("o-scroll-clip")).toBe(true);

            b.unmount();
            expect(hasClass("o-scroll-clip")).toBe(true);

            await a.toggle(false);
            expect(hasClass("o-scroll-clip")).toBe(false);
        });
    });

    describe("reactivity", () => {
        test("locks immediately if initially active", () => {
            withSetup(true, "clip");
            expect(hasClass("o-scroll-clip")).toBe(true);
        });

        test("does not lock if initially inactive", () => {
            withSetup(false, "clip");
            expect(hasClass("o-scroll-clip")).toBe(false);
        });

        test("follows the active state", async () => {
            const { toggle } = withSetup(false, "clip");

            await toggle(true);
            expect(hasClass("o-scroll-clip")).toBe(true);

            await toggle(false);
            expect(hasClass("o-scroll-clip")).toBe(false);

            await toggle(true);
            expect(hasClass("o-scroll-clip")).toBe(true);
        });

        test("reads the mode when the lock is taken", async () => {
            const mode = ref<ScrollLock>("clip");
            const { toggle } = withSetup(false, mode);

            mode.value = "keep";
            await toggle(true);

            expect(hasClass("o-scroll-keep")).toBe(true);
            expect(hasClass("o-scroll-clip")).toBe(false);
        });
    });

    describe("stacking — multiple overlays open simultaneously", () => {
        test("class is not removed while a second overlay is still active", async () => {
            const a = withSetup(true, "clip");
            const b = withSetup(true, "clip");

            await a.toggle(false);
            expect(hasClass("o-scroll-clip")).toBe(true);

            await b.toggle(false);
            expect(hasClass("o-scroll-clip")).toBe(false);
        });

        test("unmounting an active overlay does not release the lock while another is still open", () => {
            const a = withSetup(true, "clip");
            const b = withSetup(true, "clip");

            a.unmount();
            expect(hasClass("o-scroll-clip")).toBe(true);

            b.unmount();
            expect(hasClass("o-scroll-clip")).toBe(false);
        });

        test("unmounting a never activated overlay does not release the lock of another", () => {
            const a = withSetup(true, "clip");
            const inactive = withSetup(false, "clip");

            inactive.unmount();
            expect(hasClass("o-scroll-clip")).toBe(true);

            a.unmount();
            expect(hasClass("o-scroll-clip")).toBe(false);
        });

        test("closing and then unmounting an overlay releases its lock only once", async () => {
            const a = withSetup(true, "clip");
            const b = withSetup(true, "clip");

            await b.toggle(false);
            b.unmount();
            expect(hasClass("o-scroll-clip")).toBe(true);

            a.unmount();
            expect(hasClass("o-scroll-clip")).toBe(false);
        });

        test("the mode of the first overlay wins", async () => {
            const a = withSetup(true, "clip");
            const b = withSetup(true, "keep");

            expect(hasClass("o-scroll-clip")).toBe(true);
            expect(hasClass("o-scroll-keep")).toBe(false);

            await a.toggle(false);
            expect(hasClass("o-scroll-clip")).toBe(true);

            await b.toggle(false);
            expect(hasClass("o-scroll-clip")).toBe(false);
            expect(window.scrollTo).not.toHaveBeenCalled();
        });

        test("saves the scroll position only once for stacked keep locks", async () => {
            const scrollY = vi.spyOn(window, "scrollY", "get");
            scrollY.mockReturnValue(300);

            const a = withSetup(true, "keep");
            // the body is fixed now, so the browser reports no scroll offset
            scrollY.mockReturnValue(0);
            const b = withSetup(true, "keep");

            await b.toggle(false);
            await a.toggle(false);

            expect(document.body.style.top).toBe("");
            expect(window.scrollTo).toHaveBeenCalledTimes(1);
            expect(window.scrollTo).toHaveBeenCalledWith({
                top: 300,
                behavior: "instant",
            });
        });
    });
});
