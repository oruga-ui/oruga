<template>
    <section class="odocs-spaced">
        <p>
            <o-tag variant="primary" closable aria-close-label="Close tag">
                Colored closable tag label
            </o-tag>

            <o-tag
                closable
                close-icon="delete"
                variant="success"
                aria-close-label="Close tag">
                Colored closable tag label with colored closed icon
            </o-tag>
        </p>
        <p>
            <o-tag closable aria-close-label="Close tag">
                <template #default>
                    Attached tag label with custom and colored icon
                </template>

                <template #close="{ close }">
                    <o-button
                        label="Cancel"
                        variant="primary"
                        size="small"
                        @click="close" />
                </template>
            </o-tag>
        </p>
    </section>
</template>
