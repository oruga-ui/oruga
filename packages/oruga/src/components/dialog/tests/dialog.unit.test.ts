import { describe, test, expect, afterEach, vi } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";

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
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
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

  test("test modal case", async () => {
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

  test("test alert case", async () => {
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

  test("test loading", async () => {
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
