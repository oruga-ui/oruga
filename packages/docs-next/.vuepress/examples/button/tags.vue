<template>
    <section>
        <div class="odocs-spaced">
            <o-button>Button</o-button>
            <o-button tag="a"
                href="https://oruga.io"
                target="_blank">
                Anchor
            </o-button>
            <o-button tag="input"
                native-type="submit"
                value="Submit input" />
            <!-- Need vue-router -->
            <!--
            <o-button tag="router-link"
                to="/home"
                variant="info">
                Docs
            </o-button>
            -->
        </div>
    </section>
</template>
