import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { EffectScope, effectScope, nextTick, ref } from "vue";

import * as config from "@/utils/config";
import type { OrugaConfig } from "@/types";

import { defineClasses } from "../defineClasses";

describe("defineClasses test", () => {
    const variant = "small";
    const style = "simple";
    // a mocked component instance
    // we only have to specifiy the properties used in the defineClasses composable
    const mockVM = {
        proxy: {
            $options: {
                configField: "test",
            },
            $props: {
                name: "test",
                variant: variant,
                style: style,
            },
        },
    } as any;

    let scope: EffectScope;

    beforeEach(() => {
        scope = effectScope();
    });

    afterEach(() => {
        scope.stop();
    });

    describe("test class definition without config", () => {
        test("test classes processed correct", () => {
            const classes = defineClasses(
                ["rootClass", "o-button"],
                ["variantClass", "o-button--", variant, !!variant],
                ["styleClass", "o-{*}-button", style, !!style],
                ["expandedClass", "o-button--expanded", null, false],
                { vm: mockVM, scope: scope },
            );

            expect(classes.value).toEqual([
                { "o-button": true },
                { "o-button--small": true },
                { "o-simple-button": true },
                { "o-button--expanded": false },
            ]);
        });

        test("test apply can change", () => {
            scope.run(async () => {
                const apply = ref(false);
                const classes = defineClasses(
                    ["rootClass", "o-button"],
                    ["variantClass", "o-button--", variant, !!variant],
                    ["expandedClass", "o-button--expanded", null, apply],
                    { vm: mockVM, scope: scope },
                );

                expect(classes.value).toEqual([
                    { "o-button": true },
                    { "o-button--small": true },
                    { "o-button--expanded": false },
                ]);

                apply.value = true;
                await nextTick(); // await watcher to run

                expect(classes.value).toStrictEqual([
                    { "o-button": true },
                    { "o-button--small": true },
                    { "o-button--expanded": true },
                ]);
            });
        });

        test("test suffix can change", () => {
            scope.run(async () => {
                const suffix = ref(variant);
                const classes = defineClasses(
                    ["rootClass", "o-button"],
                    ["variantClass", "o-button--", suffix, true],
                    ["expandedClass", "o-button--expanded", null, false],
                    { vm: mockVM, scope: scope },
                );

                expect(classes.value).toEqual([
                    { "o-button": true },
                    { "o-button--small": true },
                    { "o-button--expanded": false },
                ]);

                suffix.value = "large";
                await nextTick(); // await watcher to run

                expect(classes.value).toStrictEqual([
                    { "o-button": true },
                    { "o-button--large": true },
                    { "o-button--expanded": false },
                ]);
            });
        });

        describe("test with instance classes", () => {
            const mockVM = {
                proxy: {
                    $options: {
                        configField: "test",
                    },
                    $props: {
                        variant: variant,
                        rootClass: "instance-button",
                        variantClass: "instance-button--",
                        expandedClass: "instance-button--expanded",
                        styleClass: "instance-{*}-button",
                    },
                },
            } as any;

            test("test classes processed correct", () => {
                const classes = defineClasses(
                    ["rootClass", "o-button"],
                    ["variantClass", "o-button--", variant, !!variant],
                    ["styleClass", "o-{*}-button", style, !!style],
                    ["expandedClass", "o-button--expanded", null, false],
                    { vm: mockVM, scope: scope },
                );

                expect(classes.value).toEqual([
                    { "o-button instance-button": true },
                    { "o-button--small instance-button--small": true },
                    { "o-simple-button instance-simple-button": true },
                    { "o-button--expanded instance-button--expanded": false },
                ]);
            });

            test("test apply can change", () => {
                scope.run(async () => {
                    const apply = ref(false);
                    const classes = defineClasses(
                        ["rootClass", "o-button"],
                        ["variantClass", "o-button--", variant, !!variant],
                        ["expandedClass", "o-button--expanded", null, apply],
                        { vm: mockVM, scope: scope },
                    );

                    expect(classes.value).toStrictEqual([
                        { "o-button instance-button": true },
                        { "o-button--small instance-button--small": true },
                        {
                            "o-button--expanded instance-button--expanded": false,
                        },
                    ]);

                    apply.value = true;
                    await nextTick(); // await watcher to run

                    expect(classes.value).toStrictEqual([
                        { "o-button instance-button": true },
                        { "o-button--small instance-button--small": true },
                        {
                            "o-button--expanded instance-button--expanded": true,
                        },
                    ]);
                });
            });

            test("test suffix can change", () => {
                scope.run(async () => {
                    const suffix = ref(variant);
                    const classes = defineClasses(
                        ["rootClass", "o-button"],
                        ["variantClass", "o-button--", suffix, true],
                        ["expandedClass", "o-button--expanded", null, false],
                        { vm: mockVM, scope: scope },
                    );

                    expect(classes.value).toEqual([
                        { "o-button instance-button": true },
                        { "o-button--small instance-button--small": true },
                        {
                            "o-button--expanded instance-button--expanded": false,
                        },
                    ]);

                    suffix.value = "large";
                    await nextTick(); // await watcher to run

                    expect(classes.value).toEqual([
                        { "o-button instance-button": true },
                        { "o-button--large instance-button--large": true },
                        {
                            "o-button--expanded instance-button--expanded": false,
                        },
                    ]);
                });
            });
        });

        describe("test with instance classes and override", () => {
            const mockVM = {
                proxy: {
                    $options: {
                        configField: "test",
                    },
                    $props: {
                        override: true,
                        variant: variant,
                        rootClass: "instance-button",
                        variantClass: "instance-button--",
                        expandedClass: "instance-button--expanded",
                        styleClass: "instance-{*}-button",
                    },
                },
            } as any;

            test("test classes processed correct", () => {
                const classes = defineClasses(
                    ["rootClass", "o-button"],
                    ["variantClass", "o-button--", variant, !!variant],
                    ["styleClass", "o-{*}-button", style, !!style],
                    ["expandedClass", "o-button--expanded", null, false],
                    { vm: mockVM, scope: scope },
                );

                expect(classes.value).toEqual([
                    { "instance-button": true },
                    { "instance-button--small": true },
                    { "instance-simple-button": true },
                    { "instance-button--expanded": false },
                ]);
            });

            test("test apply can change", () => {
                scope.run(async () => {
                    const apply = ref(false);
                    const classes = defineClasses(
                        ["rootClass", "o-button"],
                        ["variantClass", "o-button--", variant, !!variant],
                        ["expandedClass", "o-button--expanded", null, apply],
                        { vm: mockVM, scope: scope },
                    );

                    expect(classes.value).toStrictEqual([
                        { "instance-button": true },
                        { "instance-button--small": true },
                        { "instance-button--expanded": false },
                    ]);

                    apply.value = true;
                    await nextTick(); // await watcher to run

                    expect(classes.value).toStrictEqual([
                        { "instance-button": true },
                        { "instance-button--small": true },
                        { "instance-button--expanded": true },
                    ]);
                });
            });

            test("test suffix can change", () => {
                scope.run(async () => {
                    const suffix = ref(variant);
                    const classes = defineClasses(
                        ["rootClass", "o-button"],
                        ["variantClass", "o-button--", suffix, true],
                        ["expandedClass", "o-button--expanded", null, false],
                        { vm: mockVM, scope: scope },
                    );

                    expect(classes.value).toEqual([
                        { "instance-button": true },
                        { "instance-button--small": true },
                        {
                            "instance-button--expanded": false,
                        },
                    ]);

                    suffix.value = "large";
                    await nextTick(); // await watcher to run

                    expect(classes.value).toEqual([
                        { "instance-button": true },
                        { "instance-button--large": true },
                        { "instance-button--expanded": false },
                    ]);
                });
            });
        });
    });

    describe("test class definition with config", () => {
        describe("test config without override", () => {
            beforeEach(() => {
                vi.spyOn(config, "getConfig").mockImplementation(
                    () =>
                        ({
                            test: {
                                rootClass: "my-button",
                                variantClass: "my-button--",
                                expandedClass: "my-button--expanded",
                                styleClass: "my-{*}-button",
                            },
                        }) as OrugaConfig,
                );
            });

            afterEach(() => {
                vi.clearAllMocks();
            });

            test("test classes processed correct", () => {
                const classes = defineClasses(
                    ["rootClass", "o-button"],
                    ["variantClass", "o-button--", variant, !!variant],
                    ["styleClass", "o-{*}-button", style, !!style],
                    ["expandedClass", "o-button--expanded", null, false],
                    { vm: mockVM, scope: scope },
                );

                expect(classes.value).toEqual([
                    { "o-button my-button": true },
                    { "o-button--small my-button--small": true },
                    { "o-simple-button my-simple-button": true },
                    { "o-button--expanded my-button--expanded": false },
                ]);
            });

            test("test apply can change", () => {
                scope.run(async () => {
                    const apply = ref(false);
                    const classes = defineClasses(
                        ["rootClass", "o-button"],
                        ["variantClass", "o-button--", variant, !!variant],
                        ["expandedClass", "o-button--expanded", null, apply],
                        { vm: mockVM, scope: scope },
                    );

                    expect(classes.value).toEqual([
                        { "o-button my-button": true },
                        { "o-button--small my-button--small": true },
                        { "o-button--expanded my-button--expanded": false },
                    ]);

                    apply.value = true;
                    await nextTick(); // await watcher to run

                    expect(classes.value).toEqual([
                        { "o-button my-button": true },
                        { "o-button--small my-button--small": true },
                        { "o-button--expanded my-button--expanded": true },
                    ]);
                });
            });

            test("test suffix can change", () => {
                scope.run(async () => {
                    const suffix = ref(variant);
                    const classes = defineClasses(
                        ["rootClass", "o-button"],
                        ["variantClass", "o-button--", suffix, true],
                        ["expandedClass", "o-button--expanded", null, false],
                        { vm: mockVM, scope: scope },
                    );

                    expect(classes.value).toEqual([
                        { "o-button my-button": true },
                        { "o-button--small my-button--small": true },
                        { "o-button--expanded my-button--expanded": false },
                    ]);

                    suffix.value = "large";
                    await nextTick(); // await watcher to run

                    expect(classes.value).toEqual([
                        { "o-button my-button": true },
                        { "o-button--large my-button--large": true },
                        { "o-button--expanded my-button--expanded": false },
                    ]);
                });
            });
        });

        describe("test config with override", () => {
            beforeEach(() => {
                vi.spyOn(config, "getConfig").mockImplementation(
                    () =>
                        ({
                            override: true,
                            test: {
                                rootClass: "my-button",
                                variantClass: "my-button--",
                                expandedClass: "my-button--expanded",
                                styleClass: "my-{*}-button",
                            },
                        }) as OrugaConfig,
                );
            });

            afterEach(() => {
                vi.clearAllMocks();
            });

            test("test classes processed correct", () => {
                const classes = defineClasses(
                    ["rootClass", "o-button"],
                    ["variantClass", "o-button--", variant, !!variant],
                    ["styleClass", "o-{*}-button", style, !!style],
                    ["expandedClass", "o-button--expanded", null, false],
                    { vm: mockVM, scope: scope },
                );

                expect(classes.value).toEqual([
                    { "my-button": true },
                    { "my-button--small": true },
                    { "my-simple-button": true },
                    { "my-button--expanded": false },
                ]);
            });

            test("test apply can change", () => {
                scope.run(async () => {
                    const apply = ref(false);
                    const classes = defineClasses(
                        ["rootClass", "o-button"],
                        ["variantClass", "o-button--", variant, !!variant],
                        ["expandedClass", "o-button--expanded", null, apply],
                        { vm: mockVM, scope: scope },
                    );

                    expect(classes.value).toEqual([
                        { "my-button": true },
                        { "my-button--small": true },
                        { "my-button--expanded": false },
                    ]);

                    apply.value = true;
                    await nextTick(); // await watcher to run

                    expect(classes.value).toStrictEqual([
                        { "my-button": true },
                        { "my-button--small": true },
                        { "my-button--expanded": true },
                    ]);
                });
            });

            test("test suffix can change", () => {
                scope.run(async () => {
                    const suffix = ref(variant);
                    const classes = defineClasses(
                        ["rootClass", "o-button"],
                        ["variantClass", "o-button--", suffix, true],
                        ["expandedClass", "o-button--expanded", null, false],
                        { vm: mockVM, scope: scope },
                    );

                    expect(classes.value).toEqual([
                        { "my-button": true },
                        { "my-button--small": true },
                        { "my-button--expanded": false },
                    ]);

                    suffix.value = "large";
                    await nextTick(); // await watcher to run

                    expect(classes.value).toStrictEqual([
                        { "my-button": true },
                        { "my-button--large": true },
                        { "my-button--expanded": false },
                    ]);
                });
            });
        });

        describe("test with instance classes", () => {
            const mockVM = {
                proxy: {
                    $options: {
                        configField: "test",
                    },
                    $props: {
                        variant: variant,
                        rootClass: "instance-button",
                        variantClass: "instance-button--",
                        expandedClass: "instance-button--expanded",
                        styleClass: "instance-{*}-button",
                    },
                },
            } as any;

            beforeEach(() => {
                vi.spyOn(config, "getConfig").mockImplementation(
                    () =>
                        ({
                            test: {
                                rootClass: "my-button",
                                variantClass: "my-button--",
                                expandedClass: "my-button--expanded",
                                styleClass: "my-{*}-button",
                            },
                        }) as OrugaConfig,
                );
            });

            afterEach(() => {
                vi.clearAllMocks();
            });

            test("test classes processed correct", () => {
                const classes = defineClasses(
                    ["rootClass", "o-button"],
                    ["variantClass", "o-button--", variant, !!variant],
                    ["styleClass", "o-{*}-button", style, !!style],
                    ["expandedClass", "o-button--expanded", null, false],
                    { vm: mockVM, scope: scope },
                );

                expect(classes.value).toEqual([
                    { "o-button my-button instance-button": true },
                    {
                        "o-button--small my-button--small instance-button--small": true,
                    },
                    {
                        "o-simple-button my-simple-button instance-simple-button": true,
                    },
                    {
                        "o-button--expanded my-button--expanded instance-button--expanded": false,
                    },
                ]);
            });

            test("test apply can change", () => {
                scope.run(async () => {
                    const apply = ref(false);
                    const classes = defineClasses(
                        ["rootClass", "o-button"],
                        ["variantClass", "o-button--", variant, !!variant],
                        ["expandedClass", "o-button--expanded", null, apply],
                        { vm: mockVM, scope: scope },
                    );

                    expect(classes.value).toStrictEqual([
                        { "o-button my-button instance-button": true },
                        {
                            "o-button--small my-button--small instance-button--small": true,
                        },
                        {
                            "o-button--expanded my-button--expanded instance-button--expanded": false,
                        },
                    ]);

                    apply.value = true;
                    await nextTick(); // await watcher to run

                    expect(classes.value).toStrictEqual([
                        { "o-button my-button instance-button": true },
                        {
                            "o-button--small my-button--small instance-button--small": true,
                        },
                        {
                            "o-button--expanded my-button--expanded instance-button--expanded": true,
                        },
                    ]);
                });
            });

            test("test suffix can change", () => {
                scope.run(async () => {
                    const suffix = ref(variant);
                    const classes = defineClasses(
                        ["rootClass", "o-button"],
                        ["variantClass", "o-button--", suffix, true],
                        ["expandedClass", "o-button--expanded", null, false],
                        { vm: mockVM, scope: scope },
                    );

                    expect(classes.value).toEqual([
                        { "o-button my-button instance-button": true },
                        {
                            "o-button--small my-button--small instance-button--small": true,
                        },
                        {
                            "o-button--expanded my-button--expanded instance-button--expanded": false,
                        },
                    ]);

                    suffix.value = "large";
                    await nextTick(); // await watcher to run

                    expect(classes.value).toEqual([
                        { "o-button my-button instance-button": true },
                        {
                            "o-button--large my-button--large instance-button--large": true,
                        },
                        {
                            "o-button--expanded my-button--expanded instance-button--expanded": false,
                        },
                    ]);
                });
            });
        });

        describe("test with instance classes and override", () => {
            const mockVM = {
                proxy: {
                    $options: {
                        configField: "test",
                    },
                    $props: {
                        override: true,
                        variant: variant,
                        rootClass: "instance-button",
                        variantClass: "instance-button--",
                        expandedClass: "instance-button--expanded",
                        styleClass: "instance-{*}-button",
                    },
                },
            } as any;

            beforeEach(() => {
                vi.spyOn(config, "getConfig").mockImplementation(
                    () =>
                        ({
                            test: {
                                rootClass: "my-button",
                                variantClass: "my-button--",
                                expandedClass: "my-button--expanded",
                            },
                        }) as OrugaConfig,
                );
            });

            afterEach(() => {
                vi.clearAllMocks();
            });

            test("test classes processed correct", () => {
                const classes = defineClasses(
                    ["rootClass", "o-button"],
                    ["variantClass", "o-button--", variant, !!variant],
                    ["styleClass", "o-{*}-button", style, !!style],
                    ["expandedClass", "o-button--expanded", null, false],
                    { vm: mockVM, scope: scope },
                );

                expect(classes.value).toEqual([
                    { "instance-button": true },
                    { "instance-button--small": true },
                    { "instance-simple-button": true },
                    { "instance-button--expanded": false },
                ]);
            });

            test("test apply can change", () => {
                scope.run(async () => {
                    const apply = ref(false);
                    const classes = defineClasses(
                        ["rootClass", "o-button"],
                        ["variantClass", "o-button--", variant, !!variant],
                        ["expandedClass", "o-button--expanded", null, apply],
                        { vm: mockVM, scope: scope },
                    );

                    expect(classes.value).toStrictEqual([
                        { "instance-button": true },
                        { "instance-button--small": true },
                        { "instance-button--expanded": false },
                    ]);

                    apply.value = true;
                    await nextTick(); // await watcher to run

                    expect(classes.value).toStrictEqual([
                        { "instance-button": true },
                        { "instance-button--small": true },
                        { "instance-button--expanded": true },
                    ]);
                });
            });

            test("test suffix can change", () => {
                scope.run(async () => {
                    const suffix = ref(variant);
                    const classes = defineClasses(
                        ["rootClass", "o-button"],
                        ["variantClass", "o-button--", suffix, true],
                        ["expandedClass", "o-button--expanded", null, false],
                        { vm: mockVM, scope: scope },
                    );

                    expect(classes.value).toEqual([
                        { "instance-button": true },
                        { "instance-button--small": true },
                        {
                            "instance-button--expanded": false,
                        },
                    ]);

                    suffix.value = "large";
                    await nextTick(); // await watcher to run

                    expect(classes.value).toEqual([
                        { "instance-button": true },
                        { "instance-button--large": true },
                        { "instance-button--expanded": false },
                    ]);
                });
            });
        });
    });
});
