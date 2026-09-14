export default defineNuxtConfig({
    compatibilityDate: "latest",
    devtools: { enabled: true },
    modules: ["@oruga-ui/nuxt"],
    "oruga-ui": {
        config: {
            iconPack: "mdi",
            override: false,
        },
        components: true,
        composables: true,
    },
});
