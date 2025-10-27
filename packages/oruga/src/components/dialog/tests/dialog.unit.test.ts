import { describe, test, expect, afterEach } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

import ODialog from "@/components/dialog/Dialog.vue";

describe("ODialog test", () => {
    enableAutoUnmount(afterEach);

    test("render correctly", () => {
        const wrapper = mount(ODialog, {
            props: {
                header: "Advanced Header",
                title: "Adcanced Title",
                subtitle: "Advanced subtitle",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                footer: "Advanced Card Footer",
                confirmButton: "OK",
                cancelButton: "CANCEL",
            },
        });
        expect(!!wrapper.vm).toBeTruthy();
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.attributes("data-oruga")).toBe("dialog");
        expect(wrapper.html()).toMatchSnapshot();

        const header = wrapper.find(".o-dialog__header");
        expect(header.exists()).toBeTruthy();
        expect(header.text()).toBe(
            `${wrapper.props("title")}${wrapper.props("subtitle")}`,
        );

        const body = wrapper.find(".o-dialog__body");
        expect(body.exists()).toBeTruthy();
        expect(body.text()).toBe(wrapper.props("content"));

        const footer = wrapper.find(".o-dialog__footer");
        expect(footer.exists()).toBeTruthy();

        expect(footer.findAll("button")).toHaveLength(2);
    });

    describe("test header", () => {
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

        test("test header close", async () => {
            const wrapper = mount(ODialog, {
                props: { closeable: true },
            });

            const closeButton = wrapper.find("header button");
            expect(closeButton.exists()).toBeTruthy();

            await closeButton.trigger("click");
            expect(wrapper.emitted()).toHaveProperty("close");
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

    test("test footer slot", () => {
        const footerSlot = "<button>MYBUTTON</button>";
        const wrapper = mount(ODialog, {
            slots: { footer: footerSlot },
        });

        const body = wrapper.find(".o-dialog__footer");
        expect(body.exists()).toBeTruthy();
        expect(body.html()).toContain(footerSlot);
    });

    test("test loading", async () => {
        const wrapper = mount(ODialog, {
            props: { loading: true },
        });
        const loading = wrapper.find('[data-oruga="loading"]');

        expect(loading.exists()).toBeTruthy();
    });

    describe("test buttons", () => {
        test("test rendering correct", async () => {
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

        test("test events", async () => {
            const wrapper = mount(ODialog, {
                props: {
                    confirmButton: "ok",
                    cancelButton: "cancel",
                },
            });

            const cancelButton = wrapper.find(".o-dialog__cancel-button");
            expect(cancelButton.exists()).toBeTruthy();

            await cancelButton.trigger("click");
            expect(wrapper.emitted("close")).toHaveLength(1);

            const confirmButton = wrapper.find(".o-dialog__confirm-button");
            expect(confirmButton.exists()).toBeTruthy();

            await confirmButton.trigger("click");
            expect(wrapper.emitted("confirm")).toHaveLength(1);
        });

        test("test focus cancelButton", async () => {
            const wrapper = mount(ODialog, {
                props: { confirmButton: "ok", cancelButton: "cancel" },
                attachTo: document.body,
            });

            const cancelButton = wrapper.find(".o-dialog__cancel-button");
            expect(cancelButton.exists()).toBeTruthy();

            expect(cancelButton.element).toBe(document.activeElement);
        });

        test("test focus confirmButton", async () => {
            const wrapper = mount(ODialog, {
                props: {
                    confirmButton: "ok",
                },
                attachTo: document.body,
            });

            const confirmButton = wrapper.find(".o-dialog__confirm-button");
            expect(confirmButton.exists()).toBeTruthy();

            expect(confirmButton.element).toBe(document.activeElement);
        });

        test("test focus change", async () => {
            const wrapper = mount(ODialog, {
                props: {
                    confirmButton: "ok",
                    cancelButton: "cancel",
                },
                attachTo: document.body,
            });

            const cancelButton = wrapper.find(".o-dialog__cancel-button");
            expect(cancelButton.exists()).toBeTruthy();

            const confirmButton = wrapper.find(".o-dialog__confirm-button");
            expect(confirmButton.exists()).toBeTruthy();

            expect(cancelButton.element).toBe(document.activeElement);

            await cancelButton.trigger("keyup.right");

            expect(confirmButton.element).toBe(document.activeElement);

            await confirmButton.trigger("keyup.left");

            expect(cancelButton.element).toBe(document.activeElement);
        });
    });
});
