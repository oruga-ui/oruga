<template>
  <section>
    <o-notification
      aria-close-label="Close notification"
    >
      <template #default="{ closeNotification }">
        <div class="notification-content">
          <span
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
            fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit
            sapien laoreet elit</span
          >
          <o-button label="Cancel" size="small" @click="closeNotification" />
        </div>
      </template>
    </o-notification>
  </section>
</template>

<script>
export default {};
</script>
<style>
.notification-content {
  display: flex;
}
</style>
