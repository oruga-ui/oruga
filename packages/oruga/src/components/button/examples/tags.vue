<template>
    <section class="odocs-spaced">
        <p>
            <o-button label="Button" />

            <o-button
                tag="a"
                href="https://oruga-ui.com"
                target="_blank"
                label="Anchor" />

            <o-button tag="input" type="submit" value="Submit input" />

            <!-- Need vue-router -->
            <o-button tag="router-link" to="/home" label="Docs" />
        </p>
    </section>
</template>
