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
        Array.from(host.children).forEach((child) =>
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

<style lang="scss">
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

.o-listbox {
    display: block;
    background: var(--p-listbox-background);
    color: var(--p-listbox-color);
    border: 1px solid var(--p-listbox-border-color);
    border-radius: var(--p-listbox-border-radius);
    transition:
        background var(--p-listbox-transition-duration),
        color var(--p-listbox-transition-duration),
        border-color var(--p-listbox-transition-duration),
        box-shadow var(--p-listbox-transition-duration),
        outline-color var(--p-listbox-transition-duration);
    outline-color: transparent;
    box-shadow: var(--p-listbox-shadow);
    background-color: var(--oruga-dropdown-menu-background, #ffffff);

    border-radius: var(
        --oruga-dropdown-menu-border-radius,
        var(--oruga-base-border-radius)
    );
    box-shadow: var(
        --oruga-dropdown-menu-box-shadow,
        0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
        0 0 0 1px rgba(10, 10, 10, 0.02)
    );
    padding: var(--oruga-dropdown-menu-padding, 0.5rem 0 0.5rem 0);
    margin: var(--oruga-dropdown-menu-margin, 0);

    &__filter {
        padding: var(--p-listbox-list-header-padding);
    }

    &__container {
        display: block;
        overflow: auto;
        min-width: var(--oruga-dropdown-menu-width, 12rem);
        z-index: var(--oruga-dropdown-menu-zindex, 50);
    }

    &__list {
        list-style-type: none;
        margin: 0;
        padding: var(--p-listbox-list-padding);
        outline: 0 none;
        display: flex;
        flex-direction: column;
        gap: var(--p-listbox-list-gap);

        &:focus-visible {
            border: 1px solid red;
        }
    }

    &__item {
        display: block;
        position: relative;
        color: var(--oruga-dropdown-item-color, #000000);
        font-size: var(
            --oruga-dropdown-item-font-size,
            var(--oruga-base-font-size)
        );
        font-weight: var(--oruga-dropdown-item-font-weight, 400);
        line-height: var(
            --oruga-dropdown-item-line-height,
            var(--oruga-base-line-height)
        );
        padding: var(--oruga-dropdown-item-padding, 0.375rem 1rem);

        &--disabled {
            opacity: var(
                --oruga-dropdown-item-disabled-opacity,
                var(--oruga-base-disabled-opacity)
            );
            pointer-events: none;
        }

        &--selected {
            background-color: var(
                --oruga-dropdown-item-active-background-color,
                var(--oruga-primary)
            );
            color: var(
                --oruga-dropdown-item-active-color,
                var(--oruga-primary-invert)
            );
        }

        &:not(.o-listbox__item--disabled) {
            cursor: pointer;

            &:not(.o-listbox__item--selected) {
                &:hover,
                &.o-listbox__item--focused {
                    background-color: var(
                        --oruga-dropdown-item-hover-background-color,
                        #f5f5f5
                    );
                    color: var(--oruga-dropdown-item-hover-color, #000000);
                }
            }
        }
    }
}
</style>
