<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from "vue";
import { useOruga } from "../../../../../oruga/dist/oruga";

const customIconPacks = {
    ionicons: {
        sizes: {
            default: "is-size-5",
            small: "",
            medium: "is-size-3",
            large: "is-size-1",
        },
        iconPrefix: "ion-md-",
        internalIcons: {
            check: "checkmark",
            information: "information",
            alert: "alert",
            "alert-circle": "alert",
            "arrow-up": "arrow-up",
            "chevron-right": "arrow-forward",
            "chevron-left": "arrow-back",
            "chevron-down": "arrow-down",
            eye: "eye",
            "eye-off": "eye-off",
            "caret-down": "arrow-dropdown",
            "caret-up": "arrow-dropup",
            loading: "reload-outline",
            times: "close-outline",
            "close-circle": "close-circle-outline",
        },
    },
};

// all code is only for example purpose

const orugaOptions = ref();

const oruga = useOruga();

onBeforeMount(() => {
    // save old settings
    orugaOptions.value = oruga.config.getOptions();
    // override custom settings
    oruga.config.setOption("iconComponent", undefined);
    oruga.config.setOption("customIconPacks", customIconPacks);
});

onBeforeUnmount(() => {
    // restore old settings
    oruga.config.setOptions(orugaOptions.value);
});
</script>

<template>
    <section>
        <div class="odocs-spaced">
            <o-icon pack="ionicons" icon="person" size="small" />
            <o-icon pack="ionicons" icon="home" size="small" />
            <o-icon pack="ionicons" icon="apps" size="small" />
        </div>

        <div class="odocs-spaced">
            <o-icon pack="ionicons" icon="person" />
            <o-icon pack="ionicons" icon="home" />
            <o-icon pack="ionicons" icon="apps" />
        </div>

        <div class="odocs-spaced">
            <o-icon pack="ionicons" icon="person" size="medium" />
            <o-icon pack="ionicons" icon="home" size="medium" />
            <o-icon pack="ionicons" icon="apps" size="medium" />
        </div>

        <div class="odocs-spaced">
            <o-icon
                pack="ionicons"
                icon="person"
                size="large"
                variant="success" />
            <o-icon pack="ionicons" icon="home" size="large" variant="info" />
            <o-icon
                pack="ionicons"
                icon="apps"
                size="large"
                variant="primary" />
        </div>

        <div class="odocs-spaced">
            <o-button variant="primary">
                <o-icon pack="ionicons" icon="checkmark" />
                <span>Finish</span>
            </o-button>

            <o-button variant="warning">
                <o-icon pack="ionicons" icon="checkmark" />
                <span>Finish</span>
            </o-button>

            <o-button variant="warning">
                <o-icon spin pack="ionicons" icon="refresh" />
                <span>Refresh</span>
            </o-button>
        </div>
    </section>
</template>

<style>
@import "https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css";
</style>
