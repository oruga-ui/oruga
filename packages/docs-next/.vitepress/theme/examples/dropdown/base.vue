<template>
    <section class="odocs-spaced">
        <o-dropdown aria-role="list">
            <template #trigger="{ active }">
                <o-button
                    variant="primary"
                    label="Click me!"
                    :icon-right="active ? 'caret-up' : 'caret-down'" />
            </template>

            <o-dropdown-item aria-role="listitem" label="Action" />
            <o-dropdown-item aria-role="listitem" label="Another action" />
            <o-dropdown-item aria-role="listitem" label="Something else" />
        </o-dropdown>

        <o-dropdown :triggers="['hover']" aria-role="list">
            <template #trigger="{ active }">
                <o-button
                    variant="info"
                    label="Hover me!"
                    :icon-right="active ? 'caret-up' : 'caret-down'" />
            </template>

            <o-dropdown-item aria-role="listitem" label="Action" />
            <o-dropdown-item aria-role="listitem" label="Another action" />
            <o-dropdown-item aria-role="listitem" label="Something else" />
        </o-dropdown>

        <o-dropdown disabled aria-role="list">
            <template #trigger="{ active }">
                <o-button
                    label="Disabled"
                    :icon-right="active ? 'caret-up' : 'caret-down'" />
            </template>

            <o-dropdown-item aria-role="listitem" label="Action" />
            <o-dropdown-item aria-role="listitem" label="Another action" />
            <o-dropdown-item aria-role="listitem" label="Something else" />
        </o-dropdown>

        <o-dropdown aria-role="list">
            <template #trigger>
                <div>
                    Custom
                    <o-icon variant="success" icon="caret-down" role="button" />
                </div>
            </template>

            <o-dropdown-item aria-role="listitem" label="Action" />
            <o-dropdown-item aria-role="listitem" label="Another action" />
            <o-dropdown-item aria-role="listitem" label="Something else" />
        </o-dropdown>

        <o-dropdown :triggers="['contextmenu']" aria-role="list">
            <template #trigger>
                <o-button label="Right click" role="button" />
            </template>

            <o-dropdown-item aria-role="listitem" label="Action" />
            <o-dropdown-item aria-role="listitem" label="Another action" />
            <o-dropdown-item aria-role="listitem" label="Something else" />
        </o-dropdown>
    </section>
</template>
