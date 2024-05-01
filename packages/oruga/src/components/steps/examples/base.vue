<script setup>
import { ref } from "vue";

// Is
const activeStep = ref("1");
const isStepsClickable = ref(false);
const isAnimated = ref(true);
const isVertical = ref(false);
const isProfileSuccess = ref(false);
const isRounded = ref(true);
const enableProfileActivateEvent = ref(false);
// Navigation
const hasNavigation = ref(true);
const customNavigation = ref(false);
// Icon
const prevIcon = ref("chevron-left");
const nextIcon = ref("chevron-right");
// Misc
const showSocial = ref(false);
const labelPosition = ref("bottom");
const stepsPosition = ref("left");

const onProfileActivate = () => {
    if (enableProfileActivateEvent.value) {
        alert("Profile Activated");
    }
};
</script>

<template>
    <section>
        <o-field grouped group-multiline>
            <o-field>
                <o-switch v-model="showSocial" label="Show Social step" />
            </o-field>
            <o-field>
                <o-switch v-model="isAnimated" label="Animated" />
            </o-field>
            <o-field>
                <o-switch v-model="isRounded" label="Rounded" />
            </o-field>
            <o-field>
                <o-switch v-model="isVertical" label="Vertical" />
            </o-field>
            <o-field>
                <o-switch v-model="isStepsClickable" label="Clickable Marker" />
            </o-field>
            <o-field>
                <o-switch v-model="hasNavigation" label="Navigation Buttons" />
            </o-field>
            <o-field>
                <o-switch
                    v-model="customNavigation"
                    label="Custom Navigation" />
            </o-field>
            <o-field>
                <o-switch v-model="isProfileSuccess">
                    Set <code>success</code> for profile
                </o-switch>
            </o-field>
            <o-field>
                <o-switch v-model="enableProfileActivateEvent">
                    Enable profile activate event
                </o-switch>
            </o-field>
        </o-field>

        <o-field v-if="hasNavigation" grouped>
            <o-field label="Prev icon">
                <o-select v-model="prevIcon">
                    <option value="chevron-left">Chevron</option>
                    <option value="arrow-left">Arrow</option>
                </o-select>
            </o-field>
            <o-field label="Next icon">
                <o-select v-model="nextIcon">
                    <option value="chevron-right">Chevron</option>
                    <option value="arrow-right">Arrow</option>
                </o-select>
            </o-field>
            <o-field label="Label position">
                <o-select v-model="labelPosition">
                    <option value="bottom">Bottom</option>
                    <option value="right">Right</option>
                    <option value="left">Left</option>
                </o-select>
            </o-field>
            <o-field label="Steps position">
                <o-select v-model="stepsPosition">
                    <option value="right">Right</option>
                    <option value="left">Left</option>
                </o-select>
            </o-field>
        </o-field>

        <o-steps
            v-model="activeStep"
            :vertical="isVertical"
            :animated="isAnimated"
            :rounded="isRounded"
            :has-navigation="hasNavigation"
            :icon-prev="prevIcon"
            :icon-next="nextIcon"
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
    </section>
</template>
