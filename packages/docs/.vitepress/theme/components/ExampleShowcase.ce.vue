<script setup lang="ts">
// -----------------------------------------------------------------------------------------
// THIS COMPONENT IS USED AS WEB COMPONENT TO WRAP EXAMPLES AND TO ENCAPSULATE THEME STYLING
// -----------------------------------------------------------------------------------------

import { useShadowRoot, useHost, onMounted } from "vue";
import { loadTheme } from "..";

// load the current theme config
const theme = loadTheme();

const host = useHost();
const shadowRoot = useShadowRoot();

if (!shadowRoot)
    throw new Error("ExampleShowcase must be used as web component.");

onMounted(() => {
    if (host?.children)
        // add bulma light theme attribute to the slot content
        host.childNodes.forEach((child) =>
            child.setAttribute("data-theme", "light"),
        );

    // The slot content must be moved to the shadow root
    // for the scoped style above to be applied.
    if (host?.childNodes) shadowRoot.append(...(host.childNodes ?? []));
});

// create an HTML link element for the current theme cdn
const style = document.createElement("link");
style.rel = "stylesheet";
style.href = theme.cdn;

// inject the cdn link within the shadow root
// so that it doesn't leak outside of the component
shadowRoot.appendChild(style);

// create an HTML link element for the fortawesome icons
const link = document.createElement("link");
link.rel = "stylesheet";
link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/svg-with-js.min.css";

// inject the fortawesome link within the shadow root
shadowRoot.appendChild(link);
</script>

<!-- eslint-disable-next-line vue/valid-template-root -->
<template></template>

<style>
/** class of the inpected element in the Class Inpector */
.odocs-inspected-element {
    border: 2px solid var(--vp-c-caution-1) !important;
}

/** element seperator **/
.odocs-spaced p {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.odocs-spaced p > *:not(:last-child) {
    margin-right: 0.5rem;
}
</style>
