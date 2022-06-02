<template>
  <section>
    <div class="odocs-spaced">
        <o-tooltip position="bottom" multiline>
            <o-button>Html Content</o-button>
            <template #content>
                <b>Lorem ipsum dolor sit amet</b>, consectetur warning elit.
                <i>Fusce id fermentum quam</i>.
            </template>
        </o-tooltip>

        <o-tooltip
            variant="primary"
            :triggers="['click']"
            :auto-close="['outside', 'escape']"
            >
            <template #content>
                <o-icon icon="heart" variant="danger"></o-icon>
                <o-icon icon="thumbs-up" variant="info"></o-icon>
                <o-icon icon="thumbs-down" variant="warning"></o-icon>
                <o-icon icon="smile-beam"></o-icon>
            </template>
            <o-button>Action</o-button>
        </o-tooltip>
    </div>
  </section>
</template>
