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

        <o-dropdown :triggers="['hover']">
            <template #trigger="{ active }">
                <o-button
                    variant="info"
                    label="Hover me!"
                    :icon-right="active ? 'caret-up' : 'caret-down'" />
            </template>

            <o-dropdown-item label="Action" />
            <o-dropdown-item label="Another action" />
            <o-dropdown-item label="Something else" />
        </o-dropdown>

        <o-dropdown disabled>
            <template #trigger="{ active }">
                <o-button
                    label="Disabled"
                    :icon-right="active ? 'caret-up' : 'caret-down'" />
            </template>

            <o-dropdown-item label="Action" />
            <o-dropdown-item label="Another action" />
            <o-dropdown-item label="Something else" />
        </o-dropdown>

        <o-dropdown>
            <template #trigger>
                <div role="button">
                    Custom
                    <o-icon variant="success" icon="caret-down" />
                </div>
            </template>

            <o-dropdown-item label="Action" />
            <o-dropdown-item label="Another action" />
            <o-dropdown-item label="Something else" />
        </o-dropdown>

        <o-dropdown :triggers="['contextmenu']">
            <template #trigger>
                <o-button label="Right click" />
            </template>

            <o-dropdown-item label="Action" />
            <o-dropdown-item label="Another action" />
            <o-dropdown-item label="Something else" />
        </o-dropdown>

        <o-dropdown teleport>
            <template #trigger>
                <o-button label="Append to body" />
            </template>

            <o-dropdown-item label="Action" />
            <o-dropdown-item label="Another action" />
            <o-dropdown-item label="Something else" />
        </o-dropdown>
    </section>
</template>
