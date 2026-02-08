<template>
    <section class="odocs-spaced">
        <o-dropdown>
            <template #trigger="{ active }">
                <o-button
                    variant="primary"
                    label="Click me!"
                    :icon-right="active ? 'caret-up' : 'caret-down'" />
            </template>

            <o-dropdown-item
                label="Action"
                :value="{
                    label: 'Jesse Simmons',
                    value: {
                        id: 1,
                        user: { first_name: 'Jesse', last_name: 'Simmons' },
                        date: '2016/10/15 13:43:27',
                        gender: 'Male',
                    },
                }" />
            <o-dropdown-item label="Another action" />
            <o-dropdown-item label="Something else" />
        </o-dropdown>
    </section>
</template>
