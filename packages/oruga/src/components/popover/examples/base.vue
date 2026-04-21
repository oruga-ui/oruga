<template>
    <section class="odocs-spaced">
        <p>
            <o-popover>
                <o-button label="Open popover!" />

                <template #content>
                    <b>Lorem ipsum dolor sit amet</b>, consectetur warning elit.
                    <i>Fusce id fermentum quam</i>.
                    <o-icon icon="heart" variant="danger" />
                </template>
            </o-popover>

            <o-popover
                content="The content is shown after 1000ms"
                :delay="1000">
                <o-button variant="warning" label="Delayed" />
            </o-popover>

            <o-popover
                content="The content is a direct child of the body."
                teleport>
                <label variant="info" label="Append on body"
                    >Append on body"</label
                >
            </o-popover>
        </p>
    </section>
</template>
