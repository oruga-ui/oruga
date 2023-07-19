<template>
    <section>
        <o-notification
            v-slot="{ closeNotification }"
            aria-close-label="Close notification">
            <div class="notification-content">
                <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Fusce id fermentum quam. Proin sagittis, nibh id hendrerit
                    imperdiet, elit sapien laoreet elit
                </span>
                <o-button
                    label="Cancel"
                    size="small"
                    @click="closeNotification" />
            </div>
        </o-notification>
    </section>
</template>

<style lang="scss" scoped>
.notification-content {
    display: flex;
}
</style>
