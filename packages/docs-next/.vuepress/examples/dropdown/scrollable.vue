<template>
  <section>
    <div class="block">
      <o-field>
        <o-switch v-model="isScrollable">Scrollable</o-switch>
      </o-field>
    </div>

    <br />

    <o-dropdown
      :scrollable="isScrollable"
      :max-height="maxHeight"
      v-model="currentMenu"
      aria-role="list"
    >
      <template #trigger>
        <o-button variant="primary" type="button">
          <o-icon :icon="currentMenu.icon"></o-icon>
          <span>{{ currentMenu.text }}</span>
          <o-icon icon="caret-down"></o-icon>
        </o-button>
      </template>

      <o-dropdown-item
        v-for="(menu, index) in menus"
        :key="index"
        :value="menu"
        aria-role="listitem"
      >
        <div class="media">
          <o-icon class="media-left" :icon="menu.icon"></o-icon>
          <div class="media-content">
            <span>{{ menu.text }}</span>
          </div>
        </div>
      </o-dropdown-item>
    </o-dropdown>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isScrollable: true,
      maxHeight: 200,
      currentMenu: { icon: 'users', text: 'People' },
      menus: [
        { icon: 'users', text: 'People' },
        { icon: 'box', text: 'Orders' },
        { icon: 'credit-card', text: 'Payments' },
        { icon: 'dolly', text: 'Logistics' },
        { icon: 'business-time', text: 'Jobs' },
        { icon: 'shopping-cart', text: 'Cart' },
        { icon: 'cog', text: 'Configuration' },
      ],
    };
  },
};
</script>

<style>
.media {
  align-items: flex-start;
  display: flex;
  text-align: left;
}
.media-content {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
  overflow-y: hidden;
  overflow-x: auto;
}
.media-left {
  margin-right: 1rem;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
}
</style>
