import { afterEach, describe, expect, test } from "vitest";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { axe } from "jest-axe";
import { setTimeout } from "timers/promises";

import OSkeleton from "../Skeleton.vue";
import type { SkeletonProps } from "../props.ts";

describe("OSkeleton a11y tests", () => {
    enableAutoUnmount(afterEach);

    const a11yCases: { title: string; props?: SkeletonProps }[] = [
        { title: "axe skeleton - base case" },
        { title: "axe skeleton - circle", props: { circle: true } },
        { title: "axe skeleton - size", props: { size: "large" } },
        { title: "axe skeleton - position left", props: { position: "left" } },
        { title: "axe skeleton - count", props: { count: 4 } },
    ];

    test.each(a11yCases)("$title", async ({ props }) => {
        const wrapper = mount(OSkeleton, {
            props: { ...props },
            attachTo: document.body,
        });
        await setTimeout();

        expect(await axe(wrapper.element)).toHaveNoViolations();
    });
});
