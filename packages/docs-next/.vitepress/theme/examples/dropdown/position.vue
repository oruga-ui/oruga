<template>
    <section>
        <o-field expanded>
            <o-dropdown position="top-right" aria-role="list" expanded>
                <template #trigger>
                    <o-button
                        class="dropdown-toggle"
                        variant="primary"
                        label="Position top"
                        expanded />
                </template>

                <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
                <o-dropdown-item aria-role="listitem">
                    Another action
                </o-dropdown-item>
                <o-dropdown-item aria-role="listitem">
                    Something else
                </o-dropdown-item>
            </o-dropdown>
        </o-field>

        <o-field expanded>
            <o-dropdown position="bottom-left" aria-role="list" expanded>
                <template #trigger>
                    <o-button
                        class="dropdown-toggle"
                        variant="primary"
                        label="Position bottom"
                        expanded />
                </template>

                <o-dropdown-item aria-role="listitem">Action</o-dropdown-item>
                <o-dropdown-item aria-role="listitem">
                    Another action
                </o-dropdown-item>
                <o-dropdown-item aria-role="listitem">
                    Something else
                </o-dropdown-item>
            </o-dropdown>
        </o-field>
    </section>
</template>
