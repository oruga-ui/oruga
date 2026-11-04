<template>
    <section class="odocs-spaced">
        <p>
            <o-tag
                closeable
                variant="primary"
                aria-close-label="Remove tag Colored closeable">
                Colored closeable tag label
            </o-tag>

            <o-tag closeable aria-close-label="Cancel tag Closeable custom">
                <template #default>
                    Closeable tag label with a custom close button
                </template>

                <template #close> Cancel </template>
            </o-tag>
        </p>
    </section>
</template>
