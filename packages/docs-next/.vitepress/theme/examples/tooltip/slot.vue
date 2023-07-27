<template>
    <section class="odocs-spaced">
        <o-tooltip position="bottom" multiline>
            <o-button label="Html Content" />
            <template #content>
                <b>Lorem ipsum dolor sit amet</b>, consectetur warning elit.
                <i>Fusce id fermentum quam</i>.
            </template>
        </o-tooltip>

        <o-tooltip
            variant="primary"
            :triggers="['click']"
            :auto-close="['outside', 'escape']">
            <template #content>
                <o-icon icon="heart" variant="danger" />
                <o-icon icon="thumbs-up" variant="info" />
                <o-icon icon="thumbs-down" variant="warning" />
                <o-icon icon="smile-beam" />
            </template>
            <o-button label="Action" />
        </o-tooltip>
    </section>
</template>
