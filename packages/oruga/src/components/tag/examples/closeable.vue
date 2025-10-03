<template>
    <section class="odocs-spaced">
        <p>
            <o-tag closeable variant="primary" aria-close-label="Close tag">
                Colored closeable tag label
            </o-tag>

            <o-tag closeable aria-close-label="Close tag">
                <template #default>
                    Attached tag label with custom and colored icon
                </template>

                <template #close> Cancel </template>
            </o-tag>
        </p>
    </section>
</template>
