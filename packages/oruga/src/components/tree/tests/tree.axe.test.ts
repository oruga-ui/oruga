import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { nextTick } from "vue";

import type { OptionsGroupProp } from "@/composables";
import type { TreeProps } from "../props";

import OTree from "../Tree.vue";

describe("Menu axe tests", () => {
  enableAutoUnmount(afterEach);

  const options: OptionsGroupProp<string> = [
    {
      label: "Documents",
      attrs: {
        icon: "folder",
      },
      options: [
        {
          label: "Work",
          value: "work",
          attrs: {
            icon: "cog",
            options: [
              {
                label: "Expenses.doc",
                value: "expenses",
                attrs: {
                  icon: "file",
                },
              },
              {
                label: "Resume.doc",
                value: "resume",
                attrs: {
                  icon: "file",
                },
              },
            ],
          },
        },
        {
          label: "Home",
          value: "home",
          attrs: {
            icon: "home",
            options: [
              {
                label: "Invoices.txt",
                value: "invoices",
                attrs: {
                  icon: "file",
                },
              },
            ],
          },
        },
      ],
    },
    {
      label: "Events",
      value: "events",
      attrs: {
        icon: "calendar",
      },
      options: [
        {
          label: "Meeting",
          value: "meeting",
          attrs: {
            icon: "calendar-plus",
          },
        },
        {
          label: "Product Launch",
          value: "product-launch",
          attrs: {
            icon: "calendar-plus",
          },
        },
        {
          label: "Report Review",
          value: "report-review",
          attrs: {
            icon: "calendar-plus",
          },
        },
      ],
    },
    {
      label: "Movies",
      value: "movies",
      attrs: {
        icon: "star",
      },
      options: [
        {
          label: "Al Pacino",
          value: "al-pacion",
          attrs: {
            icon: "star",
            options: [
              {
                label: "Scarface",
                value: "scarface",
                attrs: {
                  icon: "video",
                },
              },
              {
                label: "Serpico",
                value: "serpico",
                attrs: {
                  icon: "video",
                },
              },
            ],
          },
        },
        {
          label: "Robert De Niro",
          value: "robert-de-niro",
          attrs: {
            icon: "star",
            options: [
              {
                label: "Goodfellas",
                value: "goodfellas",
                attrs: {
                  icon: "video",
                },
              },
              {
                label: "Untouchables",
                value: "untouchables",
                attrs: {
                  icon: "video",
                },
              },
            ],
          },
        },
      ],
    },
  ];

  const a11yCases: { title: string; props: TreeProps<string> }[] = [
    {
      title: "axe tabs - base case",
      props: { options, ariaLabel: "Tree Component" },
    },
    {
      title: "axe tabs - empty case",
      props: { options: [] },
    },
    {
      title: "axe tabs - collapsable case",
      props: { options, collapsable: true },
    },
    {
      title: "axe tabs - disabled case",
      props: { options, disabled: true },
    },
    {
      title: "axe tabs - selectable case",
      props: { options, selectable: true, modelValue: "invoices" },
    },
  ];

  test.each(a11yCases)("$title", async ({ props }) => {
    const wrapper = mount(OTree, {
      props: { ...props },
      attachTo: document.body,
    });
    await nextTick(); // await child items got rendered

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
