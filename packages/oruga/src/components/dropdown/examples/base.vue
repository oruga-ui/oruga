<template>
    <section class="odocs-spaced">
        <o-dropdown>
            <template #trigger="{ active }">
                <o-button
                    variant="primary"
                    label="Click me!"
                    :icon-right="active ? 'caret-up' : 'caret-down'" />
            </template>

            <o-dropdown-item label="Action" />
            <o-dropdown-item label="Another action" />
            <o-dropdown-item label="Something else" />
        </o-dropdown>
    </section>
</template>
