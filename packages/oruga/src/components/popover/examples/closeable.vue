<template>
    <section>
        <!-- "manual" has no Escape or light dismiss, the popover must offer its own close control -->
        <o-popover closeable behavior="manual">
            <template #default="{ open }">
                <o-button @click="open"> Open popover! </o-button>
            </template>

            <template #content>
                <b>Lorem ipsum dolor sit amet</b>, consectetur adipiscing elit.
                <i>Fusce id fermentum quam</i>.
                <o-icon icon="heart" variant="danger" />
            </template>
        </o-popover>
    </section>
</template>
