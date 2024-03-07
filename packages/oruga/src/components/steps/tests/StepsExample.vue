<script setup lang="ts" generic="T extends Record<string, unknown> | string">
import { type PropType, ref } from "vue";
import OSteps from "@/components/steps/Steps.vue";
import OStepItem from "@/components/steps/StepItem.vue";
import OButton from "@/components/button/Button.vue";

defineProps({
    isVertical: {
        type: Boolean,
        default: false,
    },
    isAnimated: {
        type: Boolean,
        default: false,
    },
    isRounded: {
        type: Boolean,
        default: false,
    },
    hasNavigation: {
        type: Boolean,
        default: false,
    },
    labelPosition: {
        type: String as PropType<"bottom" | "left" | "right">,
        default: "bottom",
    },
    isStepsClickable: {
        type: Boolean,
        default: false,
    },
    isProfileSuccess: {
        type: Boolean,
        default: false,
    },
    showSocial: {
        type: Boolean,
        default: false,
    },
    customNavigation: {
        type: Boolean,
        default: false,
    },
});

const activeStep = ref<number>(1);
const enableProfileActivateEvent = ref(false);

const onProfileActivate = () => {
    if (enableProfileActivateEvent.value) {
        alert("Profile Activated");
    }
};
</script>

<template>
    <!-- Taken from the first example in the documentation -->
    <o-steps
        v-model="activeStep"
        :vertical="isVertical"
        :animated="isAnimated"
        :rounded="isRounded"
        :has-navigation="hasNavigation"
        icon-prev="chevron-left"
        icon-next="chevron-right"
        :label-position="labelPosition">
        <o-step-item
            value="1"
            step="1"
            label="Account"
            :clickable="isStepsClickable">
            <h1 class="title has-text-centered">Account</h1>
            Lorem ipsum dolor sit amet.
        </o-step-item>

        <o-step-item
            value="2"
            step="2"
            label="Profile"
            :clickable="isStepsClickable"
            :variant="isProfileSuccess ? 'success' : ''"
            @activate="onProfileActivate">
            <h1 class="title has-text-centered">Profile</h1>
            Lorem ipsum dolor sit amet.
        </o-step-item>

        <o-step-item
            value="3"
            step="3"
            :visible="showSocial"
            label="Social"
            :clickable="isStepsClickable">
            <h1 class="title has-text-centered">Social</h1>
            Lorem ipsum dolor sit amet.
        </o-step-item>

        <o-step-item
            value="4"
            :step="showSocial ? '4' : '3'"
            label="Finish"
            :clickable="isStepsClickable"
            disabled>
            <h1 class="title has-text-centered">Finish</h1>
            Lorem ipsum dolor sit amet.
        </o-step-item>

        <template v-if="customNavigation" #navigation="{ previous, next }">
            <o-button
                outlined
                label="Previous"
                variant="danger"
                icon-pack="fas"
                icon-left="backward"
                :disabled="previous.disabled"
                @click.prevent="previous.action" />

            <o-button
                outlined
                label="Next"
                variant="success"
                icon-pack="fas"
                icon-right="forward"
                :disabled="next.disabled"
                @click.prevent="next.action" />
        </template>
    </o-steps>
</template>
