import { describe, test, expect, afterEach, beforeEach, vi } from "vitest";
import { enableAutoUnmount, flushPromises, mount } from "@vue/test-utils";
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
        expect(dialog.attributes("role")).toBeUndefined();
        expect(wrapper.html()).toMatchSnapshot();

        const backdrop = wrapper.find(".o-dialog__backdrop");
        expect(backdrop.exists()).toBeFalsy();
    });

    test("test modal case", () => {
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
        expect(dialog.attributes("role")).toBeUndefined();
        expect(wrapper.html()).toMatchSnapshot();

        const backdrop = wrapper.find(".o-dialog__backdrop");
        expect(backdrop.exists()).toBeTruthy();
    });

    test("test alert case", () => {
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
        const animate = vi.spyOn(HTMLElement.prototype, "animate");
        const wrapper = mount(ODialog, {
            props: {
                active: true,
            },
        });

        const dialog = wrapper.find("dialog");
        expect(dialog.exists()).toBeTruthy();
        expect(dialog.classes("o-dialog--active")).toBeTruthy();
        expect((dialog.element as HTMLDialogElement).open).toBe(true);

        await wrapper.setProps({ active: false });
        await flushPromises(); // wait for the leave animation

        // the dialog has been animated and closed natively
        expect(animate).toHaveBeenCalled();
        expect((dialog.element as HTMLDialogElement).open).toBe(false);
        expect(wrapper.emitted("confirm")).toBeUndefined();
        expect(wrapper.emitted("close")).toHaveLength(1);
        expect(dialog.classes("o-dialog--active")).toBeFalsy();
    });

    test("test loading", () => {
        const wrapper = mount(ODialog, {
            props: { loading: true },
        });

        const loading = wrapper.find('[data-oruga="loading"]');
        expect(loading.exists()).toBeTruthy();
    });

    describe("test header", () => {
        test("test header", () => {
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

        test("test header slot", () => {
            const headerSlot = "<div>MY HEADER</div>";
            const wrapper = mount(ODialog, {
                slots: { header: headerSlot },
            });

            const header = wrapper.find(".o-dialog__header");
            expect(header.exists()).toBeTruthy();
            expect(header.html()).toContain(headerSlot);
        });

        test("test title prop", () => {
            const title = "<div>TEST_TITLE</div>";
            const wrapper = mount(ODialog, {
                props: { title },
            });

            const header = wrapper.find(".o-dialog__header");
            expect(header.exists()).toBeTruthy();
            expect(header.text()).toEqual(title);
        });

        test("test title slot", () => {
            const titleSlot = "<div>TEST_TITLE</div>";
            const wrapper = mount(ODialog, {
                slots: { title: titleSlot },
            });

            const header = wrapper.find(".o-dialog__header");
            expect(header.exists()).toBeTruthy();
            expect(header.html()).toContain(titleSlot);
        });

        test("test subtitle prop", () => {
            const subtitle = "<div>TEST_SUBTITLE</div>";
            const wrapper = mount(ODialog, {
                props: { subtitle },
            });

            const header = wrapper.find(".o-dialog__header");
            expect(header.exists()).toBeTruthy();
            expect(header.text()).toEqual(subtitle);
        });

        test("test subtitle slot", () => {
            const subtitleSlot = "<div>TEST_SUBTITLE</div>";
            const wrapper = mount(ODialog, {
                slots: { subtitle: subtitleSlot },
            });

            const header = wrapper.find(".o-dialog__header");
            expect(header.exists()).toBeTruthy();
            expect(header.html()).toContain(subtitleSlot);
        });

        test("test header closeable ", async () => {
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
            await flushPromises(); // wait for the leave animation

            expect(wrapper.emitted("close")).toHaveLength(1);
            expect(dialog.classes("o-dialog--active")).toBeFalsy();
            expect(onClose).toHaveBeenCalledTimes(1);
        });
    });

    describe("test body", () => {
        test("test content prop", () => {
            const content = "<div>TEST_CONTENT</div>";
            const wrapper = mount(ODialog, {
                props: { content },
            });

            const body = wrapper.find(".o-dialog__body");
            expect(body.exists()).toBeTruthy();
            expect(body.text()).toEqual(content);
        });

        test("test content slot", () => {
            const contentSlot = "<div>TEST_CONTENT</div>";
            const wrapper = mount(ODialog, {
                slots: { default: contentSlot },
            });

            const body = wrapper.find(".o-dialog__body");
            expect(body.exists()).toBeTruthy();
            expect(body.html()).toContain(contentSlot);
        });
    });

    describe("test footer", () => {
        test("test footer buttons", () => {
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

        test("test footer slot", () => {
            const footerSlot = "<button>MYBUTTON</button>";
            const wrapper = mount(ODialog, {
                slots: { footer: footerSlot },
            });

            const body = wrapper.find(".o-dialog__footer");
            expect(body.exists()).toBeTruthy();
            expect(body.html()).toContain(footerSlot);
        });
    });

    describe("test buttons", () => {
        test("test rendering correct", () => {
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

        test("test cancel button event", async () => {
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
            await flushPromises(); // wait for the leave animation
            expect(wrapper.emitted("close")).toHaveLength(1);
            // the cancel button is not a user dismissal
            expect(wrapper.emitted("cancel")).toBeUndefined();
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
            await flushPromises(); // wait for the leave animation

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

    describe("test draggable", () => {
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

    describe("test accessibility attributes", () => {
        test("dialog is labelled by the title prop", () => {
            const wrapper = mount(ODialog, {
                props: { active: true, title: "My Title" },
            });

            const title = wrapper.find(".o-dialog__header-title");
            expect(title.exists()).toBeTruthy();
            const dialog = wrapper.find("dialog");
            expect(dialog.attributes("aria-labelledby")).toBe(
                title.attributes("id"),
            );
            expect(dialog.attributes("aria-describedby")).toBeUndefined();
        });

        test("dialog is labelled by the title slot", () => {
            const wrapper = mount(ODialog, {
                props: { active: true },
                slots: { title: "Slot Title" },
            });

            const title = wrapper.find(".o-dialog__header-title");
            expect(wrapper.find("dialog").attributes("aria-labelledby")).toBe(
                title.attributes("id"),
            );
        });

        test("dialog without title is not labelled", () => {
            const wrapper = mount(ODialog, { props: { active: true } });

            const dialog = wrapper.find("dialog");
            expect(dialog.attributes("aria-labelledby")).toBeUndefined();
        });

        test("ariaDescribedby is passed through unchanged", () => {
            const wrapper = mount(ODialog, {
                props: {
                    active: true,
                    title: "My Title",
                    ariaDescribedby: "description-id",
                },
            });

            const dialog = wrapper.find("dialog");
            expect(dialog.attributes("aria-describedby")).toBe(
                "description-id",
            );
            expect(dialog.attributes("aria-labelledby")).toBeDefined();
        });
    });

    describe("test closing", () => {
        /** Replaces the animation of the elements by an animation which is finished manually. */
        function mockPendingAnimation(): {
            finish: () => void;
            animate: ReturnType<typeof vi.fn>;
            reverse: ReturnType<typeof vi.fn>;
            cancel: ReturnType<typeof vi.fn>;
        } {
            let finish = (): void => {};
            const reverse = vi.fn();
            const cancel = vi.fn();
            const animate = vi.fn(() => {
                const animation = {
                    playState: "running",
                    playbackRate: 1,
                    finished: new Promise<void>((resolve) => {
                        finish = resolve;
                    }),
                    reverse: () => {
                        reverse();
                        animation.playbackRate *= -1;
                    },
                    cancel,
                };
                return animation as unknown as Animation;
            });
            vi.spyOn(HTMLElement.prototype, "animate").mockImplementation(
                animate,
            );
            return { finish: () => finish(), animate, reverse, cancel };
        }

        /**
         * Mocks the user preference for reduced motion.
         * `matchMedia` is already a mock in the test setup, so spying on it would not be restored afterwards.
         * @returns a function to restore the previous `matchMedia`
         */
        function mockReducedMotion(): () => void {
            const original = window.matchMedia;
            window.matchMedia = vi.fn(
                (query: string) =>
                    ({
                        matches: true,
                        media: query,
                        addEventListener: vi.fn(),
                        removeEventListener: vi.fn(),
                    }) as unknown as MediaQueryList,
            );
            return () => {
                window.matchMedia = original;
            };
        }

        type DialogExposed = { close: (value?: string) => void };

        test("an initially active dialog opens with the enter animation", () => {
            const { animate } = mockPendingAnimation();
            const wrapper = mount(ODialog, { props: { active: true } });

            const dialog = wrapper.find("dialog").element as HTMLDialogElement;
            expect(dialog.open).toBe(true);
            expect(animate).toHaveBeenCalledTimes(1);
        });

        test("an initially active dialog without animation opens immediately", () => {
            const { animate } = mockPendingAnimation();
            const wrapper = mount(ODialog, {
                props: { active: true, animation: false },
            });

            const dialog = wrapper.find("dialog").element as HTMLDialogElement;
            expect(dialog.open).toBe(true);
            expect(animate).not.toHaveBeenCalled();
        });

        test("close passes the return value after the leave animation", async () => {
            const { finish, animate } = mockPendingAnimation();
            const wrapper = mount(ODialog, { props: { active: true } });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;

            (wrapper.vm as unknown as DialogExposed).close("x");
            await flushPromises();

            // still open while the leave animation is playing (the in-flight enter animation is reversed)
            expect(animate).toHaveBeenCalledTimes(1);
            expect(dialog.open).toBe(true);
            expect(wrapper.emitted("close")).toBeUndefined();

            finish();
            await flushPromises();

            expect(dialog.open).toBe(false);
            expect(dialog.returnValue).toBe("x");
            expect(wrapper.emitted("close")).toHaveLength(1);
            expect(wrapper.emitted("close")![0][1]).toBe("x");
            expect(wrapper.emitted("update:active")![0]).toEqual([false]);
        });

        test("the cancel button closes with the return value 'cancel' after the leave animation", async () => {
            const { finish } = mockPendingAnimation();
            const wrapper = mount(ODialog, {
                props: { active: true, cancelButton: "cancel" },
            });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;

            await wrapper.find(".o-dialog__cancel-button").trigger("click");
            await flushPromises();

            // still open while the leave animation is playing
            expect(dialog.open).toBe(true);
            expect(wrapper.emitted("close")).toBeUndefined();

            finish();
            await flushPromises();

            expect(dialog.open).toBe(false);
            expect(wrapper.emitted("close")![0][1]).toBe("cancel");
        });

        test("closeOnConfirm closes with the return value 'confirm' after the leave animation", async () => {
            const { finish } = mockPendingAnimation();
            const wrapper = mount(ODialog, {
                props: {
                    active: true,
                    confirmButton: "ok",
                    closeOnConfirm: true,
                },
            });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;

            await wrapper.find(".o-dialog__confirm-button").trigger("click");
            await flushPromises();

            expect(dialog.open).toBe(true);
            expect(wrapper.emitted("confirm")).toHaveLength(1);

            finish();
            await flushPromises();

            expect(dialog.open).toBe(false);
            expect(wrapper.emitted("close")![0][1]).toBe("confirm");
        });

        test("confirming again during the leave animation does not emit confirm twice", async () => {
            const { finish } = mockPendingAnimation();
            const wrapper = mount(ODialog, {
                props: {
                    active: true,
                    confirmButton: "ok",
                    closeOnConfirm: true,
                },
            });

            const button = wrapper.find(".o-dialog__confirm-button");
            await button.trigger("click");
            await button.trigger("click"); // e.g. a double click
            await flushPromises();

            expect(wrapper.emitted("confirm")).toHaveLength(1);

            finish();
            await flushPromises();

            expect(wrapper.emitted("close")).toHaveLength(1);
            expect(wrapper.emitted("close")![0][1]).toBe("confirm");
        });

        test("a repeated cancel request during the leave animation does not emit cancel twice", async () => {
            const { finish } = mockPendingAnimation();
            const wrapper = mount(ODialog, { props: { active: true } });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;

            dialog.dispatchEvent(new Event("cancel", { cancelable: true }));
            // e.g. a key repeat of the escape key, which must still not close natively
            const repeated = new Event("cancel", { cancelable: true });
            dialog.dispatchEvent(repeated);
            await flushPromises();

            expect(repeated.defaultPrevented).toBe(true);
            expect(wrapper.emitted("cancel")).toHaveLength(1);

            finish();
            await flushPromises();

            expect(wrapper.emitted("close")).toHaveLength(1);
        });

        test("an explicit return value is kept when the close is requested again without one", async () => {
            const { finish } = mockPendingAnimation();
            const wrapper = mount(ODialog, { props: { active: true } });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;

            (wrapper.vm as unknown as DialogExposed).close("a");
            // the parent closes the dialog while the leave animation is playing
            await wrapper.setProps({ active: false });

            finish();
            await flushPromises();

            expect(dialog.returnValue).toBe("a");
            expect(wrapper.emitted("close")).toHaveLength(1);
        });

        test("unmounting cancels the animation and does not close afterwards", async () => {
            const { finish, cancel } = mockPendingAnimation();
            const wrapper = mount(ODialog, { props: { active: true } });

            (wrapper.vm as unknown as DialogExposed).close("x");
            wrapper.unmount();

            expect(cancel).toHaveBeenCalledTimes(1);

            finish();
            await flushPromises();

            expect(wrapper.emitted("close")).toBeUndefined();
        });

        test("reduced motion opens and closes the dialog without an animation", () => {
            const restoreMatchMedia = mockReducedMotion();
            try {
                const animate = vi.spyOn(HTMLElement.prototype, "animate");
                const wrapper = mount(ODialog, { props: { active: true } });
                const dialog = wrapper.find("dialog")
                    .element as HTMLDialogElement;

                expect(dialog.open).toBe(true);

                (wrapper.vm as unknown as DialogExposed).close("x");

                expect(animate).not.toHaveBeenCalled();
                expect(dialog.open).toBe(false);
                expect(dialog.returnValue).toBe("x");
            } finally {
                restoreMatchMedia();
            }
        });

        test("the close button does not pass the click event as return value", async () => {
            const wrapper = mount(ODialog, {
                props: { active: true, closeable: true },
            });

            await wrapper.find("header button").trigger("click");
            await flushPromises();

            // the native return value is an empty string when none is set
            expect(wrapper.emitted("close")![0][1]).toBe("");
        });

        test("closing without an animation closes immediately", () => {
            const wrapper = mount(ODialog, {
                props: { active: true, animation: false },
            });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;

            (wrapper.vm as unknown as DialogExposed).close("x");

            expect(dialog.open).toBe(false);
            expect(dialog.returnValue).toBe("x");
        });

        test("a reopen during the leave animation keeps the dialog open", async () => {
            const { finish, reverse } = mockPendingAnimation();
            const wrapper = mount(ODialog, { props: { active: true } });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;

            await wrapper.setProps({ active: false });
            // the in-flight enter animation is reversed to leave
            expect(reverse).toHaveBeenCalledTimes(1);

            await wrapper.setProps({ active: true });
            // the reopen reverses the in-flight leave animation back to visible
            expect(reverse).toHaveBeenCalledTimes(2);

            finish();
            await flushPromises();

            expect(dialog.open).toBe(true);
            expect(wrapper.emitted("close")).toBeUndefined();
        });

        test("a dialog which is closed from outside updates active", async () => {
            const { animate } = mockPendingAnimation();
            const wrapper = mount(ODialog, { props: { active: true } });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;

            dialog.close();
            await flushPromises();

            expect(wrapper.emitted("close")).toHaveLength(1);
            expect(wrapper.emitted("update:active")![0]).toEqual([false]);
            // the leave animation is not played for a closed dialog
            expect(animate).toHaveBeenCalledTimes(1); // only the enter animation
        });

        test("escape is a cancel event, which closes the dialog after the animation", async () => {
            const wrapper = mount(ODialog, { props: { active: true } });
            const dialog = wrapper.find("dialog").element as HTMLDialogElement;

            const event = new Event("cancel", { cancelable: true });
            dialog.dispatchEvent(event);
            await flushPromises();

            expect(event.defaultPrevented).toBe(true);
            expect(wrapper.emitted("cancel")).toHaveLength(1);
            expect(wrapper.emitted("close")).toHaveLength(1);
            expect(dialog.open).toBe(false);
        });

        // jsdom has no `closedby` support, like older browsers
        test.skipIf("closedBy" in HTMLDialogElement.prototype)(
            "closeOnEscape=false keeps the dialog open without closedby support",
            async () => {
                const wrapper = mount(ODialog, {
                    props: { active: true, closeOnEscape: false },
                });
                const dialog = wrapper.find("dialog")
                    .element as HTMLDialogElement;

                const event = new Event("cancel", { cancelable: true });
                dialog.dispatchEvent(event);
                await flushPromises();

                expect(event.defaultPrevented).toBe(true);
                expect(wrapper.emitted("cancel")).toHaveLength(1);
                expect(wrapper.emitted("close")).toBeUndefined();
                expect(dialog.open).toBe(true);
            },
        );

        test("closeOnEscape=false does not block the own close paths", async () => {
            const wrapper = mount(ODialog, {
                props: {
                    active: true,
                    closeOnEscape: false,
                    closeable: true,
                },
            });

            await wrapper.find("header button").trigger("click");
            await flushPromises();

            expect(wrapper.emitted("close")).toHaveLength(1);
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

            function escapeAndCancel(dialog: HTMLDialogElement): Event {
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
                const wrapper = mount(ODialog, {
                    props: {
                        active: true,
                        closeOnEscape: false,
                        closeOnBackdrop: true,
                    },
                });
                const dialog = wrapper.find("dialog").element;

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

            test("closeOnEscape=true closes the dialog with the escape key", async () => {
                const wrapper = mount(ODialog, {
                    props: { active: true, closeOnEscape: true },
                });
                const dialog = wrapper.find("dialog").element;

                escapeAndCancel(dialog);
                await flushPromises();

                expect(wrapper.emitted("close")).toHaveLength(1);
                expect(dialog.open).toBe(false);
            });
        });
    });

    describe("test scroll lock", () => {
        test("the scroll lock follows backdrop while the dialog is open", async () => {
            const wrapper = mount(ODialog, {
                props: { active: true, backdrop: true },
            });
            await nextTick();
            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                true,
            );

            await wrapper.setProps({ backdrop: false });
            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                false,
            );

            await wrapper.setProps({ backdrop: true });
            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                true,
            );
        });

        test("an alert dialog locks the scroll without backdrop", async () => {
            mount(ODialog, {
                props: { active: true, backdrop: false, alert: true },
            });
            await nextTick();

            expect(document.body.classList.contains("o-scroll-clip")).toBe(
                true,
            );
        });
    });

    describe("test teleport", () => {
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
