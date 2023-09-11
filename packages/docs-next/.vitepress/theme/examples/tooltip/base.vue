<template>
    <section class="odocs-spaced">
        <o-tooltip label="Tooltip">
            <o-button label="Hover me! " />
        </o-tooltip>

        <o-tooltip label="delayed by 1000ms" :delay="1000">
            <o-button variant="warning" label="Delayed" />
        </o-tooltip>
    </section>
</template>
