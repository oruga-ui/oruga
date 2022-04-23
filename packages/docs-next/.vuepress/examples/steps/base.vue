<template>
  <section>
    <p>
      <o-field grouped group-multiline>
        <div class="control">
          <o-switch v-model="showSocial"> Show Social step </o-switch>
        </div>
        <div class="control">
          <o-switch v-model="isAnimated"> Animated </o-switch>
        </div>
        <div class="control">
          <o-switch v-model="isRounded"> Rounded </o-switch>
        </div>
        <div class="control">
          <o-switch v-model="isStepsClickable"> Clickable Marker </o-switch>
        </div>
      </o-field>
      <o-field grouped group-multiline>
        <div class="control">
          <o-switch v-model="hasNavigation"> Navigation Buttons </o-switch>
        </div>
        <div class="control">
          <o-switch v-model="customNavigation"> Custom Navigation </o-switch>
        </div>
        <div class="control">
          <o-switch v-model="isProfileSuccess">
            Set <code>success</code> for profile
          </o-switch>
        </div>
      </o-field>
      <o-field v-if="hasNavigation" grouped group-multiline>
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
      </o-field>
    </p>
    <o-steps
      v-model="activeStep"
      :animated="isAnimated"
      :rounded="isRounded"
      :has-navigation="hasNavigation"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      :label-position="labelPosition"
    >
      <o-step-item step="1" label="Account" :clickable="isStepsClickable">
        <h1 class="title has-text-centered">Account</h1>
        Lorem ipsum dolor sit amet.
      </o-step-item>

      <o-step-item
        step="2"
        label="Profile"
        :clickable="isStepsClickable"
        :variant="isProfileSuccess ? 'success' : ''"
      >
        <h1 class="title has-text-centered">Profile</h1>
        Lorem ipsum dolor sit amet.
      </o-step-item>

      <o-step-item
        step="3"
        :visible="showSocial"
        label="Social"
        :clickable="isStepsClickable"
      >
        <h1 class="title has-text-centered">Social</h1>
        Lorem ipsum dolor sit amet.
      </o-step-item>

      <o-step-item
        :step="showSocial ? '4' : '3'"
        label="Finish"
        :clickable="isStepsClickable"
        disabled
      >
        <h1 class="title has-text-centered">Finish</h1>
        Lorem ipsum dolor sit amet.
      </o-step-item>

      <template
        v-if="customNavigation"
        #navigation="{ previous, next }"
      >
        <o-button
          outlined
          variant="danger"
          icon-pack="fas"
          icon-left="backward"
          :disabled="previous.disabled"
          @click.prevent="previous.action"
        >
          Previous
        </o-button>
        <o-button
          outlined
          variant="success"
          icon-pack="fas"
          icon-right="forward"
          :disabled="next.disabled"
          @click.prevent="next.action"
        >
          Next
        </o-button>
      </template>
    </o-steps>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeStep: 1,

      showSocial: false,
      isAnimated: true,
      isRounded: true,
      isStepsClickable: false,

      hasNavigation: true,
      customNavigation: false,
      isProfileSuccess: false,

      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      labelPosition: 'bottom',
    };
  },
};
</script>
