<template>
    <section class="odocs-spaced">
        <p>
            <o-tag closable variant="primary" aria-close-label="Close tag">
                Colored closable tag label
            </o-tag>

            <o-tag closable aria-close-label="Close tag">
                <template #default>
                    Attached tag label with custom and colored icon
                </template>

                <template #close="{ close }">
                    <o-button
                        label="Cancel"
                        variant="secondary"
                        size="small"
                        @click="close" />
                </template>
            </o-tag>
        </p>
    </section>
</template>
