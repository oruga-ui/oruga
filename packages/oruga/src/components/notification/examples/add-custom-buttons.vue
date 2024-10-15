<template>
    <section>
        <o-notification
            v-slot="{ close }"
            aria-close-label="Close notification">
            <div class="notification-content">
                <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Fusce id fermentum quam. Proin sagittis, nibh id hendrerit
                    imperdiet, elit sapien laoreet elit
                </span>
                <o-button
                    label="Cancel"
                    variant="primary"
                    size="small"
                    @click="close" />
            </div>
        </o-notification>
    </section>
</template>

<style scoped>
.notification-content {
    display: flex;
}
</style>
