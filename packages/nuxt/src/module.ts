import {
    defineNuxtModule,
    addPlugin,
    addComponent,
    addImports,
    createResolver,
} from "@nuxt/kit";
import type { OrugaConfig } from "@oruga-ui/oruga-next";

type SerializableOrugaConfig = Pick<
    OrugaConfig,
    | "iconPack"
    | "override"
    | "useHtml5Validation"
    | "statusIcon"
    | "mobileBreakpoint"
>;

export interface ModuleOptions {
    /** Serializable OrugaConfig properties (no functions — use a client plugin for those). */
    config?: Partial<SerializableOrugaConfig>;
    /** true (default) = all components, false = none, string[] = selective list. */
    components?: boolean | string[];
    /** Expose useOruga, useConfigProgrammatic, use*Programmatic via auto-imports. Default: true */
    composables?: boolean;
}

const ALL_COMPONENTS = [
    "OAutocomplete",
    "OBreadcrumb",
    "OBreadcrumbItem",
    "OButton",
    "OCarousel",
    "OCarouselItem",
    "OCheckbox",
    "OCollapse",
    "ODatepicker",
    "ODatetimepicker",
    "ODialog",
    "ODropdown",
    "ODropdownItem",
    "OField",
    "OIcon",
    "OInput",
    "OListbox",
    "OListItem",
    "OLoading",
    "OMenu",
    "OMenuItem",
    "OModal",
    "ONotification",
    "ONotificationNotice",
    "OPagination",
    "OPopover",
    "ORadio",
    "OSelect",
    "OSidebar",
    "OSkeleton",
    "OSlider",
    "OSliderTick",
    "OSteps",
    "OStepItem",
    "OSwitch",
    "OTable",
    "OTableColumn",
    "OTabs",
    "OTabItem",
    "OTag",
    "OTaginput",
    "OTimepicker",
    "OTooltip",
    "OTree",
    "OTreeItem",
    "OUpload",
] as const;

const ALL_COMPOSABLES = [
    "useOruga",
    "useConfigProgrammatic",
    "useDialogProgrammatic",
    "useLoadingProgrammatic",
    "useModalProgrammatic",
    "useNotificationProgrammatic",
    "usePopoverProgrammatic",
    "useSidebarProgrammatic",
] as const;

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: "@oruga-ui/nuxt",
        configKey: "oruga-ui",
        compatibility: { nuxt: ">=3.0.0" },
    },
    defaults: {
        components: true,
        composables: true,
        config: {},
    },
    setup(options, nuxt) {
        const resolver = createResolver(import.meta.url);

        // Always transpile (not just in production); corrects the package name.
        nuxt.options.build.transpile ??= [];
        if (!nuxt.options.build.transpile.includes("@oruga-ui/oruga-next")) {
            nuxt.options.build.transpile.push("@oruga-ui/oruga-next");
        }

        // Pass serializable config to the runtime plugin via runtimeConfig.
        (nuxt.options.runtimeConfig.public as Record<string, unknown>)[
            "oruga-ui"
        ] = {
            config: options.config ?? {},
        };

        // Do not add the extension since `.ts` is transpiled to `.mjs` after `npm run prepack`
        addPlugin(resolver.resolve("./runtime/plugin"));

        if (options.components !== false) {
            const names: string[] =
                options.components === true || options.components == null
                    ? [...ALL_COMPONENTS]
                    : (options.components as string[]);

            for (const name of names) {
                addComponent({
                    name,
                    export: name,
                    filePath: "@oruga-ui/oruga-next",
                });
            }
        }

        if (options.composables !== false) {
            addImports(
                ALL_COMPOSABLES.map((name) => ({
                    name,
                    from: "@oruga-ui/oruga-next",
                })),
            );
        }
    },
});
