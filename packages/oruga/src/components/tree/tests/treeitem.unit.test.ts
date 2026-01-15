import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import OTreeItem from "@/components/tree/TreeItem.vue";

describe("OTreeItem tests", () => {
  test("expect should wrap in tree", () => {
    expect(() => mount(OTreeItem)).toThrowError("should wrap");
  });
});
