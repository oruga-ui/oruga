<template>
    <section>
        <o-breadcrumb
            :options="[
                {
                    label: 'Home',
                    attrs: { href: '/' },
                },
                {
                    label: 'Docs',
                    attrs: {
                        disabled: true,
                    },
                },
                {
                    label: 'Breadcrumb',
                    attrs: {
                        active: true,
                    },
                },
            ]" />
    </section>
</template>
