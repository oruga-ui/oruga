<template>
    <section class="odocs-spaced">
        <p>
            <o-popup content="Tooltip">
                <o-button label="Hover me!" />
            </o-popup>

            <o-popup content="delayed by 1000ms" :delay="1000">
                <o-button variant="warning" label="Delayed" />
            </o-popup>

            <o-popup content="I'm on body" teleport>
                <o-button variant="info" label="Append on body" />
            </o-popup>
        </p>
    </section>
</template>
