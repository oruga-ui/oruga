<template>
    <section class="odocs-spaced">
        <p>
            <o-tooltip
                label="Tooltip with a max width, probably because it's too long for a casual tooltip"
                max-width="250px">
                <o-button label="Max width (250px)" />
            </o-tooltip>

            <o-tooltip
                label="It's not brief, but it's also not long"
                max-width="150px">
                <o-button label="Max width (150px)" />
            </o-tooltip>

            <o-tooltip
                label="Tooltip with a large max width, because it's too long to fit on one line. Did I tell you it's really long? Yes, it is — I assure you!"
                position="bottom"
                max-width="400px">
                <o-button label="Max width (400px)" />
            </o-tooltip>
        </p>
    </section>
</template>
