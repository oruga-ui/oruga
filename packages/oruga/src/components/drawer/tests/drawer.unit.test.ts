import {
    describe,
    test,
    expect,
    afterEach,
    beforeEach,
    vi,
    type MockInstance,
} from "vitest";
import { enableAutoUnmount, flushPromises, mount } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";

import ODrawer from "@/components/drawer/Drawer.vue";
import type { DrawerProps } from "../props";

describe("ODrawer tests", () => {
    enableAutoUnmount(afterEach);

    const global = { stubs: { teleport: true } };

    function mountDrawer(props?: DrawerProps): ReturnType<typeof mount> {
        return mount(ODrawer, {
            // animations are tested separately
            props: { animation: false, ...props },
            slots: { default: "<button>Content</button>" },
            global,
        });
    }

    /** mount a drawer with slots and mount options, with animations disabled by default */
    function mountDrawerWith(
        props?: DrawerProps,
        slots?: Record<string, string>,
        options: Record<string, unknown> = {},
    ): ReturnType<typeof mount> {
        return mount(ODrawer, {
            props: { animation: false, ...props },
            slots,
            global,
            ...options,
        });
    }

    /** let the mocked close keep the return value and fire the close event like a browser does */
    function mockCloseWithReturnValue(): void {
        vi.spyOn(HTMLDialogElement.prototype, "close").mockImplementation(
            function (this: HTMLDialogElement, returnValue?: string): void {
                if (returnValue !== undefined) this.returnValue = returnValue;
                this.open = false;
                this.dispatchEvent(new Event("close"));
            },
        );
    }

    describe("render", () => {
        test("render correctly", () => {
            const wrapper = mountDrawer();
            expect(!!wrapper.vm).toBeTruthy();
            expect(wrapper.exists()).toBeTruthy();

            const dialog = wrapper.find("dialog");
            expect(dialog.exists()).toBeTruthy();
            expect(dialog.attributes("data-oruga")).toBe("drawer");
            expect(dialog.classes("o-drawer")).toBeTruthy();
            expect(dialog.classes("o-drawer--left")).toBeTruthy();
            expect(dialog.classes("o-drawer--active")).toBeFalsy();
            expect(dialog.text()).toBe("Content");
        });

        test("is not open when not active", () => {
            const wrapper = mountDrawer();
            const dialog = wrapper.find("dialog");
            expect((dialog.element as HTMLDialogElement).open).toBeFalsy();
            // dialog semantic is native and must not be set manually
            expect(dialog.attributes("role")).toBeUndefined();
            expect(dialog.attributes("aria-modal")).toBeUndefined();
        });

        test("is open when active", () => {
            const wrapper = mountDrawer({ active: true });
            const dialog = wrapper.find("dialog");
            expect(dialog.classes("o-drawer--active")).toBeTruthy();
            expect((dialog.element as HTMLDialogElement).open).toBeTruthy();
        });

        test("opens the dialog when active get changed", async () => {
            const wrapper = mountDrawer();
            const dialog = wrapper.find("dialog");
            expect((dialog.element as HTMLDialogElement).open).toBeFalsy();

            await wrapper.setProps({ active: true });
            await nextTick();

            expect((dialog.element as HTMLDialogElement).open).toBeTruthy();
        });

        test("render position and fullscreen classes", () => {
            const wrapper = mountDrawer({
                position: "right",
                fullscreen: true,
            });
            const dialog = wrapper.find("dialog");
            expect(dialog.classes("o-drawer--right")).toBeTruthy();
            expect(dialog.classes("o-drawer--fullscreen")).toBeTruthy();
        });

        test("render aria props on the dialog element", () => {
            const wrapper = mountDrawer({
                ariaLabel: "Navigation",
                ariaDescribedby: "description",
            });
            const dialog = wrapper.find("dialog");
            expect(dialog.attributes("aria-label")).toBe("Navigation");
            expect(dialog.attributes("aria-describedby")).toBe("description");
        });

        test("pass attributes to the dialog element", () => {
            const wrapper = mount(ODrawer, {
                props: { active: true },
                attrs: { "aria-label": "Navigation" },
                global,
            });
            expect(wrapper.find("dialog").attributes("aria-label")).toBe(
                "Navigation",
            );
        });
    });

    describe("structure", () => {
        function mountStructure(
            props?: DrawerProps,
            slots?: Record<string, string>,
        ): ReturnType<typeof mount> {
            return mount(ODrawer, {
                props: { animation: false, ...props },
                slots,
                global,
            });
        }

        test("renders only the body when only the default slot is used", () => {
            const wrapper = mountDrawer({ active: true });
            expect(wrapper.find("header").exists()).toBe(false);
            expect(wrapper.find("footer").exists()).toBe(false);
            const body = wrapper.find(".o-drawer__body");
            expect(body.exists()).toBe(true);
            expect(body.text()).toBe("Content");
        });

        test("renders the content prop in the body", () => {
            const wrapper = mountStructure({ active: true, content: "Hello" });
            expect(wrapper.find(".o-drawer__body").text()).toBe("Hello");
        });

        test("renders nothing when there is no content, header or footer", () => {
            const wrapper = mountStructure({ active: true });
            expect(wrapper.find("header").exists()).toBe(false);
            expect(wrapper.find(".o-drawer__body").exists()).toBe(false);
            expect(wrapper.find("footer").exists()).toBe(false);
        });

        test("renders title and subtitle in the header and labels the dialog", () => {
            const wrapper = mountStructure({
                active: true,
                title: "My Title",
                subtitle: "My Subtitle",
            });
            const header = wrapper.find("header.o-drawer__header");
            expect(header.exists()).toBe(true);

            const title = header.find("h1");
            expect(title.text()).toBe("My Title");
            expect(title.classes("o-drawer__header-title")).toBe(true);
            expect(header.find("h2").text()).toBe("My Subtitle");

            expect(wrapper.find("dialog").attributes("aria-labelledby")).toBe(
                title.attributes("id"),
            );
        });

        test("does not set aria-labelledby without a title", () => {
            const wrapper = mountStructure({ active: true, subtitle: "Sub" });
            expect(
                wrapper.find("dialog").attributes("aria-labelledby"),
            ).toBeUndefined();
        });

        test("header slot replaces the header content", () => {
            const wrapper = mountStructure(
                { active: true, title: "Ignored" },
                { header: "<span>Custom header</span>" },
            );
            const header = wrapper.find("header");
            expect(header.text()).toBe("Custom header");
            expect(header.find("h1").exists()).toBe(false);
        });

        test("renders a close button when closeable", async () => {
            const wrapper = mountStructure({ active: true, closeable: true });
            const button = wrapper.find('[data-oruga="close"]');
            expect(button.exists()).toBe(true);
            expect(button.attributes("aria-label")).toBe("Close");
            expect(button.classes("o-drawer__close")).toBe(true);

            const dialog = wrapper.find("dialog").element as HTMLDialogElement;
            await button.trigger("click");

            expect(dialog.open).toBe(false);
            expect(wrapper.emitted("close")).toHaveLength(1);
        });

        test("renders no close button by default", () => {
            const wrapper = mountStructure({ active: true, title: "Title" });
            expect(wrapper.find('[data-oruga="close"]').exists()).toBe(false);
        });

        test("renders the footer buttons", () => {
            const wrapper = mountStructure({
                active: true,
                confirmButton: "OK",
                cancelButton: "CANCEL",
                buttonPosition: "right",
            });
            const footer = wrapper.find("footer");
            expect(footer.classes("o-drawer__footer")).toBe(true);
            expect(footer.classes("o-drawer__footer--right")).toBe(true);
            expect(footer.find(".o-drawer__confirm-button").text()).toBe("OK");
            expect(footer.find(".o-drawer__cancel-button").text()).toBe(
                "CANCEL",
            );
        });

        test("confirm button emits confirm and keeps the drawer open", async () => {
            const wrapper = mountStructure({
                active: true,
                confirmButton: "OK",
            });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;

            await wrapper.find(".o-drawer__confirm-button").trigger("click");

            expect(wrapper.emitted("confirm")).toHaveLength(1);
            expect(wrapper.emitted("close")).toBeUndefined();
            expect(dialog.open).toBe(true);
        });

        test("confirm button closes the drawer with closeOnConfirm", async () => {
            const closeSpy = vi.spyOn(HTMLDialogElement.prototype, "close");
            const wrapper = mountStructure({
                active: true,
                confirmButton: "OK",
                closeOnConfirm: true,
            });

            await wrapper.find(".o-drawer__confirm-button").trigger("click");

            expect(wrapper.emitted("confirm")).toHaveLength(1);
            expect(closeSpy).toHaveBeenCalledWith("confirm");
            expect(wrapper.emitted("close")).toHaveLength(1);
        });

        test("cancel button closes the drawer with a cancel value", async () => {
            const closeSpy = vi.spyOn(HTMLDialogElement.prototype, "close");
            const wrapper = mountStructure({
                active: true,
                cancelButton: "CANCEL",
            });

            await wrapper.find(".o-drawer__cancel-button").trigger("click");

            expect(closeSpy).toHaveBeenCalledWith("cancel");
            expect(wrapper.emitted("close")).toHaveLength(1);
        });

        test("renders the loading spinner when loading", () => {
            const wrapper = mountStructure({
                active: true,
                content: "Hello",
                loading: true,
                loadingLabel: "Loading data",
            });
            const loading = wrapper.find('[data-oruga="loading"]');
            expect(loading.exists()).toBe(true);
            expect(loading.text()).toContain("Loading data");
        });

        test("does not render the loading spinner by default", () => {
            const wrapper = mountStructure({ active: true, content: "Hello" });
            expect(wrapper.find('[data-oruga="loading"]').exists()).toBe(false);
        });

        test("shows the loading state on the confirm button", () => {
            const wrapper = mountStructure({
                active: true,
                confirmButton: "OK",
                loading: true,
            });
            expect(
                wrapper.find(".o-drawer__confirm-button").classes(),
            ).toContain("o-button--loading");
        });

        test("footer slot replaces the footer content", () => {
            const wrapper = mountStructure(
                { active: true, confirmButton: "OK" },
                { footer: "<span>Custom footer</span>" },
            );
            const footer = wrapper.find("footer");
            expect(footer.text()).toBe("Custom footer");
            expect(footer.find(".o-drawer__confirm-button").exists()).toBe(
                false,
            );
        });
    });

    describe("resizable", () => {
        /** mount a drawer with a mocked dialog size, since jsdom has no layout */
        async function mountResizable(
            props: DrawerProps = {},
            dialogSize = 300,
        ): Promise<{
            wrapper: ReturnType<typeof mount>;
            dialog: HTMLDialogElement;
            handle: ReturnType<ReturnType<typeof mount>["find"]>;
        }> {
            const wrapper = mountDrawer({ resizable: true, ...props });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;
            for (const key of ["offsetWidth", "offsetHeight"])
                Object.defineProperty(dialog, key, {
                    value: dialogSize,
                    configurable: true,
                });
            await wrapper.setProps({ active: true });
            await nextTick();
            return {
                wrapper,
                dialog,
                handle: wrapper.find('[role="separator"]'),
            };
        }

        function pointer(
            type: string,
            clientX: number,
            clientY = 0,
        ): MouseEvent {
            return new MouseEvent(type, {
                clientX,
                clientY,
                bubbles: true,
                cancelable: true,
            });
        }

        test("renders no handle by default", () => {
            const wrapper = mountDrawer({ active: true });
            expect(wrapper.find('[role="separator"]').exists()).toBe(false);
            expect(wrapper.find("dialog").classes("o-drawer--resizable")).toBe(
                false,
            );
        });

        test("renders no handle in fullscreen", () => {
            const wrapper = mountDrawer({
                active: true,
                resizable: true,
                fullscreen: true,
            });
            expect(wrapper.find('[role="separator"]').exists()).toBe(false);
        });

        test("renders an accessible handle", async () => {
            const { wrapper, handle } = await mountResizable();

            expect(wrapper.find("dialog").classes("o-drawer--resizable")).toBe(
                true,
            );
            expect(handle.classes("o-drawer__resize-handle")).toBe(true);
            expect(handle.attributes("tabindex")).toBe("0");
            expect(handle.attributes("aria-label")).toBe("Resize");
            expect(handle.attributes("aria-orientation")).toBe("vertical");
            expect(handle.attributes("aria-valuenow")).toBe("300");
            expect(handle.attributes("aria-valuemin")).toBe("100");
            expect(handle.attributes("aria-valuemax")).toBe(
                String(window.innerWidth),
            );
        });

        test("renders a horizontal separator for top and bottom", async () => {
            const { handle } = await mountResizable({ position: "top" });
            expect(handle.attributes("aria-orientation")).toBe("horizontal");
            expect(handle.attributes("aria-valuemax")).toBe(
                String(window.innerHeight),
            );
        });

        test("custom label is rendered", async () => {
            const { handle } = await mountResizable({
                ariaResizeLabel: "Change width",
            });
            expect(handle.attributes("aria-label")).toBe("Change width");
        });

        test.each<{
            position: NonNullable<DrawerProps["position"]>;
            increase: string;
            decrease: string;
            style: string;
        }>([
            {
                position: "left",
                increase: "ArrowRight",
                decrease: "ArrowLeft",
                style: "width",
            },
            {
                position: "right",
                increase: "ArrowLeft",
                decrease: "ArrowRight",
                style: "width",
            },
            {
                position: "top",
                increase: "ArrowDown",
                decrease: "ArrowUp",
                style: "height",
            },
            {
                position: "bottom",
                increase: "ArrowUp",
                decrease: "ArrowDown",
                style: "height",
            },
        ])(
            "resizes the $position drawer with the arrow keys",
            async ({ position, increase, decrease, style }) => {
                const { wrapper, dialog, handle } = await mountResizable({
                    position,
                });

                await handle.trigger("keydown", { key: increase });
                expect(wrapper.emitted("resize")).toEqual([[310]]);
                expect(dialog.style.getPropertyValue(style)).toBe("310px");

                await handle.trigger("keydown", {
                    key: increase,
                    shiftKey: true,
                });
                expect(wrapper.emitted("resize")![1]).toEqual([360]);

                await handle.trigger("keydown", { key: decrease });
                expect(wrapper.emitted("resize")![2]).toEqual([350]);
                expect(handle.attributes("aria-valuenow")).toBe("350");
            },
        );

        test("Home and End resize to the limits", async () => {
            const { wrapper, handle } = await mountResizable();

            await handle.trigger("keydown", { key: "Home" });
            await handle.trigger("keydown", { key: "End" });

            // the smallest size and the viewport
            expect(wrapper.emitted("resize")).toEqual([
                [100],
                [window.innerWidth],
            ]);
        });

        test("emits only changes at the limit", async () => {
            const { wrapper, handle } = await mountResizable();

            await handle.trigger("keydown", { key: "End" });
            await handle.trigger("keydown", { key: "ArrowRight" });

            expect(wrapper.emitted("resize")).toEqual([[window.innerWidth]]);
        });

        test("uses the CSS min and max size of the dialog as limits", async () => {
            const wrapper = mountDrawer({ resizable: true });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;
            dialog.style.minWidth = "250px";
            dialog.style.maxWidth = "320px";
            Object.defineProperty(dialog, "offsetWidth", {
                value: 300,
                configurable: true,
            });
            await wrapper.setProps({ active: true });
            await nextTick();
            const handle = wrapper.find('[role="separator"]');
            expect(handle.attributes("aria-valuemin")).toBe("250");
            expect(handle.attributes("aria-valuemax")).toBe("320");

            await handle.trigger("keydown", { key: "Home" });
            await handle.trigger("keydown", { key: "End" });

            expect(wrapper.emitted("resize")).toEqual([[250], [320]]);
        });

        test("never resizes below the smallest size", async () => {
            const wrapper = mountDrawer({ resizable: true });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;
            dialog.style.minWidth = "10px";
            await wrapper.setProps({ active: true });
            await nextTick();

            const handle = wrapper.find('[role="separator"]');
            expect(handle.attributes("aria-valuemin")).toBe("100");
        });

        test("ignores other keys", async () => {
            const { wrapper, handle } = await mountResizable();
            const event = new KeyboardEvent("keydown", {
                key: "a",
                cancelable: true,
                bubbles: true,
            });

            handle.element.dispatchEvent(event);

            expect(event.defaultPrevented).toBe(false);
            expect(wrapper.emitted("resize")).toBeUndefined();
        });

        test("resizes the left drawer by dragging the handle", async () => {
            const { wrapper, dialog, handle } = await mountResizable();

            handle.element.dispatchEvent(pointer("pointerdown", 300));
            await nextTick();
            expect(dialog.classList.contains("o-drawer--resizing")).toBe(true);

            handle.element.dispatchEvent(pointer("pointermove", 360));
            await nextTick();
            expect(wrapper.emitted("resize")).toEqual([[360]]);
            expect(dialog.style.width).toBe("360px");

            handle.element.dispatchEvent(pointer("pointerup", 360));
            await nextTick();
            expect(dialog.classList.contains("o-drawer--resizing")).toBe(false);

            // moving after the drag has ended does not resize
            handle.element.dispatchEvent(pointer("pointermove", 500));
            expect(wrapper.emitted("resize")).toHaveLength(1);
        });

        test("resizes the right drawer by dragging the handle", async () => {
            const { wrapper, handle } = await mountResizable({
                position: "right",
            });

            handle.element.dispatchEvent(pointer("pointerdown", 300));
            // moving away from the right edge makes the drawer bigger
            handle.element.dispatchEvent(pointer("pointermove", 250));

            expect(wrapper.emitted("resize")).toEqual([[350]]);
        });

        test("resizes the bottom drawer vertically by dragging the handle", async () => {
            const { wrapper, dialog, handle } = await mountResizable({
                position: "bottom",
            });

            handle.element.dispatchEvent(pointer("pointerdown", 0, 500));
            handle.element.dispatchEvent(pointer("pointermove", 0, 450));
            await nextTick();

            expect(wrapper.emitted("resize")).toEqual([[350]]);
            expect(dialog.style.height).toBe("350px");
        });

        test("does not resize without pressing the handle", async () => {
            const { wrapper, handle } = await mountResizable();

            handle.element.dispatchEvent(pointer("pointermove", 400));

            expect(wrapper.emitted("resize")).toBeUndefined();
        });

        test("captures the pointer on the handle while dragging", async () => {
            const { handle } = await mountResizable();
            const el = handle.element as HTMLElement;
            el.setPointerCapture = vi.fn();
            el.hasPointerCapture = vi.fn(() => true);
            el.releasePointerCapture = vi.fn();

            el.dispatchEvent(pointer("pointerdown", 300));
            expect(el.setPointerCapture).toHaveBeenCalledOnce();

            el.dispatchEvent(pointer("pointerup", 300));
            expect(el.releasePointerCapture).toHaveBeenCalledOnce();
        });

        test("stops resizing when the pointer is cancelled", async () => {
            const { wrapper, dialog, handle } = await mountResizable();

            handle.element.dispatchEvent(pointer("pointerdown", 300));
            handle.element.dispatchEvent(pointer("pointercancel", 300));
            await nextTick();
            expect(dialog.classList.contains("o-drawer--resizing")).toBe(false);

            handle.element.dispatchEvent(pointer("pointermove", 400));
            expect(wrapper.emitted("resize")).toBeUndefined();
        });

        test("stops resizing when the drawer is closed", async () => {
            const { wrapper, dialog, handle } = await mountResizable();

            handle.element.dispatchEvent(pointer("pointerdown", 300));
            await nextTick();
            expect(dialog.classList.contains("o-drawer--resizing")).toBe(true);

            await wrapper.setProps({ active: false });
            await nextTick();

            expect(dialog.classList.contains("o-drawer--resizing")).toBe(false);
        });

        test("resets the size when the position changes", async () => {
            const { wrapper, dialog, handle } = await mountResizable();
            await handle.trigger("keydown", { key: "ArrowRight" });
            expect(dialog.style.width).toBe("310px");

            await wrapper.setProps({ position: "top" });

            expect(dialog.style.width).toBe("");
        });

        test("removes the size when resizable is disabled", async () => {
            const { wrapper, dialog, handle } = await mountResizable();
            await handle.trigger("keydown", { key: "ArrowRight" });
            expect(dialog.style.width).toBe("310px");

            await wrapper.setProps({ resizable: false });

            expect(dialog.style.width).toBe("");
            expect(wrapper.find('[role="separator"]').exists()).toBe(false);
        });
    });

    describe("classes", () => {
        test("toggles the active class", async () => {
            const wrapper = mountDrawer({ active: true });
            const dialog = wrapper.find("dialog");
            expect(dialog.classes("o-drawer--active")).toBe(true);

            await wrapper.setProps({ active: false });
            await nextTick();

            expect(dialog.classes("o-drawer--active")).toBe(false);
        });

        test("renders the teleport class", () => {
            const wrapper = mountDrawer({ teleport: true });
            expect(wrapper.find("dialog").classes("o-drawer--teleport")).toBe(
                true,
            );
        });

        test("renders no teleport class by default", () => {
            const wrapper = mountDrawer();
            expect(wrapper.find("dialog").classes("o-drawer--teleport")).toBe(
                false,
            );
        });

        test("renders the mobile class on small screens", () => {
            vi.spyOn(window, "matchMedia").mockImplementation(
                (query) =>
                    ({
                        matches: true,
                        media: query,
                        addEventListener: vi.fn(),
                        removeEventListener: vi.fn(),
                    }) as unknown as MediaQueryList,
            );

            const wrapper = mountDrawer({ mobileBreakpoint: "768px" });

            expect(wrapper.find("dialog").classes("o-drawer--mobile")).toBe(
                true,
            );
        });

        test("renders no mobile class on large screens", () => {
            const wrapper = mountDrawer({ mobileBreakpoint: "768px" });
            expect(wrapper.find("dialog").classes("o-drawer--mobile")).toBe(
                false,
            );
        });

        test("override replaces the default classes", () => {
            const wrapper = mountDrawer({
                override: true,
                rootClass: "my-root",
            });
            const classes = wrapper.find("dialog").classes();
            expect(classes).toContain("my-root");
            expect(classes).not.toContain("o-drawer");
            expect(classes).not.toContain("o-drawer--left");
        });

        test("applies custom class props to each part", () => {
            const wrapper = mountDrawerWith({
                active: true,
                closeable: true,
                title: "Title",
                subtitle: "Subtitle",
                content: "Content",
                confirmButton: "OK",
                cancelButton: "CANCEL",
                rootClass: "c-root",
                headerClass: "c-header",
                titleClass: "c-title",
                subtitleClass: "c-subtitle",
                closeClass: "c-close",
                bodyClass: "c-body",
                footerClass: "c-footer",
                confirmButtonClass: "c-confirm",
                cancelButtonClass: "c-cancel",
            });

            expect(wrapper.find("dialog").classes("c-root")).toBe(true);
            expect(wrapper.find("header").classes("c-header")).toBe(true);
            expect(wrapper.find("h1").classes("c-title")).toBe(true);
            expect(wrapper.find("h2").classes("c-subtitle")).toBe(true);
            expect(
                wrapper.find('[data-oruga="close"]').classes("c-close"),
            ).toBe(true);
            expect(wrapper.find(".o-drawer__body").classes("c-body")).toBe(
                true,
            );
            expect(wrapper.find("footer").classes("c-footer")).toBe(true);
            expect(
                wrapper.find(".o-drawer__confirm-button").classes("c-confirm"),
            ).toBe(true);
            expect(
                wrapper.find(".o-drawer__cancel-button").classes("c-cancel"),
            ).toBe(true);
        });
    });

    describe("slots", () => {
        test("title and subtitle slots replace the props", () => {
            const wrapper = mountDrawerWith(
                {
                    active: true,
                    title: "Prop title",
                    subtitle: "Prop subtitle",
                },
                {
                    title: "<b>Slot title</b>",
                    subtitle: "<i>Slot subtitle</i>",
                },
            );
            expect(wrapper.find("h1").text()).toBe("Slot title");
            expect(wrapper.find("h2").text()).toBe("Slot subtitle");
        });

        test("title slot without a title prop labels the dialog", () => {
            const wrapper = mountDrawerWith(
                { active: true },
                { title: "Slot title" },
            );
            const title = wrapper.find("h1");
            expect(title.text()).toBe("Slot title");
            expect(wrapper.find("dialog").attributes("aria-labelledby")).toBe(
                title.attributes("id"),
            );
        });

        test("content slot replaces the content prop", () => {
            const wrapper = mountDrawerWith(
                { active: true, content: "Prop content" },
                { content: "Slot content" },
            );
            expect(wrapper.find(".o-drawer__body").text()).toBe("Slot content");
        });

        test("close slot replaces the icon of the close button", () => {
            const wrapper = mountDrawerWith(
                { active: true, closeable: true },
                { close: '<span class="custom-close">X</span>' },
            );
            const button = wrapper.find('[data-oruga="close"]');
            expect(button.find(".custom-close").exists()).toBe(true);
            expect(button.find('[data-oruga="icon"]').exists()).toBe(false);
        });

        test("close button renders an icon by default", () => {
            const wrapper = mountDrawerWith({ active: true, closeable: true });
            expect(
                wrapper
                    .find('[data-oruga="close"]')
                    .find('[data-oruga="icon"]')
                    .exists(),
            ).toBe(true);
        });

        test("default slot provides the close and confirm function", async () => {
            const wrapper = mountDrawerWith(
                { active: true },
                {
                    default: `<template #default="{ close, confirm }">
                        <button class="do-confirm" @click="confirm">C</button>
                        <button class="do-close" @click="close('x')">D</button>
                    </template>`,
                },
            );
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;

            await wrapper.find(".do-confirm").trigger("click");
            expect(wrapper.emitted("confirm")).toHaveLength(1);
            expect(dialog.open).toBe(true);

            await wrapper.find(".do-close").trigger("click");
            expect(dialog.open).toBe(false);
            expect(wrapper.emitted("close")).toHaveLength(1);
        });

        test("header slot provides the close function", async () => {
            const wrapper = mountDrawerWith(
                { active: true },
                {
                    header: `<template #header="{ close }">
                        <button class="header-close" @click="close()">H</button>
                    </template>`,
                },
            );
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;

            await wrapper.find(".header-close").trigger("click");

            expect(dialog.open).toBe(false);
        });

        test("footer slot provides the confirm function", async () => {
            const wrapper = mountDrawerWith(
                { active: true },
                {
                    footer: `<template #footer="{ confirm }">
                        <button class="footer-confirm" @click="confirm">F</button>
                    </template>`,
                },
            );

            await wrapper.find(".footer-confirm").trigger("click");

            expect(wrapper.emitted("confirm")).toHaveLength(1);
        });

        test("button slots render the footer buttons", () => {
            const wrapper = mountDrawerWith(
                { active: true },
                {
                    cancelButton: "<b>No</b>",
                    confirmButton: "<b>Yes</b>",
                },
            );
            expect(wrapper.find(".o-drawer__cancel-button").text()).toBe("No");
            expect(wrapper.find(".o-drawer__confirm-button").text()).toBe(
                "Yes",
            );
        });
    });

    describe("footer buttons", () => {
        test("disables the buttons", () => {
            const wrapper = mountDrawerWith({
                active: true,
                confirmButton: "OK",
                cancelButton: "CANCEL",
                disableConfirm: true,
                disableCancel: true,
            });
            const confirm = wrapper.find(".o-drawer__confirm-button");
            const cancel = wrapper.find(".o-drawer__cancel-button");
            expect(confirm.attributes("disabled")).toBeDefined();
            expect(confirm.classes("o-button--disabled")).toBe(true);
            expect(cancel.attributes("disabled")).toBeDefined();
            expect(cancel.classes("o-button--disabled")).toBe(true);
        });

        test("buttons are enabled by default", () => {
            const wrapper = mountDrawerWith({
                active: true,
                confirmButton: "OK",
                cancelButton: "CANCEL",
            });
            expect(
                wrapper
                    .find(".o-drawer__confirm-button")
                    .attributes("disabled"),
            ).toBeUndefined();
            expect(
                wrapper.find(".o-drawer__cancel-button").attributes("disabled"),
            ).toBeUndefined();
        });

        test("passes the variants to the buttons", () => {
            const wrapper = mountDrawerWith({
                active: true,
                confirmButton: "OK",
                cancelButton: "CANCEL",
                confirmVariant: "primary",
                cancelVariant: "danger",
            });
            expect(
                wrapper
                    .find(".o-drawer__confirm-button")
                    .classes("o-button--primary"),
            ).toBe(true);
            expect(
                wrapper
                    .find(".o-drawer__cancel-button")
                    .classes("o-button--danger"),
            ).toBe(true);
        });

        test.each<NonNullable<DrawerProps["buttonPosition"]>>([
            "left",
            "center",
            "right",
        ])("renders the footer position %s", (buttonPosition) => {
            const wrapper = mountDrawerWith({
                active: true,
                confirmButton: "OK",
                buttonPosition,
            });
            expect(
                wrapper
                    .find("footer")
                    .classes(`o-drawer__footer--${buttonPosition}`),
            ).toBe(true);
        });

        test("renders no footer position by default", () => {
            const wrapper = mountDrawerWith({
                active: true,
                confirmButton: "OK",
            });
            expect(wrapper.find("footer").classes().join(" ")).not.toContain(
                "o-drawer__footer--",
            );
        });

        test("arrow keys move the focus between the buttons", async () => {
            const wrapper = mountDrawerWith(
                {
                    active: true,
                    confirmButton: "OK",
                    cancelButton: "CANCEL",
                },
                undefined,
                { attachTo: document.body },
            );
            const confirm = wrapper.find(".o-drawer__confirm-button").element;
            const cancel = wrapper.find(".o-drawer__cancel-button").element;

            await wrapper
                .find(".o-drawer__cancel-button")
                .trigger("keyup", { key: "ArrowRight" });
            await nextTick();
            expect(document.activeElement).toBe(confirm);

            await wrapper
                .find(".o-drawer__confirm-button")
                .trigger("keyup", { key: "ArrowLeft" });
            await nextTick();
            expect(document.activeElement).toBe(cancel);
        });

        test("confirm expose function emits confirm", () => {
            const wrapper = mountDrawerWith({ active: true });

            (wrapper.vm as unknown as { confirm: () => void }).confirm();

            expect(wrapper.emitted("confirm")).toHaveLength(1);
        });

        test("confirm expose function does nothing when not active", () => {
            const wrapper = mountDrawerWith({ active: false });

            (wrapper.vm as unknown as { confirm: () => void }).confirm();

            expect(wrapper.emitted("confirm")).toBeUndefined();
        });
    });

    describe("injected component", () => {
        const Injected = defineComponent({
            props: { label: { type: String, default: "" } },
            emits: ["close", "ping"],
            template: `<div>
                <span class="injected-label">{{ label }}</span>
                <button class="injected-close" @click="$emit('close', 'from-component')">close</button>
                <button class="injected-ping" @click="$emit('ping', 1)">ping</button>
            </div>`,
        });

        test("renders the component with its props in the body", () => {
            const wrapper = mountDrawerWith({
                active: true,
                component: Injected,
                props: { label: "Hello" },
            });
            expect(wrapper.find(".o-drawer__body .injected-label").text()).toBe(
                "Hello",
            );
        });

        test("forwards the events of the component", async () => {
            const onPing = vi.fn();
            const wrapper = mountDrawerWith({
                active: true,
                component: Injected,
                events: { ping: onPing } as DrawerProps["events"],
            });

            await wrapper.find(".injected-ping").trigger("click");

            expect(onPing).toHaveBeenCalledWith(1);
        });

        test("closes the drawer with the value of the close event", async () => {
            mockCloseWithReturnValue();
            const wrapper = mountDrawerWith({
                active: true,
                component: Injected,
            });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;

            await wrapper.find(".injected-close").trigger("click");

            expect(dialog.open).toBe(false);
            expect(wrapper.emitted("close")).toHaveLength(1);
            expect(wrapper.emitted("close")![0][1]).toBe("from-component");
        });
    });

    describe("return value", () => {
        test("passes the return value to the close event", () => {
            mockCloseWithReturnValue();
            const wrapper = mountDrawerWith({ active: true });

            (wrapper.vm as unknown as { close: (v?: string) => void }).close(
                "done",
            );

            expect(wrapper.emitted("close")![0][1]).toBe("done");
        });

        test("passes the cancel value of the cancel button to the close event", async () => {
            mockCloseWithReturnValue();
            const wrapper = mountDrawerWith({
                active: true,
                cancelButton: "CANCEL",
            });

            await wrapper.find(".o-drawer__cancel-button").trigger("click");

            expect(wrapper.emitted("close")![0][1]).toBe("cancel");
        });

        test("passes the confirm value to the close event with closeOnConfirm", async () => {
            mockCloseWithReturnValue();
            const wrapper = mountDrawerWith({
                active: true,
                confirmButton: "OK",
                closeOnConfirm: true,
            });

            await wrapper.find(".o-drawer__confirm-button").trigger("click");

            expect(wrapper.emitted("close")![0][1]).toBe("confirm");
        });

        test("passes the return value to the cancel event", async () => {
            const wrapper = mountDrawerWith({ active: true });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;
            dialog.returnValue = "pending";

            dialog.dispatchEvent(new Event("cancel", { cancelable: true }));

            expect(wrapper.emitted("cancel")![0][1]).toBe("pending");
        });

        test("resets the return value when it gets reopened", async () => {
            const wrapper = mountDrawerWith({ active: true });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;
            dialog.returnValue = "old";

            await wrapper.setProps({ active: false });
            await wrapper.setProps({ active: true });
            await nextTick();

            expect(dialog.returnValue).toBe("");
        });
    });

    describe("reopen", () => {
        test("can be opened again after it has been closed", async () => {
            const showModal = vi.spyOn(
                HTMLDialogElement.prototype,
                "showModal",
            );
            const wrapper = mountDrawerWith({ active: true, backdrop: true });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;
            expect(dialog.open).toBe(true);

            await wrapper.setProps({ active: false });
            expect(dialog.open).toBe(false);

            await wrapper.setProps({ active: true });
            await nextTick();

            expect(dialog.open).toBe(true);
            expect(showModal).toHaveBeenCalledTimes(2);
        });

        test("updates the active state when it is closed by the user", async () => {
            const wrapper = mountDrawerWith({ active: true });

            wrapper
                .find("dialog")
                .element.dispatchEvent(
                    new Event("cancel", { cancelable: true }),
                );
            await nextTick();

            expect(wrapper.emitted("update:active")).toEqual([[false]]);
            expect(wrapper.find("dialog").classes("o-drawer--active")).toBe(
                false,
            );
        });
    });

    describe("teleport", () => {
        test("renders the drawer into the target element", () => {
            const target = document.createElement("div");
            target.id = "drawer-target";
            document.body.appendChild(target);

            const wrapper = mount(ODrawer, {
                props: {
                    active: true,
                    animation: false,
                    teleport: "#drawer-target",
                },
                slots: { default: "<span>Teleported</span>" },
            });

            try {
                const dialog = target.querySelector('[data-oruga="drawer"]');
                expect(dialog).not.toBeNull();
                expect(dialog?.textContent).toContain("Teleported");
            } finally {
                wrapper.unmount();
                target.remove();
            }
        });
    });

    describe("modality", () => {
        test("opens as modal dialog with backdrop", () => {
            const showModal = vi.spyOn(
                HTMLDialogElement.prototype,
                "showModal",
            );
            const show = vi.spyOn(HTMLDialogElement.prototype, "show");

            mountDrawer({ active: true, backdrop: true });

            expect(showModal).toHaveBeenCalledOnce();
            expect(show).not.toHaveBeenCalled();
        });

        test("opens as non-modal dialog without backdrop", () => {
            const showModal = vi.spyOn(
                HTMLDialogElement.prototype,
                "showModal",
            );
            const show = vi.spyOn(HTMLDialogElement.prototype, "show");

            mountDrawer({ active: true, backdrop: false });

            expect(show).toHaveBeenCalledOnce();
            expect(showModal).not.toHaveBeenCalled();
        });
    });

    describe("closedby", () => {
        test.each<{ props: DrawerProps; closedby: string }>([
            { props: {}, closedby: "any" },
            { props: { closeOnBackdrop: false }, closedby: "closerequest" },
            {
                props: { closeOnBackdrop: false, closeOnEscape: false },
                closedby: "none",
            },
            // a fullscreen drawer has no outside to click
            { props: { fullscreen: true }, closedby: "closerequest" },
            {
                props: { fullscreen: true, closeOnEscape: false },
                closedby: "none",
            },
        ])("render closedby $closedby for $props", ({ props, closedby }) => {
            const wrapper = mountDrawer(props);
            expect(wrapper.find("dialog").attributes("closedby")).toBe(
                closedby,
            );
        });
    });

    describe("close events", () => {
        function getClose(
            wrapper: ReturnType<typeof mountDrawer>,
        ): (value?: unknown) => void {
            return (
                wrapper.vm as unknown as { close: (value?: unknown) => void }
            ).close;
        }

        test("cancel event prevents the native close and closes the drawer", async () => {
            const wrapper = mountDrawer({ active: true });
            const dialog = wrapper.find("dialog");

            const event = new Event("cancel", { cancelable: true });
            dialog.element.dispatchEvent(event);
            await nextTick();

            // the native close has to be prevented to be able to animate the leave
            expect(event.defaultPrevented).toBe(true);
            expect(wrapper.emitted("cancel")).toHaveLength(1);
            expect(wrapper.emitted("cancel")![0][0]).toBe(event);
            // the component closed the dialog
            expect((dialog.element as HTMLDialogElement).open).toBe(false);
            expect(wrapper.emitted("close")).toHaveLength(1);
            expect(wrapper.emitted("close")![0][0]).toBeInstanceOf(Event);
            expect(wrapper.emitted("update:active")).toEqual([[false]]);
        });

        test("cancel event does not close the drawer when closeOnEscape is disabled", async () => {
            const wrapper = mountDrawer({
                active: true,
                closeOnEscape: false,
                closeOnBackdrop: false,
            });
            const dialog = wrapper.find("dialog");

            const event = new Event("cancel", { cancelable: true });
            dialog.element.dispatchEvent(event);
            await nextTick();

            // the dialog must stay open
            expect(event.defaultPrevented).toBe(true);
            expect(wrapper.emitted("cancel")).toHaveLength(1);
            expect(wrapper.emitted("close")).toBeUndefined();
            expect(wrapper.emitted("update:active")).toBeUndefined();
            expect((dialog.element as HTMLDialogElement).open).toBe(true);
        });

        describe("with closedby support", () => {
            // simulate a browser, which supports the `closedby` attribute
            beforeEach(() => {
                Object.defineProperty(HTMLDialogElement.prototype, "closedBy", {
                    value: "",
                    configurable: true,
                });
            });
            afterEach(() => {
                delete (HTMLDialogElement.prototype as { closedBy?: string })
                    .closedBy;
            });

            function escapeAndCancel(dialog: Element): Event {
                dialog.dispatchEvent(
                    new KeyboardEvent("keydown", {
                        key: "Escape",
                        bubbles: true,
                    }),
                );
                const event = new Event("cancel", { cancelable: true });
                dialog.dispatchEvent(event);
                dialog.dispatchEvent(
                    new KeyboardEvent("keyup", {
                        key: "Escape",
                        bubbles: true,
                    }),
                );
                return event;
            }

            test("closeOnEscape=false ignores the escape key but allows the light dismiss", async () => {
                const wrapper = mountDrawer({
                    active: true,
                    closeOnEscape: false,
                    closeOnBackdrop: true,
                });
                const dialog = wrapper.find("dialog")
                    .element as HTMLDialogElement;

                // escape key
                const escape = escapeAndCancel(dialog);
                await flushPromises();
                expect(escape.defaultPrevented).toBe(true);
                expect(wrapper.emitted("close")).toBeUndefined();
                expect(dialog.open).toBe(true);

                // light dismiss, which is a cancel event without a key event
                dialog.dispatchEvent(new Event("cancel", { cancelable: true }));
                await flushPromises();
                expect(wrapper.emitted("close")).toHaveLength(1);
                expect(dialog.open).toBe(false);
            });

            test("closeOnEscape=true closes the drawer with the escape key", async () => {
                const wrapper = mountDrawer({
                    active: true,
                    closeOnEscape: true,
                });
                const dialog = wrapper.find("dialog")
                    .element as HTMLDialogElement;

                escapeAndCancel(dialog);
                await flushPromises();

                expect(wrapper.emitted("close")).toHaveLength(1);
                expect(dialog.open).toBe(false);
            });
        });

        test("native close event closes the drawer", async () => {
            const wrapper = mountDrawer({ active: true });

            await wrapper.find("dialog").trigger("close");

            expect(wrapper.emitted("update:active")).toEqual([[false]]);
            expect(wrapper.emitted("close")).toHaveLength(1);
        });

        test("close slot function closes the drawer", async () => {
            const wrapper = mount(ODrawer, {
                props: { active: true },
                slots: {
                    default: `<template #default="{ close }"><button @click="close()">Close</button></template>`,
                },
                global,
            });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;

            await wrapper.find("button").trigger("click");

            expect(dialog.open).toBe(false);
            expect(wrapper.emitted("update:active")).toEqual([[false]]);
            expect(wrapper.emitted("close")).toHaveLength(1);
        });

        test("close expose function closes the drawer with a return value", () => {
            const closeSpy = vi.spyOn(HTMLDialogElement.prototype, "close");
            const wrapper = mountDrawer({ active: true });

            getClose(wrapper)("done");

            expect(closeSpy).toHaveBeenCalledWith("done");
            expect(wrapper.emitted("close")).toHaveLength(1);
        });

        test("close ignores a return value which is not a string", () => {
            const closeSpy = vi.spyOn(HTMLDialogElement.prototype, "close");
            const wrapper = mountDrawer({ active: true });

            // e.g. an event passed by a click handler
            getClose(wrapper)(new Event("click"));

            expect(closeSpy).toHaveBeenCalledWith(undefined);
        });

        test("close does nothing when not active", () => {
            const wrapper = mountDrawer({ active: false });

            getClose(wrapper)();

            expect(wrapper.emitted("close")).toBeUndefined();
            expect(wrapper.emitted("update:active")).toBeUndefined();
        });

        test("does not emit close when unmounting an open drawer", () => {
            const wrapper = mountDrawer({ active: true });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;
            expect(dialog.open).toBe(true);

            wrapper.unmount();

            // the dialog got closed to restore the focus
            expect(dialog.open).toBe(false);
            expect(wrapper.emitted("close")).toBeUndefined();
        });
    });

    describe("animation", () => {
        type FakeAnimation = {
            playState: string;
            finished: Promise<void>;
            reverse: ReturnType<typeof vi.fn>;
            cancel: ReturnType<typeof vi.fn>;
        };

        let resolveFinished: () => void;
        let animation: FakeAnimation;
        let animate: MockInstance<HTMLElement["animate"]>;

        beforeEach(() => {
            animation = {
                playState: "running",
                finished: new Promise<void>((resolve) => {
                    resolveFinished = resolve;
                }),
                reverse: vi.fn(),
                cancel: vi.fn(),
            };
            // replace the Web Animations API mock of the test setup
            animate = vi
                .spyOn(HTMLElement.prototype, "animate")
                .mockReturnValue(animation as unknown as Animation);
        });

        test.each<{
            position: NonNullable<DrawerProps["position"]>;
            from: string;
        }>([
            { position: "left", from: "translateX(-100%)" },
            { position: "right", from: "translateX(100%)" },
            { position: "top", from: "translateY(-100%)" },
            { position: "bottom", from: "translateY(100%)" },
        ])(
            "slides in from the $position edge by default",
            async ({ position, from }) => {
                const wrapper = mountDrawer({ position, animation: undefined });
                await wrapper.setProps({ active: true });
                await nextTick();

                expect(animate).toHaveBeenCalledOnce();
                const [keyframes] = animate.mock.calls[0];
                expect(keyframes[0].transform).toBe(from);
            },
        );

        test("custom animation overrides the default animation", async () => {
            const wrapper = mountDrawer({ animation: "fade" });
            await wrapper.setProps({ active: true });
            await nextTick();

            const [keyframes] = animate.mock.calls[0];
            expect(keyframes).toEqual([{ opacity: 0 }, { opacity: 1 }]);
        });

        test("does not animate when animation is disabled", async () => {
            const wrapper = mountDrawer({ animation: false });
            await wrapper.setProps({ active: true });
            await nextTick();
            expect(animate).not.toHaveBeenCalled();
        });

        test("plays the enter animation when initially active", () => {
            const wrapper = mountDrawer({
                active: true,
                animation: undefined,
            });

            expect(animate).toHaveBeenCalledOnce();
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;
            expect(dialog.open).toBe(true);
        });

        test("does not animate when initially active without animation", () => {
            mountDrawer({ active: true, animation: false });
            expect(animate).not.toHaveBeenCalled();
        });

        test("does not play a leave animation for a drawer which is closed from outside", async () => {
            const wrapper = mountDrawer({
                active: true,
                animation: undefined,
            });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;
            // the enter animation
            expect(animate).toHaveBeenCalledOnce();

            dialog.close();
            await flushPromises();

            expect(wrapper.emitted("update:active")).toEqual([[false]]);
            expect(animate).toHaveBeenCalledOnce();
        });

        test("closes the dialog after the leave animation has finished", async () => {
            const wrapper = mountDrawer({ active: true, animation: undefined });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;
            expect(dialog.open).toBe(true);

            await wrapper.setProps({ active: false });
            await nextTick();

            // the animation is playing in reverse, the dialog must stay open
            expect(animation.reverse).toHaveBeenCalledOnce();
            expect(dialog.open).toBe(true);

            resolveFinished();
            await flushPromises();

            expect(dialog.open).toBe(false);
        });

        test("stays open when reopened while the leave animation is playing", async () => {
            const wrapper = mountDrawer({ active: true, animation: undefined });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;

            await wrapper.setProps({ active: false });
            await nextTick();
            await wrapper.setProps({ active: true });
            await nextTick();

            // the leave animation got reversed back to visible
            expect(animation.reverse).toHaveBeenCalledTimes(2);

            // the stale leave animation must not close the dialog
            resolveFinished();
            await flushPromises();

            expect(dialog.open).toBe(true);
        });

        test("closes only once when it is closed again during the leave animation", async () => {
            const closeSpy = vi.spyOn(HTMLDialogElement.prototype, "close");
            const wrapper = mountDrawer({ active: true, animation: undefined });
            const vm = wrapper.vm as unknown as { close: () => void };

            vm.close();
            vm.close();
            resolveFinished();
            await flushPromises();

            expect(animate).toHaveBeenCalledOnce();
            expect(closeSpy).toHaveBeenCalledTimes(1);
        });

        test("does not animate the backdrop", async () => {
            const wrapper = mountDrawer({
                backdrop: true,
                animation: undefined,
            });
            await wrapper.setProps({ active: true });
            await nextTick();

            // only the drawer itself is animated
            expect(animate).toHaveBeenCalledOnce();
            expect(animate.mock.calls[0][1]).not.toHaveProperty(
                "pseudoElement",
            );
        });
    });

    describe("close without animation", () => {
        test("closes the dialog immediately when animation is disabled", async () => {
            const wrapper = mountDrawer({ active: true, animation: false });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;
            expect(dialog.open).toBe(true);

            await wrapper.setProps({ active: false });
            await nextTick();

            expect(dialog.open).toBe(false);
        });

        test("closes the dialog immediately when the user prefers reduced motion", async () => {
            vi.spyOn(window, "matchMedia").mockImplementation(
                (query) =>
                    ({
                        matches: true,
                        media: query,
                        addEventListener: vi.fn(),
                        removeEventListener: vi.fn(),
                    }) as unknown as MediaQueryList,
            );
            const wrapper = mountDrawer({ active: true, animation: undefined });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;

            await wrapper.setProps({ active: false });
            await nextTick();

            expect(dialog.open).toBe(false);
        });
    });

    describe("scroll", () => {
        test("locks the scroll when active with backdrop", async () => {
            const wrapper = mountDrawer({ active: true, backdrop: true });
            await nextTick();
            expect(document.body.classList.contains("o-scroll-keep")).toBe(
                true,
            );

            await wrapper.setProps({ active: false });
            await nextTick();
            expect(document.body.classList.contains("o-scroll-keep")).toBe(
                false,
            );
        });

        test("releases the scroll lock when backdrop get disabled while active", async () => {
            const wrapper = mountDrawer({ active: true, backdrop: true });
            await nextTick();
            expect(document.body.classList.contains("o-scroll-keep")).toBe(
                true,
            );

            await wrapper.setProps({ backdrop: false });
            await nextTick();
            expect(document.body.classList.contains("o-scroll-keep")).toBe(
                false,
            );
        });

        test("does not lock the scroll without backdrop", async () => {
            mountDrawer({ active: true, backdrop: false });
            await nextTick();
            expect(document.body.classList.contains("o-scroll-keep")).toBe(
                false,
            );
        });

        test("clips the scroll with blockScroll", async () => {
            mountDrawer({ active: true, backdrop: true, blockScroll: true });
            await nextTick();
            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                true,
            );
            expect(document.body.classList.contains("o-scroll-keep")).toBe(
                false,
            );
        });

        test("releases the scroll lock when it gets unmounted", async () => {
            const wrapper = mountDrawer({ active: true, backdrop: true });
            await nextTick();
            expect(document.body.classList.contains("o-scroll-keep")).toBe(
                true,
            );

            wrapper.unmount();

            expect(document.body.classList.contains("o-scroll-keep")).toBe(
                false,
            );
        });
    });
});
