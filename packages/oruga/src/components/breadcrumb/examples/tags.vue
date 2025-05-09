<template>
    <section>
        <!-- remove links -->
        <o-breadcrumb separator="->">
            <o-breadcrumb-item tag="span" href="/" :active="true">
                Home
            </o-breadcrumb-item>
            <o-breadcrumb-item
                tag="span"
                href="/documentation/"
                :disabled="true">
                Docs
            </o-breadcrumb-item>
            <o-breadcrumb-item tag="span" href="/components/Breadcrumb.html">
                Breadcrumb
            </o-breadcrumb-item>
        </o-breadcrumb>

        <!-- need vue-router -->
        <o-breadcrumb separator="/">
            <o-breadcrumb-item label="Home" tag="router-link" to="/" />
            <o-breadcrumb-item
                label="Docs"
                tag="router-link"
                to="/documentation/"
                :disabled="true" />
            <o-breadcrumb-item
                label="Breadcrumb"
                tag="router-link"
                to="/components/Breadcrumb" />
        </o-breadcrumb>
    </section>
</template>
