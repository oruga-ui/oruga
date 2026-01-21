import { createVNode } from "vue";
import { describe, test, expect, afterEach, vi, beforeEach } from "vitest";
import { enableAutoUnmount, flushPromises } from "@vue/test-utils";

import useModalProgrammatic from "../useModalProgrammatic";

describe("useModalProgrammatic tests", () => {
  // create a new factory
  const factory = useModalProgrammatic();

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    // clear body after each test
    document.body.innerHTML = "";
    vi.useRealTimers();

    // clear factory items
    factory.closeAll();
  });

  enableAutoUnmount(afterEach);

  test("test mounting component correctly", async () => {
    const content = "My Modal Content";

    // open element
    const { close, promise } = factory.open(content);

    // check promise get called
    const handler = vi.fn();
    promise.then(() => handler());
    expect(handler).not.toHaveBeenCalled();

    // check element exist
    let modal = document.body.querySelector('[data-oruga="modal"]');
    expect(modal).not.toBeNull();

    expect(modal?.innerHTML).toContain(content);

    // close element through handler
    close();
    vi.runAllTimers();

    // check element does not exist
    modal = document.body.querySelector('[data-oruga="modal"]');
    expect(modal).toBeNull();

    await flushPromises(); // await promise finished
    expect(handler).toHaveBeenCalledOnce();
  });

  test("test mounting with target correctly", async () => {
    const container = document.createElement("div");
    container.id = "my-cool-container";
    document.body.appendChild(container);

    const content = "My Modal Content";

    // open element
    const { close } = factory.open(content, "#my-cool-container");

    // check element exist
    let modal = document.body.querySelector('[data-oruga="modal"]');
    expect(modal).not.toBeNull();

    let bodyElements = document.body.querySelectorAll("body > *");
    expect(bodyElements).toHaveLength(1);

    // close element through handler
    close();
    vi.runAllTimers();

    // check element does not exist
    modal = document.body.querySelector('[data-oruga="modal"]');
    expect(modal).toBeNull();

    // check container still exists
    bodyElements = document.body.querySelectorAll("body > *");
    expect(bodyElements).toHaveLength(1);
  });

  test("test mounting with custom component correctly", async () => {
    const component = createVNode({
      template: "<button @click=\"$emit('close', 'abc')\">Fancy Label</button>",
    });

    // open element
    factory.open({
      component,
      props: { "data-oruga": "programmatic" },
    });

    // check element exist
    let modal = document.body.querySelector('[data-oruga="modal"]');
    expect(modal).not.toBeNull();

    const button = modal?.querySelector<HTMLElement>(
      '[data-oruga="programmatic"]',
    );
    expect(button).not.toBeNull();

    // close element on button click
    button?.click();
    vi.runAllTimers();

    // check element does not exist
    modal = document.body.querySelector('[data-oruga="modal"]');
    expect(modal).toBeNull();
  });

  test("test internal close (x) event working correctly", async () => {
    const content = "My Modal Content";
    const onClose = vi.fn();

    // open element
    factory.open({ content, onClose });

    // check element exist
    let el = document.body.querySelector<HTMLElement>(
      '[data-oruga="close"]',
    );
    expect(el).not.toBeNull();

    // close element on 'x' button click
    el?.click();
    vi.runAllTimers();

    // check element does not exist
    el = document.body.querySelector('[data-oruga="close"]');
    expect(el).toBeNull();

    expect(onClose).toHaveBeenCalledOnce();
  });

  test("test external close event working correctly", async () => {
    const component = createVNode({
      template: "<button @click=\"$emit('close', {action: 'ok'})\">Fancy Label</button>",
    });
    const onClose = vi.fn();

    // open element
    factory.open({ component, onClose });

    expect(factory.count()).toBe(1);

    // check element exist
    let el = document.body.querySelector<HTMLElement>("button");
    expect(el).not.toBeNull();

    // close element on 'x' button click
    el?.click();
    vi.runAllTimers();

    expect(factory.count()).toBe(0);

    // check element does not exist
    el = document.body.querySelector("button");
    expect(el).toBeNull();

    expect(onClose).toHaveBeenCalledWith({ action: "ok" });
  });
});
