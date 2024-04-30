<template>
    <section class="odocs-spaced">
        <!--  align="center" -->
        <o-breadcrumb
            tag="div"
            separator="has-arrow-separator"
            size="medium"
            align="center">
            <o-breadcrumb-item tag="a" href="/" active="true"
                >Home
            </o-breadcrumb-item>
            <o-breadcrumb-item tag="a" href="/documentation/" disabled="true"
                >Docs
            </o-breadcrumb-item>
            <o-breadcrumb-item tag="a" href="/components/Breadcrumb.html"
                >Breadcrumb
            </o-breadcrumb-item>
        </o-breadcrumb>
        <o-breadcrumb
            tag="div"
            separator="has-arrow-separator"
            size="medium"
            align="center">
            <o-breadcrumb-item tag="router-link" to="/" active="true"
                >Home
            </o-breadcrumb-item>
            <o-breadcrumb-item tag="router-link" to="/documentation/" disabled="true"
                >Docs
            </o-breadcrumb-item>
            <o-breadcrumb-item tag="router-link" to="/components/Breadcrumb.html"
                >Breadcrumb
            </o-breadcrumb-item>
        </o-breadcrumb>
    </section>
</template>
