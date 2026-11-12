import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import {
    createOruga,
    Dialog,
    Loading,
    Modal,
    Notification,
    Popover,
    Programmatic,
    Sidebar,
} from "@oruga-ui/oruga-next";
import type { OrugaConfig } from "@oruga-ui/oruga-next";

export default defineNuxtPlugin((nuxtApp) => {
    const modulePublic =
        (
            useRuntimeConfig().public as Record<
                string,
                { config?: Partial<OrugaConfig> }
            >
        )["oruga-ui"] ?? {};
    const userConfig = modulePublic.config ?? {};

    // Keep the default target serializable and identical during server rendering and hydration.
    const config = { teleportTarget: "body", ...userConfig };

    const oruga = createOruga(config);

    // Install only the plugins that call registerProgrammatic() — this makes
    // useOruga().modal, .dialog, etc. available. Pure UI components (OButton, etc.)
    // are handled by addComponent() auto-imports in the module, no plugin needed.
    oruga.use(
        Programmatic,
        Dialog,
        Loading,
        Modal,
        Notification,
        Popover,
        Sidebar,
    );

    nuxtApp.vueApp.use(oruga);
});
