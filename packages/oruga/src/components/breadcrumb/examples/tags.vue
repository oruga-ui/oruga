<template>
    <section>
        <!-- remove links -->
        <o-breadcrumb separator="->">
            <o-breadcrumb-item label="Home" tag="a" href="/" disabled />
            <o-breadcrumb-item tag="a" label="Docs" href="/documentation/" />
            <o-breadcrumb-item
                label="Breadcrumb"
                tag="a"
                href="/components/Breadcrumb.html"
                active />
        </o-breadcrumb>

        <!-- need vue-router -->
        <o-breadcrumb separator="/">
            <o-breadcrumb-item label="Home" tag="router-link" to="/" disabled />
            <o-breadcrumb-item
                label="Docs"
                tag="router-link"
                to="/documentation/" />
            <o-breadcrumb-item
                label="Breadcrumb"
                tag="router-link"
                to="/components/Breadcrumb"
                active />
        </o-breadcrumb>
    </section>
</template>
