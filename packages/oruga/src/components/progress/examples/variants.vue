<template>
    <section class="odocs-spaced">
        <o-progress :value="15" aria-label="Default" />
        <o-progress :value="30" variant="primary" aria-label="Primary" />
        <o-progress :value="45" variant="secondary" aria-label="Secondary" />
        <o-progress :value="60" variant="success" aria-label="Success" />
        <o-progress :value="75" variant="info" aria-label="Info" />
        <o-progress :value="90" variant="warning" aria-label="Warning" />
        <o-progress :value="100" variant="danger" aria-label="Danger" />
    </section>
</template>
