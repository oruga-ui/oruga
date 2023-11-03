<template>
    <section class="odocs-spaced">
        <o-tooltip label="Tooltip right" position="right">
            <o-button label="Right" />
        </o-tooltip>

        <o-tooltip label="Tooltip top" position="top">
            <o-button label="Top" />
        </o-tooltip>

        <o-tooltip label="Tooltip bottom" position="bottom">
            <o-button label="Bottom" />
        </o-tooltip>

        <o-tooltip label="Tooltip left" position="left">
            <o-button label="Left" />
        </o-tooltip>

        <hr />

        <o-tooltip label="I'm on body" teleport position="top">
            <o-button label="Append on body top" />
        </o-tooltip>

        <o-tooltip label="I'm on body" teleport position="left">
            <o-button label="Append on body left" />
        </o-tooltip>

        <o-tooltip label="I'm on body" teleport position="right">
            <o-button label="Append on body right" />
        </o-tooltip>

        <o-tooltip label="I'm on body" teleport position="bottom">
            <o-button label="Append on body bottom" />
        </o-tooltip>
    </section>
</template>
