<template>
    <section>
        <o-field expanded>
            <o-dropdown position="top-right" expanded>
                <template #trigger>
                    <o-button
                        class="dropdown-toggle"
                        variant="primary"
                        label="Position top"
                        expanded />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>
        </o-field>

        <o-field expanded>
            <o-dropdown position="bottom-left" expanded>
                <template #trigger>
                    <o-button
                        class="dropdown-toggle"
                        variant="primary"
                        label="Position bottom"
                        expanded />
                </template>

                <o-dropdown-item label="Action" />
                <o-dropdown-item label="Another action" />
                <o-dropdown-item label="Something else" />
            </o-dropdown>
        </o-field>
    </section>
</template>
