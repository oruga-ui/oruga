<template>
    <section class="odocs-spaced">
        <o-button label="Button" />

        <o-button
            tag="a"
            href="https://oruga-ui.com"
            target="_blank"
            label="Anchor" />

        <o-button tag="input" native-type="submit" value="Submit input" />

        <!-- Need vue-router -->
        <o-button tag="router-link" to="/home" variant="info" label="Docs" />
    </section>
</template>
