<template>
    <section>
        <div class="odocs-spaced">
            <o-tooltip label="Tooltip right" position="right">
                <o-button label="Right" />
            </o-tooltip>

            <o-tooltip label="Tooltip top">
                <o-button label="Top (default)" />
            </o-tooltip>

            <o-tooltip label="Tooltip bottom" position="bottom">
                <o-button label="Bottom" />
            </o-tooltip>

            <o-tooltip label="Tooltip left" position="left">
                <o-button label="Left" />
            </o-tooltip>

            <o-tooltip label="delayed by 1000ms" :delay="1000">
                <o-button variant="warning" label="Delayed" />
            </o-tooltip>
        </div>
    </section>
</template>
