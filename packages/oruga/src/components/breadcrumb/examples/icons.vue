<template>
    <section>
        <!-- has-slash-separator -->
        <o-breadcrumb
            tag="div"
            separator="has-slash-separator"
            size="medium"
            align="center">
            <o-breadcrumb-item tag="a" active="true" active-variant="primary">Home </o-breadcrumb-item>
            <o-breadcrumb-item tag="a" disabled="true">Docs </o-breadcrumb-item>
            <o-breadcrumb-item tag="a">Breadcrumb </o-breadcrumb-item>
        </o-breadcrumb>
        <!-- has-chevron-separator -->
        <o-breadcrumb
            tag="div"
            separator="has-chevron-separator"
            size="medium"
            align="center">
            <o-breadcrumb-item tag="a" active="true" active-variant="primary">Home </o-breadcrumb-item>
            <o-breadcrumb-item tag="a" disabled="true">Docs </o-breadcrumb-item>
            <o-breadcrumb-item tag="a">Breadcrumb</o-breadcrumb-item>
        </o-breadcrumb>
        <!-- has-arrow-separator -->
        <o-breadcrumb
            tag="div"
            separator="has-arrow-separator"
            size="medium"
            align="center">
            <o-breadcrumb-item tag="a" icon-left="home" active="true" active-variant="primary">Home</o-breadcrumb-item>
            <o-breadcrumb-item tag="a" icon-left="plus" disabled="true">Docs</o-breadcrumb-item>
            <o-breadcrumb-item tag="a" icon-left="location">Breadcrumb</o-breadcrumb-item>
        </o-breadcrumb>
        <!-- has-dot-separator -->
        <o-breadcrumb
            tag="div"
            separator="has-dot-separator"
            size="medium"
            align="center">
            <o-breadcrumb-item tag="a" icon-right="home" active="true" active-variant="primary">Home</o-breadcrumb-item>
            <o-breadcrumb-item tag="a" icon-right="plus" disabled="true">Docs</o-breadcrumb-item>
            <o-breadcrumb-item tag="a" icon-right="location">Breadcrumb</o-breadcrumb-item>
        </o-breadcrumb>
    </section>
</template>
