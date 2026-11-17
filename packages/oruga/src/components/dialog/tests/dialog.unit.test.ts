import { describe, test, expect, afterEach, vi } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { nextTick } from "vue";

import ODialog from "@/components/dialog/Dialog.vue";

describe("ODialog test", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(ODialog, {
            props: {
                active: true,
                backdrop: false,
                title: "Adcanced Title",
                subtitle: "Advanced subtitle",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                confirmButton: "OK",
                cancelButton: "CANCEL",
            },
            global: {
                stubs: {
                    // intentionally stubs transition component
                    // to avoid potentially flaky snapshots
                    transition: true,
                    teleport: true,
                },
            },
        });

        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        const dialog = wrapper.find("dialog");
        expect(dialog.exists()).toBeTruthy();
        expect(dialog.attributes("data-oruga")).toBe("dialog");
        expect(dialog.classes("o-dialog--active")).toBeTruthy();
        expect(dialog.attributes("role")).toBe("dialog");
        expect(wrapper.html()).toMatchSnapshot();

        const backdrop = wrapper.find(".o-dialog__backdrop");
        expect(backdrop.exists()).toBeFalsy();
    });

    test("modal case", () => {
        const wrapper = mount(ODialog, {
            props: {
                active: true,
                backdrop: true,
            },
            global: {
                stubs: {
                    // intentionally stubs transition component
                    // to avoid potentially flaky snapshots
                    transition: true,
                    teleport: true,
                },
            },
        });

        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        const dialog = wrapper.find("dialog");
        expect(dialog.exists()).toBeTruthy();
        expect(dialog.attributes("data-oruga")).toBe("dialog");
        expect(dialog.classes("o-dialog--active")).toBeTruthy();
        expect(dialog.attributes("role")).toBe("dialog");
        expect(wrapper.html()).toMatchSnapshot();

        const backdrop = wrapper.find(".o-dialog__backdrop");
        expect(backdrop.exists()).toBeTruthy();
    });

    test("alert case", () => {
        const wrapper = mount(ODialog, {
            props: {
                active: true,
                alert: true,
            },
            global: {
                stubs: {
                    // intentionally stubs transition component
                    // to avoid potentially flaky snapshots
                    transition: true,
                    teleport: true,
                },
            },
        });

        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        const dialog = wrapper.find("dialog");
        expect(dialog.exists()).toBeTruthy();
        expect(dialog.attributes("data-oruga")).toBe("dialog");
        expect(dialog.classes("o-dialog--active")).toBeTruthy();
        expect(dialog.attributes("role")).toBe("alertdialog");
        expect(wrapper.html()).toMatchSnapshot();

        const backdrop = wrapper.find(".o-dialog__backdrop");
        expect(backdrop.exists()).toBeTruthy();
    });

    test("hide when active change to false", async () => {
        const wrapper = mount(ODialog, {
            props: {
                active: true,
            },
        });

        const dialog = wrapper.find("dialog");
        expect(dialog.exists()).toBeTruthy();
        expect(dialog.classes("o-dialog--active")).toBeTruthy();

        await wrapper.setProps({ active: false });

        expect(wrapper.emitted("confirm")).toBeUndefined();
        expect(wrapper.emitted("close")).toHaveLength(1);
        expect(dialog.classes("o-dialog--active")).toBeFalsy();
    });

    test("loading", () => {
        const wrapper = mount(ODialog, {
            props: { loading: true },
        });

        const loading = wrapper.find('[data-oruga="loading"]');
        expect(loading.exists()).toBeTruthy();
    });

    describe("verify header", () => {
        test("header", () => {
            const wrapper = mount(ODialog, {
                props: {
                    title: "Adcanced Title",
                    subtitle: "Advanced subtitle",
                },
            });

            const header = wrapper.find(".o-dialog__header");
            expect(header.exists()).toBeTruthy();
            expect(header.text()).toBe(
                `${wrapper.props("title")}${wrapper.props("subtitle")}`,
            );
        });

        test("header slot", () => {
            const headerSlot = "<div>MY HEADER</div>";
            const wrapper = mount(ODialog, {
                slots: { header: headerSlot },
            });

            const header = wrapper.find(".o-dialog__header");
            expect(header.exists()).toBeTruthy();
            expect(header.html()).toContain(headerSlot);
        });

        test("title prop", () => {
            const title = "<div>TEST_TITLE</div>";
            const wrapper = mount(ODialog, {
                props: { title },
            });

            const header = wrapper.find(".o-dialog__header");
            expect(header.exists()).toBeTruthy();
            expect(header.text()).toStrictEqual(title);
        });

        test("title slot", () => {
            const titleSlot = "<div>TEST_TITLE</div>";
            const wrapper = mount(ODialog, {
                slots: { title: titleSlot },
            });

            const header = wrapper.find(".o-dialog__header");
            expect(header.exists()).toBeTruthy();
            expect(header.html()).toContain(titleSlot);
        });

        test("name the dialog by the title prop", () => {
            const wrapper = mount(ODialog, { props: { title: "TEST_TITLE" } });

            const dialog = wrapper.find("dialog");
            const title = wrapper.find(".o-dialog__header-title");
            expect(title.attributes("id")).toBeTruthy();
            expect(dialog.attributes("aria-labelledby")).toBe(
                title.attributes("id"),
            );
            expect(dialog.attributes("aria-describedby")).toBeUndefined();
        });

        test("name the dialog by the title slot", () => {
            const wrapper = mount(ODialog, {
                slots: { title: "TEST_TITLE" },
            });

            const dialog = wrapper.find("dialog");
            const title = wrapper.find(".o-dialog__header-title");
            expect(title.attributes("id")).toBeTruthy();
            expect(dialog.attributes("aria-labelledby")).toBe(
                title.attributes("id"),
            );
        });

        test("prefer aria-label over the title as name", () => {
            const wrapper = mount(ODialog, {
                props: { title: "TEST_TITLE", ariaLabel: "TEST_LABEL" },
            });

            const dialog = wrapper.find("dialog");
            expect(dialog.attributes("aria-label")).toBe("TEST_LABEL");
            expect(dialog.attributes("aria-labelledby")).toBeUndefined();
        });

        test("pass aria-describedby through", () => {
            const wrapper = mount(ODialog, {
                props: { title: "TEST_TITLE", ariaDescribedby: "desc" },
            });

            const dialog = wrapper.find("dialog");
            expect(dialog.attributes("aria-describedby")).toBe("desc");
        });

        test("subtitle prop", () => {
            const subtitle = "<div>TEST_SUBTITLE</div>";
            const wrapper = mount(ODialog, {
                props: { subtitle },
            });

            const header = wrapper.find(".o-dialog__header");
            expect(header.exists()).toBeTruthy();
            expect(header.text()).toStrictEqual(subtitle);
        });

        test("subtitle slot", () => {
            const subtitleSlot = "<div>TEST_SUBTITLE</div>";
            const wrapper = mount(ODialog, {
                slots: { subtitle: subtitleSlot },
            });

            const header = wrapper.find(".o-dialog__header");
            expect(header.exists()).toBeTruthy();
            expect(header.html()).toContain(subtitleSlot);
        });

        test("header closeable", async () => {
            const onClose = vi.fn();

            const wrapper = mount(ODialog, {
                props: { active: true, closeable: true, onClose },
            });

            const dialog = wrapper.find("dialog");
            expect(dialog.exists()).toBeTruthy();
            expect(dialog.classes("o-dialog--active")).toBeTruthy();

            const closeButton = wrapper.find("header button");
            expect(closeButton.exists()).toBeTruthy();
            expect(closeButton.classes("o-dialog__close")).toBeTruthy();

            await closeButton.trigger("click");

            expect(wrapper.emitted("close")).toHaveLength(1);
            expect(dialog.classes("o-dialog--active")).toBeFalsy();
            expect(onClose).toHaveBeenCalledTimes(1);
        });
    });

    describe("verify body", () => {
        test("content prop", () => {
            const content = "<div>TEST_CONTENT</div>";
            const wrapper = mount(ODialog, {
                props: { content },
            });

            const body = wrapper.find(".o-dialog__body");
            expect(body.exists()).toBeTruthy();
            expect(body.text()).toStrictEqual(content);
        });

        test("content slot", () => {
            const contentSlot = "<div>TEST_CONTENT</div>";
            const wrapper = mount(ODialog, {
                slots: { default: contentSlot },
            });

            const body = wrapper.find(".o-dialog__body");
            expect(body.exists()).toBeTruthy();
            expect(body.html()).toContain(contentSlot);
        });
    });

    describe("verify footer", () => {
        test("footer buttons", () => {
            const wrapper = mount(ODialog, {
                props: {
                    confirmButton: "OK",
                    cancelButton: "CANCEL",
                },
            });

            const footer = wrapper.find(".o-dialog__footer");
            expect(footer.exists()).toBeTruthy();

            expect(footer.findAll("button")).toHaveLength(2);
        });

        test("footer slot", () => {
            const footerSlot = "<button>MYBUTTON</button>";
            const wrapper = mount(ODialog, {
                slots: { footer: footerSlot },
            });

            const body = wrapper.find(".o-dialog__footer");
            expect(body.exists()).toBeTruthy();
            expect(body.html()).toContain(footerSlot);
        });
    });

    describe("verify buttons", () => {
        test("rendering correct", () => {
            const wrapper = mount(ODialog, {
                props: { confirmButton: "ok", cancelButton: "cancel" },
            });

            const cancelButton = wrapper.find(".o-dialog__cancel-button");
            expect(cancelButton.exists()).toBeTruthy();
            expect(cancelButton.text()).toBe("cancel");

            const confirmButton = wrapper.find(".o-dialog__confirm-button");
            expect(confirmButton.exists()).toBeTruthy();
            expect(confirmButton.text()).toBe("ok");
        });

        test("cancel button event", async () => {
            const wrapper = mount(ODialog, {
                props: {
                    active: true,
                    confirmButton: "ok",
                    cancelButton: "cancel",
                },
            });

            const confirmButton = wrapper.find(".o-dialog__confirm-button");
            expect(confirmButton.exists()).toBeTruthy();

            await confirmButton.trigger("click");
            expect(wrapper.emitted("confirm")).toHaveLength(1);

            const cancelButton = wrapper.find(".o-dialog__cancel-button");
            expect(cancelButton.exists()).toBeTruthy();

            await cancelButton.trigger("click");
            expect(wrapper.emitted("close")).toHaveLength(1);
        });

        test("close on confirm", async () => {
            const wrapper = mount(ODialog, {
                props: {
                    active: true,
                    confirmButton: "ok",
                    closeOnConfirm: true,
                },
            });

            const dialog = wrapper.find("dialog");
            expect(dialog.exists()).toBeTruthy();
            expect(dialog.classes("o-dialog--active")).toBeTruthy();

            const confirmButton = wrapper.find(".o-dialog__confirm-button");
            expect(confirmButton.exists()).toBeTruthy();

            await confirmButton.trigger("click");

            expect(wrapper.emitted("confirm")).toHaveLength(1);
            expect(wrapper.emitted("close")).toHaveLength(1);
            expect(dialog.classes("o-dialog--active")).toBeFalsy();
        });

        test("closeOnConfirm equals false", async () => {
            const wrapper = mount(ODialog, {
                props: {
                    active: true,
                    confirmButton: "ok",
                    closeOnConfirm: false,
                },
            });

            const dialog = wrapper.find("dialog");
            expect(dialog.exists()).toBeTruthy();
            expect(dialog.classes("o-dialog--active")).toBeTruthy();

            const confirmButton = wrapper.find(".o-dialog__confirm-button");
            expect(confirmButton.exists()).toBeTruthy();

            await confirmButton.trigger("click");

            expect(wrapper.emitted("confirm")).toHaveLength(1);
            expect(wrapper.emitted("close")).toBeUndefined();
            expect(dialog.classes("o-dialog--active")).toBeTruthy();
        });

        test("show loading state on confirm", async () => {
            const wrapper = mount(ODialog, {
                props: {
                    active: true,
                    confirmButton: "ok",
                    closeOnConfirm: false,
                    onConfirm: () => {
                        wrapper.setProps({ loading: true });
                    },
                },
            });

            const dialog = wrapper.find("dialog");
            expect(dialog.exists()).toBeTruthy();
            expect(dialog.classes("o-dialog--active")).toBeTruthy();

            const confirmButton = wrapper.find(".o-dialog__confirm-button");
            expect(confirmButton.exists()).toBeTruthy();

            await confirmButton.trigger("click");

            expect(wrapper.emitted("confirm")).toHaveLength(1);
            expect(wrapper.emitted("close")).toBeUndefined();
            expect(dialog.classes("o-dialog--active")).toBeTruthy();

            const loading = wrapper.find('[data-oruga="loading"]');
            expect(loading.exists()).toBeTruthy();
        });
    });

    describe("verify draggable", () => {
        const defaultProps = { active: true, title: "Draggable Dialog" };
        const defaultGlobal = { stubs: { transition: true, teleport: true } };

        test("dialog has draggable class when draggable is true", () => {
            const wrapper = mount(ODialog, {
                props: { ...defaultProps, draggable: true },
                global: defaultGlobal,
            });

            const dialog = wrapper.find("dialog");
            expect(dialog.classes("o-dialog--draggable")).toBeTruthy();
            expect(dialog.classes("o-dialog--dragging")).toBeFalsy();
        });

        test("dialog does not have draggable class when draggable is false", () => {
            const wrapper = mount(ODialog, {
                props: { ...defaultProps, draggable: false },
                global: defaultGlobal,
            });

            const dialog = wrapper.find("dialog");
            expect(dialog.classes("o-dialog--draggable")).toBeFalsy();
        });

        test("dialog gets dragging class on pointerdown on header", async () => {
            const wrapper = mount(ODialog, {
                props: { ...defaultProps, draggable: true },
                global: defaultGlobal,
            });

            const header = wrapper.find(".o-dialog__header");
            expect(header.exists()).toBeTruthy();

            header.element.dispatchEvent(
                new PointerEvent("pointerdown", {
                    clientX: 100,
                    clientY: 100,
                    bubbles: true,
                }),
            );
            await nextTick();

            const dialog = wrapper.find("dialog");
            expect(dialog.classes("o-dialog--dragging")).toBeTruthy();
        });

        test("dialog translates on pointermove while dragging", async () => {
            const wrapper = mount(ODialog, {
                props: { ...defaultProps, draggable: true },
                global: defaultGlobal,
            });

            const header = wrapper.find(".o-dialog__header");
            header.element.dispatchEvent(
                new PointerEvent("pointerdown", {
                    clientX: 100,
                    clientY: 100,
                    bubbles: true,
                }),
            );
            // wait for isDragging to become true and the pointermove listener to be registered
            await nextTick();

            header.element.dispatchEvent(
                new PointerEvent("pointermove", {
                    clientX: 200,
                    clientY: 150,
                    bubbles: true,
                }),
            );
            await nextTick();

            const dialog = wrapper.find("dialog");
            expect(dialog.element.style.translate).toContain("px");
        });

        test("dragging stops and dragging class is removed on pointerup", async () => {
            const wrapper = mount(ODialog, {
                props: { ...defaultProps, draggable: true },
                global: defaultGlobal,
            });

            const header = wrapper.find(".o-dialog__header");
            header.element.dispatchEvent(
                new PointerEvent("pointerdown", {
                    clientX: 100,
                    clientY: 100,
                    bubbles: true,
                }),
            );
            await nextTick();

            expect(wrapper.find("dialog").classes("o-dialog--dragging")).toBe(
                true,
            );

            header.element.dispatchEvent(
                new PointerEvent("pointerup", { bubbles: true }),
            );
            await nextTick();

            // query the dialog again, because the element is replaced on re-render
            expect(wrapper.find("dialog").classes("o-dialog--dragging")).toBe(
                false,
            );
        });

        test("drag position resets when dialog becomes inactive", async () => {
            const wrapper = mount(ODialog, {
                props: { ...defaultProps, draggable: true },
                global: defaultGlobal,
            });

            const header = wrapper.find(".o-dialog__header");
            header.element.dispatchEvent(
                new PointerEvent("pointerdown", {
                    clientX: 100,
                    clientY: 100,
                    bubbles: true,
                }),
            );
            await nextTick();

            header.element.dispatchEvent(
                new PointerEvent("pointermove", {
                    clientX: 200,
                    clientY: 150,
                    bubbles: true,
                }),
            );
            await nextTick();

            let dialog = wrapper.find("dialog");
            expect(dialog.element.style.translate).toContain("px");

            await wrapper.setProps({ active: false });
            await nextTick();

            dialog = wrapper.find("dialog");
            expect(dialog.element.style.translate).toBeFalsy();
        });

        test("does not start dragging when fullscreen is true", async () => {
            const wrapper = mount(ODialog, {
                props: { ...defaultProps, draggable: true, fullscreen: true },
                global: defaultGlobal,
            });

            const header = wrapper.find(".o-dialog__header");
            header.element.dispatchEvent(
                new PointerEvent("pointerdown", {
                    clientX: 100,
                    clientY: 100,
                    bubbles: true,
                }),
            );
            await nextTick();

            const dialog = wrapper.find("dialog");
            expect(dialog.classes("o-dialog--dragging")).toBeFalsy();
        });

        test("does not drag when draggable is false", async () => {
            const wrapper = mount(ODialog, {
                props: { ...defaultProps, draggable: false },
                global: defaultGlobal,
            });

            const header = wrapper.find(".o-dialog__header");
            header.element.dispatchEvent(
                new PointerEvent("pointerdown", {
                    clientX: 100,
                    clientY: 100,
                    bubbles: true,
                }),
            );
            await nextTick();

            header.element.dispatchEvent(
                new PointerEvent("pointermove", {
                    clientX: 200,
                    clientY: 150,
                    bubbles: true,
                }),
            );
            await nextTick();

            const dialog = wrapper.find("dialog");
            expect(dialog.classes("o-dialog--dragging")).toBeFalsy();
            expect(dialog.element.style.translate).toBeFalsy();
        });
    });

    describe("test draggable input handling", () => {
        const defaultProps = { active: true, title: "Draggable Dialog" };
        const defaultGlobal = { stubs: { transition: true, teleport: true } };

        function pointerdown(
            target: Element,
            init: PointerEventInit = {},
        ): void {
            target.dispatchEvent(
                new PointerEvent("pointerdown", {
                    clientX: 100,
                    clientY: 100,
                    bubbles: true,
                    ...init,
                }),
            );
        }

        test("captures the pointer on the header while dragging", async () => {
            const wrapper = mount(ODialog, {
                props: { ...defaultProps, draggable: true },
                global: defaultGlobal,
            });

            const header = wrapper.find(".o-dialog__header").element;
            const setPointerCapture = vi.fn();
            header.setPointerCapture = setPointerCapture;

            pointerdown(header, { pointerId: 7 });
            await nextTick();

            expect(setPointerCapture).toHaveBeenCalledWith(7);
        });

        test("does not start dragging from the close button", async () => {
            const wrapper = mount(ODialog, {
                props: { ...defaultProps, draggable: true, closeable: true },
                global: defaultGlobal,
            });

            pointerdown(wrapper.find("header button").element);
            await nextTick();

            expect(wrapper.find("dialog").classes("o-dialog--dragging")).toBe(
                false,
            );
        });

        test("does not start dragging with a secondary button", async () => {
            const wrapper = mount(ODialog, {
                props: { ...defaultProps, draggable: true },
                global: defaultGlobal,
            });

            pointerdown(wrapper.find(".o-dialog__header").element, {
                button: 2,
            });
            await nextTick();

            expect(wrapper.find("dialog").classes("o-dialog--dragging")).toBe(
                false,
            );
        });

        test("stops dragging on pointercancel", async () => {
            const wrapper = mount(ODialog, {
                props: { ...defaultProps, draggable: true },
                global: defaultGlobal,
            });

            const header = wrapper.find(".o-dialog__header").element;
            pointerdown(header);
            await nextTick();
            expect(wrapper.find("dialog").classes("o-dialog--dragging")).toBe(
                true,
            );

            header.dispatchEvent(new PointerEvent("pointercancel"));
            await nextTick();

            expect(wrapper.find("dialog").classes("o-dialog--dragging")).toBe(
                false,
            );
        });
    });

    describe("verify teleport", () => {
        test("react accordingly when using teleport to body", () => {
            const wrapper = mount(ODialog, {
                active: true,
                props: { teleport: true },
            });

            expect(wrapper.find(".o-dialog").exists()).toBeFalsy();

            const dialog = document.getElementsByClassName("o-dialog");
            expect(dialog.length).toBe(1);
            const teleportWrapper =
                document.getElementsByClassName("o-dialog--teleport");
            expect(teleportWrapper.length).toBe(1);
        });

        test("react accordingly when using teleport with element", () => {
            const wrapperDiv = document.createElement("div");
            const wrapperClass = "test-teleport-wrapper";
            wrapperDiv.className = wrapperClass;
            document.body.appendChild(wrapperDiv);

            const wrapper = mount(ODialog, {
                props: { teleport: wrapperDiv },
            });

            expect(wrapper.find(".o-dialog").exists()).toBeFalsy();

            const dialog = document.getElementsByClassName("o-dialog");
            expect(dialog.length).toBe(1);
            const teleportWrapper =
                document.getElementsByClassName("o-dialog--teleport");
            expect(teleportWrapper.length).toBe(1);
        });
    });
});
