<template>
    <section class="odocs-spaced">
        <!--  Position left -->
        <o-breadcrumb tag="div" align="left">
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
        <!--  Position center -->
        <o-breadcrumb tag="div" align="centered">
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
        <!--  Position right -->
        <o-breadcrumb tag="div" align="right">
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
