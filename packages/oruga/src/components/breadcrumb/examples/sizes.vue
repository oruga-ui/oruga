<template>
    <section class="odocs-spaced">
        <!--  Size small -->
        <o-breadcrumb
            tag="section"
            separator="has-arrow-separator"
            size="small"
            align="center">
            <o-breadcrumb-item tag="a" href="/" active="true" active-variant="primary"
                >Home
            </o-breadcrumb-item>
            <o-breadcrumb-item tag="a" href="/documentation/" disabled="true"
                >Docs
            </o-breadcrumb-item>
            <o-breadcrumb-item tag="a" href="/components/Breadcrumb.html"
                >Breadcrumb
            </o-breadcrumb-item>
        </o-breadcrumb>
        <!--  Size medium -->
        <o-breadcrumb
            tag="section"
            separator="has-arrow-separator"
            size="medium"
            align="center">
            <o-breadcrumb-item tag="router-link" to="/" active-variant="primary"
                >Home
            </o-breadcrumb-item>
            <o-breadcrumb-item tag="router-link" to="/documentation/" disabled="true" active-variant="primary"
                >Docs
            </o-breadcrumb-item>
            <o-breadcrumb-item tag="router-link" to="/components/Breadcrumb" active-variant="primary"
                >Breadcrumb
            </o-breadcrumb-item>
        </o-breadcrumb>
        <!--  Size large -->
        <o-breadcrumb
            tag="section"
            separator="has-arrow-separator"
            size="large"
            align="center">
            <o-breadcrumb-item tag="router-link" to="/" active-variant="primary"
                >Home
            </o-breadcrumb-item>
            <o-breadcrumb-item tag="router-link" to="/documentation/" disabled="true" active-variant="primary"
                >Docs
            </o-breadcrumb-item>
            <o-breadcrumb-item tag="router-link" to="/components/Breadcrumb" active-variant="primary"
                >Breadcrumb
            </o-breadcrumb-item>
        </o-breadcrumb>

    </section>
</template>
