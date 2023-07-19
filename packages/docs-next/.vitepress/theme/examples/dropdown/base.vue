<template>
    <section class="odocs-spaced">
        <o-dropdown aria-role="list">
            <template #trigger="{ active }">
                <o-button variant="primary">
                    <span>Click me!</span>
                    <o-icon :icon="active ? 'caret-up' : 'caret-down'" />
                </o-button>
            </template>

            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">
                Another action
            </o-dropdown-item>
            <o-dropdown-item aria-role="listitem">
                Something else
            </o-dropdown-item>
        </o-dropdown>

        <o-dropdown :triggers="['hover']" aria-role="list">
            <template #trigger="{ active }">
                <o-button variant="info">
                    <span>Hover me!</span>
                    <o-icon :icon="active ? 'caret-up' : 'caret-down'" />
                </o-button>
            </template>

            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">
                Another action
            </o-dropdown-item>
            <o-dropdown-item aria-role="listitem">
                Something else
            </o-dropdown-item>
        </o-dropdown>

        <o-dropdown disabled aria-role="list">
            <template #trigger="{ active }">
                <o-button>
                    <span>Disabled</span>
                    <o-icon :icon="active ? 'caret-up' : 'caret-down'" />
                </o-button>
            </template>

            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">
                Another action
            </o-dropdown-item>
            <o-dropdown-item aria-role="listitem">
                Something else
            </o-dropdown-item>
        </o-dropdown>

        <o-dropdown aria-role="list">
            <template #trigger>
                <div>
                    Custom
                    <o-icon variant="success" icon="caret-down" role="button" />
                </div>
            </template>

            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">
                Another action
            </o-dropdown-item>
            <o-dropdown-item aria-role="listitem">
                Something else
            </o-dropdown-item>
        </o-dropdown>

        <o-dropdown :triggers="['contextmenu']" aria-role="list">
            <template #trigger>
                <o-button role="button"> Right click </o-button>
            </template>

            <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
            <o-dropdown-item aria-role="listitem">
                Another action
            </o-dropdown-item>
            <o-dropdown-item aria-role="listitem">
                Something else
            </o-dropdown-item>
        </o-dropdown>
    </section>
</template>
