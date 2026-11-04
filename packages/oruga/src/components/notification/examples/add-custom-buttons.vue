<template>
    <section>
        <o-notification v-slot="{ close }">
            <div class="notification-content">
                <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Fusce id fermentum quam. Proin sagittis, nibh id hendrerit
                    imperdiet, elit sapien laoreet elit
                </span>
                <o-button
                    label="Dismiss"
                    variant="primary"
                    size="small"
                    @click="close()" />
            </div>
        </o-notification>
    </section>
</template>

<style scoped>
.notification-content {
    display: flex;
}
</style>
