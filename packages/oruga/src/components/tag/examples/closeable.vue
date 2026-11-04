<template>
    <section class="odocs-spaced">
        <p>
            <o-tag closeable variant="primary" aria-close-label="Close tag">
                Colored closeable tag label
            </o-tag>

            <o-tag closeable aria-close-label="Close tag">
                <template #default>
                    Closeable tag label with a custom close button
                </template>

                <template #close> Cancel </template>
            </o-tag>
        </p>
    </section>
</template>
