<template>
    <section>
        <div class="odocs-spaced">
            <o-tooltip
                label="Tooltip multiline, probably because it's too long for a casual tooltip"
                multiline>
                <o-button label="Multiline (default)" />
            </o-tooltip>

            <o-tooltip
                label="It's not brief, but it's also not long"
                size="small"
                multiline>
                <o-button label="Multiline (small)" />
            </o-tooltip>

            <o-tooltip
                label="Tooltip large multiline, because it's too long to be on a medium size. Did I tell you it's really long? Yes, it is — I assure you!"
                position="bottom"
                size="large"
                multiline>
                <o-button label="Multiline (large)" />
            </o-tooltip>
        </div>
    </section>
</template>
