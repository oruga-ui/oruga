import { describe, test, expect, afterEach, vi } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { setTimeout } from "timers/promises";
import { nextTick } from "vue";

import OTooltip from "@/components/tooltip/Tooltip.vue";

describe("OTooltip tests", () => {
  enableAutoUnmount(afterEach);

  test("render correctly", () => {
    const wrapper = mount(OTooltip);
    expect(!!wrapper.vm).toBeTruthy();
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.attributes("data-oruga")).toBe("tooltip");
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("reset window events before destroy", async () => {
    window.removeEventListener = vi.fn();

    const wrapper = mount(OTooltip, { props: { active: true } });
    await setTimeout(); // await event handler get set

    wrapper.unmount();

    // remove click outside listener
    expect(window.removeEventListener).toBeCalledWith(
      "click",
      expect.any(Function),
      expect.any(Object),
    );
  });

  describe("test trigger", () => {
    test("render default trigger slot correctly", () => {
      const triggerHTML = '<button class="trigger">trigger</button>';
      const wrapper = mount(OTooltip, {
        slots: { default: triggerHTML },
      });
      const trigger = wrapper.find(".trigger");
      expect(trigger.html()).toBe(triggerHTML);
      expect(trigger.text()).toBe("trigger");
    });

    test("has configurable trigger tag", () => {
      const wrapper = mount(OTooltip, {
        props: { triggerTag: "a" },
      });
      expect(wrapper.find("a.o-tooltip__trigger").exists()).toBeTruthy();
    });

    test("react accordingly when has hover trigger", async () => {
      const wrapper = mount(OTooltip, {
        slots: { default: "trigger" },
        attachTo: document.body,
      });

      const trigger = wrapper.find(".o-tooltip__trigger");
      expect(trigger.exists()).toBeTruthy();

      const content = wrapper.find(".o-tooltip__content");
      expect(content.exists()).toBeTruthy();
      expect(content.isVisible()).toBeFalsy();

      // check do NOT open on click
      await trigger.trigger("click");
      await setTimeout(); // click event is processed async
      expect(content.isVisible()).toBeFalsy();

      // check do NOT open on right click
      await trigger.trigger("contextmenu");
      expect(content.isVisible()).toBeFalsy();

      // check do NOT open on focus
      await trigger.trigger("focus");
      expect(content.isVisible()).toBeFalsy();

      // check DO open on hiver
      await trigger.trigger("mouseenter");
      expect(content.isVisible()).toBeTruthy();
      expect(wrapper.emitted("open")).toHaveLength(1);
      const activeEmits = wrapper.emitted("update:active");
      expect(activeEmits).toHaveLength(1);
      expect(activeEmits![0][0]).toBeTruthy();
    });

    test("react accordingly when mouse over without trigger", async () => {
      const wrapper = mount(OTooltip, {
        props: { openOnHover: false },
        slots: { default: "trigger" },
        attachTo: document.body,
      });

      const trigger = wrapper.find(".o-tooltip__trigger");
      expect(trigger.exists()).toBeTruthy();

      const content = wrapper.find(".o-tooltip__content");
      expect(content.exists()).toBeTruthy();
      expect(content.isVisible()).toBeFalsy();

      await trigger.trigger("mouseenter");

      expect(content.isVisible()).toBeFalsy();
      expect(wrapper.emitted("open")).toBeUndefined();
      expect(wrapper.emitted("update:active")).toBeUndefined();
    });

    test("react accordingly when has click trigger", async () => {
      const wrapper = mount(OTooltip, {
        props: { openOnClick: true },
        slots: { default: "trigger" },
        attachTo: document.body,
      });

      const trigger = wrapper.find(".o-tooltip__trigger");
      expect(trigger.exists()).toBeTruthy();

      const content = wrapper.find(".o-tooltip__content");
      expect(content.exists()).toBeTruthy();
      expect(content.isVisible()).toBeFalsy();

      // check do NOT open on hover
      await trigger.trigger("mouseenter");
      expect(content.isVisible()).toBeFalsy();

      // check do NOT open on focus
      await trigger.trigger("focus");
      expect(content.isVisible()).toBeFalsy();

      // check do NOT open on right click
      await trigger.trigger("contextmenu");
      expect(content.isVisible()).toBeFalsy();

      // check DO open on click
      await trigger.trigger("click");
      await setTimeout(); // click event is processed async

      expect(content.isVisible()).toBeTruthy();
      expect(wrapper.emitted("open")).toHaveLength(1);
      const activeEmits = wrapper.emitted("update:active");
      expect(activeEmits).toHaveLength(1);
      expect(activeEmits![0][0]).toBeTruthy();
    });

    test("react accordingly when clicking trigger with disabled", async () => {
      const wrapper = mount(OTooltip, {
        props: { disabled: true },
        slots: { default: "trigger" },
        attachTo: document.body,
      });

      const trigger = wrapper.find(".o-tooltip__trigger");
      expect(trigger.exists()).toBeTruthy();

      const content = wrapper.find(".o-tooltip__content");
      expect(content.exists()).toBeTruthy();
      expect(content.isVisible()).toBeFalsy();

      await trigger.trigger("click");
      await setTimeout(); // click event is processed async

      expect(content.isVisible()).toBeFalsy();
      expect(wrapper.emitted("open")).toBeUndefined();
      expect(wrapper.emitted("update:active")).toBeUndefined();
    });

    test("react accordingly when has contextcontent trigger", async () => {
      const wrapper = mount(OTooltip, {
        props: { openOnContextmenu: true },
        slots: { default: "trigger" },
        attachTo: document.body,
      });

      const trigger = wrapper.find(".o-tooltip__trigger");
      expect(trigger.exists()).toBeTruthy();

      const content = wrapper.find(".o-tooltip__content");
      expect(content.exists()).toBeTruthy();
      expect(content.isVisible()).toBeFalsy();

      // check do NOT open on hover
      await trigger.trigger("mouseenter");
      expect(content.isVisible()).toBeFalsy();

      // check do NOT open on focus
      await trigger.trigger("focus");
      expect(content.isVisible()).toBeFalsy();

      // check do NOT open on click
      await trigger.trigger("click");
      await setTimeout(); // click event is processed async
      expect(content.isVisible()).toBeFalsy();

      // check DO open on right click
      await trigger.trigger("contextmenu");
      expect(content.isVisible()).toBeTruthy();
      expect(wrapper.emitted("open")).toHaveLength(1);
      const activeEmits = wrapper.emitted("update:active");
      expect(activeEmits).toHaveLength(1);
      expect(activeEmits![0][0]).toBeTruthy();
    });

    test("react accordingly when has focus trigger", async () => {
      const wrapper = mount(OTooltip, {
        props: { openOnFocus: true },
        slots: { default: "trigger" },
        attachTo: document.body,
      });

      const trigger = wrapper.find(".o-tooltip__trigger");
      expect(trigger.exists()).toBeTruthy();

      const content = wrapper.find(".o-tooltip__content");
      expect(content.exists()).toBeTruthy();
      expect(content.isVisible()).toBeFalsy();

      // check do NOT open on right click
      await trigger.trigger("contextmenu");
      expect(content.isVisible()).toBeFalsy();

      // check do NOT open on click
      await trigger.trigger("click");
      await setTimeout(); // click event is processed async
      expect(content.isVisible()).toBeFalsy();

      // check DO open on focus
      await trigger.trigger("focus");
      expect(content.isVisible()).toBeTruthy();
      expect(wrapper.emitted("open")).toHaveLength(1);

      // check Do also open on hover when focus
      await trigger.trigger("mouseenter");
      expect(content.isVisible()).toBeTruthy();
      expect(wrapper.emitted("open")).toHaveLength(2);
      const activeEmits = wrapper.emitted("update:active");
      expect(activeEmits).toHaveLength(1);
      expect(activeEmits![0][0]).toBeTruthy();
    });

    test("react accordingly when has close on hover leave", async () => {
      const wrapper = mount(OTooltip, {
        props: { active: true },
        attachTo: document.body,
      });
      await setTimeout(); // await event handler get set

      const trigger = wrapper.find(".o-tooltip__trigger");
      expect(trigger.exists()).toBeTruthy();

      const content = wrapper.find(".o-tooltip__content");
      expect(content.exists()).toBeTruthy();
      expect(content.isVisible()).toBeTruthy();

      // check Do close on hover out
      await trigger.trigger("mouseleave");
      expect(content.isVisible()).toBeFalsy();
      expect(wrapper.emitted("close")).toHaveLength(1);
      const activeEmits = wrapper.emitted("update:active");
      expect(activeEmits).toHaveLength(1);
      expect(activeEmits![0][0]).toBeFalsy();
    });

    test("react accordingly when has close on escape", async () => {
      const wrapper = mount(OTooltip, {
        props: { active: true, closeOnEscape: true },
        attachTo: document.body,
      });
      await setTimeout(); // await event handler get set

      const trigger = wrapper.find(".o-tooltip__trigger");
      expect(trigger.exists()).toBeTruthy();

      const content = wrapper.find(".o-tooltip__content");
      expect(content.exists()).toBeTruthy();
      expect(content.isVisible()).toBeTruthy();

      // check Do close on click escape
      await trigger.trigger("keyup", { key: "Esc" });
      expect(content.isVisible()).toBeFalsy();

      expect(wrapper.emitted("close")).toHaveLength(1);
      const activeEmits = wrapper.emitted("update:active");
      expect(activeEmits).toHaveLength(1);
      expect(activeEmits![0][0]).toBeFalsy();
    });

    test("react accordingly when pressing escape with closeable false", async () => {
      const wrapper = mount(OTooltip, {
        props: { active: true, closeOnEscape: true, closeable: false },
      });
      await setTimeout(); // await event handler get set

      const trigger = wrapper.find(".o-tooltip__trigger");
      expect(trigger.exists()).toBeTruthy();

      const content = wrapper.find(".o-tooltip__content");
      expect(content.exists()).toBeTruthy();
      expect(content.isVisible()).toBeTruthy();

      await trigger.trigger("keyup", { key: "Esc" });

      expect(content.isVisible()).toBeTruthy();
      expect(wrapper.emitted("close")).toBeUndefined();
      expect(wrapper.emitted("update:active")).toBeUndefined();
    });

    test("react accordingly when has close on outside", async () => {
      const wrapper = mount(OTooltip, {
        props: { active: true, closeOnOutside: true },
        attachTo: document.body,
      });
      await setTimeout(); // await event handler get set

      const trigger = wrapper.find(".o-tooltip__trigger");
      expect(trigger.exists()).toBeTruthy();

      const content = wrapper.find(".o-tooltip__content");
      expect(content.exists()).toBeTruthy();
      expect(content.isVisible()).toBeTruthy();

      // check Do close on click outside
      window.dispatchEvent(new Event("click"));
      await nextTick(); // await dom update

      expect(content.isVisible()).toBeFalsy();
      expect(wrapper.emitted("close")).toHaveLength(1);
      const activeEmits = wrapper.emitted("update:active");
      expect(activeEmits).toHaveLength(1);
      expect(activeEmits![0][0]).toBeFalsy();
    });

    test("react accordingly when clicking outside with closeable false", async () => {
      const wrapper = mount(OTooltip, {
        props: { active: true, closeOnOutside: false },
        attachTo: document.body,
      });
      await setTimeout(); // await event handler get set

      const trigger = wrapper.find(".o-tooltip__trigger");
      expect(trigger.exists()).toBeTruthy();

      const content = wrapper.find(".o-tooltip__content");
      expect(content.exists()).toBeTruthy();
      expect(content.isVisible()).toBeTruthy();

      // click outside
      window.dispatchEvent(new Event("click"));
      await nextTick(); // await dom update

      expect(content.isVisible()).toBeTruthy();
      expect(wrapper.emitted("close")).toBeUndefined();
      expect(wrapper.emitted("update:active")).toBeUndefined();
    });
  });

  describe("test teleport", () => {
    test("react accordingly when using teleport to body", () => {
      const wrapper = mount(OTooltip, {
        props: { teleport: true },
      });

      expect(wrapper.find(".o-tooltip__content").exists()).toBeFalsy();

      const content =
        document.getElementsByClassName("o-tooltip__content");
      expect(content.length).toBe(1);
      const teleportWrapper = document.getElementsByClassName(
        "o-tooltip--teleport",
      );
      expect(teleportWrapper.length).toBe(1);
    });

    test("react accordingly when using teleport with element", () => {
      const wrapperDiv = document.createElement("div");
      const wrapperClass = "test-teleport-wrapper";
      wrapperDiv.className = wrapperClass;
      document.body.appendChild(wrapperDiv);

      const wrapper = mount(OTooltip, {
        props: { teleport: wrapperDiv },
      });

      expect(wrapper.find(".o-tooltip__content").exists()).toBeFalsy();

      const content =
        document.getElementsByClassName("o-tooltip__content");
      expect(content.length).toBe(1);
      const teleportWrapper = document.getElementsByClassName(
        "o-tooltip--teleport",
      );
      expect(teleportWrapper.length).toBe(1);
    });
  });
});
